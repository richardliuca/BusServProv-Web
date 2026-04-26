# Build + deploy `web` image (GHCR)

This repo is designed so small servers (e.g. **1GB RAM droplets**) can **pull and run** a prebuilt `web` image instead of building Next.js on the droplet.

The `web` production image is built from `app/web/Dockerfile` (target: `production`) and runs the Next.js **standalone** server.

## Prereqs

- A **powerful build machine** (laptop/desktop/CI) with Docker **or** Podman.
- A **1GB droplet** (Ubuntu) running Podman or Docker.
- GHCR repo: `ghcr.io/richardliuca/bsp-web`

## 1) Authenticate to GHCR

### Docker

```bash
export GHCR_USER=richardliuca
export GHCR_TOKEN=... # a GitHub token with packages:write

echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
```

### Podman

```bash
export GHCR_USER=richardliuca
export GHCR_TOKEN=... # a GitHub token with packages:write

echo "$GHCR_TOKEN" | podman login ghcr.io -u "$GHCR_USER" --password-stdin
```

## 2) Build + push the `web` image on the powerful machine

### Option A (recommended for droplets): build + push **amd64** only

This matches most DigitalOcean droplets (`x86_64` / `linux/amd64`) and avoids slow emulation.

#### Docker

```bash
export TAG=v1-amd64

docker build \
  --platform linux/amd64 \
  -f app/web/Dockerfile \
  --target production \
  -t ghcr.io/richardliuca/bsp-web:$TAG \
  .

docker push ghcr.io/richardliuca/bsp-web:$TAG
```

#### Podman

```bash
export TAG=v1-amd64

podman build \
  --platform linux/amd64 \
  -f app/web/Dockerfile \
  --target production \
  -t ghcr.io/richardliuca/bsp-web:$TAG \
  .

podman push ghcr.io/richardliuca/bsp-web:$TAG
```

### Option B: build + push **multi-arch** (amd64 + arm64) under one tag

Useful if you build on Apple Silicon but deploy to amd64 droplets.

```bash
export TAG=v1

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -f app/web/Dockerfile \
  --target production \
  -t ghcr.io/richardliuca/bsp-web:$TAG \
  --push \
  .
```

## 3) Pull + run on the 1GB droplet (no build on droplet)

This repo includes `compose.droplet.yml` which defines:

- `web`: **image-only** (no `build:`) via `BSP_WEB_IMAGE`
- `nginx`: built locally from `infra/nginx` (small build)

### Podman (droplet)

```bash
export BSP_WEB_IMAGE=ghcr.io/richardliuca/bsp-web:v1-amd64

podman pull --pull-always "$BSP_WEB_IMAGE"
podman compose -f compose.droplet.yml --profile web pull
podman compose -f compose.droplet.yml --profile web up -d
```

### Docker (droplet)

```bash
export BSP_WEB_IMAGE=ghcr.io/richardliuca/bsp-web:v1-amd64

docker pull "$BSP_WEB_IMAGE"
docker compose -f compose.droplet.yml --profile web pull
docker compose -f compose.droplet.yml --profile web up -d
```

## 4) Optional: use the production nginx + Let’s Encrypt overlay

```bash
export BSP_WEB_IMAGE=ghcr.io/richardliuca/bsp-web:v1-amd64

podman compose -f compose.droplet.yml -f compose.prod.yml --profile web --profile production up -d
```

## 5) Troubleshooting

### “image platform (linux/arm64) does not match … (linux/amd64)”

- Your droplet is amd64 but you pushed an arm64 image (common when building on Apple Silicon).
- Fix: use **Option A** (`--platform linux/amd64`) or **Option B** (multi-arch buildx).

### “next start does not work with output: standalone”

That means the running container is still executing `next start` (old image / old tag).

On the droplet, confirm the container command:

```bash
podman inspect NextJS-Web --format 'ENTRYPOINT={{.Config.Entrypoint}} CMD={{.Config.Cmd}}'
```

The standalone image should show something like `CMD=[node server.js]`.

