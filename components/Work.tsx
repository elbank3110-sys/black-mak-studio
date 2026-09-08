"use client";

import { useI18n } from "@/lib/i18n";
import Reveal from "./Reveal";

const FEATURED = [
  {
    n: "01",
    href: "https://www.behance.net/gallery/181721153/LOGOS-VOL2",
    img: "/images/work/vol2/vol2-02.jpg",
    titleKey: "work.p1title",
    tagsKey: "work.p1tags",
    cls: "lg:row-span-2",
    feature: true,
    hover: "View on Behance ↗",
  },
  {
    n: "02",
    href: "https://www.behance.net/gallery/60219345/LOGOS-VOL-1",
    img: "/images/work/vol1/vol1-03.jpg",
    titleKey: "work.p2title",
    tagsKey: "work.p2tags",
    hover: "View on Behance ↗",
  },
  {
    n: "03",
    href: "https://www.behance.net/gallery/37676905/OUTDOOR-ADVERTISING-WORKS-BANNERS",
    img: "/images/work/banners/ban-06.jpg",
    titleKey: "work.p3title",
    tagsKey: "work.p3tags",
    hover: "View on Behance ↗",
  },
];

const MORE = [
  {
    n: "04",
    href: "https://www.behance.net/gallery/224445345/MAKEEN",
    img: "/images/work/makeen/makeen-calligraphy.jpg",
    titleKey: "work.p4title",
    tagsKey: "work.p4tags",
    hover: "View on Behance ↗",
  },
  {
    n: "05",
    href: "https://www.behance.net/gallery/67494575/CALLIGRAPHI-WORKS",
    img: "/images/work/calligraphi-work.jpg",
    titleKey: "work.p5title",
    tagsKey: "work.p5tags",
    hover: "View on Behance ↗",
  },
];

function Card({ w, i, eager }: { w: (typeof FEATURED)[number]; i: number; eager?: boolean }) {
  const { t } = useI18n();
  return (
    <Reveal delay={i * 0.05} className={w.cls}>
      <a
        href={w.href}
        target="_blank"
        rel="noopener"
        className="work-card group block"
      >
        <div className="relative overflow-hidden border border-line bg-surface">
          <div className="absolute inset-0 z-[1] bg-gradient-to-br from-transparent to-white/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <img
            src={w.img}
            alt={t(w.titleKey)}
            loading={eager ? "eager" : "lazy"}
            className={`w-full object-cover transition duration-700 group-hover:scale-[1.045] ${
              w.feature ? "aspect-[16/10]" : "aspect-[16/10]"
            }`}
          />
          <span className="absolute bottom-4 right-4 z-[2] bg-white px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-black opacity-0 transition duration-300 group-hover:opacity-100">
            {w.hover}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-line py-5">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[0.6rem] text-faint">{w.n}</span>
            <h3 className="text-[clamp(1.15rem,2vw,1.75rem)] font-bold leading-[1.05] tracking-tight">
              {t(w.titleKey)}
            </h3>
          </div>
          <span className="text-end font-mono text-[0.6rem] text-muted">{t(w.tagsKey)}</span>
        </div>
        <span className="work-title-line mt-2 block" aria-hidden="true" />
      </a>
    </Reveal>
  );
}

export default function Work() {
  const { t } = useI18n();
  return (
    <section id="work" className="section border-t border-line py-[var(--section)]">
      <div className="container">
        <Reveal>
          <div className="mb-[clamp(2.5rem,6vw,5.2rem)] flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow mb-4 block text-faint">{t("work.index")}</span>
              <h2 className="display text-[clamp(3rem,7vw,7rem)]" dangerouslySetInnerHTML={{ __html: t("work.title") }} />
            </div>
            <p className="lede max-w-[42ch]">{t("work.note")}</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,6vw,6rem)] lg:grid-cols-[1.45fr_1fr]">
          {FEATURED.map((w, i) => (
            <Card key={w.n} w={w} i={i} eager={i < 2} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-[clamp(3rem,7vw,6rem)] mb-[clamp(1.5rem,4vw,3rem)] flex items-center gap-4">
            <span className="eyebrow text-faint">{t("work.moreIndex")}</span>
            <span className="hairline-draw h-px flex-1 bg-line" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,6vw,6rem)] md:grid-cols-2">
          {MORE.map((w, i) => (
            <Card key={w.n} w={w} i={i} />
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <p className="max-w-[46ch] text-muted">{t("work.footer")}</p>
            <a href="https://www.behance.net/Muhmed-alaa-el-bank" target="_blank" rel="noopener" className="text-link">
              <span>{t("work.archive")}</span>
              <span>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
