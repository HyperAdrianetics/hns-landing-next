"use client";

import { useEffect, useState, type ReactNode } from "react";
import Liquid from "./canvasui/Liquid";

// El modo `rainbow` de Liquid deriva el color de la dirección del flujo, así que
// produce azules y turquesas ajenos a la marca según hacia dónde mueva el cursor
// el visitante. En su lugar rotamos el color del trazo entre los acentos de la
// paleta: se mantiene el efecto multicolor sin salirse de la identidad.
const TRAIL_COLORS: [number, number, number][] = [
  [0.941, 0.435, 0.682], // magenta #f06fae
  [0.91, 0.714, 0.298], // dorado #e8b64c
  [0.655, 0.812, 0.62], // verde #a7cf9e
];

const COLOR_ROTATION_MS = 2200;

// Monta el efecto solo donde aporta: puntero fino (mouse) y sin
// preferencia de movimiento reducido. En cualquier otro caso los
// children se renderizan tal cual.
const HeroLiquid = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(
      () => setColorIndex((i) => (i + 1) % TRAIL_COLORS.length),
      COLOR_ROTATION_MS
    );
    return () => clearInterval(id);
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <Liquid
      color={TRAIL_COLORS[colorIndex]}
      intensity={0.9}
      blend={2}
      densityDissipation={0.93}
      distortion={0.5}
    >
      {children}
    </Liquid>
  );
};

export default HeroLiquid;
