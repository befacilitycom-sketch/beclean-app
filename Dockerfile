# ============================================================
# BeClean — Dockerfile Multi-Stage (Next.js + Payload CMS)
# Stage 1: Build → Stage 2: Clean Node.js Runner
# ============================================================

# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies for native modules (sharp, pg)
RUN apk add --no-cache libc6-compat python3 make g++

# Copy dependency files first (better Docker layer caching)
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy all source files
COPY . .

# Build Next.js + Payload (generates importMap and admin bundle)
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN apk add --no-cache libc6-compat

# Copy standalone output and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose Next.js default port
EXPOSE 3000

# Copy and make entrypoint executable
COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]
