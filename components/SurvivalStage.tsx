"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { MarkPaths, MARK_VIEWBOX, MARK_ASPECT } from "./BrandMark";

// ============================================================================
// SurvivalStage — THE FIVE SURVIVAL TESTS, pinned and scrubbed.
// The homepage promises: 24px / packaging / signage / monochrome / distance.
// This scene makes the visitor WATCH the promise hold. One stage, one mark,
// five states, driven by scroll through a pinned viewport:
//   T1  SCALE      — the mark shrinks from full size to a 24px favicon bar
//   T2  MONO       — the mark inverts (ink on paper)
//   T3  PACKAGING  — the mark settles onto a package-shaped surface
//   T4  SIGNAGE   — the mark scales up to facade size on a dark storefront
//   T5  DISTANCE   — everything blurs except the mark (it survives)
// GSAP ScrollTrigger loads dynamically (project pages only — the homepage
// never pays for it). Reduced-motion + touch render a static rail instead.
// ============================================================================

const TESTS = [
  { key: "case.t1", label: "24px" },
  { key: "case.t2", label: "MONOCHROME" },
  { key: "case.t3", label: "PACKAGING" },
  { key: "case.t4", label: "SIGNAGE" },
  { key: "case.t5", label: "DISTANCE" },
] as const;

export default function SurvivalStage() {
  const { t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [staticMode, setStaticMode] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || coarse || narrow) {
      setStaticMode(true);
      return;
    }
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    import("gsap").then(async (gsapMod) => {
      const st = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.gsap ?? gsapMod.default ?? gsapMod;
      gsap.registerPlugin(st.ScrollTrigger);

      const stage = wrapRef.current;
      if (!stage) return;
      const mark = stage.querySelector<HTMLElement>("[data-survival-mark]");
      const surface = stage.querySelector<HTMLElement>("[data-survival-surface]");
      const counter = stage.querySelector<HTMLElement>("[data-survival-count]");
      if (!mark || !surface) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=350%",
            scrub: 0.6,
            pin: true,
            onUpdate: (self) => {
              const i = Math.min(TESTS.length - 1, Math.floor(self.progress * TESTS.length));
              setActive(i);
              if (counter) counter.textContent = `0${i + 1} / 0${TESTS.length}`;
            },
          },
        });

        // T1 — SCALE: full → 24px favicon bar
        tl.fromTo(
          mark,
          { scale: 1, y: 0 },
          { scale: 0.14, y: 120, duration: 1, ease: "none" }
        )
          .to(surface, { background: "var(--surface-2)", duration: 1 }, 0)
          // T2 — MONO: invert
          .to(mark, { scale: 0.4, y: 0, duration: 1, ease: "power2.out" }, 1)
          .to(stage, { "--mark-ink": "var(--bg)", "--mark-surface": "var(--ink)", duration: 0.4 }, 1.3)
          // T3 — PACKAGING: settle on a package panel
          .to(stage, { "--mark-ink": "var(--ink)", "--mark-surface": "var(--surface)", duration: 0.4 }, 2)
          .to(mark, { scale: 0.55, y: -30, duration: 1, ease: "power2.inOut" }, 2)
          // T4 — SIGNAGE: facade scale
          .to(mark, { scale: 1.6, y: 0, duration: 1, ease: "power2.inOut" }, 3)
          .to(stage, { "--mark-surface": "var(--bg)", duration: 0.4 }, 3.1)
          // T5 — DISTANCE: blur the world, not the mark
          .to(stage, { "--mark-scale": 1, duration: 0.01 }, 4)
          .to(mark, { scale: 0.9, duration: 1, ease: "power1.inOut" }, 4)
          .to(surface, { filter: "blur(6px)", opacity: 0.25, duration: 1 }, 4)
          .to(stage, { filter: "blur(0px)", duration: 1 }, 4);
      });
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      data-survival-stage
      aria-label={t("case.survival")}
      style={{ ["--mark-ink" as string]: "var(--ink)", ["--mark-surface" as string]: "var(--surface)" }}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-t border-line py-[var(--section)]"
    >
      {/* the world around the mark */}
      <div
        data-survival-surface
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "var(--mark-surface)",
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          transition: "background 0.6s var(--ease)",
        }}
      />

      {/* the mark under test */}
      <div
        data-survival-mark
        className="relative z-10 grid place-items-center"
        style={{ width: "clamp(200px, 40vw, 420px)", aspectRatio: String(1 / MARK_ASPECT) }}
      >
        <svg viewBox={MARK_VIEWBOX} role="img" aria-label={t("scale.markAlt")} className="h-full w-full">
          <MarkPaths />
        </svg>
      </div>

      {/* the rail — which test is running */}
      <div className="absolute inset-x-0 bottom-8 z-20">
        <div className="container flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow mb-3 block text-faint" data-survival-eyebrow>
              {t("case.survivalIndex")}
            </span>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink" data-survival-count>
              01 / 05
            </p>
          </div>
          <div className="flex max-w-[60%] flex-wrap justify-end gap-x-6 gap-y-2 text-end">
            {TESTS.map((tt, i) => (
              <span
                key={tt.key}
                className={`display text-[clamp(1rem,2.2vw,1.6rem)] tracking-tight transition-colors duration-300 ${
                  (staticMode || active) === i ? "text-ink" : "text-faint opacity-50"
                }`}
              >
                {t(tt.key)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* static fallback note (mobile / reduced-motion) — the rail above
          stays; the pin/scrub just doesn't run */}
      {staticMode && (
        <p className="container absolute inset-x-0 bottom-24 z-20 max-w-[52ch] font-mono text-[0.72rem] leading-relaxed text-muted">
          {t("case.survivalNote")}
        </p>
      )}
    </section>
  );
}
