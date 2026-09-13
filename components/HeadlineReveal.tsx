"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

// ============================================================================
// HeadlineReveal — display headlines rise line-by-line through overflow
// masks instead of the uniform fade. The HTML (from i18n, with <br/>/<em>)
// is split into lines at the <br/> boundaries; each line gets its own mask.
// Splitting at LINE boundaries (never word boundaries) is safe for Arabic:
// the joining inside each line is untouched, so Arabic gets the same rise
// as Latin. Reduced-motion renders untouched.
// ============================================================================
export default function HeadlineReveal({
  html,
  className = "",
  delay = 0,
}: {
  html: string;
  className?: string;
  delay?: number;
}) {
  const { lang } = useI18n();
  const reduce = useReducedMotion();
  const lines = html.split(/<br\s*\/?>/i);

  if (reduce) {
    return (
      <h2
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <h2 className={className} dir={lang === "ar" ? "rtl" : undefined}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "108%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.08,
            }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </span>
      ))}
    </h2>
  );
}
