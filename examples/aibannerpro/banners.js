/* Illustrative ad banners for fictional brands — what AI Banner Pro outputs look like.
   Every banner is a size container: fonts in cqmin, positions in % → any box, any aspect. */
window.BN = (() => {
  const P = window.PROD;
  const a = (css, html = '') => `<div style="position:absolute;${css}">${html}</div>`;
  const D = `font-family:'Be Vietnam Pro',sans-serif;font-weight:800;letter-spacing:-.02em;line-height:.95`;
  const S = `font-family:'Playfair Display',Georgia,serif;font-weight:700;line-height:1`;
  const T = `font-family:'IBM Plex Sans',sans-serif`;
  const pill = (css, txt, bg, fg) => a(`${css};padding:1.6cqmin 4cqmin;border-radius:99cqmin;background:${bg};color:${fg};${T};font-weight:700;font-size:3.6cqmin;white-space:nowrap`, txt);
  const list = [
    { key: 'lumiere', name: 'Lumière', bg: 'radial-gradient(120% 90% at 70% 60%,#FFD2AE 0%,#FFB07A 38%,#F67D1C 100%)', html: () => '' }, // laid out by LUMI()
    { key: 'brew', name: 'Brew & Bloom', bg: 'linear-gradient(160deg,#F3E6D3 0%,#E6CFB0 100%)', html: () =>
      a('left:6%;top:6%;' + T + ';font-weight:700;font-size:3.6cqmin;letter-spacing:.2em;color:#5B2E14', 'BREW&amp;BLOOM') +
      a('left:6%;top:15%;width:60%;' + D + ';font-size:13cqmin;color:#3A1D0B', 'MUA 1<br><span style="color:#F67D1C">TẶNG 1</span>') +
      a('left:6%;top:52%;width:44%;' + T + ';font-size:4.2cqmin;color:#5B2E14;line-height:1.3', 'Cold brew ủ lạnh 18 giờ. Chỉ thứ Hai.') +
      a('right:0%;bottom:3%;width:44%;height:72%', P.coldbrew()) + pill('left:6%;bottom:8%', 'Đặt ngay →', '#3A1D0B', '#F3E6D3') },
    { key: 'run', name: 'Kinetic Run', bg: '#0E0F10', html: () =>
      a('left:5%;top:5%;' + D + ';font-size:22cqmin;font-style:italic;color:#D7FF3A;transform:skewX(-8deg)', 'RUN') +
      a('left:5%;top:25%;' + D + ';font-size:22cqmin;font-style:italic;color:transparent;-webkit-text-stroke:.5cqmin #D7FF3A;transform:skewX(-8deg)', 'FASTER') +
      a('left:4%;top:44%;width:96%;height:42%;transform:rotate(-12deg)', P.sneaker()) +
      pill('right:5%;top:6%', 'NEW DROP', '#D7FF3A', '#0E0F10') + a('left:5%;bottom:5%;' + T + ';font-size:3.6cqmin;color:#fff;opacity:.8;letter-spacing:.15em', 'KINETIC · AIR 2') },
    { key: 'moc', name: 'Mộc', bg: 'linear-gradient(180deg,#F6F1E4 0%,#E4EDD5 100%)', html: () =>
      a('left:8%;top:10%;border-radius:50%;width:50%;height:50%;background:#C9DDB0;opacity:.6') +
      a('left:6%;top:8%;' + S + ';font-size:13cqmin;color:#2F4A22', 'Matcha<br><i>mát lạnh</i>') +
      a('left:6%;top:42%;width:46%;' + T + ';font-size:4cqmin;color:#2F4A22;line-height:1.35', 'Lá trà Thái Nguyên, sữa yến mạch.') +
      a('right:8%;bottom:6%;width:36%;height:76%', P.can()) + pill('left:6%;bottom:9%', 'Thử ngay 29K', '#2F4A22', '#F6F1E4') },
    { key: 'aura', name: 'Aura', bg: 'radial-gradient(110% 100% at 30% 20%,#8E7CFF 0%,#4B3FD1 45%,#1A1450 100%)', html: () =>
      a('left:0;right:0;top:8%;text-align:center;' + D + ';font-size:12cqmin;color:#fff', 'Nghe là mê.') +
      a('left:0;right:0;top:24%;text-align:center;' + T + ';font-size:4cqmin;color:#D8D4FF;letter-spacing:.12em', 'CHỐNG ỒN CHỦ ĐỘNG · 40 GIỜ PIN') +
      a('left:15%;top:36%;width:70%;height:50%', P.buds()) + pill('left:50%;bottom:6%;transform:translateX(-50%)', 'AURA BUDS PRO', '#fff', '#1A1450') },
    { key: 'sale', name: '11.11', bg: 'linear-gradient(135deg,#FF5A1F 0%,#F67D1C 50%,#FFB347 100%)', html: () =>
      a('left:0;right:0;top:10%;text-align:center;' + D + ';font-size:30cqmin;color:#fff;text-shadow:1.2cqmin 1.2cqmin 0 #7A1E00', '11.11') +
      a('left:0;right:0;top:46%;text-align:center;' + D + ';font-size:10cqmin;color:#2B0A00', 'SIÊU SALE') +
      a('left:50%;top:64%;transform:translateX(-50%) rotate(-6deg);background:#fff;color:#FF5A1F;' + D + ';font-size:14cqmin;padding:2cqmin 6cqmin;border-radius:3cqmin;box-shadow:1.4cqmin 1.4cqmin 0 #2B0A00', '−50%') },
    { key: 'glow', name: 'Glow', bg: 'linear-gradient(160deg,#FFE3EC 0%,#FFB9CF 100%)', html: () =>
      a('left:6%;top:8%;' + S + ';font-size:12cqmin;color:#7A1036', 'Môi xinh<br><i>cả ngày</i>') +
      a('left:6%;top:40%;width:48%;' + T + ';font-size:4cqmin;color:#7A1036;line-height:1.35', 'Son lì 12 giờ, không khô môi.') +
      a('right:14%;bottom:5%;width:22%;height:80%;transform:rotate(8deg)', P.lipstick()) + pill('left:6%;bottom:9%', '−20% hôm nay', '#7A1036', '#FFE3EC') },
    { key: 'etoile', name: 'Étoile', bg: 'radial-gradient(100% 100% at 50% 30%,#FFF6F8 0%,#EBD3F2 100%)', html: () =>
      a('left:0;right:0;top:7%;text-align:center;' + S + ';font-size:10cqmin;color:#3B1D29', '<i>Hương của nàng</i>') +
      a('left:22%;top:24%;width:56%;height:64%', P.perfume()) + a('left:0;right:0;bottom:5%;text-align:center;' + T + ';font-size:3.6cqmin;color:#3B1D29;letter-spacing:.3em', 'ÉTOILE PARIS') },
    { key: 'nomad', name: 'Nomad', bg: 'linear-gradient(180deg,#E8F3F1 0%,#BFE0DB 100%)', html: () =>
      a('left:6%;top:8%;' + D + ';font-size:11.5cqmin;color:#0F4543', 'Đi xa,<br>nhẹ gánh.') +
      a('left:6%;top:38%;width:44%;' + T + ';font-size:4cqmin;color:#0F4543;line-height:1.35', 'Balo 22L chống nước, 780g.') +
      a('right:6%;bottom:5%;width:42%;height:80%', P.pack()) + pill('left:6%;bottom:9%', 'Xem bộ sưu tập', '#0F4543', '#F4D35E') },
  ];
  const html = (i, extra = '') => { const b = list[i % list.length]; return `<div class="bn" data-k="${b.key}" style="background:${b.bg};${extra}">${b.html()}</div>`; };
  return { list, html, a, D, S, T, pill };
})();

/* Lumière hero banner — continuous re-layout by aspect (portrait → square → landscape) for the aspect-ratio morph */
window.LUMI = (() => {
  const { a, D, S, T } = window.BN;
  const make = () => `<div class="bn lumi" style="background:radial-gradient(120% 90% at 70% 60%,#FFD2AE 0%,#FFB07A 38%,#F67D1C 100%)">
    ${a('left:0;top:0', `<div class="l-logo" style="position:absolute;${T};font-weight:700;letter-spacing:.3em;color:#3A1D0B;white-space:nowrap">LUMIÈRE</div>`)}
    <div class="l-h" style="position:absolute;${S};color:#3A1D0B;white-space:nowrap">Sáng da<br><i>sau 7 ngày</i></div>
    <div class="l-sub" style="position:absolute;${T};color:#3A1D0B;opacity:.8;white-space:nowrap">Serum Vitamin C 15% · 30ml</div>
    <div class="l-cta" style="position:absolute;${T};font-weight:700;background:#3A1D0B;color:#FFE9D6;border-radius:999px;white-space:nowrap">Mua ngay →</div>
    <div class="l-p" style="position:absolute">${window.PROD.serum()}</div>
    <div class="l-badge" style="position:absolute;border-radius:50%;background:#fff;color:#F67D1C;display:flex;flex-direction:column;align-items:center;justify-content:center;${D}"><span class="n">−30%</span><span class="t" style="${T};font-weight:600;color:#3A1D0B">chỉ tuần này</span></div>
  </div>`;
  /* place children for box w×h (px). u = unit = min(w,h)/100 */
  const layout = (el, w, h) => {
    const u = Math.min(w, h) / 100, ar = w / h, L = Math.max(0, Math.min(1, (ar - .75) / (1.78 - .75))), P = 1 - Math.max(0, Math.min(1, (ar - .5625) / (1 - .5625)));
    const q = s => el.querySelector(s).style, px = v => v.toFixed(2) + 'px';
    const lg = q('.l-logo'); lg.fontSize = px(3.4 * u); lg.left = px(w * .06); lg.top = px(h * .055);
    const hs = u * (10.5 + 4 * L), hh = q('.l-h'); hh.fontSize = px(hs);
    hh.left = px(w * .06); hh.top = px(h * (.13 + .12 * L - .02 * P));
    const sb = q('.l-sub'); sb.fontSize = px(3.6 * u); sb.left = px(w * .06); sb.top = px(h * .13 + hs * 2.28 + h * .12 * L - h * .02 * P);
    const ct = q('.l-cta'); ct.fontSize = px(3.8 * u); ct.padding = `${px(1.6 * u)} ${px(4 * u)}`; ct.left = px(w * .06); ct.top = px(P > .5 ? h * .86 - 6 * u : h * (.82 - .12 * L) - 6 * u * (1 - L));
    const lr = (x, y, t) => x + (y - x) * t, pw = w * lr(lr(.42, .6, P), .38, L), ph = h * lr(lr(.78, .56, P), .8, L), pp = q('.l-p'); pp.width = px(pw); pp.height = px(ph);
    pp.left = px(w * lr(lr(.74, .55, P), .7, L) - pw / 2); pp.top = px(h * lr(lr(.16, .4, P), .12, L));
    const bs = 22 * u, bd = q('.l-badge'); bd.width = bd.height = px(bs); bd.left = px(w * lr(lr(.88, .8, P), .88, L) - bs / 2); bd.top = px(h * lr(lr(.2, .44, P), .24, L) - bs / 2);
    el.querySelector('.l-badge .n').style.fontSize = px(7 * u); el.querySelector('.l-badge .t').style.fontSize = px(2.4 * u);
  };
  return { make, layout };
})();
