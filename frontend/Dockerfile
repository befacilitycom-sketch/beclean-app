# ============================================================
# BeClean Frontend — Dockerfile
# Pure Next.js site (no Payload CMS)
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

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
