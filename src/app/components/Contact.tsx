import type { CSSProperties } from "react";
import Image from "next/image";
import InView from "./InView";
import ContactForm from "./ContactForm";
import whiteEnvelope from "../assets/icons/envelope-white-icon.svg";
import whitePhone from "../assets/icons/phone-white-icon.svg";

const Contact = () => {
  return (
    <InView as="section" id="contact" className="section">
      <div className="container mx-auto grid gap-14 px-5 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <p className="section-label">Contacto</p>
          <h2 className="contact-title">
            <span className="mask-line">
              <span>¿Tienes una idea?</span>
            </span>
            <span className="mask-line" style={{ "--line": 1 } as CSSProperties}>
              <span className="text-gradient-brand">Démosle vida.</span>
            </span>
          </h2>
          <ul className="mt-10 flex flex-col gap-4 text-[#b9bdc9]">
            <li>
              <a
                href="mailto:contacto@hypernetics.com.mx"
                className="flex items-center gap-3 transition-colors hover:text-[var(--primaryGreen)]"
              >
                <Image src={whiteEnvelope} alt="" width={16} height={12} />
                contacto@hypernetics.com.mx
              </a>
            </li>
            <li>
              <a
                href="tel:+525544843991"
                className="flex items-center gap-3 transition-colors hover:text-[var(--primaryGreen)]"
              >
                <Image src={whitePhone} alt="" width={12} height={12} />
                +52 (55) 4484-3991
              </a>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </InView>
  );
};

export default Contact;
