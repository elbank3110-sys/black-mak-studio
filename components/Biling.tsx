"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// ============================================================================
// Biling — Bilingual Identity Architecture (عربي + لاتيني)
// The studio's defining core craft: designing bilingual identities where
// Arabic calligraphy and Latin letterforms live as one harmonious visual
// language, without compromise.
// 100% focused on Logo & Brand Identity craft — zero off-topic packaging/icons.
// ============================================================================

export default function Biling() {
  const { t, lang } = useI18n();

  const PILLARS = [
    {
      num: "01",
      numAr: "٠١",
      titleEn: "Optical Weight Balance",
      titleAr: "التوازن البصري والكتلي",
      descEn:
        "Arabic and Latin wordmarks calibrated to share identical optical density, stroke contrast, and visual gravity.",
      descAr:
        "موازنة دقيقة لكتلة الحرف العربي مع اللاتيني ليتشاركا نفس الكثافة البصرية وسماكة الخطوط دون أن يطغى أحدهما على الآخر.",
    },
    {
      num: "02",
      numAr: "٠٢",
      titleEn: "Shared Typographic Geometry",
      titleAr: "التناغم الهندسي والتشريحي",
      descEn:
        "Synchronized baselines, matching x-height ratios, and aligned angles creating a unified identity system.",
      descAr:
        "محاذاة هندسية لخط الارتكاز وزوايا الانحناء ونسب الارتفاع لبناء نظام بصري متجانس في كافة التطبيقات.",
    },
    {
      num: "03",
      numAr: "٠٣",
      titleEn: "Calligraphic Heritage & Modern Form",
      titleAr: "أصالة الكاليجرافي مع حداثة البنية",
      descEn:
        "Rooted in genuine Arabic script mastery, paired seamlessly with clean, architectural modern typography.",
      descAr:
        "انطلاق من قواعد الخط العربي الأصيلة مع صقلها في قوالب حديثة تمنح علامتك هيبة معاصرة وفريدة.",
    },
  ];

  return (
    <section className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        {/* Bilingual Philosophy Header */}
        <Reveal>
          <div className="grid grid-cols-1 gap-[clamp(2rem,6vw,5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="eyebrow mb-4 block text-seal font-mono tracking-widest">
                {t("biling.index")}
              </span>
              <HeadlineReveal
                className="display text-[clamp(2.4rem,5.5vw,5.5rem)] leading-tight"
                html={t("biling.title")}
              />
            </div>
            <p className="lede max-w-[46ch]">{t("biling.text")}</p>
          </div>
        </Reveal>

        {/* Dual Language Badges */}
        <Reveal delay={0.15}>
          <div className="biling-row mt-12 flex flex-wrap items-center justify-between gap-8 border-t border-line pt-8 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-faint">
            <span className="biling-chip" dir="ltr">عربي — AR</span>
            <span className="biling-diamond text-seal">◆</span>
            <span className="biling-chip" dir="ltr">LATIN — EN</span>
            <span className="biling-diamond text-seal">◆</span>
            <span className="biling-chip" dir="ltr">ONE SYSTEM</span>
          </div>
        </Reveal>

        {/* The 3 Bilingual Core Pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, idx) => (
            <Reveal key={p.num} delay={idx * 0.08}>
              <div className="group border border-line/80 bg-[#0a0a0c] p-7 md:p-8 transition-all duration-300 hover:border-seal/60 hover:bg-[#0f0f13] h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-seal mb-5 border-b border-line/50 pb-3">
                    <span className="font-bold tracking-widest">
                      {lang === "ar" ? `ركيزة ${p.numAr}` : `PILLAR ${p.num}`}
                    </span>
                    <span className="text-faint uppercase text-[0.65rem] tracking-wider">
                      {lang === "ar" ? "هندسة الهوية" : "IDENTITY DNA"}
                    </span>
                  </div>
                  <h4 className="display text-lg md:text-xl font-bold text-ink mb-3 leading-snug group-hover:text-seal transition-colors">
                    {lang === "ar" ? p.titleAr : p.titleEn}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">
                    {lang === "ar" ? p.descAr : p.descEn}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-line/40 flex items-center justify-between font-mono text-[0.62rem] text-faint">
                  <span>BLACK-MAK® CRAFT</span>
                  <span className="text-seal font-semibold">
                    {lang === "ar" ? "نظام موحد" : "HARMONIC"}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}