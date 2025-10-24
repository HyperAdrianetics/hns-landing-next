import React from "react";
import Image from "next/image";
import hypernticsLogoHybrid from "../../../public/logo-full-hybrid.svg";
import linkedinLogo from "../assets/icons/linkedin.svg";
import githubLogo from "../assets/icons/github.svg";
import xLogo from "../assets/icons/x.svg";

const Footer = () => {
  return (
    <footer className="min-h-screen bg-[#050710] flex flex-col ">
      <div className="flex flex-col lg:flex-row items-start justify-center p-5 gap-5 text-center lg:text-left font-light container mx-auto my-10">
        <div className="lg:w-3/12 w-full h-full font-medium">
          <ul className="flex flex-col gap-5">
            <li>
              <a href="#about">Nosotros</a>
            </li>
            <li>
              <a href="#services">Servicios</a>
            </li>
            <li>
              <a href="#process">Proceso</a>
            </li>
            <li>
              <a href="#contact">Contacto</a>
            </li>
          </ul>
        </div>
        <div className="lg:w-3/12 w-full h-full">
          <ul className="flex flex-col gap-5">
            <li>
              <a href="mailto:contacto@hypernetics.com.mx">
                contacto@hypernetics.com.mx
              </a>
            </li>
            <li>
              <a href="tel:+525544843991">+52 (55) 4484-3991</a>
            </li>
            <li>Ciudad de México | Querétaro</li>
            <li>Social links:</li>
            <li className="flex gap-5 justify-center lg:justify-start">
              <a
                href="https://www.linkedin.com/company/hypernetics-mx/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Hypernetics"
              >
                <Image src={linkedinLogo} alt="LinkedIn" />
              </a>
              <a
                href="https://github.com/hypernetics-mx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub de Hypernetics"
              >
                <Image src={githubLogo} alt="GitHub" />
              </a>
              <a
                href="https://x.com/hyperneticsmx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) de Hypernetics"
              >
                <Image src={xLogo} alt="X (Twitter)" />
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:w-4/12 w-full h-full">
          <ul className="flex flex-col gap-5">
            <li>
              <a href="/aviso-de-privacidad" className="hover:text-[var(--primaryGreen)] transition-colors">
                Aviso de Privacidad
              </a>
            </li>
            <li>
              <a href="/terminos-y-condiciones" className="hover:text-[var(--primaryGreen)] transition-colors">
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:w-3/12 w-full h-full flex flex-col gap-5">
          <p className="text-[var(--primaryYellow)]">
            Transformamos ideas en soluciones tecnológicas innovadoras.
            Desarrollo de software personalizado que impulsa el crecimiento de
            tu negocio.
          </p>
          <a
            href="#contact"
            className="block text-[var(--primaryGreen)] hover:text-[var(--primaryYellow)] border-2 border-[var(--primaryGreen)] hover:border-[var(--primaryYellow)] focus:ring-4 focus:outline-none focus:ring-[var(--primaryGreen)] font-bold rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
          >
            Comenzar Proyecto
          </a>

          <small>Hypernetics © 2025 All rights reserved</small>
        </div>
      </div>

      <div className="w-12/12 flex items-center justify-center p-10">
        <Image
          src={hypernticsLogoHybrid}
          alt="Hypernetics Logo"
          className="w-full lg:w-[600px]"
        />
      </div>
    </footer>
  );
};

export default Footer;
