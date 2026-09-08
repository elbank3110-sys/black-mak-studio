"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Statement() {
  const { t } = useI18n();
  return (
    <section className="section border-y border-line bg-surface py-[clamp(4rem,9vw,8rem)]">
      <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <Reveal>
          <h2 className="display max-w-[24ch] text-[clamp(2rem,4.8vw,5rem)]" dangerouslySetInnerHTML={{ __html: t("work.cta.line") }} />
        </Reveal>
        <Reveal delay={0.1}>
          <a href="#start-a-project" className="btn btn-light shrink-0">
            <span>{t("work.cta.btn")}</span>
            <span>↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
