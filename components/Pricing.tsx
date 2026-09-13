"use client";

import { useI18n } from "@/lib/i18n";
import { INVESTMENT_PLAN_TIERS, fmtPrice } from "@/lib/services";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// ============================================================================
// Pricing — rendered from lib/services.ts (single source of truth, shared
// with the Services section). Featured = Full Visual Identity (S.02).
// ============================================================================

export default function Pricing() {
  const { t } = useI18n();
  return (
    <section id="pricing" className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 border border-ink px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                {t("pricing.offer")}
              </span>
              <span className="eyebrow mb-4 block text-faint">{t("pricing.index")}</span>
              <HeadlineReveal className="display text-[clamp(2.6rem,5.5vw,4.6rem)]" html={t("pricing.title")} />
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="lede max-w-[42ch] md:text-end">{t("pricing.note")}</p>
              <p className="max-w-[42ch] font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint md:text-end">
                {t("pricing.notEvery")}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-fr">
            {INVESTMENT_PLAN_TIERS.map((p) => (
              <article
                key={p.id}
                className={`pricing-card corner-frame relative flex h-full flex-col border bg-surface p-8 transition duration-300 hover:-translate-y-1 ${
                  p.featured ? "border-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]" : "border-line hover:border-line-strong"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-2 right-5 bg-ink px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-bg">
                    {t("pricing.featured")}
                  </span>
                )}
                <span className="font-mono text-faint">{p.id}</span>
                <h3 className="mt-10 max-w-[15ch] text-[1.35rem] font-bold leading-tight">{t(p.planNameKey)}</h3>
                <p className="mt-3 max-w-[36ch] text-[0.85rem] text-muted">{t(p.planDescKey)}</p>
                <strong className="mt-5 block text-[2.6rem] font-bold leading-none tracking-tight">
                  {fmtPrice(p.from ?? 0)}
                  <small className="mt-2 block font-mono text-[0.6rem] font-normal uppercase tracking-[0.1em] text-muted">
                    {t("pricing.starting")}
                  </small>
                </strong>
                <ul className="mt-6 flex-1 border-t border-line pt-4">
                  {p.planItemsKeys.map((k) => (
                    <li key={k} className="py-1 text-[0.85rem] text-muted">
                      <span className="me-2 text-faint">—</span>
                      {t(k)}
                    </li>
                  ))}
                  <li className="mt-2 border-t border-line/60 pt-2 text-[0.72rem] italic leading-relaxed text-faint">
                    {t(p.planExtraKey)}
                  </li>
                </ul>
                <a href="#start-a-project" className={`btn mt-6 w-full ${p.featured ? "btn-light" : "btn-ghost"}`}>
                  {t(p.planCtaKey)} <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </Reveal>

        {/* custom-scope anchors — Rebrand + Digital get their starting points */}
        <Reveal delay={0.16}>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-4 border border-line bg-bg px-6 py-5">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                {t("services.s6name")}
              </span>
              <strong className="shrink-0 font-mono text-[0.78rem] text-ink">{t("pricing.rebrand")}</strong>
            </div>
            <div className="flex items-center justify-between gap-4 border border-line bg-bg px-6 py-5">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                {t("services.s5name")}
              </span>
              <strong className="shrink-0 font-mono text-[0.78rem] text-ink">{t("pricing.digital")}</strong>
            </div>
          </div>
          <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-faint">
            {t("pricing.customNote")}
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-6 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
            <p className="display max-w-[28ch] text-[clamp(1.3rem,2.6vw,2rem)]">{t("pricing.ctaQ")}</p>
            <a href="#start-a-project" className="btn btn-light shrink-0">
              <span>{t("pricing.cta3")}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[72ch] text-[0.72rem] leading-relaxed text-faint">
            {t("pricing.notEvery")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
