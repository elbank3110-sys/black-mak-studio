"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import CvViewer from "./CvViewer";

export default function About() {
  const { t } = useI18n();
  const statsRef = useRef<HTMLDivElement>(null);
  const [cvOpen, setCvOpen] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("b[data-count]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          nums.forEach((b) => {
            const target = Number(b.dataset.count);
            const suffix = b.dataset.suffix || "";
            const dur = 1400;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min((now - start) / dur, 1);
              const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
              b.textContent = val + suffix;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
          io.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("about.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("about.title") }} />
            </div>
            <p className="lede max-w-[42ch]">{t("about.note")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-[clamp(2.5rem,8vw,9rem)] lg:grid-cols-[minmax(280px,0.75fr)_1.25fr]">
          <Reveal>
            <figure className="relative overflow-hidden border border-line bg-surface">
              <img src="/profile.webp" alt="Portrait of Muhamed Alaa Elbank" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale contrast-105 transition duration-500 hover:scale-[1.02] hover:grayscale-[0.3]" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-bg/85 px-4 py-3 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-ink backdrop-blur-md">
                <span>BLACK-MAK</span>
                <span>MUHAMED ALAA ELBANK</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="text-[clamp(1.25rem,2.1vw,1.75rem)] font-bold leading-snug text-ink" dangerouslySetInnerHTML={{ __html: t("about.lede") }} />
              <p className="mt-5 max-w-[60ch] text-muted">{t("about.p1")}</p>
              <p className="mt-5 max-w-[60ch] text-muted">{t("about.p2")}</p>

              <div ref={statsRef} className="my-10 grid grid-cols-3 border-y border-line">
                <div className="border-e border-line p-5">
                  <b className="block text-[clamp(2rem,4vw,3.8rem)] font-bold leading-none tracking-tight" data-count="12" data-suffix="+">12+</b>
                  <span className="mt-3 block font-mono text-[0.6rem] uppercase tracking-[0.13em] text-muted">{t("about.stat1")}</span>
                </div>
                <div className="border-e border-line p-5">
                  <b className="block text-[clamp(2rem,4vw,3.8rem)] font-bold leading-none tracking-tight" data-count="50" data-suffix="+">50+</b>
                  <span className="mt-3 block font-mono text-[0.6rem] uppercase tracking-[0.13em] text-muted">{t("about.stat2")}</span>
                </div>
                <div className="p-5">
                  <b className="block text-[clamp(2rem,4vw,3.8rem)] font-bold leading-none tracking-tight" data-count="95" data-suffix="%">95%</b>
                  <span className="mt-3 block font-mono text-[0.6rem] uppercase tracking-[0.13em] text-muted">{t("about.stat3")}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setCvOpen(true)}
                  className="btn btn-navy group"
                >
                  <svg className="relative z-10" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M9 13h6M9 17h4" />
                  </svg>
                  <span className="relative z-10">{t("about.cv")}</span>
                  <span className="relative z-10" aria-hidden="true">↗</span>
                </button>

                <a
                  href="https://www.behance.net/Muhmed-alaa-el-bank"
                  target="_blank"
                  rel="noopener"
                  className="btn btn-light group"
                >
                  <svg className="relative z-10" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8.19 6.6c.61 0 1.17.05 1.68.16.5.1.94.28 1.3.52.36.24.64.57.84.98.2.41.29.92.29 1.52 0 .65-.15 1.19-.44 1.62-.3.44-.73.79-1.31 1.07.79.23 1.38.62 1.77 1.19.39.56.58 1.24.58 2.04 0 .64-.12 1.2-.37 1.66-.25.47-.59.85-1.01 1.14-.42.29-.91.5-1.45.64-.54.13-1.1.2-1.66.2H2V6.6h6.19zM7.83 11.2c.5 0 .91-.12 1.23-.36.32-.24.48-.63.48-1.16 0-.3-.05-.54-.16-.73-.11-.19-.25-.34-.44-.44-.18-.11-.39-.18-.63-.22-.24-.04-.49-.06-.74-.06H4.76v2.97h3.07zm.17 4.83c.28 0 .54-.03.79-.08.25-.06.46-.15.65-.28.18-.13.33-.3.44-.52.11-.22.16-.5.16-.83 0-.65-.18-1.11-.55-1.39-.37-.28-.86-.42-1.46-.42H4.76v3.52H8zm7.9-.94c.37.36.9.54 1.6.54.5 0 .93-.13 1.29-.38.36-.25.58-.52.66-.79h2.14c-.34 1.06-.87 1.82-1.58 2.28-.71.46-1.57.69-2.57.69-.7 0-1.32-.11-1.88-.34-.56-.22-1.03-.54-1.42-.96-.39-.42-.69-.91-.9-1.49-.21-.58-.31-1.21-.31-1.9 0-.67.11-1.29.32-1.87.22-.58.52-1.07.92-1.49.4-.42.87-.75 1.42-.99.55-.24 1.16-.36 1.83-.36.75 0 1.4.15 1.96.44.56.29 1.02.68 1.38 1.16.36.48.62 1.04.78 1.66.16.62.22 1.27.17 1.95h-6.15c0 .7.24 1.29.61 1.65zm2.79-4.47c-.3-.32-.74-.49-1.32-.49-.38 0-.7.06-.95.19-.25.13-.45.29-.61.48-.15.19-.26.39-.32.61-.06.21-.1.4-.11.57h3.81c-.06-.6-.27-1.04-.5-1.36zM15.44 7.53h4.77v1.16h-4.77z" />
                  </svg>
                  <span className="relative z-10">Behance</span>
                  <span className="relative z-10" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <CvViewer open={cvOpen} onClose={() => setCvOpen(false)} />
    </section>
  );
}
