"use client";

import { useEffect, useRef, useState } from "react";
import LiquidCanvas from "./LiquidCanvas";
import { LOGO_PATHS } from "./logoPaths";
import { PAINT, type LiquidBlob } from "./liquid";

const PAUSE_BLOBS: LiquidBlob[] = [
  { x: -0.36, y: 0.08, r: 0.25, color: PAINT.magenta, ax: 0.26, ay: 0.16, speed: 0.42, phase: 0 },
  { x: 0.38, y: -0.06, r: 0.24, color: PAINT.gold, ax: 0.24, ay: 0.2, speed: 0.36, phase: 1.9 },
  { x: 0.06, y: 0.42, r: 0.19, color: PAINT.green, ax: 0.3, ay: 0.12, speed: 0.47, phase: 3.3 },
  { x: -0.55, y: -0.3, r: 0.17, color: PAINT.indigo, ax: 0.18, ay: 0.2, speed: 0.39, phase: 4.6 },
  { x: 0.62, y: 0.34, r: 0.16, color: PAINT.copper, ax: 0.2, ay: 0.16, speed: 0.33, phase: 2.2 },
  { x: 0.02, y: -0.46, r: 0.15, color: PAINT.magenta, ax: 0.3, ay: 0.1, speed: 0.51, phase: 5.1 },
  { x: -0.9, y: 0.5, r: 0.06, color: PAINT.gold, ax: 0.12, ay: 0.14, speed: 0.6, phase: 0.7 },
  { x: 0.95, y: -0.5, r: 0.05, color: PAINT.green, ax: 0.12, ay: 0.12, speed: 0.55, phase: 2.9 },
];

// En vertical el lado menor es el ancho: se juntan las manchas para que no
// se corten contra los bordes de la pantalla.
const PAUSE_BLOBS_MOBILE = PAUSE_BLOBS.slice(0, 6).map((b) => ({
  ...b,
  x: b.x * 0.7,
  ax: b.ax * 0.7,
}));

// El líquido de la pausa solo se monta cuando la sección se acerca al
// viewport. La aparición del logo y su destello son CSS, disparados por el
// `data-inview` de la sección.
const LogoEmerge = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pause-liquid">
      <div className="pause-fallback" />
      {mounted ? (
        <LiquidCanvas
          blobs={PAUSE_BLOBS}
          mobileBlobs={PAUSE_BLOBS_MOBILE}
          intro="converge"
          className="liquid-canvas absolute inset-0 h-full w-full"
        />
      ) : null}
      <div className="pause-logo">
        <svg viewBox="0 0 104 98" fill="#EAEADC">
          {LOGO_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
        <span className="pause-shine" />
      </div>
    </div>
  );
};

export default LogoEmerge;
