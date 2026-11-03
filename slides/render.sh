#!/usr/bin/env bash
# Render slides/<slug>.html to <slug>.png and <slug>.pdf with headless Chromium.
# Usage: slides/render.sh <slug> [<slug> ...]
set -euo pipefail
CHROME="${CHROME:-$HOME/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
DIR="$(cd "$(dirname "$0")" && pwd)"
for slug in "$@"; do
  src="file://$DIR/$slug.html"
  "$CHROME" --no-sandbox --hide-scrollbars --virtual-time-budget=4000 \
    --window-size=1280,720 --force-device-scale-factor=2 \
    --screenshot="$DIR/$slug.png" "$src" 2>/dev/null
  "$CHROME" --no-sandbox --virtual-time-budget=4000 --no-pdf-header-footer \
    --print-to-pdf="$DIR/$slug.pdf" "$src" 2>/dev/null
  echo "rendered $slug"
done
