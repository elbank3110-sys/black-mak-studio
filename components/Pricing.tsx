"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import CountdownTimer from "./CountdownTimer";

const PLANS = [
  {
    tier: "S.01",
    name: "pricing.1name",
    price: "$159",
    old: "$199",
    items: ["pricing.1a", "pricing.1b", "pricing.1c", "pricing.1d"],
    featured: false,
  },
  {
    tier: "S.03",
    name: "pricing.2name",
    price: "$229",
    old: "$289",
    items: ["pricing.2a", "pricing.2b", "pricing.2c", "pricing.2d"],
    featured: false,
  },
  {
    tier: "S.04",
    name: "pricing.3name",
    price: "$649",
    old: "$799",
    items: ["pricing.3a", "pricing.3b", "pricing.3c", "pricing.3d"],
    featured: true,
  },
  {
    tier: "S.05",
    name: "pricing.4name",
    price: "$79",
    old: "$99",
    items: ["pricing.4a", "pricing.4b", "pricing.4c", "pricing.4d"],
    featured: false,
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
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
                {t("pricing.offer")}
              </span>
              <span className="eyebrow mb-4 block text-faint">{t("pricing.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("pricing.title") }} />
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <CountdownTimer />
              <p className="lede max-w-[42ch] md:text-end">{t("pricing.note")}</p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal key={p.tier} delay={i * 0.05}>
              <article
                className={`relative flex h-full min-h-[370px] flex-col border bg-surface p-8 transition duration-300 hover:-translate-y-1 ${
                  p.featured ? "border-ink" : "border-line hover:border-line-strong"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-2 right-5 bg-ink px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-bg">
                    {t("pricing.featured")}
                  </span>
                )}
                <span className="font-mono text-faint">{p.tier}</span>
                <h3 className="mt-10 max-w-[13ch] text-[1.35rem] font-bold leading-tight">{t(p.name)}</h3>
                <div className="mb-3 mt-6 flex items-center gap-3">
                  <span className="font-mono text-[0.8rem] text-faint line-through">{p.old}</span>
                  <span className="bg-ink px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-bg">
                    {t("pricing.save")} {Math.round((1 - Number(p.price.slice(1)) / Number(p.old.slice(1))) * 100)}%
                  </span>
                </div>
                <strong className="block text-[2.6rem] font-bold leading-none tracking-tight">
                  {p.price}
                  <small className="mt-2 block font-mono text-[0.6rem] font-normal uppercase tracking-[0.1em] text-muted">
                    {t("pricing.starting")}
                  </small>
                </strong>
                <ul className="mt-auto border-t border-line pt-4">
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
      </div>
    </section>
  );
}
