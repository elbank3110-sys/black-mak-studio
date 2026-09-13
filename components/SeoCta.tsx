"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// The closing bridge on SEO landing pages — one job: carry the reader from
// the argument to the studio's proof and the inquiry form.
export default function SeoCta() {
  const { t } = useI18n();
  return (
    <section className="section border-t border-line bg-surface">
      <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <span className="eyebrow mb-4 block text-faint">{t("seo.eyebrow")}</span>
          <HeadlineReveal className="display text-[clamp(2rem,4.6vw,3.8rem)]" html={t("seo.title")} />
          <p className="lede mt-6 max-w-[52ch]">{t("seo.text")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/#work" className="btn btn-ghost">
            <span>{t("seo.work")}</span>
            <span aria-hidden="true">↓</span>
          </a>
          <a href="/#start-a-project" className="btn btn-light">
            <span>{t("seo.cta")}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
