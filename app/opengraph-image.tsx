import { ImageResponse } from "next/og";
import { TCCC_BLACK_B64 } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BLACK-MAK — Logo & Visual Identity Design";

// The V2 identity mark — exact geometry traced 1:1 from the official BLACK-MAK-V2
// logo files (verified lossless, IoU 1.000). Rendered inline as SVG polygons —
// satori supports inline SVG shapes.
const MARK_VIEWBOX = "0 0 155 165";const MARK_POLYGON_A =
  "94,149.5 58,149.5 57.5,149 57.5,68 8,18.5 7.5,19 7.5,41 41.5,75 41.5,149 41,149.5 0,149.5 -0.5,149 -0.5,56 0,55.5 1,55.5 7.5,62 7.5,141 8,141.5 33,141.5 33.5,141 33.5,78 -0.5,44 -0.5,0 0,-0.5 65.5,65 65.5,141 66,141.5 87,141.5 87.5,141 87.5,65 153,-0.5 153.5,0 153.5,43 120.5,76 120.5,138 121,138.5 146,138.5 146.5,138 146.5,60 154,52.5 154.5,53 154.5,146 154,146.5 113,146.5 112.5,146 112.5,73 145.5,40 145.5,19 145,18.5 95.5,68 95.5,148";
const MARK_POLYGON_B =
  "25,123.5 17,123.5 15.5,122 15.5,112 16,111.5 25,111.5 25.5,112 25.5,123";
const MARK_POLYGON_C =
  "94,164.5 58,164.5 57.5,164 57.5,157 58,156.5 95,156.5 95.5,157 95.5,163";

// The brand's own Latin face — TCCC Unity Headline Black, decoded from the
// embedded base64 TTF so the OG card carries the site's exact typography.
const tcccBlack = Buffer.from(TCCC_BLACK_B64, "base64");

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
          fontFamily: "TCCC",
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
            viewBox={MARK_VIEWBOX}
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points={MARK_POLYGON_A} fill="#f5f5f1" />
            <polygon points={MARK_POLYGON_B} fill="#f5f5f1" />
            <polygon points={MARK_POLYGON_C} fill="#f5f5f1" />
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
    {
      ...size,
      fonts: [
        {
          name: "TCCC",
          data: tcccBlack,
          weight: 800,
          style: "normal",
        },
      ],
    }
  );
}
