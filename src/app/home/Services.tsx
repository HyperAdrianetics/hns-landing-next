import React from "react";

const services = [
  {
    title: "Desarrollo de Software Personalizado",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--brand",
    span: "md:col-span-2 lg:col-span-2",
    description:
      "Creamos soluciones a medida que se adaptan a tu negocio, integrando tecnología de vanguardia, diseño centrado en el usuario y resultados medibles.",
    items: [],
  },
  {
    title: "Aplicaciones Móviles",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--green",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Apps nativas e hibridas para iOS y Android que conectan con tus usuarios.",
    items: ["React Native", "Flutter", "Diseño UX/UI", "Integración de APIs"],
  },
  {
    title: "Desarrollo Web",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--green",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Desarrollamos sitios y aplicaciones web responsivas, con alto rendimiento y visibilidad para conectar con tu audiencia y potenciar tu marca en línea.",
    items: [],
  },
  {
    title: "Arquitectura de Datos",
    titleColor: "text-[var(--primaryYellow)]",
    hairline: "hairline--gold",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Diseñamos infraestructuras de datos sólidas: almacenamiento, procesamiento y análisis que te permiten convertir información en decisiones estratégicas.",
    items: [],
  },
  {
    title: "Soluciones Cloud",
    titleColor: "text-[var(--primaryGreen)]",
    hairline: "hairline--green",
    span: "md:col-span-2 lg:col-span-1",
    description:
      "Migramos y optimizamos tus servicios en la nube para escalar con seguridad, agilidad y eficiencia, brindando flexibilidad y reducción de costos.",
    items: [],
  },
  {
    title: "Consultoría Técnica",
    titleColor: "text-[var(--primaryYellow)]",
    hairline: "hairline--brand",
    span: "md:col-span-2 lg:col-span-2",
    description:
      "Asesoramos en tecnología y procesos: revisión de arquitectura, selección de herramientas, adopción de buenas prácticas y roadmap de innovación.",
    items: [],
  },
];

const Services = () => {
  return (
    <section id="services" className="container mx-auto px-5 py-24">
      <p className="section-label">Servicios</p>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-4xl font-bold text-white">
          Nuestros <span className="text-[var(--primaryGreen)]">Servicios</span>
        </h2>
        <p className="max-w-xl text-xl font-light text-[#b9bdc9]">
          Ofrecemos una gama completa de servicios de desarrollo de software,
          desde la conceptualización hasta el despliegue y mantenimiento.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.title}
            className={`glass-card glass-card--hover flex w-full flex-col items-start p-8 lg:min-h-[18rem] ${service.span}`}
          >
            <div className={`hairline ${service.hairline}`} />
            <h3 className={`text-2xl font-bold ${service.titleColor}`}>
              {service.title}
            </h3>
            <p className="my-4 font-light text-[#b9bdc9]">
              {service.description}
            </p>
            {service.items.length > 0 && (
              <ul className="list-inside list-disc font-light text-[#b9bdc9]">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
