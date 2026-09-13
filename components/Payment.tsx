"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

const ROWS = [
  { label: "payment.vodafone", value: "+20 100 246 2821" },
  { label: "payment.instapay", value: "+20 111 698 7764" },
  { label: "payment.paypal", value: "makeenmuhamed31@gmail.com" },
];

export default function Payment() {
  const { t } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (v: string) => {
    navigator.clipboard
      ?.writeText(v)
      .then(() => {
        setCopied(v);
        setTimeout(() => setCopied(null), 1800);
      })
      .catch(() => {});
  };

  return (
    <section id="payment" className="section border-t border-line bg-bg py-[var(--section)]">
      <div className="container">
        <div className="max-w-[920px]">
          <Reveal>
            <div className="mb-10 flex flex-col items-start gap-4">
              <div>
                <span className="eyebrow mb-4 block text-faint">{t("payment.index")}</span>
                <HeadlineReveal className="display text-[clamp(2.4rem,5.5vw,4.6rem)]" html={t("payment.title")} />
              </div>
              <p className="lede max-w-[42ch]">{t("payment.note")}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="border border-line-strong bg-surface p-[clamp(1.2rem,3vw,2rem)]">
              <div className="flex items-center justify-between gap-4 border-b border-line pb-4 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                <span>{t("payment.label")}</span>
                <span>BLACK-MAK / SECURE START</span>
              </div>
              <div>
                {ROWS.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => copy(r.value)}
                    className={`press-row grid w-full grid-cols-1 items-center gap-2 border-b border-line py-5 text-start last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:gap-4 ${copied === r.value ? "copy-flash" : ""}`}
                  >
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{t(r.label)}</span>
                    <strong className="font-mono text-[0.85rem] font-normal" dir="ltr">{r.value}</strong>
                    <span aria-live="polite" className={`font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-colors ${copied === r.value ? "text-ink" : "text-muted"}`}>
                      {copied === r.value ? (
                        <span className="inline-flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {t("payment.copied")}
                        </span>
                      ) : (
                        t("payment.copy")
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-4 max-w-[68ch] text-[0.83rem] leading-relaxed text-muted">{t("payment.footnote")}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 md:flex-row md:items-center">
              <p className="display max-w-[28ch] text-[clamp(1.3rem,2.6vw,2rem)]">{t("payment.backQ")}</p>
              <a href="/#start-a-project" className="btn btn-ghost shrink-0">
                <span>← {t("payment.backCta")}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
