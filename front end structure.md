# Frontend structure and editing guide

This document describes how the **Next.js App Router** frontend in `app/web` is wired: what loads in what order, and which files control each **visual zone** on the home page.

Paths below are from the **repository root**.

## Loading / render sequence (App Router)

On a visit to `/`, Next.js resolves the route, runs the **root layout** (once per tree), then renders the **page** as its `children`. Global CSS is pulled in from the layout. The current MVP is fully server-rendered (no client components mounted on the home page).

```mermaid
flowchart TD
  A[Browser requests /] --> B[next start / production server]
  B --> C["app/web/src/app/layout.tsx — RootLayout"]
  C --> D["Import global.css — Tailwind v4 + app theme"]
  C --> E["Metadata: title, description from AppConfig"]
  C --> F["app/web/src/app/page.tsx — HomePage"]
  F --> G["app/web/src/templates/Base.tsx — page shell + section order"]
  G --> H1[Hero — server]
  G --> H2[VerticalFeatures (Services) — server]
  G --> H3[PricingSection — server]
  G --> H4[Banner — server]
  G --> H5[Footer (Location) — server]
```

### Practical meaning

- **Edit structure / order of sections**: `app/web/src/templates/Base.tsx` (this is the single “table of contents” for the landing page).
- **Site-wide chrome** (document shell, default title/description, global styles): `app/web/src/app/layout.tsx`, `app/web/src/utils/AppConfig.ts`, `app/web/src/styles/global.css`, `app/web/src/styles/app-theme.css`.
- **Interactive behavior** (client-side state, `fetch`): add a file with `'use client'` when needed (none is mounted in the current MVP).
- **Look and feel** (colors, spacing, typography): often `app/web/tailwind.config.ts` + `app/web/src/styles/global.css` + the specific section components.

## Page zones → files to edit

| Zone (top to bottom) | Primary file(s) | Supporting pieces |
|----------------------|-----------------|---------------------|
| **Top bar / nav + logo** | `app/web/src/templates/Hero.tsx` | `app/web/src/navigation/NavbarTwoColumns.tsx`, `app/web/src/templates/Logo.tsx`, links live in `Hero.tsx` |
| **Hero headline, subtext, main CTA** | `Hero.tsx` | `app/web/src/hero/HeroOneButton.tsx`, `app/web/src/button/Button.tsx`, `app/web/src/layout/Section.tsx`, `app/web/src/background/Background.tsx` |
| **Three feature rows (“Why book with us”)** | `app/web/src/templates/VerticalFeatures.tsx` | `app/web/src/feature/VerticalFeatureRow.tsx`, SVGs in `app/web/public/assets/images/` |
| **Pricing strip** | `app/web/src/templates/PricingSection.tsx` | `Background`, `Section` |
| **Mid-page CTA band** | `app/web/src/templates/Banner.tsx` | `app/web/src/cta/CTABanner.tsx`, `app/web/src/button/Button.tsx` |
| **Footer** | `app/web/src/templates/Footer.tsx` | `app/web/src/footer/CenteredFooter.tsx`, `app/web/src/footer/FooterCopyright.tsx`, `app/web/src/footer/FooterIconList.tsx`, `Logo` |

### Roadmap: booking section

The booking request form was removed for the frontend-only MVP. To add it back later, create a new section component under `app/web/src/templates/`, mount it in `Base.tsx`, and wire its `fetch` calls to a backend (a Next.js Route Handler under `app/web/src/app/api/**/route.ts`, or an external API via `NEXT_PUBLIC_API_URL`).

### Entry points

- **Route → page**: `app/web/src/app/page.tsx` (currently only renders `<Base />`).
- **HTML shell + metadata**: `app/web/src/app/layout.tsx`.

### Global branding copy

Browser tab title and SEO description:

- `app/web/src/utils/AppConfig.ts`

## Quick mental model

1. **`page.tsx`** chooses which template page you see (here, the landing is `Base`).
2. **`Base.tsx`** is the **vertical stack** of sections; reorder, add, or remove sections here.
3. Each **`templates/*.tsx`** file is one **horizontal band** of the page; open the one that matches the band you want to change.
4. **`layout/Section.tsx`** and **`background/Background.tsx`** are reused wrappers for padding and background blocks—tweaking them affects **many** sections at once.

## Adding more routes later

If you add more routes (for example `/about`), add `app/web/src/app/about/page.tsx` and optionally share `Base` or compose a different template the same way.
