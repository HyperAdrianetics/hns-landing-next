import React from "react";
import Image from "next/image";
import vector from "../assets/icons/vector.svg";
import quality from "../assets/icons/quality.svg";
import handshake from "../assets/icons/handshake.svg";
import rocket from "../assets/icons/rocket.svg";
import { stats, statAccentClass } from "./stats";

const cards = [
  {
    title: "Enfoque a resultados",
    subtitle: "Código con propósito. Resultados para tu negocio.",
    icon: vector,
    hairline: "hairline--brand",
  },
  {
    title: "Calidad garantizada",
    subtitle: "Software robusto que perdura.",
    icon: quality,
    hairline: "hairline--green",
  },
  {
    title: "Colaboración transparente",
    subtitle: "Tu equipo extendido.",
    icon: handshake,
    hairline: "hairline--gold",
  },
  {
    title: "Innovación constante",
    subtitle: "Innovación que te diferencia.",
    icon: rocket,
    hairline: "hairline--brand",
  },
];

const About = () => {
  return (
    <section id="about" className="container mx-auto px-5 py-24">
      <p className="section-label">Nosotros</p>
      <div className="mt-4 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold text-white">
            Somos <span className="text-[var(--primaryGreen)]">Hypernetics</span>
          </h2>
          <p className="mt-4 text-xl font-light text-[#b9bdc9]">
            Somos un equipo de desarrolladores apasionados. Combinamos
            experiencia técnica y visión estratégica para crear software que
            transforma tu negocio.
          </p>
        </div>
        <div className="flex gap-10 lg:justify-end">
          {stats.map((stat) => (
            <div key={stat.value} className="lg:text-right">
              <p
                className={`font-display text-4xl font-bold ${
                  statAccentClass[stat.accent]
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[#8b91a3]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.title}
            className="glass-card glass-card--hover flex flex-col gap-3 p-8"
          >
            <div className={`hairline ${card.hairline}`} />
            <Image src={card.icon} alt="" width={30} />
            <h3 className="font-bold text-white">{card.title}</h3>
            <p className="font-light text-[#b9bdc9]">{card.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default About;
