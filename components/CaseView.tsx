"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { getCase, CASES } from "@/lib/cases";
import Reveal from "@/components/Reveal";
import SurvivalStage from "./SurvivalStage";

export default function CaseView({ slug }: { slug: string }) {
  const c = getCase(slug);
  const { lang, t } = useI18n();
  const coverRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // cover parallax — the hero image drifts slower than the page (depth cue)
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const parallaxY = reduce ? 0 : coverY;

  if (!c) {
    return (
      <section className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-40 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,6rem)]">404</h1>
        <a href="/#work" className="text-link">
          <span>{t("case.back")}</span>
          <span>↗</span>
        </a>
      </section>
    );
  }

  const d = lang === "ar" ? c.ar : c.en;

  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const prev = idx >= 0 ? CASES[(idx - 1 + CASES.length) % CASES.length] : CASES[0];
  const next = idx >= 0 ? CASES[(idx + 1) % CASES.length] : CASES[0];
  const prevTitle = lang === "ar" ? prev.ar.title : prev.en.title;
  const nextTitle = lang === "ar" ? next.ar.title : next.en.title;

  return (
    <article className="pt-[clamp(7rem,14vh,10rem)]">
      <div className="container">
        <Reveal>
          <a href="/#work" className="text-link mb-10 inline-flex">
            <span>← {t("case.back")}</span>
          </a>
        </Reveal>

        <Reveal>
          <span className="eyebrow mb-4 block text-faint">{d.tags}</span>
          <h1 className="display text-[clamp(2.8rem,8vw,8rem)]">{d.title}</h1>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-muted sm:grid-cols-3">
            <div>
              <span className="block text-faint">{t("case.roleLabel")}</span>
              {d.role}
            </div>
            <div>
              <span className="block text-faint">{t("case.yearLabel")}</span>
              {d.year}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-faint">BLACK-MAK</span>
              {t("hero.role")}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="container mt-10">
          <div ref={coverRef} className="relative aspect-[16/9] overflow-hidden border border-line">
            <motion.div style={{ y: parallaxY }} className="absolute inset-[-8%]">
              <Image
                src={c.cover}
                alt={d.title}
                width={1600}
                height={1000}
                priority
                sizes="(max-width: 1380px) 92vw, 1380px"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </Reveal>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <p className="lede text-[clamp(1.2rem,2.2vw,1.8rem)] text-ink">{d.summary}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10 max-w-[64ch] space-y-5 text-muted">
              {d.body.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          THE FIVE SURVIVAL TESTS — pinned, scrubbed by the scroll.
          The promise the homepage makes ("24px, packaging, signage,
          monochrome, distance") becomes something the visitor TOUCHES.
          Desktop only (pinned scenes are a pointer-fine experience);
          mobile renders a compact static rail instead.
          ============================================================ */}
      <SurvivalStage />

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <span className="eyebrow mb-8 block text-faint">{t("work.index")}</span>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.05}>
                <figure className="overflow-hidden border border-line bg-surface">
                  <Image
                    src={src}
                    alt={`${d.title} — ${lang === "ar" ? "عمل" : "work"} ${i + 1}`}
                    width={1280}
                    height={800}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 46vw"
                    className="w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-surface py-[var(--section)]">
        <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow mb-4 block text-faint">{t("case.startTitle")}</span>
            <h2 className="display">{t("case.startHeading")}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {c.behance && (
              <a href={c.behance} target="_blank" rel="noopener" className="btn btn-ghost">
                <span>{t("case.behance")}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            <a href="/#start-a-project" className="btn btn-light">
              <span>{t("case.startCta")}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <span className="eyebrow mb-8 block text-faint">{t("case.more")}</span>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal>
              <a
                href={`/work/${prev.slug}`}
                className="group block border border-line p-6 transition-colors hover:border-ink rtl:text-right"
              >
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
                  ← {t("case.prev")}
                </span>
                <span className="mt-3 block text-xl font-bold text-ink transition-colors group-hover:underline">
                  {prevTitle}
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={`/work/${next.slug}`}
                className="group block border border-line p-6 transition-colors hover:border-ink rtl:text-right"
              >
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
                  {t("case.next")} →
                </span>
                <span className="mt-3 block text-xl font-bold text-ink transition-colors group-hover:underline">
                  {nextTitle}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
