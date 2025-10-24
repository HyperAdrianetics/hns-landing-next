# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5 landing page for Hypernetics, a software development company. The site is built with React 19, TypeScript, and Tailwind CSS 4, featuring an animated particle background and glassmorphism design aesthetic. Content is in Spanish (es_MX).

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
├── home/              # Section components (Hero, About, Services, Process, Technologies, Portfolio)
├── components/        # Reusable UI components (Header, Footer, Contact, ContactForm, ParticlesBackground, Icon)
├── assets/            # Local images (icons/, technologies/, backgrounds)
├── globals.css        # Global styles with CSS variables
├── layout.tsx         # Root layout with ParticlesBackground and metadata
└── page.tsx           # Main page assembling all sections
```

### Design System

The site uses a custom color palette defined in CSS variables in `globals.css`:
- `--primaryYellow: #d2d2af` (headings)
- `--primaryGreen: #a7cf9e` (accents, CTAs)
- `--background: #13151e` (main background)
- `--primaryBlue: #191c29` and `--secondaryBlue: #383e58` (UI elements)

Glassmorphism effects are implemented throughout using backdrop-blur and semi-transparent backgrounds.

### Key Technical Details

- **Particles**: The animated background uses `react-tsparticles` with configuration in `src/particlesjs-config.json`. The `ParticlesBackground` component is a client component that wraps the entire app via `layout.tsx`.
- **Font**: Open Sans (Google Font) loaded with weights 300, 400, 600, 700.
- **Images**: Static assets in `public/` and section-specific assets in `src/app/assets/`. Images are optimized using Next.js Image component.
- **Path Alias**: `@/*` maps to `./src/*` (configured in `tsconfig.json`).
- **Tailwind**: Using Tailwind CSS 4 via PostCSS plugin.
- **TypeScript**: Strict mode enabled with ES2017 target.

### Page Structure

The main page (`page.tsx`) is a single-page layout composed of these sections in order:
1. Header (navigation)
2. Hero
3. About
4. Services
5. Process
6. Technologies
7. Contact
8. Footer

### Asset Organization

- **Public directory**: Main logos, favicon, OG image, large backgrounds
- **App assets**: Section-specific images, icons (SVG), technology logos
- Background images are referenced in CSS classes (`.bg-color-explosion`, `.bg-trabajemos`, `.bg-contacto`) with `background-attachment: fixed` on desktop for parallax effect.

## Development Notes

- All section components in `home/` are server components by default.
- Only `ParticlesBackground` requires `"use client"` directive for interactive animations.
- The site uses Next.js App Router with file-based routing.
- Metadata and SEO configuration is centralized in `layout.tsx`.
- Deployment target is Vercel (referenced in metadata URLs).
