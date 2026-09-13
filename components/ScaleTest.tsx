"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { MarkPaths, MARK_VIEWBOX, MARK_ASPECT } from "./BrandMark";
import Reveal from "./Reveal";

// ============================================================================
// ScaleTest — the studio's promise made tangible: "legible from a favicon
// to a facade". One mark, one slider, five real-world sizes. The visitor
// PROVES the claim with their own hand instead of reading it.
// Pure CSS transform scaling of one inline SVG — zero image swaps, 60fps.
// ============================================================================

const STOPS = [
  { size: 16, label: "16px — favicon" },
  { size: 24, label: "24px — app icon" },
  { size: 48, label: "48px — UI mark" },
  { size: 120, label: "120px — stationery" },
  { size: 320, label: "320px — facade signage" },
] as const;

export default function ScaleTest() {
  const { t } = useI18n();
  const [i, setI] = useState(2); // start at UI mark — the most relatable
  const wrapRef = useRef<HTMLDivElement>(null);
  const [wrapW, setWrapW] = useState(320);

  // measure the stage so the mark scales relative to it, not the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWrapW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stop = STOPS[i];
  const maxRender = Math.min(wrapW * 0.86, 420);
  const px = Math.max(16, Math.min(stop.size, 999));
  // render scale: 16..48 stay literal; 120/320 are shown proportionally
  const renderPx =
    px <= 48 ? px : Math.round(maxRender * (px / 320));
  const clampedRender = Math.min(renderPx, maxRender);

  return (
    <Reveal delay={0.1}>
      <div className="mt-[clamp(3rem,7vw,6rem)] border border-line bg-surface p-[clamp(1.2rem,3.5vw,2.5rem)]">
        <div className="flex flex-col justify-between gap-3 border-b border-line pb-4 md:flex-row md:items-center">
          <span className="eyebrow text-faint">{t("scale.index")}</span>
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink" dir="ltr">
            {stop.label}
          </span>
        </div>

        {/* the stage */}
        <div
          ref={wrapRef}
          className="relative flex min-h-[240px] items-center justify-center overflow-hidden py-10 md:min-h-[300px]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        >
          <div
            className="grid place-items-center transition-[width,height] duration-700"
            style={{
              width: clampedRender,
              height: clampedRender * MARK_ASPECT,
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <svg
              viewBox={MARK_VIEWBOX}
              className="h-full w-full text-ink"
              aria-label={t("scale.markAlt")}
              role="img"
            >
              <MarkPaths />
            </svg>
          </div>
        </div>

        {/* the control */}
        <div className="mt-2 flex items-center gap-5 border-t border-line pt-5">
          <span className="font-mono text-[0.58rem] text-faint">16</span>
          <input
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={i}
            onChange={(e) => setI(Number(e.target.value))}
            aria-label={t("scale.slider")}
            aria-valuetext={stop.label}
            className="h-1 w-full cursor-pointer appearance-none rounded-none bg-line-strong accent-ink"
          />
          <span className="font-mono text-[0.58rem] text-faint">320</span>
        </div>
        <p className="mt-3 max-w-[64ch] text-[0.83rem] leading-relaxed text-muted">
          {t("scale.note")}
        </p>
      </div>
    </Reveal>
  );
}
