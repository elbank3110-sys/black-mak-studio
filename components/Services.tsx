"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";
import HeadlineReveal from "./HeadlineReveal";

// ============================================================================
// Services — index rows with a cursor-following preview card (the Awwwards
// pattern, restrained): hovering a service floats a small preview that
// trails the cursor with lag. Touch/reduced-motion never see it — the
// rows stay pure. Desktop-only enhancement, zero cost on mobile.
// ============================================================================
const SERVICES = [
  { no: "S.01", name: "services.s1name", desc: "services.s1desc", inc: "services.s1inc", preview: "/images/work/vol2/vol2-02.jpg" },
  { no: "S.02", name: "services.s2name", desc: "services.s2desc", inc: "services.s2inc", preview: "/images/work/vol1/vol1-03.jpg" },
  { no: "S.03", name: "services.s3name", desc: "services.s3desc", inc: "services.s3inc", preview: "/images/work/makeen/makeen-calligraphy.jpg" },
  { no: "S.04", name: "services.s4name", desc: "services.s4desc", inc: "services.s4inc", preview: "/images/work/banners/ban-06.jpg" },
  { no: "S.05", name: "services.s5name", desc: "services.s5desc", inc: "services.s5inc", preview: "/images/work/calligraphi-work.jpg" },
  { no: "S.06", name: "services.s6name", desc: "services.s6desc", inc: "services.s6inc", preview: "/images/work/vol2/vol2-07.jpg" },
];

export default function Services() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const cur = useRef({ x: 0, y: 0, xTarget: 0, yTarget: 0 });
  const rafRef = useRef(0);

  // lagging cursor trail — the preview follows with weight, not teleporting
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      cur.current.xTarget = e.clientX - r.left;
      cur.current.yTarget = e.clientY - r.top;
    };
    section.addEventListener("mousemove", onMove, { passive: true });

    const loop = () => {
      const c = cur.current;
      c.x += (c.xTarget - c.x) * 0.12;
      c.y += (c.yTarget - c.y) * 0.12;
      if (previewRef.current) {
        const tilt = (c.xTarget - c.x) * 0.04;
        previewRef.current.style.transform = `translate(${c.x + 24}px, ${c.y - 100}px) rotate(${tilt}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("services.index")}</span>
              <HeadlineReveal className="display text-[clamp(3rem,7vw,7rem)]" html={t("services.title")} />
            </div>
            <p className="lede max-w-[42ch]">{t("services.note")}</p>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.04}>
              <a
                href="#start-a-project"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="service-row group grid grid-cols-[80px_1fr_auto] items-center gap-8 border-b border-line py-[clamp(1.5rem,3vw,2.7rem)] transition-colors duration-300 hover:bg-surface"
              >
                <span className="service-no font-mono text-faint">{s.no}</span>
                <div>
                  <h3 className="text-[clamp(1.3rem,3vw,2.2rem)] font-bold leading-none tracking-tight">{t(s.name)}</h3>
                  <p className="mt-3 max-w-[54ch] text-muted">{t(s.desc)}</p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-faint">
                    <span className="text-muted">{t("services.incLabel")}</span> {t(s.inc)}
                  </p>
                </div>
                <span className="text-2xl text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">↗</span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* cursor-following preview — hidden on touch/reduced-motion via matchMedia guard */}
        <div
          ref={previewRef}
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 z-20 hidden w-[220px] border border-line-strong bg-surface shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] transition-opacity duration-300 lg:block ${
            active !== null ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "transform" }}
        >
          {active !== null && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={SERVICES[active].preview}
              alt=""
              width={220}
              height={150}
              className="aspect-[3/2] w-full object-cover"
            />
          )}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 border border-line bg-surface p-[clamp(1.2rem,3vw,2rem)]">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <strong className="block text-[1.05rem] font-bold">{t("services.portTitle")}</strong>
                <p className="mt-2 max-w-[52ch] text-[0.85rem] text-muted">{t("services.portText")}</p>
              </div>
              <a href="#start-a-project" className="btn btn-ghost shrink-0">
                <span>{t("services.portCta")}</span>
                <span>↗</span>
              </a>
            </div>
            <p className="mt-4 border-t border-line pt-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">
              ◆ {t("services.built")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
