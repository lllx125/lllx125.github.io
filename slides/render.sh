#!/usr/bin/env bash
# Render the deck slides/<slug>.html to <slug>.pdf (all pages) and <slug>-<n>.png (one per page)
# with headless Chromium. Each page is a <section class="slide"> directly inside <body>.
# Usage: slides/render.sh <slug> [<slug> ...]
set -euo pipefail
CHROME="${CHROME:-$(ls -d "$HOME"/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell | tail -1)}"
DIR="$(cd "$(dirname "$0")" && pwd)"
for slug in "$@"; do
  src="$DIR/$slug.html"
  pages=$(grep -c '<section class="slide' "$src")
  rm -f "$DIR/$slug".png "$DIR/$slug"-[0-9]*.png
  "$CHROME" --no-sandbox --virtual-time-budget=4000 --no-pdf-header-footer \
    --print-to-pdf="$DIR/$slug.pdf" "file://$src" 2>/dev/null
  for n in $(seq 1 "$pages"); do
    # Temporary copy (same folder, so relative paths still resolve) that shows only page n.
    tmp="$DIR/.render-$slug-$n.html"
    sed "s#</head>#<style>body > section.slide:not(:nth-of-type($n)){display:none}</style></head>#" "$src" > "$tmp"
    "$CHROME" --no-sandbox --hide-scrollbars --virtual-time-budget=4000 \
      --window-size=1280,720 --force-device-scale-factor=2 \
      --screenshot="$DIR/$slug-$n.png" "file://$tmp" 2>/dev/null
    rm -f "$tmp"
  done
  echo "rendered $slug ($pages pages)"
done
