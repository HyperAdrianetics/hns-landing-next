import Link from "next/link";
import Image from "next/image";
import React from "react";
import arrowRight from "../assets/icons/arrow-right.svg";
import colorExplosion from "../../../public/color-explosion.png";
import HeroLiquid from "../components/HeroLiquid";
import { stats, statAccentClass } from "./stats";

const Hero = () => {
  return (
    <HeroLiquid>
      {/* El fondo opaco parece redundante con el del body, pero no lo es: con
          HTML-in-Canvas activo, Liquid dibuja esta sección sobre el canvas que
          ya la muestra, y cada píxel semitransparente se compone dos veces. Sin
          fondo, el alfa suave de la explosión se duplica y aparece un halo
          morado a su alrededor. */}
      <section
        id="top"
        className="relative min-h-dvh overflow-hidden flex items-center bg-[var(--background)]"
      >
        <div className="container mx-auto grid lg:grid-cols-[52%_48%] items-center gap-10 px-5 pt-32 pb-16">
          <div>
            <p className="section-label">Desarrollo de software a la medida</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.06] font-bold text-[var(--primaryYellow)] mt-4">
              Transformamos tus{" "}
              <span className="text-gradient-brand">ideas</span> en soluciones
              digitales
            </h1>
            <p className="text-lg font-light text-[#b9bdc9] mt-5 max-w-[46ch]">
              Desarrollamos software a la medida que impulsa tu negocio hacia
              el futuro. Tecnología de vanguardia, diseño excepcional y
              resultados garantizados.
            </p>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <Link href="#services" className="btn-primary">
                Descubre lo que hacemos
              </Link>
              <Link
                href="#process"
                className="font-display font-semibold text-[var(--primaryGreen)] flex items-center gap-2"
              >
                Nuestro proceso
                <Image src={arrowRight} alt="" />
              </Link>
            </div>
            <div className="flex gap-10 mt-12">
              {stats.map((stat) => (
                <div key={stat.value}>
                  <p
                    className={`font-display text-3xl font-bold ${
                      statAccentClass[stat.accent]
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#8b91a3] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[320px] lg:h-[480px]">
            <div aria-hidden className="hero-glow" />
            <Image
              src={colorExplosion}
              alt="Explosión de pintura multicolor, esencia visual de Hypernetics"
              priority
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-contain scale-125 drop-shadow-[0_0_50px_rgba(240,111,174,0.22)]"
            />
          </div>
        </div>
      </section>
    </HeroLiquid>
  );
};

export default Hero;
