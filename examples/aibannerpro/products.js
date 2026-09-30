/* Illustrative product renders (fictional brands) drawn as SVG — no photos, no people.
   Each returns an <svg> string that fills its box (preserveAspectRatio meet). */
window.PROD = (() => {
  let n = 0; const id = p => `${p}${++n}`;
  const shadow = (cx, cy, rx, ry, op = .35) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}" filter="url(#softblur)"/>`;
  const wrap = (vb, body) => `<svg viewBox="${vb}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="overflow:visible">${body}</svg>`;

  /* amber dropper bottle */
  const serum = (glass = '#E8742A', label = '#FFF6EC', ink = '#3A1D0B', name = 'LUMIÈRE', sub = 'VITAMIN C 15%') => { const g = id('sg'), h = id('sh');
    return wrap('0 0 200 340', `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="${glass}" stop-opacity=".95"/><stop offset=".45" stop-color="#FFC08A"/><stop offset=".6" stop-color="${glass}"/><stop offset="1" stop-color="#8A3A0C"/></linearGradient>
      <linearGradient id="${h}" x1="0" x2="1"><stop offset="0" stop-color="#1B1B1F"/><stop offset=".4" stop-color="#55565E"/><stop offset="1" stop-color="#0E0E10"/></linearGradient></defs>
      ${shadow(100, 328, 70, 9)}
      <path d="M78 40 Q78 8 100 8 Q122 8 122 40 L122 70 L78 70Z" fill="url(#${h})"/>
      <rect x="70" y="66" width="60" height="30" rx="5" fill="#C9A15A"/><rect x="70" y="66" width="60" height="8" rx="3" fill="#E9CD8E"/>
      <path d="M44 128 Q44 96 76 96 L124 96 Q156 96 156 128 L156 300 Q156 326 130 326 L70 326 Q44 326 44 300Z" fill="url(#${g})"/>
      <rect x="56" y="170" width="88" height="112" rx="6" fill="${label}"/>
      <text x="100" y="206" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="17" font-weight="700" fill="${ink}" letter-spacing="1.5">${name}</text>
      <rect x="82" y="216" width="36" height="1.5" fill="${ink}" opacity=".5"/>
      <text x="100" y="236" text-anchor="middle" font-family="IBM Plex Sans" font-size="8.5" font-weight="600" fill="${ink}" letter-spacing="1.4">${sub}</text>
      <text x="100" y="268" text-anchor="middle" font-family="IBM Plex Sans" font-size="7.5" fill="${ink}" opacity=".6" letter-spacing="1">30 ML · 1.0 FL OZ</text>
      <path d="M58 112 Q52 200 60 306" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35" fill="none"/>`); };

  /* iced coffee cup with dome lid + straw */
  const coldbrew = (coffee = '#5B2E14', name = 'BREW&BLOOM') => { const g = id('cg'), l = id('cl');
    return wrap('0 0 220 340', `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="#2A1206"/><stop offset=".5" stop-color="${coffee}"/><stop offset="1" stop-color="#1C0B03"/></linearGradient>
      <linearGradient id="${l}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity=".65"/><stop offset="1" stop-color="#fff" stop-opacity=".2"/></linearGradient></defs>
      ${shadow(110, 330, 62, 8)}
      <rect x="128" y="0" width="12" height="120" rx="4" transform="rotate(12 134 60)" fill="#F67D1C"/>
      <path d="M40 92 L180 92 L162 322 Q160 330 150 330 L70 330 Q60 330 58 322Z" fill="url(#${g})"/>
      <path d="M52 150 L168 150" stroke="#E8C9A0" stroke-width="18" opacity=".55"/>
      <g opacity=".55" fill="#fff"><rect x="66" y="112" width="30" height="28" rx="6" transform="rotate(-12 81 126)"/><rect x="112" y="104" width="32" height="30" rx="6" transform="rotate(14 128 119)"/><rect x="92" y="130" width="26" height="24" rx="5"/></g>
      <path d="M40 92 L180 92 L162 322 Q160 330 150 330 L70 330 Q60 330 58 322Z" fill="url(#${l})" opacity=".45"/>
      <path d="M30 94 Q30 58 110 54 Q190 58 190 94 L190 100 L30 100Z" fill="#fff" opacity=".85"/><rect x="26" y="92" width="168" height="12" rx="6" fill="#fff"/>
      <circle cx="110" cy="236" r="34" fill="#F6EBDD"/><text x="110" y="233" text-anchor="middle" font-family="IBM Plex Sans" font-weight="700" font-size="9.5" fill="#3A1D0B" letter-spacing=".6">${name}</text><text x="110" y="247" text-anchor="middle" font-family="IBM Plex Sans" font-size="7.5" fill="#3A1D0B" opacity=".7">COLD BREW</text>`); };

  /* running shoe (side view, stylised) */
  const sneaker = (upper = '#D7FF3A', accent = '#111', sole = '#F4F4F0') => { const g = id('ng');
    return wrap('0 0 360 200', `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${upper}"/><stop offset="1" stop-color="${upper}" stop-opacity=".78"/></linearGradient></defs>
      ${shadow(180, 190, 160, 9, .4)}
      <path d="M24 152 L28 84 Q30 64 50 66 L92 74 Q118 80 138 70 L176 56 Q198 50 210 66 L238 98 Q300 108 334 124 Q352 136 346 152Z" fill="url(#${g})"/><path d="M30 84 Q34 70 50 72 L88 80" stroke="#000" stroke-opacity=".25" stroke-width="6" fill="none"/>
      <path d="M18 150 L348 150 Q352 176 330 180 L40 180 Q14 178 18 150Z" fill="${sole}"/><path d="M26 170 L340 170" stroke="#000" stroke-opacity=".12" stroke-width="4"/>
      <path d="M60 138 Q150 96 240 116 Q296 126 330 142" stroke="${accent}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <g stroke="${accent}" stroke-width="5" stroke-linecap="round"><path d="M160 72 L180 90"/><path d="M176 64 L196 82"/><path d="M192 60 L212 78"/></g><path d="M24 120 L60 118" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`); };

  /* matcha can */
  const can = (body = '#6F9E55', name = 'MỘC', sub = 'MATCHA LATTE') => { const g = id('mg');
    return wrap('0 0 180 320', `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="#2F4A22"/><stop offset=".35" stop-color="${body}"/><stop offset=".55" stop-color="#C6E0A8"/><stop offset=".7" stop-color="${body}"/><stop offset="1" stop-color="#26401A"/></linearGradient></defs>
      ${shadow(90, 312, 64, 8)}
      <rect x="30" y="30" width="120" height="276" rx="16" fill="url(#${g})"/><ellipse cx="90" cy="32" rx="60" ry="10" fill="#D9D9D6"/><ellipse cx="90" cy="30" rx="48" ry="6" fill="#B8B8B4"/>
      <rect x="30" y="120" width="120" height="96" fill="#F3EEDD" opacity=".92"/>
      <text x="90" y="170" text-anchor="middle" font-family="IBM Plex Sans" font-weight="700" font-size="30" fill="#2F4A22">${name}</text>
      <text x="90" y="196" text-anchor="middle" font-family="IBM Plex Sans" font-weight="600" font-size="9" fill="#2F4A22" letter-spacing="1.5">${sub}</text>
      <circle cx="90" cy="258" r="16" fill="none" stroke="#F3EEDD" stroke-width="2" opacity=".7"/><path d="M82 258 Q90 246 98 258 Q90 270 82 258Z" fill="#F3EEDD" opacity=".7"/>`); };

  /* earbuds case */
  const buds = (c1 = '#F4F5FA', glow = '#7C8CFF') => { const g = id('eg');
    return wrap('0 0 300 240', `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".6" stop-color="${c1}"/><stop offset="1" stop-color="#B9BDD0"/></linearGradient></defs>
      ${shadow(150, 226, 110, 9)}
      <rect x="50" y="90" width="200" height="130" rx="62" fill="url(#${g})"/><path d="M52 132 L248 132" stroke="#9CA1B8" stroke-width="2"/><rect x="138" y="170" width="24" height="5" rx="2.5" fill="${glow}"/>
      <g transform="translate(92 20) rotate(-18)"><rect x="0" y="0" width="44" height="64" rx="22" fill="url(#${g})"/><rect x="14" y="54" width="16" height="44" rx="8" fill="url(#${g})"/></g>
      <g transform="translate(176 12) rotate(16)"><rect x="0" y="0" width="44" height="64" rx="22" fill="url(#${g})"/><rect x="14" y="54" width="16" height="44" rx="8" fill="url(#${g})"/></g>`); };

  /* lipstick */
  const lipstick = (bullet = '#D6336C', tube = '#1B1B1F') => { const g = id('lg');
    return wrap('0 0 120 320', `<defs><linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="#8E7A4E"/><stop offset=".45" stop-color="#F3DFA6"/><stop offset="1" stop-color="#7A6641"/></linearGradient></defs>
      ${shadow(60, 314, 44, 6)}
      <path d="M36 110 L36 40 Q36 20 60 8 L84 30 L84 110Z" fill="${bullet}"/><path d="M44 104 L44 44 Q46 30 58 22" stroke="#fff" stroke-width="5" opacity=".35" fill="none" stroke-linecap="round"/>
      <rect x="28" y="106" width="64" height="60" rx="4" fill="url(#${g})"/><rect x="22" y="160" width="76" height="150" rx="8" fill="${tube}"/><rect x="30" y="170" width="8" height="130" rx="4" fill="#fff" opacity=".15"/>`); };

  /* perfume */
  const perfume = (liquid = '#F2B8C6', cap = '#1B1B1F', name = 'ÉTOILE') => { const g = id('pg');
    return wrap('0 0 220 300', `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="${liquid}"/><stop offset="1" stop-color="${liquid}" stop-opacity=".7"/></linearGradient></defs>
      ${shadow(110, 292, 84, 8)}
      <rect x="84" y="20" width="52" height="56" rx="6" fill="${cap}"/><rect x="96" y="72" width="28" height="22" fill="#C9A15A"/>
      <rect x="30" y="92" width="160" height="196" rx="26" fill="url(#${g})" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>
      <text x="110" y="200" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="24" font-weight="700" fill="#3B1D29" letter-spacing="3">${name}</text>
      <text x="110" y="222" text-anchor="middle" font-family="IBM Plex Sans" font-size="8" fill="#3B1D29" letter-spacing="2">EAU DE PARFUM</text>`); };

  /* backpack */
  const pack = (c = '#1F7A78', d = '#155957') =>
    wrap('0 0 240 300', `${shadow(120, 292, 90, 8)}
      <path d="M80 40 Q80 10 120 10 Q160 10 160 40" stroke="${d}" stroke-width="12" fill="none"/>
      <rect x="40" y="36" width="160" height="250" rx="40" fill="${c}"/><rect x="62" y="150" width="116" height="110" rx="22" fill="${d}"/>
      <path d="M62 180 L178 180" stroke="#F4D35E" stroke-width="6"/><rect x="104" y="60" width="32" height="10" rx="5" fill="${d}"/>`);

  return { serum, coldbrew, sneaker, can, buds, lipstick, perfume, pack };
})();
