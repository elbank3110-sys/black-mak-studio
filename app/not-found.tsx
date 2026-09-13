import Link from "next/link";
import { MARK_VIEWBOX, MARK_D } from "@/components/BrandMark";

export const metadata = {
  title: "404 — BLACK-MAK®",
};

// 404 in the studio's voice: the mark as a pure outline — a shape that
// hasn't been inked yet — and the invitation back to the work that is.
export default function NotFound() {
  return (
    <section className="container flex min-h-[100svh] flex-col items-center justify-center gap-8 pt-[76px] text-center">
      <span className="eyebrow text-faint">404 / MARK NOT FOUND</span>

      <svg
        viewBox={MARK_VIEWBOX}
        className="h-40 w-40 md:h-56 md:w-56"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d={MARK_D}
        />
      </svg>

      <h1 className="display text-[clamp(2.4rem,7vw,5.5rem)]">
        This page<br />
        <em>was never drawn.</em>
      </h1>

      <p className="lede max-w-[42ch]">
        Every mark starts as a question. This one didn&apos;t survive the
        first round. Let&apos;s get you back to the work that did.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn btn-light">
          <span>Back to the studio</span>
          <span>↗</span>
        </Link>
        <Link href="/#work" className="btn btn-ghost">
          <span>View selected work</span>
          <span>↓</span>
        </Link>
      </div>
    </section>
  );
}
