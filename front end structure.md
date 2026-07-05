# Frontend structure and editing guide

This document describes how the **Next.js App Router** frontend in `app/web` is wired: what loads in what order, and which files control each **visual zone** on the home page.

Paths below are from the **repository root**.

## Loading / render sequence (App Router)

On a visit to `/`, Next.js resolves the route, runs the **root layout** (once per tree), then renders the **page** as its `children`. Global CSS and the web fonts (Fraunces for display headings, Manrope for body text, loaded via `next/font`) are pulled in from the layout. Everything is server-rendered except the pricing table, which is a client component (search + sort state).

```mermaid
flowchart TD
  A[Browser requests /] --> B[next start / production server]
  B --> C["app/web/src/app/layout.tsx — RootLayout (fonts + global.css)"]
  C --> D["Metadata: title, description from AppConfig"]
  C --> E["app/web/src/app/page.tsx — HomePage"]
  E --> F["app/web/src/templates/Base.tsx — page shell + section order"]
  F --> H0[Navbar — sticky, server]
  F --> H1[Hero — server]
  F --> H2[VerticalFeatures (Services cards) — server]
  F --> H3[PricingSection — client 'use client']
  F --> H4[Banner (CTA band) — server]
  F --> H5[Footer (Location) — server]
```

### Practical meaning

- **Edit structure / order of sections**: `app/web/src/templates/Base.tsx` (this is the single “table of contents” for the landing page).
- **Site-wide chrome** (document shell, fonts, default title/description, global styles): `app/web/src/app/layout.tsx`, `app/web/src/utils/AppConfig.ts`, `app/web/src/styles/global.css`, `app/web/src/styles/app-theme.css`.
- **Look and feel** (colors, spacing, typography): color tokens live in `app/web/src/styles/app-theme.css` (Tailwind v4 `@theme`); components use semantic classes like `bg-linen`, `text-ink`, `bg-sand`, `bg-cocoa`, and the `primary-*` copper scale.
- **Business facts** (name, phone, address, listing URLs): `app/web/src/utils/AppConfig.ts` — the navbar, hero, banner, and footer all read from it.

## Page zones → files to edit

| Zone (top to bottom) | Primary file(s) | Supporting pieces |
|----------------------|-----------------|---------------------|
| **Sticky top nav + call pill** | `app/web/src/navigation/Navbar.tsx` | `app/web/src/templates/Logo.tsx`, links in `NAV_LINKS` |
| **Hero (photo, headline, CTAs, highlights)** | `app/web/src/templates/Hero.tsx` | `app/web/src/button/Button.tsx`, photo at `app/web/public/assets/images/hero_bg.webp` |
| **Services card grid** | `app/web/src/templates/VerticalFeatures.tsx` | `app/web/src/feature/ServiceCard.tsx`, photos in `app/web/public/assets/images/` |
| **Pricing (search / sort table)** | `app/web/src/templates/PricingSection.tsx` | Service data is the `SERVICES` array at the top of the file |
| **Mid-page CTA band** | `app/web/src/templates/Banner.tsx` | `Button` (`light` variant) |
| **Footer (address, phone, socials)** | `app/web/src/templates/Footer.tsx` | Social URLs from `AppConfig`, `Logo` |

## Shared building blocks

- `app/web/src/layout/Section.tsx` — width, vertical padding, and the eyebrow / title / description header for every band. Supports `onDark` for dark surfaces.
- `app/web/src/button/Button.tsx` — pill button with `primary` (copper), `light` (cream, for dark surfaces), and `outline` variants, plus `xl` size.
- `app/web/src/templates/Logo.tsx` — panda mark + wordmark; `onDark` inverts the text color.

### Roadmap: booking section

The booking request form was removed for the frontend-only MVP. To add it back later, create a new section component under `app/web/src/templates/`, mount it in `Base.tsx`, and wire its `fetch` calls to a backend (a Next.js Route Handler under `app/web/src/app/api/**/route.ts`, or an external API via `NEXT_PUBLIC_API_URL`).

### Entry points

- **Route → page**: `app/web/src/app/page.tsx` (currently only renders `<Base />`).
- **HTML shell + metadata + fonts**: `app/web/src/app/layout.tsx`.

### Global branding copy

Browser tab title, SEO description, phone, and address:

- `app/web/src/utils/AppConfig.ts`

## Quick mental model

1. **`page.tsx`** chooses which template page you see (here, the landing is `Base`).
2. **`Base.tsx`** is the **vertical stack** of sections; reorder, add, or remove sections here.
3. Each **`templates/*.tsx`** file is one **horizontal band** of the page; open the one that matches the band you want to change.
4. **`layout/Section.tsx`** and the theme tokens in **`styles/app-theme.css`** affect **many** sections at once.

## Adding more routes later

If you add more routes (for example `/about`), add `app/web/src/app/about/page.tsx` and optionally share `Base` or compose a different template the same way.
