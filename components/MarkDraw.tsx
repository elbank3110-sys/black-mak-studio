"use client";

import { useEffect, useRef, useState } from "react";
import { MARK_D, MARK_VIEWBOX } from "./HeroMark";

// ============================================================================
// MarkDraw — the calligrapher's proof. The mark is STROKED into existence
// (stroke-dashoffset draws the outline like a pen), then the ink fills in
// (fill-opacity rises). No library — SVG + CSS, GPU-cheap, runs once.
// Arabic + reduced-motion: render the solid mark immediately.
// ============================================================================
export default function MarkDraw() {
  const ref = useRef<SVGSVGElement>(null);
  const [stage, setStage] = useState<"draw" | "fill" | "done">("draw");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = ref.current?.querySelector("path");
    if (reduce || !path) {
      setStage("done");
      return;
    }
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    // stroke the outline
    path.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.5, 0, 0.2, 1)";
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });
    // then flood the ink
    const t1 = setTimeout(() => setStage("fill"), 1500);
    const t2 = setTimeout(() => setStage("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={MARK_VIEWBOX}
      aria-hidden="true"
      className="h-full w-full text-ink"
      style={{ overflow: "visible" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={MARK_D}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinejoin="miter"
        style={{
          fillOpacity: stage === "draw" ? 0 : stage === "fill" ? 0.35 : 1,
          transition:
            stage === "fill"
              ? "fill-opacity 1s cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 1.6s cubic-bezier(0.5, 0, 0.2, 1)"
              : stage === "done"
                ? "fill-opacity 0.4s ease, stroke-dashoffset 1.6s cubic-bezier(0.5, 0, 0.2, 1)"
                : "stroke-dashoffset 1.6s cubic-bezier(0.5, 0, 0.2, 1)",
        }}
      />
    </svg>
  );
}
