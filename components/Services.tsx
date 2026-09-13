"use client";

import { useI18n } from "@/lib/i18n";
import { SERVICE_TIERS, fmtPrice } from "@/lib/services";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// ============================================================================
// Services — pure index rows, rendered from lib/services.ts (the single
// source of truth shared with the Investment section — ids and prices can
// never disagree). The mobile layout collapses the fixed 80px number column
// into a stacked row so 360px screens breathe.
// The "portfolio for your own work" banner is gone: it contradicted the
// "identity is the core practice — not one service among dozens" position.
// Digital brand experiences (S.05) carry their own row, framed as an
// extension of identity work, not a parallel gig.
// ============================================================================

export default function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="relative section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("services.index")}</span>
              <HeadlineReveal className="display text-[clamp(2.6rem,5.5vw,4.6rem)]" html={t("services.title")} />
            </div>
            <p className="lede max-w-[42ch]">{t("services.note")}</p>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {SERVICE_TIERS.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <a
                href="#start-a-project"
                className="service-row group grid grid-cols-1 items-center gap-3 border-b border-line py-[clamp(1.5rem,3vw,2.7rem)] transition-colors duration-300 hover:bg-surface sm:grid-cols-[64px_1fr_auto] sm:gap-8"
              >
                <span className="service-no font-mono text-faint">{s.id}</span>
                <div>
                  <h3 className="text-[clamp(1.3rem,3vw,2.2rem)] font-bold leading-none tracking-tight">{t(s.nameKey)}</h3>
                  <p className="mt-3 max-w-[54ch] text-muted">{t(s.descKey)}</p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
                    <span className="text-muted">{t("services.incLabel")}</span> {t(s.incKey)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <span className="service-price font-mono text-[0.78rem] text-faint group-hover:text-ink">
                    {s.from !== null ? `${t("pricing.starting")} ${fmtPrice(s.from)}` : t("pricing.custom")}
                  </span>
                  <span className="text-2xl text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink" aria-hidden="true">↗</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-[72ch] text-[0.83rem] leading-relaxed text-muted">
            {t("services.built")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
