"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import BrandMark from "./BrandMark";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1)).concat("start-a-project");
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const links = [
    { href: "#work", k: "nav.work" },
    { href: "#services", k: "nav.services" },
    { href: "#pricing", k: "nav.pricing" },
    { href: "#about", k: "nav.about" },
  ];

  return (
    <header
      dir="ltr"
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-500 ${
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-xl"
          : "border-transparent"
      }`}
    >
      <div className="container flex min-h-[76px] items-center justify-between gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="BLACK-MAK home"
        >
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors hover:text-ink ${
                active === l.href.slice(1) ? "text-ink" : "text-muted"
              }`}
              aria-current={active === l.href.slice(1) ? "true" : undefined}
            >
              {t(l.k)}
            </a>
          ))}
          <a
            href="https://mu-cv.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-faint transition-colors hover:text-muted"
          >
            {t("nav.cv")}
          </a>
          <a href="#start-a-project" className="btn btn-light">
            <span>{t("nav.cta")}</span>
            <span>↗</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label="Switch language"
            className="grid h-10 place-items-center border border-line-strong px-3 font-mono text-[0.7rem] text-muted transition-colors hover:border-ink hover:text-ink"
          >
            {t("lang.toggle")}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center border border-line-strong md:hidden"
          >
            <span className={`block h-[2px] w-5 bg-ink transition ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`mt-1 block h-[2px] w-5 bg-ink transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="container flex flex-col gap-6 py-8 md:hidden" aria-label="Mobile navigation">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-bold">
              {t(l.k)}
            </a>
          ))}
          <a
            href="https://mu-cv.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="text-2xl font-bold"
          >
            {t("nav.cv")}
          </a>
          <a href="#start-a-project" onClick={() => setOpen(false)} className="btn btn-light w-full">
            {t("nav.cta")}
          </a>
        </nav>
      )}
    </header>
  );
}
