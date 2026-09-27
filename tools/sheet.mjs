#!/usr/bin/env node
/* Contact sheet — the fastest review loop. One thumbnail every N beats, labelled with the beat number.
 *   node tools/sheet.mjs <page.html> [--every 0.5] [--beats 3,5.5,12] [--cols 8] [--out out/sheet.jpg]
 * Review this BEFORE any video render: most bugs (overflow, wrong z-order, measure-while-hidden) show up here.
 */
import { execFileSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path'; import { pathToFileURL } from 'node:url';
const argv = process.argv.slice(2); const arg = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const page = argv[0]; const out = arg('out', 'out/sheet.jpg'), cols = +arg('cols', 8), thumb = +arg('thumb', 320);
const { chromium } = await import('playwright');
const b = await chromium.launch(); const probe = await b.newPage(); await probe.goto(pathToFileURL(path.resolve(page)).href); await probe.evaluate(() => window.ready);
const [size, dur, B] = await probe.evaluate(() => [window.SIZE || [document.getElementById('stage').offsetWidth, document.getElementById('stage').offsetHeight], window.DUR, window.B || window.VP?.B || .5]);
const ctx = await b.newContext({ viewport: { width: size[0], height: size[1] }, deviceScaleFactor: thumb / Math.max(...size) * 2 });
const p = await ctx.newPage(); p.on('pageerror', e => console.error('PAGE ERROR', e.message)); await p.goto(pathToFileURL(path.resolve(page)).href); await p.evaluate(() => window.ready);
const beats = arg('beats') ? arg('beats').split(',').map(Number) : [...Array(Math.floor(dur / B / +arg('every', .5)))].map((_, i) => i * +arg('every', .5));
const dir = fs.mkdtempSync('/tmp/sheet-'); let i = 0;
await p.evaluate(fs => { const d = document.createElement('div'); d.id = '__lbl'; d.style.cssText = `position:fixed;left:0;top:0;z-index:99999;background:rgba(0,0,0,.6);color:#fff;font:600 ${fs}px monospace;padding:4px 10px`; document.body.appendChild(d); }, Math.round(Math.max(...size) / 40));
for (const bt of beats) { await p.evaluate(([t, l]) => { document.getElementById('__lbl').textContent = l; return window.seek(t); }, [bt * B, 'b' + bt.toFixed(2)]); await p.screenshot({ path: `${dir}/f${String(i++).padStart(4, '0')}.png` }); }
await b.close(); fs.mkdirSync(path.dirname(out), { recursive: true });
const rows = Math.ceil(beats.length / cols), th = Math.round(thumb * size[1] / size[0]);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '1', '-i', `${dir}/f%04d.png`, '-vf',
  `scale=${thumb}:${th},tile=${cols}x${rows}:padding=4:color=white`,
  '-frames:v', '1', out], { stdio: 'inherit' });
console.log(`✓ ${out}  (${beats.length} frames, labels = beat index${arg('beats') ? ' order' : ''})`);
