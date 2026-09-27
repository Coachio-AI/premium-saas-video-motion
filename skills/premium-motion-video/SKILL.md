---
name: premium-motion-video
description: Use when asked to make a product intro, launch/promo video, keynote-style or "Apple-style" motion video, app preview, logo reveal or any short commercial motion piece rendered from code (HTML/CSS/JS → MP4), especially when quality must look expensive and turnaround must be fast.
---

# Premium Motion Video

## Overview
Premium = **intention + restraint + smooth motion + one idea per shot**, rendered deterministically.
Every frame is a pure function of time (`seek(t)`), so the same HTML plays live, renders to MP4
frame-exact, and can be reviewed as a contact sheet in seconds.

**Start from a template, not a blank file.** Writing a film from scratch costs ~5 min of authoring plus
bug loops; a template turns the job into editing JSON/CONFIG and choosing music.

## When to Use
- Product/app promo, launch teaser, feature announcement, logo sting, social ad (16:9, 1:1, 9:16)
- The user says "look expensive", "Apple keynote", "premium", "motion design", "intro video"
- NOT for: talking-head editing, long tutorials, 3D product renders (use a 3D tool, then composite)

## Workflow (do these in order — each gate is cheap, skipping one is expensive)
1. **Inputs** (ask once, all together): product + one-line message, brand (logo/wordmark, 3 colors max,
   font), assets (screenshots, product photos), format + length, music (file or mood → BPM band),
   where it will run. If the user doesn't care: 1920×1080, 20–30 s, 113–123 BPM.
2. **Pick a template** — `templates/kinetic-promo` (text-led, JSON spec, any aspect) or
   `templates/keynote-oneshot` (one continuous take: wordmark → UI → device → web → product → order →
   real world). Only hand-build when neither fits; then reuse `engine/motion.js`.
3. **Music first, then timing.** `python3 tools/beatgrid.py song.mp3` → BPM, grid offset, energy per
   beat, breakdown/drop guesses. Set the template BPM to the SONG's BPM. Put the hero moment on the drop.
   Splice bars with `--plan` if the drop is too late (keep bar phase: `film_beat % 4 == track_beat % 4`).
4. **Beat map** — one table: beat | music | image | sfx. Show it + 3–4 stills
   (`node tools/sheet.mjs page.html --beats 0,12,24,36`) and get approval BEFORE the full build.
5. **Build/edit**, then review with a half-beat contact sheet (`tools/sheet.mjs --every 0.5`).
   Fix everything visible on the sheet; it catches ~90% of bugs in 20 s.
6. **Preview render** (`--mode preview`, ~45 s) → watch timing. **Final** (`--mode final`, ~2.5 min / 20 s
   of 1080p60) with `--audio`. Run `tools/popcheck.py`. Loudness −14 LUFS.
7. Deliver MP4 + the HTML (source of truth for later edits).

## Aesthetic rules (non-negotiable unless the brand says otherwise)
- One shot = one idea. Key object centred. Space to breathe. Background never fights the subject.
- 3 colours max per film, one display face + one UI face, same background family per film.
- Every motion eased (springs or cubic). No linear moves. Overlap motions (stagger 0.08–0.25 beat).
- Transitions carry the eye (shared-element morph, push, rise, zoom-through, iris). Hard cuts only on
  purpose (beat drop, "It's a / work of heart." two-beat reveals).
- Adaptive rhythm: fast in the middle, air at the start and the logo. No hold > 1 s without motion.
- Sound: few SFX, 12–20 dB under music, whooshes peak-aligned to cuts, no "ting ting" clusters.
- Banned by default: particles, lens flares, glitch, 3D flips, rainbow gradients, stock-template looks,
  text effects on every word, more than one font gimmick per film.
See `references/aesthetics.md` for the full rulebook and BPM→mood table.

## Motion toolkit (engine/motion.js → `VP.*`)
| Need | Use |
|---|---|
| Spring 0→1 at a beat | `VP.sp(beat, f, z)`; presets `VP.SPR.SNAP/POP/GLIDE/HEAVY/SOFT` |
| Multi-key motion without jumps | `VP.track([[beat, value, f, z], ...])` (superposed springs) |
| Masked text roll (no fades) | parent `overflow:hidden` + `VP.roll(inner, k, h)` |
| Screen-studio zoom | `VP.camera(el, z, fx, fy)` |
| Liquid glass over content | `VP.glass(el, rect, backdropEl, uiHTML)` |
| Wordmark squeeze | Archivo `font-variation-settings:'wdth' 62..125` driven by a spring |
Cookbook with code: `references/motion-cookbook.md`.

## Speed rules (measured — see references/pipeline.md)
- Never `await requestAnimationFrame` inside `seek()` — the screenshot already waits for paint (5× faster, pixel-identical).
- Never CSS `filter: blur()` on large elements — 1.6 s/frame. Use `radial-gradient(closest-side, c, transparent)`.
- 2 sub-frames for motion blur, not 4. Preview at half size, 30 fps, no blur.
- Long renders: run in the background, chunked + resumable; never inside one blocking shell call with a timeout.

## Common mistakes
See `references/gotchas.md` (measuring hidden elements, `display` resets on flex boxes, z-order at
loop end, overflow at wide font axes, glass rebuild cost, bar-phase drift in music edits).

## Verification before you say "done"
Contact sheet reviewed · preview watched · `popcheck.py` = 0 pops · loudness ≈ −14 LUFS ·
loop seam < 1 if it loops · file under the delivery size limit · the HTML still plays live.
