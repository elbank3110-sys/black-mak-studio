"use client";

import { useI18n } from "@/lib/i18n";

// The bilingual identity strip — Latin and Arabic alternate as one system,
// which IS the studio's core differentiator, instead of a generic English
// service list. CSS-only (translateX -50% on a doubled list).
// Pauses for reduced-motion users; aria-hidden (purely decorative).
export default function Marquee() {
  const { t } = useI18n();
  const latin = "IDENTITY ";
  const arabic = "هُوِيَّة ";
  const diamond = "◆ ";

  // One cell: IDENTITY ◆ هوية ◆ — the message is the duality itself.
  const cell = `${t("marquee.identity")}${diamond}${arabic.trim()}${diamond}`;

  return (
    <div className="marquee-row overflow-hidden border-b border-line bg-surface py-4">
      {/* screen-reader alternative to the decorative strip */}
      <ul className="sr-only">
        <li>{t("marquee.identity")}</li>
        <li>هوية</li>
        <li>Logo Design</li>
        <li>Visual Identity</li>
        <li>Arabic + Latin Typography</li>
        <li>Brand Systems</li>
      </ul>
      <div className="marquee-track flex w-max" aria-hidden="true">
        {[0, 1].map((n) => (
          <span
            key={n}
            className="marquee-cell whitespace-nowrap pe-8 text-[clamp(1rem,2vw,1.5rem)] font-bold uppercase tracking-[0.18em] text-faint"
          >
            {cell}
            <span className="mx-6 align-middle text-[0.8em]">{latin.trim()}</span>
            {diamond}
          </span>
        ))}
      </div>
    </div>
  );
}
