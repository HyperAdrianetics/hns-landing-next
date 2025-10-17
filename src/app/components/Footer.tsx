import React from "react";

const Footer = () => {
  return (
    <footer className="h-fit flex flex-col lg:flex-rowitems-center justify-center p-5 gap-5 text-center lg:text-left">
      <div className="lg:w-3/12 w-full h-full">
        <ul>
          <li>Nosotros</li>
          <li>Services</li>
          <li>Portfolio</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="lg:w-3/12 w-full h-full">
        <ul>
          <li>contacto@hypernetics.com</li>
          <li>+52 (55) 4484-3991</li>
          <li>Ciudad de México, México | Querétaro, México</li>
          <li>Social links</li>
        </ul>
      </div>
      <div className="lg:w-4/12 w-full h-full">
        <ul>
          <li>Política de Privacidad</li>
          <li>Términos y condiciones</li>
          <li>Cookies</li>
        </ul>
      </div>
      <div className="lg:w-3/12 w-full h-full flex flex-col gap-5">
        <p>
          Transformamos ideas en soluciones tecnológicas innovadoras. Desarrollo
          de software personalizado que impulsa el crecimiento de tu negocio.
        </p>
        <a
          href="#"
          className="block text-[var(--primaryYellow)] hover:text-[var(--primaryGreen)] border-2 border-[var(--primaryYellow)] hover:border-[var(--primaryGreen)] focus:ring-4 focus:outline-none focus:ring-[var(--primaryGreen)] font-bold rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
        >
          Comenzar Proyecto
        </a>

        <small>Hypernetics © 2025 All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
