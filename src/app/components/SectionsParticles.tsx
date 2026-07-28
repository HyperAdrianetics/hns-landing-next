"use client";

import { useEffect, useState, type ReactNode } from "react";
import ParticleScroll from "./canvasui/ParticleScroll";

// ParticleScroll deriva el efecto del scroll de su propio contenido, así que al
// montarlo el scroll deja de ser del documento y pasa a este contenedor de alto
// de viewport. Por eso envuelve la página entera, hero incluido: si el hero
// quedara fuera, el documento y el contenedor scrollearían por separado y el
// hero se quedaría clavado arriba mientras el resto avanza.
//
// Solo se monta donde el efecto puede verse y el cambio de scroll se justifica:
// puntero fino y sin preferencia de movimiento reducido. En táctil el efecto
// nunca renderiza (la API HTML-in-Canvas no existe en móvil) y quedarnos con el
// scroll del documento respeta el comportamiento nativo del navegador.
const SectionsParticles = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(finePointer && !reducedMotion);
  }, []);

  // En modo nativo, ParticleScroll captura la página con drawElementImage y solo
  // recaptura en scroll/resize. Si una imagen carga o se recarga DESPUÉS de la
  // captura (p. ej. next/image cambia de fuente al cruzar un breakpoint), esa
  // imagen desaparece de la pantalla hasta el siguiente scroll. Este listener
  // pide una recaptura cada vez que termina de cargar una imagen. El evento
  // `load` no burbujea, pero sí es observable en fase de captura.
  useEffect(() => {
    if (!enabled) return;
    const onImgLoad = (e: Event) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      document
        .querySelectorAll<HTMLCanvasElement & { requestPaint?: () => void }>(
          "canvas[layoutsubtree]"
        )
        .forEach((c) => c.requestPaint?.());
    };
    window.addEventListener("load", onImgLoad, true);
    return () => window.removeEventListener("load", onImgLoad, true);
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ParticleScroll className="h-dvh" point={0.92} band={260}>
      {children}
    </ParticleScroll>
  );
};

export default SectionsParticles;
