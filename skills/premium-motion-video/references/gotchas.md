# Gotchas (each one cost us a render or a review loop)

1. **Measuring an element you sized last frame.** `offsetWidth` returns the width you set, not the text
   width → wordmark drifted off-centre. Use `VP.naturalWidth(el)` (sets `width:auto` first).
2. **Measuring a hidden element.** `display:none` → width 0 → the white wordmark inside the pill jumped.
   Hide with `visibility:hidden` when you still need to measure it.
3. **`display:block` on a flex box.** A generic show/hide reset the nav to block and collapsed the gaps.
   `VP.show()` respects `el.dataset.d = 'flex'`.
4. **z-order that must change.** The pill had to sit under the photo at the start (iris reveal) and over
   the wall at the end. Set z-index per time range; don't hard-code one order.
5. **Wide variable-font axes overflow.** Archivo at `wdth 125` is 30% wider than at 100 — size the
   wordmark for the widest axis value it ever reaches.
6. **Dark shutter blades on a light film** read as a cut to black. Keep iris seams subtle.
7. **Camera-scaling a DOM with photos** softens them. For big zooms, compute zoomed rects (`VP.zoomAbout`)
   and place elements at their zoomed size.
8. **Blur filters** on large elements are 15–20× slower to render. Radial gradients look the same.
9. **Glass rebuilds** clone the backdrop every frame. Keep glass surfaces few; quantise sizes to 2 px.
10. **rAF inside seek()** doubles render time for nothing.
11. **One blocking render command** under a 10-min shell timeout lost 10 minutes. Background + resumable chunks.
12. **Music edits:** a splice that changes bar phase makes the downbeat drift; keep `film_beat % 4 == track_beat % 4`.
    librosa BPM can be halved/doubled (80 vs 160). Use the linear grid fit, then sanity-check the feel.
13. **Robots/blocked pages:** when a reference post can't be fetched, read it in a real browser session
    rather than scraping around the block.
14. **Copyright:** brand photos pulled from a website are fine for an internal demo, not for a public ad.
    Say so to the user; keep them out of public repos (.gitignore `templates/*/assets/*.jpg`).
15. **Relight needs a matching pair.** Without an aligned day/golden-hour pair, simulate with a
    soft-light + multiply grade driven by the slider, and tell the user it's simulated.
