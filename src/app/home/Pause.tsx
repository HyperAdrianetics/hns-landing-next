import type { CSSProperties } from "react";
import Link from "next/link";
import InView from "../components/InView";
import LogoEmerge from "../components/liquid/LogoEmerge";

// Pausa "A" a media página: los colores se mezclan y el logo emerge del
// líquido. Reemplaza al recuadro "Trabajemos juntos" que cerraba Proceso.
const Pause = () => {
  return (
    <InView as="section" className="pause">
      <div aria-hidden className="pause-field pause-field--magenta" />
      <div aria-hidden className="pause-field pause-field--indigo" />
      <LogoEmerge />
      <div className="pause-inner container mx-auto px-5">
        <div>
          <p className="section-label">Trabajemos juntos</p>
          <h2 className="pause-title">
            <span className="mask-line" style={{ "--line": 0 } as CSSProperties}>
              <span>
                Convierte tu <span className="text-gradient-brand">visión</span>
              </span>
            </span>
            <span className="mask-line" style={{ "--line": 1 } as CSSProperties}>
              <span>en una experiencia digital</span>
            </span>
          </h2>
        </div>
        <Link href="#contact" className="btn-primary">
          Contáctanos
        </Link>
      </div>
    </InView>
  );
};

export default Pause;
