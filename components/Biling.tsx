"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// ============================================================================
// Biling — the bilingual USP + "Designed Beyond the Screen" as a scroll-linked
// typographic progression: the survival tests (24px → packaging → signage →
// monochrome → distance) reveal one by one as the section passes through the
// viewport. The idea is narrated by the scroll, not just stated.
// ============================================================================
const TESTS_EN = ["24px", "PACKAGING", "SIGNAGE", "MONOCHROME", "DISTANCE"];

export default function Biling() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const testsRef = useRef<HTMLDivElement>(null);

  // scroll-linked reveal: each test fades/rises in as the block crosses 20%..70%
  const { scrollYProgress } = useScroll({
    target: testsRef,
    offset: ["start 0.85", "end 0.45"],
  });

  return (
    <section className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="grid grid-cols-1 gap-[clamp(2rem,6vw,5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("biling.index")}</span>
              <HeadlineReveal className="display text-[clamp(2.4rem,5.5vw,5.5rem)]" html={t("biling.title")} />
            </div>
            <p className="lede max-w-[46ch]">{t("biling.text")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="biling-row mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-faint">
            <span className="biling-chip" dir="ltr">عربي — AR</span>
            <span className="biling-diamond text-ink">◆</span>
            <span className="biling-chip" dir="ltr">LATIN — EN</span>
            <span className="biling-diamond text-ink">◆</span>
            <span className="biling-chip" dir="ltr">ONE SYSTEM</span>
          </div>
        </Reveal>

        {/* Designed Beyond the Screen — the survival tests as scroll narrative */}
        <div ref={testsRef} className="mt-[clamp(3rem,7vw,6rem)] border border-line bg-bg p-[clamp(1.5rem,4vw,3.5rem)]">
          <Reveal>
            <div className="grid grid-cols-1 gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="eyebrow mb-4 block text-faint">{t("bts.index")}</span>
                <h3 className="display text-[clamp(1.6rem,3.6vw,2.8rem)]">{t("bts.title")}</h3>
              </div>
              <p className="text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-muted">{t("bts.text")}</p>
            </div>
          </Reveal>

          {/* the five survival tests — revealed by scroll position */}
          <div className="mt-10 flex flex-wrap items-baseline gap-x-[clamp(1.2rem,4vw,3rem)] gap-y-4" aria-hidden={!reduce ? undefined : undefined}>
            {TESTS_EN.map((label, i) => (
              <BeyondItem
                key={label}
                label={label}
                index={i}
                progress={scrollYProgress}
                reduce={!!reduce}
                lang={lang}
              />
            ))}
          </div>
          <p className="mono mt-6 border-t border-line pt-4 text-[0.58rem] uppercase tracking-[0.14em] text-faint">
            {t("bts.testsNote")}
          </p>
        </div>
      </div>
    </section>
  );
}

function BeyondItem({
  label,
  index,
  progress,
  reduce,
  lang,
}: {
  label: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
  lang: string;
}) {
  // each item owns a narrow band of the scroll progress
  const start = 0.08 + index * 0.16;
  const end = start + 0.22;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [14, 0]);

  if (reduce || lang === "ar") {
    return (
      <span className="display text-[clamp(1.3rem,3vw,2.2rem)] tracking-tight text-ink">
        {label}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, y }}
      className="display text-[clamp(1.3rem,3vw,2.2rem)] tracking-tight text-ink"
    >
      {label}
      {index < 4 && <span className="ms-[clamp(0.6rem,2vw,1.5rem)] text-faint">→</span>}
    </motion.span>
  );
}
