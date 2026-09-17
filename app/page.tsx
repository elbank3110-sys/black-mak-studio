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
import ScopeEstimator from "@/components/ScopeEstimator";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import StickyCta from "@/components/StickyCta";

// Page rhythm: hero (climax) → proof of craft → argument → services →
// person → process → qualification → interactive scope estimator → investment → FAQ → contact.
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
      <ScopeEstimator />
      <Pricing />
      <Faq />
      <Contact />
      <StickyCta />
    </main>
  );
}
