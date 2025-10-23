import React from "react";
import ContactForm from "./ContactForm";
import Image from "next/image";
import whiteEnvelope from "../assets/icons/envelope-white-icon.svg";
import whitePhone from "../assets/icons/phone-white-icon.svg";

const Contact = () => {
  return (
    <section id="contact" className="bg-contacto p-5">
      <div className="w-full flex flex-col lg:flex-row gap-4 container mx-auto py-20">
        <div className="lg:w-6/12 w-full flex items-start justify-center flex-col gap-y-12">
          <h2 className="text-6xl font-bold text-[var(--primaryYellow)]">
            ¿Tienes una <br />
            idea? <br />
            <span className="text-[var(--primaryGreen)]">Démosle vida.</span>
          </h2>

          <p className="flex items-center gap-2">
            <Image src={whiteEnvelope} alt="" width={16} height={12} />
            contacto@hypernetics.com
          </p>

          <p className="flex items-center gap-2">
            <Image src={whitePhone} alt="" width={16} height={12} />
            +52 (55) 4484-3991
          </p>
        </div>

        <div className="lg:w-6/12 w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
