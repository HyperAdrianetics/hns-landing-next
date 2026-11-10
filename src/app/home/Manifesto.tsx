import type { CSSProperties } from "react";

// Texto del dueño. Cada palabra va en su propio <span> para iluminarse en
// orden de lectura conforme se hace scroll (scroll-driven animations en CSS;
// donde no hay soporte, el texto se ve completo e iluminado).
const MANIFESTO =
  "No nos gusta que nos regalen nada. Cada proyecto nos lo ganamos con trabajo bien hecho, y nuestra mejor recompensa es la satisfacción de quien confía en nosotros.";

const words = MANIFESTO.split(" ");

const Manifesto = () => {
  return (
    <section id="about" className="manifesto">
      <div className="container mx-auto px-5 text-center">
        <p className="section-label">Manifiesto</p>
        <h2
          className="manifesto-text"
          style={{ "--count": words.length } as CSSProperties}
        >
          {words.map((word, i) => (
            <span key={i}>
              <span className="mw" style={{ "--i": i } as CSSProperties}>
                {word}
              </span>
              {i < words.length - 1 ? " " : null}
            </span>
          ))}
        </h2>
        <p className="manifesto-proof">
          Cada persona del equipo trae{" "}
          <span className="drop-pill">10+ años</span> de oficio, con
          trayectoria en startups unicornio y consultoras globales.
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
