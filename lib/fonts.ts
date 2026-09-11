import localFont from "next/font/local";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

// One font system, self-hosted via next/font — zero CDN, zero render-blocking
// Google Fonts <link>, and the CSS variables actually resolve (the old CDN setup
// loaded Archivo + IBM Plex Mono but nothing consumed them).
// The CV site (mu-cv) uses the exact same families/variables — one visual DNA.
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Self-hosted Arabic face (Asal) — matches the CV's Arabic typography.
export const asalArabic = localFont({
  src: [
    { path: "../public/asal-arabic.woff2", weight: "500", style: "normal" },
    { path: "../public/asal-arabic.woff", weight: "500", style: "normal" },
  ],
  variable: "--font-ar",
  display: "swap",
});
