"use client";

import LiquidCanvas from "./LiquidCanvas";
import { LOGO_PATHS } from "./logoPaths";
import { PAINT, hexToRgb, type LiquidBlob } from "./liquid";

// Manchas grandes: el logo es una ventana y la pintura debe ocupar casi todo
// su interior, dejando ver el fondo #262a3d solo en algunos tramos.
const HERO_BLOBS: LiquidBlob[] = [
  { x: -0.5, y: -0.3, r: 0.32, color: PAINT.magenta, ax: 0.38, ay: 0.26, speed: 0.33, phase: 0 },
  { x: 0.5, y: 0.38, r: 0.32, color: PAINT.gold, ax: 0.34, ay: 0.28, speed: 0.29, phase: 1.7 },
  { x: 0.0, y: 0.05, r: 0.27, color: PAINT.green, ax: 0.42, ay: 0.34, speed: 0.37, phase: 3.1 },
  { x: -0.25, y: 0.55, r: 0.24, color: PAINT.indigo, ax: 0.34, ay: 0.2, speed: 0.31, phase: 4.2 },
  { x: 0.55, y: -0.45, r: 0.26, color: PAINT.copper, ax: 0.26, ay: 0.32, speed: 0.27, phase: 2.4 },
  { x: -0.75, y: 0.15, r: 0.2, color: PAINT.gold, ax: 0.22, ay: 0.36, speed: 0.41, phase: 5.3 },
  { x: 0.15, y: -0.72, r: 0.22, color: PAINT.magenta, ax: 0.38, ay: 0.18, speed: 0.35, phase: 0.9 },
];

const HERO_BLOBS_MOBILE = HERO_BLOBS.slice(0, 5);
const [br, bg, bb] = hexToRgb("#262a3d");

// La marca H gigante, llena de pintura que se mezcla sin parar. Capas:
// respaldo CSS (siempre), canvas WebGL encima (si hay WebGL) y el contorno.
// La entrada (contorno que se dibuja, luego la pintura que lo llena) es CSS:
// una capa del color de fondo se retira de abajo hacia arriba. Así la pintura
// existe desde el primer paint y la animación no retrasa el LCP.
const HeroLogoLiquid = () => {
  return (
    <div aria-hidden className="hero-logo">
      <div className="hero-paint">
        <div className="hero-paint-fallback" />
        <LiquidCanvas
          blobs={HERO_BLOBS}
          mobileBlobs={HERO_BLOBS_MOBILE}
          base={[br, bg, bb, 1]}
          className="absolute inset-0 h-full w-full"
        />
        <div className="hero-paint-cover" />
      </div>
      <svg className="hero-outline" viewBox="0 0 104 98" fill="none">
        {LOGO_PATHS.map((d) => (
          <path key={d} d={d} pathLength={1} />
        ))}
      </svg>
    </div>
  );
};

export default HeroLogoLiquid;
