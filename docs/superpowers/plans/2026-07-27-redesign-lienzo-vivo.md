# Rediseño "Lienzo vivo" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Renovar el look & feel completo de la landing de Hypernetics alrededor de `public/color-explosion.png`, integrando el efecto Liquid de Canvas UI en el Hero.

**Architecture:** Single-page Next.js 15 App Router. El rediseño se aplica sección por sección sobre los componentes existentes (`src/app/home/`, `src/app/components/`), con un sistema de diseño nuevo en `globals.css` (variables + clases utilitarias), fuente display vía `next/font`, y el componente Liquid vendorizado desde el registro shadcn de canvasui.dev. Cada tarea deja el sitio compilando y visualmente coherente.

**Tech Stack:** Next.js 15.5 (Turbopack), React 19, TypeScript strict, Tailwind CSS 4, Canvas UI Liquid (WebGL2, vendorizado, cero deps npm).

**Spec:** `docs/superpowers/specs/2026-07-27-redesign-lienzo-vivo-design.md` — léelo antes de ejecutar cualquier tarea.

## Global Constraints

- **Cero emojis** en cualquier código o UI. Iconografía: solo SVGs existentes en `src/app/assets/icons/` y `public/`.
- Rama de trabajo: `feature/redesign-lienzo-vivo`. NUNCA commitear a `main`.
- Paleta base intacta: `--primaryYellow: #d2d2af`, `--primaryGreen: #a7cf9e`, `--background: #13151e`, `--primaryBlue: #191c29`, `--secondaryBlue: #383e58`. Acentos nuevos exactos: `--accentMagenta: #f06fae`, `--accentGold: #e8b64c`.
- Los acentos magenta/dorado se usan SOLO en: degradados de texto (una palabra por titular), hairlines, glows/hovers y CTA primario. Verde = links y acciones; amarillo = titulares.
- NO tocar: lógica de `ContactForm.tsx` (handlers, fetch a N8N, estado), scripts de Google Analytics, `metadata` en `layout.tsx`, contenido de `/aviso-de-privacidad` y `/terminos-y-condiciones`, `robots.txt`, `sitemap.xml`.
- Textos en español tal como están en los componentes actuales, salvo las correcciones explícitas listadas en las tareas (typos de Services, párrafo intro de Process, año de copyright).
- No hay framework de tests en el proyecto y NO se agrega (YAGNI). El ciclo de verificación por tarea es: `npm run lint` + `npm run build` + verificación visual en `npm run dev` (http://localhost:3000).
- Todos los componentes de sección siguen siendo server components; solo `Header`, `ContactForm`, `HeroLiquid` y `canvasui/Liquid` son client components.
- El sitio debe verse íntegro tras CADA commit (no dejar secciones rotas entre tareas).

## Mapa de archivos

| Archivo | Acción | Responsabilidad |
|---|---|---|
| `src/app/globals.css` | Modificar | Variables, utilidades del sistema de diseño, fondo ambiental |
| `src/app/layout.tsx` | Modificar | Fuente Space Grotesk, AmbientBackground |
| `src/app/components/AmbientBackground.tsx` | Crear | Manchas de pintura CSS (server) |
| `src/app/components/canvasui/Liquid.tsx` | Crear (vendorizar) | Efecto WebGL de Canvas UI — NO editar a mano |
| `src/app/components/HeroLiquid.tsx` | Crear | Guardas de montaje de Liquid (client) |
| `src/app/home/stats.ts` | Crear | Datos de stats compartidos Hero/About |
| `src/app/home/Hero.tsx` | Reescribir | Hero editorial con imagen protagonista |
| `src/app/components/Header.tsx` | Reescribir | Píldora glass flotante |
| `src/app/home/About.tsx` | Reescribir | Editorial + stats integrados + tarjetas glass |
| `src/app/home/Services.tsx` | Reescribir | Bento glass + typos corregidos |
| `src/app/home/Process.tsx` | Reescribir | Línea de pintura + banner glass |
| `src/app/home/Technologies.tsx` | Renombrar desde `Techonolgies.tsx` + reescribir | Celdas glass |
| `src/app/components/Contact.tsx` | Reescribir | Explosión desvanecida + layout |
| `src/app/components/ContactForm.tsx` | Modificar (SOLO classNames/JSX de presentación) | Formulario glass |
| `src/app/components/Footer.tsx` | Reescribir | Footer compacto |
| `src/app/components/ParticlesBackground.tsx`, `src/particlesjs-config.json`, `public/particle.png`, `public/particle-yellow.png`, `src/app/assets/bg-trabajemos.jpg`, `src/app/assets/bg-contacto.png` | Eliminar | Restos del diseño anterior |

---

### Task 1: Fundaciones del sistema de diseño

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: variables CSS `--accentMagenta`, `--accentGold`, `--gradBrand`, `--font-display`; clases `.font-display`, `.text-gradient-brand`, `.section-label`, `.glass-card`, `.glass-card--hover`, `.hairline`, `.hairline--brand`, `.hairline--green`, `.hairline--gold`, `.btn-primary`. Todas las tareas posteriores dependen de estas clases con estos nombres exactos.

- [ ] **Step 1: Agregar Space Grotesk en layout.tsx**

En `src/app/layout.tsx`, cambiar el import de fuentes y la constante (líneas 2 y 7-10):

```tsx
import { Open_Sans, Space_Grotesk } from "next/font/google";
```

```tsx
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
});
```

Y en el `<body>` (línea 59):

```tsx
<body className={`${openSans.className} ${spaceGrotesk.variable} antialiased`}>
```

- [ ] **Step 2: Agregar variables y utilidades a globals.css**

En `src/app/globals.css`, dentro de `:root` agregar (sin tocar las 5 variables existentes):

```css
  --accentMagenta: #f06fae;
  --accentGold: #e8b64c;
  --gradBrand: linear-gradient(90deg, var(--accentMagenta), var(--accentGold));
```

Al final del archivo agregar (NO borrar todavía la regla `h1 { ... }` existente ni las clases `.bg-*` — se eliminan en tareas posteriores):

```css
h1,
h2,
h3,
h4 {
  font-family: var(--font-display), sans-serif;
}

.font-display {
  font-family: var(--font-display), sans-serif;
}

.text-gradient-brand {
  background: var(--gradBrand);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-label {
  font-family: var(--font-display), sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--primaryGreen);
}

.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card--hover:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(240, 111, 174, 0.15);
}

.hairline {
  position: absolute;
  top: 0;
  left: 1.125rem;
  right: 1.125rem;
  height: 2px;
  border-radius: 2px;
}

.hairline--brand {
  background: var(--gradBrand);
}

.hairline--green {
  background: linear-gradient(90deg, var(--primaryGreen), transparent);
}

.hairline--gold {
  background: linear-gradient(90deg, var(--accentGold), transparent);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--gradBrand);
  color: var(--background);
  font-family: var(--font-display), sans-serif;
  font-weight: 600;
  border-radius: 9999px;
  padding: 0.75rem 1.75rem;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.btn-primary:hover {
  box-shadow: 0 0 24px rgba(240, 111, 174, 0.35);
  transform: translateY(-1px);
}

@media (prefers-reduced-motion: reduce) {
  .glass-card,
  .btn-primary {
    transition: none;
  }

  .glass-card--hover:hover,
  .btn-primary:hover {
    transform: none;
  }
}
```

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: ambos en verde. El sitio se ve igual que antes salvo los titulares, que ahora usan Space Grotesk.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: sistema de diseño Lienzo vivo (acentos, Space Grotesk, glass 2.0)"
```

---

### Task 2: AmbientBackground reemplaza tsparticles

**Files:**
- Create: `src/app/components/AmbientBackground.tsx`
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Delete: `src/app/components/ParticlesBackground.tsx`, `src/particlesjs-config.json`, `public/particle.png`, `public/particle-yellow.png`

**Interfaces:**
- Consumes: nada.
- Produces: `AmbientBackground` (server component, sin props), montado en `layout.tsx`. Clases CSS `.ambient-bg`, `.ambient-blob` y keyframes `breathe` (Task 4 reutiliza `breathe` para el glow del hero).

- [ ] **Step 1: Crear AmbientBackground.tsx**

```tsx
import React from "react";

const AmbientBackground = () => {
  return (
    <div aria-hidden className="ambient-bg">
      <div className="ambient-blob ambient-blob--magenta" />
      <div className="ambient-blob ambient-blob--gold" />
      <div className="ambient-blob ambient-blob--green" />
    </div>
  );
};

export default AmbientBackground;
```

- [ ] **Step 2: Agregar CSS del fondo ambiental**

Al final de `src/app/globals.css`:

```css
.ambient-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.ambient-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: breathe 10s ease-in-out infinite;
}

.ambient-blob--magenta {
  top: 15%;
  left: -10%;
  width: 45vw;
  height: 45vw;
  background: radial-gradient(
    closest-side,
    rgba(240, 111, 174, 0.09),
    transparent 70%
  );
}

.ambient-blob--gold {
  top: 45%;
  right: -12%;
  width: 42vw;
  height: 42vw;
  background: radial-gradient(
    closest-side,
    rgba(232, 182, 76, 0.08),
    transparent 70%
  );
  animation-duration: 12s;
  animation-delay: 3s;
}

.ambient-blob--green {
  bottom: -10%;
  left: 30%;
  width: 38vw;
  height: 38vw;
  background: radial-gradient(
    closest-side,
    rgba(167, 207, 158, 0.07),
    transparent 70%
  );
  animation-duration: 13s;
  animation-delay: 5s;
}

@keyframes breathe {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient-blob {
    animation: none;
  }
}
```

- [ ] **Step 3: Reemplazar en layout.tsx y borrar restos**

En `src/app/layout.tsx`: cambiar el import `ParticlesBackground` por `AmbientBackground` (`import AmbientBackground from "./components/AmbientBackground";`) y `<ParticlesBackground />` por `<AmbientBackground />`.

```bash
git rm src/app/components/ParticlesBackground.tsx src/particlesjs-config.json public/particle.png public/particle-yellow.png
npm uninstall react-tsparticles tsparticles
```

- [ ] **Step 4: Verificar**

Run: `grep -rn "tsparticles\|ParticlesBackground\|particlesjs" src/ package.json` — Expected: sin resultados.
Run: `npm run lint && npm run build` — Expected: verde.
Visual (`npm run dev`): fondo oscuro con 3 manchas de color difusas respirando lentamente; ya no hay partículas.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: fondo ambiental de pintura CSS en lugar de tsparticles"
```

---

### Task 3: Vendorizar Liquid de Canvas UI + wrapper HeroLiquid

**Files:**
- Create: `src/app/components/canvasui/Liquid.tsx` (generado desde el registro, NO escribirlo a mano)
- Create: `src/app/components/HeroLiquid.tsx`

**Interfaces:**
- Consumes: registro shadcn `https://canvasui.dev/r/liquid-react.json` (verificado: existe, un solo archivo, `dependencies: []`).
- Produces: `HeroLiquid` — client component `({ children }: { children: ReactNode })` que envuelve contenido; Task 4 lo importa desde `../components/HeroLiquid`. El componente vendorizado exporta `default Liquid` con props `{ children, className?, style?, ...LiquidOptions }`.

- [ ] **Step 1: Descargar y extraer el componente Liquid**

```bash
curl -s https://canvasui.dev/r/liquid-react.json -o /tmp/liquid-react.json
node -e "
const d = require('/tmp/liquid-react.json');
const fs = require('fs');
if (d.files.length !== 1 || d.dependencies.length !== 0) { throw new Error('El registro cambió: revisar manualmente'); }
fs.mkdirSync('src/app/components/canvasui', { recursive: true });
fs.writeFileSync('src/app/components/canvasui/Liquid.tsx', d.files[0].content);
console.log('OK', d.files[0].path);
"
```

Notas: el archivo es un client component (`"use client"` incluido) de ~1000 líneas, WebGL2 puro. Si `createLiquid` no obtiene contexto WebGL2 devuelve `null` y el componente renderiza los children sin efecto — la degradación ya viene incluida. NO editarlo, con una excepción: si `npm run lint` reporta errores dentro de este archivo, agregar `/* eslint-disable */` como primera línea (archivo vendorizado).

- [ ] **Step 2: Crear HeroLiquid.tsx (guardas de montaje)**

```tsx
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Liquid from "./canvasui/Liquid";

// Monta el efecto solo donde aporta: puntero fino (mouse) y sin
// preferencia de movimiento reducido. En cualquier otro caso los
// children se renderizan tal cual.
const HeroLiquid = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return <Liquid>{children}</Liquid>;
};

export default HeroLiquid;
```

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build`
Expected: verde. (`HeroLiquid` aún no se usa; Next compila ambos archivos.)

- [ ] **Step 4: Commit**

```bash
git add src/app/components/canvasui/Liquid.tsx src/app/components/HeroLiquid.tsx
git commit -m "feat: vendorizar Liquid de Canvas UI con guardas de montaje"
```

---

### Task 4: Hero editorial "Lienzo vivo"

**Files:**
- Create: `src/app/home/stats.ts`
- Rewrite: `src/app/home/Hero.tsx`
- Modify: `src/app/globals.css` (quitar `.bg-color-explosion`, agregar `.hero-glow`)

**Interfaces:**
- Consumes: `HeroLiquid` (Task 3), clases del sistema (Task 1), keyframes `breathe` (Task 2).
- Produces: `stats` y `statAccentClass` exportados desde `src/app/home/stats.ts` — Task 6 (About) los importa con estos nombres exactos.

- [ ] **Step 1: Crear stats.ts**

```ts
export const stats = [
  { value: "20+", label: "Proyectos completados", accent: "brand" },
  { value: "98%", label: "Satisfacción del cliente", accent: "green" },
  { value: "24/7", label: "Soporte sostenible", accent: "yellow" },
] as const;

export type StatAccent = (typeof stats)[number]["accent"];

export const statAccentClass: Record<StatAccent, string> = {
  brand: "text-gradient-brand",
  green: "text-[var(--primaryGreen)]",
  yellow: "text-[var(--primaryYellow)]",
};
```

- [ ] **Step 2: Reescribir Hero.tsx**

```tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";
import arrowRight from "../assets/icons/arrow-right.svg";
import colorExplosion from "../../../public/color-explosion.png";
import HeroLiquid from "../components/HeroLiquid";
import { stats, statAccentClass } from "./stats";

const Hero = () => {
  return (
    <HeroLiquid>
      <section
        id="top"
        className="relative min-h-dvh overflow-hidden flex items-center"
      >
        <div className="container mx-auto grid lg:grid-cols-[52%_48%] items-center gap-10 px-5 pt-32 pb-16">
          <div>
            <p className="section-label">Desarrollo de software a la medida</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] font-bold text-[var(--primaryYellow)] mt-4">
              Transformamos tus{" "}
              <span className="text-gradient-brand">ideas</span> en soluciones
              digitales
            </h1>
            <p className="text-lg font-light text-[#b9bdc9] mt-5 max-w-[46ch]">
              Desarrollamos software a la medida que impulsa tu negocio hacia
              el futuro. Tecnología de vanguardia, diseño excepcional y
              resultados garantizados.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <Link href="#services" className="btn-primary">
                Descubre lo que hacemos
              </Link>
              <Link
                href="#process"
                className="font-display font-semibold text-[var(--primaryGreen)] flex items-center gap-2"
              >
                Nuestro proceso
                <Image src={arrowRight} alt="" />
              </Link>
            </div>
            <div className="flex gap-10 mt-12">
              {stats.map((stat) => (
                <div key={stat.value}>
                  <p
                    className={`font-display text-3xl font-bold ${
                      statAccentClass[stat.accent]
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#8b91a3] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[320px] lg:h-[480px]">
            <div aria-hidden className="hero-glow" />
            <Image
              src={colorExplosion}
              alt="Explosión de pintura multicolor, esencia visual de Hypernetics"
              priority
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-contain scale-125 drop-shadow-[0_0_50px_rgba(240,111,174,0.22)]"
            />
          </div>
        </div>
      </section>
    </HeroLiquid>
  );
};

export default Hero;
```

- [ ] **Step 3: CSS — quitar `.bg-color-explosion`, agregar `.hero-glow`**

En `src/app/globals.css`, eliminar el bloque `.bg-color-explosion { ... }` completo y agregar al final:

```css
.hero-glow {
  position: absolute;
  inset: 10%;
  background: radial-gradient(
    closest-side,
    rgba(240, 111, 174, 0.16),
    transparent 72%
  );
  filter: blur(40px);
  animation: breathe 8s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero-glow {
    animation: none;
  }
}
```

- [ ] **Step 4: Verificar**

Run: `grep -rn "bg-color-explosion" src/` — Expected: sin resultados.
Run: `npm run lint && npm run build` — Expected: verde.
Visual en desktop: titular editorial a la izquierda con "ideas" en degradado, imagen flotando a la derecha con glow, stats abajo; al mover el mouse sobre el hero se ve el rastro fluido de Liquid distorsionando el contenido. En móvil (DevTools responsive): columna única, sin Liquid (pointer coarse). El CTA y los links siguen siendo clicables con el efecto activo.

- [ ] **Step 5: Commit**

```bash
git add src/app/home/Hero.tsx src/app/home/stats.ts src/app/globals.css
git commit -m "feat: hero editorial Lienzo vivo con Liquid y explosión protagonista"
```

---

### Task 5: Header — píldora glass flotante

**Files:**
- Rewrite: `src/app/components/Header.tsx`

**Interfaces:**
- Consumes: `.btn-primary`, `.glass-card` (Task 1).
- Produces: nada que consuman otras tareas.

- [ ] **Step 1: Reescribir Header.tsx**

Mantener `"use client"` y el estado del menú móvil. Sustituir el contenido por:

```tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import logoHypernetics from "../../../public/hypernetics-logo.svg";
import logoHyperneticsH from "../../../public/hypernetics-h.svg";

const navLinks = [
  { name: "Nosotros", href: "#about" },
  { name: "Servicios", href: "#services" },
  { name: "Proceso", href: "#process" },
  { name: "Tecnologías", href: "#technologies" },
  { name: "Contacto", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="relative flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(19,21,30,0.65)] px-5 py-2.5 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] lg:w-auto lg:justify-start">
        <a href="#top" className="flex shrink-0 items-center">
          <Image
            src={logoHyperneticsH}
            alt="Logo Hypernetics"
            className="hidden h-8 w-auto lg:block"
            priority
          />
          <Image
            src={logoHypernetics}
            alt="Logo Hypernetics"
            className="h-8 w-auto lg:hidden"
            priority
          />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm font-semibold text-[var(--primaryYellow)] transition-colors hover:text-[var(--primaryGreen)]"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="btn-primary hidden text-sm !px-5 !py-2 lg:inline-flex"
        >
          Comenzar Proyecto
        </a>

        <button
          onClick={toggleMenu}
          type="button"
          className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primaryGreen)] lg:hidden"
          aria-controls="navbar-dropdown"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Abrir menú principal</span>
          <svg
            className="h-5 w-5 text-[var(--primaryYellow)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M2 2L15 12M15 2L2 12" : "M1 1h15M1 7h15M1 13h15"}
            />
          </svg>
        </button>

        {isOpen && (
          <div
            id="navbar-dropdown"
            className="glass-card absolute left-0 right-0 top-[calc(100%+0.5rem)] !bg-[rgba(19,21,30,0.92)] p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-3 py-2 font-semibold text-[var(--primaryYellow)] transition-colors hover:text-[var(--primaryGreen)]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="btn-primary w-full"
                >
                  Comenzar Proyecto
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
```

- [ ] **Step 2: Verificar**

Run: `npm run lint && npm run build` — Expected: verde.
Visual: píldora glass centrada arriba, CTA degradado a la derecha (desktop). En móvil: píldora con logo + hamburguesa; al abrir, panel glass desplegable; los links cierran el menú y navegan a su sección.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/Header.tsx
git commit -m "feat: header como píldora glass flotante"
```

---

### Task 6: About — editorial con stats integrados

**Files:**
- Rewrite: `src/app/home/About.tsx`

**Interfaces:**
- Consumes: `stats`, `statAccentClass` desde `./stats` (Task 4); clases del sistema (Task 1).

- [ ] **Step 1: Reescribir About.tsx**

```tsx
import React from "react";
import Image from "next/image";
import vector from "../assets/icons/vector.svg";
import quality from "../assets/icons/quality.svg";
import handshake from "../assets/icons/handshake.svg";
import rocket from "../assets/icons/rocket.svg";
import { stats, statAccentClass } from "./stats";

const cards = [
  {
    title: "Enfoque a resultados",
    subtitle: "Código con propósito. Resultados para tu negocio.",
    icon: vector,
    hairline: "hairline--brand",
    highlight: false,
  },
  {
    title: "Calidad garantizada",
    subtitle: "Software robusto que perdura.",
    icon: quality,
    hairline: "hairline--green",
    highlight: true,
  },
  {
    title: "Colaboración transparente",
    subtitle: "Tu equipo extendido.",
    icon: handshake,
    hairline: "hairline--gold",
    highlight: false,
  },
  {
    title: "Innovación constante",
    subtitle: "Innovación que te diferencia.",
    icon: rocket,
    hairline: "hairline--brand",
    highlight: false,
  },
];

const About = () => {
  return (
    <section id="about" className="container mx-auto px-5 py-24">
      <p className="section-label">Nosotros</p>
      <div className="mt-4 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-white">
            Somos <span className="text-[var(--primaryGreen)]">Hypernetics</span>
          </h2>
          <p className="mt-4 text-xl font-light text-[#b9bdc9]">
            Somos un equipo de desarrolladores apasionados. Combinamos
            experiencia técnica y visión estratégica para crear software que
            transforma tu negocio.
          </p>
        </div>
        <div className="flex gap-10 lg:justify-end">
          {stats.map((stat) => (
            <div key={stat.value} className="lg:text-right">
              <p
                className={`font-display text-4xl font-bold ${
                  statAccentClass[stat.accent]
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[#8b91a3]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.title}
            className={`glass-card glass-card--hover flex flex-col gap-3 p-8 ${
              card.highlight
                ? "!border-[rgba(167,207,158,0.35)] !bg-[rgba(167,207,158,0.10)]"
                : ""
            }`}
          >
            <div className={`hairline ${card.hairline}`} />
            <Image src={card.icon} alt="" width={30} />
            <h3 className="font-bold text-white">{card.title}</h3>
            <p className="font-light text-[#b9bdc9]">{card.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default About;
```

Notas: desaparecen los 3 pills gigantes (los stats ahora viven junto al encabezado, mismos datos que el Hero vía `stats.ts`). Los subtítulos de tarjetas se normalizan con mayúscula y punto final. `h1` pasa a `h2` (el único `h1` de la página es el del Hero).

- [ ] **Step 2: Verificar**

Run: `npm run lint && npm run build` — Expected: verde.
Visual: encabezado con stats a la derecha (desktop), 4 tarjetas glass con hairline de color, la de "Calidad garantizada" con tinte verde; hover eleva la tarjeta.

- [ ] **Step 3: Commit**

```bash
git add src/app/home/About.tsx
git commit -m "feat: sección Nosotros editorial con stats integrados y tarjetas glass"
```

---

### Task 7: Services — bento glass + correcciones

**Files:**
- Rewrite: `src/app/home/Services.tsx`

**Interfaces:**
- Consumes: clases del sistema (Task 1).

- [ ] **Step 1: Reescribir Services.tsx**

Mismo bento grid y textos, con estas correcciones obligatorias: "React Nativel" → "React Native", "Flutler" → "Flutter", "integración APis" → "Integración de APIs", "Consultoria Técnica" → "Consultoría Técnica".

```tsx
import React from "react";

const services = [
  {
    title: "Desarrollo de Software Personalizado",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--brand",
    span: "md:col-span-2 lg:col-span-2",
    description:
      "Creamos soluciones a medida que se adaptan a tu negocio, integrando tecnología de vanguardia, diseño centrado en el usuario y resultados medibles.",
    items: [],
  },
  {
    title: "Aplicaciones Móviles",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--green",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Apps nativas e hibridas para iOS y Android que conectan con tus usuarios.",
    items: ["React Native", "Flutter", "Diseño UX/UI", "Integración de APIs"],
  },
  {
    title: "Desarrollo Web",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--green",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Desarrollamos sitios y aplicaciones web responsivas, con alto rendimiento y visibilidad para conectar con tu audiencia y potenciar tu marca en línea.",
    items: [],
  },
  {
    title: "Arquitectura de Datos",
    titleColor: "text-[var(--primaryYellow)]",
    hairline: "hairline--gold",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Diseñamos infraestructuras de datos sólidas: almacenamiento, procesamiento y análisis que te permiten convertir información en decisiones estratégicas.",
    items: [],
  },
  {
    title: "Soluciones Cloud",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--green",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Migramos y optimizamos tus servicios en la nube para escalar con seguridad, agilidad y eficiencia, brindando flexibilidad y reducción de costos.",
    items: [],
  },
  {
    title: "Consultoría Técnica",
    titleColor: "text-[var(--primaryYellow)]",
    hairline: "hairline--brand",
    span: "md:col-span-2 lg:col-span-2",
    description:
      "Asesoramos en tecnología y procesos: revisión de arquitectura, selección de herramientas, adopción de buenas prácticas y roadmap de innovación.",
    items: [],
  },
];

const Services = () => {
  return (
    <section id="services" className="container mx-auto px-5 py-24">
      <p className="section-label">Servicios</p>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-4xl font-bold text-white">
          Nuestros <span className="text-[var(--primaryGreen)]">Servicios</span>
        </h2>
        <p className="max-w-xl text-xl font-light text-[#b9bdc9]">
          Ofrecemos una gama completa de servicios de desarrollo de software,
          desde la conceptualización hasta el despliegue y mantenimiento.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.title}
            className={`glass-card glass-card--hover flex w-full flex-col items-start p-8 lg:min-h-[18rem] ${service.span}`}
          >
            <div className={`hairline ${service.hairline}`} />
            <h3 className={`text-2xl font-bold ${service.titleColor}`}>
              {service.title}
            </h3>
            <p className="my-4 font-light text-[#b9bdc9]">
              {service.description}
            </p>
            {service.items.length > 0 && (
              <ul className="list-inside list-disc font-light text-[#b9bdc9]">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
```

- [ ] **Step 2: Verificar**

Run: `npm run lint && npm run build` — Expected: verde.
Run: `grep -n "Nativel\|Flutler\|APis\|Consultoria" src/app/home/Services.tsx` — Expected: sin resultados.
Visual: bento con tarjetas glass, hairlines degradados en las dos grandes, hover con glow.

- [ ] **Step 3: Commit**

```bash
git add src/app/home/Services.tsx
git commit -m "feat: servicios en bento glass con hairlines y typos corregidos"
```

---

### Task 8: Process — línea de pintura + banner glass

**Files:**
- Rewrite: `src/app/home/Process.tsx`
- Modify: `src/app/globals.css` (quitar `.bg-trabajemos` y su media query)
- Delete: `src/app/assets/bg-trabajemos.jpg`

**Interfaces:**
- Consumes: clases del sistema (Task 1).

- [ ] **Step 1: Reescribir Process.tsx**

El párrafo introductorio (hoy duplicado de Services) se sustituye por el texto exacto: "Un método claro que lleva tu proyecto de la idea al lanzamiento, con acompañamiento en cada etapa."

```tsx
import React from "react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Análisis",
    description: "Entendemos tus necesidades y objetivos",
    nodeColor: "bg-[var(--accentMagenta)]",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Creamos la arquitectura y prototipo",
    nodeColor: "bg-[var(--accentGold)]",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construimos la solución con calidad",
    nodeColor: "bg-[var(--primaryGreen)]",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Desplegamos y brindamos soporte",
    nodeColor: "bg-[var(--primaryYellow)]",
  },
];

const Process = () => {
  return (
    <section id="process" className="container mx-auto px-5 py-24">
      <p className="section-label">Proceso</p>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-4xl font-bold text-white">
          Nuestro <span className="text-[var(--primaryGreen)]">Proceso</span>
        </h2>
        <p className="max-w-xl text-xl font-light text-[#b9bdc9]">
          Un método claro que lleva tu proyecto de la idea al lanzamiento, con
          acompañamiento en cada etapa.
        </p>
      </div>

      <div className="relative mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
        <div
          aria-hidden
          className="absolute left-[12%] right-[12%] top-5 hidden h-[2px] rounded bg-[linear-gradient(90deg,var(--accentMagenta),var(--accentGold),var(--primaryGreen),var(--primaryYellow))] opacity-50 lg:block"
        />
        {steps.map((step) => (
          <article
            key={step.number}
            className="relative flex flex-col items-center gap-3 text-center"
          >
            <span
              className={`font-display flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[var(--background)] ${step.nodeColor}`}
            >
              {step.number}
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              {step.title}
            </h3>
            <p className="max-w-[26ch] font-light text-[#b9bdc9]">
              {step.description}
            </p>
          </article>
        ))}
      </div>

      <div className="glass-card mt-20 flex flex-col items-center gap-8 overflow-hidden !rounded-3xl p-10 lg:flex-row lg:px-16">
        <div
          aria-hidden
          className="absolute -left-[5%] -top-[40%] h-[180%] w-[40%] bg-[radial-gradient(closest-side,rgba(240,111,174,0.18),transparent_70%)] blur-2xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-[50%] right-[20%] h-[170%] w-[35%] bg-[radial-gradient(closest-side,rgba(232,182,76,0.14),transparent_70%)] blur-2xl"
        />
        <div className="relative flex flex-col items-center gap-3 lg:items-start">
          <h3 className="font-display text-4xl font-bold text-[var(--primaryYellow)]">
            Trabajemos juntos
          </h3>
          <p className="text-xl font-bold">
            Convierte tu visión en una{" "}
            <span className="text-[var(--primaryGreen)]">
              experiencia digital.
            </span>
          </p>
        </div>
        <Link
          href="#contact"
          className="btn-primary relative w-full min-w-[200px] lg:ml-auto lg:w-auto"
        >
          Contáctanos
        </Link>
      </div>
    </section>
  );
};

export default Process;
```

Nota: el CTA del banner era un `<button>` sin acción; ahora es un `<Link>` a `#contact`.

- [ ] **Step 2: Quitar `.bg-trabajemos` y borrar el asset**

En `src/app/globals.css`: eliminar el bloque `.bg-trabajemos { ... }` y su regla dentro del `@media (min-width: 1024px)` (dejar la de `.bg-contacto`, que se elimina en Task 10).

```bash
grep -rn "bg-trabajemos" src/   # Expected: sin resultados
git rm src/app/assets/bg-trabajemos.jpg
```

- [ ] **Step 3: Verificar**

Run: `npm run lint && npm run build` — Expected: verde.
Visual: 4 pasos con nodos de color unidos por la línea degradada (desktop); banner glass con manchas internas y CTA degradado que navega a Contacto.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: proceso con línea de pintura y banner Trabajemos juntos en glass"
```

---

### Task 9: Technologies — celdas glass (+ rename del archivo)

**Files:**
- Rename: `src/app/home/Techonolgies.tsx` → `src/app/home/Technologies.tsx` (y reescribir)
- Modify: `src/app/page.tsx` (import)

**Interfaces:**
- Consumes: clases del sistema (Task 1).

- [ ] **Step 1: Renombrar y reescribir**

```bash
git mv src/app/home/Techonolgies.tsx src/app/home/Technologies.tsx
```

Contenido nuevo de `src/app/home/Technologies.tsx`:

```tsx
import React from "react";
import Image from "next/image";
import react from "../assets/technologies/react.svg";
import nodeJs from "../assets/technologies/node-js.svg";
import python from "../assets/technologies/python.svg";
import typescript from "../assets/technologies/typescript.svg";
import docker from "../assets/technologies/docker.svg";
import postgresSql from "../assets/technologies/postgresql.svg";
import mongoDb from "../assets/technologies/mongodb.svg";
import nextJs from "../assets/technologies/nextjs.svg";
import reactNative from "../assets/technologies/reactnative.svg";
import aws from "../assets/technologies/aws.svg";

const techItems = [
  { src: react, alt: "React" },
  { src: nodeJs, alt: "Node.js" },
  { src: python, alt: "Python" },
  { src: typescript, alt: "TypeScript" },
  { src: aws, alt: "AWS" },
  { src: docker, alt: "Docker" },
  { src: postgresSql, alt: "PostgreSQL" },
  { src: mongoDb, alt: "MongoDB" },
  { src: nextJs, alt: "Next.js" },
  { src: reactNative, alt: "React Native" },
];

const Technologies = () => {
  return (
    <section id="technologies" className="container mx-auto px-5 py-24">
      <p className="section-label">Stack</p>
      <h2 className="mt-4 text-4xl font-bold text-[var(--primaryYellow)]">
        Tecnologías{" "}
        <span className="text-[var(--primaryGreen)]">que dominamos</span>
      </h2>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {techItems.map((item) => (
          <article
            key={item.alt}
            className="glass-card glass-card--hover flex h-[140px] items-center justify-center"
          >
            <Image src={item.src} alt={item.alt} height={60} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
```

- [ ] **Step 2: Actualizar el import en page.tsx**

En `src/app/page.tsx` línea 6:

```tsx
import Technologies from "./home/Technologies";
```

- [ ] **Step 3: Verificar**

Run: `grep -rn "Techonolgies" src/` — Expected: sin resultados.
Run: `npm run lint && npm run build` — Expected: verde.
Visual: retícula de celdas glass con logos centrados; hover eleva la celda con glow.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: tecnologías en celdas glass y rename Technologies.tsx"
```

---

### Task 10: Contact — regreso de la explosión + formulario glass

**Files:**
- Rewrite: `src/app/components/Contact.tsx`
- Modify: `src/app/components/ContactForm.tsx` — SOLO atributos `className` y JSX de presentación; PROHIBIDO tocar estado, handlers, `fetch`, validación o nombres de campos
- Modify: `src/app/globals.css` (quitar `.bg-contacto` y el `@media` que la contiene si queda vacío)
- Delete: `src/app/assets/bg-contacto.png`

**Interfaces:**
- Consumes: clases del sistema (Task 1).

- [ ] **Step 1: Reescribir Contact.tsx**

```tsx
import React from "react";
import ContactForm from "./ContactForm";
import Image from "next/image";
import whiteEnvelope from "../assets/icons/envelope-white-icon.svg";
import whitePhone from "../assets/icons/phone-white-icon.svg";
import colorExplosion from "../../../public/color-explosion.png";

const Contact = () => {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <Image
        src={colorExplosion}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[35%] -left-[15%] w-[60%] select-none opacity-35 blur-[2px]"
      />
      <div className="container relative mx-auto flex flex-col gap-10 px-5 lg:flex-row">
        <div className="flex w-full flex-col justify-center gap-y-10 lg:w-6/12">
          <p className="section-label">Contacto</p>
          <h2 className="font-display text-6xl font-bold leading-[1.1] text-[var(--primaryYellow)]">
            ¿Tienes una idea?{" "}
            <span className="text-gradient-brand">Démosle vida.</span>
          </h2>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2">
              <Image src={whiteEnvelope} alt="" width={16} height={12} />
              contacto@hypernetics.com
            </p>
            <p className="flex items-center gap-2">
              <Image src={whitePhone} alt="" width={16} height={12} />
              +52 (55) 4484-3991
            </p>
          </div>
        </div>

        <div className="w-full lg:w-6/12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 2: Restilizar ContactForm.tsx (solo presentación)**

Cambios permitidos, uno por uno:

1. `<form>`: reemplazar su `className` por `"glass-card flex w-full flex-col gap-6 !rounded-[20px] p-8 text-white lg:p-10"` y agregar como PRIMER hijo del form: `<div className="hairline hairline--brand" />`.
2. Definir una constante arriba del componente (después de los imports) y usarla en TODOS los `<input>` de texto/email/tel, `<select>` y `<textarea>` en lugar del className repetido actual:

```tsx
const fieldClasses =
  "rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-white placeholder:text-[#8b91a3] focus:border-[var(--primaryGreen)] focus:outline-none";
```

   En los tres `<select>` usar `` `${fieldClasses} [&>option]:bg-[var(--primaryBlue)]` `` (para que las opciones sean legibles sobre fondo oscuro). En el `<textarea>` usar `` `${fieldClasses} resize-none` ``.
3. Botón de envío: reemplazar su `className` por `"btn-primary mt-2 disabled:cursor-not-allowed disabled:opacity-50"`.
4. NO tocar: los dos checkboxes, labels, el bloque de `submitStatus`, ni ningún atributo `name`/`value`/`onChange`/`required`.

- [ ] **Step 3: Quitar `.bg-contacto` y borrar el asset**

En `src/app/globals.css`: eliminar el bloque `.bg-contacto { ... }` y el `@media (min-width: 1024px)` completo (ya quedó vacío tras Task 8).

```bash
grep -rn "bg-contacto" src/   # Expected: sin resultados
git rm src/app/assets/bg-contacto.png
```

- [ ] **Step 4: Verificar**

Run: `npm run lint && npm run build` — Expected: verde.
Visual: la explosión asoma desvanecida desde la esquina inferior izquierda; titular con "Démosle vida." en degradado; formulario glass con inputs redondeados; el flujo del formulario (validación de privacidad, estados de envío) sigue funcionando igual.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: contacto con explosión desvanecida y formulario glass"
```

---

### Task 11: Footer compacto

**Files:**
- Rewrite: `src/app/components/Footer.tsx`

**Interfaces:**
- Consumes: clases del sistema (Task 1).

- [ ] **Step 1: Reescribir Footer.tsx**

```tsx
import React from "react";
import Image from "next/image";
import hypernticsLogoHybrid from "../../../public/logo-full-hybrid.svg";
import linkedinLogo from "../assets/icons/linkedin.svg";
import githubLogo from "../assets/icons/github.svg";
import xLogo from "../assets/icons/x.svg";

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-[#0a0c13]">
      <div
        aria-hidden
        className="h-[2px] w-full bg-[linear-gradient(90deg,var(--accentMagenta),var(--accentGold),var(--primaryGreen))]"
      />
      <div className="container mx-auto grid gap-10 px-5 py-14 text-center text-sm font-light md:grid-cols-2 md:text-left lg:grid-cols-4">
        <div>
          <p className="font-display mb-4 font-semibold text-white">
            Navegación
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#about" className="transition-colors hover:text-[var(--primaryGreen)]">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#services" className="transition-colors hover:text-[var(--primaryGreen)]">
                Servicios
              </a>
            </li>
            <li>
              <a href="#process" className="transition-colors hover:text-[var(--primaryGreen)]">
                Proceso
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-[var(--primaryGreen)]">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display mb-4 font-semibold text-white">Contacto</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="mailto:contacto@hypernetics.com.mx" className="transition-colors hover:text-[var(--primaryGreen)]">
                contacto@hypernetics.com.mx
              </a>
            </li>
            <li>
              <a href="tel:+525544843991" className="transition-colors hover:text-[var(--primaryGreen)]">
                +52 (55) 4484-3991
              </a>
            </li>
            <li>Ciudad de México | Querétaro</li>
            <li className="flex justify-center gap-5 md:justify-start">
              <a
                href="https://www.linkedin.com/company/hypernetics-mx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Hypernetics"
              >
                <Image src={linkedinLogo} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/hypernetics-mx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Hypernetics"
              >
                <Image src={githubLogo} alt="GitHub" />
              </a>
              <a
                href="https://x.com/hyperneticsmx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) de Hypernetics"
              >
                <Image src={xLogo} alt="X (Twitter)" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display mb-4 font-semibold text-white">Legal</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="/aviso-de-privacidad"
                className="transition-colors hover:text-[var(--primaryGreen)]"
              >
                Aviso de Privacidad
              </a>
            </li>
            <li>
              <a
                href="/terminos-y-condiciones"
                className="transition-colors hover:text-[var(--primaryGreen)]"
              >
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-5 md:items-start">
          <p className="text-[var(--primaryYellow)]">
            Transformamos ideas en soluciones tecnológicas innovadoras.
            Desarrollo de software personalizado que impulsa el crecimiento de
            tu negocio.
          </p>
          <a href="#contact" className="btn-primary">
            Comenzar Proyecto
          </a>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center gap-6 px-5 pb-10">
        <Image
          src={hypernticsLogoHybrid}
          alt="Hypernetics Logo"
          className="w-full opacity-90 lg:w-[600px]"
        />
        <small className="text-[#5d6274]">
          Hypernetics © {new Date().getFullYear()} — Todos los derechos
          reservados
        </small>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Verificar**

Run: `npm run lint && npm run build` — Expected: verde.
Visual: footer compacto (ya no ocupa una pantalla completa), hairline degradado arriba, logo híbrido como firma, año 2026.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/Footer.tsx
git commit -m "feat: footer compacto con hairline degradado"
```

---

### Task 12: Limpieza final y verificación integral

**Files:**
- Modify: `src/app/globals.css` (quitar la regla global `h1`)

**Interfaces:**
- Consumes: todo lo anterior.

- [ ] **Step 1: Quitar la regla global de h1**

En `src/app/globals.css`, eliminar el bloque:

```css
h1 {
  font-size: 3rem;
  color: var(--primaryYellow);
}
```

(Todas las secciones ya definen tamaño y color explícitos.)

- [ ] **Step 2: Barrido de emojis y restos**

```bash
grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}\x{2190}-\x{21FF}\x{FE0F}]" src/
```
Expected: sin resultados (constraint global de cero emojis; las flechas se renderizan con `arrow-right.svg`).

```bash
grep -rn "bg-trabajemos\|bg-contacto\|bg-color-explosion\|tsparticles\|Techonolgies" src/ package.json
```
Expected: sin resultados.

- [ ] **Step 3: Lint + build**

Run: `npm run lint && npm run build`
Expected: verde, cero warnings nuevos.

- [ ] **Step 4: Verificación visual integral**

Con `npm run dev` corriendo, verificar (con el MCP de Playwright si está disponible, o manualmente):

1. **Desktop 1440px**: recorrer las 7 secciones; capturas de cada una. Liquid activo en el hero (mover el cursor deja rastro fluido); CTAs y anclas del menú funcionan.
2. **Tablet 768px** y **móvil 375px**: hero en columna única, menú hamburguesa glass, grids colapsan correctamente, sin scroll horizontal.
3. **Reduced motion** (DevTools → Rendering → prefers-reduced-motion: reduce): manchas y glow estáticos, sin Liquid.
4. **Páginas legales** `/aviso-de-privacidad` y `/terminos-y-condiciones`: legibles y sin roturas con la tipografía nueva.
5. **Formulario**: validación de privacidad y estados de envío intactos (con `NEXT_PUBLIC_N8N_WEBHOOK_URL` sin configurar debe mostrar el mensaje de error controlado).

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore: limpieza final del rediseño Lienzo vivo"
```

---

## Self-Review (ejecutada al escribir este plan)

- **Cobertura del spec:** paleta/acentos (T1), tipografía (T1), fondo ambiental + eliminación tsparticles (T2), Liquid con guardas (T3-T4), Hero (T4), Header (T5), About sin pills (T6), Services + typos (T7), Process + banner (T8), Technologies + rename (T9), Contact + form (T10), Footer compacto (T11), limpieza h1/emojis/verificación integral + legales + reduced-motion (T12). Sin huecos.
- **Placeholders:** ninguno; todo el código está completo.
- **Consistencia de nombres:** `stats`/`statAccentClass` (T4→T6), `HeroLiquid` (T3→T4), clases CSS del sistema (T1→T5-T11), keyframes `breathe` (T2→T4) verificados.
