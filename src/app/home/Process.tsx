import React from "react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Análisis",
    description: "Entendemos tus necesidades y objetivos",
    nodeColor: "bg-[var(--accentMagenta)]",
  },
  {
    number: "02",
    title: "Diseño",
    description: "Creamos la arquitectura y prototipo",
    nodeColor: "bg-[var(--accentGold)]",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construimos la solución con calidad",
    nodeColor: "bg-[var(--primaryGreen)]",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Desplegamos y brindamos soporte",
    nodeColor: "bg-[var(--primaryYellow)]",
  },
];

const Process = () => {
  return (
    <section id="process" className="container mx-auto px-5 py-24">
      <p className="section-label">Proceso</p>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-4xl font-bold text-white">
          Nuestro <span className="text-[var(--primaryGreen)]">Proceso</span>
        </h2>
        <p className="max-w-xl text-xl font-light text-[#b9bdc9]">
          Un método claro que lleva tu proyecto de la idea al lanzamiento, con
          acompañamiento en cada etapa.
        </p>
      </div>

      <div className="relative mt-16 grid grid-cols-1 gap-y-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
        <div
          aria-hidden
          className="absolute left-[12%] right-[12%] top-5 hidden h-[2px] rounded bg-[linear-gradient(90deg,var(--accentMagenta),var(--accentGold),var(--primaryGreen),var(--primaryYellow))] opacity-50 lg:block"
        />
        {steps.map((step) => (
          <article
            key={step.number}
            className="relative flex flex-col items-center gap-3 text-center"
          >
            <span
              className={`font-display flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[var(--background)] ${step.nodeColor}`}
            >
              {step.number}
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              {step.title}
            </h3>
            <p className="max-w-[26ch] font-light text-[#b9bdc9]">
              {step.description}
            </p>
          </article>
        ))}
      </div>

      <div className="glass-card mt-20 flex flex-col items-center gap-8 overflow-hidden !rounded-3xl p-10 lg:flex-row lg:px-16">
        <div
          aria-hidden
          className="absolute -left-[5%] -top-[40%] h-[180%] w-[40%] bg-[radial-gradient(closest-side,rgba(240,111,174,0.18),transparent_70%)] blur-2xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-[50%] right-[20%] h-[170%] w-[35%] bg-[radial-gradient(closest-side,rgba(232,182,76,0.14),transparent_70%)] blur-2xl"
        />
        <div className="relative flex flex-col items-center gap-3 lg:items-start">
          <h3 className="font-display text-4xl font-bold text-[var(--primaryYellow)]">
            Trabajemos juntos
          </h3>
          <p className="text-xl font-bold">
            Convierte tu visión en una{" "}
            <span className="text-[var(--primaryGreen)]">
              experiencia digital.
            </span>
          </p>
        </div>
        <Link
          href="#contact"
          className="btn-primary relative w-full min-w-[200px] lg:ml-auto lg:w-auto"
        >
          Contáctanos
        </Link>
      </div>
    </section>
  );
};

export default Process;
