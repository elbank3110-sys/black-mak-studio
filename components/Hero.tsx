"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Hero() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  // parallax depths — dark card sinks slower, light card lifts (counter-scroll)
  const parallaxA = useTransform(scrollY, [0, 600], [0, 70]);
  const parallaxB = useTransform(scrollY, [0, 600], [0, -60]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden px-0 pb-[clamp(3rem,7vh,6rem)] pt-[clamp(8rem,16vh,12rem)]"
    >
      <div className="hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="container relative">
        <Reveal>
          <div className="flex items-center gap-4 text-muted">
            <span className="h-px w-12 bg-ink" />
            <span className="eyebrow kicker-shimmer" data-words>{t("hero.kicker")}</span>
          </div>
        </Reveal>

        <div className="mt-[clamp(2rem,5vh,4rem)] grid grid-cols-1 gap-[clamp(3rem,8vw,10rem)] lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.5fr)] lg:items-end">
          <div>
            <Reveal>
              <h1
                className="display hero-title"
                dangerouslySetInnerHTML={{ __html: t("hero.title") }}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="lede mt-[clamp(1.8rem,3vw,2.6rem)]">{t("hero.lede")}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#start-a-project" data-magnetic className="btn btn-light">
                  <span>{t("hero.cta")}</span>
                  <span>↗</span>
                </a>
                <a href="#work" data-magnetic className="btn btn-ghost">
                  <span>{t("hero.work")}</span>
                  <span>↓</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:block">
            <Reveal delay={0.2}>
              <div className="border-y border-line-strong py-5">
                <span className="eyebrow mb-6 block text-faint">{t("hero.sideLabel")}</span>
                <strong className="block text-2xl font-bold leading-tight">{t("hero.sideTitle")}</strong>
                <p className="mt-4 text-muted">{t("hero.sideText")}</p>
              </div>
              <div className="relative mt-6 flex items-end justify-center" style={{ minHeight: 200 }}>
                {/* Lissajous organic float + scroll parallax — the veteran move:
                    each card drifts on its own elliptical path (x/y desynced),
                    and both cards counter-scroll at different depths. */}
                <motion.div
                  initial={{ rotate: -7, x: "-8%", y: 12 }}
                  animate={{ rotate: [-7, -5.2, -7], x: ["-8%", "2%", "-8%"], y: [12, -6, 12] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1] }}
                  whileHover={{ scale: 1.04, rotate: -3, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  style={{ y: parallaxA }}
                  className="hero-card absolute left-0 top-2 w-[280px] rounded-md border border-line-strong bg-gradient-to-br from-[#19191b] to-[#080809] p-5 text-white shadow-2xl"
                >
                  <span className="eyebrow text-white/60">{t("hero.cardLabel")}</span>
                  <strong className="mt-3 block text-xl text-white">BLACK-MAK</strong>
                  <span className="text-sm text-white/70">Muhamed Alaa Elbank</span>
                  <span className="mt-2 block font-mono text-xs" dir="ltr">+20 100 246 2821</span>
                </motion.div>
                <motion.div
                  initial={{ rotate: 5, x: "8%", y: -8 }}
                  animate={{ rotate: [5, 6.8, 5], x: ["8%", "-2%", "8%"], y: [-8, 8, -8] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.5, 1], delay: 0.9 }}
                  whileHover={{ scale: 1.04, rotate: 2, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  style={{ y: parallaxB }}
                  className="hero-card absolute bottom-0 right-0 z-10 w-[280px] rounded-md border border-line-strong bg-gradient-to-br from-[#faf9f4] to-[#deddd8] p-5 text-[#090909] shadow-2xl"
                >
                  <span className="eyebrow text-[#62615c]">{t("hero.cardLabel")}</span>
                  <strong className="mt-3 block text-xl">BLACK-MAK</strong>
                  <span className="text-sm text-[#575650]">Muhamed Alaa Elbank</span>
                  <span className="mt-2 block font-mono text-xs" dir="ltr">+20 100 246 2821</span>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.24}>
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
