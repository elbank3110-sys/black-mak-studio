import Hero from "@/components/Hero";
import SignalStrip from "@/components/SignalStrip";
import Work from "@/components/Work";
import Proof from "@/components/Proof";
import Statement from "@/components/Statement";
import Why from "@/components/Why";
import Services from "@/components/Services";
import Biling from "@/components/Biling";
import About from "@/components/About";
import Process from "@/components/Process";
import Who from "@/components/Who";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import StickyCta from "@/components/StickyCta";

// Page rhythm: hero (climax) → proof of craft → argument → services →
// person → process → qualification → investment → FAQ → contact.
// Payment moved to /pay — payment rails belong behind a proposal,
// not on the storefront.
export default function Page() {
  return (
    <main>
      <Hero />
      <SignalStrip />
      <Work />
      <Proof />
      <Statement />
      <Why />
      <Services />
      <Biling />
      <About />
      <Process />
      <Who />
      <Pricing />
      <Faq />
      <Contact />
      <StickyCta />
    </main>
  );
}
