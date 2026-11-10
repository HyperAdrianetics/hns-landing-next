import Image from "next/image";
import linkedinLogo from "../assets/icons/linkedin.svg";
import githubLogo from "../assets/icons/github.svg";
import xLogo from "../assets/icons/x.svg";

const socials = [
  { href: "https://www.linkedin.com/company/hypernetics-mx/", label: "LinkedIn de Hypernetics", icon: linkedinLogo },
  { href: "https://github.com/hypernetics-mx", label: "GitHub de Hypernetics", icon: githubLogo },
  { href: "https://x.com/hyperneticsmx", label: "X (Twitter) de Hypernetics", icon: xLogo },
];

// Footer compacto: una fila de enlaces y, como firma, el nombre de la marca
// en letra enorme y casi del color del fondo.
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container mx-auto px-5">
        <div className="flex flex-col gap-6 border-t border-[rgba(255,255,255,0.08)] pt-8 text-sm text-[#8b91a3] md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href="/aviso-de-privacidad" className="transition-colors hover:text-[var(--primaryGreen)]">
                Aviso de Privacidad
              </a>
            </li>
            <li>
              <a href="/terminos-y-condiciones" className="transition-colors hover:text-[var(--primaryGreen)]">
                Términos y Condiciones
              </a>
            </li>
            <li>Ciudad de México | Querétaro</li>
          </ul>
          <ul className="flex gap-5">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="block opacity-70 transition-opacity hover:opacity-100"
                >
                  <Image src={s.icon} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p aria-hidden className="footer-signature" data-text="HYPERNETICS" />
        <small className="block pb-8 text-[#8b91a3]">
          Hypernetics © {new Date().getFullYear()} — Todos los derechos
          reservados
        </small>
      </div>
    </footer>
  );
};

export default Footer;
