# BLACK-MAK — Portfolio Site

Premium logo & visual identity designer portfolio for **Muhamed Alaa Elbank (BLACK-MAK)**.
Built as a single-page Next.js site with a bilingual (EN/AR) experience, dark-first theme,
and a custom WebGL background.

Live: https://black-mak-v4.vercel.app
Behance (original profile): https://www.behance.net/Muhmed-alaa-el-bank

## Stack
- Next.js 15.5.24 (App Router) + React 19 + TypeScript
- Tailwind CSS v3 (colors mapped to CSS variables — see note below)
- Framer Motion (animations / scroll reveals / timeline)
- Custom WebGL fragment-shader background (`components/WebGLBackground.tsx`)
- Deployed on Vercel (project name **must be lowercase**: `black-mak-v4`)

## Getting started
```bash
npm install
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build
npm run start    # serve the build
```
> On Windows PowerShell, `npm` may be blocked; use `npm.cmd` (e.g. `& "C:\...\npm.cmd" run build`).
> Node 24.x recommended.

## Deploy (Vercel)
```bash
vercel deploy --prod --yes --name "black-mak-v4" --token "<YOUR_VERCEL_TOKEN>" --cwd .
```
- Project name is **lowercase** (`black-mak-v4`); uppercase names are rejected.
- Use a fresh/rotated Vercel token; never commit the token.

## Project structure
```
app/
  layout.tsx            # html/body, fonts, i18n bootstrap, OG metadata, Intro, JSON-LD
  page.tsx              # composes all home sections
  globals.css           # design tokens (CSS vars), light theme, helpers
  work/[slug]/page.tsx  # case-study pages (server + CaseView client, prev/next nav, per-case OG)
  icon.svg              # favicon (letter "M")
  opengraph-image.tsx   # dynamic 1200x630 OG image
components/             # Hero, Header, Work, Services, About, Journey, Process,
                      # Proof, Pricing, Payment, Faq, Contact,
                      # Footer, WhatsAppFloat, WebGLBackground, UIEffects,
                      # ThemeToggle, Reveal, Intro, Statement, SignalStrip, CaseView
lib/
  i18n.tsx              # EN/AR dictionary + I18nProvider + useI18n
  cases.ts              # case-study data (CASES array + getCase)
public/images/work/     # project images (vol1, vol2, banners, makeen, calligraphi)
```

## Key行为 / features
- **Bilingual**: EN + AR. Language persisted in `localStorage["bm-lang"]`;
  on first visit it auto-detects `navigator.language` (ar → Arabic).
- **Palette**: black dominant (~85% black surfaces), rest white/light-gray accents. No navy.
- **Theme**: dark-first; light theme persisted in `localStorage["bm-theme"]`.
- **Intro**: 1.3s centered BLACK-MAK logo on load (`components/Intro.tsx`).
- **Work cards** link directly to their **Behance** projects (not internal case studies).
  Outdoor Advertising uses its own Behance project link
  (`…/gallery/37676905/OUTDOOR-ADVERTISING-WORKS-BANNERS`).
  Case-study pages at `/work/[slug]` still exist and are linked via prev/next navigation.
- **Active nav** highlights the current section on scroll (IntersectionObserver in `Header.tsx`).
- **Timeline animation** on the Journey section (scroll-linked fill line).
- **Pricing**: "LAUNCH OFFER" with discount prices (struck original + sale + SAVE% badge).
- **Brand logo** (nav) click scrolls smoothly back to top.
- **SEO**: `sitemap.xml` (home + all case slugs with hreflang), `robots.txt`, canonical +
  hreflang (en/ar) in `layout.tsx`, and per-case OpenGraph via `generateMetadata` in
  `work/[slug]/page.tsx` (SSG via `generateStaticParams`).
- **Download portfolio (PDF)**: Contact has a "Download portfolio (PDF)" button →
  `public/portfolio.pdf` (placeholder — replace with a designed PDF).
- **a11y**: "Skip to content" link, `Intro` respects `prefers-reduced-motion`, icon buttons
  carry `aria-label`s.
- **Journey tools**: Adobe Illustrator · Adobe Photoshop · AI-assisted (Figma deliberately
  removed — the designer does not work in Figma).
- Origin: merged/upgraded from 3 earlier Vercel portfolios.

## Notes / gotchas
- The two Hero brand cards (black/white with phone + BLACK-MAK) show **only on desktop**
  (`hidden lg:block`). They are intentionally removed on mobile.
- Favicon letter is **"M"** (not B).
- "meaning" / "معنى" in the hero is rendered as an **outline** (`stroke-text`), not italic.
- Language toggle label in EN reads **"العربية"** (was "ع"). The header is forced `dir="ltr"`
  so the toggle never jumps sides when switching languages.
