import React from "react";
import Image from "next/image";
import vector from "../assets/icons/vector.svg";
import quality from "../assets/icons/quality.svg";
import handshake from "../assets/icons/handshake.svg";
import rocket from "../assets/icons/rocket.svg";

const About = () => {
  const cards = [
    {
      title: "Enfoque a resultados",
      subtitle:
        "software robusto que perduraCódigo con propósito. Resultados para tu negocio.",
      icon: vector,
      highlight: false,
    },
    {
      title: "Calidad garantizada",
      subtitle: "software robusto que perdura",
      icon: quality,
      highlight: true,
    },
    {
      title: "Colaboración transparente",
      subtitle: "tu equipo extendido",
      icon: handshake,
      highlight: false,
    },
    {
      title: "Innovación constante",
      subtitle: "Innovación que te diferencia",
      icon: rocket,
      highlight: false,
    },
  ];

  const pills = [
    {
      value: "20+",
      label: "Proyectos Completados",
      h2Class:
        "text-[6rem] font-extrabold leading-none text-[var(--primaryYellow)] [text-shadow:0_0_16px_var(--primaryYellow)]",
    },
    {
      value: "98%",
      label: "Satisfacción del cliente",
      h2Class:
        "text-[6rem] font-extrabold leading-none text-[var(--primaryGreen)] [text-shadow:0_0_16px_var(--primaryGreen)]",
    },
    {
      value: "24/7",
      label: "Soporte sostenible ",
      h2Class:
        "text-[6rem] font-extrabold leading-none text-white [text-shadow:0_0_16px_#ffffff]",
    },
  ];
  return (
    <section className="min-h-screen p-5 container mx-auto">
      <div className="mt-15 flex flex-col lg:flex-row gap-5 lg:gap-20 lg:items-center">
        {/* CARD SECTION  */}
        <div className="lg:w-8/12 w-full">
          <h1 className="text-4xl font-bold mb-4">
            Somos{" "}
            <span className="text-[var(--primaryGreen)]">Hypernetics</span>
          </h1>
          <p className="text-light mb-15 text-xl">
            Somos un equipo de desarrolladores apasionados. Combinamos
            experiencia técnica y visión estratégica para crear software que
            transforma tu negocio.
          </p>

          <div className="flex flex-col lg:flex-row flex-wrap justify-start gap-5 w-full h-fit">
            {cards.map((card, idx) => (
              <article
                key={idx}
                className={`flex items-start justify-center flex-col gap-3 rounded-lg p-10 border lg:w-5/12 w-full  ${
                  card.highlight
                    ? "bg-[#A7CF9E] border-[#DDECDA]"
                    : "bg-[var(--primaryBlue)] border-[var(--secondaryBlue)]"
                }`}
              >
                <Image src={card.icon} alt="icon" width={30} />
                <h2
                  className={`font-bold ${
                    card.highlight ? "text-[#1F2230]" : "text-white"
                  }`}
                >
                  {card.title}
                </h2>
                <p
                  className={`font-normal ${
                    card.highlight ? "text-[#1F2230]" : "text-white"
                  }`}
                >
                  {card.subtitle}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* PILL SECTION   */}
        <div className="mt-15 lg:mt-0 flex flex-col gap-10 lg:w-4/12 w-full">
          {pills.map((pill, i) => (
            <article
              key={i}
              className="flex flex-col items-start justify-center rounded-[9999px] bg-gradient-to-br from-[#1c1f24] to-[#111217] shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.08)] px-15 py-10 text-left"
            >
              <h2 className={`${pill.h2Class} lg:text-[3rem]`}>{pill.value}</h2>
              <p className="text-white text-2xl lg:text-xl mt-2">
                {pill.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
