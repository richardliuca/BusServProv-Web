FROM node:20-bookworm-slim AS deps
WORKDIR /repo
COPY package.json package-lock.json* ./
COPY packages/temporal/package.json ./packages/temporal/
COPY app/worker/package.json ./app/worker/
RUN npm ci
COPY packages/temporal ./packages/temporal
COPY app/worker ./app/worker
RUN npm run build -w @bsp/temporal && npm run build -w @bsp/worker

FROM deps AS development
WORKDIR /repo
ENV NODE_ENV=development
ENV WORKFLOWS_PATH=/repo/packages/temporal/src/workflows.ts
CMD ["sh", "-c", "cd /repo && npm ci && npm run build -w @bsp/temporal && cd app/worker && npm run start:dev"]

FROM node:20-bookworm-slim AS production
WORKDIR /repo
ENV NODE_ENV=production
ENV WORKFLOWS_PATH=/repo/packages/temporal/src/workflows.ts
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/package.json ./
COPY --from=deps /repo/packages/temporal ./packages/temporal
COPY --from=deps /repo/app/worker ./app/worker
WORKDIR /repo/app/worker
CMD ["node", "dist/main.js"]
