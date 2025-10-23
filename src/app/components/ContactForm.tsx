import React from "react";

const ContactForm = () => {
  return (
    <form className="bg-[#151922] text-white flex flex-col gap-8 py-8 lg:px-15 px-8 rounded-xl w-full">
      <input
        type="text"
        placeholder="Nombre"
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <input
        type="phone"
        placeholder="Teléfono"
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <select className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]">
        <option value="">Tipo de proyecto</option>
        <option value="">Desarrollo web</option>
        <option value="">Desarrollo móvil</option>
        <option value="">Marketing digital</option>
        <option value="">Otro</option>
      </select>
      <select className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]">
        <option value="">Presupuesto estimado</option>
        <option value="">Menos de $10,000</option>
        <option value="">$10,000 - $20,000</option>
        <option value="">$20,000 - $50,000</option>
        <option value="">$50,000 - $100,000</option>
        <option value="">$100,000+</option>
      </select>
      <input
        type="text"
        placeholder="Empresa o nombre del proyecto"
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      />
      <textarea
        placeholder="Cuéntanos sobre tu proyecto"
        rows={1}
        className="py-3 border-x-0 border-t-0 border-b border-white bg-transparent focus:outline-none focus:border-[var(--primaryGreen)]  focus:text-[var(--primaryGreen)] placeholder:focus:text-[var(--primaryGreen)]"
      ></textarea>
      <button
        type="submit"
        className="bg-[var(--primaryGreen)] py-4 mt-5 rounded-xl text-black font-bold"
      >
        Enviar
      </button>
    </form>
  );
};

export default ContactForm;
