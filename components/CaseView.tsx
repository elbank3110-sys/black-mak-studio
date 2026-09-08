"use client";

import { useI18n } from "@/lib/i18n";
import { getCase, CASES } from "@/lib/cases";
import Reveal from "@/components/Reveal";

export default function CaseView({ slug }: { slug: string }) {
  const c = getCase(slug);
  const { lang, t } = useI18n();

  if (!c) {
    return (
      <section className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-40 text-center">
        <h1 className="display text-[clamp(2.5rem,7vw,6rem)]">404</h1>
        <a href="/#work" className="text-link">
          <span>{t("case.back")}</span>
          <span>↗</span>
        </a>
      </section>
    );
  }

  const d = lang === "ar" ? c.ar : c.en;

  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const prev = idx >= 0 ? CASES[(idx - 1 + CASES.length) % CASES.length] : CASES[0];
  const next = idx >= 0 ? CASES[(idx + 1) % CASES.length] : CASES[0];
  const prevTitle = lang === "ar" ? prev.ar.title : prev.en.title;
  const nextTitle = lang === "ar" ? next.ar.title : next.en.title;

  return (
    <article className="pt-[clamp(7rem,14vh,10rem)]">
      <div className="container">
        <Reveal>
          <a href="/#work" className="text-link mb-10 inline-flex">
            <span>← {t("case.back")}</span>
          </a>
        </Reveal>

        <Reveal>
          <span className="eyebrow mb-4 block text-faint">{d.tags}</span>
          <h1 className="display text-[clamp(2.8rem,8vw,8rem)]">{d.title}</h1>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 font-mono text-[0.62rem] uppercase tracking-[0.13em] text-muted sm:grid-cols-3">
            <div>
              <span className="block text-faint">{t("about.index")}</span>
              {d.role}
            </div>
            <div>
              <span className="block text-faint">{t("journey.4year")}</span>
              {d.year}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-faint">BLACK-MAK</span>
              {t("hero.role")}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="container mt-10">
          <img
            src={c.cover}
            alt={d.title}
            className="aspect-[16/9] w-full border border-line object-cover"
          />
        </div>
      </Reveal>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <p className="lede text-[clamp(1.2rem,2.2vw,1.8rem)] text-ink">{d.summary}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10 max-w-[64ch] space-y-5 text-muted">
              {d.body.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <span className="eyebrow mb-8 block text-faint">{t("work.index")}</span>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.05}>
                <figure className="overflow-hidden border border-line bg-surface">
                  <img
                    src={src}
                    alt={`${d.title} — ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-line bg-surface py-[var(--section)]">
        <div className="container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow mb-4 block text-faint">{t("case.startTitle")}</span>
            <h2 className="display">{t("case.startHeading")}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {c.behance && (
              <a href={c.behance} target="_blank" rel="noopener" className="btn btn-ghost">
                <span>{t("case.behance")}</span>
                <span>↗</span>
              </a>
            )}
            <a href="/#start-a-project" className="btn btn-light">
              <span>{t("case.startCta")}</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section border-t border-line py-[var(--section)]">
        <div className="container">
          <Reveal>
            <span className="eyebrow mb-8 block text-faint">{t("case.more")}</span>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal>
              <a
                href={`/work/${prev.slug}`}
                className="group block border border-line p-6 transition-colors hover:border-ink rtl:text-right"
              >
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
                  ← {t("case.prev")}
                </span>
                <span className="mt-3 block text-xl font-bold text-ink transition-colors group-hover:underline">
                  {prevTitle}
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.05}>
              <a
                href={`/work/${next.slug}`}
                className="group block border border-line p-6 transition-colors hover:border-ink rtl:text-right"
              >
                <span className="block font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">
                  {t("case.next")} →
                </span>
                <span className="mt-3 block text-xl font-bold text-ink transition-colors group-hover:underline">
                  {nextTitle}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
