# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5 landing page for Hypernetics, a software development company. The site is built with React 19, TypeScript, and Tailwind CSS 4. Its visual identity ("Oficio" redesign, spec in `docs/superpowers/specs/2026-11-09-rediseno-oficio-design.md`) is liquid paint: a WebGL metaball shader with specular highlights fills the Hypernetics logo in the hero and surrounds it in a mid-page pause, while the rest of the page is sober and typographic. Content is in Spanish (es_MX).

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack)
- **Production build**: `npm run build` (uses Turbopack)
- **Start production server**: `npm start`
- **Linting**: `npm run lint` (ESLint with Next.js config)

The development server runs at http://localhost:3000.

## Architecture

### Project Structure

```
src/app/
├── home/              # Sections: Hero, Manifesto, Services (+ ServiceList), Process, Pause, Technologies, Portfolio (not rendered)
├── components/        # Header, Footer, Contact, ContactForm, AmbientBackground, InView
│   └── liquid/        # LiquidCanvas (WebGL metaballs), liquid.ts (shader + palette), HeroLogoLiquid, LogoEmerge, logoPaths
├── assets/            # Local SVG icons
├── globals.css        # CSS variables + all custom classes (inside @layer components)
├── layout.tsx         # Root layout, metadata, html.js flag script
└── page.tsx           # Main page assembling all sections
```

### Design System

The site uses a custom color palette defined in CSS variables in `globals.css`:
- `--primaryYellow: #d2d2af` (headings)
- `--primaryGreen: #a7cf9e` (accents, CTAs)
- `--background: #13151e` (main background)
- `--primaryBlue: #191c29` and `--secondaryBlue: #383e58` (UI elements)
- `--accentMagenta: #f06fae`, `--accentGold: #e8b64c` (brand gradient), `--restGray: #646a80` (dim resting state, 3.4:1 on background)

Fonts: Space Grotesk (`--font-display`, headings) and Open Sans (body). No emojis anywhere; SVG icons only.

### Key Technical Details

- **Liquid**: `components/liquid/LiquidCanvas.tsx` renders the brand liquid with raw WebGL (no libraries). It pauses off-screen and on hidden tabs, draws a single still frame under `prefers-reduced-motion`, and renders nothing if WebGL fails so the CSS fallback underneath shows.
- **Animations**: CSS-first. `InView` (shared IntersectionObserver) sets `data-inview` once; animations hang off `.js [data-inview] ...`. The `html.js` class is added by an inline script in `layout.tsx`, so without JS everything is visible. The manifesto uses CSS scroll-driven animations (`animation-timeline`) behind `@supports`.
- **Tailwind 4**: custom classes must live inside `@layer components`, or they override Tailwind utilities.
- **Images**: Static assets in `public/` and section-specific assets in `src/app/assets/`. Images are optimized using Next.js Image component.
- **Path Alias**: `@/*` maps to `./src/*` (configured in `tsconfig.json`).
- **Tailwind**: Using Tailwind CSS 4 via PostCSS plugin.
- **TypeScript**: Strict mode enabled with ES2017 target.

### Page Structure

The main page (`page.tsx`) is a single-page layout composed of these sections in order:
1. Header (navigation)
2. Hero (`#top`): logo filled with liquid paint, split h1
3. Manifesto (`#about`)
4. Services (`#services`): expandable rows
5. Process (`#process`): sequential bars
6. Pause: logo emerging from liquid, "Trabajemos juntos"
7. Technologies (`#technologies`): typographic wall
8. Contact (`#contact`): form posts to N8N (logic untouched by design work)
9. Footer

### Content Rules

- Never mention how many people are on the team; only "10+ años de experiencia de cada persona".
- No client names or logos, and no names of companies where the team worked.

## Development Notes

- Section components in `home/` are server components; client components are only `InView`, `ServiceList`, `ContactForm`, `Header` and the `liquid/` pieces.
- The site uses Next.js App Router with file-based routing.
- Metadata and SEO configuration is centralized in `layout.tsx`.
- Deployment target is Vercel (referenced in metadata URLs).
