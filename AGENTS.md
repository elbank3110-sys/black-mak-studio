# AGENTS.md â€” Operating guide for BLACK-MAK studio site

This file is for AI agents / future sessions. Read it before making changes.

## Project identity
- Next.js 15.5.24 App Router, React 19, TypeScript, Tailwind v3, Framer Motion, Lenis, GSAP (project pages only).
- Vercel project: `black-mak` (lowercase required). Live: https://black-mak.vercel.app
- Primary Behance profile: https://www.behance.net/Muhmed-alaa-el-bank
- Designer: Muhamed Alaa Elbank. Brand: BLACK-MAK. Color rule: **black dominant, no navy**.
- **Unified email**: `makeenmuhamed31@gmail.com` (contact + PayPal + everywhere).

## Build & deploy
- Install: `npm install`
- Build: `npm run build` (Windows PowerShell: use `npm.cmd`, not `npm.ps1`)
- Deploy: `.\deploy.ps1` (token lives in `.env.deploy.local`, git-ignored)
- Node 24.x.

## Design / brand requirements (updated 2026)
- **Palette**: black dominant, white/light-gray accents. **No navy. No platform green.**
  The WhatsApp float is brand-skinned (bg/85 + border), NOT green.
- **Type scale â€” three degrees, no more uniform 7rem everywhere:**
  - Hero H1: `.hero-title` clamp(2.3rem, 4.8vw, 5rem) â€” the page's single climax
  - Primary sections (Work/Why/Services/About/Process/Pricing): clamp(2.6rem, 5.5vw, 4.6rem)
  - Service sections (Who/FAQ/Payment/SEO pages): clamp(2.2â€“2.4rem, 4.6vw, 3.8â€“4.6rem)
- **Hero**: the MarkDraw SVG (components/MarkDraw.tsx) strokes the monogram into
  existence, then floods it with ink. The two CSS business cards are REMOVED â€”
  do not reintroduce mockups as hero content. The two USPs (bilingual, outdoor)
  sit in the first screen.
- **Brand mark** (`components/BrandMark.tsx`): the SOLID vector geometry from the
  official identity files. fill="currentColor" â†’ theme-adaptive. Never swap.
- **Intro** (`Intro.tsx`): â‰¤900ms, once per session, reveal-not-gate. Keep under 1s.
- **ScaleTest**: interactive faviconâ†’facade slider. Keep pure-CSS-transform.
- **SurvivalStage** (case pages): GSAP ScrollTrigger pinned scene â€” the five tests
  (24px/mono/packaging/signage/distance). GSAP loads via dynamic import on case
  pages ONLY; never put it in the homepage bundle. Mobile/reduced-motion get the
  static rail.
- **Pricing single source**: `lib/services.ts` feeds BOTH Services rows and
  Investment cards. Never hardcode a price in a component â€” edit services.ts only.
  Current floors: Logo $290 / Full Identity $890 (featured) / Typographic $490 /
  Digital $690 / Rebrand $1290.
- **Payment** lives at `/pay` (noindex) â€” sent after proposal approval. NEVER on
  the homepage.
- **Form**: Server Action (`lib/actions.ts`) validates (zod), rate-limits, logs
  `[LEAD]` structured JSON, optionally emails via RESEND_API_KEY (env), then
  returns a WhatsApp URL the client renders as a SECONDARY link. No `window.open`
  anywhere in the submit path. `role="status"`/`role="alert"` on all outcomes.
- **No budget "Under $300"** option â€” the floor in the dropdown is $300â€“$600.
- **SEO landing pages**: `/arabic-logo-design`, `/calligraphic-wordmark`,
  `/bilingual-brand-identity` â€” real content, in sitemap. Keep them.

## CRITICAL conventions (do not break)
1. **Tailwind colors are CSS variables** â€” never hardcode hex in utilities.
2. **Light theme** via `[data-theme="light"]` var overrides only.
3. **No WebGL. No mix-blend-mode on the grain.** The dark background is a static
   `radial-gradient` on body. Do not re-add a shader background.
4. **No `repeat: Infinity` animations.** The cue-run plays twice then stops;
   sticky-dot and biling-diamond are static. Motion = ambient(1.4s)/content(0.8s)/
   feedback(0.25s) tiers via Reveal, then stillness.
5. **Fonts** (`lib/fonts.ts`): TCCC Unity headline 400/700/800 + text 400/700 +
   IBM Plex Mono latin 400/500 + Asal woff2 only. Do not re-add light/medium
   cuts, the .woff Arabic fallback, or non-latin mono subsets.
6. **Counters (About/Stats)**: final values render in SSR HTML; the animation
   settles from ~30% below target. NEVER count up from zero.
7. **i18n**: strings in `lib/i18n.tsx` (EN + AR). Arabic gets motion now â€”
   HeadlineReveal/HeroTitle split at LINE boundaries only (never words).
   MagicLayer word-rise stays Latin-only (word splitting breaks joining).
8. **Header** stays `dir="ltr"`. Language toggle reads "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©".
9. **Work cards** link to internal `/work/<slug>` pages. Behance from case page.
10. **Magnetic** (MagicLayer): cached centers, no getBoundingClientRect in the
    mousemove path. If you extend it, keep the cache + resize re-measure pattern.
11. **Services mobile grid**: `sm:grid-cols-[64px_1fr_auto]` collapses to single
    column below sm â€” keep the mobile collapse.
12. **CTA copy unified**: "Start Your Project" / "Ø§Ø¨Ø¯Ø£ Ù…Ø´Ø±ÙˆØ¹Ùƒ". The one
    low-commitment variant: "Book a 15-minute fit call".

## Removed / do not re-add
- `WebGLBackground.tsx` (deleted â€” static radial-gradient instead)
- Hero business cards (CSS mockups)
- `services.portTitle/portText/portCta` banner (portfolio-microsite upsell)
- `.btn-navy` class (dead name) â€” use `.btn-light` for solid buttons
- `mix-blend-mode` on the grain, `repeat: Infinity` everywhere, `breathe`,
  `spin-slow` keyframes
- 11 of 13 font preloads (light/medium cuts, .woff Arabic, non-latin mono subsets)
- "Under $300" budget option, payment section on the homepage
- `public/fonts/signategrotesk-*`, `tccc-unity-light/medium`, `asal-arabic.woff`

## Workflow notes
- **Language**: the user communicates in **Arabic (Egyptian)** â€” respond in Arabic.
- **Case studies** (`lib/cases.ts`): `logos-vol-2`, `logos-vol-1`, `outdoor-advertising`,
  `calligraphi-works`, `makeen`. Case pages render SurvivalStage + gallery + CTA.

## Secrets
- Vercel deploy token is personal â€” rotate after use, never commit.
- `RESEND_API_KEY` / `LEAD_TO` env vars are OPTIONAL (form emails). Without them,
  leads still persist in Vercel Logs as `[LEAD]` JSON lines.

## Verification
After changes: `npm run build` must pass, then deploy. Spot-check `/`, `/work/<slug>`,
`/pay`, `/arabic-logo-design`, sitemap.xml. Toggle theme + language. Verify the intro
is â‰¤900ms, the SurvivalStage pins on desktop and statics on mobile, and the form
submits without `window.open` (check network + console for `[LEAD]`).
