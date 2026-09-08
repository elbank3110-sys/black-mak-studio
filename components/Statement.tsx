"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Statement() {
  const { t } = useI18n();
  return (
    <section className="section border-y border-line bg-surface py-[clamp(4.5rem,10vw,9rem)]">
      <div className="container flex flex-col items-end justify-between gap-8 md:flex-row">
        <Reveal>
          <h2 className="display text-[clamp(2.4rem,5.8vw,6.5rem)]" dangerouslySetInnerHTML={{ __html: t("statement.title") }} />
        </Reveal>
        <Reveal delay={0.1}>
          <a href="#start-a-project" className="btn btn-light">
            <span>{t("statement.cta")}</span>
            <span>↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
