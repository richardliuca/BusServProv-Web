# BusServProv-Web

Monorepo for a service-provider web app: **Next.js** UI, **NestJS** API, **Temporal** worker, **NGINX** as the single browser entry, **PostgreSQL** (one instance, `temporal` + `app` databases), and **Elasticsearch** for Temporal visibility. See [architecture.md](architecture.md) for the target topology; local Compose uses **minimal Temporal + Elasticsearch** (auto-setup) for a smaller footprint.

## Prerequisites

- Docker with Compose v2
- Node 20+ (for local installs without Docker)

## Using Podman (macOS) instead of Docker

This repo works with **Podman** as the container runtime (via `podman machine`). One important difference from Docker Desktop: when running **rootless** containers, Podman cannot publish **privileged host ports** (<1024) by default. Since this stack publishes **HTTP/HTTPS on ports 80/443** (NGINX is the single browser entry), you have two options:

### Option A (recommended): allow ports 80/443 for rootless Podman (persistent)

Configure the **Podman machine VM** kernel setting (not macOS) to allow unprivileged port binds starting at 80.

```bash
# enter the Podman VM
podman machine ssh

# apply immediately (until reboot)
sudo sysctl -w net.ipv4.ip_unprivileged_port_start=80

# persist across reboots (drop-in sysctl file)
echo "net.ipv4.ip_unprivileged_port_start=80" | sudo tee /etc/sysctl.d/99-unprivileged-ports.conf
sudo sysctl --system
```

If you still see bind errors after persisting the sysctl, restart the VM:

```bash
podman machine stop
podman machine start
```

### Option B: use a rootful Podman machine

Run a **rootful** Podman machine/session so privileged ports can be published without changing `net.ipv4.ip_unprivileged_port_start`.

```bash
podman machine init --rootful
podman machine start
```

After either option, the existing Compose port mappings (`80:80` and `443:443`) should work as-is.

## Using Podman on Ubuntu (Linux host)

On Ubuntu, Podman runs directly on the **host Linux kernel** (no `podman machine` VM). The same privileged-port rule applies for **rootless** containers: publishing host ports **<1024** (like 80/443) will fail unless you change the host’s unprivileged port range.

### Option A (recommended): allow ports 80/443 for rootless Podman (persistent)

Set the sysctl on the **Ubuntu host**:

```bash
# apply immediately (until reboot)
sudo sysctl -w net.ipv4.ip_unprivileged_port_start=80

# persist across reboots (drop-in sysctl file)
echo "net.ipv4.ip_unprivileged_port_start=80" | sudo tee /etc/sysctl.d/99-unprivileged-ports.conf
sudo sysctl --system
```

### Option B: run Podman rootful

If you don’t want to change the sysctl, run Podman **rootful** on Ubuntu (privileged port publishing works normally):

```bash
sudo podman compose -f compose.yml -f compose.dev.yml --profile web up --build
```

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

All browser traffic goes through **NGINX** on **ports 80 and 443**: HTTP is redirected to HTTPS (including Next.js HMR WebSockets). The image ships a **self-signed** TLS certificate (your browser will warn until you accept it). Do not rely on publishing the Next container to the host.

Compose uses **named profiles** on [compose.yml](compose.yml): **`Temporal`** (full stack) and **`web`** (Next.js + nginx only).

```bash
docker compose -f compose.yml -f compose.dev.yml --profile Temporal up --build
```

Web UI only (no API / Temporal containers):

```bash
docker compose -f compose.yml -f compose.dev.yml --profile web up --build
```

Then open **https://localhost/** — landing page with business copy and **Create booking request**. The form posts to **`/api/booking-requests`** (same origin); NGINX forwards `/api/` to the API service.

- Health: `GET https://localhost/api/health`
- Temporal Web UI (proxied): **https://localhost/temporal/** — requires `TEMPORAL_UI_PUBLIC_PATH=/temporal` on the UI container (set in [compose.yml](compose.yml)) so scripts and routes load under `/temporal/`, not the site root.

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

## Production TLS (Let’s Encrypt via Cloudflare DNS-01)

Production uses **DNS-01** validation via Cloudflare, with a **named volume** shared between:

- `certbot` (read/write) at `/etc/letsencrypt`
- `nginx` (read-only) at `/etc/letsencrypt`

The production overlay does **not** run a renewal daemon. Renewal is handled by a **host cron** job that runs Certbot and reloads nginx.

### 1) Create Cloudflare API token

In Cloudflare: **My Profile → API Tokens → Create Token**.

- Permissions: **Zone → DNS → Edit**
- Scope: zone **`panda-massage.com`**

### 2) Create credentials file on the server

Copy the example and insert your token:

```bash
cp infra/secrets/cloudflare.ini infra/secrets/cloudflare.ini
chmod 600 infra/secrets/cloudflare.ini
```

### 3) First-time certificate issuance (must happen before nginx starts with prod config)

The production nginx config references:

- `/etc/letsencrypt/live/panda-massage.com/fullchain.pem`
- `/etc/letsencrypt/live/panda-massage.com/privkey.pem`

If those files are missing, nginx will fail to start. Run the one-shot issuance first:

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

Optional verification (does not modify live certs):

```bash
docker compose -f compose.yml -f compose.prod.yml --profile production run --rm certbot renew --dry-run
```

### 4) Start the production stack

Use the base compose plus the production overlay:

```bash
docker compose -f compose.yml -f compose.prod.yml --profile web --profile production up -d --build
```

### 5) Renewals via cron

Install a cron entry on the droplet to renew and reload nginx (path must match where the repo is cloned):

```bash
15 3,15 * * * /absolute/path/to/BusServProv-Web/infra/scripts/renew-letsencrypt.sh >>/var/log/bsp-certbot-renew.log 2>&1
```

## Environment variables

See [.env.config](.env.config) for names used by services. Compose injects Temporal and API settings inline; override with an `env_file` if you prefer.

## Notes

- **Two databases** on one Postgres: `temporal` (Temporal persistence) and `app` (for future application tables), created on first volume init via [infra/postgres/init-app-db.sql](infra/postgres/init-app-db.sql).
- **Hot reload**: edit files under `app/web` (including `public/`). HMR requires WebSocket support through NGINX (configured in [infra/nginx/default.conf](infra/nginx/default.conf)).
- **Elasticsearch** needs a reasonable amount of RAM for a comfortable dev experience.
