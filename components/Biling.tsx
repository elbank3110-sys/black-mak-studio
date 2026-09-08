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
          <div className="mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-faint">
            <span dir="ltr">عربي — AR</span>
            <span className="text-ink">◆</span>
            <span dir="ltr">LATIN — EN</span>
            <span className="text-ink">◆</span>
            <span dir="ltr">ONE SYSTEM</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
