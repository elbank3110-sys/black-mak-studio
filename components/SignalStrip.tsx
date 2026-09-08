"use client";

import { useI18n } from "@/lib/i18n";

export default function SignalStrip() {
  const { t } = useI18n();
  const items = [t("signal.1"), t("signal.2"), t("signal.3"), t("signal.4")];
  return (
    <section aria-label="BLACK-MAK facts" className="border-y border-line bg-surface">
      <div className="container grid grid-cols-2 gap-4 py-5 text-faint md:grid-cols-4">
        {items.map((s, i) => (
          <span
            key={i}
            className="border-line-strong font-mono text-[0.58rem] uppercase tracking-[0.16em] md:border-e md:pe-4 last:border-e-0"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
