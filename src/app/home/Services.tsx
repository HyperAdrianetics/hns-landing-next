import React from "react";

const Services = () => {
  return (
    <section id="services" className="min-h-screen p-5 container mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Somos <span className="text-[var(--primaryGreen)]">Hypernetics</span>
      </h1>
      <p className="text-light mb-15 text-xl">
        Somos un equipo de desarrolladores apasionados. Combinamos experiencia
        técnica y visión estratégica para crear software que transforma tu
        negocio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <article className="col-span-1 md:col-span-2 lg:col-span-2 flex items-start justify-end flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)]  lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)]">
            Desarrollo de Software <br /> Personalizado
          </h2>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-center flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)]">
            Aplicaciones Móviles
          </h2>
          <p className="my-4">
            Apps nativas e hibridas para iOS y Android que conectan con tus
            usuarios.
          </p>
          <ul className="list-disc list-inside">
            <li>React Nativel</li>
            <li>Flutler</li>
            <li>Diseño UX/UI</li>
            <li>integración APis</li>
          </ul>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-end flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)]">
            Desarrollo Web
          </h2>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-end flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryYellow)]">
            Arquitectura de Datos
          </h2>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-1 flex items-start justify-end flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryGreen)]">
            Soluciones Cloud
          </h2>
        </article>
        <article className="col-span-1 md:col-span-2 lg:col-span-2 flex items-start justify-end flex-col rounded-lg p-10 border w-full bg-[var(--primaryBlue)] border-[var(--secondaryBlue)] lg:min-h-[20rem]">
          <h2 className="text-2xl font-bold text-[var(--primaryYellow)]">
            Consultoria Técnica
          </h2>
        </article>
      </div>
    </section>
  );
};

export default Services;
