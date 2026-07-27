import React from "react";
import ContactForm from "./ContactForm";
import Image from "next/image";
import whiteEnvelope from "../assets/icons/envelope-white-icon.svg";
import whitePhone from "../assets/icons/phone-white-icon.svg";

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto flex flex-col gap-10 px-5 lg:flex-row">
        <div className="flex w-full flex-col justify-center gap-y-10 lg:w-6/12">
          <p className="section-label">Contacto</p>
          <h2 className="font-display text-6xl font-bold leading-[1.1] text-[var(--primaryYellow)]">
            ¿Tienes una idea?{" "}
            <span className="text-gradient-brand">Démosle vida.</span>
          </h2>
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-2">
              <Image src={whiteEnvelope} alt="" width={16} height={12} />
              contacto@hypernetics.com
            </p>
            <p className="flex items-center gap-2">
              <Image src={whitePhone} alt="" width={12} height={12} />
              +52 (55) 4484-3991
            </p>
          </div>
        </div>

        <div className="w-full lg:w-6/12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
