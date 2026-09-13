"use client";

import { useEffect, useRef } from "react";

/**
 * MagicLayer — signature micro-interactions:
 *  1. word-rise: wraps [data-words] children per word for the staggered rise
 *  2. magnetic: elements with [data-magnetic] pull toward the cursor
 *  3. hairline: .hairline-draw observes intersection and adds .is-in
 * (custom cursor removed — native system cursor only)
 * All effects are progressive — if JS fails, content renders normally.
 */
export default function MagicLayer() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1 — word rise (Latin only: per-word splitting breaks Arabic joining;
    // Arabic keeps the plain text — the rise lives in the headline masks)
    const isArabic = () =>
      (document.documentElement.lang || "").toLowerCase().indexOf("ar") === 0;
    if (!reduce && !isArabic()) {
      document.querySelectorAll<HTMLElement>("[data-words]").forEach((el) => {
        if (el.dataset.split === "done") return;
        const walk = (node: Node) => {
          node.childNodes.forEach((child) => {
            if (child.nodeType === 3) {
              const frag = document.createDocumentFragment();
              const parts = (child.textContent || "").split(/(\s+)/);
              parts.forEach((p) => {
                if (!p.trim()) {
                  frag.appendChild(document.createTextNode(p));
                } else {
                  const w = document.createElement("span");
                  w.className = "word-rise";
                  const inner = document.createElement("span");
                  inner.textContent = p;
                  w.appendChild(inner);
                  frag.appendChild(w);
                }
              });
              child.replaceWith(frag);
            } else if (child.nodeType === 1) {
              walk(child);
            }
          });
        };
        walk(el);
        el.dataset.split = "done";
        // stagger the rise
        el.querySelectorAll<HTMLElement>(".word-rise > span").forEach((s, i) => {
          s.style.animationDelay = `${0.05 + i * 0.045}s`;
        });
      });
    }

    // 2 — magnetic (with eased release: cursor leaving the range glides the
    // element home instead of snapping — the difference between a trick
    // and a material). Centers are cached and only re-measured on resize —
    // no getBoundingClientRect inside the mousemove hot path, and the
    // current position lives in a WeakMap, never parsed from style strings.
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const centers = new WeakMap<HTMLElement, { x: number; y: number; w: number; h: number }>();
    const pos = new WeakMap<HTMLElement, { x: number; y: number }>();
    const measure = () => {
      magnets.forEach((m) => {
        const r = m.getBoundingClientRect();
        centers.set(m, { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height });
        if (!pos.has(m)) pos.set(m, { x: 0, y: 0 });
      });
    };
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize, { passive: true });

    const targets = new WeakMap<HTMLElement, { tx: number; ty: number }>();
    let rafMag = 0;
    const onMagMove = (e: MouseEvent) => {
      magnets.forEach((m) => {
        const c = centers.get(m);
        if (!c) return;
        const relX = e.clientX - c.x;
        const relY = e.clientY - c.y;
        const dist = Math.hypot(relX, relY);
        const range = Math.max(c.w, c.h) * 1.2;
        if (dist < range) {
          targets.set(m, { tx: relX * 0.18, ty: relY * 0.18 });
        } else {
          targets.set(m, { tx: 0, ty: 0 });
        }
      });
      // single rAF loop per event — lerp toward target every frame
      if (!rafMag) {
        const tick = () => {
          let active = false;
          magnets.forEach((m) => {
            const tg = targets.get(m);
            const cur = pos.get(m);
            if (!tg || !cur) return;
            const dx = tg.tx - cur.x;
            const dy = tg.ty - cur.y;
            if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
              active = true;
              cur.x += dx * 0.16;
              cur.y += dy * 0.16;
              m.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
            } else if (tg.tx || tg.ty) {
              cur.x = tg.tx;
              cur.y = tg.ty;
              m.style.transform = `translate(${tg.tx}px, ${tg.ty}px)`;
            } else if (m.style.transform) {
              cur.x = 0;
              cur.y = 0;
              m.style.transform = "";
            }
          });
          rafMag = active ? requestAnimationFrame(tick) : 0;
        };
        rafMag = requestAnimationFrame(tick);
      }
    };
    if (!reduce && magnets.length) {
      window.addEventListener("mousemove", onMagMove, { passive: true });
    }

    // 3 — hairline draw
    const lines = document.querySelectorAll<HTMLElement>(".hairline-draw, .tspine");
    const lineObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            lineObs.unobserve(en.target);
          }
        }),
      { threshold: 0.4 }
    );
    lines.forEach((l) => lineObs.observe(l));

    return () => {
      window.removeEventListener("mousemove", onMagMove);
      window.removeEventListener("resize", onResize);
      lineObs.disconnect();
    };
  }, []);

  return null;
}
