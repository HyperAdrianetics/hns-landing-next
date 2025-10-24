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
    <section id="process" className="min-h-screen p-5 container mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center my-20 gap-5">
        <h1 className="text-4xl font-bold mb-4">
          Nuestro <span className="text-[var(--primaryGreen)]">Proceso</span>
        </h1>
        <p className="text-light text-xl h-full">
          Ofrecemos una gama completa de servicios de desarrollo de software,
          desde la conceptualización hasta el despliegue y mantenimiento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 gap-y-20 lg:gap-y-5">
        {steps.map((s) => {
          const articleColor = s.selected
            ? "text-[var(--primaryGreen)]"
            : "text-[var(--primaryYellow)]";
          const articleMarginTop = s.selected ? "xl:mt-6" : "xl:mt-0";
          const articleGbColor = s.selected
            ? "bg-[var(--primaryGreen)]"
            : "bg-[var(--primaryYellow)]";
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
            ? "before:w-4 before:h-4 h-10 w-10 min-w-10 min-h-10"
            : "before:w-3 before:h-3 h-9 w-9 min-w-9 min-h-9";

          return (
            <article
              key={s.number}
              className={`flex flex-col items-center justify-center gap-4 ${articleColor} ${articleMarginTop}`}
            >
              <h3 className={`${numberSize} font-bold`}>{s.number}</h3>

              <div className="flex items-center justify-center w-full gap-4">
                <div
                  className={`hidden xl:block h-[0.5px] w-full ${articleGbColor}`}
                ></div>
                <i
                  className={`border ${iconBorder} rounded-full p-2 ${iconBeforeBg} before:content-[''] ${iconSize} before:rounded-full flex items-center justify-center`}
                ></i>
                <div
                  className={`hidden xl:block h-[0.5px] w-full ${articleGbColor}`}
                ></div>
              </div>

              <h2 className={`${titleSize} font-bold`}>{s.title}</h2>
              <p className={`text-light ${pSize} text-center`}>
                {s.description}
              </p>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-left w-full bg-trabajemos p-5 lg:px-40 min-h-[200px] rounded-lg lg:rounded-full relative mt-20 lg:mt-52 gap-y-10 lg:gap-y-0">
        <div className="w-full h-full backdrop-blur-md backdrop-filter-blur-md absolute top-0 left-0 z-0 rounded-lg lg:rounded-full "></div>
        <div className="z-10 flex flex-col items-center lg:items-start gap-y-5">
          <h2 className="text-5xl font-bold text-[var(--primaryYellow)]">
            Trabajemos juntos
          </h2>
          <p className="font-bold text-xl">
            Convierte tu visión en una{" "}
            <span className="text-[var(--primaryGreen)]">
              experiencia digital.
            </span>
          </p>
        </div>

        <button className="bg-[var(--primaryGreen)] font-bold text-black px-5 py-3 rounded-lg z-10 lg:ml-auto min-w-[200px] w-full lg:w-auto">
          Contáctanos
        </button>
      </div>
    </section>
  );
};

export default Process;
