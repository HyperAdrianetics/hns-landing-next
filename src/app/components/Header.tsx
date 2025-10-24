"use client";
import React, { useState } from "react";
import Image from "next/image";
import logoHypernetics from "../../../public/hypernetics-logo.svg";
import logoHyperneticsMobile from "../../../public/hypernetics-h.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-transparent fixed left-0  w-full top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Botón del menú móvil */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-[var(--primaryGreen)]"
          aria-controls="navbar-dropdown"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Abrir menú principal</span>
          <svg
            className="w-5 h-5 text-[var(--primaryYellow)]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M2 2L15 12M15 2L2 12" : "M1 1h15M1 7h15M1 13h15"}
            />
          </svg>
        </button>

        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src={logoHypernetics}
            alt="Logo Hypernetics"
            className="h-12 w-auto  lg:hidden"
            priority
          />
          <Image
            src={logoHyperneticsMobile}
            alt="Logo Hypernetics"
            className="h-12 w-auto hidden lg:block"
            priority
          />
        </a>

        <div className="w-5 h-5 lg:hidden">&nbsp;</div>

        {/* Links del menú */}
        <div
          id="navbar-dropdown"
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:block md:w-auto transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col font-bold p-4 md:p-0 md:px-3 mt-4  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  items-center  md:bg-transparent gap-2 lg:gap-0  bg-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[7.3px] [-webkit-backdrop-filter:blur(7.3px)] lg:bg-transparent lg:shadow-none lg:backdrop-blur-0 lg:[-webkit-backdrop-filter:blur(0px)]">
            {[
              { name: "Home", href: "#top" },
              { name: "Nosotros", href: "#about" },
              { name: "Servicios", href: "#services" },
              { name: "Proceso", href: "#process" },
              { name: "Tecnologías", href: "#technologies" },
              { name: "Contacto", href: "#contact" },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block py-2 px-3 rounded-sm text-[var(--primaryYellow)] hover:text-[var(--primaryGreen)] md:p-0"
                >
                  {item.name}
                </a>
              </li>
            ))}

            <li>
              <a
                href="#contact"
                className="block text-[var(--primaryYellow)] hover:text-[var(--primaryGreen)] border-2 border-[var(--primaryYellow)] hover:border-[var(--primaryGreen)] focus:ring-4 focus:outline-none focus:ring-[var(--primaryGreen)] font-bold rounded-lg  px-5 py-2.5 text-center me-2 mb-2"
              >
                Comenzar Proyecto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
