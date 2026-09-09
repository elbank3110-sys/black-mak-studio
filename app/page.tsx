import Hero from "@/components/Hero";
import SignalStrip from "@/components/SignalStrip";
import Work from "@/components/Work";
import Statement from "@/components/Statement";
import Why from "@/components/Why";
import Services from "@/components/Services";
import Biling from "@/components/Biling";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Process from "@/components/Process";
import Who from "@/components/Who";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Payment from "@/components/Payment";
import Contact from "@/components/Contact";
import StickyCta from "@/components/StickyCta";

export default function Page() {
  return (
    <main>
      <Hero />
      <SignalStrip />
      <Work />
      <Statement />
      <Why />
      <Services />
      <Biling />
      <About />
      <Journey />
      <Process />
      <Who />
      <Pricing />
      <Faq />
      <Payment />
      <Contact />
      <StickyCta />
    </main>
  );
}
