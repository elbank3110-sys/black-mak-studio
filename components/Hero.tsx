"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import HeroTitle from "./HeroTitle";
import MarkDraw from "./MarkDraw";

// ============================================================================
// Hero — the first 100vh is the WORK, not words about work. The monogram
// draws itself like a pen stroke (the calligrapher's proof), flanked by the
// two real differentiators promoted from section 03: bilingual calligraphy
// and outdoor/large-format survival. The CSS business cards are gone.
// ============================================================================
export default function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden px-0 pb-[clamp(3rem,7vh,6rem)] pt-[clamp(8rem,16vh,12rem)]"
    >
      <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
      {/* the scroll invitation — a hairline that draws itself, right rail */}
      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-cue-text">{t("hero.scroll")}</span>
        <span className="scroll-cue-track">
          <span className="scroll-cue-runner" />
        </span>
      </div>
      <div className="container relative">
        <Reveal>
          <div className="flex items-center gap-4 text-muted">
            <span className="h-px w-12 bg-ink" />
            <span className="eyebrow kicker-shimmer" data-words>{t("hero.kicker")}</span>
          </div>
        </Reveal>

        <div className="mt-[clamp(2rem,5vh,4rem)] grid grid-cols-1 gap-[clamp(3rem,8vw,10rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.6fr)] lg:items-end">
          <div>
            <HeroTitle />
            <Reveal delay={0.24}>
              <p className="lede mt-[clamp(1.8rem,3vw,2.6rem)]">{t("hero.lede")}</p>
            </Reveal>
            {/* the two differentiators promoted to the first screen —
                the things a Berlin designer can't imitate */}
            <Reveal delay={0.3}>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.72rem] uppercase tracking-[0.14em]">
                <span className="flex items-center gap-2 text-muted">
                  <span className="text-ink" aria-hidden="true">◆</span>
                  {t("hero.usp1")}
                </span>
                <span className="flex items-center gap-2 text-muted">
                  <span className="text-ink" aria-hidden="true">◆</span>
                  {t("hero.usp2")}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#start-a-project" data-magnetic className="btn btn-light">
                  <span>{t("hero.cta")}</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a href="#work" data-magnetic className="btn btn-ghost">
                  <span>{t("hero.work")}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* the mark, drawing itself — one real piece of work in the
              hero instead of a generated mockup */}
          <div className="hidden lg:block">
            <Reveal delay={0.3}>
              <div className="relative aspect-square w-full max-w-[420px] justify-self-end border border-line bg-surface/40 p-[clamp(1.5rem,3vw,2.5rem)]">
                <span className="absolute -left-[1px] -top-[1px] h-4 w-4 border-l border-t border-ink" aria-hidden="true" />
                <span className="absolute -bottom-[1px] -right-[1px] h-4 w-4 border-b border-r border-ink" aria-hidden="true" />
                <MarkDraw />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-[clamp(3rem,7vh,6rem)] grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <b className="block text-lg">Muhamed Alaa Elbank</b>
              <span className="text-muted">{t("hero.role")}</span>
            </div>
            <div>
              <b className="block text-lg">{t("hero.location")}</b>
              <span className="text-muted">{t("hero.world")}</span>
            </div>
            <div>
              <b className="block text-lg">2014—2026</b>
              <span className="text-muted">{t("hero.experience")}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
