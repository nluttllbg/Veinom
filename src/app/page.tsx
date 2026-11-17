import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ImpactPin } from "@/components/ImpactPin";
import { Structure } from "@/components/Structure";
import { Benefits } from "@/components/Benefits";
import { Reviews } from "@/components/Reviews";
import { About } from "@/components/About";
import { Location } from "@/components/Location";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <ImpactPin />
        <Structure />
        <Benefits />
        <Reviews />
        <About />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
