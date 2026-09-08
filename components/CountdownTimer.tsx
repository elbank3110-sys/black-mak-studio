"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

// Rolling scarcity hook: a 5-day countdown anchored to a fixed epoch so it's
// identical for every visitor, and auto-restarts to the next 5-day window when
// it hits zero. No backend needed; pure client math.
const WINDOW_MS = 5 * 24 * 60 * 60 * 1000; // 5 days
const ANCHOR = Date.UTC(2026, 0, 1, 0, 0, 0); // fixed start reference

function remaining() {
  const now = Date.now();
  const elapsed = (now - ANCHOR) % WINDOW_MS;
  return WINDOW_MS - elapsed;
}

function fmt(n: number) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer() {
  const { t, lang } = useI18n();
  const [ms, setMs] = useState<number | null>(null);

  useEffect(() => {
    setMs(remaining());
    const id = setInterval(() => setMs(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  if (ms === null) {
    // stable SSR/first-paint placeholder to avoid hydration mismatch
    return (
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink">
        · · : · · : · · : · ·
      </span>
    );
  }

  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);

  const labels =
    lang === "ar"
      ? { d: "يوم", h: "ساعة", m: "دقيقة", s: "ثانية" }
      : { d: "days", h: "hrs", m: "min", s: "sec" };

  const Cell = ({ v, l }: { v: number; l: string }) => (
    <span className="inline-flex flex-col items-center">
      <span className="min-w-[2.2ch] text-center text-[1.05rem] font-bold leading-none tabular-nums text-ink">
        {fmt(v)}
      </span>
      <span className="mt-1 text-[0.5rem] uppercase tracking-[0.12em] text-faint">{l}</span>
    </span>
  );

  return (
    <div
      className="inline-flex items-center gap-3 border border-line-strong bg-bg/60 px-4 py-2 backdrop-blur-sm"
      role="timer"
      aria-label={t("pricing.endsIn")}
      dir="ltr"
    >
      <span className="me-1 inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">
          {t("pricing.endsIn")}
        </span>
      </span>
      <Cell v={days} l={labels.d} />
      <span className="text-faint">:</span>
      <Cell v={hours} l={labels.h} />
      <span className="text-faint">:</span>
      <Cell v={mins} l={labels.m} />
      <span className="text-faint">:</span>
      <Cell v={secs} l={labels.s} />
    </div>
  );
}
