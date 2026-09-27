#!/usr/bin/env bash
# Link the skill into every agent's global skills folder (Claude Code, Codex/Gemini/Copilot via ~/.agents).
set -e
SRC="$(cd "$(dirname "$0")/.." && pwd)/skills/premium-motion-video"
for D in "$HOME/.claude/skills" "$HOME/.agents/skills" "$HOME/.codex/skills"; do
  mkdir -p "$D"; ln -sfn "$SRC" "$D/premium-motion-video"; echo "linked → $D/premium-motion-video"
done
echo "Superpowers (recommended): Claude Code → /plugin install superpowers@claude-plugins-official ; others → https://github.com/obra/superpowers#installation"
