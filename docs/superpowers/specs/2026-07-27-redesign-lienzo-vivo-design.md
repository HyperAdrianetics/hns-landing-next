# Rediseño "Lienzo vivo" — Landing de Hypernetics

**Fecha:** 2026-07-27
**Estado:** Aprobado por el usuario (dirección visual, sistema de diseño, secciones y arquitectura técnica validados en sesión de brainstorming con mockups).

## Objetivo

Renovación completa del look & feel de la landing (hypernetics.com.mx) construida alrededor de `public/color-explosion.png`, que es la esencia visual de la marca. Se integra el efecto **Liquid** de Canvas UI (canvasui.dev) en el Hero. La estructura de contenido (secciones, textos, SEO) se conserva; cambia la presentación.

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Alcance | Renovación completa de todas las secciones en producción |
| Dirección visual | **A · Lienzo vivo** — editorial asimétrico, la explosión como objeto protagonista |
| Animación | **Liquid** (Canvas UI) solo en el Hero. Cloth descartado: requiere flag experimental de Chrome |
| Fondo global | Se elimina react-tsparticles; entra fondo ambiental CSS ("pintura que respira") |
| Portfolio | Fuera de alcance (placeholder se queda como está, sin renderizar) |
| Tipografía | Space Grotesk (titulares/etiquetas) + Open Sans (cuerpo, se conserva) |
| Paleta | Base actual intacta + 2 acentos nuevos de la imagen |
| Iconografía | **Sin emojis** — únicamente SVGs del proyecto |

## Sistema visual

### Paleta

Se conservan las 5 variables actuales sin cambios:
`--background: #13151e`, `--primaryBlue: #191c29`, `--secondaryBlue: #383e58`, `--primaryYellow: #d2d2af`, `--primaryGreen: #a7cf9e`.

Nuevas variables:

- `--accentMagenta: #f06fae` (rosa de la explosión)
- `--accentGold: #e8b64c` (dorado de la explosión)
- Degradado de marca: `linear-gradient(90deg, var(--accentMagenta), var(--accentGold))`

**Regla de uso:** los acentos son sal, no plato principal. Se usan en: degradados de texto (una palabra clave por titular, no frases completas), hairlines superiores de tarjetas, glows/hovers y el CTA primario. El verde sigue siendo el color funcional de links y CTAs secundarios; el amarillo sigue siendo el color de titulares.

### Tipografía

- **Space Grotesk** (Google Fonts vía `next/font/google`, pesos 400/500/700), expuesta como `--font-display`: h1–h3, etiquetas de sección y CTAs.
- **Open Sans** se conserva para cuerpo (300/400/600).
- Etiquetas de sección: Space Grotesk, mayúsculas, `letter-spacing ~0.22em`, tamaño pequeño, color verde.
- Escala fluida: H1 `clamp(2.5rem, 6vw, 4.5rem)`; el resto proporcional.

### Fondo ambiental ("pintura que respira")

Reemplaza al fondo de tsparticles en todo el sitio:

- 3 manchas radiales difusas (magenta, dorado, verde) con `filter: blur`, opacidad 5–10%, posicionadas fijas detrás del contenido.
- Animación CSS de "respiración" (escala/opacidad, ciclos de 9–13s, desfasadas).
- CSS puro en un server component (`AmbientBackground.tsx`), cero JS al cliente.
- Con `prefers-reduced-motion`: manchas estáticas (sin animación).

### Glassmorphism 2.0

Evolución del glass actual, aplicado a todas las tarjetas:

- Fondo `rgba(255,255,255,0.04)`, borde `1px rgba(255,255,255,0.10)`, `backdrop-blur(12px)`, radio 16px.
- Hairline superior de 2px con degradado o color de acento según la tarjeta.
- Hover: elevación sutil + glow del color del hairline.

## Diseño por sección

### Header

Píldora glass flotante centrada (no barra de ancho completo): logo + links + CTA "Comenzar Proyecto" con fondo degradado magenta→dorado y texto oscuro. En móvil conserva el patrón actual de menú desplegable, restilizado a glass 2.0.

### Hero (corazón del rediseño)

- Grid asimétrico ~52/48 en desktop; columna única en móvil (texto primero, imagen después).
- **Izquierda:** etiqueta de sección ("Desarrollo de software a la medida"), H1 editorial en Space Grotesk color amarillo con la palabra "ideas" en degradado de marca, párrafo actual, CTA primario degradado ("Descubre lo que hacemos") + link secundario verde ("Nuestro proceso →"), y fila de stats (20+, 98%, 24/7) en números display.
- **Derecha:** `color-explosion.png` como `next/image` con `priority` (ya no fondo CSS), flotando con glow radial magenta animado detrás.
- **Liquid (Canvas UI)** como overlay absoluto sobre toda la sección; ver arquitectura técnica.
- El panel glass izquierdo del hero actual y `.bg-color-explosion` desaparecen.

### Nosotros (About)

- Etiqueta + titular "Somos Hypernetics" (verde en "Hypernetics") + párrafo actual.
- **Los 3 pills gigantes se eliminan**; los stats se integran como números display con degradado/colores junto al encabezado (mismo dato: 20+ Proyectos, 98% Satisfacción, 24/7 Soporte). Nota: los stats también aparecen en el Hero — mismo origen de datos, definidos una sola vez.
- Las 4 tarjetas de valores pasan a glass 2.0 con hairline de acento; la de "Calidad garantizada" conserva su tratamiento destacado (tinte verde). Iconos SVG actuales (vector, quality, handshake, rocket).

### Servicios

- Mismo bento grid (2-1-1 / 1-1-1-2) y mismos textos.
- Tarjetas en glass 2.0; las dos grandes (Desarrollo Personalizado, Consultoría Técnica) llevan hairline degradado completo; las demás hairline de un solo acento según el color de su titular: titular verde → hairline verde, titular amarillo → hairline dorado.
- Se corrigen typos existentes: "React Nativel" → "React Native", "Flutler" → "Flutter", "integración APis" → "Integración de APIs", "Consultoria" → "Consultoría".

### Proceso

- Los 4 pasos conectados por una **línea de pintura** degradada continua (magenta→dorado→verde→amarillo); cada paso con nodo circular de color sólido y número en Space Grotesk.
- Banner "Trabajemos juntos": se elimina la foto `bg-trabajemos`; pasa a tarjeta glass grande con manchas de pintura internas y CTA primario degradado.
- Se corrige el párrafo introductorio duplicado de Servicios por uno propio de Proceso.

### Tecnologías

- De retícula con rings a **celdas glass individuales** (grid responsivo), logo centrado por celda.
- Hover: glow magenta sutil. Titular con etiqueta "Stack" + "Tecnologías que dominamos".
- Se corrige el nombre del archivo `Techonolgies.tsx` → `Technologies.tsx`.

### Contacto

- Se elimina la foto `bg-contacto`. En su lugar, **la explosión regresa**: la imagen desvanecida (opacidad ~35%, blur ligero) asomando desde una esquina — cierre circular de la narrativa visual.
- Titular "¿Tienes una idea? Démosle vida." con "Démosle vida." en degradado de marca.
- Formulario en tarjeta glass 2.0 con hairline degradado; inputs restilizados; botón de envío en degradado. **La lógica del formulario (N8N) no se toca.**
- Iconos de contacto: SVGs existentes (envelope, phone).

### Footer

- Se compacta: deja de ocupar `min-h-screen`.
- Hairline degradado superior (magenta→dorado→verde) como borde.
- Tres columnas (navegación, contacto+social, legal) + logo híbrido grande centrado como firma final + copyright.
- Social links con los SVGs existentes (linkedin, github, x).

## Arquitectura técnica

### Canvas UI — Liquid

- Instalación vía shadcn CLI desde el registro de canvasui.dev (patrón `npx shadcn@latest add @canvas-ui/liquid-react`; el nombre exacto del registro se verifica al implementar). El código queda **dentro del repo** — sin dependencia runtime externa.
- Client component (`"use client"`) montado únicamente en el Hero, como overlay `absolute inset-0` con `pointer-events: none` para no bloquear CTAs/links.
- **Guardas de montaje** (el componente no se monta si):
  - `prefers-reduced-motion: reduce`
  - Dispositivo táctil (`pointer: coarse`) — el efecto es pointer-driven y en móvil solo gastaría batería
  - WebGL no disponible (el propio componente degrada a no-op; se envuelve para que un fallo de WebGL nunca rompa el Hero)
- Liquid es **puramente aditivo**: sin él, el Hero es completamente funcional y visualmente íntegro.

### Eliminaciones

- Dependencias `react-tsparticles` y `tsparticles` (package.json)
- `src/app/components/ParticlesBackground.tsx` y su uso en `layout.tsx`
- `src/particlesjs-config.json`
- Clases CSS `.bg-color-explosion`, `.bg-trabajemos`, `.bg-contacto` y las imágenes `bg-trabajemos.jpg` / `bg-contacto.png` de assets
- Regla global `h1 { font-size: 3rem }` de globals.css (la reemplaza la escala tipográfica nueva)

### Nuevos archivos

- `src/app/components/AmbientBackground.tsx` — server component, manchas CSS
- Componente Liquid copiado por el CLI de shadcn (ruta según configure el CLI)
- Variables y utilidades nuevas en `globals.css`

### Sin cambios

- Lógica de `ContactForm.tsx` (N8N), Google Analytics, `metadata` de layout.tsx, robots/sitemap, páginas `/aviso-de-privacidad` y `/terminos-y-condiciones` (solo se verifica que no se rompan visualmente con la tipografía global nueva).

## Manejo de errores

- Liquid: envuelto para degradar a no-op ante fallo de WebGL/inicialización; nunca debe romper el render del Hero.
- Fuentes: `next/font` con `display: swap` implícito — sin FOIT.
- Imagen del hero: `next/image` con `priority` para LCP; `alt` descriptivo.

## Verificación

1. `npm run lint` y `npm run build` en verde al cierre de cada etapa.
2. Revisión visual en dev server (desktop 1440px, tablet 768px, móvil 375px) con capturas.
3. Prueba de Liquid activo (desktop con mouse) y de sus tres guardas (reduced-motion, táctil, sin WebGL).
4. Verificación visual de páginas legales tras el cambio tipográfico.
5. Lighthouse: el performance no debe empeorar respecto al sitio actual (quitar tsparticles debería mejorarlo).

## Fuera de alcance

- Sección Portfolio (placeholder intacto, sin renderizar)
- Cambios de contenido/copy más allá de los typos y las correcciones listadas explícitamente en este documento (p. ej. el párrafo introductorio de Proceso)
- Nuevas páginas o rutas
- Cambios al backend del formulario (N8N)
