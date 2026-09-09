"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Biling() {
  const { t } = useI18n();
  return (
    <section className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="grid grid-cols-1 gap-[clamp(2rem,6vw,5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("biling.index")}</span>
              <h2 className="display text-[clamp(2.4rem,5.5vw,5.5rem)]" dangerouslySetInnerHTML={{ __html: t("biling.title") }} />
            </div>
            <p className="lede max-w-[46ch]">{t("biling.text")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="biling-row mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-faint">
            <span className="biling-chip" dir="ltr">عربي — AR</span>
            <span className="biling-diamond text-ink">◆</span>
            <span className="biling-chip" dir="ltr">LATIN — EN</span>
            <span className="biling-diamond text-ink">◆</span>
            <span className="biling-chip" dir="ltr">ONE SYSTEM</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] border border-line bg-bg p-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("bts.index")}</span>
              <h3 className="display text-[clamp(1.6rem,3.6vw,2.8rem)]">{t("bts.title")}</h3>
            </div>
            <p className="text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-muted">{t("bts.text")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
