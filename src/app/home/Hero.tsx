import Link from "next/link";
import Image from "next/image";
import React from "react";
import arrowRight from "../assets/icons/arrow-right.svg";
import hyperneticsLogo from "../../../public/hypernetics-logo.svg";

const Hero = () => {
  return (
    <div className="bg-color-explosion h-dvh flex justify-end">
      <div className=" lg:w-5/12 bg-[rgba(255,255,255,0.02)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[7.3px] [-webkit-backdrop-filter:blur(7.3px)]  items-end justify-start h-full p-6 hidden lg:flex">
        <Image src={hyperneticsLogo} alt="Hypernetics Logo" />
      </div>

      <div className="hidden lg:block lg:w-2/12"></div>

      <div className="w-12/12 lg:w-5/12 flex items-end p-5 lg:p-0">
        <article className="lg:h-full p-4 lg:p-6 flex flex-col justify-end rounded-2xl lg:rounded-none bg-[rgba(255,255,255,0.08)] lg:bg-[rgba(255,255,255,0.02)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[7.3px] [-webkit-backdrop-filter:blur(7.3px)]">
          <h1 className="text-4xl font-medium">
            Transformamos tus ideas en soluciones digitales
          </h1>
          <p className="text-lg font-light">
            Desarrollamos software a la medida que impulsa tu negocio hacia el
            futuro. Tecnología de vanguardia, diseño excepcional y resultados
            garantizados.
          </p>
          <Link
            href="#"
            className="text-[var(--primaryGreen)] font-bold flex items-center gap-2"
          >
            Descubre lo que hacemos
            <Image src={arrowRight} alt="Arrow Right" />
          </Link>
        </article>
      </div>
    </div>
  );
};

export default Hero;
