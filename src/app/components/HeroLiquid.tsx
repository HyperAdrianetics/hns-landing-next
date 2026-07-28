"use client";

import { useEffect, useState, type ReactNode } from "react";
import Liquid, { supportsHtmlInCanvas } from "./canvasui/Liquid";

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

// Monta el efecto solo donde aporta Y donde puede convivir con ParticleScroll:
//
// - Puntero fino y sin `prefers-reduced-motion`, como siempre.
// - SOLO cuando la API HTML-in-Canvas NO está disponible. Con la API activa
//   (origin trial / flag), ParticleScroll captura la página entera en su canvas
//   y el navegador rechaza los canvas del Liquid dentro de esa captura
//   ("NotSupportedError: Nested canvases are not supported"), lo que además
//   dejaba la página en blanco al redimensionar la ventana. Decisión de diseño:
//   en modo nativo gana ParticleScroll; Liquid queda para los navegadores sin
//   la API (Safari/Firefox), donde corre como overlay WebGL sin captura y sin
//   conflicto.
const HeroLiquid = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(finePointer && !reducedMotion && !supportsHtmlInCanvas());
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
    // En modo nativo (HTML-in-Canvas activo) Liquid mueve los children dentro de
    // un canvas posicionado en absoluto, así que su contenedor pierde el alto
    // que le daba el contenido y colapsa a 0. El alto explícito lo evita.
    <Liquid
      className="min-h-dvh"
      color={TRAIL_COLORS[colorIndex]}
      intensity={0.9}
      blend={12}
      densityDissipation={0.9}
      force={0.7}
      distortion={4}
    >
      {children}
    </Liquid>
  );
};

export default HeroLiquid;
