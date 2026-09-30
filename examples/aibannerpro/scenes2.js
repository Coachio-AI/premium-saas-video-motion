/* ===== AI Banner Pro film — scenes 3…12, transitions, frame loop ===== */

/* 3 · BANNER TOOL — refs in, settings, generate, every aspect, variants (20.1–38.6) */
const WX = 220, WY = 170, WW = 1480, WH = 900;
const NAV = [['home', 'Dashboard'], ['wand', 'Banner Tool'], ['user', 'UGC Studio'], ['grid', 'Social Frames'], ['palette', 'Brand Style'], ['clock', 'History'], ['mega', 'Ads Manager']];
const sidebar = (active) => `<div class="a" style="left:0;top:46px;width:250px;bottom:0;background:#0E1628;border-right:1.5px solid var(--line)">
  <div class="a" style="left:22px;top:22px;display:flex;gap:12px;align-items:center">${logoTile(38)}<div><div style="font-size:19px;font-weight:700">AI Banner Pro</div><div class="mono" style="font-size:12px;color:var(--subtle)">v0.12.0</div></div></div>
  ${NAV.map(([i, l], k) => `<div class="a" style="left:14px;top:${100 + k * 50}px;width:222px;height:42px;border-radius:10px;display:flex;align-items:center;gap:12px;padding:0 13px;font-size:17px;font-weight:500;${l === active ? 'background:var(--brand);color:#fff' : 'color:var(--muted)'}">${ico(i, 18)}${l}</div>`).join('')}
  <div class="a" style="left:14px;bottom:24px;width:222px;height:40px;border-radius:10px;background:var(--raised);display:flex;align-items:center;gap:8px;padding:0 13px;font-size:14px;color:var(--muted)">${ico('zap', 14, '#F67D1C')}Active: <b style="color:var(--fg)">Coachio</b></div></div>`;
const VARBG = ['', 'radial-gradient(120% 90% at 70% 60%,#FFF3E6 0%,#FFD6B0 55%,#F7A566 100%)', 'linear-gradient(160deg,#FFE3DA 0%,#FFB59A 60%,#F2865F 100%)', 'radial-gradient(120% 90% at 30% 70%,#FFE9C9 0%,#F9C27E 55%,#E8742A 100%)'];
const fitAR = ar => { const w = Math.min(560, 640 * ar); return [w, w / ar]; };
scene('tool', 20.1, 38.9, 'iris', (c, s) => {
  s.hl = [['Thả <span class="o">ảnh mẫu</span> + <span class="o">sản phẩm.</span>', 20.7, 25.6], ['Chọn tỉ lệ, độ nét, model.', 25.8, 31.6], ['Một cú click. <span class="o">Mọi tỉ lệ.</span>', 31.8, 35.3], ['4 biến thể. <span class="o">Giữ bản đẹp nhất.</span>', 35.5, null]];
  s.h = HEAD(s, '01 · BANNER TOOL', s.hl, 0, 34, 62);
  const w = s.win = el(c, `<div class="win" style="left:${WX}px;top:${WY}px;width:${WW}px;height:${WH}px"><div class="bar"><i></i><i></i><i></i><b>app.aibannerpro · banner</b></div>${sidebar('Banner Tool')}</div>`);
  el(w, `<div class="a" style="left:290px;top:74px;font-size:34px;font-weight:700">Banner Tool</div><div class="a mono" style="left:290px;top:122px;font-size:16px;color:var(--subtle)">Style ref + product → AI sinh nhiều variant</div>`);
  el(w, `<div class="lab" style="left:290px;top:172px">References</div>`);
  s.slots = [['Style', 290], ['Product', 560]].map(([l, x]) => el(w, `<div class="a" style="left:${x}px;top:200px;width:250px;height:250px;border:2px dashed var(--line2);border-radius:16px;background:rgba(26,37,65,.5)"><div class="a" style="left:0;right:0;top:92px;text-align:center;color:var(--subtle);font-size:44px;font-weight:300">+</div><div class="a mono" style="left:14px;bottom:10px;font-size:14px;color:var(--subtle)">${l}</div></div>`));
  el(w, `<div class="lab" style="left:290px;top:480px">Brand</div>`);
  s.brand = el(w, `<div class="fld" style="left:290px;top:508px;width:520px;height:60px;gap:14px"><i style="width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg,#FFB07A,#F67D1C);display:block"></i><span style="font-weight:700;letter-spacing:.2em">LUMIÈRE</span><span class="mono" style="margin-left:auto;font-size:14px;color:var(--subtle)">brand kit</span></div>`);
  el(w, `<div class="lab" style="left:290px;top:588px">Nội dung</div>`);
  s.content = el(w, `<div class="fld" style="left:290px;top:616px;width:520px;height:60px"><span class="t"></span><i class="caret" style="display:inline-block;width:2px;height:28px;background:var(--brand);margin-left:3px"></i></div>`);
  el(w, `<div class="lab" style="left:290px;top:696px">Tỉ lệ</div>`);
  s.ratio = ['1:1', '3:4', '4:3', '16:9', '9:16'].map((t, i) => el(w, `<div class="pill${i === 0 ? ' on' : ''}" style="left:${290 + i * 104}px;top:724px;width:94px;height:48px">${t}</div>`));
  el(w, `<div class="lab" style="left:290px;top:796px">Độ nét</div>`);
  s.q = ['1K', '2K', '4K'].map((t, i) => el(w, `<div class="pill${i === 0 ? ' on' : ''}" style="left:${290 + i * 86}px;top:824px;width:76px;height:48px">${t}</div>`));
  s.gen = el(w, `<div class="btn" style="left:590px;top:812px;width:220px;height:66px;font-size:24px">${ico('spark', 22, '#fff')}Generate</div>`);
  s.pv = el(w, `<div class="a" style="left:850px;top:74px;width:600px;height:800px;border-radius:18px;background:#0C1426;border:1.5px solid var(--line);overflow:hidden"><div class="a" style="inset:0;background-image:radial-gradient(rgba(148,163,184,.12) 1.2px,transparent 1.5px);background-size:24px 24px"></div></div>`);
  s.model = el(w, `<div class="chip" style="left:870px;top:92px;height:38px;font-size:15px;padding:0 14px">${ico('zap', 15, '#F67D1C')}GPT Image 2</div>`);
  s.dims = el(w, `<div class="a mono" style="right:50px;top:100px;font-size:16px;color:var(--subtle)">1080 × 1080</div>`);
  s.frame = el(w, `<div class="a" style="border:2px dashed var(--line2);border-radius:14px"></div>`);
  s.out = lumi(w, 0, 0, 560, 560, 'border-radius:14px;overflow:hidden;box-shadow:6px 6px 0 rgba(0,0,0,.85)');
  s.scan = el(w, `<div class="a" style="border-radius:14px;overflow:hidden;background:linear-gradient(110deg,rgba(36,49,84,.9) 30%,rgba(246,125,28,.35) 50%,rgba(36,49,84,.9) 70%);background-size:300% 100%"></div>`);
  s.status = el(w, `<div class="a mono" style="left:870px;top:822px;width:560px;font-size:15px;color:var(--brand-l)"><span class="t"></span><div style="margin-top:10px;height:6px;border-radius:3px;background:var(--raised2)"><div class="bar" style="height:6px;border-radius:3px;background:var(--brand);width:0"></div></div></div>`);
  /* flying refs (dragged from the right edge) */
  s.fly = [el(c, `<div class="a pop" style="width:230px;height:230px;border-radius:14px;overflow:hidden">${BN.html(7, 'position:absolute;inset:0;border-radius:0')}</div>`),
           el(c, `<div class="a pop" style="width:230px;height:230px;border-radius:14px;overflow:hidden;background:radial-gradient(circle at 50% 40%,#FFFFFF,#EFE7DE)"><div class="a" style="left:40px;top:14px;width:150px;height:200px">${PROD.serum()}</div></div>`)];
  /* variants row + dim */
  s.dim = el(c, `<div class="a" style="left:0;top:0;width:1920px;height:1080px;background:rgba(11,18,32,.88)"></div>`);
  s.vars = VARBG.map((bg, i) => { const e = lumi(c, 170 + i * 410, 330, 350, 350, 'border-radius:16px;overflow:hidden;box-shadow:7px 7px 0 rgba(0,0,0,.85)', bg); el(c, ''); return e; });
  s.vlab = s.vars.map((e, i) => el(c, `<div class="a mono" style="left:${170 + i * 410}px;top:700px;font-size:17px;color:var(--muted)">v${i + 1} · ${['gpt_image_2', 'nano_banana_pro', 'gpt_image_2', 'nano_banana_pro'][i]}</div>`));
  s.heart = el(c, `<div class="a" style="left:${170 + 410 + 286}px;top:606px;width:48px;height:48px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:3px 3px 0 rgba(0,0,0,.85)">${ico('heart', 26, '#F67D1C', 2.4)}</div>`);
  s.toast = el(s.hud, `<div class="a" style="left:760px;top:900px;height:64px;padding:0 28px;border-radius:16px;background:var(--raised);border:1.5px solid var(--line2);display:flex;align-items:center;gap:14px;font-size:22px;font-weight:600;box-shadow:0 20px 50px rgba(0,0,0,.5)">${ico('check', 22, '#6EE7B7', 3)}Đã lưu vào Library</div>`);
}, (s, b) => {
  headK(s.h, s.hl, 20.5);
  /* camera: refs → settings → preview → out */
  const zt = track([[20.1, [1, 960, 560]], [20.9, [1.3, 640, 520], 1.3, .9], [24.3, [1.24, 640, 900], 1.3, .9], [25.9, [1, 960, 600], 1.4, .9], [28.5, [1.34, 1370, 640], 1.3, .9], [32.3, [1.12, 1370, 620], 1.3, .9], [35.2, [1, 960, 560], 1.6, .9]]);
  cam(s, zt[0], zt[1], zt[2]);
  /* drag refs in */
  const drag = (i, b0, b1, from, slot) => { const e = s.fly[i], k = ease(clamp((b - b0) / (b1 - b0))), tx = WX + slot[0] + 10, ty = WY + 210, x = lerp(from[0], tx, k), y = lerp(from[1], ty, k) - Math.sin(k * Math.PI) * 60;
    const land = sp(b1, 2.4, .5), sq = b >= b1 ? 1 + .08 * Math.sin(Math.min(1, (b - b1) / .6) * Math.PI) * (1 - Math.min(1, (b - b1) / .6)) : 1;
    e.style.left = f2(x) + 'px'; e.style.top = f2(y) + 'px'; e.style.transform = `rotate(${f2((1 - k) * 8)}deg) scale(${f4(b < b1 ? 1.06 : sq)})`; vis(e, b >= b0); return [x + 150, y + 170]; };
  drag(0, 21, 22.2, [1980, 420], [290]); drag(1, 22.5, 23.7, [1980, 700], [560]);
  s.slots.forEach((e, i) => e.style.borderColor = b > [22.2, 23.7][i] ? 'rgba(246,125,28,.7)' : 'var(--line2)');
  /* brand + content */
  s.brand.style.borderColor = b > 24.6 && b < 26 ? 'var(--brand)' : 'var(--line2)';
  const n = typeK(s.content.querySelector('.t'), 'Sáng da sau 7 ngày · −30%', 24.8, 26.1); s.content.querySelector('.caret').style.opacity = b > 24.6 && b < 26.4 && (b < 26.1 || Math.floor(b * 2) % 2) ? 1 : 0;
  /* ratio clicks: 9:16 at 26.7, then (after generate) 1:1 at 32.7, 16:9 at 33.9 */
  const rsel = b < 26.7 ? 0 : b < 32.7 ? 4 : b < 33.9 ? 0 : 3; s.ratio.forEach((e, i) => e.classList.toggle('on', i === rsel));
  s.q.forEach((e, i) => e.classList.toggle('on', i === (b < 27.5 ? 0 : 1)));
  pressBtn(s.gen, 28.3);
  cursorAt(s, [[20.9, 1980, 420], [22.2, WX + 435, WY + 350], [22.5, 1980, 700], [23.7, WX + 705, WY + 350], [24.5, WX + 560, WY + 540], [25.4, WX + 560, WY + 640], [26.4, WX + 707, WY + 748], [27.2, WX + 414, WY + 848], [28.0, WX + 700, WY + 845], [28.9, WX + 700, WY + 845]], [22.2, 23.7, 24.6, 26.7, 27.5, 28.3]);
  /* aspect frame + output */
  const ar = track([[20, 1], [26.7, 9 / 16, 1.6, .75], [32.7, 1, 1.6, .75], [33.9, 16 / 9, 1.6, .75]]);
  const [fw, fh] = fitAR(ar), cx = 850 + 300, cy = 74 + 420, fx = cx - fw / 2, fy = cy - fh / 2;
  Object.assign(s.frame.style, { left: f2(fx) + 'px', top: f2(fy) + 'px', width: f2(fw) + 'px', height: f2(fh) + 'px' });
  s.dims.textContent = ar < .8 ? '1080 × 1920' : ar > 1.3 ? '1920 × 1080' : '1080 × 1080';
  const shown = b >= 30.4; vis(s.out, shown); vis(s.frame, !shown);
  if (shown) { Object.assign(s.out.style, { left: f2(fx) + 'px', top: f2(fy) + 'px', width: f2(fw) + 'px', height: f2(fh) + 'px' }); LUMI.layout(s.out.lumi, fw, fh);
    const rv = ease(ramp(30.4, 31.7, x => x)); s.out.style.webkitMaskImage = s.out.style.maskImage = `linear-gradient(180deg,#000 ${f2(rv * 130 - 30)}%,transparent ${f2(rv * 130)}%)`; }
  const gen = b >= 28.4 && b < 31.7; vis(s.scan, gen); vis(s.status, b >= 28.4 && b < 32.4);
  if (gen) { Object.assign(s.scan.style, { left: f2(fx) + 'px', top: f2(fy) + 'px', width: f2(fw) + 'px', height: f2(fh) + 'px', backgroundPosition: `${f2(100 - ((b - 28.4) * 60) % 100 * 3)}% 0`, opacity: f4(1 - ease(ramp(30.6, 31.7, x => x))) }); }
  const pr = clamp((b - 28.4) / 2.2); s.status.querySelector('.t').textContent = pr < 1 ? `gpt_image_2 · 2K · 9:16 · rendering… ${Math.round(pr * 100)}%` : 'gpt_image_2 · 2K · 9:16 · done ✓'; s.status.querySelector('.bar').style.width = f2(pr * 100) + '%';
  /* variants */
  const dk = ease(ramp(35.2, 36, x => x)); s.dim.style.opacity = f4(dk); vis(s.dim, dk > 0);
  s.vars.forEach((e, i) => { const k = sp(35.5 + i * .16, ...SPR.POP); e.style.transform = `translateY(${f2((1 - k) * 220)}px) rotate(${f2([-3, 2, -2, 3][i] * Math.min(1, k))}deg)`; e.style.opacity = f4(clamp(k * 2)); vis(e, b > 35.4); s.vlab[i].style.opacity = f4(ease(ramp(36 + i * .16, 36.6 + i * .16, x => x))); });
  s.vars[1].style.outline = b > 36.9 ? '4px solid #F67D1C' : 'none'; s.vars[1].style.outlineOffset = '6px';
  pop(s.heart, 36.9, [2.6, .45]);
  const tk = sp(37.3, ...SPR.SNAP); s.toast.style.transform = `translateY(${f2((1 - tk) * 140)}px)`; vis(s.toast, b > 37.2);
  if (b > 35.4 && b < 37.4) cursorAt(s, [[35.4, 1100, 800], [36.7, 170 + 410 + 310, 630], [37.4, 170 + 410 + 310, 630]], [36.9]);
});

/* 4 · BRAND STYLE — crawl a website into a brand kit (38.2–46.6) */
scene('brand', 38.3, 46.8, 'rise', (c, s) => {
  s.hl = [['Brand kit tự lấy từ <span class="o">website.</span>', 38.7, null]];
  s.h = HEAD(s, '02 · BRAND STYLE', s.hl, 0, 50, 64);
  s.web = el(c, `<div class="win" style="left:140px;top:250px;width:800px;height:640px;background:#FFF8F1;border-color:#E9DCCF"><div class="bar" style="background:#F2E8DD;border-color:#E3D5C6"><i></i><i></i><i></i><b style="color:#8C7B6B">lumiere-demo.vn</b></div>
    <div class="a" style="left:40px;top:76px;right:40px;display:flex;align-items:center;font:700 18px 'IBM Plex Sans';letter-spacing:.3em;color:#3A1D0B">LUMIÈRE<span style="margin-left:auto;display:flex;gap:26px;font-size:14px;letter-spacing:.05em;font-weight:500;color:#8C7B6B"><span>Serum</span><span>Routine</span><span>Ưu đãi</span></span></div>
    <div class="a" style="left:40px;top:160px;font:700 64px/1 'Playfair Display';color:#3A1D0B">Rạng rỡ<br><i>tự nhiên.</i></div>
    <div class="a" style="left:40px;top:320px;width:300px;font:400 18px/1.45 'IBM Plex Sans';color:#6B5646">Serum Vitamin C 15% — sáng da, mờ thâm sau 7 ngày.</div>
    <div class="a" style="left:40px;top:410px;padding:14px 26px;border-radius:99px;background:#3A1D0B;color:#FFE9D6;font:700 18px 'IBM Plex Sans'">Khám phá →</div>
    <div class="a" style="left:430px;top:130px;width:320px;height:420px;border-radius:24px;background:radial-gradient(circle at 50% 45%,#FFD2AE,#F67D1C)"><div class="a" style="left:70px;top:40px;width:180px;height:340px">${PROD.serum()}</div></div>
    <div class="a" style="left:40px;top:520px;display:flex;gap:10px"><i style="width:60px;height:60px;border-radius:12px;background:#FFB07A;display:block"></i><i style="width:60px;height:60px;border-radius:12px;background:#3A1D0B;display:block"></i><i style="width:60px;height:60px;border-radius:12px;background:#FFF1E4;border:1px solid #E9DCCF;display:block"></i></div>
    <div class="scan a" style="left:0;right:0;height:90px;background:linear-gradient(180deg,rgba(246,125,28,0),rgba(246,125,28,.35));border-bottom:3px solid #F67D1C"></div></div>`);
  s.scan = s.web.querySelector('.scan');
  s.kit = el(c, `<div class="card" style="left:1000px;top:250px;width:780px;height:640px"></div>`);
  const k = s.kit;
  el(k, `<div class="lab" style="left:34px;top:30px">Import từ URL</div>`);
  s.url = el(k, `<div class="fld" style="left:34px;top:60px;width:540px;height:58px;font:500 20px 'JetBrains Mono'"><span class="t"></span></div>`);
  s.crawl = el(k, `<div class="btn" style="left:590px;top:60px;width:156px;height:58px;font-size:20px">Crawl</div>`);
  s.stat = el(k, `<div class="a mono" style="left:34px;top:130px;font-size:15px;color:var(--brand-l)"></div>`);
  el(k, `<div class="a" style="left:34px;top:170px;right:34px;height:1.5px;background:var(--line)"></div>`);
  s.rows = [
    el(k, `<div class="a" style="left:34px;top:196px"><div class="lab" style="position:static">Logo</div><div style="margin-top:12px;font:700 30px 'IBM Plex Sans';letter-spacing:.3em">LUMIÈRE</div></div>`),
    el(k, `<div class="a" style="left:400px;top:196px"><div class="lab" style="position:static">Màu</div></div>`),
    el(k, `<div class="a" style="left:34px;top:320px"><div class="lab" style="position:static">Font</div><div style="margin-top:10px;font:700 32px 'Playfair Display'">Playfair Display</div><div style="font:500 22px 'IBM Plex Sans';color:var(--muted)">IBM Plex Sans</div></div>`),
    el(k, `<div class="a" style="left:400px;top:320px"><div class="lab" style="position:static">Tone</div></div>`),
    el(k, `<div class="a" style="left:34px;top:460px"><div class="lab" style="position:static">Style refs</div></div>`)];
  s.sw = ['#FFB07A', '#3A1D0B', '#FFF1E4'].map((col, i) => el(c, `<div class="a" style="width:64px;height:64px;border-radius:50%;background:${col};border:3px solid rgba(255,255,255,.9);box-shadow:3px 3px 0 rgba(0,0,0,.8)"></div>`));
  s.tone = ['Sang trọng', 'Tối giản', 'Tin cậy'].map((t, i) => el(k, `<div class="chip" style="left:${400 + [0, 150, 0][i]}px;top:${[360, 360, 410][i]}px;height:40px;font-size:16px;padding:0 16px">${t}</div>`));
  s.refs = [0, 7, 3].map((bi, i) => { const e = bi === 0 ? lumi(k, 34 + i * 170, 494, 150, 150, 'border-radius:12px;overflow:hidden') : el(k, `<div class="a" style="left:${34 + i * 170}px;top:494px;width:150px;height:150px;border-radius:12px;overflow:hidden">${BN.html(bi, 'position:absolute;inset:0;border-radius:0')}</div>`); return e; });
  s.bs = el(k, `<div class="btn" style="left:560px;top:560px;width:186px;height:58px;font-size:20px">${ico('spark', 20, '#fff')}Brainstorm</div>`);
}, (s, b) => {
  headK(s.h, s.hl, 38.5);
  const r = sp(38.3, 1.5, .86); s.web.style.transform = `translateY(${f2((1 - r) * 60)}px)`; s.kit.style.transform = `translateY(${f2((1 - r) * 110)}px)`;
  typeK(s.url.querySelector('.t'), 'https://lumiere-demo.vn', 39.2, 40.4); pressBtn(s.crawl, 40.8);
  cursorAt(s, [[39, 1500, 700], [40.4, 1668, 339], [41.2, 1668, 339], [44.6, 1668, 339], [45.2, 1653, 839], [45.8, 1653, 839]], [40.8, 45.3]);
  const sc = ramp(41, 42.6, x => x); s.scan.style.top = f2(46 + sc * 560) + 'px'; vis(s.scan, b > 41 && b < 42.7);
  s.stat.textContent = b < 41 ? '' : b < 42.6 ? `firecrawl · crawling… ${Math.min(12, Math.floor((b - 41) * 8))}/12 pages` : '✓ 12 pages · logo · 3 màu · 2 font · tone';
  /* swatches fly from the site to the kit (arc) */
  const from = [[180, 770], [250, 770], [320, 770]], to = [[1400, 480], [1480, 480], [1560, 480]];
  s.sw.forEach((e, i) => { const k = ease(ramp(42.6 + i * .18, 43.6 + i * .18, x => x)), x = lerp(from[i][0], to[i][0], k), y = lerp(from[i][1], to[i][1], k) - Math.sin(k * Math.PI) * 260;
    e.style.left = f2(x - 32) + 'px'; e.style.top = f2(y - 32) + 'px'; e.style.transform = `scale(${f4(1 + .35 * Math.sin(k * Math.PI))})`; vis(e, b > 42.55); });
  s.rows.forEach((e, i) => { e.style.opacity = f4(ease(ramp([42.8, 42.6, 43.3, 43.5, 44][i], [43.3, 43.1, 43.8, 44, 44.5][i], x => x))); });
  s.tone.forEach((e, i) => pop(e, 43.7 + i * .15));
  s.refs.forEach((e, i) => pop(e, 44.1 + i * .15));
  pop(s.bs, 44.6); pressBtn(s.bs, 45.3);
  if (b > 44.6) s.bs.style.boxShadow += `,0 0 0 ${f2(8 * (Math.sin((b - 44.6) * 4) * .5 + .5))}px rgba(246,125,28,.25)`;
  cam(s, 1 + .03 * ease(ramp(38.3, 46.8, x => x)), 960, 560);
});

/* 5 · UGC STUDIO — one face, many scenes (46.4–52.8) */
const face = (hair = '#2B1A12', skin = '#E9B8A0') => `<svg viewBox="0 0 120 120" width="100%" height="100%"><path d="M22 118 Q24 84 60 80 Q96 84 98 118Z" fill="#F6EDE3"/><circle cx="60" cy="50" r="24" fill="${skin}"/><path d="M34 54 Q30 18 62 20 Q94 22 88 58 Q84 38 64 36 Q46 36 34 54Z" fill="${hair}"/><path d="M84 50 Q96 70 88 92" stroke="${hair}" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
const shirt = `<svg viewBox="0 0 120 120" width="100%" height="100%"><path d="M40 20 L60 30 L80 20 L104 36 L94 56 L84 50 L84 104 L36 104 L36 50 L26 56 L16 36Z" fill="#F6EDE3" stroke="#E0CDB8" stroke-width="2"/><path d="M50 22 Q60 36 70 22" stroke="#F67D1C" stroke-width="4" fill="none"/></svg>`;
const ugcScene = (bg, i) => `<div class="a" style="inset:0;background:${bg}"></div>
  <div class="a" style="left:18%;top:26%;width:64%;height:74%">${`<svg viewBox="0 0 200 300" width="100%" height="100%"><path d="M30 300 Q30 196 100 186 Q170 196 170 300Z" fill="#F6EDE3"/><path d="M78 190 Q100 214 122 190" stroke="#F67D1C" stroke-width="5" fill="none"/><rect x="88" y="150" width="24" height="40" rx="8" fill="#E9B8A0"/><circle cx="100" cy="112" r="44" fill="#E9B8A0"/><path d="M84 116 Q89 112 94 116 M108 116 Q113 112 118 116" stroke="#5A2E1E" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M92 132 Q101 139 110 132" stroke="#C0564A" stroke-width="3.2" fill="none" stroke-linecap="round"/><path d="M52 122 Q44 52 104 56 Q162 60 152 128 Q146 90 110 86 Q76 86 52 122Z" fill="#2B1A12"/><path d="M150 110 Q170 160 156 204" stroke="#2B1A12" stroke-width="18" fill="none" stroke-linecap="round"/>
    <g transform="translate(${[118, 20, 120][i]} ${[196, 206, 200][i]}) rotate(${[-8, 10, -14][i]})"><rect x="0" y="0" width="34" height="62" rx="9" fill="#E8742A"/><rect x="8" y="-16" width="18" height="18" rx="4" fill="#1B1B1F"/><rect x="5" y="22" width="24" height="26" rx="3" fill="#FFF6EC"/></g><path d="M${[130, 60, 132][i]} 300 Q${[136, 50, 140][i]} 250 ${[134, 36, 136][i]} ${[232, 240, 236][i]}" stroke="#E9B8A0" stroke-width="16" fill="none" stroke-linecap="round"/></svg>`}</div>
  <div class="a" style="left:6%;right:6%;bottom:5%;padding:10px 14px;border-radius:12px;background:rgba(0,0,0,.45);color:#fff;font:600 17px 'IBM Plex Sans'">${['Dùng 7 ngày, da sáng hẳn.', 'Routine sáng 30 giây ☀', 'Mang theo cả khi đi biển.'][i]}</div>
  <div class="a" style="right:5%;top:40%;display:flex;flex-direction:column;gap:14px">${ico('heart', 26, '#fff')}${ico('send', 26, '#fff')}</div>`;
scene('ugc', 46.4, 53, 'pan', (c, s) => {
  s.hl = [['Một gương mặt. <span class="o">Nhiều bối cảnh.</span>', 46.9, null]];
  s.h = HEAD(s, '03 · UGC STUDIO', s.hl, 0, 50, 64);
  s.inp = [['Face', face()], ['Fashion', shirt], ['Product', PROD.serum()]].map(([l, art], i) => el(c, `<div class="card" style="left:170px;top:${250 + i * 225}px;width:380px;height:190px"><div class="a" style="left:22px;top:22px;width:146px;height:146px;border-radius:14px;background:${['#1A2541', '#1A2541', '#F5EFE8'][i]};overflow:hidden;padding:${i === 2 ? '10px 40px' : '8px'}">${art}</div><div class="a mono" style="left:190px;top:40px;font-size:16px;color:var(--brand-l)">${l}</div><div class="a" style="left:190px;top:72px;width:170px;font-size:19px;line-height:1.35;color:var(--muted)">${['Ảnh người mẫu tham chiếu', 'Trang phục, phong cách', 'Serum Lumière 30ml'][i]}</div></div>`));
  s.svg = el(c, `<svg class="a" style="left:0;top:0" width="1920" height="1080" viewBox="0 0 1920 1080">${[0, 1, 2].map(i => `<path class="p" pathLength="1" stroke-dasharray="1 1" d="M550 ${345 + i * 225} C 680 ${345 + i * 225}, 640 560, 760 560" stroke="#2C3A56" stroke-width="3" fill="none"/><path class="q" pathLength="1" stroke-dasharray="1 1" d="M550 ${345 + i * 225} C 680 ${345 + i * 225}, 640 560, 760 560" stroke="#F67D1C" stroke-width="3" fill="none"/>`).join('')}
    ${[0, 1, 2].map(i => `<path class="p" pathLength="1" stroke-dasharray="1 1" d="M800 560 C 860 560, 860 ${[330, 560, 790][i]}, ${[930, 930, 930][i]} ${[330, 560, 790][i]}" stroke="#2C3A56" stroke-width="3" fill="none"/>`).join('')}
    <circle class="hub" cx="780" cy="560" r="26" fill="#F67D1C"/></svg>`);
  s.hub = s.svg.querySelector('.hub');
  s.hubIco = el(c, `<div class="a" style="left:767px;top:547px">${ico('spark', 26, '#fff', 2.4)}</div>`);
  s.out = ['radial-gradient(circle at 70% 30%,#FFE2C4,#D9905E)', 'linear-gradient(180deg,#9FE3E8,#F7E6C4)', 'linear-gradient(180deg,#F4F4F2,#D9DCE3)'].map((bg, i) => el(c, `<div class="a pop" style="left:${960 + i * 320}px;top:${[250, 300, 250][i]}px;width:290px;height:516px;border-radius:22px;overflow:hidden">${ugcScene(bg, i)}</div>`));
  s.lab = el(c, `<div class="a note" style="left:960px;top:${840}px">face-consistent · 9:16 · illustrative</div>`);
}, (s, b) => {
  headK(s.h, s.hl, 46.7);
  s.inp.forEach((e, i) => { const k = sp(46.6 + i * .2, ...SPR.POP); e.style.transform = `translateX(${f2((1 - k) * -120)}px)`; e.style.opacity = f4(clamp(k * 1.5)); });
  s.svg.querySelectorAll('.p').forEach((p, i) => p.style.strokeDashoffset = f4(1 - ease(ramp(47.4 + (i % 3) * .12 + (i > 2 ? .8 : 0), 48.4 + (i % 3) * .12 + (i > 2 ? .8 : 0), x => x))));
  s.svg.querySelectorAll('.q').forEach((p, i) => { const g = ((b - 48.2 - i * .3) % 2 + 2) % 2 / 1.1; p.setAttribute('stroke-dasharray', '0.12 1'); p.style.strokeDashoffset = f4(-g * 1.12 + .12); vis(p, b > 48.2 && g < 1); });
  const hk = sp(48.1, 2.6, .5); s.hub.setAttribute('r', f2(26 * Math.max(0, hk))); s.hubIco.style.opacity = f4(clamp(hk)); s.hub.style.filter = `drop-shadow(0 0 ${f2(10 + 8 * Math.sin(b * 3))}px rgba(246,125,28,.6))`;
  s.out.forEach((e, i) => { e.dataset.base = `rotate(${[-3, 1.5, 3][i]}deg)`; pop(e, 48.9 + i * .3, SPR.POP, 8); });
  s.lab.style.opacity = f4(ease(ramp(50, 50.8, x => x)));
  cam(s, 1 + .04 * ease(ramp(48, 53, x => x)), 1200, 560);
});

/* 6 · STUDIO CHAT — brainstorm with AI (music breakdown, 52.6–60) */
const ANS = ['1. Before/After 7 ngày — bằng chứng thị giác', '2. Routine 30 giây buổi sáng — tiện lợi', '3. Deal −30% tuần này — tạo khẩn cấp'];
scene('chat', 52.6, 60.2, 'rise', (c, s) => {
  s.hl = [['Brainstorm ý tưởng <span class="o">cùng AI.</span>', 53, null]];
  s.h = HEAD(s, '04 · STUDIO CHAT', s.hl, 0, 50, 64);
  const w = s.win = el(c, `<div class="win" style="left:240px;top:220px;width:1440px;height:820px"><div class="bar"><i></i><i></i><i></i><b>ads manager · studio</b></div></div>`);
  el(w, `<div class="a" style="left:0;top:46px;width:320px;bottom:0;background:#0E1628;border-right:1.5px solid var(--line)"><div class="btn" style="left:22px;top:22px;width:276px;height:52px;font-size:18px">+ Phiên mới</div>
    ${['Lumière · Sale 30%', 'Brew&Bloom · Tết', 'Kinetic · New drop', 'Mộc · Mùa hè'].map((t, i) => `<div class="a" style="left:14px;top:${100 + i * 58}px;width:292px;height:48px;border-radius:10px;display:flex;align-items:center;padding:0 14px;font-size:17px;${i === 0 ? 'background:var(--raised);color:var(--fg);font-weight:600' : 'color:var(--muted)'}">${t}</div>`).join('')}</div>`);
  s.pins = ['Campaign: Lumière Sale 30%', 'Ad Set: Nữ 22–35 · HCM', 'Brand: LUMIÈRE', 'Model: Coachio LLM'].map((t, i) => el(w, `<div class="chip" style="left:${350 + [0, 330, 620, 820][i]}px;top:66px;height:40px;font-size:15px;padding:0 14px">${t}</div>`));
  s.user = el(w, `<div class="a" style="right:40px;top:150px;max-width:760px;padding:18px 24px;border-radius:18px 18px 4px 18px;background:rgba(246,125,28,.14);border:1.5px solid rgba(246,125,28,.45);font-size:24px;font-weight:500"><span class="t"></span></div>`);
  s.ai = el(w, `<div class="a" style="left:350px;top:260px;width:780px;padding:22px 26px;border-radius:18px 18px 18px 4px;background:var(--raised);border:1.5px solid var(--line2);font-size:23px;line-height:1.6"><div class="mono" style="font-size:14px;color:var(--brand-l);margin-bottom:8px">✦ Coachio LLM</div>${ANS.map(() => '<div class="l" style="white-space:nowrap;height:37px"></div>').join('')}</div>`);
  s.mk = el(w, `<div class="btn" style="left:350px;top:520px;width:250px;height:60px;font-size:20px">${ico('spark', 20, '#fff')}Tạo Creative</div>`);
  el(w, `<div class="fld" style="left:350px;top:720px;width:1060px;height:62px;color:var(--subtle);font-size:19px">Hỏi tiếp, hoặc dán link sản phẩm…<span style="margin-left:auto;color:var(--brand)">${ico('send', 22, '#F67D1C')}</span></div>`);
}, (s, b) => {
  headK(s.h, s.hl, 52.8);
  const r = sp(52.6, 1.5, .86); s.win.style.transform = `translateY(${f2((1 - r) * 80)}px)`;
  s.pins.forEach((e, i) => pop(e, 53.2 + i * .15));
  const ku = sp(53.8, ...SPR.POP); s.user.style.transform = `scale(${f4(Math.max(0, ku))})`; s.user.style.transformOrigin = '100% 100%'; vis(s.user, ku > .003);
  typeK(s.user.querySelector('.t'), 'Gợi ý 3 góc quảng cáo cho serum Vitamin C.', 53.8, 55);
  const ka = sp(55.4, ...SPR.POP); s.ai.style.transform = `scale(${f4(Math.max(0, ka))})`; s.ai.style.transformOrigin = '0 100%'; vis(s.ai, ka > .003);
  s.ai.querySelectorAll('.l').forEach((e, i) => typeK(e, ANS[i], 55.8 + i * .85, 56.6 + i * .85));
  pop(s.mk, 58.4); pressBtn(s.mk, 59.3);
  cursorAt(s, [[58, 1300, 900], [59, 715, 790], [59.8, 715, 790]], [59.3]);
  cam(s, 1.02 + .06 * ease(ramp(54, 60, x => x)), 900, 600);
});

/* 7 · CAMPAIGN WIZARD — campaign → ad sets → creatives (59.8–64.8) */
const ADS = ['Nữ 22–30 · HCM', 'Nữ 30–40 · Hà Nội', 'Retarget 30 ngày'];
scene('camp', 59.8, 64.9, 'push', (c, s) => {
  s.hl = [['AI dựng cả campaign <span class="o">trong một lần.</span>', 60.2, null]];
  s.h = HEAD(s, '05 · CAMPAIGN WIZARD', s.hl, 0, 50, 64);
  const g = el(c, `<div class="a" style="left:150px;top:0;width:1920px;height:1080px"></div>`); const ay = i => 300 + i * 220;
  let d = ''; ADS.forEach((_, i) => { d += `<path class="p" pathLength="1" stroke-dasharray="1 1" d="M590 560 C 700 560, 660 ${ay(i) + 65}, 780 ${ay(i) + 65}" stroke="#2C3A56" stroke-width="3" fill="none"/><path class="q" pathLength="1" d="M590 560 C 700 560, 660 ${ay(i) + 65}, 780 ${ay(i) + 65}" stroke="#F67D1C" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    [0, 1].forEach(j => d += `<path class="p" pathLength="1" stroke-dasharray="1 1" d="M1140 ${ay(i) + 65} C 1190 ${ay(i) + 65}, 1190 ${ay(i) + 65}, ${1240 + j * 190} ${ay(i) + 65}" stroke="#2C3A56" stroke-width="3" fill="none"/>`); });
  s.svg = el(g, `<svg class="a" style="left:0;top:0" width="1920" height="1080">${d}</svg>`);
  s.cp = el(g, `<div class="card" style="left:170px;top:450px;width:420px;height:220px;border-color:rgba(246,125,28,.6)"><div class="lab" style="left:28px;top:24px;color:var(--brand)">Campaign</div><div class="a" style="left:28px;top:56px;font-size:30px;font-weight:700">Lumière · Sale 30%</div><div class="a" style="left:28px;top:104px;font-size:19px;color:var(--muted)">Mục tiêu: Doanh số · CBO</div><div class="a mono" style="left:28px;top:150px;font-size:26px;font-weight:700;color:var(--brand-l)"><span class="n">0</span> ₫ / ngày</div></div>`);
  s.as = ADS.map((t, i) => el(g, `<div class="card" style="left:780px;top:${ay(i)}px;width:360px;height:130px"><div class="lab" style="left:24px;top:22px">Ad set ${i + 1}</div><div class="a" style="left:24px;top:52px;font-size:25px;font-weight:600">${t}</div><div class="a mono" style="left:24px;top:92px;font-size:14px;color:var(--subtle)">Advantage+ · FB/IG Feed</div></div>`));
  s.cr = []; ADS.forEach((_, i) => [0, 1].forEach(j => { const bi = [0, 7, 2, 4, 6, 5][i * 2 + j]; s.cr.push(bi === 0 ? lumi(g, 1240 + j * 190, ay(i) - 10, 150, 150, 'border-radius:12px;overflow:hidden;box-shadow:4px 4px 0 rgba(0,0,0,.85)') : el(g, banner(bi, 1240 + j * 190, ay(i) - 10, 150, 150, 'border-radius:12px'))); }));
  s.note = el(g, `<div class="a note" style="left:1240px;top:${300 + 2 * 220 + 160}px">6 creative · số liệu minh hoạ</div>`);
}, (s, b) => {
  headK(s.h, s.hl, 60);
  pop(s.cp, 60.2, SPR.POP);
  s.cp.querySelector('.n').textContent = Math.round(200000 * VP.eOutQuint(ramp(61, 62.6, x => x))).toLocaleString('vi-VN');
  s.svg.querySelectorAll('.p').forEach((p, i) => { const col = i % 3; p.style.strokeDashoffset = f4(1 - ease(ramp(60.8 + (col ? 1.1 : 0) + Math.floor(i / 3) * .15, 61.6 + (col ? 1.1 : 0) + Math.floor(i / 3) * .15, x => x))); });
  s.svg.querySelectorAll('.q').forEach((p, i) => { const g = (((b - 62 - i * .35) % 1.6) + 1.6) % 1.6 / 1.1; p.setAttribute('stroke-dasharray', '0.1 1.2'); p.style.strokeDashoffset = f4(-g * 1.1 + .1); vis(p, b > 62 && g < 1); });
  s.as.forEach((e, i) => pop(e, 61.2 + i * .18));
  s.cr.forEach((e, i) => pop(e, 62.1 + i * .1, SPR.POP, i % 2 ? 6 : -6));
  s.note.style.opacity = f4(ease(ramp(63, 63.6, x => x)));
  cam(s, 1.05 - .05 * ease(ramp(59.8, 64.9, x => x)), 960, 560);
});

/* 8 · QUEUE — approve, then push (the quiet break before the drop, 64.5–68) */
const COLS = ['Draft', 'Ready', 'Pushing', 'Pushed'];
scene('queue', 64.5, 67, 'rise', (c, s) => {
  s.hl = [['Duyệt trong Queue — <span class="o">đẩy lên Meta.</span>', 64.8, null]];
  s.h = HEAD(s, '06 · QUEUE', s.hl, 150, 50, 60, 1200, 'left');
  s.btn = el(s.hud, `<div class="btn" style="left:1420px;top:78px;width:350px;height:84px;font-size:28px">${ico('send', 26, '#fff')}Push to Meta</div>`);
  s.cols = COLS.map((t, i) => el(c, `<div class="card" style="left:${150 + i * 410}px;top:230px;width:390px;height:800px;background:rgba(17,26,46,.8)"><div class="a mono" style="left:24px;top:22px;font-size:18px;font-weight:700;color:${i === 3 ? 'var(--ok)' : i === 2 ? 'var(--brand-l)' : 'var(--muted)'}">${t.toUpperCase()}</div></div>`));
  const card = (bi, t) => `<div class="a" style="width:350px;height:130px;border-radius:14px;background:var(--raised);border:1.5px solid var(--line2);overflow:hidden"><div class="a" style="left:12px;top:12px;width:106px;height:106px;border-radius:10px;overflow:hidden">${bi === 0 ? '' : BN.html(bi, 'position:absolute;inset:0;border-radius:0')}</div><div class="a" style="left:134px;top:24px;font-size:20px;font-weight:600">${t}</div><div class="a mono" style="left:134px;top:64px;font-size:14px;color:var(--subtle)">FB/IG · 1:1</div></div>`;
  s.cards = [[7, 'Étoile · Hương nàng', 0, 1], [2, 'Kinetic · Run', 0, 2], [8, 'Nomad · Đi xa', 0, 0], [4, 'Aura · Nghe là mê', 1, 0], [3, 'Mộc · Matcha', 1, 1], [1, 'Brew · Mua 1 tặng 1', 3, 0], [5, '11.11 · Siêu sale', 3, 1]].map(([bi, t, col, row]) => { const e = el(c, card(bi, t)); e.col = col; e.row = row; return e; });
}, (s, b) => {
  headK(s.h, s.hl, 64.6);
  const r = sp(64.5, 1.5, .86); s.cols.forEach((e, i) => e.style.transform = `translateY(${f2((1 - sp(64.5 + i * .08, 1.5, .86)) * 120)}px)`);
  s.cards.forEach((e, i) => { let col = e.col, row = e.row; const mv = i < 2 ? ease(ramp(65.1 + i * .25, 65.8 + i * .25, x => x)) : 0; const x0 = 170 + col * 410, x1 = 170 + (col + 1) * 410, y0 = 290 + row * 150, y1 = 290 + (row + 1) * 150;
    e.style.left = f2(lerp(x0, x1, mv)) + 'px'; e.style.top = f2(lerp(y0, y1, mv) - Math.sin(mv * Math.PI) * 30) + 'px'; e.style.transform = `rotate(${f2(Math.sin(mv * Math.PI) * 3)}deg) translateY(${f2((1 - r) * 120)}px)`; e.style.zIndex = mv > 0 && mv < 1 ? 5 : 1; });
  pop(s.btn, 65.2); pressBtn(s.btn, 66.75);
  if (b > 66) s.btn.style.boxShadow += `,0 0 0 ${f2(10 * (Math.sin((b - 66) * 6) * .5 + .5))}px rgba(246,125,28,.3)`;
  cursorAt(s, [[65.6, 1300, 700], [66.5, 1600, 124], [67, 1600, 124]], [66.75]);
});

/* 9 · LIVE — the drop: a wall of ads going live (68–80.4) */
scene('live', 67, 80.6, 'cut', (c, s) => {
  s.wall = el(c, `<div class="a" style="left:-400px;top:-300px;width:2720px;height:1680px;transform:rotate(-9deg)"></div>`);
  s.rows = [0, 1, 2, 3].map(r => { const row = el(s.wall, `<div class="a" style="left:0;top:${170 + r * 330}px;height:300px;width:6000px"></div>`); for (let i = 0; i < 16; i++) { const bi = (i * 3 + r * 5) % 9; if (bi === 0) lumi(row, i * 330, 0, 300, 300, 'border-radius:16px;overflow:hidden;box-shadow:6px 6px 0 rgba(0,0,0,.85)'); else el(row, banner(bi, i * 330, 0, 300, 300, 'border-radius:16px')); } return row; });
  s.shade = el(c, `<div class="a" style="inset:0;background:radial-gradient(70% 60% at 50% 50%,rgba(11,18,32,.92) 30%,rgba(11,18,32,.35) 100%)"></div>`);
  s.hl = [['Đẩy thẳng lên <span class="o">Meta Ads.</span>', 67.3, 73.4], ['Hàng chục banner. <span class="o">Mỗi ngày.</span>', 73.6, null]];
  s.h = HEAD(s, '', s.hl, 0, 340, 120);
  s.sub = el(s.hud, `<div class="a" style="left:0;right:0;top:540px;text-align:center;font-size:34px;font-weight:500;color:var(--muted)">${words('Campaign → Ad Set → Creative → Ad, qua Marketing API.')}</div>`);
  s.stats = [['24', 'creative'], ['9', 'ad set'], ['3', 'campaign']].map(([n, l], i) => el(s.hud, `<div class="a" style="left:${560 + i * 290}px;top:650px;width:260px;text-align:center"><div class="mono n" style="font-size:72px;font-weight:700;color:var(--fg)">0</div><div style="font-size:24px;color:var(--muted)">${l}</div></div>`));
  s.live = el(s.hud, `<div class="chip" style="left:860px;top:830px;height:52px;font-size:20px;color:var(--ok);border-color:rgba(110,231,183,.4);background:rgba(16,185,129,.1)">${ico('check', 20, '#6EE7B7', 3)}Pushed · Active</div>`);
  s.il = el(s.hud, `<div class="a mono" style="right:40px;bottom:30px;font-size:15px;color:var(--subtle)">số liệu minh hoạ</div>`);
}, (s, b) => {
  const t = (b - 67) * B; s.rows.forEach((r, i) => r.style.transform = `translateX(${f2((i % 2 ? -1 : 1) * t * 70 - (i % 2 ? 900 : 1600))}px)`);
  cam(s, 1.16 - .16 * ease(ramp(67, 75, x => x)), 960, 540);
  s.shade.style.opacity = f4(.55 + .45 * ease(ramp(67.2, 68, x => x)));
  headK(s.h, s.hl);
  wordsK(s.sub, 68.4, .1, 73.2);
  s.stats.forEach((e, i) => { const k = VP.eOutQuint(ramp(69.2 + i * .2, 71.4 + i * .2, x => x)); e.querySelector('.n').textContent = Math.round([24, 9, 3][i] * k); e.style.opacity = f4(clamp((b - 69.2 - i * .2) * 3)); e.style.transform = `translateY(${f2((1 - sp(69.2 + i * .2, ...SPR.POP)) * 40)}px)`; });
  pop(s.live, 71.8); s.il.style.opacity = f4(ease(ramp(70, 71, x => x)));
});

/* 10 · SOCIAL FRAMES + MCP (80.2–90.6) */
const SLIDES = [['5 bước', 'dưỡng sáng da', '#F67D1C', '#fff'], ['01', 'Làm sạch dịu nhẹ', '#FFF6EC', '#3A1D0B'], ['02', 'Cân bằng với toner', '#FFF6EC', '#3A1D0B'], ['03', 'Serum Vitamin C', '#FFF6EC', '#3A1D0B'], ['04', 'Chống nắng mỗi sáng', '#FFF6EC', '#3A1D0B']];
const CMD = 'tạo 6 banner sale 11.11 cho LUMIÈRE, tỉ lệ 1:1';
scene('agents', 80.2, 90.8, 'push', (c, s) => {
  s.hl = [['Carousel cho social. <span class="o">Agent AI gọi thẳng.</span>', 80.6, null]];
  s.h = HEAD(s, '07 · SOCIAL FRAMES + MCP', s.hl, 0, 50, 62);
  s.slides = SLIDES.map(([n, t, bg, fg], i) => el(c, `<div class="a pop" style="left:${450 - 150}px;top:${420}px;width:300px;height:375px;border-radius:18px;background:${bg};color:${fg};overflow:hidden;transform-origin:50% 150%">
    <div class="a" style="left:26px;top:24px;font:700 13px 'IBM Plex Sans';letter-spacing:.3em;opacity:.8">LUMIÈRE</div>
    <div class="a" style="left:26px;top:${i ? 90 : 110}px;font:800 ${i ? 96 : 66}px/0.95 'Be Vietnam Pro';color:${i ? '#F67D1C' : fg}">${n}</div>
    <div class="a" style="left:26px;top:${i ? 206 : 190}px;width:250px;font:700 ${i ? 30 : 40}px/1.15 'IBM Plex Sans'">${t}</div>
    <div class="a mono" style="right:22px;bottom:18px;font-size:14px;opacity:.7">${i + 1}/5</div></div>`));
  s.lab = el(c, `<div class="a note" style="left:180px;top:950px">Social Frames · 4:5 · carousel</div>`);
  s.term = el(c, `<div class="win" style="left:880px;top:240px;width:900px;height:680px;background:#070B14"><div class="bar"><i></i><i></i><i></i><b>agent · mcp</b></div>
    <div class="a mono" style="left:30px;top:74px;right:30px;font-size:21px;line-height:1.7;color:var(--fg)">
      <div><span class="o">›</span> <span class="cmd"></span><i class="caret" style="display:inline-block;width:10px;height:22px;background:var(--brand);vertical-align:-3px;margin-left:2px"></i></div>
      <div class="l1" style="color:var(--muted)">⚙ mcp · <span style="color:#93C5FD">banner.generate</span>(brand: "lumiere", n: 6, ratio: "1:1")</div>
      <div class="l2" style="color:var(--ok)">✓ 6 ảnh · đã lưu vào History</div></div></div>`);
  s.cmd = s.term.querySelector('.cmd'); s.caret = s.term.querySelector('.caret'); s.l1 = s.term.querySelector('.l1'); s.l2 = s.term.querySelector('.l2');
  s.thumbs = [5, 5, 5, 5, 5, 5].map((bi, i) => el(s.term, `<div class="a" style="left:${30 + (i % 3) * 285}px;top:${i < 3 ? 250 : 460}px;width:265px;height:190px;border-radius:12px;overflow:hidden">${BN.html(5, 'position:absolute;inset:0;border-radius:0;filter:hue-rotate(' + [0, -12, 12, -24, 24, 6][i] + 'deg)')}</div>`));
}, (s, b) => {
  headK(s.h, s.hl, 80.4);
  s.slides.forEach((e, i) => { const ps = [0, -2, -1, 1, 2][i], k = sp(80.8 + Math.abs(ps) * .12, 1.8, .7), a = ps * 9 * k, dx = ps * 92 * k, dy = Math.abs(ps) * 22 * k; e.style.transform = `translate(${f2(dx)}px,${f2(dy + (1 - Math.min(1, sp(80.4, ...SPR.POP))) * 400)}px) rotate(${f2(a)}deg)`; e.style.zIndex = 10 - Math.abs(ps); vis(e, b > 80.3); });
  s.lab.style.opacity = f4(ease(ramp(82, 82.8, x => x)));
  const r = sp(81.2, 1.6, .85); s.term.style.transform = `translateY(${f2((1 - r) * 140)}px)`; s.term.style.opacity = f4(clamp(r * 2));
  typeK(s.cmd, CMD, 82.2, 84.6); s.caret.style.opacity = b < 84.8 && Math.floor(b * 2) % 2 ? 1 : 0; vis(s.caret, b < 85);
  vis(s.l1, b > 85); vis(s.l2, b > 86.2); s.l1.style.opacity = f4(b > 85 && b < 86.2 ? .55 + .45 * Math.sin(b * 9) : 1);
  s.thumbs.forEach((e, i) => pop(e, 86.4 + i * .14, SPR.POP));
  cam(s, 1 + .035 * ease(ramp(80.2, 90.8, x => x)), 1300, 560);
});

/* 11 · END — logo, promise, air (90.4–100) */
scene('end', 90.4, 101, 'iris', (c, s) => {
  s.wall = el(c, `<div class="a" style="left:-200px;top:-200px;width:2320px;height:1480px;transform:rotate(-9deg);opacity:.1"></div>`);
  el(c, `<div class="a" style="inset:0;background:radial-gradient(60% 55% at 50% 50%,rgba(11,18,32,.9) 35%,rgba(11,18,32,.2) 100%)"></div>`);
  s.rows = [0, 1, 2, 3].map(r => { const row = el(s.wall, `<div class="a" style="left:0;top:${100 + r * 330}px;height:300px;width:6000px"></div>`); for (let i = 0; i < 12; i++) el(row, banner(1 + (i + r * 2) % 8, i * 330, 0, 300, 300)); return row; });
  s.tile = el(c, `<div class="a" style="left:0;top:330px;width:150px;height:150px">${logoTile(150)}</div>`);
  s.wm = el(c, `<div class="a" style="left:0;top:318px;height:170px;white-space:nowrap;font-size:140px;font-weight:700;letter-spacing:-.035em;line-height:170px">AI Banner <span class="o">Pro</span></div>`);
  s.tag = el(c, `<div class="a" style="left:0;right:0;top:540px;text-align:center;font-size:54px;font-weight:600">${words('Từ brief đến quảng cáo đang chạy.')}</div>`);
  s.chips = ['Banner', 'UGC', 'Brand kit', 'Campaign', 'Meta Ads', 'MCP'].map((t, i) => el(c, `<div class="chip" style="top:680px">${t}</div>`));
  s.by = el(c, `<div class="a mono" style="left:0;right:0;top:960px;text-align:center;font-size:18px;color:var(--muted)">Powered by Coachio AI · Gemini · GPT Image 2</div>`);
}, (s, b) => {
  const t = (b - 90.4) * B; s.rows.forEach((r, i) => r.style.transform = `translateX(${f2((i % 2 ? -1 : 1) * t * 30 - 800)}px)`);
  const wmW = s.wm.scrollWidth, tot = 150 + 40 + wmW, x0 = 960 - tot / 2; s.tile.style.left = f2(x0) + 'px'; s.wm.style.left = f2(x0 + 190) + 'px';
  pop(s.tile, 91, [2.3, .55], -30);
  const rv = ease(ramp(91.4, 92.6, x => x)); s.wm.style.clipPath = `inset(-10% ${f2((1 - rv) * 100)}% -10% 0)`; s.wm.style.transform = `translateX(${f2((1 - rv) * -30)}px)`;
  wordsK(s.tag, 92.8, .14);
  let cx = 0; const ws = s.chips.map(e => e.offsetWidth), tw = ws.reduce((a, v) => a + v, 0) + 16 * (ws.length - 1); s.chips.forEach((e, i) => { e.style.left = f2(960 - tw / 2 + cx) + 'px'; cx += ws[i] + 16; pop(e, 94.2 + i * .12); });
  s.by.style.opacity = f4(ease(ramp(95.6, 96.6, x => x)));
  cam(s, 1.04 - .04 * ease(ramp(90.4, 100, x => x)), 960, 500);
});

/* ===== transitions ===== */
function trans(s, b) {
  const k = ['none', 'cut'].includes(s.in) ? 1 : sp(s.start, 1.5, .86); let tf = '', clip = '';
  switch (s.in) {
    case 'pan': case 'push': tf = `translateX(${f2((1 - k) * W)}px)`; break;
    case 'rise': tf = `translateY(${f2((1 - k) * H)}px)`; break;
    case 'iris': clip = `circle(${f2(Math.hypot(W, H) / 2 * clamp(k * 1.02))}px at 50% 50%)`; s.root.style.background = 'var(--bg)'; break;
  }
  const nx = S[S.indexOf(s) + 1];
  if (nx && b >= nx.start) { const kx = sp(nx.start, 1.5, .86);
    tf += { pan: ` translateX(${f2(-kx * W)}px)`, push: ` translateX(${f2(-kx * W * .3)}px)`, rise: ` translateY(${f2(-kx * H * .25)}px)`, iris: ` scale(${f4(lerp(1, .96, kx))})`, none: '', cut: '' }[nx.in] || ''; }
  s.root.style.transform = tf; s.root.style.clipPath = clip;
}

/* ===== frame ===== */
const DUR = 100 * B;
const g1 = $('#g1'), g2 = $('#g2'), dots = $('#bg .dots'), cur = $('#cur'), ring = $('#ring'), flash = $('#flash');
function frame(t) {
  const b = VP.at(t); CUR = null;
  /* living background: two glow fields drifting, dots parallax */
  Object.assign(g1.style, { left: f2(1200 + 260 * Math.sin(t * .23)) + 'px', top: f2(-260 + 120 * Math.cos(t * .19)) + 'px', width: '1300px', height: '1300px', background: 'radial-gradient(closest-side,rgba(246,125,28,.16),rgba(246,125,28,0))' });
  Object.assign(g2.style, { left: f2(-420 + 200 * Math.cos(t * .17)) + 'px', top: f2(420 + 140 * Math.sin(t * .21)) + 'px', width: '1200px', height: '1200px', background: 'radial-gradient(closest-side,rgba(37,99,235,.13),rgba(37,99,235,0))' });
  dots.style.transform = `translate(${f2(-(t * 6) % 36)}px,${f2(-(t * 3) % 36)}px)`;
  S.forEach(s => { const on = b >= s.start - .01 && b < s.end; s.root.style.display = on ? 'block' : 'none'; if (!on) return; trans(s, b); s.anim(s, b); });
  /* drop flash */
  const fk = b >= 67 && b < 67.6 ? 1 - (b - 67) / .6 : 0; flash.style.display = fk > 0 ? 'block' : 'none'; flash.style.opacity = f4(fk * fk * .9);
  if (CUR) { cur.style.display = 'block'; cur.style.transform = `translate(${f2(CUR.x - 8)}px,${f2(CUR.y - 4)}px) scale(${f4(1 - .15 * CUR.press)})`;
    if (CUR.ring) { ring.style.display = 'block'; ring.style.left = f2(CUR.ring.x) + 'px'; ring.style.top = f2(CUR.ring.y) + 'px'; ring.style.transform = `scale(${f4(.2 + .9 * eOut(CUR.ring.k))})`; ring.style.opacity = f4(1 - CUR.ring.k); } else ring.style.display = 'none';
  } else { cur.style.display = 'none'; ring.style.display = 'none'; }
}
function cues() {
  const c = [{ beat: 0.4, type: 'swoosh', gain: -26 }];
  S.forEach(s => { if (!['none', 'cut'].includes(s.in) && s.start > 1) c.push({ beat: s.start, type: s.in === 'iris' ? 'swoosh-deep' : 'swoosh', gain: -22 }); });
  [7.6, 22.2, 23.7, 26.7, 27.5, 28.3, 36.9, 40.8, 45.3, 59.3, 66.75].forEach(bt => c.push({ beat: bt, type: 'click', gain: -19 }));
  c.push({ beat: 8.1, type: 'rise', gain: -22 }, { beat: 12.2, type: 'hit', gain: -15 }, { beat: 19.3, type: 'swoosh-deep', gain: -18 }, { beat: 31.4, type: 'pop', gain: -20 }, { beat: 37.3, type: 'notify', gain: -21 },
    { beat: 67, type: 'boom', gain: -12 }, { beat: 71.8, type: 'coin', gain: -20 }, { beat: 86.2, type: 'notify', gain: -21 }, { beat: 91, type: 'hit', gain: -15 });
  [0, 1, 2].forEach(i => c.push({ beat: 48.9 + i * .3, type: 'pop', gain: -23 }));
  return c;
}
VP.boot({ seek: frame, dur: DUR, cues, fonts: ['700 40px "IBM Plex Sans"', '500 40px "IBM Plex Sans"', '500 20px "JetBrains Mono"', '800 40px "Be Vietnam Pro"', '700 40px "Playfair Display"', 'italic 700 40px "Playfair Display"'] });
window.SIZE = [W, H]; window.B = B;
