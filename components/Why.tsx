"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const POINTS = [
  { n: "01", title: "why.p1title", text: "why.p1text" },
  { n: "02", title: "why.p2title", text: "why.p2text" },
  { n: "03", title: "why.p3title", text: "why.p3text" },
  { n: "04", title: "why.p4title", text: "why.p4text" },
];

export default function Why() {
  const { t } = useI18n();
  return (
    <section id="why" className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("why.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("why.title") }} />
            </div>
            <p className="lede max-w-[42ch]">{t("why.note")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="border-line p-7 transition-colors duration-300 hover:bg-surface sm:border-e lg:[&:not(:last-child)]:border-e">
                <span className="font-mono text-faint">{p.n}</span>
                <h3 className="mb-3 mt-16 text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold tracking-tight">{t(p.title)}</h3>
                <p className="max-w-[26ch] text-muted">{t(p.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] border border-line bg-surface p-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("phil.index")}</span>
              <h3 className="display text-[clamp(1.8rem,4vw,3.2rem)]" dangerouslySetInnerHTML={{ __html: t("phil.title") }} />
            </div>
            <p className="text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-muted">{t("phil.text")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
