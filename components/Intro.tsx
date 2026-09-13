"use client";

import { useEffect, useState } from "react";
import { MarkPaths, MARK_VIEWBOX } from "./BrandMark";

// ============================================================================
// Logo Reveal — the brand moment that OPENS the site, not a gate that
// blocks it. Budget: ≤900ms total, once per session, skipped entirely for
// reduced-motion users. The construction grid + the monogram wipe read as
// "engineered, then exists" — the mark is BUILT. The overlay never covers
// the page for more than a beat: the content is already beneath it, and
// the overlay itself starts fading at 550ms.
// ============================================================================
export default function Intro() {
  const [show, setShow] = useState(true);
  const [gone, setGone] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0); // grid → mark → confirm → out

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      setGone(true);
      return;
    }
    try {
      if (sessionStorage.getItem("bm-intro") === "seen") {
        setShow(false);
        setGone(true);
        return;
      }
    } catch {}
    sessionStorage.setItem("bm-intro", "seen");

    // ≤900ms brand beat: grid 0–250ms, mark wipe 250–650ms, confirm 550ms,
    // overlay fades from 550ms and is gone by 900ms.
    const t = [
      setTimeout(() => setPhase(1), 60),
      setTimeout(() => setPhase(2), 250),
      setTimeout(() => setPhase(3), 550),
      setTimeout(() => setShow(false), 620),
      setTimeout(() => setGone(true), 920),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-bg transition-opacity duration-300 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* construction grid — the mark is engineered, then it exists */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ opacity: phase >= 1 && phase < 3 ? 0.5 : 0 }}
      >
        <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 md:h-[440px] md:w-[440px]">
          {[14, 38, 50, 62, 86].map((x) => (
            <span
              key={x}
              className="absolute top-0 h-full w-px bg-line-strong"
              style={{ left: `${x}%` }}
            />
          ))}
          <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
          <span className="absolute inset-x-0 bottom-0 h-px bg-line-strong" />
        </div>
      </div>

      {/* the monogram — rises into place through a clip wipe */}
      <span
        className="block overflow-hidden"
        style={{
          clipPath: phase >= 2 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          transition: "clip-path 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <svg
          viewBox={MARK_VIEWBOX}
          className="h-20 w-auto text-ink md:h-24"
          style={{
            transform: phase >= 2 ? "scale(1)" : "translateY(14%)",
            transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <MarkPaths />
        </svg>
      </span>

      {/* confirmation — a quiet word under the mark */}
      <span
        className="absolute bottom-[38%] font-mono text-[0.6rem] uppercase tracking-[0.35em] text-muted"
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      >
        BLACK-MAK
      </span>
    </div>
  );
}
