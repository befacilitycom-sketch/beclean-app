#!/bin/sh
# ===========================================================
# BeClean Backend — Docker Entrypoint
# 1. Wait for PostgreSQL
# 2. Push DB schema via tsx (TypeScript — no compilation needed)
# 3. Start Next.js production server
# ===========================================================
set -e

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   BeClean CMS Backend — Starting up...       ║"
echo "╚══════════════════════════════════════════════╝"

# Step 1: Wait for PostgreSQL to be ready
echo "⏳ [1/3] Waiting for PostgreSQL..."
until node -e "
const net = require('net');
const s = net.createConnection(5432, 'postgres', () => { s.end(); process.exit(0); });
s.on('error', () => process.exit(1));
" 2>/dev/null; do
  printf '.'
  sleep 2
done
echo ""
echo "✅ [1/3] PostgreSQL ready!"

# Step 2: Push Payload schema to database
echo "📊 [2/3] Pushing database schema..."
node_modules/.bin/tsx init-db.ts

echo "🌐 [3/3] Starting Next.js CMS server on :3000..."
exec node_modules/.bin/next start
