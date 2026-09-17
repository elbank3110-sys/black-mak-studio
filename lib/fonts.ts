import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";

// Official Soullife Signature Font provided by Muhamed Alaa
export const soullife = localFont({
  src: [{ path: "../public/fonts/Soullife.woff2", weight: "400", style: "normal" }],
  variable: "--font-signature",
  display: "swap",
});

// One font system, self-hosted via next/font — zero CDN, zero render-blocking
// Google Fonts <link>. The Latin face is TCCC Unity (official identity
// files, converted to woff2 from the source TTFs). Only the weights the
// UI actually uses are loaded:
//   Headline: 400 (light running text in display contexts) / 700 / 800
//   Text:     400 / 700
// Light(300) and Medium(600) headline cuts were never referenced — dropped
// (11 fewer preloads competing with the LCP image). The CV site loads the
// same families/variables — one visual DNA.
export const unityHeadline = localFont({
  src: [
    { path: "../public/fonts/tccc-unity-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/tccc-unity-bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/tccc-unity-black.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-signate",
  display: "swap",
});

export const unityText = localFont({
  src: [
    { path: "../public/fonts/tccc-unity-text-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/tccc-unity-text-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

// Latin subset only — cyrillic/vietnamese subsets were dead weight.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Self-hosted Arabic face (Asal). The .woff fallback is dropped — every
// browser since 2016 speaks woff2, and the duplicate file was preloaded
// alongside the woff2 on every first visit.
export const asalArabic = localFont({
  src: [{ path: "../public/fonts/asal-arabic.woff2", weight: "500", style: "normal" }],
  variable: "--font-ar",
  display: "swap",
});
