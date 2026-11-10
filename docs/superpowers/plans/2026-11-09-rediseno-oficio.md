# Rediseño "Oficio" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la landing "Lienzo vivo" por el diseño "Oficio": hero con el logo lleno de pintura líquida (B), manifiesto, servicios en lista, proceso secuencial, pausa con el logo que emerge (A), muro de tecnologías, contacto y footer sobrios.

**Architecture:** Server components para todo el contenido. Tres piezas cliente pequeñas:
- `LiquidCanvas`: shader WebGL de metaballs con brillo especular, reutilizado por el hero y la pausa.
- `InView`: marca `data-inview` al entrar en pantalla, con un observador compartido.
- `ServiceList`: estado abierto/cerrado de las filas.

Las animaciones son CSS, activadas por `data-inview` o por scroll-driven animations, y se apagan sin JS (`html.js`) y con `prefers-reduced-motion`.

**Tech Stack:** Next.js 15.5 App Router, React 19, TypeScript estricto, Tailwind CSS 4, WebGL 1 sin librerías.

**Spec:** `docs/superpowers/specs/2026-11-09-rediseno-oficio-design.md`. El mapa de referencia es `docs/superpowers/specs/2026-11-09-rediseno-oficio-mockups/03-mapa-pagina-final.html`.

## Global Constraints

- Paleta: `--background #13151e`, `--primaryBlue #191c29`, `--secondaryBlue #383e58`, `--primaryYellow #d2d2af`, `--primaryGreen #a7cf9e`, `--accentMagenta #f06fae`, `--accentGold #e8b64c`. Líquido: además índigo `#3a3f8f` y cobre `#b5553f`. Logo `#EAEADC`. Fondo interior del logo en el hero: `#262a3d`.
- Gris de reposo: `--restGray #646a80` (3.4:1 sobre el fondo).
- Clases CSS propias **dentro de `@layer components`** (regla de Tailwind 4 del repo).
- Sin emojis. Iconos solo con los SVG del proyecto.
- No mencionar cuántas personas forman el equipo. Ningún nombre ni logo de clientes, ni de empresas donde trabajó el equipo.
- Sin JS (`html` sin clase `js`) o con `prefers-reduced-motion: reduce`, todo el contenido se ve completo y estático.
- La lógica de `ContactForm.tsx` (estado, validación, N8N y mensaje de estado) no cambia; solo cambian `className`s.
- Anclas: `#top`, `#about`, `#services`, `#process`, `#technologies`, `#contact`.
- Sin dependencias nuevas de runtime.
- El repo no tiene runner de tests. La verificación de cada tarea es `npm run lint` + `npm run build` + una comprobación en el navegador (Playwright) con el resultado esperado escrito en la tarea.

## Review Focus

1. **Navegador sin WebGL o contexto perdido** → el hero y la pausa muestran el respaldo CSS con colores, nunca un hueco negro. Verificación: en la Tarea 2, forzar `getContext` a `null` y comprobar que el respaldo es visible.
2. **Viewport bajo en desktop (1280×650) y móvil horizontal** → el titular del hero no se encima al CTA ni sale del viewport. Verificación en la Tarea 3: capturas a 1280×650 y 740×360.
3. **Pestaña oculta o sección fuera de pantalla** → el RAF del líquido se detiene. Verificación en la Tarea 2: contador de frames sin avanzar con la sección fuera de pantalla.
4. **Teclado** → Tab llega a cada fila de servicios; Enter/Espacio la abren (`aria-expanded="true"`) y el foco es visible. Verificación en la Tarea 5.
5. **Llegar con un ancla** (`/#process`) → el proceso se anima o aparece lleno, nunca vacío. Verificación en la Tarea 6.

---

### Task 1: Base: limpieza, layout, tokens y utilidades compartidas

**Files:**
- Delete: `src/app/components/canvasui/Liquid.tsx`, `src/app/components/canvasui/ParticleScroll.tsx`, `src/app/components/HeroLiquid.tsx`, `src/app/components/SectionsParticles.tsx`
- Modify: `src/app/layout.tsx` (quitar el `<meta origin-trial>` y `originTrialToken`; añadir script inline en `<head>` que haga `document.documentElement.classList.add('js')`), `.env.example` (quitar `ORIGIN_TRIAL_TOKEN`), `src/app/page.tsx` (orden nuevo, sin `SectionsParticles`)
- Modify: `src/app/globals.css`: token `--restGray`; quitar `.hero-media`, `.hero-circle*` y `.hero-glow`; añadir `.btn-paint`, el hover de pintura de `.btn-primary`, `.mask-line` y `.grain`
- Create: `src/app/components/InView.tsx`

**Interfaces:**
- Produces: `InView({ as?: 'section'|'div'|'ul'|'ol', id?, className?, threshold?: number (default 0.25), children })`. Client component; renderiza la etiqueta y le pone `data-inview="true"` una sola vez al entrar en pantalla. Usa un `IntersectionObserver` compartido a nivel de módulo.
- Produces: clases CSS.
  - `.btn-paint`: botón con borde; una gota de degradado sube y lo llena en `:hover` y `:focus-visible`.
  - `.btn-primary`: degradado de marca, con un brillo que lo recorre en hover.
  - `.mask-line > span`: título que sube desde una máscara. Se activa con `.js [data-inview] .mask-line > span` y se retrasa por línea con `--line`.
  - `.grain`: capa fija de ruido sutil.
- Produces: `page.tsx` renderiza Header, Hero, Manifesto, Services, Process, Pause, Technologies, Contact y Footer.

- [ ] **Step 1:** Borrar los cuatro archivos y quitar sus imports y usos. `page.tsx` importa por ahora los componentes que ya existen; `Manifesto` y `Pause` llegan en sus tareas (dejar el orden comentado hasta entonces).
- [ ] **Step 2:** Escribir `InView`, los tokens y las clases. Todas las animaciones van bajo `.js` y con `@media (prefers-reduced-motion: reduce)` en estado final.
- [ ] **Step 3:** Ejecutar `npm run lint && npm run build`. Esperado: sin errores; ningún import de `canvasui`.
- [ ] **Step 4:** Comprobar en el navegador que `document.documentElement.classList.contains('js')` da `true` y que no hay `<canvas>` en la página. Commit `refactor: retirar Canvas UI y base del rediseño Oficio`.

### Task 2: `LiquidCanvas` (shader de metaballs con brillo)

**Files:**
- Create: `src/app/components/liquid/liquid.ts` (paleta, tipo `Blob`, GLSL, `blobPositions(blobs, t)`)
- Create: `src/app/components/liquid/LiquidCanvas.tsx`

**Interfaces:**
- Produces: `type Blob = { x: number; y: number; r: number; color: [number, number, number]; ax: number; ay: number; speed: number; phase: number }`. Coordenadas normalizadas: el centro es 0,0 y la unidad es la mitad del lado menor.
- Produces: `LiquidCanvas({ blobs: Blob[]; base?: [r,g,b,a]; className?: string; intro?: 'none'|'converge'; onReady?: () => void })`. Canvas `absolute inset-0` sin fondo propio (alpha premultiplicada).

**Comportamiento:**
- Campo de metaballs Σ r²/d². El color se mezcla con los pesos (r²/d²)². El borde es suave con `smoothstep`.
- La normal sale del gradiente del campo (con un límite). Brillo Blinn-Phong con luz arriba a la izquierda, sombreado difuso suave y borde ligeramente más oscuro.
- Resolución interna: CSS px × min(DPR, 1.5) × 0.75 en desktop, y × 1 × 0.5 en `pointer: coarse`.
- `requestAnimationFrame` solo mientras la sección está en pantalla y `document.visibilityState === 'visible'`.
- Con `prefers-reduced-motion`: dibuja un único frame (t = 2.5 s) y no anima.
- `intro: 'converge'`: durante 1.6 s la amplitud y la separación de las manchas bajan de 1.8× a 1×.
- Si falla `getContext('webgl')` o la compilación del shader, el componente devuelve `null` y no lanza; el respaldo CSS del padre queda visible.
- `onReady` se llama tras el primer frame.

- [ ] **Step 1:** Escribir `liquid.ts` y `LiquidCanvas.tsx`, con guardas, `ResizeObserver` y limpieza en el unmount (cancelar el RAF, desconectar observers y `WEBGL_lose_context`).
- [ ] **Step 2:** `npm run lint && npm run build`. Esperado: verde.
- [ ] **Step 3 (Review Focus 1 y 3):** Se verifica en el navegador dentro de la Tarea 3, con el hero montado: con `HTMLCanvasElement.prototype.getContext = () => null` antes de hidratar no hay `<canvas>` y el respaldo CSS se ve; al hacer scroll fuera del hero, el contador `data-frames` del canvas deja de avanzar. Commit `feat: LiquidCanvas, metaballs WebGL con brillo especular`.

### Task 3: Hero B, la pintura dentro del logo

**Files:**
- Rewrite: `src/app/home/Hero.tsx` (server)
- Create: `src/app/components/liquid/HeroLogoLiquid.tsx` (client)

**Interfaces:**
- Consumes: `LiquidCanvas` y `Blob` (Tarea 2).
- Produces: `<section id="top">` con una grid de filas `auto auto 1fr auto auto`: etiqueta; `<h1>` con `grid-row: 2 / 5` y `grid-template-rows: subgrid`, cuyas dos líneas van arriba a la izquierda y abajo a la derecha; CTA "Descubre lo que hacemos" → `#services` en la última fila.
- Copy exacta: etiqueta "Desarrollo de software a la medida"; `<h1>` "Transformamos tus ideas en soluciones digitales" (línea 1 "Transformamos / tus ideas", con "ideas" en `.text-gradient-brand`; línea 2 "en soluciones / digitales").

**Comportamiento:**
- `HeroLogoLiquid` va centrado detrás del texto. Su ancho es `min(78vh * 104/98, 86vw)` y lleva `aspect-ratio: 104/98`.
- Capas: (1) respaldo CSS con radiales de la paleta sobre `#262a3d`; (2) `LiquidCanvas` con `base=#262a3d` opaco. Ambas recortadas con `mask-image: url(/hypernetics-h.svg)` (más `-webkit-`), `contain` y centrado. (3) SVG del contorno con los tres paths del logo, `pathLength=1`, trazo `#EAEADC` al 30 % y `vector-effect: non-scaling-stroke`.
- Entrada:
  - El contorno se dibuja en 1.2 s.
  - Las capas de pintura se revelan con `clip-path: inset(100% 0 0 0)` → `inset(0)` en 1 s, con retraso de 1.2 s.
  - Las líneas del titular solo suben 0.6 s: el `<h1>` es visible desde el primer paint.
- Campos difusos de fondo: índigo a la izquierda y magenta arriba a la derecha.

- [ ] **Step 1:** Escribir los dos componentes y los estilos en `globals.css`.
- [ ] **Step 2:** `npm run lint && npm run build`. Esperado: verde.
- [ ] **Step 3 (Review Focus 2):** Capturas a 1440×900, 1280×650, 768×1024, 375×812 y 740×360. Esperado: el titular y el CTA no se enciman ni se cortan, y el logo con líquido queda visible al centro. Además se ejecutan las comprobaciones de la Tarea 2, Step 3. Commit `feat: hero B, logo con pintura líquida`.

### Task 4: Manifiesto (`#about`)

**Files:**
- Create: `src/app/home/Manifesto.tsx` (server)
- Delete: `src/app/home/About.tsx`, `src/app/home/stats.ts`, y los iconos que queden sin uso (`vector`, `quality`, `handshake` y `rocket`, si nada más los importa)

**Interfaces:**
- Copy exacta: etiqueta "Manifiesto". Texto: "No nos gusta que nos regalen nada. Cada proyecto nos lo ganamos con trabajo bien hecho, y nuestra mejor recompensa es la satisfacción de quien confía en nosotros." Prueba: "Cada persona del equipo trae **10+ años** de oficio, con trayectoria en startups unicornio y consultoras globales.", con "10+ años" en la píldora `.drop-pill` (degradado de marca y `border-radius` que ondula).

**Comportamiento:**
- Cada palabra va en un `<span style="--i:n">`. El párrafo declara `view-timeline-name: --manifesto`.
- Bajo `@supports (animation-timeline: view())` y `.js`, cada palabra anima su color de `--restGray` a `--primaryYellow` con `animation-timeline: --manifesto` y un `animation-range` escalonado por `--i`, entre `cover 25%` y `cover 55%`.
- Sin soporte, las palabras quedan en amarillo.

- [ ] **Step 1:** Escribir el componente y sus estilos; montarlo en `page.tsx`.
- [ ] **Step 2:** `npm run lint && npm run build`. Esperado: verde.
- [ ] **Step 3:** En el navegador, al hacer scroll a la mitad de la sección, las primeras palabras ya tienen el color `rgb(210, 210, 175)` y las últimas todavía `rgb(100, 106, 128)`. Con `reduceMotion` emulado, todas están en amarillo. Commit `feat: manifiesto que se ilumina con el scroll`.

### Task 5: Servicios en lista (`#services`)

**Files:**
- Rewrite: `src/app/home/Services.tsx` (server: encabezado y datos)
- Create: `src/app/home/ServiceList.tsx` (client)

**Interfaces:**
- Produces: `ServiceList({ services: { title: string; description: string; items?: string[] }[] })`. Usa los seis servicios con los títulos, descripciones e `items` actuales de `Services.tsx`.
- Encabezado: etiqueta "Servicios", título "Lo que hacemos" con `.mask-line` y botón `.btn-paint` "Platícanos tu proyecto →" → `#contact`.

**Comportamiento:**
- Cada fila es `<li class="svc-row" data-open>`, con `<h3><button aria-expanded aria-controls>` que contiene el número 01–06, el título y la flecha. El panel `<div id role="region">` lleva la descripción y los `items` como etiquetas pequeñas.
- La inundación de pintura es `::before` (degradado magenta→dorado→verde con `blur`, `width 0 → 125%`, 0.7 s). Se activa con `[data-open="true"]`, `:focus-within` y, bajo `@media (hover:hover)`, `:hover`.
- El panel se abre con `grid-template-rows: 0fr → 1fr`. Sin `.js`, todos los paneles están abiertos.
- El clic alterna `data-open`. Abierta, la flecha rota -45°.

- [ ] **Step 1:** Escribir los componentes y estilos.
- [ ] **Step 2:** `npm run lint && npm run build`. Esperado: verde.
- [ ] **Step 3 (Review Focus 4):** En el navegador: Tab hasta la primera fila y Enter → `aria-expanded="true"` y panel visible; Enter otra vez → `false`. Se ve el `outline` de foco. A 375 px, un toque abre la fila. Commit `feat: servicios como lista de oficio`.

### Task 6: Proceso secuencial (`#process`)

**Files:**
- Rewrite: `src/app/home/Process.tsx` (server; se quita el recuadro "Trabajemos juntos")

**Interfaces:**
- Consumes: `InView` (Tarea 1).
- Copy: etiqueta "Proceso", título "Cómo trabajamos", el párrafo introductorio actual y los cuatro pasos con sus descripciones actuales.

**Comportamiento:**
- Paso `i` (0–3), con color: 0 magenta, 1 dorado, 2 verde, 3 `--primaryYellow`.
- Barra `::after` con `transform: scaleX(0) → 1`, `1.2s linear forwards` y `animation-delay: calc(var(--i) * 1.2s)`.
- El número en contorno (`-webkit-text-stroke`) se rellena con su color en 0.35 s, con `animation-delay: calc((var(--i) + 1) * 1.2s)`.
- Solo corre bajo `.js [data-inview]`. Sin `.js` o con movimiento reducido, todo aparece lleno.
- 4 columnas en `lg`, 2 en `sm` y 1 en móvil.

- [ ] **Step 1:** Escribir la sección y sus estilos.
- [ ] **Step 2:** `npm run lint && npm run build`. Esperado: verde.
- [ ] **Step 3:** En el navegador, con las animaciones pausadas en t = 0.6, 1.2, 1.8 y 3.0 s, `scaleX` de las barras = `[.5,0,0,0]`, `[1,0,0,0]`, `[1,.5,0,0]` y `[1,1,.5,0]` (sin traslape). **(Review Focus 5)**: cargar `/#process` → a los 5 s todas las barras están en 1. Commit `feat: proceso con barras secuenciales`.

### Task 7: Pausa A, el logo emerge (`Pause.tsx`)

**Files:**
- Create: `src/app/home/Pause.tsx` (server)
- Create: `src/app/components/liquid/LogoEmerge.tsx` (client)

**Interfaces:**
- Consumes: `LiquidCanvas` con `intro="converge"` (Tarea 2) e `InView` (Tarea 1).
- Copy exacta: etiqueta "Trabajemos juntos"; título "Convierte tu visión / en una experiencia digital" ("visión" en degradado); CTA `.btn-primary` "Contáctanos" → `#contact`. Texto abajo a todo lo ancho y CTA a la derecha (columna en móvil).

**Comportamiento:**
- Sección `min-h-[90svh]`. El líquido (base transparente, seis manchas centradas) solo se monta cuando la sección se acerca (`rootMargin` de 200 px).
- El logo SVG `#EAEADC` pasa de `opacity 0, translateY(12%), scale(.85), blur(14px)` a nítido en 1 s, con un retraso de 0.5 s tras `data-inview`.
- Después, un destello: un `linear-gradient` blanco enmascarado con el logo cruza una vez en 1.2 s.
- Respaldo CSS: radiales difusos de la paleta.

- [ ] **Step 1:** Escribir los componentes y estilos; montarlos en `page.tsx` entre Process y Technologies.
- [ ] **Step 2:** `npm run lint && npm run build`. Esperado: verde.
- [ ] **Step 3:** En el navegador, el canvas no existe hasta hacer scroll cerca de la sección. A los 2 s de entrar, la opacidad del logo es 1. Commit `feat: pausa A, el logo emerge del líquido`.

### Task 8: Tecnologías, Contacto, Footer y Header

**Files:**
- Rewrite: `src/app/home/Technologies.tsx` (muro tipográfico)
- Delete: `src/app/assets/technologies/*` (si nada más los importa)
- Modify: `src/app/components/Contact.tsx` (layout de dos columnas, titular y datos de contacto)
- Modify: `src/app/components/ContactForm.tsx` (**solo `className`s**: campos con línea inferior, selects y checkbox a juego, botón "Enviar" `.btn-paint`)
- Rewrite: `src/app/components/Footer.tsx` (compacto)
- Modify: `src/app/components/Header.tsx` (el CTA conserva `.btn-primary`)

**Comportamiento:**
- **Tecnologías:** etiqueta "Stack", título "Tecnologías que dominamos". Los nombres TypeScript, React, Next.js, Node.js, React Native, Python, PostgreSQL, MongoDB, Docker y AWS van en `--restGray`, separados por "/", con `white-space: nowrap`. Bajo `(hover:hover)`, el hover los pinta con el degradado. Bajo `(hover:none)` y `.js [data-inview]`, se pintan en secuencia con `animation-delay: calc(var(--i) * .15s)` y se quedan pintados.
- **Contacto:** titular "¿Tienes una idea? / Démosle vida." ("Démosle vida." en degradado). Correo y teléfono con los SVG existentes.
- **Footer:**
  - Fila con los links legales (`/aviso-de-privacidad`, `/terminos-y-condiciones`) y los sociales (URLs actuales).
  - "HYPERNETICS" en Space Grotesk 700, `font-size: clamp(3rem, 15vw, 14rem)`, color `#1f2232`, `aria-hidden`.
  - Copyright actual.
  - Se elimina el CTA del footer.

- [ ] **Step 1:** Escribir los cambios.
- [ ] **Step 2:** Comprobar con `git diff src/app/components/ContactForm.tsx | grep '^[-+]' | grep -v className` que solo cambian `className`s. Esperado: solo las líneas `---` y `+++` del encabezado del diff.
- [ ] **Step 3:** `npm run lint && npm run build`. Esperado: verde.
- [ ] **Step 4:** En el navegador, el formulario muestra sus nueve campos, y enviarlo vacío dispara la validación de siempre. Commit `feat: tecnologías, contacto, footer y header del rediseño Oficio`.

### Task 9: Limpieza final, verificación completa y despliegue

**Files:**
- Modify: `src/app/globals.css` (borrar las clases que ya no use nadie: `.glass-card*`, `.hairline*` y otras, previa búsqueda con grep en `src/`)
- Modify: `CLAUDE.md` (estructura y notas: sin react-tsparticles ni Canvas UI; describir `liquid/` e `InView`)

- [ ] **Step 1:** Limpiar CSS y docs. `npm run lint && npm run build` en verde.
- [ ] **Step 2:** Revisión visual completa a 1440, 768 y 375 px contra `03-mapa-pagina-final.html`; también las páginas legales y la emulación de `reduceMotion`.
- [ ] **Step 3:** Lighthouse (móvil y desktop) contra la línea base medida antes de la Tarea 1. Esperado: Performance no menor y CLS ≤ 0.1.
- [ ] **Step 4:** Revisión del branch completo por un revisor nuevo y corrección de hallazgos.
- [ ] **Step 5:** Merge a `main` y push a `origin` (GitLab, proyecto Vercel "landing-page") y a `github`. Verificar que hypernetics.com.mx sirve la versión nueva (el `<h1>` y la sección `#about` contienen "Manifiesto").
