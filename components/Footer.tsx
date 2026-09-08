"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line px-0 py-16">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-[38ch]">
            <a href="#top" className="text-xl font-black tracking-wider text-ink">
              BLACK-MAK<span className="align-super text-[0.6em]">®</span>
            </a>
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
              Logo & Visual Identity Design
            </p>
            <p className="mt-4 max-w-[40ch] text-[0.85rem] text-muted">{t("footer.tagline")}</p>
            <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              {t("footer.sig")}
            </p>
            <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-faint">
              Arabic & Latin / Worldwide
            </p>
          </div>
          <nav className="flex flex-col gap-5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
            <a href="#start-a-project" className="btn btn-light w-fit">
              <span>{t("nav.cta")}</span>
              <span>↗</span>
            </a>
            <div className="flex flex-wrap gap-6">
              <a href="#work" className="transition-colors hover:text-ink">{t("nav.work")}</a>
              <a href="#services" className="transition-colors hover:text-ink">{t("nav.services")}</a>
              <a href="#about" className="transition-colors hover:text-ink">{t("nav.about")}</a>
              <a href="#pricing" className="transition-colors hover:text-ink">{t("nav.pricing")}</a>
              <a
                href="https://mu-cv.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
              >
                {t("nav.cv")} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="https://wa.me/201002462821?text=Hi%20Muhamed%2C%20I%20found%20BLACK-MAK%20and%20I%27d%20like%20to%20discuss%20a%20branding%20project." target="_blank" rel="noopener" className="transition-colors hover:text-ink">WhatsApp</a>
              <a href="mailto:muhemedalaa2699@gmail.com?subject=New%20Brand%20Project%20%E2%80%94%20BLACK-MAK" className="transition-colors hover:text-ink">Email</a>
              <a href="https://www.behance.net/Muhmed-alaa-el-bank" target="_blank" rel="noopener" className="transition-colors hover:text-ink">Behance</a>
            </div>
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
