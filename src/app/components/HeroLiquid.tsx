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
