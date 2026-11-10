import Header from "./components/Header";
import Hero from "./home/Hero";
import Manifesto from "./home/Manifesto";
import Services from "./home/Services";
import Process from "./home/Process";
import Pause from "./home/Pause";
import Technologies from "./home/Technologies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Process />
        <Pause />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
