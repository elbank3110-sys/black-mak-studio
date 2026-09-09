"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
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
          className="flex items-center gap-3 text-lg font-black tracking-wider"
          aria-label="BLACK-MAK home"
        >
          <span className="grid h-7 w-7 place-items-center" aria-hidden="true">
            <svg viewBox="356.27 0.48 115.96 123.06" fill="none" stroke="currentColor" strokeWidth="3" className="h-full w-full text-ink">
              <polygon points="472.23 .48 472.23 36.39 466.12 36.39 466.12 15.21 424.59 56.75 424.59 123.54 418.48 123.54 418.48 54.22 472.23 .48" />
              <polygon points="472.23 29.01 472.23 37.64 471.33 38.54 467.01 34.23 472.23 29.01" />
              <path d="M466.12,35.12l-7.57,7.57-2.7,2.69-17.71,17.71v60.44h34.09V46.1l-6.11,6.11v65.22h-21.88v-51.8l15.93-15.93,5.95-5.95,5.2-5.21.9-.9v-8.62l-6.11,6.11Z" />
              <polygon points="410.02 54.22 410.02 123.54 403.91 123.54 403.91 56.75 362.38 15.21 362.38 36.39 356.27 36.39 356.27 .48 410.02 54.22" />
              <polygon points="361.49 34.23 357.17 38.54 356.27 37.64 356.27 29.01 361.49 34.23" />
              <path d="M372.65,45.38l-2.7-2.69-7.57-7.57-6.11-6.11v8.62l.9.9,5.21,5.21,5.95,5.95,15.93,15.93v51.8h-21.88V52.21l-6.11-6.11v77.44h34.09v-60.44l-17.71-17.71Z" />
              <rect x="405.26" y="117.43" width="16.35" height="6.11" />
            </svg>
          </span>
          <span>
            BLACK<span className="text-faint">—</span>MAK
          </span>
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
