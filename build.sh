#!/usr/bin/env bash
set -euo pipefail

SRC="src"
PUBLIC="public"
BIN="bin"

rm -rf "$BIN"
mkdir -p "$BIN"

# ----------------------------
# 1. Copy public/ directly to bin/
# ----------------------------
if [ -d "$PUBLIC" ]; then
  find "$PUBLIC" -type f | while IFS= read -r file; do
    rel="${file#"$PUBLIC"/}"
    mkdir -p "$BIN/$(dirname "$rel")"
    cp "$file" "$BIN/$rel"
  done
fi

# ----------------------------
# 2. Copy src/ assets (non-md)
# ----------------------------
find "$SRC" -type f ! -name "*.md" | while IFS= read -r file; do
  rel="${file#"$SRC"/}"
  mkdir -p "$BIN/$(dirname "$rel")"
  cp "$file" "$BIN/$rel"
done

# ----------------------------
# 3. Convert markdown files
# ----------------------------
find "$SRC" -type f -name "*.md" | while IFS= read -r md; do
  rel="${md#"$SRC"/}"
  out="$BIN/${rel%.md}.html"
  mkdir -p "$(dirname "$out")"

  # folder depth
  depth=$(dirname "$rel" | awk -F/ '{print NF}')

  # build relative prefix
  prefix=""
  if [ "$(dirname "$rel")" != "." ]; then
    for ((i=0; i<depth; i++)); do
      prefix="../$prefix"
    done
  fi

  pandoc \
    --template=template.html \
    -M base="$prefix" \
    "$md" -o "$out"
done