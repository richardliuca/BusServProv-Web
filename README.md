# BusServProv-Web

Frontend repository for a service-provider marketing website. The stack is **Next.js** (App Router) behind **NGINX**, which is the single browser entry on ports **80/443** (HTTP redirect + TLS termination).

This repo is **frontend-only**. Booking, API, Temporal, PostgreSQL, and Elasticsearch were removed for the MVP — the site is a static landing page with no backend dependency. See [Roadmap](#roadmap) for how to add booking later.

For topology details, see [architecture.md](architecture.md). For editing page sections, see [front end structure.md](front%20end%20structure.md).

## What's in this repo

| Path | Role |
|------|------|
| [app/web](app/web) | Next.js 15 + React 19 + Tailwind v4 — landing page (Hero, Services, Pricing, CTA, Footer) |
| [infra/nginx](infra/nginx) | Reverse proxy; local dev uses a self-signed cert, production uses Let's Encrypt |
| [infra/scripts/renew-letsencrypt.sh](infra/scripts/renew-letsencrypt.sh) | Host cron helper for certificate renewal |
| [compose.yml](compose.yml) | Base stack: `web` + `nginx` |
| [compose.dev.yml](compose.dev.yml) | Dev override: hot reload via `next dev` |
| [compose.droplet.yml](compose.droplet.yml) | Small-VM deploy: pull a prebuilt `web` image (no build on droplet) |
| [compose.prod.yml](compose.prod.yml) | Production overlay: prod nginx config + certbot |
| [Build.md](Build.md) | Build and push the `web` image to GHCR |

## What's not in this repo (removed for MVP)

- NestJS API (`app/api`)
- Temporal worker (`app/worker`)
- Shared Temporal workflows (`packages/temporal`)
- PostgreSQL init scripts (`infra/postgres`)
- Booking form UI (`BookingRequestForm`, `BookingSection`)
- nginx `/api/` and `/temporal/` upstream routes

## Prerequisites

- **Docker** with Compose v2 (recommended for local and production)
- **Node 20+** (optional — for running Next.js directly on the host without Docker)

## Quick start (Docker, dev + hot reload)

All browser traffic goes through **NGINX** on ports **80** and **443**. HTTP redirects to HTTPS. The nginx image ships a **self-signed** certificate for local use — your browser will warn until you accept it. The Next.js container is **not** published to the host; use nginx as the entry point.

```bash
docker compose -f compose.yml -f compose.dev.yml --profile web up --build
```

Open **https://localhost/**.

The dev override bind-mounts the repo and runs `next dev` inside the container. An anonymous volume preserves `/repo/node_modules` so host bind mounts do not wipe installed dependencies.

## Quick start (Node only, no Docker)

Useful for fast UI iteration without nginx:

```bash
npm install
npm run dev -w @bsp/web
```

Open **http://localhost:3000/**.

Production build:

```bash
npm run build -w @bsp/web
npm run start -w @bsp/web
```

## Production-style local run (Docker, no hot reload)

Builds the `production` Docker target for `web`:

```bash
docker compose -f compose.yml --profile web up --build
```

Open **https://localhost/**.

## Compose files

| File | Purpose |
|------|---------|
| `compose.yml` | Defines `web` and `nginx` on the `bsp` bridge network. Both services use the `web` profile. |
| `compose.dev.yml` | Overrides `web` to use the `development` build target, bind-mount the repo, and enable file watching. |
| `compose.droplet.yml` | Runs a prebuilt image via `BSP_WEB_IMAGE` — no `next build` on the droplet. See [Build.md](Build.md). |
| `compose.prod.yml` | Mounts `default.prod.conf` and wires certbot + a shared `letsencrypt_certs` volume. Uses the `production` profile. |

Typical production start (build on server):

```bash
docker compose -f compose.yml -f compose.prod.yml --profile web --profile production up -d --build
```

Small droplet (pull prebuilt image):

```bash
export BSP_WEB_IMAGE=ghcr.io/richardliuca/bsp-web:v1-amd64
docker compose -f compose.droplet.yml --profile web pull
docker compose -f compose.droplet.yml --profile web up -d
```

With Let's Encrypt:

```bash
docker compose -f compose.droplet.yml -f compose.prod.yml --profile web --profile production up -d
```

## Deploy to a small server (GHCR)

Small VMs (e.g. 1 GB RAM droplets) should **pull** a prebuilt image instead of building Next.js on the server. Full steps — authenticate to GHCR, build for `linux/amd64`, push, and run with `compose.droplet.yml` — are in [Build.md](Build.md).

Image: `ghcr.io/richardliuca/bsp-web`

## Production TLS (Let's Encrypt via Cloudflare DNS-01)

Production nginx (`infra/nginx/default.prod.conf`) terminates TLS for:

- `panda-massage.com`, `*.panda-massage.com`
- `pandamassages.com`, `*.pandamassages.com`

Certificates live in a named Docker volume (`letsencrypt_certs`) shared between:

- **certbot** (read/write) at `/etc/letsencrypt`
- **nginx** (read-only) at `/etc/letsencrypt`

The production overlay does **not** run a renewal daemon. Renewal is handled by a **host cron** job.

### 1) Create a Cloudflare API token

In Cloudflare: **My Profile → API Tokens → Create Token**.

- Permissions: **Zone → DNS → Edit**
- Scope: zone **`panda-massage.com`**

### 2) Create credentials on the server

Create `infra/secrets/cloudflare.ini` (not committed to git):

```ini
dns_cloudflare_api_token = YOUR_TOKEN_HERE
```

```bash
chmod 600 infra/secrets/cloudflare.ini
```

### 3) Issue the first certificate

Issue certs **before** starting nginx with the production config. nginx expects:

- `/etc/letsencrypt/live/panda-massage.com/fullchain.pem`
- `/etc/letsencrypt/live/panda-massage.com/privkey.pem`

```bash
docker compose -f compose.yml -f compose.prod.yml --profile production run --rm certbot \
  certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
  --dns-cloudflare-propagation-seconds 120 \
  -d panda-massage.com -d www.panda-massage.com \
  --email richardliuca@gmail.com \
  --agree-tos \
  --non-interactive
```

Dry-run renewal (does not modify live certs):

```bash
docker compose -f compose.yml -f compose.prod.yml --profile production run --rm certbot renew --dry-run
```

### 4) Start production

```bash
docker compose -f compose.yml -f compose.prod.yml --profile web --profile production up -d --build
```

### 5) Schedule renewals

Add a cron entry on the server (adjust the repo path):

```bash
15 3 1 * * /absolute/path/to/BusServProv-Web/infra/scripts/renew-letsencrypt.sh >>/var/log/bsp-certbot-renew.log 2>&1
```

## Using Podman instead of Docker

This repo works with **Podman** as the container runtime. One caveat: **rootless** Podman cannot bind host ports **< 1024** (80/443) unless you change the unprivileged port range.

### macOS (Podman machine)

**Option A (recommended):** allow ports 80/443 inside the Podman VM:

```bash
podman machine ssh
sudo sysctl -w net.ipv4.ip_unprivileged_port_start=80
echo "net.ipv4.ip_unprivileged_port_start=80" | sudo tee /etc/sysctl.d/99-unprivileged-ports.conf
sudo sysctl --system
```

If bind errors persist, restart the VM: `podman machine stop && podman machine start`.

**Option B:** use a rootful machine:

```bash
podman machine init --rootful
podman machine start
```

### Ubuntu (Linux host)

**Option A (recommended):** on the host:

```bash
sudo sysctl -w net.ipv4.ip_unprivileged_port_start=80
echo "net.ipv4.ip_unprivileged_port_start=80" | sudo tee /etc/sysctl.d/99-unprivileged-ports.conf
sudo sysctl --system
```

**Option B:** run compose rootful:

```bash
sudo podman compose -f compose.yml -f compose.dev.yml --profile web up --build
```

Replace `docker compose` with `podman compose` in all other commands.

## Environment variables

The frontend MVP has **no required** runtime environment variables. See [.env.config](.env.config) for optional future settings (e.g. `NEXT_PUBLIC_API_URL` when a backend is added).

## Development notes

- **Hot reload:** edit files under `app/web` (including `public/`). HMR WebSockets are proxied through nginx — see [infra/nginx/default.conf](infra/nginx/default.conf).
- **Page structure:** section order and which files to edit are documented in [front end structure.md](front%20end%20structure.md).
- **Images:** Next.js is configured with `images.unoptimized: true` to avoid OOM on small servers during on-demand image optimization.

## Roadmap

Booking and backend orchestration (NestJS API, Temporal worker, PostgreSQL, Elasticsearch) were removed for the frontend-only MVP. To add them back later:

1. **In-repo API:** add a Next.js Route Handler under `app/web/src/app/api/**/route.ts` and mount a booking section in `app/web/src/templates/Base.tsx`.
2. **Separate backend:** deploy a standalone API service, re-add an `/api/` upstream block to the nginx configs, and point the frontend at it via `NEXT_PUBLIC_API_URL`.

Either approach can be introduced without restoring the old monorepo layout.
