import React from "react";

const Process = () => {
  const steps = [
    {
      number: "01",
      title: "Analisis",
      description: "Entendemos tus necesidades y objetivos",
      selected: true,
    },
    {
      number: "02",
      title: "Diseño",
      description: "Creamos la arquitectura y prototipo",
      selected: false,
    },
    {
      number: "03",
      title: "Desarrollo",
      description: "Construimos la solución con calidad",
      selected: false,
    },
    {
      number: "04",
      title: "Entrega",
      description: "Desplegamos y brindamos soporte",
      selected: false,
    },
  ];

  return (
    <section id="services" className="min-h-screen p-5 container mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center my-20 gap-5">
        <h1 className="text-4xl font-bold mb-4">
          Nuestro <span className="text-[var(--primaryGreen)]">Proceso</span>
        </h1>
        <p className="text-light text-xl h-full">
          Ofrecemos una gama completa de servicios de desarrollo de software,
          desde la conceptualización hasta el despliegue y mantenimiento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 gap-y-20 lg:gap-y-5">
        {steps.map((s) => {
          const articleColor = s.selected
            ? "text-[var(--primaryGreen)]"
            : "text-[var(--primaryYellow)]";
          const numberSize = s.selected ? "text-5xl" : "text-4xl";
          const titleSize = s.selected ? "text-4xl" : "text-3xl";
          const pSize = s.selected ? "text-xl" : "text-lg";
          const iconBorder = s.selected
            ? "border-[var(--primaryGreen)]"
            : "border-[var(--primaryYellow)]";
          const iconBeforeBg = s.selected
            ? "before:bg-[var(--primaryGreen)]"
            : "before:bg-[var(--primaryYellow)]";
          const iconSize = s.selected
            ? "before:w-4 before:h-4 h-10 w-10"
            : "before:w-3 before:h-3 h-9 w-9";

          return (
            <article
              key={s.number}
              className={`flex flex-col items-center justify-center gap-4 ${articleColor}`}
            >
              <h3 className={`${numberSize} font-bold`}>{s.number}</h3>

              <i
                className={`border ${iconBorder} rounded-full p-2 ${iconBeforeBg} before:content-[''] ${iconSize} before:rounded-full flex items-center justify-center`}
              ></i>

              <h2 className={`${titleSize} font-bold`}>{s.title}</h2>
              <p className={`text-light ${pSize} text-center`}>
                {s.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Process;
