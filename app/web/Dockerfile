FROM docker.io/library/node:20-bookworm-slim AS deps
WORKDIR /repo
COPY package.json package-lock.json* ./
COPY app/web/package.json ./app/web/
RUN npm ci
COPY app/web ./app/web
RUN npm run build -w @bsp/web

FROM deps AS development
WORKDIR /repo
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development
CMD ["sh", "-c", "cd /repo && npm ci && cd app/web && npm run dev -- --hostname 0.0.0.0 --port 3000"]

FROM docker.io/library/node:20-bookworm-slim AS production
WORKDIR /repo
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/package.json ./
COPY --from=deps /repo/app/web ./app/web
WORKDIR /repo/app/web
EXPOSE 3000
CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "3000"]
