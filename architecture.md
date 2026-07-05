      [ Public Internet ]

              |
              ▼
    +-----------------------+
    |     NGINX (RP/TLS)    | (Container Port: 80/443)
    +-----------|-----------+

                |
                ▼
        +----------------+
        |  Next.js App   |
        |   (Frontend)   | (Container Port: 3000)
        +----------------+

[ Services networked via Docker Compose bridge network `bsp` ]

# Components and Connectivity

NGINX (Reverse Proxy / TLS termination): The single browser entry point on ports 80/443. It redirects HTTP → HTTPS and proxies all traffic to the Next.js frontend (`/`).

Next.js (Frontend): Serves the marketing/landing UI (App Router, React 19, Tailwind v4). This is a self-contained static/SSR site with no backend dependency in the current MVP.

Docker Containerization: Both components are defined in `compose.yml`, ensuring consistent networking and environment across environments (local, droplet, production).

# Roadmap (future backend)

Booking/service functionality (previously a NestJS API + Temporal worker) has been removed for the frontend-only MVP. To reintroduce it later, either:

- Add a Next.js Route Handler under `app/web/src/app/api/**/route.ts`, or
- Stand up a separate backend service and add an `/api/` upstream back into the nginx configs, pointing the frontend at it via `NEXT_PUBLIC_API_URL`.
