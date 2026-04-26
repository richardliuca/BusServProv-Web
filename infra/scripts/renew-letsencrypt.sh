#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

compose_base=(-f "$repo_root/compose.droplet.yml" -f "$repo_root/compose.prod.yml")

podman compose "${compose_base[@]}" run --rm certbot renew
podman compose "${compose_base[@]}" exec -T nginx nginx -s reload
