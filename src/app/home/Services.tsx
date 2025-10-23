import React from "react";

const Services = () => {
  return (
    <section id="services" className="min-h-screen p-5 container mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center mb-15 gap-5">
        <h1 className="text-4xl font-bold mb-4">
          Nuestros <span className="text-[var(--primaryGreen)]">Servicios</span>
        </h1>
        <p className="text-light text-xl h-full">
          Ofrecemos una gama completa de servicios de desarrollo de software,
          desde la conceptualización hasta el despliegue y mantenimiento.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <article className="col-span-1 md:col-span-2 lg:col-span-2 flex items-start justify-start flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)]  lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)]">
            Desarrollo de Software <br /> Personalizado
          </h2>
          <p className="my-4">
            Creamos soluciones a medida que se adaptan a tu negocio, integrando
            tecnología de vanguardia, diseño centrado en el usuario y resultados
            medibles.
          </p>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-center flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem] relative">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(63,183,36,0.15)_0%,_rgba(127,231,122,0.05)_30%,_rgba(6,8,17,1)_100%)] w-full h-full absolute top-0 left-0 z-0"></div>
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)] z-10">
            Aplicaciones Móviles
          </h2>
          <p className="my-4 z-10">
            Apps nativas e hibridas para iOS y Android que conectan con tus
            usuarios.
          </p>
          <ul className="list-disc list-inside z-10">
            <li>React Nativel</li>
            <li>Flutler</li>
            <li>Diseño UX/UI</li>
            <li>integración APis</li>
          </ul>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-start flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)]">
            Desarrollo Web
          </h2>
          <p className="my-4">
            Desarrollamos sitios y aplicaciones web responsivas, con alto
            rendimiento y visibilidad para conectar con tu audiencia y potenciar
            tu marca en línea.
          </p>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-start flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryYellow)]">
            Arquitectura de Datos
          </h2>
          <p className="my-4">
            Diseñamos infraestructuras de datos sólidas: almacenamiento,
            procesamiento y análisis que te permiten convertir información en
            decisiones estratégicas.
          </p>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-start flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)]">
            Soluciones Cloud
          </h2>
          <p className="my-4">
            Migramos y optimizamos tus servicios en la nube para escalar con
            seguridad, agilidad y eficiencia, brindando flexibilidad y reducción
            de costos.
          </p>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-2 flex items-start justify-start flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryYellow)]">
            Consultoria Técnica
          </h2>
          <p className="my-4">
            Asesoramos en tecnología y procesos: revisión de arquitectura,
            selección de herramientas, adopción de buenas prácticas y roadmap de
            innovación.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Services;
