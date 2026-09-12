import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BLACK-MAK — Logo & Visual Identity Design";

// The solid identity mark (exact geometry from the official identity files)
// rendered inline as SVG polygons — satori supports inline SVG shapes.
const MARK_POLYGON =
  "216.61 53.74 216.61 116.95 208.15 116.95 208.15 53.74 154.4 0 154.4 28.53 154.4 35.91 154.4 37.15 154.4 37.16 155.3 38.06 155.3 38.06 160.51 43.26 166.46 49.21 182.39 65.14 182.39 116.94 160.51 116.94 160.51 51.73 154.4 45.62 154.4 123.06 188.49 123.06 188.49 62.62 170.78 44.91 170.78 44.9 168.08 42.21 160.51 34.64 160.51 14.73 202.04 56.27 202.04 123.06 203.39 123.06 208.15 123.06 216.61 123.06 219.74 123.06 222.72 123.06 222.72 56.27 264.25 14.73 264.25 34.64 264.25 34.64 264.24 34.65 264.25 34.64 256.68 42.21 253.98 44.9 236.27 62.61 236.27 123.05 270.36 123.05 270.36 45.62 264.25 51.73 264.25 116.95 242.37 116.95 242.37 65.15 258.3 49.22 264.25 43.27 269.45 38.06 269.45 38.05 269.46 38.06 270.36 37.16 270.36 35.91 270.36 28.53 270.36 0 216.61 53.74";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#070708",
          color: "#f5f5f1",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* the mark, large, confident */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            height: "300px",
            border: "2px solid rgba(245,245,241,0.25)",
            marginRight: "70px",
            flexShrink: 0,
          }}
        >
          <svg
            width="210"
            height="223"
            viewBox="154.4 0 115.96 123.06"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points={MARK_POLYGON} fill="#f5f5f1" />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "26px",
              letterSpacing: "7px",
              textTransform: "uppercase",
              color: "#9a9a96",
            }}
          >
            BLACK-MAK® / EST. 2014
          </div>
          <div
            style={{
              marginTop: "34px",
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: "uppercase",
              letterSpacing: "-2px",
            }}
          >
            Marks with meaning.
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: "uppercase",
              letterSpacing: "-2px",
              color: "#9a9a96",
            }}
          >
            Identities with character.
          </div>
          <div
            style={{
              marginTop: "40px",
              fontSize: "26px",
              color: "#9a9a96",
              maxWidth: "640px",
            }}
          >
            Logo &amp; visual identity design — Arabic &amp; Latin, worldwide.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
