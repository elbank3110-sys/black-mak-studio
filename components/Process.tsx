"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// ============================================================================
// Process — five sequential steps with a scroll-linked progress spine: the
// 01→05 numbers and the hairline between them fill as the visitor scrolls
// through the section. The process reads sequentially — so its presentation
// moves sequentially. Reduced-motion renders static.
// ============================================================================
const PROCESS = [
  { n: "01", title: "process.1title", text: "process.1text" },
  { n: "02", title: "process.2title", text: "process.2text" },
  { n: "03", title: "process.3title", text: "process.3text" },
  { n: "04", title: "process.4title", text: "process.4text" },
  { n: "05", title: "process.5title", text: "process.5text" },
];

export default function Process() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  // the spine fills 0 → 1 as the grid crosses the viewport
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const spineScale = reduce ? 1 : useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("process.index")}</span>
              <HeadlineReveal className="display text-[clamp(3rem,7vw,7rem)]" html={t("process.title")} />
            </div>
            <p className="lede max-w-[42ch]">{t("process.note")}</p>
          </div>
        </Reveal>

        <div ref={gridRef} className="relative">
          {/* the progress spine — drawn by the scroll itself */}
          <motion.span
            aria-hidden="true"
            style={{ scaleX: spineScale }}
            className="absolute start-0 top-0 hidden h-px w-full origin-left bg-ink lg:block"
          />
          <span aria-hidden="true" className="absolute start-0 top-0 hidden h-px w-full bg-line lg:block" />

          <div className="relative grid grid-cols-1 border-y border-line sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
              <ProcessStep
                key={p.n}
                n={p.n}
                title={t(p.title)}
                text={t(p.text)}
                index={i}
                progress={scrollYProgress}
                reduce={!!reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  n,
  title,
  text,
  index,
  progress,
  reduce,
}: {
  n: string;
  title: string;
  text: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  // each step warms up as the spine passes its position
  const start = 0.1 + index * 0.15;
  const end = start + 0.2;
  const opacity = useTransform(progress, [start, end], [0.35, 1]);

  return (
    <Reveal delay={index * 0.05} className="h-full">
      <motion.div
        style={reduce ? undefined : { opacity }}
        className="h-full border-line p-7 transition-colors duration-300 hover:bg-surface sm:border-e lg:[&:not(:last-child)]:border-e"
      >
        <span className="font-mono text-faint">{n}</span>
        <h3 className="mb-3 mt-14 text-[clamp(1.3rem,2.3vw,1.8rem)] font-bold tracking-tight">{title}</h3>
        <p className="max-w-[22ch] text-muted">{text}</p>
      </motion.div>
    </Reveal>
  );
}
