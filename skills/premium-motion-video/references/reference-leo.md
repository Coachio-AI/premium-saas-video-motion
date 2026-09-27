# Reference: "Make your product videos look expensive (Apple Framework)" — @leomeethewoo

X article, 25 Sep 2026 (1.7M views). Author's studio produced 50+ product videos in one summer
(Trust Wallet, fomo, PrizePicks). Written without AI, per the author.

## Keywords
intention · nothing by accident · premium feeling · brand guideline · 3 colours · design first ·
storyboard frame-by-frame (Figma) · one shot = one idea · space to breathe · centred key object ·
background never interrupts · smoothness · eased & overlapping keyframes · dynamic transitions ·
avoid direct cuts · adaptive rhythm · BPM bands (60–80 / 90–110 / 115–123 / 124+) · genre targets
audience · sound design as the cherry · remove what feels off.

## Process (as described)
1. Branding: define rules (fonts, backgrounds, music, colour theme) and reuse them video to video.
2. Design: product designers storyboard every animation frame-by-frame before motion.
3. Animation: ease + overlap, transition scenes into each other, vary the rhythm.
4. Music: choose BPM band for the energy, then genre for the audience.
5. Sound design: only SFX that matter; final listen-through to cut anything off.

## What the 7 showcase clips show (frame analysis)
| Clip | Format | What to steal |
|---|---|---|
| Apple-style montage (4K, 123 BPM) | 4-up grid of promos | word-by-word type on black, Siri-glow gradients, chrome "PRO" logotype, glowing stat cards |
| Fintech/meme-trading app (4K, ~80/160 BPM) | 4-up grid | lime brand colour, rolling counters, 3D objects bursting with sunburst rays, UI cards |
| "Design Layout vs Result" (1:1, 108 BPM) | side-by-side | storyboard ≈ final frame; orange blobs, one word per shot, typing UI, "Thinking…" states |
| Figma board | screen capture | the storyboard is a wall of frames — design is done before motion |
| Easing graphs | 1300×500 | linear vs eased vs overlapped curves — dots show the difference |
| Cashback app (60 fps) | 1080p | coin flip in a real street shot → phone UI → 100% counter → swoosh trail → "paid by" |
| Apple Watch (123 BPM) | 1080p | watch UI → "Stay connected" → 24-hour glow card → fast charging → white hero finishes → "It's a / work of heart." → logo |

## How it maps to this repo
- Branding rules → template `theme` block (bg, fg, accent, fonts) — change once, whole film follows.
- Storyboard → beat map + `tools/sheet.mjs` stills gate.
- Eased/overlapping motion → springs + stagger in `engine/motion.js`.
- Dynamic transitions → shared-element morph (keynote-oneshot), push/rise/zoom/iris/zoom-through (kinetic-promo).
- BPM bands → `tools/beatgrid.py` + set template BPM to the song.
- Sound design restraint → sparse `CUES()` + `tools/mix.py` level rules.
