# Agent instructions (Codex, Antigravity, Cursor, Copilot, any AGENTS.md-aware agent)

This repo makes premium motion / promo videos from deterministic HTML.

Before any video work, read and follow `skills/premium-motion-video/SKILL.md`
(and the files in its `references/` folder when the skill points to them).

Hard rules:
- Start from a template in `templates/` — do not write a film from a blank file unless no template fits.
- Every template must keep the page contract: `window.seek(t)`, `window.DUR`, `window.ready`, `window.SIZE`, `window.B`, `window.CUES()`.
- Review with `node tools/sheet.mjs` before rendering; render `--mode preview` before `--mode final`.
- Long renders run in the background and are resumable — never inside a single blocking shell call.
- Before claiming "done": `python3 tools/popcheck.py <mp4>` shows 0 pops and loudness ≈ −14 LUFS.
