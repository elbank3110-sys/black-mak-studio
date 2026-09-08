"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Contact() {
  const { t, lang } = useI18n();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") || "";
    const type = fd.get("type") || "";
    const budget = fd.get("budget") || "";
    const msg = fd.get("msg") || "";
    const text = `${t("wa.msg")}\n${name} — ${type}${budget ? ` — Investment: ${budget}` : ""}\n${msg}`;
    window.open(`https://wa.me/201002462821?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  return (
    <section id="start-a-project" className="section border-t border-line bg-surface py-[var(--section)]">
      <div className="container">
        <div className="grid grid-cols-1 gap-[clamp(2.5rem,8vw,9rem)] lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("contact.index")}</span>
              <h2 className="display text-[clamp(2.6rem,6vw,6rem)]">
                {t("contact.title")}
                <br />
                <em className="text-[clamp(1.6rem,3.4vw,3rem)]">{t("contact.titleEm")}</em>
              </h2>
              <p className="lede mt-8">{t("contact.note")}</p>
              <div className="mt-12 border-t border-line">
                <a
                  href="https://wa.me/201002462821?text=Hi%20Muhamed%2C%20I%20found%20BLACK-MAK%20and%20I%27d%20like%20to%20discuss%20a%20branding%20project."
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-4 border-b border-line py-4 font-mono text-[0.75rem] text-muted transition-colors hover:text-ink"
                >
                  <span className="w-[92px] shrink-0 text-[0.6rem] uppercase tracking-[0.13em] text-faint">{t("contact.wa")}</span>
                  <span dir="ltr">Discuss Your Project on WhatsApp →</span>
                </a>
                <a
                  href="mailto:muhemedalaa2699@gmail.com?subject=New%20Brand%20Project%20%E2%80%94%20BLACK-MAK"
                  className="flex items-center gap-4 border-b border-line py-4 font-mono text-[0.75rem] text-muted transition-colors hover:text-ink"
                >
                  <span className="w-[92px] shrink-0 text-[0.6rem] uppercase tracking-[0.13em] text-faint">{t("contact.email")}</span>
                  <span dir="ltr">muhemedalaa2699@gmail.com</span>
                </a>
                <a href="https://www.behance.net/Muhmed-alaa-el-bank" target="_blank" rel="noopener" className="flex items-center gap-4 border-b border-line py-4 font-mono text-[0.75rem] text-muted transition-colors hover:text-ink">
                  <span className="w-[92px] shrink-0 text-[0.6rem] uppercase tracking-[0.13em] text-faint">Behance</span>
                  <span>@Muhmed-alaa-el-bank</span>
                </a>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="/portfolio.pdf" download className="btn btn-ghost">
                    <span>↓</span><span>{t("contact.pdf")}</span>
                  </a>
                </div>
              </div>

              <div className="mt-10 border border-line bg-bg p-6">
                <strong className="block text-[0.95rem] font-bold">{t("contact.qualTitle")}</strong>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">{t("contact.qual")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="border border-line bg-bg p-[clamp(1.4rem,3vw,2.5rem)]">
              <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.13em] text-faint">{t("form.intro")}</span>
                <p className="max-w-[27ch] text-end text-[0.85rem] text-muted">{t("form.help")}</p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[0.62rem] text-muted">{t("form.name")}</span>
                  <input name="name" required autoComplete="name" placeholder={t("form.namePh")} className="border border-line bg-surface px-4 py-3 outline-none transition-colors focus:border-ink" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.62rem] text-muted">{t("form.email")}</span>
                  <input name="email" type="email" required autoComplete="email" placeholder={t("form.emailPh")} className="border border-line bg-surface px-4 py-3 outline-none transition-colors focus:border-ink" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.62rem] text-muted">{t("form.contact")}</span>
                  <input name="contact" required placeholder={t("form.contactPh")} className="border border-line bg-surface px-4 py-3 outline-none transition-colors focus:border-ink" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.62rem] text-muted">{t("form.company")}</span>
                  <input name="company" placeholder={t("form.companyPh")} className="border border-line bg-surface px-4 py-3 outline-none transition-colors focus:border-ink" />
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[0.62rem] text-muted">{t("form.type")}</span>
                  <select name="type" required className="border border-line bg-surface px-4 py-3 outline-none transition-colors focus:border-ink">
                    <option value="Logo">{t("form.opt1")}</option>
                    <option value="Visual Identity">{t("form.opt2")}</option>
                    <option value="Arabic / Latin Typography">{t("form.opt3")}</option>
                    <option value="Rebrand">{t("form.opt4")}</option>
                    <option value="Digital Brand Experience">{t("form.opt5")}</option>
                    <option value="Other">{t("form.opt6")}</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[0.62rem] text-muted">{t("form.budget")}</span>
                  <select name="budget" className="border border-line bg-surface px-4 py-3 outline-none transition-colors focus:border-ink">
                    <option value="Not sure yet">{t("form.budgetOpt5")}</option>
                    <option value="I'm ready to invest in a professional identity">{t("form.budgetLead")}</option>
                    <option value="Under $300">{t("form.budgetOpt1")}</option>
                    <option value="$300–$600">{t("form.budgetOpt2")}</option>
                    <option value="$600–$1,500">{t("form.budgetOpt3")}</option>
                    <option value="$1,500+">{t("form.budgetOpt4")}</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 sm:col-span-2">
                  <span className="text-[0.62rem] text-muted">{t("form.msg")}</span>
                  <textarea name="msg" required placeholder={t("form.msgPh")} className="min-h-[130px] resize-y border border-line bg-surface px-4 py-3 outline-none transition-colors focus:border-ink" />
                </label>
              </div>

              <div className="mt-6 border border-line bg-surface p-5">
                <strong className="block text-[0.8rem] font-bold">{t("contact.fitTitle")}</strong>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <li className="text-[0.8rem] text-muted"><span className="me-2 text-faint">—</span>{t("contact.fit1")}</li>
                  <li className="text-[0.8rem] text-muted"><span className="me-2 text-faint">—</span>{t("contact.fit2")}</li>
                  <li className="text-[0.8rem] text-muted"><span className="me-2 text-faint">—</span>{t("contact.fit3")}</li>
                  <li className="text-[0.8rem] text-muted"><span className="me-2 text-faint">—</span>{t("contact.fit4")}</li>
                </ul>
                <p className="mt-4 text-[0.75rem] text-faint">{t("contact.notFit")}</p>
              </div>

              <button type="submit" className="btn btn-navy mt-6 w-full">
                {t("form.submit")} <span>↗</span>
              </button>
              {sent && <p className="mt-4 font-mono text-[0.7rem] text-ink">{t("form.sent")}</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
