# BusServProv-Web

Monorepo for a service-provider web app: **Next.js** UI, **NestJS** API, **Temporal** worker, **NGINX** as the single browser entry, **PostgreSQL** (one instance, `temporal` + `app` databases), and **Elasticsearch** for Temporal visibility. See [architecture.md](architecture.md) for the target topology; local Compose uses **minimal Temporal + Elasticsearch** (auto-setup) for a smaller footprint.

## Prerequisites

- Docker with Compose v2
- Node 20+ (for local installs without Docker)

## Repository layout (npm workspaces)

| Path | Role |
|------|------|
| [app/web](app/web) | Next.js 15 (App Router) + **Tailwind CSS**; landing layout adapted from [ixartz/Next-JS-Landing-Page-Starter-Template](https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template) |
| [app/api](app/api) | NestJS HTTP API (`/api/*`), Temporal **client** |
| [app/worker](app/worker) | Temporal **worker** (polls task queue) |
| [packages/temporal](packages/temporal) | Shared workflows, activities, task queue constants |

Install from the **repository root**:

```bash
npm install
npm run build -w @bsp/temporal
npm run build -w @bsp/api -w @bsp/worker -w @bsp/web
```

## Run the full stack (recommended: dev + hot reload)

All browser traffic goes through **NGINX on port 80** (including Next.js HMR WebSockets). Do not rely on publishing the Next container to the host.

Compose uses **named profiles** on [compose.yml](compose.yml): **`Temporal`** (full stack) and **`web`** (Next.js + nginx only).

```bash
docker compose -f compose.yml -f compose.dev.yml --profile Temporal up --build
```

Web UI only (no API / Temporal containers):

```bash
docker compose -f compose.yml -f compose.dev.yml --profile web up --build
```

Then open **http://localhost/** — landing page with business copy and **Create booking request**. The form posts to **`/api/booking-requests`** (same origin); NGINX forwards `/api/` to the API service.

- Health: `GET http://localhost/api/health`
- Temporal Web UI (proxied): **http://localhost/temporal/** — requires `TEMPORAL_UI_PUBLIC_PATH=/temporal` on the UI container (set in [compose.yml](compose.yml)) so scripts and routes load under `/temporal/`, not the site root.

The dev override file bind-mounts the repo and uses **development** Docker build targets so `next dev`, `nest start --watch`, and `tsx watch` run inside containers. An anonymous volume keeps **`/repo/node_modules`** so host bind mounts do not wipe installed dependencies.

## Production-style images (no hot reload)

```bash
docker compose -f compose.yml --profile Temporal up --build
```

Web + nginx only:

```bash
docker compose -f compose.yml --profile web up --build
```

Uses `production` targets for `web`, `api`, and `worker`.

## Environment variables

See [.env.config](.env.config) for names used by services. Compose injects Temporal and API settings inline; override with an `env_file` if you prefer.

## Notes

- **Two databases** on one Postgres: `temporal` (Temporal persistence) and `app` (for future application tables), created on first volume init via [infra/postgres/init-app-db.sql](infra/postgres/init-app-db.sql).
- **Hot reload**: edit files under `app/web` (including `public/`). HMR requires WebSocket support through NGINX (configured in [infra/nginx/default.conf](infra/nginx/default.conf)).
- **Elasticsearch** needs a reasonable amount of RAM for a comfortable dev experience.
