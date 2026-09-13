"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

// ============================================================================
// HeroTitle — the page's one H1 gets the deepest entrance: lines rise through
// overflow masks on the signature ambient curve (1.1s), slightly staggered.
// Splitting happens ONLY at <br/> line boundaries — Arabic letter joining
// within each line is never broken, so Arabic rises too. Reduced-motion
// renders untouched.
// ============================================================================
export default function HeroTitle() {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const html = t("hero.title");

  if (reduce) {
    return <h1 className="display hero-title" dangerouslySetInnerHTML={{ __html: html }} />;
  }

  const lines = html.split(/<br\s*\/?>/i);
  return (
    <h1 className="display hero-title" dir={lang === "ar" ? "rtl" : undefined}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "112%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15 + i * 0.1,
            }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </span>
      ))}
    </h1>
  );
}
