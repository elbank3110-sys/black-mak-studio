"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { MARK_D, MARK_VIEWBOX } from "./HeroMark";

// ============================================================================
// MarkDraw — The Master Calligraphic Proof
// 1. Ultra-sharp vector geometry (shape-rendering="geometricPrecision", zero-bloat miter)
// 2. Stroke-draws with pen velocity, then floods ink with absolute razor sharpness
// 3. Magical Touch: Living golden specular sheen sweep across the 45° facets
// 4. Interactive 3D micro-tilt with architectural crosshair markings
// ============================================================================

export default function MarkDraw() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [stage, setStage] = useState<"draw" | "fill" | "done">("draw");
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glintActive, setGlintActive] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const path = pathRef.current;
    if (reduce || !path) {
      setStage("done");
      return;
    }

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.5, 0, 0.2, 1)";

    const frameId = requestAnimationFrame(() => {
      path.style.strokeDashoffset = "0";
    });

    const t1 = setTimeout(() => setStage("fill"), 1350);
    const t2 = setTimeout(() => {
      setStage("done");
      setGlintActive(true);
    }, 2200);

    // Periodic magical glint sweep every 6 seconds
    const interval = setInterval(() => {
      setGlintActive(true);
      setTimeout(() => setGlintActive(false), 1200);
    }, 6000);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12,
    });
  };

  const handleMouseEnter = () => {
    sound.click("soft");
    setGlintActive(true);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-full w-full items-center justify-center select-none"
      style={{
        perspective: 800,
      }}
    >
      {/* 3D Tilted Card Content */}
      <div
        className="relative h-full w-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
      >
        {/* Architectural Crosshair markings at cardinal points */}
        <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[0.58rem] tracking-widest text-faint opacity-60">
          + 00° N
        </span>
        <span className="pointer-events-none absolute top-1/2 -right-3 -translate-y-1/2 font-mono text-[0.58rem] tracking-widest text-faint opacity-60">
          + 90° E
        </span>
        <span className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[0.58rem] tracking-widest text-seal opacity-80">
          45.0° CUT
        </span>
        <span className="pointer-events-none absolute top-1/2 -left-3 -translate-y-1/2 font-mono text-[0.58rem] tracking-widest text-faint opacity-60">
          + 270° W
        </span>

        {/* The Monogram SVG with Razor-Sharp Geometric Precision */}
        <div className="relative h-[82%] w-[82%] flex items-center justify-center">
          <svg
            viewBox={MARK_VIEWBOX}
            shapeRendering="geometricPrecision"
            aria-hidden="true"
            className="h-full w-full overflow-visible drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            <defs>
              {/* Magical Gold Specular Sheen Gradient */}
              <linearGradient id="markGlint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5f5f1" />
                <stop offset="35%" stopColor="#f5f5f1" />
                <stop offset="50%" stopColor="#e8c76b" />
                <stop offset="65%" stopColor="#c9a227" />
                <stop offset="100%" stopColor="#f5f5f1" />
              </linearGradient>

              {/* Mask for the sweeping light beam */}
              <mask id="glintMask">
                <rect width="100%" height="100%" fill="black" />
                <motion.rect
                  width="50"
                  height="260"
                  fill="white"
                  initial={{ x: -100, y: -50 }}
                  animate={
                    glintActive
                      ? { x: 250, y: 150 }
                      : { x: -100, y: -50 }
                  }
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transform: "rotate(35deg)" }}
                />
              </mask>
            </defs>

            {/* Base Vector Monogram Path — Zero stroke blur once filled! */}
            <path
              ref={pathRef}
              fillRule="evenodd"
              clipRule="evenodd"
              d={MARK_D}
              fill={stage === "done" ? "currentColor" : "#f5f5f1"}
              stroke={stage === "done" ? "none" : "#c9a227"}
              strokeWidth={stage === "done" ? 0 : 1.2}
              strokeLinejoin="miter"
              strokeMiterlimit={10}
              className="text-ink transition-colors duration-300"
              style={{
                fillOpacity: stage === "draw" ? 0 : stage === "fill" ? 0.4 : 1,
                transition: "fill-opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Magical Sheen Layer — Sweeps across the sharp diagonal facets */}
            {stage === "done" && (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={MARK_D}
                fill="url(#markGlint)"
                mask="url(#glintMask)"
                className="pointer-events-none opacity-90"
              />
            )}
          </svg>

          {/* Ambient Golden Under-Glow on hover */}
          <div
            className={`pointer-events-none absolute inset-0 -z-10 rounded-full bg-seal/20 blur-2xl transition-opacity duration-700 ${
              glintActive ? "opacity-60" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}