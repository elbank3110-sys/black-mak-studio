"use client";

import { useEffect, useState } from "react";
import { MarkPaths } from "./BrandMark";

// ============================================================================
// Logo Reveal — the brand experience opens the site.
// Creative direction: a mark is BUILT, not drawn. The construction grid
// (vertical hairlines + baseline) appears first, the solid monogram rises
// into place through a clip-path wipe (like ink meeting paper), the grid
// retreats, then the whole thing settles as the page fades in beneath.
// ~1.25s total, once per session, skipped for reduced-motion users.
// ============================================================================
export default function Intro() {
  const [show, setShow] = useState(true);
  const [gone, setGone] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0); // grid → mark → wordmark → out

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

    // 2s brand moment: grid 0-700ms, mark wipe 250-1500ms, wordmark ~1100ms, out 2000ms
    const t = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setShow(false), 2000),
      setTimeout(() => setGone(true), 2750),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-bg transition-opacity duration-700 ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* construction grid — the mark is engineered, then it exists */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: phase >= 1 && phase < 3 ? 0.6 : 0 }}
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

      <div className="relative flex flex-col items-center gap-6">
        {/* the solid mark — rises into place through a clip wipe */}
        <span
          className="block overflow-hidden"
          style={{
            clipPath: phase >= 2 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
            transition: "clip-path 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <svg
            viewBox="154.4 0 115.96 123.06"
            className="h-24 w-24 text-ink md:h-28 md:w-28"
            style={{
              transform: phase >= 2 ? "scale(1)" : "translateY(14%)",
              transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <MarkPaths />
          </svg>
        </span>

        {/* wordmark — a quiet confirmation */}
        <span
          className="font-mono text-[0.62rem] uppercase tracking-[0.35em] text-muted"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "none" : "translateY(6px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          BLACK-MAK
        </span>
      </div>
    </div>
  );
}
