# AGENTS.md — Operating guide for BLACK-MAK portfolio

This file is for AI agents / future sessions. Read it before making changes.

## Project identity
- Next.js 15.5.24 App Router, React 19, TypeScript, Tailwind v3, Framer Motion.
- Vercel project: `black-mak-v4` (lowercase required). Live: https://black-mak-v4.vercel.app
- Primary Behance profile: https://www.behance.net/Muhmed-alaa-el-bank
- Designer: Muhamed Alaa Elbank. Brand: BLACK-MAK. Color rule: **black dominant, no navy**.

## Build & deploy
- Install: `npm install`
- Build: `npm run build` (Windows PowerShell: use `npm.cmd`, not `npm.ps1`)
- Deploy: `vercel deploy --prod --yes --name "black-mak-v4" --token "<TOKEN>" --cwd .`
- Node 24.x.

## Design / brand requirements
- **Palette**: black dominant (~85% black / near-black surfaces), the rest white / light-gray
  accents. **No navy.** Enforced through CSS variables in `globals.css` + Tailwind color mapping.
- **Type scale** (keep balanced — not too small, not huge):
  - Hero display title: ~`clamp(2.3rem, 4.8vw, 5rem)` (`.hero-title` in globals.css)
  - Section display headings: ~`clamp(2.1rem, 4.4vw, 4.6rem)` (`.display` in globals.css)
  - Lede / paragraph text: left as-is `clamp(1.05rem, 1.6vw, 1.35rem)` — do NOT shrink body copy.
  - These are defined in `globals.css`; do not re-inflate headings.
- **Hero emphasis**: the word "meaning" (EN) / "معنى" (AR) is rendered as an **outline**
  (`stroke-text`), never italic.
- **Brand cards** (black + white, phone + BLACK-MAK): desktop only (`hidden lg:block`);
  never render on mobile.
- **Favicon** letter is **"M"** (not B).
- **Language toggle** (EN label) reads **"العربية"** (was "ع").

## CRITICAL conventions (do not break)
1. **Tailwind colors are CSS variables.** `tailwind.config.ts` maps `ink/muted/faint/bg/surface/
   surface-2/line/line-strong` to `var(--…)`. Light mode works ONLY because of this.  
   → Always use `bg-surface`, `text-ink`, `border-line`, etc. Do **NOT** hardcode hex in
   Tailwind utility classes (e.g. `bg-[#0f1012]`), or light mode breaks.  
   → The only intentional hardcoded colors are the two Hero brand cards (fixed black/white
   contrast) and the WhatsApp button. Leave those.
2. **Light theme** is driven by `[data-theme="light"]` overriding the CSS vars in `globals.css`.
   To add a light-mode-aware color, add a CSS variable and reference it — never a raw color.
3. **WebGL background** (`WebGLBackground.tsx`) is intentionally:
   - disabled on mobile / touch / `pointer: coarse` / `max-width:767px`
   - paused when theme is light or the tab is hidden
   - mobile gets a static `radial-gradient` fallback (see `globals.css` media query)
4. **Cursor glow** (`UIEffects.tsx` + `.cursor-glow`) is disabled on touch/mobile via both JS guard and CSS.
5. **i18n**: all UI strings live in `lib/i18n.tsx` (EN + AR dicts). Components use `useI18n().t(key)`.
    Bilingual content arrays (case studies) embed `{en, ar}` and pick by `lang`.
   - `lang` → `localStorage["bm-lang"]`; auto-detects browser language when unset.
   - `theme` → `localStorage["bm-theme"]`.
   - Hero title / journey title are rendered via `dangerouslySetInnerHTML` (hero) — keep HTML
     markup valid; Journey title must stay plain text (no `<br/>`, it renders literally).
6. **Work cards** (`components/Work.tsx`) link to **Behance** URLs, not internal case studies.
   Outdoor Advertising links to its own Behance project:
   `https://www.behance.net/gallery/37676905/OUTDOOR-ADVERTISING-WORKS-BANNERS`.
   Case-study pages (`app/work/[slug]/page.tsx`, server + `components/CaseView.tsx` client)
   still exist with prev/next nav.
7. **Header** is `dir="ltr"` so the language toggle / theme toggle stay fixed on screen when
   switching AR/EN. Do not make the header RTL.

## Behavior & business notes
- **Brand logo (nav)** click scrolls smoothly to top (even from the bottom of the page).
- **Pricing**: shows a "LAUNCH OFFER" with discount prices — original price struck through,
  sale price shown, plus a SAVE% badge. Preserve this structure when editing pricing.
- **Journey tools** (tag chips): Adobe Illustrator · Adobe Photoshop · AI-assisted.
  Figma was deliberately removed (designer does not use Figma) — do not re-add it.
- **Origin**: this site is a merge/upgrade of 3 previous Vercel portfolios
  (`black-mak`, `BLACK-MAK-II`, `black-mak-noir`). Source assets live in `public/images/work/`.
- **Contact**: phone `+20 100 246 2821`, email `makeenmuhamed31@gmail.com`,
  Behance profile `https://www.behance.net/Muhmed-alaa-el-bank`.
- **Work cards** open Behance project links (logo vols, calligraphy, MAKEEN, and the
  Outdoor Advertising project gallery `…/gallery/37676905/OUTDOOR-ADVERTISING-WORKS-BANNERS`).
- **Images**: case-study galleries are `loading="lazy"` + `decoding="async"`; the first
  two Work images are eager (above the fold).
- **SEO**: `app/sitemap.ts` (home + all case slugs, with hreflang alternates), `app/robots.ts`,
   and `metadata.alternates` in `layout.tsx` set canonical + `hreflang` en/ar (same URL — client i18n).
- **Downloadable portfolio**: `public/portfolio.pdf` is a placeholder PDF (replace with a designed
  one). Contact has a "Download portfolio (PDF)" button (`contact.pdf` key) linking to `/portfolio.pdf`.
- **Per-case OpenGraph**: `app/work/[slug]/page.tsx` is now a server component with
  `generateMetadata` (SSG via `generateStaticParams`) emitting per-case `title`, `description`,
  `canonical`, and `og:image` (absolute cover URL) + Twitter cards. The interactive UI lives in
  `components/CaseView.tsx` (client). Unknown slugs → `notFound()`.
- **Showreel** was removed at user request (no `components/Showreel.tsx`, no Hero button, no keys).
- **Testimonials** section was removed at user request (no component, no nav link, no keys).
- **a11y**: `Intro.tsx` skips the preloader when `prefers-reduced-motion: reduce`.
  `layout.tsx` has a "Skip to content" link (sr-only → focusable). Icon buttons already carry
  `aria-label`s; cursor-glow + WebGL stay `aria-hidden`/decorative.

## Common edits
- Add a section: create `components/X.tsx`, add keys to `lib/i18n.tsx`, mount in `app/page.tsx`.
- Add case study: edit `lib/cases.ts` (`CASES`), ensure gallery images exist in `public/images/work/`.
- Copy assets to `public/`; reference with `/images/...`.

## Workflow notes
- **Language**: the user communicates in **Arabic (Egyptian)** — respond in Arabic unless asked otherwise.
- **Images / screenshots**: capability varies by model. If YOU can read image attachments, use them.
  If you cannot, be honest with the user ("I can't view images") and ask them to describe the
  issue in text (what is missing / broken / off). Never claim to have viewed an image you couldn't.
- **Pricing tiers** (keep these when editing Pricing): sale prices $99 / $149 / $399 / $39,
  struck originals $120 / $180 / $450 / $50, with a "LAUNCH OFFER" pill + SAVE% badge.
- **Case studies** (`lib/cases.ts` slugs): `logos-vol-2`, `logos-vol-1`, `outdoor-advertising`,
  `calligraphi-works`, `makeen`.
- **Fonts**: Archivo + IBM Plex Mono via Google Fonts; Arabic uses local `public/sf-mada-bold.woff2`
  (MadaLocal). Do not add heavy font weights.

## Secrets
- Vercel deploy token is a **personal** token — rotate it after use, never commit it.
- No API keys needed at runtime.

## Verification
After changes: `npm run build` must pass, then deploy. Spot-check `/`, `/work/<slug>`,
`/opengraph-image`, `/icon.svg` return 200. Toggle theme + language, check light mode on
desktop and mobile (WebGL + cursor glow should be off on mobile).
