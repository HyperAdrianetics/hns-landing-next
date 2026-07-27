import React from "react";
import Image from "next/image";
import hypernticsLogoHybrid from "../../../public/logo-full-hybrid.svg";
import linkedinLogo from "../assets/icons/linkedin.svg";
import githubLogo from "../assets/icons/github.svg";
import xLogo from "../assets/icons/x.svg";

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-[#0a0c13]">
      <div
        aria-hidden
        className="h-[2px] w-full bg-[linear-gradient(90deg,var(--accentMagenta),var(--accentGold),var(--primaryGreen))]"
      />
      <div className="container mx-auto grid gap-10 px-5 py-14 text-center text-sm font-light md:grid-cols-2 md:text-left lg:grid-cols-4">
        <div>
          <p className="font-display mb-4 font-semibold text-white">
            Navegación
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#about" className="transition-colors hover:text-[var(--primaryGreen)]">
                Nosotros
              </a>
            </li>
            <li>
              <a href="#services" className="transition-colors hover:text-[var(--primaryGreen)]">
                Servicios
              </a>
            </li>
            <li>
              <a href="#process" className="transition-colors hover:text-[var(--primaryGreen)]">
                Proceso
              </a>
            </li>
            <li>
              <a href="#contact" className="transition-colors hover:text-[var(--primaryGreen)]">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display mb-4 font-semibold text-white">Contacto</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="mailto:contacto@hypernetics.com.mx" className="transition-colors hover:text-[var(--primaryGreen)]">
                contacto@hypernetics.com.mx
              </a>
            </li>
            <li>
              <a href="tel:+525544843991" className="transition-colors hover:text-[var(--primaryGreen)]">
                +52 (55) 4484-3991
              </a>
            </li>
            <li>Ciudad de México | Querétaro</li>
            <li className="flex justify-center gap-5 md:justify-start">
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
        <div>
          <p className="font-display mb-4 font-semibold text-white">Legal</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="/aviso-de-privacidad"
                className="transition-colors hover:text-[var(--primaryGreen)]"
              >
                Aviso de Privacidad
              </a>
            </li>
            <li>
              <a
                href="/terminos-y-condiciones"
                className="transition-colors hover:text-[var(--primaryGreen)]"
              >
                Términos y Condiciones
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-5 md:items-start">
          <p className="text-[var(--primaryYellow)]">
            Transformamos ideas en soluciones tecnológicas innovadoras.
            Desarrollo de software personalizado que impulsa el crecimiento de
            tu negocio.
          </p>
          <a href="#contact" className="btn-primary">
            Comenzar Proyecto
          </a>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center gap-6 px-5 pb-10">
        <Image
          src={hypernticsLogoHybrid}
          alt="Hypernetics Logo"
          className="w-full opacity-90 lg:w-[600px]"
        />
        <small className="text-[#5d6274]">
          Hypernetics © {new Date().getFullYear()} — Todos los derechos
          reservados
        </small>
      </div>
    </footer>
  );
};

export default Footer;
