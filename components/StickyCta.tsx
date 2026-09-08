"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function StickyCta() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const near = document.getElementById("start-a-project");
      const nearContact = near ? near.getBoundingClientRect().top < window.innerHeight : false;
      setShow(y > 600 && !nearContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#start-a-project"
      aria-label={t("nav.cta")}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-ink px-6 py-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-bg shadow-2xl transition-all duration-500 hover:-translate-y-1 rtl:left-6 rtl:right-auto ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="sticky-dot h-1.5 w-1.5 rounded-full bg-bg" aria-hidden="true" />
      <span>{t("nav.cta")}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}
