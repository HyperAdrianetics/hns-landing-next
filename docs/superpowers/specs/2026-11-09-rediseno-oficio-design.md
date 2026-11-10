# Rediseño "Oficio" — Landing de Hypernetics

**Fecha:** 2026-11-09
**Estado:** Aprobado por el dueño (2026-11-09) con instrucción de implementar y desplegar a producción
**Reemplaza a:** `2026-07-27-redesign-lienzo-vivo-design.md` (el rediseño "Lienzo vivo" que hoy está en producción)

Bocetos de referencia (abrir en el navegador; son fragmentos HTML autocontenidos):

- `2026-11-09-rediseno-oficio-mockups/01-hero-efectos-A-B.html`: los efectos líquidos **A** (el logo emerge del líquido) y **B** (la pintura vive dentro del logo). La opción C de ese archivo se descartó.
- `2026-11-09-rediseno-oficio-mockups/02-direcciones-secciones.html`: las tres direcciones para las secciones. **Se eligió la 2 · Lista de oficio.** La 1 (Galería) y la 3 (Relato con pintura, el trazo de color) se descartaron.
- `2026-11-09-rediseno-oficio-mockups/03-mapa-pagina-final.html`: **el mapa aprobado de la página completa**, con el hero B a tamaño real arriba. Es la referencia principal de composición.

Los bocetos son ilustrativos: fijan composición, jerarquía y comportamiento, no el código. Sus animaciones se repiten en bucle para poder verlas; en el sitio real ocurren una vez (salvo donde se indique).

---

## Por qué

El dueño siente que la página actual se ve **genérica**, aunque los colores le encantan. En concreto le sobran dos cosas:

1. **El hero con el bloque de texto a la izquierda**: la plantilla "texto a la izquierda, imagen a la derecha".
2. **La manera en que se presenta la información en el resto**: retículas de tarjetas de vidrio con icono, título y adjetivos.

Lo que quiere es que quien entre se interese en revisarla y perciba **calidad** desde el primer segundo. La idea original de la marca era el arte y la pintura (la imagen `public/color-explosion.png`). Quiere **colores líquidos que se mezclan, con brillo llamativo pero natural, y que de ahí salga el logo de Hypernetics.**

Al bajar del hero, lo primero que el cliente debe entender es que **Hypernetics es una empresa de confianza, con gente de experiencia.** En palabras del dueño: *"a nosotros no nos gusta que nos regalen nada, a nosotros nos gusta la dignidad del trabajo y la satisfacción de la gente con nuestro trabajo."* Esa frase es la voz de la página.

## Metas

- Una primera impresión memorable y de calidad: el logo lleno de pintura líquida con brillo natural.
- Transmitir confianza con pruebas y con la voz del dueño, no con adjetivos.
- Una presentación de la información sobria, tipográfica y segura de sí misma ("Lista de oficio"), donde la pintura aparece en dos momentos grandes y en los detalles cuando el visitante interactúa.
- Animaciones cuidadas en botones, en el hero y en la entrada de cada sección.
- Que todo se sienta fluido en una laptop normal y en celular.

## No metas

- Portfolio o casos de estudio (el placeholder `Portfolio.tsx` sigue sin renderizarse).
- Páginas o rutas nuevas.
- Cambios a la lógica del formulario de contacto (N8N), a Google Analytics, a `metadata`, a robots ni al sitemap.

## Anti-metas: sería un fracaso aunque funcione

- Volver a la plantilla genérica: columna de texto a la izquierda con imagen a la derecha, o retículas de tarjetas de vidrio con icono y adjetivos.
- **Un trazo o línea de color continuo que recorra la página.** Se probó y el dueño lo rechazó explícitamente.
- **Mencionar cuántas personas forman el equipo.**
- **Usar nombres o logos de clientes**, ni nombrar empresas en las que trabajó el equipo (ver "Decisiones de Claude").
- Emojis en cualquier parte. Solo SVGs del proyecto.
- Efectos que tapen texto, lo hagan ilegible o pongan la página lenta ("brillo llamativo pero natural", no estridente).
- Que el contenido dependa de JavaScript para verse: sin JS o con "reducir movimiento" activado, todo debe ser visible y legible.

## Restricciones

- Stack actual: Next.js 15.5 (App Router), React 19, TypeScript estricto, Tailwind CSS 4. Contenido en español (es_MX).
- **Paleta intacta** (variables de `globals.css`): `--background #13151e`, `--primaryBlue #191c29`, `--secondaryBlue #383e58`, `--primaryYellow #d2d2af` (titulares), `--primaryGreen #a7cf9e` (etiquetas y acentos funcionales), `--accentMagenta #f06fae`, `--accentGold #e8b64c`. El líquido usa además los tonos de la explosión que ya aparecen en los bocetos: índigo `#3a3f8f` y cobre `#b5553f`. Color del logo: `#EAEADC`.
- Tipografía actual: Space Grotesk (titulares y etiquetas, `--font-display`) y Open Sans (cuerpo).
- Logo: `public/hypernetics-h.svg` (la marca H, viewBox 104×98, tres paths). Es la forma que se usa como ventana (B) y la que emerge (A).
- Tailwind 4: toda clase CSS propia va dentro de `@layer components`. Las clases sueltas fuera de capa anulan las utilidades de Tailwind; ya causó un bug en el menú móvil.
- Accesibilidad: `prefers-reduced-motion` respetado en todo, contraste AA en textos, navegación con teclado intacta y foco visible.
- Despliegue en Vercel. `npm run lint` y `npm run build` en verde.

---

## La página, de arriba abajo

Orden: Header → **Hero (B)** → **Manifiesto** → **Servicios** → **Proceso** → **Pausa (A)** → **Tecnologías** → **Contacto** → **Footer**.

Las anclas actuales se conservan para que el header, el footer y los CTAs sigan funcionando: `#top`, `#about` (manifiesto), `#services`, `#process`, `#technologies`, `#contact`. Hay que revisar que el formulario conserve sus `id` (`urgent`, `privacy-policy`) y que el `navbar-dropdown` del header siga intacto.

### Header

Se conserva el header actual (píldora flotante con logo, links y CTA "Comenzar proyecto"), incluido su comportamiento móvil ya corregido. Su CTA adopta el botón con relleno de pintura descrito en "Botones".

### 1 · Hero: la pintura vive dentro del logo (efecto B)

Lo primero que se ve, a pantalla completa (ver la vista grande en `03-mapa-pagina-final.html`).

- **Centro:** la marca H de Hypernetics en tamaño gigante (unos 3/4 del alto del viewport en desktop) funciona como **ventana**. Dentro, manchas de color líquido de la paleta (magenta, dorado, verde, índigo, cobre) se mueven, se funden y se mezclan sin parar, con **brillos especulares** que les dan volumen, como gotas de pintura fresca. Fuera del logo solo hay el fondo oscuro con un par de campos de color muy difusos. El logo lleva un contorno fino color crema, de baja opacidad.
- **Titular partido en dos esquinas que enmarcan el logo:**
  - Arriba a la izquierda: etiqueta "Desarrollo de software a la medida" y luego "Transformamos / tus **ideas**" ("ideas" con el degradado de marca magenta→dorado).
  - Abajo a la derecha: "en soluciones / digitales" y el CTA primario "Descubre lo que hacemos" → `#services`.
  - Semánticamente es **un solo `<h1>`**: "Transformamos tus ideas en soluciones digitales", repartido visualmente en dos bloques.
- **Entrada (una vez, al cargar):** primero se dibuja el contorno del logo (~1.2 s), luego la pintura llena el interior (~1 s) y al final suben los dos bloques del titular. Después el líquido sigue moviéndose suave y continuo mientras el hero esté en pantalla.
- El párrafo actual del hero ("Desarrollamos software a la medida que impulsa tu negocio…") sale del hero; ver "Decisiones de Claude".

### 2 · Manifiesto y experiencia (`#about`)

Sustituye a la sección "Nosotros" actual.

- Etiqueta "Manifiesto" y, centrado y en letra grande (Space Grotesk 500), el texto del dueño. **Borrador, pendiente de aprobación del dueño:**
  > No nos gusta que nos regalen nada. Cada proyecto nos lo ganamos con trabajo bien hecho, y nuestra mejor recompensa es la satisfacción de quien confía en nosotros.
- **Se ilumina palabra por palabra conforme el visitante hace scroll**: las palabras pasan de gris tenue (`#3a3f52`) al crema de titular. Va ligado al scroll, no al tiempo.
- Debajo, en tamaño de cuerpo: "Cada persona del equipo trae **10+ años** de oficio, con trayectoria en startups unicornio y consultoras globales." El "10+ años" va en una píldora con el degradado de marca y bordes que ondulan levemente, como una gota.
- Se eliminan las cuatro tarjetas de valores y los tres stats; ver "Decisiones de Claude".

### 3 · Servicios (`#services`): Lista de oficio

- Encabezado: etiqueta "Servicios", título "Lo que hacemos" y, a la derecha, el botón secundario "Platícanos tu proyecto →" → `#contact`.
- **Lista de seis filas grandes** separadas por líneas finas: número (01–06), nombre del servicio en tipografía grande y una flecha a la derecha. Los nombres son los seis servicios actuales: Desarrollo de Software Personalizado, Aplicaciones Móviles, Desarrollo Web, Arquitectura de Datos, Soluciones Cloud y Consultoría Técnica. El builder puede abreviarlos como en el boceto ("Software a la medida").
- **Al pasar el mouse**, una mancha de pintura (degradado magenta→dorado→verde, bordes difusos) **inunda la fila** de izquierda a derecha. El texto pasa a oscuro, la flecha gira hacia arriba (↗) y **se despliega el detalle**: la descripción actual del servicio y, donde existan, sus tecnologías (p. ej. React Native, Flutter, Diseño UX/UI, Integración de APIs).
- Con teclado, el foco produce el mismo efecto. **En táctil, cada fila se abre al tocarla**, como acordeón.

### 4 · Proceso (`#process`): "Cómo trabajamos"

- Etiqueta "Proceso" y título "Cómo trabajamos", más el párrafo introductorio actual de la sección.
- **Cuatro columnas**: Análisis, Diseño, Desarrollo y Entrega, con sus descripciones actuales. Cada una tiene un número grande en **contorno** (01–04) y una barra fina encima.
- **Animación, corregida a pedido del dueño:** al entrar la sección en pantalla, **las barras se llenan una a la vez. La 02 empieza exactamente cuando termina la 01**, y así hasta la 04, sin traslape. Cada barra tarda ~1.2 s, con un avance continuo que hace parecer que la pintura viaja de un paso al siguiente. **Cuando una barra se completa, su número se rellena del mismo color.** Colores: 01 magenta, 02 dorado, 03 verde, 04 crema. Ocurre una vez y se queda lleno.
- En móvil las columnas se apilan y la misma secuencia corre de arriba abajo.

### 5 · Pausa: el logo emerge del líquido (efecto A)

Reemplaza al recuadro "Trabajemos juntos" que hoy cierra la sección Proceso. Es una sección propia, a pantalla completa o casi.

- Campos de color difusos de fondo. Al centro, **manchas de pintura de la paleta se mezclan y se funden** con brillo especular. Cuando la sección entra en pantalla, el líquido se asienta y **el logo H (color `#EAEADC`) emerge a la superficie**: pasa de desenfocado y algo abajo a nítido en su sitio, y un **destello de luz lo recorre**. El líquido sigue moviéndose suave alrededor mientras la sección esté visible.
- Texto abajo, a todo lo ancho: etiqueta "Trabajemos juntos", titular "Convierte tu **visión** / en una experiencia digital" y, a la derecha, el CTA primario "Contáctanos" → `#contact`.

### 6 · Tecnologías: muro tipográfico

- Etiqueta "Stack" y título "Tecnologías que dominamos".
- En lugar de la cuadrícula de logos, un **muro de texto**: los diez nombres (TypeScript, React, Next.js, Node.js, React Native, Python, PostgreSQL, MongoDB, Docker, AWS) en tipografía grande, gris tenue y separados por "/". Ningún nombre se parte en dos líneas.
- **Al pasar el mouse**, cada nombre se pinta con el degradado de marca. **En táctil**, los nombres se van pintando uno por uno al entrar la sección en pantalla.

### 7 · Contacto (`#contact`)

- Izquierda: etiqueta "Contacto", titular grande "¿Tienes una idea? / **Démosle vida.**" y debajo el correo `contacto@hypernetics.com.mx` y el teléfono `+52 55 4484 3991`, con los SVG existentes.
- Derecha: **el formulario actual con todos sus campos** (nombre, correo, teléfono, empresa, perfil, tipo de proyecto, presupuesto, urgente y mensaje), restilizado al lenguaje sobrio: campos de **línea inferior** en vez de cajas, y selects y checkbox a juego. El botón "Enviar" usa el relleno de pintura. **La lógica (N8N, validación y mensaje de estado bajo el botón) no se toca.**

### 8 · Footer

Compacto. Una fila con los links legales (Aviso de privacidad, Términos y condiciones) y los sociales (LinkedIn, GitHub, X, con los SVG existentes). Como firma final, **"HYPERNETICS" en letra enorme y tenue** (casi del color del fondo) a todo lo ancho, y el copyright.

---

## Comportamientos en toda la página

- **Botones (CTA y secundarios):** al pasar el mouse o al recibir foco, una gota de pintura (degradado magenta→dorado→verde, con forma orgánica que gira) **sube desde abajo y llena el botón**, y el texto pasa a oscuro. Al salir, se vacía. Los primarios parten ya con el degradado de marca y su hover es un brillo o mezcla sutil; el builder define el detalle, siempre "pintura" y nunca un simple cambio de color.
- **Entrada de secciones:** los títulos suben **línea por línea desde una máscara** al entrar en pantalla, una vez. Las secciones se separan con **líneas finas**, sin cortes bruscos de fondo.
- **Fondo:** oscuro (`--background`) con campos de color muy difusos y tenues. Se puede conservar el `AmbientBackground` actual si no compite con las dos piezas líquidas.
- **Textura:** una capa de grano muy sutil (como en los bocetos) da sensación de papel o lienzo. Es opcional si afecta el rendimiento.
- **"Reducir movimiento":** sin animaciones. El hero y la pausa muestran un fotograma estático y bonito del líquido, el manifiesto aparece completamente iluminado, las barras y números del proceso aparecen llenos y los títulos aparecen sin máscara.
- **Celular:** el hero y la pausa conservan su composición (titular arriba y abajo, logo al centro, adaptado a vertical) con una versión más ligera del líquido, con menos manchas y menor resolución interna. Las filas de servicios se abren al tocarlas y los nombres de tecnologías se pintan en secuencia.
- **Rendimiento:** las piezas líquidas se **pausan cuando no están en pantalla** o la pestaña está oculta. El texto del hero es contenido de servidor, visible sin esperar a JS. Lighthouse no debe empeorar respecto al sitio actual.

---

## Arquitectura técnica (lo decidido)

- **Se retiran los efectos de Canvas UI**: `canvasui/Liquid.tsx` (el rastro de color que sigue al mouse), `canvasui/ParticleScroll.tsx`, `HeroLiquid.tsx` y `SectionsParticles.tsx`.
  - ParticleScroll convierte la página entera en un contenedor de scroll propio, lo que choca con las animaciones ligadas al scroll de este diseño.
  - En una prueba con Chrome reciente (API HTML-in-Canvas disponible), el hero de producción aparecía **vacío, solo con el header**. Al retirar estos componentes desaparece esa ruta.
  - El token `ORIGIN_TRIAL_TOKEN` y su `<meta>` en `layout.tsx` quedan sin uso y se retiran, igual que la entrada en `.env.example`.
- **Se retiran del render** `color-explosion.png` del hero, `stats.ts` y las tarjetas de valores de About. El archivo `public/color-explosion.png` puede quedarse en el repo.
- **Las dos piezas líquidas (hero B y pausa A)** son client components con guardas de montaje: sin WebGL o con `prefers-reduced-motion` muestran el fotograma estático. Un fallo nunca rompe la sección. Deben verse como en los bocetos: manchas que se funden como metaballs, mezcla de color en las uniones, brillo especular de una luz arriba a la izquierda y movimiento lento y orgánico.
- **El resto de la página son server components**, con la menor cantidad posible de JS cliente: CSS para hovers, máscaras y transiciones; un observador de intersección pequeño y compartido para los disparos "al entrar en pantalla"; y el manifiesto ligado al scroll.
- **Sin dependencias nuevas de runtime pesadas.** Si el builder considera necesaria alguna, debe justificarla por peso y beneficio.

## Lo que queda a criterio del builder

- La técnica de render del líquido (shader WebGL propio, SVG/canvas u otra), siempre que cumpla el aspecto de los bocetos, los 60 fps en una laptop normal y el comportamiento móvil. Nota: los bocetos usan filtros SVG (`feGaussianBlur` + `feColorMatrix` + `feSpecularLighting`), que a pantalla completa suelen ser costosos en CPU; lo más probable es que convenga un shader.
- Cómo recortar el líquido a la forma del logo en el hero (máscara CSS o SVG, o dentro del shader) y cómo dibujar el contorno.
- La técnica de la iluminación palabra por palabra del manifiesto (scroll-driven animations de CSS con respaldo, o un listener ligero).
- Duraciones, curvas y retrasos exactos, respetando los valores indicados para el proceso.
- Estructura de componentes y archivos, nombres y si se reaprovechan clases de `globals.css`.
- El orden de implementación.

## Decisiones de Claude (el dueño puede cambiarlas)

1. **No se nombra a Kavak, Globant ni Accenture.** El dueño pidió no usar nombres ni logos de clientes. Esas empresas fueron empleadores, no clientes, pero por prudencia se describen como "startups unicornio y consultoras globales". Si el dueño confirma que sí se pueden nombrar, es un cambio de una línea.
2. **El equipo se presenta sin fotos ni nombres**, como grupo.
3. **Se quitan los tres stats** (20+ proyectos, 98% de satisfacción, 24/7). La prueba de confianza pasa a ser el manifiesto más los 10+ años de cada persona.
4. **Se quitan las cuatro tarjetas de valores** de Nosotros (Enfoque a resultados, Calidad garantizada, Colaboración transparente, Innovación constante). Eran los adjetivos que hacían sentir genérica la página; el manifiesto ocupa su lugar.
5. **El párrafo del hero sale de la página.** La meta description de SEO no cambia.
6. **Tecnologías pasa de logos a muro de nombres.**
7. **Se conserva el header actual**, solo con el nuevo botón.
8. **Se retiran Liquid y ParticleScroll** (ver Arquitectura técnica).
9. **La pausa A lleva la etiqueta "Trabajemos juntos"**, que viene del recuadro que reemplaza.

## Respuestas a la revisión del builder (decisiones de Claude)

10. **El titular del hero no espera a la animación.** El `<h1>` se pinta desde el primer render del servidor y solo hace una subida corta con CSS (~0.6 s, sin ocultarlo detrás de JS). El dibujo del contorno y el llenado de pintura del logo corren por su cuenta en el cliente, en cuanto el líquido está listo, sin bloquear el texto. La línea base de Lighthouse se mide antes de cambiar nada (móvil y desktop: Performance, LCP, CLS, TBT) y se compara al final.
11. **Contraste de los estados en reposo.** El gris de reposo pasa de `#3a3f52` (1.7:1) a `#646a80` (3.4:1 sobre el fondo, AA para texto grande), tanto para las palabras del manifiesto aún no iluminadas como para los nombres de tecnologías. El efecto sigue siendo "de tenue a color".
12. **Las filas de Servicios son paneles desplegables, no links.** Cada fila es un botón con `aria-expanded` que controla su panel de detalle. En desktop, al pasar el mouse o con el foco se inunda de pintura y se muestra el detalle; el clic lo deja fijo abierto o lo cierra. En táctil, el toque abre o cierra. La flecha gira a ↗ como indicador de "abierto" y no navega. Sin JS, el detalle se ve abierto.
13. **El CTA del header conserva el degradado sólido de marca** (como hoy), con un hover de "pintura" sutil: brillo o mezcla que recorre el degradado. Los botones con borde (outline) usan el llenado completo.

## Verificación

1. `npm run lint` y `npm run build` en verde.
2. Revisión visual en desktop (1440 px), tablet (768 px) y móvil (375 px), comparando contra `03-mapa-pagina-final.html`.
3. Hero B y pausa A en Chrome, Safari y Firefox: aspecto, fluidez, pausa fuera de pantalla y fotograma estático sin WebGL o con "reducir movimiento".
4. Proceso: la barra 02 arranca al terminar la 01 (sin traslape), y cada número se pinta al completarse su barra.
5. Formulario: envío real de prueba a N8N con el estilo nuevo, más el mensaje de estado.
6. Navegación por teclado (foco visible en botones y filas de servicios) y anclas del header y el footer.
7. Páginas legales sin roturas visuales.
8. Lighthouse: el rendimiento no empeora respecto al sitio actual.
