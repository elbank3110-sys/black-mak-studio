"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const SERVICES = [
  { no: "S.01", name: "services.s1name", desc: "services.s1desc", inc: "services.s1inc", type: "Logo Design" },
  { no: "S.02", name: "services.s2name", desc: "services.s2desc", inc: "services.s2inc", type: "Visual Identity" },
  { no: "S.03", name: "services.s3name", desc: "services.s3desc", inc: "services.s3inc", type: "Arabic & Latin Typography" },
  { no: "S.04", name: "services.s4name", desc: "services.s4desc", inc: "services.s4inc", type: "Brand Applications" },
  { no: "S.05", name: "services.s5name", desc: "services.s5desc", inc: "services.s5inc", type: "Digital Brand Experiences" },
  { no: "S.06", name: "services.s6name", desc: "services.s6desc", inc: "services.s6inc", type: "Rebrand" },
];

export default function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("services.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("services.title") }} />
            </div>
            <p className="lede max-w-[42ch]">{t("services.note")}</p>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.04}>
              <a
                href="#start-a-project"
                className="group grid grid-cols-[80px_1fr_auto] items-center gap-8 border-b border-line py-[clamp(1.5rem,3vw,2.7rem)] transition-colors duration-300 hover:bg-surface"
              >
                <span className="font-mono text-faint">{s.no}</span>
                <div>
                  <h3 className="text-[clamp(1.3rem,3vw,2.2rem)] font-bold leading-none tracking-tight">{t(s.name)}</h3>
                  <p className="mt-3 max-w-[54ch] text-muted">{t(s.desc)}</p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
                    <span className="text-muted">{t("services.incLabel")}</span> {t(s.inc)}
                  </p>
                </div>
                <span className="text-2xl text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">↗</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-line bg-surface p-[clamp(1.2rem,3vw,2rem)] md:flex-row md:items-center">
            <div>
              <strong className="block text-[1.05rem] font-bold">{t("services.portTitle")}</strong>
              <p className="mt-2 max-w-[52ch] text-[0.85rem] text-muted">{t("services.portText")}</p>
            </div>
            <a href="#start-a-project" className="btn btn-ghost shrink-0">
              <span>{t("services.portCta")}</span>
              <span>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
