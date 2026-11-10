"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Tag = "section" | "div" | "ul" | "ol";

// Un solo IntersectionObserver para toda la página: cada elemento registra su
// callback y se da de baja en cuanto entra en pantalla (las entradas ocurren
// una sola vez). El margen inferior negativo hace que la animación arranque
// cuando el bloque ya asomó un poco, no en el primer píxel.
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
  }
  return observer;
}

type InViewProps = {
  as?: Tag;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

// Pone `data-inview="true"` en el elemento la primera vez que entra en
// pantalla. Las animaciones viven en CSS (`.js [data-inview] ...`).
const InView = ({ as: Tag = "div", id, className, style, children }: InViewProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    callbacks.set(el, () => el.setAttribute("data-inview", "true"));
    obs.observe(el);
    return () => {
      callbacks.delete(el);
      obs.unobserve(el);
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      id={id}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default InView;
