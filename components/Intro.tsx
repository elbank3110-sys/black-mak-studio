"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MARK_D, MARK_VIEWBOX } from "./HeroMark";
import {
  HOLIMOUNT_NAME_D,
  HOLIMOUNT_SWASH_D,
  HOLIMOUNT_SWASH_TRANSFORM,
} from "@/lib/signatureData";

// ============================================================================
// Cinematic Brand Intro — 2.75s Architectural Mark & Holimount Signature
// 1. 0–350ms: Drafting blueprint grid & coordinate calibration
// 2. 350–1450ms: SVG stroke-by-stroke drafting of the monogram with laser precision
// 3. 1450–2250ms: Solid ink flood + Fast handwritten signature using the official
//    Holimount & Holimount Swash fonts provided by Muhamed Alaa.
// 4. 2250–2750ms: Complete brand presence & seamless fade-out curtain
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

    // Phase Timeline (Total ~2.75 seconds):
    // 0ms: Blueprint grid
    // 350ms: Start monogram stroke drawing
    // 1450ms: Ink flood + Signature writes swiftly
    // 2250ms: Full lockup resolution
    // 2750ms: Curtain fade-out
    const t = [
      setTimeout(() => setStage(1), 100),   // Grid lines initiate
      setTimeout(() => setStage(2), 350),   // Monogram draws
      setTimeout(() => setStage(3), 1450),  // Ink flood + Signature writes swiftly
      setTimeout(() => setStage(4), 2250),  // Final glow & lockup
      setTimeout(() => setShow(false), 2750), // Fade out
      setTimeout(() => setGone(true), 3100),  // Unmount from DOM
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
      className={`fixed inset-0 z-[250] flex flex-col items-center justify-center bg-[#070708] select-none transition-opacity duration-400 cursor-pointer ${
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
          {/* Subtle vertical and horizontal grid lines */}
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
          {/* Circular precision compass ring */}
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/40 md:h-[420px] md:w-[420px]" />
          {/* 45-degree guide line */}
          <div className="absolute left-0 top-0 h-full w-full border-t border-line/30 rotate-45 pointer-events-none" />
        </div>
      </div>

      {/* 2. Top Minimalist Precision Coordinates */}
      <div className="absolute top-8 inset-x-8 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-seal animate-pulse" />
          <span>BLACK-MAK® STUDIO</span>
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

      {/* 3. Central Stage: Monogram + Authentic Holimount Signature */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Monogram drawing container */}
        <div className="relative h-28 w-28 md:h-36 md:w-36 flex items-center justify-center">
          <svg
            viewBox={MARK_VIEWBOX}
            shapeRendering="geometricPrecision"
            className="h-full w-full overflow-visible drop-shadow-[0_0_24px_rgba(201,162,39,0.25)]"
          >
            <defs>
              <linearGradient id="introGoldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5f5f1" />
                <stop offset="50%" stopColor="#c9a227" />
                <stop offset="100%" stopColor="#f5f5f1" />
              </linearGradient>
            </defs>

            {/* Stroke drafting path */}
            <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              d={MARK_D}
              stroke="url(#introGoldSheen)"
              strokeWidth={stage >= 3 ? 0.8 : 1.6}
              strokeLinejoin="miter"
              strokeMiterlimit={10}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{
                pathLength: stage >= 2 ? 1 : 0,
                fillOpacity: stage >= 3 ? 1 : 0,
              }}
              transition={{
                pathLength: { duration: 1.1, ease: [0.5, 0, 0.2, 1] },
                fillOpacity: { duration: 0.45, ease: "easeOut", delay: 0.05 },
              }}
              fill="#f5f5f1"
            />
          </svg>

          {/* Golden laser drafting spark following apex during drawing */}
          <AnimatePresence>
            {stage === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: [1, 1.4, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute left-1/2 top-4 h-2 w-2 -translate-x-1/2 rounded-full bg-seal shadow-[0_0_12px_#c9a227]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* 4. Authentic Handwritten Signature: Muhamed Alaa (38-lineart - Holimount + Holimount swash) */}
        <div className="mt-5 flex flex-col items-center justify-center min-h-[105px]">
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* Authentic Vector Calligraphic Signature */}
              <div className="relative overflow-hidden w-[280px] sm:w-[350px] md:w-[410px] aspect-[430/120] flex items-center justify-center">
                <motion.svg
                  viewBox="-15 5 435 115"
                  shapeRendering="geometricPrecision"
                  className="w-full h-full overflow-visible drop-shadow-[0_2px_18px_rgba(201,162,39,0.45)] select-none"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  role="img"
                  aria-label="Muhamed Alaa Signature"
                >
                  <defs>
                    <linearGradient id="introSigGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f5f5f1" />
                      <stop offset="35%" stopColor="#f5f5f1" />
                      <stop offset="60%" stopColor="#c9a227" />
                      <stop offset="100%" stopColor="#e8c85a" />
                    </linearGradient>
                  </defs>
                  {/* Exact vector curves of 'Muhamed Alaa' from 38-lineart - Holimount */}
                  <path d={HOLIMOUNT_NAME_D} fill="url(#introSigGold)" />
                  {/* Exact underline swash from 38-lineart - Holimount swash */}
                  <g transform={HOLIMOUNT_SWASH_TRANSFORM}>
                    <path d={HOLIMOUNT_SWASH_D} fill="#c9a227" />
                  </g>
                </motion.svg>
              </div>

              {/* Professional Craft Designation */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                className="mt-2 font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.35em] text-muted text-center"
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
            className="h-full bg-seal"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.7, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}