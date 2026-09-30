# UI micro-loops: notes from Charlie Hills' "Opus 5.5 Motion Graphics" kit

Source: reader kit by Charlie Hills (charliehills.substack.com): a board of 16 product-UI animations on one 8 s loop,
16 adaptation prompts and a PDF guide. The board's numbers are invented and labelled as examples; the fonts are
Space Grotesk + JetBrains Mono (SIL OFL). Our `templates/ui-loops` is a **clean-room re-implementation** of the
patterns on the `VP` engine. Do not copy the kit's code or artwork into client work.

## Why it looks expensive
1. **One grammar for every tile.** Each effect is a state machine on the same clock:
   `before → fwd (2.2 s) → hold (4.4 s) → ret (1.4 s)`, loop = 8 s. Forward is slow and eased, the return is
   faster, and the hold is the longest part. During the hold one small thing stays alive (a progress bar, a
   cursor, a lens sliding, pulses). → `VP.cycle(t, {F, H, R, loop, offset})`.
2. **Real UI, not decoration.** Buttons, tabs, search fields, cards, dashboards, docks: things the viewer already
   knows. The motion explains a *state change* in the UI (button → player, card → workspace, bars → line).
3. **An annotation layer.** Small mono labels (`shape morph`, `wdth 62`, `gaussian falloff`, `illustrative`) make
   it read like a designer's spec sheet. It adds craft and honesty in one move.
4. **Restraint in colour.** Cream paper, navy ink, one warm accent (coral) and one cool accent (sky/ice); dark
   tiles alternate with light ones for rhythm.
5. **Every word fits.** Text is measured with real font metrics (canvas `measureText`) and sized to fit, so it
   never overflows at any frame. → `VP.measure`, `VP.fitText`.
6. **Deterministic.** Everything is drawn from `t`: SVG markup rebuilt per frame, a seeded RNG (mulberry32) for
   particles, and a `?render` flag that turns off the live loop so an external renderer drives time.
   → `VP.rng(seed)`.
7. **Four checks before posting:** loops cleanly · reads when paused (poster frame) · numbers are yours or
   labelled illustrative · every word fits.
8. **"Fix one thing only" iteration.** When a result is close, name one defect, keep motion/timing/loop, and ask
   what changed. It stops the agent from rewriting motion that already works.

## The 16 effects, the technique behind each, and when to use it
| # | Effect | Technique | Use it for |
|---|---|---|---|
| 01 | Button → player | one rect `[x,y,w,h,r]` lerps from pill to panel (shared element); play icon quad-morphs to pause; progress runs in the hold | "Watch the demo" CTA |
| 02 | Search → results | typing with caret (chars = floor(k·n)), results stack in with staggered springs, match text highlighted | help centre, library |
| 03 | Card → workspace | card rect grows to the full canvas; sidebar/toolbar/content slide in behind it | a feature launch |
| 04 | Tabs → panels | active pill slides between tabs (measured widths), panel content does a masked swap | plan/channel comparison |
| 05 | Chart morph | bars thin into stems while a Catmull-Rom line draws through their tops; area fill + end tooltip | weekly result |
| 06 | Dashboard zoom | overview dims, corner brackets mark one KPI, that tile scales forward from its exact spot; number counts | the one KPI that matters |
| 07 | Spring stack | 3 cards enter on springs, each settles at a smaller scale/offset behind the next (deck) | offers, testimonials |
| 08 | Magnetic dock | icon size = base + amp · gauss(distance to cursor); tooltip follows the peak | tools, integrations |
| 09 | Masked type | headline inside an SVG `clipPath` of the text; image or gradient moves inside the letters | campaign name reveal |
| 10 | Elastic type | per-letter scaleX/scaleY on a locked baseline, centre-out stagger; `wdth` label updates | title card |
| 11 | Text → layout | headline words fly to their places in a carousel/cover layout (measured positions) | blog → carousel cover |
| 12 | Image reveal | clip/mask wipe with a soft edge + slight counter-scale of the image | product drop teaser |
| 13 | Perspective shift | flat layers become stacked planes drawn as bilinear quads toward a vanishing point | layers of a stack/service |
| 14 | Glass focus | the whole table is a blurred copy; a lens shows a sharp, magnified copy clipped to the lens | one line of a report |
| 15 | Flowing paths | cubic connectors, dash-offset "lit" lines, glowing pulses at `bezier(t)`; nodes ring when a pulse lands | content → channels, funnel |
| 16 | Particle logo | points sampled from the mark's alpha on a canvas; seeded random starts; curved travel with short trails | end card |

In `templates/ui-loops` we ship 01, 05, 06, 08, 10, 14, 15, 16 (board or `?fx=N` single effect). The others are
straightforward with the same helpers; build them on demand.

## How to use this in a real film
- As a **format**: a 4:5 (1080×1350) board or a 1:1 single effect for LinkedIn/X/Instagram, 8 s loop, no audio.
- As **scenes inside a longer film**: any effect is `draw(w, h, id, S)`; drive `S` from the film clock
  (`VP.cycle` with `offset = scene start`) or map a beat range to `S.p` directly.
- For SaaS mode: swap the demo UI for the product's own tokens and labels (read from the repo), then keep the motion.
