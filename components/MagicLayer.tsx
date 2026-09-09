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

    // 2 — magnetic
    const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    const onMagMove = (e: MouseEvent) => {
      magnets.forEach((m) => {
        const r = m.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(relX, relY);
        const range = Math.max(r.width, r.height);
        if (dist < range) {
          m.style.transform = `translate(${relX * 0.18}px, ${relY * 0.18}px)`;
        } else {
          m.style.transform = "";
        }
      });
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
