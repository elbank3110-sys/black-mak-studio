"use client";

import { useEffect } from "react";

// ============================================================================
// Lenis smooth scroll — editorial browsing feel + unified anchor navigation.
// CRITICAL: with Lenis active, native CSS scroll-behavior and anchor jumps
// break (they teleport). This module intercepts ALL same-page anchor clicks
// and routes them through lenis.scrollTo() with header offset — smooth,
// consistent, and the IntersectionObserver header state stays in sync.
// Respects prefers-reduced-motion and touch devices (native scroll there).
// ============================================================================
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    if (reduced || touch) return;

    let lenis: import("lenis").default | null = null;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      // Lenis owns scrolling now — CSS smooth-behavior fights it and makes
      // programmatic scrolls jitter. The .has-smooth class removes it.
      document.documentElement.classList.add("has-smooth");
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      // Route anchor navigation through Lenis — the moment that made every
      // #nav link feel abrupt now becomes one continuous editorial glide.
      const HEADER_OFFSET = 90;
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest?.("a[href^='#']") as HTMLAnchorElement | null;
        if (!a) return;
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const el = document.querySelector(href);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -HEADER_OFFSET, duration: 1.2 });
      };
      document.addEventListener("click", onClick);

      // expose for cleanup
      (window as unknown as { __lenisCleanup?: () => void }).__lenisCleanup = () =>
        document.removeEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-smooth");
      (window as unknown as { __lenisCleanup?: () => void }).__lenisCleanup?.();
      lenis?.destroy();
    };
  }, []);

  return null;
}
