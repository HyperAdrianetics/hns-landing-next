import type { CSSProperties } from "react";
import InView from "../components/InView";

const steps = [
  { title: "Análisis", description: "Entendemos tus necesidades y objetivos", color: "var(--accentMagenta)" },
  { title: "Diseño", description: "Creamos la arquitectura y prototipo", color: "var(--accentGold)" },
  { title: "Desarrollo", description: "Construimos la solución con calidad", color: "var(--primaryGreen)" },
  { title: "Entrega", description: "Desplegamos y brindamos soporte", color: "var(--primaryYellow)" },
];

// Las barras se llenan una a la vez: la del paso i arranca en i * 1.2 s, justo
// cuando termina la anterior, y su número se pinta al completarse (CSS).
const Process = () => {
  return (
    <InView as="section" id="process" className="section container mx-auto px-5">
      <div className="section-head">
        <div>
          <p className="section-label">Proceso</p>
          <h2 className="section-title">
            <span className="mask-line">
              <span>Cómo trabajamos</span>
            </span>
          </h2>
        </div>
        <p className="section-intro">
          Un método claro que lleva tu proyecto de la idea al lanzamiento, con
          acompañamiento en cada etapa.
        </p>
      </div>
      <ol className="proc-steps">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="proc-step"
            style={{ "--i": i, "--c": step.color } as CSSProperties}
          >
            <span aria-hidden className="proc-bar" />
            <span aria-hidden className="proc-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </InView>
  );
};

export default Process;
