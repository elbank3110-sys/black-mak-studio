"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const FAQ = [
  { q: "faq.1q", a: "faq.1a" },
  { q: "faq.2q", a: "faq.2a" },
  { q: "faq.3q", a: "faq.3a" },
];

export default function Faq() {
  const { t } = useI18n();
  return (
    <section className="section border-t border-line py-[var(--section)]">
      <div className="container narrow">
        <Reveal>
          <div className="mb-10">
            <span className="eyebrow mb-4 block text-faint">{t("faq.index")}</span>
            <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("faq.title") }} />
          </div>
        </Reveal>

        <Reveal>
          <div className="border-t border-line">
            {FAQ.map((f, i) => (
              <details key={i} className="border-b border-line group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-xl font-bold">
                  {t(f.q)}
                  <span className="font-mono text-faint transition-transform duration-300 group-open:rotate-45 group-open:text-ink">+</span>
                </summary>
                <p className="max-w-[66ch] pb-6 text-muted">{t(f.a)}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
