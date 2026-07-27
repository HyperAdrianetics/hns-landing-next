"use client";

import { useEffect, useState, type ReactNode } from "react";
import ParticleScroll from "./canvasui/ParticleScroll";

// ParticleScroll deriva el efecto del scroll de su propio contenido, así que el
// contenedor necesita alto de viewport y el scroll ocurre dentro, no en el
// documento. Sin `prefers-reduced-motion` el contenido se renderiza tal cual y
// el scroll vuelve al documento.
const SectionsParticles = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ParticleScroll className="h-dvh" point={0.55} band={220} density={4}>
      {children}
    </ParticleScroll>
  );
};

export default SectionsParticles;
