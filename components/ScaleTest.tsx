"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { sound } from "@/lib/sound";
import { MarkPaths, MARK_VIEWBOX, MARK_ASPECT } from "./BrandMark";
import Reveal from "./Reveal";

// ============================================================================
// ScaleTest — the studio's promise made tangible: "legible from a favicon
// to a facade". Drag anywhere on the stage (or use the slider / arrow keys)
// and the mark scales continuously with the hand — butter-smooth via a
// rAF-lerped loop that mutates DOM directly (no React re-render per frame).
// Enhanced with real-world contextual surfaces (Favicon -> Packaging -> Facade).
// ============================================================================

const STOPS = [
  { size: 16, label: "16px — Favicon & Tab", contextEn: "Browser Tab & Small Mobile Header", contextAr: "أيقونة تبويب المتصفح وهيدر الموبايل" },
  { size: 24, label: "24px — App Icon", contextEn: "Touch Interface & App Dock Icon", contextAr: "أيقونة تطبيقات الهواتف والواجهات" },
  { size: 48, label: "48px — UI Mark", contextEn: "Digital Brand Header & Avatar", contextAr: "ترويسة المواقع وحسابات التواصل" },
  { size: 120, label: "120px — Stationery & Box", contextEn: "Embossed Paper, Packaging & Labels", contextAr: "حفر بارز على المطبوعات والعلب والورق" },
  { size: 320, label: "320px — Facade Signage", contextEn: "Storefront Architectural Metal Sign", contextAr: "لافتات المحلات والواجهات المعمارية الضخمة" },
] as const;

const MIN_PX = 16;
const MAX_PX = 320;

export default function ScaleTest() {
  const { t, lang } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const contextBadgeRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const target = useRef(0.35);
  const smooth = useRef(0.35);
  const wrapW = useRef(320);
  const dragging = useRef(false);
  const lastStopIndex = useRef(-1);

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

  const paint = useCallback((frac: number) => {
    const w = wrapW.current;
    const maxRender = Math.min(w * 0.86, 420);
    const px = Math.round(MIN_PX + frac * (MAX_PX - MIN_PX));
    const propPx = px <= 48 ? px : Math.round(maxRender * (px / MAX_PX));
    const render = Math.min(propPx, maxRender);

    if (boxRef.current) {
      boxRef.current.style.width = `${render}px`;
      boxRef.current.style.height = `${render * MARK_ASPECT}px`;

      // Contextual material treatment based on scale
      if (px <= 32) {
        boxRef.current.style.filter = "none";
      } else if (px <= 140) {
        boxRef.current.style.filter = "drop-shadow(0 4px 12px rgba(0,0,0,0.35))";
      } else {
        boxRef.current.style.filter = "drop-shadow(0 10px 30px rgba(201,162,39,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.8))";
      }
    }

    if (sliderRef.current) sliderRef.current.value = String(Math.round(frac * 1000));

    const stopIdx = nearestStop(frac);
    if (stopIdx !== lastStopIndex.current) {
      lastStopIndex.current = stopIdx;
      sound.click("soft");
    }

    const stop = STOPS[stopIdx];
    if (labelRef.current) {
      if (labelRef.current.dataset.stop !== String(stopIdx)) {
        labelRef.current.dataset.stop = String(stopIdx);
        labelRef.current.textContent = stop.label;
      }
    }

    if (contextBadgeRef.current) {
      contextBadgeRef.current.textContent = lang === "ar" ? stop.contextAr : stop.contextEn;
    }

    if (stageRef.current) {
      stageRef.current.setAttribute("aria-valuenow", String(px));
      stageRef.current.setAttribute(
        "aria-valuetext",
        `${px}px — ${stop.label.split("—")[1]?.trim() ?? ""}`
      );
    }
  }, [nearestStop, lang]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => { wrapW.current = el.clientWidth; paint(smooth.current); };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [paint]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      const k = 1 - Math.pow(0.001, dt / 1000);
      const before = smooth.current;
      smooth.current += (target.current - smooth.current) * k;
      if (Math.abs(smooth.current - before) > 0.0004) paint(smooth.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paint]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    sound.click("pop");
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
          <div className="flex items-center gap-3">
            <span className="eyebrow text-faint">{t("scale.index")}</span>
            <span
              ref={contextBadgeRef}
              className="inline-block border border-seal/40 bg-seal/10 px-2.5 py-0.5 mono text-[0.62rem] uppercase tracking-wider text-seal font-semibold transition-all duration-300"
            >
              {lang === "ar" ? STOPS[2].contextAr : STOPS[2].contextEn}
            </span>
          </div>
          <span
            ref={labelRef}
            data-stop="2"
            className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink"
            dir="ltr"
          >
            {STOPS[2].label}
          </span>
        </div>

        {/* The interactive scaling stage */}
        <div
          ref={wrapRef}
          className="relative flex min-h-[260px] touch-pan-y select-none items-center justify-center overflow-hidden py-12 md:min-h-[340px]"
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
            className="pointer-events-none grid place-items-center transition-all duration-75"
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

        {/* Slider control */}
        <div className="mt-2 flex items-center gap-5 border-t border-line pt-5">
          <span className="font-mono text-[0.58rem] text-faint">16px</span>
          <input
            ref={sliderRef}
            dir="ltr"
            type="range"
            min={0}
            max={1000}
            step={1}
            defaultValue={350}
            onChange={onSlider}
            aria-label={t("scale.slider")}
            className="h-1 w-full cursor-pointer appearance-none rounded-none bg-line-strong accent-ink"
          />
          <span className="font-mono text-[0.58rem] text-faint">320px</span>
        </div>
        <p className="mt-3 max-w-[64ch] text-[0.83rem] leading-relaxed text-muted">
          {t("scale.note")}
        </p>
      </div>
    </Reveal>
  );
}
