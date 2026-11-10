import Link from "next/link";
import HeroLogoLiquid from "../components/liquid/HeroLogoLiquid";

// Hero "B": la marca H gigante funciona como ventana a la pintura líquida y el
// titular se parte en dos esquinas que la enmarcan. El <h1> es uno solo; con
// subgrid sus dos líneas caen en filas distintas de la retícula del hero.
const Hero = () => {
  return (
    <section id="top" className="hero">
      <div aria-hidden className="hero-field hero-field--indigo" />
      <div aria-hidden className="hero-field hero-field--magenta" />
      <HeroLogoLiquid />
      <div className="hero-inner container mx-auto px-5">
        <p className="section-label hero-label">
          Desarrollo de software a la medida
        </p>
        <h1 className="hero-title">
          <span className="hero-line hero-line--1">
            Transformamos
            <br />
            tus <span className="text-gradient-brand">ideas</span>
          </span>{" "}
          <span className="hero-line hero-line--2">
            en soluciones
            <br />
            digitales
          </span>
        </h1>
        <div className="hero-cta">
          <Link href="#services" className="btn-primary">
            Descubre lo que hacemos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
