"use client";
import React, { useState } from "react";
import Image from "next/image";
import logoHypernetics from "../../../public/hypernetics-logo.svg";
import logoHyperneticsH from "../../../public/hypernetics-h.svg";

const navLinks = [
  { name: "Nosotros", href: "#about" },
  { name: "Servicios", href: "#services" },
  { name: "Proceso", href: "#process" },
  { name: "Tecnologías", href: "#technologies" },
  { name: "Contacto", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="relative flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(19,21,30,0.65)] px-5 py-2.5 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] lg:w-auto lg:justify-start">
        <a href="#top" className="flex shrink-0 items-center">
          <Image
            src={logoHyperneticsH}
            alt="Logo Hypernetics"
            className="hidden h-8 w-auto lg:block"
            priority
          />
          <Image
            src={logoHypernetics}
            alt="Logo Hypernetics"
            className="h-8 w-auto lg:hidden"
            priority
          />
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm font-semibold text-[var(--primaryYellow)] transition-colors hover:text-[var(--primaryGreen)]"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="btn-primary hidden text-sm !px-5 !py-2 lg:inline-flex"
        >
          Comenzar Proyecto
        </a>

        <button
          onClick={toggleMenu}
          type="button"
          className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-[var(--primaryGreen)] lg:hidden"
          aria-controls="navbar-dropdown"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Abrir menú principal</span>
          <svg
            className="h-5 w-5 text-[var(--primaryYellow)]"
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

        <div
          id="navbar-dropdown"
          className={`${isOpen ? "block" : "hidden"} glass-card absolute left-0 right-0 top-[calc(100%+0.5rem)] !bg-[rgba(19,21,30,0.92)] p-4 lg:hidden`}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 font-semibold text-[var(--primaryYellow)] transition-colors hover:text-[var(--primaryGreen)]"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn-primary w-full"
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
