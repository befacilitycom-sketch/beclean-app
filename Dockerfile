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

# Copy only required runtime files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose Next.js default port
EXPOSE 3000

CMD ["npm", "run", "start"]
