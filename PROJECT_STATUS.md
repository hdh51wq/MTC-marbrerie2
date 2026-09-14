# Project Status Report

Generated from the codebase as of the current working tree (read-only audit). Package name: **marbrerie-tunis-carthage** (Next.js 15 + next-intl, FR/EN).

---

## 1. Full file structure

### `src/`

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── [locale]/
│       ├── layout.tsx
│       ├── not-found.tsx
│       ├── page.tsx
│       ├── a-propos/
│       │   └── page.tsx
│       ├── catalogue/
│       │   └── page.tsx
│       ├── configurateur-3d/
│       │   └── page.tsx
│       ├── contact/
│       │   └── page.tsx
│       ├── devis/
│       │   └── page.tsx
│       ├── produits/
│       │   └── page.tsx
│       ├── projets/
│       │   └── page.tsx
│       └── usine/
│           └── page.tsx
├── components/
│   ├── common/
│   │   └── ComingSoon.tsx
│   ├── home/
│   │   ├── ConfiguratorTeaser.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ProductsCataloguePopup.tsx
│   │   ├── ProductsPreview.tsx
│   │   ├── ProjetsCataloguePopup.tsx
│   │   ├── ProjetsShowcase.tsx
│   │   ├── TrustedClients.tsx
│   │   ├── UsineCataloguePopup.tsx
│   │   ├── UsineShowcase.tsx
│   │   └── VideoShowcase.tsx
│   └── layout/
│       ├── FloatingSocialBar.tsx
│       ├── Footer.tsx
│       ├── LanguageSwitcher.tsx
│       └── Navbar.tsx
├── data/
│   ├── products.ts
│   ├── projects.ts
│   ├── siteConfig.ts
│   ├── testimonials.ts
│   └── usine.ts
├── lib/
│   └── i18n/
│       ├── dictionaries/
│       │   ├── en.json
│       │   └── fr.json
│       ├── request.ts
│       └── routing.ts
├── middleware.ts
└── types/
    └── content.ts
```

### `public/` (filenames only)

```
public/
├── 0.jpg
├── 00.jpg
├── 1.jpg
├── 2.jpg
├── 3.jpg
├── 4.jpg
├── attijeri.png
├── Bank de Tunisie.jpg
├── biat.png
├── logo.png
└── uib.png
```

---

## 2. Homepage sections — current state

Components rendered **in order** in `src/app/[locale]/page.tsx` (direct children only):

| Order | Component | Description |
|------:|-----------|-------------|
| 1 | **LoadingScreen.tsx** | Client overlay shown once per browser session (`sessionStorage` key `mtc-loading-shown`); GSAP animates a 0–100% counter, then fades out; shows logo from `siteConfig`, spinner, i18n loading text, and progress bar. |
| 2 | **Hero.tsx** | Full-viewport hero with four rotating background images (`/1.jpg`–`/4.jpg`, 5s interval), dark gradient overlay, GSAP entrance on title/subtitle/CTA, i18n title/subtitle/CTA; CTA links to `#produits`; scroll hint at bottom. |
| 3 | **VideoShowcase.tsx** | YouTube IFrame API player using `siteConfig.assets.youtubeVideoId`; plays when section is in view, pauses when out of view; mute/unmute toggle (French hardcoded `aria-label`); section `id="usine"`; hidden zero-size anchor `id="apropos"`. |
| 4 | **UsineShowcase.tsx** | Two-column section with image carousel (`/0.jpg`, `/00.jpg`, `/1.jpg`, `/2.jpg`), i18n title/description, CTA opens **UsineCataloguePopup** (not imported in `page.tsx` but mounted by this section). |
| 5 | **ProductsPreview.tsx** | Full-width `#produits` section with parallax-style background from `siteConfig.assets.productsSectionBackground`, gradient overlay, i18n title/description, button opens **ProductsCataloguePopup**. |
| 6 | **ConfiguratorTeaser.tsx** | `#configurateur` promo block with full-bleed background from `siteConfig.assets.configuratorBackground`, i18n copy, Framer Motion hover on **Link** to `/configurateur-3d`. |
| 7 | **ProjetsShowcase.tsx** | `#projets` section with hardcoded background `/3.jpg`, i18n title/description, button opens **ProjetsCataloguePopup**. |

**Layout shell (not in `page.tsx` but wraps every locale page):** `src/app/[locale]/layout.tsx` renders **Navbar**, `<main>{children}</main>`, **FloatingSocialBar**, and **Footer**.

---

## 3. Routes / pages status

All routes live under `src/app/[locale]/` with locale prefix `always` (`fr`, `en` — default `fr`).

| Route segment | URL pattern (example) | Status |
|---------------|------------------------|--------|
| `(home)` | `/fr`, `/en` | **Fully built** — multi-section marketing homepage with catalogue popups (see §2). |
| `a-propos` | `/fr/a-propos` | **Placeholder** — renders `ComingSoon` only. |
| `catalogue` | `/fr/catalogue` | **Placeholder** — `ComingSoon` only. |
| `configurateur-3d` | `/fr/configurateur-3d` | **Placeholder** — `ComingSoon` only (homepage teaser links here). |
| `contact` | `/fr/contact` | **Placeholder** — `ComingSoon` only. |
| `devis` | `/fr/devis` | **Placeholder** — `ComingSoon` only. |
| `produits` | `/fr/produits` | **Placeholder** — `ComingSoon` only (product UX is homepage popup + footer link). |
| `projets` | `/fr/projets` | **Placeholder** — `ComingSoon` only (projects UX is homepage popup + footer link). |
| `usine` | `/fr/usine` | **Placeholder** — `ComingSoon` only (factory UX is homepage showcase + popup + footer link). |
| `not-found.tsx` | (404 within locale) | **Partially built** — custom 404 UI with i18n “coming soon” description reused and link home; not a full content page. |

---

## 4. Dependencies installed

From `package.json`:

**dependencies**

| Package | Version |
|---------|---------|
| framer-motion | ^12.4.7 |
| gsap | ^3.12.7 |
| next | ^15.2.0 |
| next-intl | ^3.26.5 |
| react | ^19.0.0 |
| react-dom | ^19.0.0 |

**devDependencies**

| Package | Version |
|---------|---------|
| @eslint/eslintrc | ^3 |
| @tailwindcss/postcss | ^4 |
| @types/node | ^20 |
| @types/react | ^19 |
| @types/react-dom | ^19 |
| eslint | ^9 |
| eslint-config-next | ^15.2.0 |
| tailwindcss | ^4 |
| typescript | ^5 |

---

## 5. Data files

| File | Contents | Placeholder volume |
|------|----------|-------------------|
| **products.ts** | Array of `Product` objects (slug, images, tag, category, description, finish); mix of `/public` images and `placehold.co` URLs. | **16** products |
| **projects.ts** | Exports `Project` interface + `projects` array (title, category, images, description). | **16** projects |
| **usine.ts** | Exports `UsineMachine` interface + `usineMachines` array (factory equipment / zones). | **12** machines/zones |
| **testimonials.ts** | `trustedClients` array (`TestimonialClient`: name + logo) for partner logos. | **6** clients (4 real bank logos in `/public`, 2 placehold.co) |
| **siteConfig.ts** | Static site metadata: name, Arabic name, founded year, phone, email, address, WhatsApp helper + `getWhatsAppUrl()`, social links (mostly `#`), asset paths, YouTube video ID, Google Maps embed URL. | Config is populated but several fields marked SWAP for final client media/URLs |

---

## 6. Known issues or incomplete patterns

Observations only (not fixed in this report):

- **TrustedClients.tsx** exists and reads `testimonials.ts`, but **nothing imports it** — homepage does not show the client logo marquee.
- **siteConfig.assets.heroBackground** is defined in `siteConfig` / `SiteConfig` type but **Hero.tsx uses its own `HERO_SLIDES` constant** — dead config field for hero.
- **Navbar anchor mismatch:** `#usine` is on **VideoShowcase** (`id="usine"`), while the factory copy/carousel is **UsineShowcase** (no `id="usine"`). `#apropos` is a hidden empty anchor inside VideoShowcase, not a dedicated about section.
- **Navbar `#contact`** targets **Footer** (`id="contact"`), while footer also links to **`/contact`** (Coming Soon page) — two different “contact” destinations.
- **Dedicated routes vs homepage:** `/produits`, `/projets`, `/usine`, `/catalogue` are Coming Soon, but equivalent browsing is implemented via **homepage popups** and footer links still point to those routes.
- **ProductsCataloguePopup** alone has **partial EN i18n** (`I18N_PRODUCT_SLUGS` — 6 slugs); remaining products use French inline strings in `products.ts` even when locale is `en`. Projets/Usine popups use French data only (no parallel i18n hook).
- **VideoShowcase** mute button `aria-label` is hardcoded French, not `next-intl`.
- **Social links** in `siteConfig.social` are placeholder `"#"` URLs.
- **SWAP comments** throughout data and UI indicate placeholder assets/copy (loading logo treatment, configurator/projects backgrounds, maps embed, CMS replacement, etc.).
- **Legacy static site** (`legacy/` at repo root per git status) coexists with Next app; not part of `src/` tree above.
- **No `process.env` / `NEXT_PUBLIC_*` usage** in the codebase — nothing documents required env keys in code.

---

## 7. Environment / config

| File | Present? |
|------|----------|
| `.env.local` | **No** (not in project root at audit time) |
| `.env.local.example` | **No** |

Runtime configuration is **in-repo** (`siteConfig.ts`, i18n JSON, static `public/` assets). `next.config.ts` enables `placehold.co` for `next/image` remote patterns and wires **next-intl** via `./src/lib/i18n/request.ts`. No environment variable key names are referenced in source.

---

*End of report.*
