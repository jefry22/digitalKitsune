#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/digitalkitsune"

echo "[deploy] Updating code from origin/main..."
git -C "$APP_DIR" pull --ff-only origin main

echo "[deploy] Installing dependencies..."
npm --prefix "$APP_DIR" install

echo "[deploy] Building production app..."
npm --prefix "$APP_DIR" run build

echo "[deploy] Restarting app on port 3000..."
if ss -ltnp | grep -q ':3000 '; then
  PID="$(ss -ltnp | grep ':3000 ' | sed -E 's/.*pid=([0-9]+).*/\1/' | head -n 1)"
  if [ -n "$PID" ]; then
    kill "$PID"
  fi
fi

nohup npm --prefix "$APP_DIR" run start -- --port 3000 > "$APP_DIR/server.log" 2>&1 &

echo "[deploy] Done. App running on port 3000."
