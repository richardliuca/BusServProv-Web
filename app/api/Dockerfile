FROM docker.io/library/node:20-bookworm-slim AS deps
WORKDIR /repo
COPY package.json package-lock.json* ./
COPY packages/temporal/package.json ./packages/temporal/
COPY app/api/package.json ./app/api/
RUN npm ci
COPY packages/temporal ./packages/temporal
COPY app/api ./app/api
RUN npm run build -w @bsp/temporal && npm run build -w @bsp/api

FROM deps AS development
WORKDIR /repo
ENV NODE_ENV=development
CMD ["sh", "-c", "cd /repo && npm ci && npm run build -w @bsp/temporal && cd app/api && npx nest start --watch"]

FROM docker.io/library/node:20-bookworm-slim AS production
WORKDIR /repo
ENV NODE_ENV=production
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/package.json ./
COPY --from=deps /repo/packages/temporal ./packages/temporal
COPY --from=deps /repo/app/api ./app/api
WORKDIR /repo/app/api
EXPOSE 3001
CMD ["node", "dist/main.js"]
