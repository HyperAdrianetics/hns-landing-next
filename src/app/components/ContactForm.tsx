"use client";

import React, { useState } from "react";
import Link from "next/link";

const ContactForm = () => {
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!acceptedPrivacy) {
      alert("Por favor acepta el Aviso de Privacidad para continuar.");
      return;
    }

    // Aquí iría la lógica de envío del formulario
    console.log("Formulario enviado");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#151922] text-white flex flex-col gap-8 py-8 lg:px-15 px-8 rounded-xl w-full"
    >
      <input
        type="text"
        placeholder="Nombre"
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <input
        type="tel"
        placeholder="Teléfono"
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <select
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      >
        <option value="">Tipo de proyecto</option>
        <option value="web">Desarrollo web</option>
        <option value="mobile">Desarrollo móvil</option>
        <option value="marketing">Marketing digital</option>
        <option value="other">Otro</option>
      </select>
      <select
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      >
        <option value="">Presupuesto estimado</option>
        <option value="<10k">Menos de $10,000</option>
        <option value="10k-20k">$10,000 - $20,000</option>
        <option value="20k-50k">$20,000 - $50,000</option>
        <option value="50k-100k">$50,000 - $100,000</option>
        <option value="100k+">$100,000+</option>
      </select>
      <input
        type="text"
        placeholder="Empresa o nombre del proyecto"
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <textarea
        placeholder="Cuéntanos sobre tu proyecto"
        rows={1}
        required
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      ></textarea>

      {/* Checkbox de Aviso de Privacidad */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy-policy"
          checked={acceptedPrivacy}
          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          required
          className="mt-1 w-4 h-4 accent-[var(--primaryGreen)] cursor-pointer"
        />
        <label htmlFor="privacy-policy" className="text-sm text-gray-300 leading-relaxed cursor-pointer">
          He leído y acepto el{" "}
          <Link
            href="/aviso-de-privacidad"
            target="_blank"
            className="text-[var(--primaryGreen)] hover:underline font-medium"
          >
            Aviso de Privacidad
          </Link>
          {" "}de Hypernetics, S.A. de C.V.
        </label>
      </div>

      <button
        type="submit"
        className="bg-[var(--primaryGreen)] py-4 mt-5 rounded-xl text-black font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!acceptedPrivacy}
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
