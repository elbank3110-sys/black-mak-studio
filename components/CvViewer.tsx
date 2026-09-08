"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

type Fmt = "pdf" | "ats" | "jpg";

const FILES: Record<Fmt, { href: string; download: string }> = {
  pdf: { href: "/cv/muhamed-alaa-cv.pdf", download: "Muhamed-Alaa-CV.pdf" },
  ats: { href: "/cv/muhamed-alaa-cv-ats.pdf", download: "Muhamed-Alaa-CV-ATS.pdf" },
  jpg: { href: "/cv/muhamed-alaa-cv.jpg", download: "Muhamed-Alaa-CV.jpg" },
};

// Order is deliberate: PDF (visual) → ATS (recruiter-friendly) → JPG (quick look).
const ORDER: Fmt[] = ["pdf", "ats", "jpg"];

export default function CvViewer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useI18n();
  const [fmt, setFmt] = useState<Fmt>("pdf");

  useEffect(() => {
    if (!open) return;
    setFmt("pdf");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const meta: Record<Fmt, { label: string; desc: string }> = {
    pdf: { label: t("cv.pdf"), desc: t("cv.pdfDesc") },
    ats: { label: t("cv.ats"), desc: t("cv.atsDesc") },
    jpg: { label: t("cv.jpg"), desc: t("cv.jpgDesc") },
  };

  const current = FILES[fmt];

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={t("cv.title")}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative z-10 flex h-[92vh] w-full max-w-5xl flex-col border border-line-strong bg-bg shadow-2xl">
        {/* header */}
        <div className="flex flex-col gap-4 border-b border-line px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="eyebrow block text-faint">{t("cv.index")}</span>
            <h3 className="mt-1 text-lg font-bold">{t("cv.title")}</h3>
          </div>

          {/* format switch */}
          <div className="flex items-center gap-2" role="tablist">
            {ORDER.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={fmt === f}
                onClick={() => setFmt(f)}
                className={`border px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.13em] transition-colors ${
                  fmt === f
                    ? "border-ink bg-ink text-bg"
                    : "border-line-strong text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {meta[f].label}
              </button>
            ))}
            <button
              onClick={onClose}
              aria-label={t("cv.close")}
              className="ms-1 grid h-9 w-9 shrink-0 place-items-center border border-line-strong text-lg transition-colors hover:border-ink hover:text-ink"
            >
              ×
            </button>
          </div>
        </div>

        {/* description + actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
          <p className="max-w-[52ch] text-[0.8rem] text-muted">{meta[fmt].desc}</p>
          <div className="flex items-center gap-2">
            <a
              href="https://mu-cv.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !px-4 !py-2"
              title={t("cv.liveDesc")}
            >
              <span>{t("cv.live")}</span>
              <span>↗</span>
            </a>
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost !px-4 !py-2"
            >
              <span>{t("cv.openTab")}</span>
              <span>↗</span>
            </a>
            <a href={current.href} download={current.download} className="btn btn-navy !px-4 !py-2">
              <span>↓</span>
              <span>{t("cv.download")}</span>
            </a>
          </div>
        </div>

        {/* viewer */}
        <div className="min-h-0 flex-1 bg-surface-2">
          {fmt === "jpg" ? (
            <div className="h-full w-full overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.href}
                alt={t("cv.title")}
                className="mx-auto h-auto w-full max-w-3xl"
              />
            </div>
          ) : (
            <object data={`${current.href}#toolbar=1&view=FitH`} type="application/pdf" className="h-full w-full">
              <iframe
                src={`${current.href}#toolbar=1&view=FitH`}
                title={meta[fmt].label}
                className="h-full w-full"
              />
              <div className="grid h-full place-items-center p-8 text-center">
                <p className="text-muted">
                  {lang === "ar"
                    ? "المعاينة غير مدعومة على هذا المتصفح."
                    : "Inline preview isn't supported on this browser."}{" "}
                  <a className="text-link" href={current.href} target="_blank" rel="noopener noreferrer">
                    {t("cv.openTab")} ↗
                  </a>
                </p>
              </div>
            </object>
          )}
        </div>

        {/* live-CV bridge — the seamless jump to the interactive online CV */}
        <a
          href="https://mu-cv.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-4 border-t border-line-strong bg-bg px-5 py-3 transition-colors hover:bg-surface"
        >
          <span className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            <span className="text-[0.82rem] text-muted transition-colors group-hover:text-ink">
              {t("cv.liveBanner")}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.13em] text-ink">
            {t("cv.liveCta")}
            <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </span>
        </a>
      </div>
    </div>
  );
}
