"use client";

import { useI18n } from "@/lib/i18n";

// One slow marquee — CSS-only (translateX -50% on a doubled list).
// Pauses for reduced-motion users; aria-hidden because the text
// duplicates the SignalStrip facts above it.
export default function Marquee() {
  const { t } = useI18n();
  const text = t("marquee.text");

  return (
    <div
      className="marquee-row overflow-hidden border-b border-line bg-surface py-3"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max">
        <span className="marquee-cell font-mono text-[0.6rem] uppercase tracking-[0.22em] text-faint">
          {text}
        </span>
        <span className="marquee-cell font-mono text-[0.6rem] uppercase tracking-[0.22em] text-faint">
          {text}
        </span>
      </div>
    </div>
  );
}
