import type { CSSProperties } from "react";
import InView from "../components/InView";

const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "React Native",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
];

// Muro tipográfico: los nombres en gris tenue se pintan con el degradado de
// marca al pasar el mouse; en táctil se pintan en secuencia al entrar (CSS).
const Technologies = () => {
  return (
    <InView as="section" id="technologies" className="section container mx-auto px-5">
      <p className="section-label">Stack</p>
      <h2 className="section-title">
        <span className="mask-line">
          <span>Tecnologías que dominamos</span>
        </span>
      </h2>
      <ul className="tech-wall">
        {technologies.map((name, i) => (
          <li key={name} style={{ "--i": i } as CSSProperties}>
            <span className="tech-name">{name}</span>
            {i < technologies.length - 1 ? (
              <span aria-hidden className="tech-sep">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </InView>
  );
};

export default Technologies;
