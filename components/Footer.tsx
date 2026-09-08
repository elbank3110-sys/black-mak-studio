"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line px-0 py-16">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <a href="#top" className="text-xl font-black tracking-wider text-ink">
              BLACK-MAK
            </a>
            <p className="mt-4 max-w-[40ch] text-[0.85rem] text-muted">{t("footer.tagline")}</p>
          </div>
          <nav className="flex flex-wrap gap-6 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
            <a href="#work" className="transition-colors hover:text-ink">{t("nav.work")}</a>
            <a href="#services" className="transition-colors hover:text-ink">{t("nav.services")}</a>
            <a href="#about" className="transition-colors hover:text-ink">{t("nav.about")}</a>
            <a href="#pricing" className="transition-colors hover:text-ink">{t("nav.pricing")}</a>
            <a href="#start-a-project" className="transition-colors hover:text-ink">{t("nav.cta")}</a>
            <a
              href="https://mu-cv.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-ink"
            >
              {t("nav.cv")} <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
        <div className="mt-12 flex flex-col flex-wrap items-start justify-between gap-4 border-t border-line pt-5 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-faint md:flex-row">
          <span>{t("footer.rights")}</span>
          <span>{t("footer.end")}</span>
        </div>
      </div>
    </footer>
  );
}
