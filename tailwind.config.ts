import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        seal: "var(--seal)",
      },
      fontFamily: {
        sans: ["var(--font-signate)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        ar: ["var(--font-ar)", "IBM Plex Sans Arabic", "Arial", "sans-serif"],
        signature: ["var(--font-signature)", "Holimount", "'38-lineart - Holimount'", "cursive"],
        swash: ["var(--font-swash)", "'Holimount Swash'", "'38-lineart - Holimount swash'", "cursive"],
      },
      maxWidth: { container: "1380px" },
      transitionTimingFunction: { smooth: "cubic-bezier(.22,1,.36,1)" },
    },
  },
  plugins: [],
} satisfies Config;
