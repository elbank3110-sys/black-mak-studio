"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

// Proof layer — testimonials + selected clients.
// NOTE: quotes/roles are placeholder copy pending real client approvals;
// names/companies come from the practice's actual history (data to confirm).
const QUOTES = [
  { q: "proof.1quote", r: "proof.1role" },
  { q: "proof.2quote", r: "proof.2role" },
  { q: "proof.3quote", r: "proof.3role" },
];

const CLIENTS = [
  "proof.c1",
  "proof.c2",
  "proof.c3",
  "proof.c4",
  "proof.c5",
  "proof.c6",
];

export default function Proof() {
  const { t } = useI18n();

  return (
    <section id="proof" className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("proof.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("proof.title") }} />
            </div>
            <p className="lede max-w-[42ch]">{t("proof.note")}</p>
          </div>
        </Reveal>

        {/* testimonials */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {QUOTES.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.06}>
              <figure className="corner-frame flex h-full flex-col justify-between border border-line bg-bg p-7 transition duration-300 hover:-translate-y-1 hover:border-line-strong">
                <span className="display text-[2.4rem] leading-none text-faint" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted">
                  {t(item.q)}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
                  {t(item.r)}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* selected clients */}
        <Reveal delay={0.1}>
          <div className="mt-12 border-t border-line pt-10">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-baseline">
              <span className="eyebrow">{t("proof.clientsTitle")}</span>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-faint">
                {t("proof.clientsNote")}
              </p>
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
              {CLIENTS.map((c) => (
                <li
                  key={c}
                  className="border-b border-line pb-3 text-[0.82rem] font-semibold tracking-tight text-muted transition-colors hover:text-ink"
                >
                  {t(c)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
