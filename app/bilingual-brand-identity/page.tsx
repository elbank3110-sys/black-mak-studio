import type { Metadata } from "next";
import SeoCta from "@/components/SeoCta";

export const metadata: Metadata = {
  title: "Bilingual Brand Identity â€” Arabic + Latin as One System | BLACK-MAK",
  description:
    "Bilingual brand identity design: Arabic and Latin drawn as one coherent visual language â€” matching weight, contrast, and voice. For brands that live in two scripts.",
  alternates: { canonical: "https://black-mak.vercel.app/bilingual-brand-identity" },
  openGraph: {
    title: "Bilingual Brand Identity â€” BLACK-MAK",
    description:
      "Arabic and Latin drawn as one coherent visual language â€” matching weight, contrast, and voice.",
    url: "https://black-mak.vercel.app/bilingual-brand-identity",
    type: "article",
  },
};

export default function BilingualIdentityPage() {
  return (
    <main className="pt-[76px]">
      <section className="section">
        <div className="container narrow">
          <span className="eyebrow mb-6 block text-faint">03 / BILINGUAL BRAND IDENTITY</span>
          <h1 className="display text-[clamp(2.4rem,6vw,5rem)]">
            Two scripts.<br />
            <em>One identity.</em>
          </h1>
          <p className="lede mt-10">
            Most &quot;bilingual&quot; brands are two identities sharing a page. The
            Arabic lockup is drawn by one hand, the Latin by another, and the seams
            show in every application.
          </p>

          <div className="mt-14 space-y-8 text-muted">
            <p className="leading-relaxed">
              BLACK-MAK designs bilingual identities where Arabic and Latin feel like
              one maker&apos;s hand: matched stroke contrast, matched optical weight,
              matched construction logic â€” two scripts, one brand voice. This site
              itself is the case study: every English string has an Arabic counterpart
              rendered with equal hierarchy, real RTL layout, and its own typographic
              system rather than a mirrored translation.
            </p>
            <p className="leading-relaxed">
              The system covers the full identity surface: primary logos in both
              scripts, lockups, color, typographic hierarchy per script, usage
              guidelines, and selected applications. Arabic receives its own
              typographic treatment â€” the script does not carry uppercase or negative
              tracking, so hierarchy is rebuilt for it, not inherited from the Latin.
            </p>
            <p className="leading-relaxed">
              For Gulf, Levant, and diaspora brands competing in two languages at
              once, coherence across scripts is not decoration â€” it is the
              recognition strategy.
            </p>
          </div>

          <div className="mt-14 border border-line bg-surface p-[clamp(1.5rem,4vw,3rem)]">
            <div className="flex flex-wrap items-center justify-between gap-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-faint">
              <span dir="ltr">Ø¹Ø±Ø¨ÙŠ â€” AR</span>
              <span className="text-ink" aria-hidden="true">â—†</span>
              <span dir="ltr">LATIN â€” EN</span>
              <span className="text-ink" aria-hidden="true">â—†</span>
              <span dir="ltr">ONE SYSTEM</span>
            </div>
          </div>
        </div>
      </section>
      <SeoCta />
    </main>
  );
}
