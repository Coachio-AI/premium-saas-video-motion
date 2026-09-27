#!/usr/bin/env node
/* VideoPremium renderer — deterministic seek(t) HTML → MP4.
 *
 *   node tools/render.mjs <page.html> [--mode preview|final] [--out out/film.mp4] [--audio mix.wav]
 *                                     [--fps 60] [--sub 2] [--scale 1] [--workers N] [--from 0 --to DUR]
 *
 *   preview : half size, 30 fps, no motion blur          (~30-60 s for a 30 s film)  → review timing
 *   final   : full size, 60 fps, 2 sub-frames blended     (~3-6 min on 2 cores)     → deliver
 *
 * Why it is fast: no rAF waits inside seek (screenshot already waits for paint), CDP captureScreenshot
 * with optimizeForSpeed, 2 sub-frames instead of 4, one Chromium per CPU core, chunked + resumable
 * (re-run the same command after a crash/timeout and finished chunks are skipped).
 */
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const argv = process.argv.slice(2); const arg = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const page = argv[0]; if (!page || page.startsWith('--')) { console.error('usage: node tools/render.mjs <page.html> [--mode preview|final] ...'); process.exit(1); }
const mode = arg('mode', 'final');
const P = mode === 'preview' ? { fps: 30, sub: 1, scale: .5, q: 80, crf: 23 } : { fps: 60, sub: 2, scale: 1, q: 92, crf: 16 };
const fps = +arg('fps', P.fps), sub = +arg('sub', P.sub), scale = +arg('scale', P.scale);
const workers = +arg('workers', Math.max(1, os.cpus().length));
const out = arg('out', `out/${path.basename(path.dirname(path.resolve(page)))}-${mode}.mp4`);
const audio = arg('audio', null);
const work = path.join(path.dirname(out), '.render-' + path.basename(out, '.mp4')); fs.mkdirSync(work, { recursive: true });
const url = pathToFileURL(path.resolve(page)).href;

async function openPage(chromium) {
  const b = await chromium.launch({ args: ['--disable-gpu-vsync', '--force-color-profile=srgb', '--hide-scrollbars'] });
  const probe = await b.newPage(); await probe.goto(url); await probe.evaluate(() => window.ready);
  const size = await probe.evaluate(() => window.SIZE || [document.getElementById('stage').offsetWidth, document.getElementById('stage').offsetHeight]);
  const dur = await probe.evaluate(() => window.DUR); await probe.close();
  const ctx = await b.newContext({ viewport: { width: size[0], height: size[1] }, deviceScaleFactor: scale });
  const p = await ctx.newPage(); p.on('pageerror', e => console.error('PAGE ERROR', e.message));
  await p.goto(url); await p.evaluate(() => window.ready);
  const cdp = await ctx.newCDPSession(p);
  return { b, p, cdp, size, dur };
}

async function worker(chunks) {
  const { chromium } = await import('playwright');
  const { b, p, cdp } = await openPage(chromium);
  for (const [ci, f0, f1] of chunks) {
    const file = path.join(work, `c${String(ci).padStart(3, '0')}.mp4`); if (fs.existsSync(file + '.done')) continue;
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps * sub), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '8', '-pix_fmt', 'yuv420p', file]);
    for (let i = f0; i < f1; i++) {
      await p.evaluate(t => window.seek(t), i / (fps * sub));
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: P.q, optimizeForSpeed: true });
      if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r)); fs.writeFileSync(file + '.done', '');
    process.stdout.write(`chunk ${ci} done\n`);
  }
  await b.close();
}

if (argv.includes('--worker')) { await worker(JSON.parse(arg('chunks'))); process.exit(0); }

/* ---------- main ---------- */
const t0 = Date.now();
const { chromium } = await import('playwright');
const probe = await openPage(chromium); const dur = +arg('to', probe.dur), from = +arg('from', 0); await probe.b.close();
const N = Math.round((dur - from) * fps * sub), f0 = Math.round(from * fps * sub), CH = Math.max(fps * sub, Math.ceil(N / (workers * 4)));
const chunks = []; for (let s = 0, ci = 0; s < N; s += CH, ci++) chunks.push([ci, f0 + s, f0 + Math.min(N, s + CH)]);
console.log(`${mode}: ${probe.size.join('x')} @${scale}x, ${fps} fps × ${sub} sub = ${N} samples, ${chunks.length} chunks, ${workers} workers`);
const groups = [...Array(workers)].map((_, w) => chunks.filter((_, i) => i % workers === w));
await Promise.all(groups.map(g => new Promise((res, rej) => {
  const c = spawn(process.execPath, [fileURLToPath(import.meta.url), page, ...argv.slice(1), '--worker', '--chunks', JSON.stringify(g)], { stdio: 'inherit' });
  c.on('close', code => code ? rej(new Error('worker failed — re-run the same command to resume')) : res());
})));
const list = path.join(work, 'list.txt'); fs.writeFileSync(list, chunks.map(([ci]) => `file 'c${String(ci).padStart(3, '0')}.mp4'`).join('\n'));
const vf = sub > 1 ? `tmix=frames=${sub},select='not(mod(n+1\\,${sub}))',setpts=N/${fps}/TB` : 'setpts=N/' + fps + '/TB';
const args = ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list];
if (audio) args.push('-i', audio);
args.push('-vf', vf, '-r', String(fps), '-c:v', 'libx264', '-preset', 'medium', '-crf', String(P.crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart');
if (audio) args.push('-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-t', String(dur - from)); else args.push('-an');
args.push(out); fs.mkdirSync(path.dirname(out), { recursive: true }); execFileSync('ffmpeg', args, { stdio: 'inherit' });
console.log(`✓ ${out}  (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
if (!argv.includes('--keep')) fs.rmSync(work, { recursive: true, force: true });
