"use client";

import { useEffect, useRef } from "react";

/**
 * MagicLayer — signature micro-interactions:
 *  1. word-rise: wraps [data-words] children per word for the staggered rise
 *  2. magnetic: elements with [data-magnetic] pull toward the cursor
 *  3. hairline: .hairline-draw observes intersection and adds .is-in
 *  4. custom cursor ring (fine pointers only, respects reduced motion)
 * All effects are progressive — if JS fails, content renders normally.
 */
export default function MagicLayer() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
    const lines = document.querySelectorAll<HTMLElement>(".hairline-draw");
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

    // 4 — custom cursor (fine pointer only)
    let dot: HTMLDivElement | null = null;
    let ring: HTMLDivElement | null = null;
    if (!reduce && window.matchMedia("(pointer: fine)").matches && !("ontouchstart" in window)) {
      dot = document.createElement("div");
      dot.className = "cursor-dot";
      ring = document.createElement("div");
      ring.className = "cursor-ring";
      document.body.appendChild(dot);
      document.body.appendChild(ring);
    }
    let rx = 0;
    let ry = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const renderLoop = () => {
      if (ring && dot) {
        rx += (cx - rx) * 0.16;
        ry += (cy - ry) * 0.16;
        dot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(renderLoop);
    };
    const onMouse = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };
    // grow on interactive hover — event delegation (works for late-mounted nodes)
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [role='button'], input, select, textarea")) {
        ring?.classList.add("is-active");
      } else {
        ring?.classList.remove("is-active");
      }
    };
    if (dot && ring) {
      window.addEventListener("mousemove", onMouse, { passive: true });
      window.addEventListener("mouseover", onOver, { passive: true });
      raf = requestAnimationFrame(renderLoop);
    }

    return () => {
      window.removeEventListener("mousemove", onMagMove);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      lineObs.disconnect();
      dot?.remove();
      ring?.remove();
    };
  }, []);

  return null;
}
