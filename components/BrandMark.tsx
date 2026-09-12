// ============================================================================
// BLACK-MAK monogram — solid vector geometry from the official identity files
// (Black-mak.svg / Black-mak II.svg, Illustrator export). This is the real
// mark, not a redrawn approximation: exact polygons, exact proportions.
// fill="currentColor" → adapts to theme (black on paper / white on screen).
// ============================================================================

export const MARK_VIEWBOX = "154.4 0 115.96 123.06";

// The solid monogram as a single path set (from the identity SVGs).
export const MarkPaths = ({ className = "" }: { className?: string }) => (
  <g className={className} fill="currentColor">
    {/* left stem + diagonal — M's first peak */}
    <polygon points="216.61 53.74 216.61 116.95 208.15 116.95 208.15 53.74 154.4 0 154.4 28.53 154.4 35.91 154.4 37.15 154.4 37.16 155.3 38.06 155.3 38.06 160.51 43.26 166.46 49.21 182.39 65.14 182.39 116.94 160.51 116.94 160.51 51.73 154.4 45.62 154.4 123.06 188.49 123.06 188.49 62.62 170.78 44.91 170.78 44.9 168.08 42.21 160.51 34.64 160.51 14.73 202.04 56.27 202.04 123.06 203.39 123.06 208.15 123.06 216.61 123.06 219.74 123.06 222.72 123.06 222.72 56.27 264.25 14.73 264.25 34.64 264.25 34.64 264.24 34.65 264.25 34.64 256.68 42.21 253.98 44.9 236.27 62.61 236.27 123.05 270.36 123.05 270.36 45.62 264.25 51.73 264.25 116.95 242.37 116.95 242.37 65.15 258.3 49.22 264.25 43.27 269.45 38.06 269.45 38.05 269.46 38.06 270.36 37.16 270.36 35.91 270.36 28.53 270.36 0 216.61 53.74" />
  </g>
);

// Compact logo lockup for headers — mark + wordmark, identical DNA both sites.
export default function BrandMark({
  className = "",
  markClass = "h-7 w-7",
  showWordmark = true,
}: {
  className?: string;
  markClass?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox={MARK_VIEWBOX}
        aria-hidden="true"
        className={`${markClass} shrink-0 text-ink transition-colors duration-500`}
      >
        <MarkPaths />
      </svg>
      {showWordmark && (
        <span className="text-lg font-black tracking-wider text-ink transition-colors duration-500">
          BLACK<span className="text-faint transition-colors duration-500">—</span>MAK
        </span>
      )}
    </span>
  );
}
