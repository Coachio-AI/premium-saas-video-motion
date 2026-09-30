# AI Banner Pro — 60 s film · Keynote-dark + UI-loop playbook

1920×1080 · 60 fps · 99.6 BPM (1 beat = 0.602 s) · 100 beats = 60.2 s
Music: `ikoliks_aj-background-music-320427.mp3`, spliced with `beatgrid.py --plan "[[0,20,12],[12,32,40],[52,176,12],[64,188,36]]" --tail 3`
(quiet intro → lift at film beat 12 = logo, breakdown 52–64 = Studio Chat, quiet break 64–67, drop at film beat 67 = "Push to Meta").

Brand from the repo `index.html` (Tailwind theme + CSS tokens): canvas #0B1220, surfaces #111A2E / #1A2541, Vibe Orange #F67D1C,
IBM Plex Sans + JetBrains Mono, hard "pop" shadow. UI labels are the app's own: AppShell nav (Dashboard, Banner Tool, UGC Studio,
Social Frames, Brand Style, History, Ads Manager), OutputRow (Tỉ lệ / Độ nét 1K·2K·4K), models (GPT Image 2, Nano Banana Pro),
QueueTab columns (Draft/Ready/Pushing/Pushed), StudioChat pinned context, CampaignWizard, MCP server (`api/mcp`).

| Beats | Scene | Hero motion | Transition in |
|---|---|---|---|
| 0–12 | Brief | brief typed in a prompt card → Generate press → glow burst → 11 banners spring out | — |
| 12–20 | Logo (lift) | tile pops, wordmark wipes out of the tile, tagline word roll, model chips | cut on lift |
| 19–20.6 | → | zoom-through the orange tile | zoom + iris |
| 20–38 | Banner Tool | refs dragged into slots (screen-studio zoom), brand + content typed, 9:16 + 2K clicks, generate shimmer → soft-edge reveal, live aspect morph 9:16 → 1:1 → 16:9, 4 variants, heart → "Đã lưu vào Library" | iris |
| 38–46 | Brand Style | URL typed → crawl scan → 3 swatches fly site → kit on arcs, fonts/tone/refs fill | rise |
| 46–52 | UGC Studio | face + fashion + product → hub → 3 face-consistent 9:16 scenes | pan |
| 52–60 | Studio Chat (breakdown) | pinned context chips, user bubble, AI answer typed, "Tạo Creative" | rise |
| 60–64.5 | Campaign Wizard | tree draws, pulses flow, budget odometer, 6 creatives pop | push |
| 64.5–67 | Queue (break) | cards move Draft → Ready, "Push to Meta" pulses, click | rise |
| 67–80 | Live (drop) | orange flash, tilted 4-row marquee wall, headline, counters, "Pushed · Active" | hard cut on drop |
| 80–90 | Social Frames + MCP | 5-slide carousel fans out, agent terminal → mcp banner.generate → 6 results | push |
| 90–100 | End | logo + wordmark wipe, promise line, feature chips, powered-by | iris |

Illustrative: every banner, brand (Lumière, Brew&Bloom, Kinetic, Mộc, Aura, Étoile, Nomad), domain `lumiere-demo.vn`, budget and
counts are fictional, drawn in HTML/SVG (`banners.js`, `products.js`). Real history outputs were not used (they may contain people).
Music/SFX are from the user's local library — check the licence before commercial publishing.
