#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

compose_base=(-f "$repo_root/compose.yml" -f "$repo_root/compose.prod.yml" --profile production)

docker compose "${compose_base[@]}" run --rm certbot renew
docker compose "${compose_base[@]}" exec -T nginx nginx -s reload
