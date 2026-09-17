"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MARK_D, MARK_VIEWBOX } from "./HeroMark";
import {
  SOULLIFE_LETTERS,
  SOULLIFE_SWASH_D,
  SOULLIFE_VIEWBOX,
} from "@/lib/signatureData";

// ============================================================================
// Cinematic Brand Intro — Architectural White Monogram & Handwritten Soullife
// 1. 0–350ms: Drafting blueprint grid & coordinate calibration
// 2. 350–1400ms: Pure white stroke-by-stroke drafting of the monogram with ultra-smooth easing
// 3. 1400–3300ms: Solid white ink flood + progressive handwritten "Muhamed Alaa" in
//    official Soullife font followed by sweeping calligraphic signature swash
// 4. 3300–3800ms: Full lockup & seamless fade-out curtain
// ============================================================================

export default function Intro() {
  const [show, setShow] = useState(true);
  const [gone, setGone] = useState(false);
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    // Respect reduced-motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      setGone(true);
      return;
    }

    const t = [
      setTimeout(() => setStage(1), 100),    // Grid lines initiate
      setTimeout(() => setStage(2), 350),    // Smooth white monogram draws
      setTimeout(() => setStage(3), 1400),   // Ink flood + Soullife signature writes on
      setTimeout(() => setStage(4), 3300),   // Full resolution lockup
      setTimeout(() => setShow(false), 3800),// Curtain fade-out
      setTimeout(() => setGone(true), 4200), // Unmount from DOM
    ];

    return () => t.forEach(clearTimeout);
  }, []);

  const handleSkip = () => {
    setShow(false);
    setTimeout(() => setGone(true), 300);
  };

  if (gone) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[250] flex flex-col items-center justify-center bg-[#070708] select-none transition-opacity duration-500 cursor-pointer ${
        show ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Click or press ESC to skip intro"
    >
      {/* 1. Architectural Drafting Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{ opacity: stage >= 1 && stage < 4 ? 0.35 : 0.15 }}
      >
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 md:h-[500px] md:w-[500px]">
          {[14, 38, 50, 62, 86].map((x) => (
            <span
              key={x}
              className="absolute top-0 h-full w-px bg-line"
              style={{ left: `${x}%` }}
            />
          ))}
          {[20, 35, 50, 65, 80].map((y) => (
            <span
              key={y}
              className="absolute left-0 w-full h-px bg-line"
              style={{ top: `${y}%` }}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/40 md:h-[420px] md:w-[420px]" />
          <div className="absolute left-0 top-0 h-full w-full border-t border-line/30 rotate-45 pointer-events-none" />
        </div>
      </div>

      {/* 2. Top Minimalist Precision Coordinates */}
      <div className="absolute top-8 inset-x-8 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-ink">BLACK-MAK® STUDIO</span>
        </span>
        <span className="hidden sm:inline-block text-muted">
          IDENTITY ARCHITECTURE · EST. 2014
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="hover:text-ink transition-colors border border-line/60 px-2 py-0.5 text-[0.58rem]"
        >
          SKIP ✕
        </button>
      </div>

      {/* 3. Central Stage: Pure White Monogram + Handwritten Soullife Signature */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Monogram drawing container: Pure Architectural White with Smoothness */}
        <div className="relative h-28 w-28 md:h-36 md:w-36 flex items-center justify-center">
          <svg
            viewBox={MARK_VIEWBOX}
            shapeRendering="geometricPrecision"
            className="h-full w-full overflow-visible drop-shadow-[0_0_24px_rgba(255,255,255,0.22)]"
          >
            {/* Stroke drafting path in pure white with ultra-smooth ease */}
            <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              d={MARK_D}
              stroke="#ffffff"
              strokeWidth={stage >= 3 ? 0.9 : 1.5}
              strokeLinejoin="miter"
              strokeMiterlimit={10}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{
                pathLength: stage >= 2 ? 1 : 0,
                fillOpacity: stage >= 3 ? 1 : 0,
              }}
              transition={{
                pathLength: { duration: 1.15, ease: [0.22, 1, 0.36, 1] },
                fillOpacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
              }}
              fill="#ffffff"
            />
          </svg>

          {/* Diamond white drafting spark following apex during drawing */}
          <AnimatePresence>
            {stage === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: [1, 1.3, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, repeat: Infinity }}
                className="absolute left-1/2 top-4 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* 4. Handwritten Soullife Signature: Muhamed Alaa + Signature Swash */}
        <div className="mt-5 flex flex-col items-center justify-center min-h-[110px]">
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Authentic Vector Calligraphic Signature */}
              <div className="relative overflow-hidden w-[300px] sm:w-[380px] md:w-[440px] aspect-[375/105] flex items-center justify-center">
                <svg
                  viewBox={SOULLIFE_VIEWBOX}
                  shapeRendering="geometricPrecision"
                  className="w-full h-full overflow-visible drop-shadow-[0_0_16px_rgba(255,255,255,0.3)] select-none"
                  role="img"
                  aria-label="Muhamed Alaa Signature"
                >
                  <defs>
                    {/* Individual letter reveal masks: creates authentic progressive handwriting effect */}
                    {SOULLIFE_LETTERS.map((letter, i) => {
                      const startX = letter.bbox.x1 - 3;
                      const startY = letter.bbox.y1 - 4;
                      const w = letter.bbox.x2 - letter.bbox.x1 + 6;
                      const h = letter.bbox.y2 - letter.bbox.y1 + 8;
                      const isFirstWord = i < 7; // "Muhamed" (0..6)
                      const delay = isFirstWord
                        ? 0.05 + i * 0.09
                        : 0.76 + (i - 7) * 0.11;

                      return (
                        <clipPath id={`soullife-clip-${i}`} key={i}>
                          <motion.rect
                            x={startX}
                            y={startY}
                            height={h}
                            initial={{ width: 0 }}
                            animate={{ width: w }}
                            transition={{
                              duration: 0.14,
                              delay,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                          />
                        </clipPath>
                      );
                    })}
                  </defs>

                  {/* The 11 letters of Muhamed Alaa in Soullife font */}
                  <g id="soullife-signature-letters">
                    {SOULLIFE_LETTERS.map((letter, i) => (
                      <path
                        key={i}
                        d={letter.d}
                        fill="#ffffff"
                        clipPath={`url(#soullife-clip-${i})`}
                      />
                    ))}
                  </g>

                  {/* Professional Underline Signature Swash — Draws progressively */}
                  <motion.path
                    d={SOULLIFE_SWASH_D}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: 0.55,
                        delay: 1.3,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: 0.05, delay: 1.3 },
                    }}
                  />

                  {/* Subtle white calligraphic pen nib glint following the stroke */}
                  <motion.circle
                    r={2}
                    fill="#ffffff"
                    className="drop-shadow-[0_0_8px_#ffffff]"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 1, 0],
                      cx: [25, 230, 245, 340, 376],
                      cy: [75, 88, 75, 88, 96],
                    }}
                    transition={{
                      duration: 1.85,
                      times: [0, 0.38, 0.45, 0.72, 1],
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </div>

              {/* Professional Craft Designation */}
              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.25em" }}
                animate={{ opacity: 1, letterSpacing: "0.35em" }}
                transition={{ duration: 0.45, delay: 1.7 }}
                className="mt-2 font-mono text-[0.62rem] sm:text-[0.68rem] uppercase text-muted text-center"
              >
                Muhamed Alaa Elbank · Logo & Visual Identity Practice
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>

      {/* 5. Bottom Status / Calibration Bar */}
      <div className="absolute bottom-8 inset-x-8 flex items-center justify-between font-mono text-[0.6rem] text-faint">
        <span className="tracking-widest">
          {stage < 3 ? "CALIBRATING GEOMETRIC IDENTITY..." : "AUTHORITY VERIFIED ✓"}
        </span>
        <div className="w-24 h-[1px] bg-line overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.6, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}