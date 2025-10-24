import Header from "./components/Header";
import Hero from "./home/Hero";
import About from "./home/About";
import Services from "./home/Services";
import Process from "./home/Process";
import Technologies from "./home/Techonolgies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Process />
      <Technologies />
      <Contact />
      <Footer />
    </>
  );
}
