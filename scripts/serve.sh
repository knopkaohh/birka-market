#!/bin/sh
# next start не работает при output: standalone. Скрипт подкладывает
# public и статику и запускает server.js. Порт и хост: PORT и HOSTNAME.
set -e
cd "$(dirname "$0")/.."
if [ ! -f .next/standalone/server.js ]; then
  echo "Сначала выполните npm run build"
  exit 1
fi
mkdir -p .next/standalone/.next
rm -rf .next/standalone/public .next/standalone/.next/static
cp -a public .next/standalone/public
cp -a .next/static .next/standalone/.next/static
cd .next/standalone
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"
exec node server.js
