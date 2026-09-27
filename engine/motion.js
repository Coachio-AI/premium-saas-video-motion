/* VideoPremium motion engine — deterministic, seek(t)-based.
 * Every frame is a pure function of time. No CSS transitions, no rAF-driven state.
 * Load with <script src="../../engine/motion.js"></script>; everything lives on window.VP.
 */
(function () {
  const VP = {};
  VP.clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  VP.lerp = (a, b, t) => a + (b - a) * t;
  VP.ease = t => { t = VP.clamp(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };   // in-out cubic
  VP.eOut = t => { t = VP.clamp(t); return 1 - Math.pow(1 - t, 3); };
  VP.eOutQuint = t => { t = VP.clamp(t); return 1 - Math.pow(1 - t, 5); };
  VP.eOutBack = (t, s = 1.4) => { t = VP.clamp(t) - 1; return 1 + (s + 1) * t * t * t + s * t * t; };

  /* Closed-form damped spring 0→1. t in seconds. f = frequency (Hz), z = damping ratio (<1 overshoots).
   * Presets: SNAP {f:2.6,z:.8}  POP {f:2.4,z:.62}  GLIDE {f:1.4,z:.9}  HEAVY {f:1.2,z:.75} */
  VP.spring = (t, f = 2.2, z = .72) => {
    if (t <= 0) return 0; if (z >= 1) z = .999;
    const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + z * w / wd * Math.sin(wd * t));
  };
  VP.SPR = { SNAP: [2.6, .8], POP: [2.4, .62], GLIDE: [1.4, .9], HEAVY: [1.2, .75], SOFT: [1.8, .85] };

  /* Beat clock. Call VP.clock(bpm) once; then VP.at(t) sets the current beat for sp()/track(). */
  let B = .5, bt = 0;
  VP.clock = bpm => { B = 60 / bpm; VP.B = B; return B; };
  VP.at = t => { bt = t / B; VP.bt = bt; return bt; };
  VP.sp = (b0, f = 2.2, z = .72) => VP.spring((bt - b0) * B, f, z);          // spring triggered at beat b0
  VP.ramp = (b0, b1, fn = VP.ease) => fn((bt - b0) / (b1 - b0));             // eased 0→1 between two beats

  /* Superposed spring track: keys [[beat, value|array, f, z], ...]. Continuous even when keys overlap. */
  VP.track = keys => {
    const arr = Array.isArray(keys[0][1]); let v = arr ? keys[0][1].slice() : keys[0][1];
    for (let i = 1; i < keys.length; i++) {
      const [b0, val, f = 2.2, z = .72] = keys[i]; if (bt <= b0) break;
      const s = VP.sp(b0, f, z), prev = keys[i - 1][1];
      if (arr) for (let j = 0; j < v.length; j++) v[j] += (val[j] - prev[j]) * s; else v += (val - prev) * s;
    }
    return v;
  };

  /* Rect helpers: r = [x, y, w, h, radius] */
  VP.place = (el, r) => { const s = el.style; s.left = r[0] + 'px'; s.top = r[1] + 'px'; s.width = Math.max(0, r[2]) + 'px'; s.height = Math.max(0, r[3]) + 'px'; if (r[4] !== undefined) s.borderRadius = Math.max(0, r[4]) + 'px'; };
  VP.outset = (r, o) => [r[0] - o, r[1] - o, r[2] + 2 * o, r[3] + 2 * o, (r[4] || 0) + o];
  VP.zoomAbout = (r, cx, cy, z) => [cx + (r[0] - cx) * z, cy + (r[1] - cy) * z, r[2] * z, r[3] * z, (r[4] || 0) * z];
  VP.scaleRect = (r, s) => { const cx = r[0] + r[2] / 2, cy = r[1] + r[3] / 2; return [cx - r[2] * s / 2, cy - r[3] * s / 2, r[2] * s, r[3] * s, (r[4] || 0) * s]; };
  VP.show = (el, on) => { el.style.display = on ? (el.dataset.d || 'block') : 'none'; };   // set el.dataset.d='flex' for flex boxes
  VP.mix = (a, b, k) => a.map((x, i) => Math.round(VP.lerp(x, b[i], k)));
  VP.hex = h => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };

  /* Masked roll: parent has overflow:hidden; k 0 = below, 1 = in place, 2 = gone above. No fades. */
  VP.roll = (inner, k, h) => { const y = k <= 1 ? (1 - k) * h * 1.08 : -(k - 1) * h * 1.08; inner.style.transform = `translateY(${y.toFixed(2)}px)`; };

  /* Camera (screen-studio zoom): scale z about focus (fx,fy) — focus stays put on screen. */
  VP.camera = (el, z, fx, fy) => { el.style.transformOrigin = '0 0'; el.style.transform = `translate(${fx - fx * z}px,${fy - fy * z}px) scale(${z})`; };

  /* Measure natural text width. IMPORTANT: clears a fixed width first — offsetWidth of an element whose
   * width you set last frame returns that width, and display:none returns 0. */
  VP.naturalWidth = el => { const w = el.style.width, d = el.style.display; el.style.width = 'auto'; if (d === 'none') el.style.display = 'block'; const v = el.offsetWidth; el.style.width = w; el.style.display = d; return v; };

  /* ---------- Liquid glass: cloned backdrop + SVG displacement, 3 scales = chromatic refraction ---------- */
  const mapCache = {}; let defs = null;
  function glassFilter(W, H, R) {
    const k = W + 'x' + H + 'r' + R; if (mapCache[k]) return mapCache[k];
    if (!defs) { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('width', 0); s.setAttribute('height', 0); s.style.position = 'absolute'; s.innerHTML = '<defs></defs>'; document.body.appendChild(s); defs = s.firstChild; }
    const bev = Math.max(6, Math.min(R, 34)), c = document.createElement('canvas'); c.width = W; c.height = H;
    const x = c.getContext('2d'), im = x.createImageData(W, H);
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const qx = Math.abs(i + .5 - W / 2) - (W / 2 - R), qy = Math.abs(j + .5 - H / 2) - (H / 2 - R);
      const ox = Math.max(qx, 0), oy = Math.max(qy, 0), d = R - (Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0));
      let nx = 0, ny = 0;
      if (qx > 0 || qy > 0) { const l = Math.hypot(ox, oy) || 1; nx = ox / l * Math.sign(i - W / 2); ny = oy / l * Math.sign(j - H / 2); }
      else if (qx > qy) nx = Math.sign(i - W / 2); else ny = Math.sign(j - H / 2);
      const kk = Math.pow(VP.clamp(1 - d / bev), 2.2), p = (j * W + i) * 4;
      im.data[p] = 128 - nx * kk * 127; im.data[p + 1] = 128 - ny * kk * 127; im.data[p + 2] = 128; im.data[p + 3] = 255;
    }
    x.putImageData(im, 0, 0); const id = 'vpg' + Object.keys(mapCache).length;
    const sc = [1.3, 1.15, 1.0].map(m => Math.min(70 * m / 1.3, R * m));
    defs.insertAdjacentHTML('beforeend', `<filter id="${id}" x="0" y="0" width="${W}" height="${H}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feImage href="${c.toDataURL()}" x="0" y="0" width="${W}" height="${H}" result="m"/>
<feDisplacementMap in="SourceGraphic" in2="m" scale="${sc[0]}" xChannelSelector="R" yChannelSelector="G" result="dr"/>
<feDisplacementMap in="SourceGraphic" in2="m" scale="${sc[1]}" xChannelSelector="R" yChannelSelector="G" result="dg"/>
<feDisplacementMap in="SourceGraphic" in2="m" scale="${sc[2]}" xChannelSelector="R" yChannelSelector="G" result="db"/>
<feColorMatrix in="dr" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="r"/>
<feColorMatrix in="dg" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="g"/>
<feColorMatrix in="db" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="b"/>
<feBlend in="r" in2="g" mode="screen" result="rg"/><feBlend in="rg" in2="b" mode="screen" result="rgb"/>
<feColorMatrix in="rgb" type="saturate" values="1.25"/></filter>`);
    return mapCache[k] = id;
  }
  /* Draw liquid glass `el` at rect r over backdrop element `src` (both absolutely positioned in the same parent). */
  VP.glass = (el, r, src, ui = '') => {
    const W = Math.max(8, Math.round(r[2] / 2) * 2), H = Math.max(8, Math.round(r[3] / 2) * 2), R = Math.min(Math.round(r[4] || 0), W / 2, H / 2);
    VP.place(el, [r[0], r[1], W, H, R]); el.style.overflow = 'hidden';
    const id = glassFilter(W, H, R), s = src.style;
    el.innerHTML = `<div style="position:absolute;left:0;top:0;width:${W}px;height:${H}px;filter:url(#${id})"><div style="position:absolute;overflow:hidden;left:${parseFloat(s.left) - r[0]}px;top:${parseFloat(s.top) - r[1]}px;width:${s.width};height:${s.height};border-radius:${s.borderRadius}">${src.innerHTML}</div></div>`
      + `<div style="position:absolute;inset:0;border-radius:inherit;background:linear-gradient(180deg,rgba(255,255,255,.24),rgba(255,255,255,.05) 55%,rgba(255,255,255,.12))"></div>`
      + `<div style="position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 1.5px 0 rgba(255,255,255,.8),inset 0 -1px 0 rgba(255,255,255,.25),inset 0 0 0 1px rgba(255,255,255,.3)"></div>${ui}`;
  };

  /* Standard page contract every template exposes to the renderer:
   *   window.DUR (seconds), window.FPS_HINT, window.ready (Promise), window.seek(t) (async), window.CUES() -> [{beat, type, gain}] */
  VP.boot = ({ seek, dur, cues, fonts = [] }) => {
    window.DUR = dur; window.seek = async t => { t = ((t % dur) + dur) % dur; seek(t); };
    window.CUES = cues || (() => []);
    window.ready = (async () => {
      for (const f of fonts) { try { await document.fonts.load(f); } catch (e) { } }
      await document.fonts.ready;
      await Promise.all([...document.images].map(im => im.complete ? 1 : new Promise(r => { im.onload = im.onerror = r; })));
      await window.seek(0); return true;
    })();
    // live preview in a normal browser (renderer runs with navigator.webdriver = true and drives seek itself)
    if (!navigator.webdriver) window.ready.then(() => {
      let clock = 0, last = performance.now(), paused = false;       // Space = pause, ←/→ = scrub 1 beat
      addEventListener('keydown', e => { if (e.code === 'Space') paused = !paused; if (e.code === 'ArrowRight') clock += VP.B; if (e.code === 'ArrowLeft') clock -= VP.B; window.seek(clock); });
      const loop = now => { if (!paused) clock += (now - last) / 1000; last = now; window.seek(clock); requestAnimationFrame(loop); }; requestAnimationFrame(loop);
    });
  };
  window.VP = VP;
})();
