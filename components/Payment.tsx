"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const ROWS = [
  { label: "payment.vodafone", value: "+20 100 246 2821" },
  { label: "payment.instapay", value: "+20 111 698 7764" },
  { label: "payment.paypal", value: "makeenmuhamed31@gmail.com" },
];

export default function Payment() {
  const { t } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (v: string) => {
    navigator.clipboard?.writeText(v).then(() => {
      setCopied(v);
      setTimeout(() => setCopied(null), 1800);
    });
  };

  return (
    <section id="payment" className="section border-t border-line bg-bg py-[var(--section)]">
      <div className="container">
        <div className="max-w-[920px] text-left">
        <Reveal>
          <div className="mb-10 flex flex-col items-start gap-4 text-left">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("payment.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("payment.title") }} />
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
                  className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line py-5 text-start"
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{t(r.label)}</span>
                  <strong className="font-mono text-[0.85rem] font-normal" dir="ltr">{r.value}</strong>
                  <span className={`font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-colors ${copied === r.value ? "text-ink" : "text-muted"}`}>
                    {copied === r.value ? t("payment.copied") : t("payment.copy")}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 max-w-[68ch] text-[0.83rem] leading-relaxed text-muted">{t("payment.footnote")}</p>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
