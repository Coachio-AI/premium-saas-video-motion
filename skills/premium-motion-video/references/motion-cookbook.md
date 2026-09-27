# Motion cookbook (engine/motion.js)

All snippets assume `VP.clock(bpm)` once and `VP.at(t)` at the top of `seek(t)`; beats are floats.

## Springs
```js
const k = VP.sp(14, ...VP.SPR.POP);          // 0→1 starting at beat 14, slight overshoot
el.style.transform = `scale(${VP.lerp(.86, 1, k)})`;
```
Presets `[f, z]`: SNAP 2.6/.8 (UI, labels) · POP 2.4/.62 (words, tiles) · GLIDE 1.4/.9 (camera) ·
HEAVY 1.2/.75 (devices, big objects) · SOFT 1.8/.85. Lower f = heavier; lower z = more bounce.
A spring settles in ≈ 4/(z·2πf) s — keep it under one beat for anything that must "land" on the beat.

## Shared-element morph (the one-take trick)
One element travels the whole film; each key is a rect `[x, y, w, h, radius]`:
```js
const r = VP.track([[0, FULL], [8, CELL, 1.8, .8], [14, FULL, 1.7, .62], [22, PHONE, 1.5, .8]]);
VP.place(photo, r);                          // object-fit:cover keeps the crop stable
```
Superposition means a new key can start before the previous one settles — no jumps.
Derive dependent elements from it (bezel = `VP.outset(r, 16)`, frame = `VP.outset(r, mat)`).
Detach a dependent before its parent does something it shouldn't follow (e.g. the wall frame stays
while the photo shrinks to a point).

## Zoom-through (grid → next scene)
Scale the whole layout about the centre tile until the tile covers the frame; paint that tile in the
next scene's background → the next scene can start with a hard cut that nobody sees.
Do it with rect math (`VP.zoomAbout`), not a CSS scale on the parent, so images stay sharp.

## Masked roll (instead of fades)
```html
<div class="roll" style="overflow:hidden;height:60px"><div>Ordered</div></div>
```
`VP.roll(inner, k, h)`: k 0 below → 1 in place → 2 gone above. State changes = old rolls up, new rolls in.

## Word-by-word headline
Wrap each word in `<span class="mask"><span>word</span></span>` (mask = inline-block, overflow hidden,
padding-bottom .08em so descenders survive). Word k: `translateY((1 - sp(start + k*step, POP)) * 105%)`.
step = 0.25–0.5 beat. Accent word: `background-clip:text` with the brand gradient.

## Glow field
Two big divs with `radial-gradient(closest-side, c 0%, c 35%, transparent 100%)`, drifting slowly,
scaled in with HEAVY. **Never** `filter: blur()` on them (1.6 s/frame vs 0.09 s).

## Odometer
Each digit = column of `0…9 0…9` stacked; translate by `(10 + d) * eOutQuint(progress) * h`.
Stagger columns right-to-left by 0.08 beat so the number "settles" from the most significant digit.

## Wordmark squeeze (variable font)
Archivo `wdth 62..125`: land wide (125) → spring to 100; squeeze to 62 before morphing into a pill.
Measure the width at the target axis AFTER setting the axis and after `width:auto` (see gotchas).

## Liquid glass
`VP.glass(el, rect, backdropEl, uiHTML)` clones the backdrop element under the glass and displaces it
with a rounded-rect normal map (3 displacement scales → chromatic edge). Keep glass elements few and
small; maps are cached per size, but animate size in 2-px steps to keep the cache warm.

## Iris (6 blades)
Clip the revealed layer with a rotating hexagon `polygon()` whose radius springs 0 → diagonal;
draw faint seam strokes along the blades. No dark blade fill on light films (reads as a cut to black).

## Camera (screen-studio zoom)
`VP.camera(stage, z, fx, fy)`, z tracked with GLIDE, 1 → 1.12–1.2 while the cursor works, back to 1
before the next transition. The cursor is drawn outside the camera layer and mapped through it.

## Loop
If the film loops, the last frame must equal frame 0: end with the same element, same axis value,
same camera. Use an eased ramp (not a spring) into the final value so it lands exactly at DUR.
