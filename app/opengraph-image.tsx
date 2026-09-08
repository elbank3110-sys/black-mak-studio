import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BLACK-MAK — Logo & Visual Identity Design";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#070708",
          color: "#f5f5f1",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "32px",
            letterSpacing: "8px",
            textTransform: "uppercase",
            color: "#9a9a96",
          }}
        >
          BLACK-MAK® / DESIGN PRACTICE
        </div>
        <div
          style={{
            marginTop: "44px",
            fontSize: "92px",
            fontWeight: 800,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "-3px",
          }}
        >
          Marks with meaning.
        </div>
        <div
          style={{
            fontSize: "92px",
            fontWeight: 800,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: "-3px",
          }}
        >
          Identities with character.
        </div>
        <div
          style={{
            marginTop: "50px",
            fontSize: "30px",
            color: "#9a9a96",
            maxWidth: "840px",
          }}
        >
          Logo &amp; visual identity design by Muhamed Alaa Elbank.
        </div>
        <div
          style={{
            position: "absolute",
            top: "44px",
            right: "80px",
            fontSize: "28px",
            color: "#5d5d59",
            letterSpacing: "4px",
          }}
        >
          EST. 2014
        </div>
      </div>
    ),
    { ...size }
  );
}
