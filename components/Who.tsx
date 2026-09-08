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
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)]">
            <span className="eyebrow mb-4 block text-faint">{t("who.index")}</span>
            <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("who.title") }} />
            <p className="lede mt-6 max-w-[52ch]">{t("who.note")}</p>
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

        <Reveal delay={0.3}>
          <p className="mt-10 max-w-[52ch] text-[0.85rem] text-muted">{t("who.closing")}</p>
        </Reveal>
      </div>
    </section>
  );
}
