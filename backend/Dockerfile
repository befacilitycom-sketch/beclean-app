# ============================================================
# BeClean Backend — Dockerfile
# Next.js + Payload CMS only (no frontend pages)
# Uses tsx at runtime to guarantee DB init before HTTP start
# ============================================================

# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production PORT=3000

RUN apk add --no-cache libc6-compat

# Copy full node_modules — needed for tsx and payload CLI at runtime
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Copy Next.js build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copy source files needed by tsx at runtime (payload config + collections)
COPY --from=builder /app/payload.config.ts ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/src/collections ./src/collections
COPY --from=builder /app/src/globals ./src/globals
COPY --from=builder /app/src/app ./src/app
COPY --from=builder /app/init-db.ts ./

EXPOSE 3000

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
