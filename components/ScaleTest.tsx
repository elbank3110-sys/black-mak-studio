"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { MarkPaths, MARK_VIEWBOX, MARK_ASPECT } from "./BrandMark";
import Reveal from "./Reveal";

// ============================================================================
// ScaleTest — the studio's promise made tangible: "legible from a favicon
// to a facade". Drag anywhere on the stage (or use the slider / arrow keys)
// and the mark scales continuously with the hand — butter-smooth via a
// rAF-lerped loop that mutates DOM directly (no React re-render per frame).
// Pure CSS transform scaling of one inline SVG — zero image swaps, 60fps.
// ============================================================================

// real-world stop sizes — used for labels (snap-shown when near)
const STOPS = [
  { size: 16, label: "16px — favicon" },
  { size: 24, label: "24px — app icon" },
  { size: 48, label: "48px — UI mark" },
  { size: 120, label: "120px — stationery" },
  { size: 320, label: "320px — facade signage" },
] as const;

const MIN_PX = 16;
const MAX_PX = 320;

export default function ScaleTest() {
  const { t } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // the target scale (0..1) — source of truth, mutated by pointer/keys
  const target = useRef(0.35);
  // the smoothed scale actually rendered (lerped toward target in rAF)
  const smooth = useRef(0.35);
  const wrapW = useRef(320);
  const dragging = useRef(false);

  const nearestStop = useCallback((frac: number) => {
    const px = MIN_PX + frac * (MAX_PX - MIN_PX);
    let best = 0;
    let bd = Infinity;
    STOPS.forEach((s, i) => {
      const d = Math.abs(s.size - px);
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  }, []);

  // the render side — pure DOM writes, never setState inside the loop
  const paint = useCallback((frac: number) => {
    const w = wrapW.current;
    const maxRender = Math.min(w * 0.86, 420);
    const px = Math.round(MIN_PX + frac * (MAX_PX - MIN_PX));
    const propPx = px <= 48 ? px : Math.round(maxRender * (px / MAX_PX));
    const render = Math.min(propPx, maxRender);
    if (boxRef.current) {
      boxRef.current.style.width = `${render}px`;
      boxRef.current.style.height = `${render * MARK_ASPECT}px`;
    }
    if (sliderRef.current) sliderRef.current.value = String(Math.round(frac * 1000));
    if (labelRef.current) {
      const stop = STOPS[nearestStop(frac)];
      if (labelRef.current.dataset.stop !== String(nearestStop(frac))) {
        labelRef.current.dataset.stop = String(nearestStop(frac));
        labelRef.current.textContent = stop.label;
      }
    }
    if (stageRef.current) {
      stageRef.current.setAttribute("aria-valuenow", String(px));
      stageRef.current.setAttribute(
        "aria-valuetext",
        `${px}px — ${STOPS[nearestStop(frac)].label.split("—")[1]?.trim() ?? ""}`
      );
    }
  }, [nearestStop]);

  // measure the stage so the mark scales relative to it, not the viewport
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => { wrapW.current = el.clientWidth; paint(smooth.current); };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [paint]);

  // the animation loop — ONE rAF, lerping toward target; DOM-direct writes
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const k = 1 - Math.pow(0.001, dt / 1000); // frame-rate independent ease
      const before = smooth.current;
      smooth.current += (target.current - smooth.current) * k;
      // only paint when meaningfully moved (kills idle churn)
      if (Math.abs(smooth.current - before) > 0.0004) paint(smooth.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paint]);

  // pointer drag — horizontal position on the stage maps to the scale
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    stageRef.current?.setPointerCapture(e.pointerId);
    onPointerMove(e);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    target.current = frac;
  };
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    stageRef.current?.releasePointerCapture?.(e.pointerId);
  };

  // keyboard — arrows walk the continuous scale; Home/End jump extremes
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.02 : 0.08;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      target.current = Math.min(1, target.current + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      target.current = Math.max(0, target.current - step);
    } else if (e.key === "Home") {
      target.current = 0;
    } else if (e.key === "End") {
      target.current = 1;
    }
  };

  const onSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const frac = Number(e.target.value) / 1000;
    target.current = frac;
  };

  return (
    <Reveal delay={0.1}>
      <div className="mt-[clamp(3rem,7vw,6rem)] border border-line bg-surface p-[clamp(1.2rem,3.5vw,2.5rem)]">
        <div className="flex flex-col justify-between gap-3 border-b border-line pb-4 md:flex-row md:items-center">
          <span className="eyebrow text-faint">{t("scale.index")}</span>
          <span
            ref={labelRef}
            data-stop="2"
            className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink"
            dir="ltr"
          >
            {STOPS[2].label}
          </span>
        </div>

        {/* the stage — drag anywhere: the mark follows the hand */}
        <div
          ref={wrapRef}
          className="relative flex min-h-[240px] touch-none select-none items-center justify-center overflow-hidden py-10 md:min-h-[300px]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        >
          <div
            ref={stageRef}
            tabIndex={0}
            role="slider"
            aria-label={t("scale.slider")}
            aria-valuemin={16}
            aria-valuemax={320}
            aria-valuenow={48}
            aria-valuetext="48px — UI mark"
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="absolute inset-0 cursor-ew-resize focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
          />
          <div
            ref={boxRef}
            className="pointer-events-none grid place-items-center"
            style={{ width: 48, height: 48 * MARK_ASPECT }}
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
          <span className="pointer-events-none absolute bottom-3 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-faint">
            {t("scale.dragHint")}
          </span>
        </div>

        {/* the control — a continuous slider mirroring the drag scale */}
        <div className="mt-2 flex items-center gap-5 border-t border-line pt-5">
          <span className="font-mono text-[0.58rem] text-faint">16</span>
          <input
            ref={sliderRef}
            type="range"
            min={0}
            max={1000}
            step={1}
            defaultValue={350}
            onChange={onSlider}
            aria-label={t("scale.slider")}
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
