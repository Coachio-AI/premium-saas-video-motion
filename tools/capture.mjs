#!/usr/bin/env node
/* Screen capture for mode B / C films — run ONLY after the user approved it (it starts/uses their app).
 *
 *   node tools/capture.mjs capture.config.json            # all shots, all viewports
 *   node tools/capture.mjs capture.config.json --only home,book --vp mobile
 *
 * Writes <out>/<viewport>/<name>.png (retina: desktop 1440×900 @2x, mobile 390×844 @3x) + <out>/manifest.json.
 * Config (see templates/capture.config.example.json):
 *   baseUrl, out, viewports{name:{width,height,dpr,mobile}}, login{path, steps[]}, shots[{name,path,wait,actions[],mask[],fullPage,viewports[]}]
 *   step/action = {goto} | {click} | {fill:[selector,value]} | {press:[selector,key]} | {wait:selector|ms} | {scroll:y} | {hover}
 * Rules baked in: demo/seed data only; `mask` selectors are blacked out (emails, phones, payment); fonts + images settle
 * before capture; animations are disabled so the frame is stable.
 */
import fs from 'node:fs'; import path from 'node:path';
const argv = process.argv.slice(2); const arg = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : d; };
const cfg = JSON.parse(fs.readFileSync(argv[0], 'utf8'));
const only = arg('only') ? arg('only').split(',') : null, onlyVp = arg('vp') ? arg('vp').split(',') : null;
const out = path.resolve(path.dirname(path.resolve(argv[0])), cfg.out || 'capture');
const VPS = cfg.viewports || { desktop: { width: 1440, height: 900, dpr: 2 }, mobile: { width: 390, height: 844, dpr: 3, mobile: true } };
const { chromium } = await import('playwright');
const b = await chromium.launch(); const manifest = [];
const run = async (p, st) => {
  if (st.goto) await p.goto(new URL(st.goto, cfg.baseUrl).href, { waitUntil: 'networkidle' });
  if (st.click) await p.click(st.click);
  if (st.hover) await p.hover(st.hover);
  if (st.fill) await p.fill(st.fill[0], st.fill[1]);
  if (st.press) await p.press(st.press[0], st.press[1]);
  if (st.scroll != null) await p.evaluate(y => window.scrollTo(0, y), st.scroll);
  if (st.wait != null) typeof st.wait === 'number' ? await p.waitForTimeout(st.wait) : await p.waitForSelector(st.wait, { timeout: 15000 });
};
for (const [vpName, vp] of Object.entries(VPS)) {
  if (onlyVp && !onlyVp.includes(vpName)) continue;
  const ctx = await b.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.dpr || 2, isMobile: !!vp.mobile, hasTouch: !!vp.mobile, reducedMotion: 'reduce' });
  const p = await ctx.newPage(); fs.mkdirSync(path.join(out, vpName), { recursive: true });
  if (cfg.login) { await p.goto(new URL(cfg.login.path || '/', cfg.baseUrl).href, { waitUntil: 'networkidle' }); for (const st of cfg.login.steps || []) await run(p, st); }
  for (const sh of cfg.shots) {
    if (only && !only.includes(sh.name)) continue; if (sh.viewports && !sh.viewports.includes(vpName)) continue;
    try {
      await p.goto(new URL(sh.path || '/', cfg.baseUrl).href, { waitUntil: 'networkidle' });
      for (const st of sh.actions || []) await run(p, st);
      if (sh.wait) await run(p, { wait: sh.wait });
      await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
      await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))); });
      const file = path.join(out, vpName, `${sh.name}.png`);
      await p.screenshot({ path: file, fullPage: !!sh.fullPage, mask: (sh.mask || cfg.mask || []).map(s => p.locator(s)), maskColor: '#1A1A1A' });
      manifest.push({ name: sh.name, viewport: vpName, file: path.relative(out, file), url: p.url(), px: [vp.width * (vp.dpr || 2), sh.fullPage ? null : vp.height * (vp.dpr || 2)], at: new Date().toISOString() });
      console.log('✓', vpName, sh.name);
    } catch (e) { console.log('✗', vpName, sh.name, '—', e.message.split('\n')[0]); manifest.push({ name: sh.name, viewport: vpName, error: e.message.split('\n')[0] }); }
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify({ baseUrl: cfg.baseUrl, shots: manifest }, null, 1));
console.log(`→ ${out}/manifest.json  (${manifest.filter(m => !m.error).length} ok, ${manifest.filter(m => m.error).length} failed)`);
