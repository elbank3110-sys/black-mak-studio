"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const STEPS: { year?: string; yearKey?: string; title: string; text: string }[] = [
  { year: "2014", title: "journey.1title", text: "journey.1text" },
  { year: "2016 — 2020", title: "journey.2title", text: "journey.2text" },
  { year: "2019 — 2023", title: "journey.3title", text: "journey.3text" },
  { yearKey: "journey.4year", title: "journey.4title", text: "journey.4text" },
];

export default function Journey() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const tools = ["journey.tool1", "journey.tool2", "journey.tool4"];

  return (
    <section className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-5 block text-faint">{t("journey.index")}</span>
              <span className="mb-6 block h-px w-12 bg-line-strong" aria-hidden="true" />
              <h2 className="display">{t("journey.title")}</h2>
            </div>
            <p className="lede max-w-[42ch]">{t("journey.note")}</p>
          </div>
        </Reveal>

        <div ref={ref} className="relative">
          <span className="pointer-events-none absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px bg-line" aria-hidden="true" />
          <motion.span
            className="pointer-events-none absolute left-0 top-3 h-[calc(100%-1.5rem)] w-px origin-top bg-ink"
            style={{ scaleY: lineScale }}
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 gap-0">
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <article className="relative grid grid-cols-[9.5rem_1fr] gap-8 border-line py-8 ps-[1.8rem]">
                  <span className="absolute left-[-0.28rem] top-3 h-[0.55rem] w-[0.55rem] rotate-45 border border-ink bg-bg" />
                  <div className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    {s.yearKey ? t(s.yearKey) : s.year}
                  </div>
                  <div>
                    <h3 className="mb-3 text-[clamp(1.1rem,2vw,1.55rem)] font-bold">{t(s.title)}</h3>
                    <p className="max-w-[52ch] text-muted">{t(s.text)}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-8 flex flex-wrap gap-3 ps-[1.8rem]">
            {tools.map((k) => (
              <span
                key={k}
                className="border border-line-strong px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted transition-colors hover:border-ink hover:bg-ink hover:text-bg"
              >
                {t(k)}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
