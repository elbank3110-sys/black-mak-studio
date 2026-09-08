"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const PLANS = [
  {
    tier: "S.01",
    name: "pricing.1name",
    desc: "pricing.1desc",
    price: "$159",
    items: ["pricing.1a", "pricing.1b", "pricing.1c", "pricing.1d"],
    featured: false,
  },
  {
    tier: "S.02",
    name: "pricing.2name",
    desc: "pricing.2desc",
    price: "$249",
    items: ["pricing.2a", "pricing.2b", "pricing.2c", "pricing.2d"],
    featured: false,
  },
  {
    tier: "S.03",
    name: "pricing.3name",
    desc: "pricing.3desc",
    price: "$649",
    items: ["pricing.3a", "pricing.3b", "pricing.3c", "pricing.3d"],
    featured: true,
  },
];

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
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("pricing.title") }} />
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="lede max-w-[42ch] md:text-end">{t("pricing.note")}</p>
              <p className="max-w-[42ch] font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint md:text-end">
                {t("pricing.microcopy")}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.tier} delay={i * 0.05} className={p.featured ? "md:-mt-4" : ""}>
              <article
                className={`relative flex h-full flex-col border bg-surface p-8 transition duration-300 hover:-translate-y-1 ${
                  p.featured ? "border-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]" : "border-line hover:border-line-strong"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-2 right-5 bg-ink px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-bg">
                    {t("pricing.featured")}
                  </span>
                )}
                <span className="font-mono text-faint">{p.tier}</span>
                <h3 className="mt-10 max-w-[15ch] text-[1.35rem] font-bold leading-tight">{t(p.name)}</h3>
                <p className="mt-3 min-h-[3.5em] max-w-[36ch] text-[0.85rem] text-muted">{t(p.desc)}</p>
                <strong className="mt-5 block text-[2.6rem] font-bold leading-none tracking-tight">
                  {p.price}
                  <small className="mt-2 block font-mono text-[0.6rem] font-normal uppercase tracking-[0.1em] text-muted">
                    {t("pricing.starting")}
                  </small>
                </strong>
                <ul className="mt-6 border-t border-line pt-4">
                  {p.items.map((k) => (
                    <li key={k} className="py-1 text-[0.85rem] text-muted before:text-faint">
                      <span className="me-2 text-faint">—</span>
                      {t(k)}
                    </li>
                  ))}
                </ul>
                <a href="#start-a-project" className={`btn mt-6 w-full ${p.featured ? "btn-navy" : "btn-ghost"}`}>
                  {t("nav.cta")} <span>↗</span>
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-line bg-surface p-[clamp(1.2rem,3vw,2rem)] md:flex-row md:items-center">
            <div>
              <strong className="block text-[1.05rem] font-bold">{t("pricing.upsellQ")}</strong>
              <p className="mt-2 max-w-[52ch] text-[0.85rem] text-muted">{t("pricing.upsellA")}</p>
            </div>
            <a href="#services" className="btn btn-ghost shrink-0">
              <span>{t("pricing.upsellCta")}</span>
              <span>↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-[72ch] text-[0.72rem] leading-relaxed text-faint">
            {t("pricing.disclaimer")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
