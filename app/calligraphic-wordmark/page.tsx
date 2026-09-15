import type { Metadata } from "next";
import Image from "next/image";
import SeoCta from "@/components/SeoCta";

export const metadata: Metadata = {
  title: "Calligraphic Wordmarks — Custom Lettering for Brands | BLACK-MAK",
  description:
    "Custom calligraphic wordmarks: hand-drawn Arabic and Latin lettering that turns a brand name into its own mark. Freestyle calligraphy, engineered for real-world scale.",
  alternates: { canonical: "https://black-mak.vercel.app/calligraphic-wordmark" },
  openGraph: {
    title: "Calligraphic Wordmarks — BLACK-MAK",
    description:
      "Hand-drawn Arabic and Latin lettering that turns a brand name into its own mark.",
    url: "https://black-mak.vercel.app/calligraphic-wordmark",
    type: "article",
  },
};

export default function CalligraphicWordmarkPage() {
  return (
    <main className="pt-[76px]">
      <section className="section">
        <div className="container narrow">
          <span className="eyebrow mb-6 block text-faint">02 / CALLIGRAPHIC WORDMARKS</span>
          <h1 className="display text-[clamp(2.4rem,6vw,5rem)]">
            The name<br />
            <em>is the mark.</em>
          </h1>
          <p className="lede mt-10">
            A calligraphic wordmark collapses the distance between a brand&apos;s name
            and its identity into one gesture: the name, drawn — not typed.
          </p>

          <div className="mt-14 space-y-8 text-muted">
            <p className="leading-relaxed">
              BLACK-MAK draws wordmarks by hand first — freestyle calligraphy in Arabic
              and Latin — then systematizes the chosen direction into production-ready
              lettering: stable proportions, defined weights, lockups that hold at
              24px and at 3 meters of signage width.
            </p>
            <p className="leading-relaxed">
              The difference between lettering and a font is authorship. A font is
              licensed to everyone; lettering belongs to one brand. That ownership is
              the entire point of a wordmark — it cannot be copied, only commissioned.
            </p>
            <p className="leading-relaxed">
              Projects run in focused scopes: initial directions, refinement rounds,
              and editable final files (AI · PDF · PNG · SVG), with the studio&apos;s
              five survival tests applied to every direction before it&apos;s shown.
            </p>
          </div>

          <figure className="mt-14 border border-line bg-surface">
            <Image
              src="/images/work/calligraphi-work.jpg"
              alt="Arabic calligraphy study by BLACK-MAK — balance, rhythm, and contemporary letterform expression"
              width={1280}
              height={800}
              sizes="(max-width: 900px) 92vw, 900px"
              className="w-full object-cover"
            />
            <figcaption className="border-t border-line px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
              Calligraphy studies — the stroke is both signal and structure.
            </figcaption>
          </figure>
        </div>
      </section>
      <SeoCta />
    </main>
  );
}
