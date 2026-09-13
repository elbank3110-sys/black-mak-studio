import type { Metadata } from "next";
import Image from "next/image";
import SeoCta from "@/components/SeoCta";

export const metadata: Metadata = {
  title: "Arabic Logo Design â€” Custom Arabic Marks & Wordmarks | BLACK-MAK",
  description:
    "Arabic logo design by BLACK-MAK: custom Arabic marks, wordmarks, and lettering engineered to work beside a Latin identity â€” from favicon to facade. 12+ years, 50+ identities.",
  alternates: { canonical: "https://black-mak.vercel.app/arabic-logo-design" },
  openGraph: {
    title: "Arabic Logo Design â€” BLACK-MAK",
    description:
      "Custom Arabic marks and wordmarks engineered to work beside a Latin identity â€” from favicon to facade.",
    url: "https://black-mak.vercel.app/arabic-logo-design",
    type: "article",
  },
};

export default function ArabicLogoDesignPage() {
  return (
    <main className="pt-[76px]">
      <section className="section">
        <div className="container narrow">
          <span className="eyebrow mb-6 block text-faint">01 / ARABIC LOGO DESIGN</span>
          <h1 className="display text-[clamp(2.4rem,6vw,5rem)]">
            Arabic logo design<br />
            <em>built to be read.</em>
          </h1>
          <p className="lede mt-10">
            An Arabic mark is not a translated mark. Arabic letterforms carry their own
            rhythm, weight distribution, and joining logic â€” a wordmark that ignores
            them reads as foreign even to readers who can&apos;t say why.
          </p>

          <div className="mt-14 space-y-8 text-muted">
            <p className="leading-relaxed">
              BLACK-MAK designs Arabic logos from the stroke up: hand-drawn lettering,
              calligraphic wordmarks, and geometric Arabic monograms that survive
              reproduction at every size â€” 24px favicon, embroidered uniform,
              street-level signage. Every mark is tested in monochrome and at distance
              before delivery, the same five survival tests applied to the
              studio&apos;s own identity.
            </p>
            <p className="leading-relaxed">
              The practice is bilingual by design: when a brand needs Arabic and Latin
              to live together, both scripts are drawn as one visual system â€” matched
              weight, matched contrast, one brand voice â€” not two logos stitched
              side by side.
            </p>
            <p className="leading-relaxed">
              12+ years across 50+ delivered identities, with large-format and outdoor
              experience that shapes how every mark is engineered from the first
              sketch.
            </p>
          </div>

          <figure className="mt-14 border border-line bg-surface">
            <Image
              src="/images/work/makeen/makeen-calligraphy.jpg"
              alt="MAKEEN â€” Arabic calligraphic wordmark by BLACK-MAK, drawn as stamp, sign, and screen"
              width={1280}
              height={800}
              sizes="(max-width: 900px) 92vw, 900px"
              className="w-full object-cover"
            />
            <figcaption className="border-t border-line px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
              MAKEEN â€” the word is the mark. Arabic calligraphy as identity.
            </figcaption>
          </figure>
        </div>
      </section>
      <SeoCta />
    </main>
  );
}
