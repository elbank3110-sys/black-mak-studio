"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { sound } from "@/lib/sound";
import Reveal from "./Reveal";

import { SERVICE_TIERS } from "@/lib/services";

type Option = {
  id: string;
  name: { en: string; ar: string };
  desc: { en: string; ar: string };
  price: number;
};

const getTierPrice = (id: string, fallback: number): number => {
  const tier = SERVICE_TIERS.find((s) => s.id === id);
  return tier?.from ?? fallback;
};

const DELIVERABLES: Option[] = [
  {
    id: "mark",
    name: { en: "Primary Logo & Mark Design", ar: "تصميم الشعار والرمز الأساسي" },
    desc: {
      en: "Distinctive mark, monogram, or custom wordmark built with strategic depth (Focused Logo Project).",
      ar: "تصميم الشعار والرمز الأساسي الفريد (باقة الشعار المركّز مع ملفات المصدر المتجهية وتنويعات الاستخدام).",
    },
    price: getTierPrice("S.01", 290),
  },
  {
    id: "calligraphy",
    name: { en: "Bilingual Calligraphy & Custom Lettering", ar: "مارك تايبوغرافي / كاليجرافي مخصص" },
    desc: {
      en: "Hand-drawn Arabic script paired seamlessly with Latin typographic hierarchy (Custom Typographic Mark).",
      ar: "تكوينات خط عربي حر وحروف مرسومة يدوياً متجانسة كلغة بصرية واحدة مع اللاتيني (باقة المارك التايبوغرافي).",
    },
    price: getTierPrice("S.03", 490),
  },
  {
    id: "system",
    name: { en: "Complete Visual Identity System", ar: "نظام هوية بصرية متكامل (شامل)" },
    desc: {
      en: "Comprehensive system: primary & alternate marks, color strategy, typography hierarchy, guidelines, and applications.",
      ar: "باقة الهوية الشاملة الأكثر اكتمالاً: الشعار الأساسي والبديل، استراتيجية الألوان، التايبوغرافي، ودليل معايير الهوية.",
    },
    price: getTierPrice("S.02", 890),
  },
  {
    id: "stationery",
    name: { en: "Brand Collateral & Stationery", ar: "أصول ومطبوعات الهوية الأساسية" },
    desc: {
      en: "Business cards, corporate stationery, official invoices, stamps, and presentation kit.",
      ar: "كروت الأعمال، المطبوعات الرسمية، الأختام، وقوالب العروض التقديمية الاحترافية (تطبيقات الهوية).",
    },
    price: 350,
  },
  {
    id: "digital",
    name: { en: "Digital Brand Experiences", ar: "تجارب وتطبيقات العلامة الرقمية" },
    desc: {
      en: "Interactive digital brand presence, custom UI/UX design, digital social templates, and web art direction.",
      ar: "تصميم وتطبيق العلامة على المنصات الرقمية، قوالب السوشيال ميديا، وتوجيه فني وتفاعلي للويب (خدمة التجارب الرقمية).",
    },
    price: getTierPrice("S.05", 690),
  },
  {
    id: "rebrand",
    name: { en: "Rebrand & Strategic Identity Evolution", ar: "تطوير وإعادة تصميم الهوية القائمة" },
    desc: {
      en: "In-depth brand audit, repositioning strategy, modernization of legacy assets, and complete evolution.",
      ar: "تدقيق شامل للهوية الحالية، إعادة التموضع الاستراتيجي، وتحديث متكامل يواكب نمو علامتك مستقبلاً (خدمة إعادة التصميم الشامل).",
    },
    price: getTierPrice("S.06", 1290),
  },
];

export default function ScopeEstimator() {
  const { lang } = useI18n();
  const pick = (obj: { en: string; ar: string }) => (lang === "ar" ? obj.ar : obj.en);

  // Starts strictly at ZERO as requested by user
  const [selected, setSelected] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<"standard" | "priority">("standard");

  const toggleOption = (id: string) => {
    const isCurrentlySelected = selected.includes(id);
    if (isCurrentlySelected) {
      sound.click("soft");
    } else {
      sound.click("crisp");
    }
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      // If user chooses Full Identity ("system"), it already includes the Primary Logo ("mark")
      if (id === "system") {
        return [...prev.filter((item) => item !== "mark"), id];
      }
      // If user chooses Primary Logo ("mark") while "system" is active, swap "system" for "mark"
      if (id === "mark" && prev.includes("system")) {
        return [...prev.filter((item) => item !== "system"), id];
      }
      return [...prev, id];
    });
  };

  const basePrice = selected.reduce((sum, id) => {
    const opt = DELIVERABLES.find((o) => o.id === id);
    return sum + (opt ? opt.price : 0);
  }, 0);

  const multiplier = timeline === "priority" ? 1.25 : 1.0;
  const totalPrice = Math.round(basePrice * multiplier);

  const handleWhatsApp = () => {
    sound.click("pop");

    if (selected.length === 0) {
      const emptyText =
        lang === "ar"
          ? "مرحباً محمد، أود استشارة عامة بخصوص مشروع هوية جديد مع استوديو BLACK-MAK."
          : "Hi Muhamed, I would like to consult with you regarding a new branding project for my business.";
      window.open(`https://wa.me/201002462821?text=${encodeURIComponent(emptyText)}`, "_blank");
      return;
    }

    const chosenNames = selected
      .map((id) => DELIVERABLES.find((o) => o.id === id)?.name[lang === "ar" ? "ar" : "en"])
      .filter(Boolean)
      .join(", ");

    const text =
      lang === "ar"
        ? `مرحباً محمد، لقد قمت بتحديد نطاق مشروعي عبر حاسبة الاستوديو.\n\nالخدمات المختارة: ${chosenNames}\nالجدول الزمني: ${timeline === "priority" ? "أولوية سريعة (٧-١٠ أيام)" : "اعتيادي (٢-٣ أسابيع)"}\nالميزانية المقدرة: ~$${totalPrice} USD\n\nأود مناقشة تفاصيل العمل والبدء.`
        : `Hi Muhamed, I configured my project scope via the BLACK-MAK estimator.\n\nScope: ${chosenNames}\nTimeline: ${timeline === "priority" ? "Priority Sprint (7-10 days)" : "Standard (2-3 weeks)"}\nEstimated Investment: ~$${totalPrice} USD\n\nI'd like to discuss the brief with you.`;

    const url = `https://wa.me/201002462821?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="estimator" className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <span className="eyebrow mb-4 block text-seal font-mono tracking-widest">
                {lang === "ar" ? "٠٧ / حاسبة نطاق العمل والاستثمار" : "07 / SCOPE & INVESTMENT ESTIMATOR"}
              </span>
              <h2 className="display text-[clamp(2.2rem,5vw,4.5rem)] leading-tight">
                {lang === "ar" ? (
                  <>
                    حدد نطاق مشروعك.<br />
                    <em>بشفافية تامة ودون مفاجآت.</em>
                  </>
                ) : (
                  <>
                    Configure your scope.<br />
                    <em>Zero guesswork.</em>
                  </>
                )}
              </h2>
            </div>
            <p className="lede max-w-[44ch]">
              {lang === "ar"
                ? "اختر المتطلبات التي تحتاجها علامتك التجارية لتوليد تقدير استثماري فوري وتجهيز موجز العمل مباشرة."
                : "Select the deliverables your brand needs to generate an instant estimate and kick off your brief."}
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Deliverables Checklist */}
          <div className="space-y-4">
            <Reveal tier="feedback">
              <div className="flex items-center justify-between border-b border-line pb-3 mb-3">
                <span className="mono text-xs uppercase tracking-widest text-muted block">
                  {lang === "ar" ? "١. حدد عناصر الهوية المطلوبة:" : "1. SELECT SCOPE DELIVERABLES:"}
                </span>
                <span className="font-mono text-[0.68rem] text-seal">
                  {selected.length === 0
                    ? lang === "ar"
                      ? "اضغط لتحديد البنود"
                      : "Click items to add"
                    : lang === "ar"
                    ? `تم اختيار ${selected.length} من ${DELIVERABLES.length}`
                    : `${selected.length} of ${DELIVERABLES.length} selected`}
                </span>
              </div>
            </Reveal>

            {DELIVERABLES.map((item, idx) => {
              const active = selected.includes(item.id);
              return (
                <Reveal key={item.id} delay={idx * 0.04}>
                  <div
                    onClick={() => toggleOption(item.id)}
                    className={`group flex cursor-pointer items-start justify-between gap-4 border p-5 transition-all duration-300 select-none ${
                      active
                        ? "border-seal bg-seal/[0.06] shadow-[0_4px_24px_rgba(201,162,39,0.18)]"
                        : "border-line bg-[#0a0a0c] hover:border-line-strong hover:bg-surface/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox with clear checkmark (صح ✓) */}
                      <div
                        className={`mt-1 grid h-6 w-6 shrink-0 place-items-center border transition-all duration-200 ${
                          active
                            ? "border-seal bg-seal text-black shadow-[0_0_12px_rgba(201,162,39,0.5)]"
                            : "border-line-strong bg-[#121215] group-hover:border-seal/60"
                        }`}
                        aria-checked={active}
                        role="checkbox"
                      >
                        <AnimatePresence>
                          {active && (
                            <motion.svg
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.4, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              viewBox="0 0 24 24"
                              className="h-4 w-4 stroke-[3.5] stroke-black fill-none"
                            >
                              <path
                                d="M20 6 9 17l-5-5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <h3
                          className={`text-base font-bold transition-colors ${
                            active ? "text-seal" : "text-ink"
                          }`}
                        >
                          {pick(item.name)}
                        </h3>
                        <p className="mt-1 text-sm text-muted leading-relaxed max-w-[50ch]">
                          {pick(item.desc)}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-end">
                      <span
                        className={`mono text-sm font-bold transition-colors block ${
                          active ? "text-seal" : "text-muted group-hover:text-ink"
                        }`}
                      >
                        +${item.price}
                      </span>
                      {active && (
                        <span className="inline-block mt-1 font-mono text-[0.62rem] text-seal/90 uppercase tracking-wider bg-seal/15 px-1.5 py-0.5 border border-seal/30">
                          {lang === "ar" ? "مُحدد ✓" : "ADDED ✓"}
                        </span>
                      )}
                      {!active && selected.includes("system") && item.id === "mark" && (
                        <span className="inline-block mt-1 font-mono text-[0.58rem] text-seal/80 uppercase tracking-wider bg-seal/10 px-1.5 py-0.5 border border-seal/20">
                          {lang === "ar" ? "مشمول بالهوية الكاملة ✓" : "INCLUDED IN IDENTITY ✓"}
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Investment Summary & Brief Launcher */}
          <div>
            <Reveal delay={0.2}>
              <div className="sticky top-28 border border-seal/60 bg-[#0a0a0c] p-7 md:p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-line/80 pb-4">
                  <span className="eyebrow block text-seal font-mono tracking-widest">
                    {lang === "ar" ? "ملخص الاستثمار والموجز" : "PROJECT INVESTMENT"}
                  </span>
                  <span className="font-mono text-[0.68rem] text-faint">
                    {lang === "ar" ? "تقدير فوري" : "LIVE CALC"}
                  </span>
                </div>

                <div className="mt-6 border-b border-line/80 pb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-muted">
                      {lang === "ar" ? "العناصر المختارة:" : "Selected deliverables:"}
                    </span>
                    <span className="mono font-bold text-ink text-base">
                      {selected.length} {lang === "ar" ? "عناصر" : "items"}
                    </span>
                  </div>

                  {/* Timeline speed switch */}
                  <div className="mt-5">
                    <span className="mono text-[0.65rem] uppercase tracking-widest text-muted block mb-3">
                      {lang === "ar" ? "٢. الجدول الزمني للتسليم:" : "2. TIMELINE SPRINT:"}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          sound.click("soft");
                          setTimeline("standard");
                        }}
                        className={`border px-3 py-2.5 mono text-[0.68rem] uppercase tracking-wider transition-all ${
                          timeline === "standard"
                            ? "border-ink bg-ink text-bg font-bold shadow-md"
                            : "border-line text-muted hover:border-line-strong hover:text-ink"
                        }`}
                      >
                        {lang === "ar" ? "اعتيادي (٢-٣ أسابيع)" : "Standard (2-3 wks)"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sound.click("crisp");
                          setTimeline("priority");
                        }}
                        className={`border px-3 py-2.5 mono text-[0.68rem] uppercase tracking-wider transition-all ${
                          timeline === "priority"
                            ? "border-seal bg-seal text-bg font-bold shadow-md"
                            : "border-line text-muted hover:border-line-strong hover:text-ink"
                        }`}
                      >
                        {lang === "ar" ? "أولوية سريعة (+٢٥٪)" : "Priority Sprint (+25%)"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total estimate — Starts at $0 */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="mono text-xs uppercase tracking-widest text-muted">
                      {lang === "ar" ? "الاستثمار المقدر:" : "ESTIMATED TOTAL:"}
                    </span>
                    {selected.length === 0 && (
                      <span className="font-mono text-[0.65rem] text-seal bg-seal/10 px-2 py-0.5 border border-seal/20">
                        {lang === "ar" ? "ابدأ بالاختيار أعلاه" : "Select items above"}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="display text-[clamp(2.8rem,5.5vw,4.2rem)] font-bold text-ink leading-none">
                      ${totalPrice}
                    </span>
                    <span className="mono text-sm text-muted uppercase">USD</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {lang === "ar"
                      ? "الدفع مقسم: ٥٠٪ عند بدء المشروع و٥٠٪ بعد اعتماد النتيجة النهائية. ضمان تسليم كافة الملفات المتجهية."
                      : "50% commitment to initiate, 50% upon final mark approval. Full vector copyright transferred."}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="btn btn-light w-full gap-2 !py-4 font-bold tracking-wide"
                  >
                    <span>
                      {selected.length === 0
                        ? lang === "ar"
                          ? "استشارة عامة عبر واتساب"
                          : "Discuss Project via WhatsApp"
                        : lang === "ar"
                        ? `إرسال الموجز ($${totalPrice}) عبر واتساب`
                        : `Launch Brief ($${totalPrice}) via WhatsApp`}
                    </span>
                    <span aria-hidden="true">↗</span>
                  </button>
                  <p className="mt-3 text-center mono text-[0.62rem] uppercase tracking-widest text-faint">
                    {lang === "ar" ? "استجابة مباشرة خلال ساعات العمل" : "Direct response within studio hours"}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}