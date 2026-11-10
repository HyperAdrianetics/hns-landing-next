import Link from "next/link";
import InView from "../components/InView";
import ServiceList, { type Service } from "./ServiceList";

const services: Service[] = [
  {
    title: "Desarrollo de Software Personalizado",
    description:
      "Creamos soluciones a medida que se adaptan a tu negocio, integrando tecnología de vanguardia, diseño centrado en el usuario y resultados medibles.",
  },
  {
    title: "Aplicaciones Móviles",
    description:
      "Apps nativas e híbridas para iOS y Android que conectan con tus usuarios.",
    items: ["React Native", "Flutter", "Diseño UX/UI", "Integración de APIs"],
  },
  {
    title: "Desarrollo Web",
    description:
      "Desarrollamos sitios y aplicaciones web responsivas, con alto rendimiento y visibilidad para conectar con tu audiencia y potenciar tu marca en línea.",
  },
  {
    title: "Arquitectura de Datos",
    description:
      "Diseñamos infraestructuras de datos sólidas: almacenamiento, procesamiento y análisis que te permiten convertir información en decisiones estratégicas.",
  },
  {
    title: "Soluciones Cloud",
    description:
      "Migramos y optimizamos tus servicios en la nube para escalar con seguridad, agilidad y eficiencia, brindando flexibilidad y reducción de costos.",
  },
  {
    title: "Consultoría Técnica",
    description:
      "Asesoramos en tecnología y procesos: revisión de arquitectura, selección de herramientas, adopción de buenas prácticas y roadmap de innovación.",
  },
];

const Services = () => {
  return (
    <InView as="section" id="services" className="section container mx-auto px-5">
      <div className="section-head">
        <div>
          <p className="section-label">Servicios</p>
          <h2 className="section-title">
            <span className="mask-line">
              <span>Lo que hacemos</span>
            </span>
          </h2>
        </div>
        <Link href="#contact" className="btn-paint">
          Platícanos tu proyecto <span aria-hidden>→</span>
        </Link>
      </div>
      <ServiceList services={services} />
    </InView>
  );
};

export default Services;
