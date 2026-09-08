"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const PROCESS = [
  { n: "01", title: "process.1title", text: "process.1text" },
  { n: "02", title: "process.2title", text: "process.2text" },
  { n: "03", title: "process.3title", text: "process.3text" },
  { n: "04", title: "process.4title", text: "process.4text" },
  { n: "05", title: "process.5title", text: "process.5text" },
];

export default function Process() {
  const { t } = useI18n();
  return (
    <section className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("process.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("process.title") }} />
            </div>
            <p className="lede max-w-[42ch]">{t("process.note")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05}>
              <div className="border-line p-7 transition-colors duration-300 hover:bg-surface sm:border-e lg:[&:not(:last-child)]:border-e">
                <span className="font-mono text-faint">{p.n}</span>
                <h3 className="mb-3 mt-14 text-[clamp(1.3rem,2.3vw,1.8rem)] font-bold tracking-tight">{t(p.title)}</h3>
                <p className="max-w-[22ch] text-muted">{t(p.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
