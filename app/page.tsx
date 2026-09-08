import Hero from "@/components/Hero";
import SignalStrip from "@/components/SignalStrip";
import Work from "@/components/Work";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Payment from "@/components/Payment";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <SignalStrip />
      <Work />
      <Statement />
      <Services />
      <About />
      <Journey />
      <Process />
      <Pricing />
      <Payment />
      <Faq />
      <Contact />
    </main>
  );
}
