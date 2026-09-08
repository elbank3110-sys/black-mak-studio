import Hero from "@/components/Hero";
import SignalStrip from "@/components/SignalStrip";
import Work from "@/components/Work";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import Biling from "@/components/Biling";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Process from "@/components/Process";
import Why from "@/components/Why";
import Who from "@/components/Who";
import Pricing from "@/components/Pricing";
import Payment from "@/components/Payment";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import StickyCta from "@/components/StickyCta";

export default function Page() {
  return (
    <main>
      <Hero />
      <SignalStrip />
      <Work />
      <Statement />
      <Services />
      <Biling />
      <About />
      <Journey />
      <Process />
      <Why />
      <Who />
      <Pricing />
      <Payment />
      <Faq />
      <Contact />
      <StickyCta />
    </main>
  );
}
