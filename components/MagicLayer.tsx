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

    // 1 — word rise
    if (!reduce) {
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
    // and a material)
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const state = new WeakMap<HTMLElement, { tx: number; ty: number }>();
    let rafMag = 0;
    const onMagMove = (e: MouseEvent) => {
      magnets.forEach((m) => {
        const r = m.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(relX, relY);
        const range = Math.max(r.width, r.height) * 1.2;
        if (dist < range) {
          state.set(m, { tx: relX * 0.18, ty: relY * 0.18 });
        } else {
          state.set(m, { tx: 0, ty: 0 });
        }
      });
      // single rAF loop per event — lerp toward target every frame
      if (!rafMag) {
        const tick = () => {
          let active = false;
          magnets.forEach((m) => {
            const s = state.get(m);
            if (!s) return;
            const cur = m.style.transform.match(/-?[\d.]+/g)?.map(Number) ?? [0, 0];
            const cx = cur[0] || 0;
            const cy = cur[1] || 0;
            const dx = s.tx - cx;
            const dy = s.ty - cy;
            if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
              active = true;
              m.style.transform = `translate(${cx + dx * 0.16}px, ${cy + dy * 0.16}px)`;
            } else {
              m.style.transform = s.tx || s.ty ? `translate(${s.tx}px, ${s.ty}px)` : "";
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
      lineObs.disconnect();
    };
  }, []);

  return null;
}
