"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const CLIENTS = [
  { icon: "◆", label: "who.founders" },
  { icon: "◆", label: "who.startups" },
  { icon: "◆", label: "who.retail" },
  { icon: "◆", label: "who.agencies" },
  { icon: "◆", label: "who.restaurants" },
  { icon: "◆", label: "who.creative" },
];

export default function Who() {
  const { t } = useI18n();
  return (
    <section className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("who.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("who.title") }} />
            </div>
            <p className="lede max-w-[46ch]">{t("who.note")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CLIENTS.map((c, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="border border-line bg-surface p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-line-strong">
                <span className="block text-2xl text-faint">{c.icon}</span>
                <span className="mt-3 block text-[0.85rem] font-bold">{t(c.label)}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-10 border border-line bg-surface p-[clamp(1.2rem,3vw,2.2rem)]">
            <strong className="block text-[0.95rem] font-bold">{t("who.fitTitle")}</strong>
            <p className="mt-3 max-w-[72ch] text-[0.9rem] text-muted">{t("who.fit")}</p>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-10 max-w-[62ch] border-s-2 border-ink ps-5 text-[clamp(0.95rem,1.4vw,1.1rem)] font-medium leading-relaxed">
            {t("who.closing")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
