# AGENTS.md — Operating guide for BLACK-MAK portfolio

This file is for AI agents / future sessions. Read it before making changes.

## Project identity
- Next.js 15.5.24 App Router, React 19, TypeScript, Tailwind v3, Framer Motion, Lenis.
- Vercel project: `black-mak-v4` (lowercase required). Live: https://black-mak-v4.vercel.app
- Primary Behance profile: https://www.behance.net/Muhmed-alaa-el-bank
- Designer: Muhamed Alaa Elbank. Brand: BLACK-MAK. Color rule: **black dominant, no navy**.
- **Unified email**: `makeenmuhamed31@gmail.com` (contact + PayPal + everywhere).
  The old `muhemedalaa2699@gmail.com` is retired — never reintroduce it.

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
- **Hero cards** (Latin dark + Arabic light, desktop only `hidden lg:block`): the two faces of
  the bilingual practice. Never render on mobile.
- **Favicon** letter is **"M"** (not B).
- **Language toggle** (EN label) reads **"العربية"**.
- **Marquee** is the bilingual identity strip (IDENTITY ◆ هوية ◆) — not a service list.

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
4. **i18n**: all UI strings live in `lib/i18n.tsx` (EN + AR dicts). Components use `useI18n().t(key)`.
   Bilingual content arrays (case studies) embed `{en, ar}` and pick by `lang`.
   - `lang` → `localStorage["bm-lang"]`; auto-detects browser language when unset.
   - `theme` → `localStorage["bm-theme"]`.
   - Hero / section titles are rendered via `dangerouslySetInnerHTML` — keep HTML markup valid.
5. **Work cards** (`components/Work.tsx`) link to **internal case pages** `/work/<slug>`
   (NOT Behance). Behance stays reachable from each case page + the archive link at the
   bottom of the Work section. Keep this — visitors must stay inside the studio funnel.
6. **Header** is `dir="ltr"` so the language toggle / theme toggle stay fixed on screen when
   switching AR/EN. Do not make the header RTL.
7. **Fonts** are self-hosted via `next/font` (`lib/fonts.ts`): Archivo (`--font-archivo`),
   IBM Plex Mono (`--font-mono`), local Asal Arabic (`--font-ar`). Never load fonts from
   the Google Fonts CDN `<link>` again — the CSS variables MUST resolve.
8. **Images** use `next/image` (Work cards, case galleries, About portrait, CaseView cover).
   Local JPGs are auto-optimized to WebP/AVIF by the Next image optimizer.

## Behavior & business notes
- **Brand logo (nav)** click scrolls smoothly to top (even from the bottom of the page).
- **Pricing**: three tiers — Focused Logo $159 / Typographic-Calligraphic $249 /
  Full Visual Identity $549 (no discounts, no countdowns — deliberately).
- **Preloader** (`Intro.tsx`) plays once per browser session (`sessionStorage["bm-intro"]`),
  skipped entirely for reduced-motion users.
- **Origin**: this site is a merge/upgrade of 3 previous Vercel portfolios
  (`black-mak`, `BLACK-MAK-II`, `black-mak-noir`). Source assets live in `public/images/work/`.
- **Contact**: phone/WhatsApp `+20 100 246 2821`, email `makeenmuhamed31@gmail.com`,
  Behance profile `https://www.behance.net/Muhmed-alaa-el-bank`.
- **The inquiry form** hands off to WhatsApp: all fields (name, company, type, email,
  channel, budget, brief) are folded into the prefilled message.
- **SEO**: `app/sitemap.ts` (home + all case slugs), `app/robots.ts`, canonical in
  `layout.tsx`. No fake hreflang pairs (single URL, client-side i18n only).
- **Downloadable portfolio**: `public/portfolio.pdf` is generated by `scripts/gen-pdf.mjs`
  (placeholder quality — replace with a designed one when available).
- **Analytics**: `@vercel/analytics` is mounted in `layout.tsx`. Keep it.
- **Testimonials** (Proof section) quotes are placeholder copy pending client approvals.
- **a11y**: `Intro.tsx` skips the preloader when `prefers-reduced-motion: reduce`.
  `layout.tsx` has a "Skip to content" link (sr-only → focusable). Icon buttons carry
  `aria-label`s; WebGL + marquee + hero cards stay `aria-hidden`/decorative.

## Common edits
- Add a section: create `components/X.tsx`, add keys to `lib/i18n.tsx` (EN + AR), mount in `app/page.tsx`.
- Add case study: edit `lib/cases.ts` (`CASES`), ensure gallery images exist in `public/images/work/`.
- Copy assets to `public/`; reference with `/images/...`.

## Removed / do not re-add
- `Journey.tsx`, `CountdownTimer.tsx` (orphaned dead code — deleted).
- sf-mada fonts, `public/logo/*`, `og-image.jpg`, `portrait.jpg`, `favicon.png/svg` (unused — deleted).
- `.cta-link`, `.reveal`, `.form-field` CSS blocks (dead — deleted from globals.css).
- `navy` Tailwind tokens (violated the no-navy rule — deleted).
- Google Fonts CDN `<link>` (fonts now self-hosted via next/font).

## Workflow notes
- **Language**: the user communicates in **Arabic (Egyptian)** — respond in Arabic unless asked otherwise.
- **Images / screenshots**: capability varies by model. If YOU can read image attachments, use them.
  If you cannot, be honest with the user and ask them to describe the issue in text.
- **Case studies** (`lib/cases.ts` slugs): `logos-vol-2`, `logos-vol-1`, `outdoor-advertising`,
  `calligraphi-works`, `makeen`.

## Secrets
- Vercel deploy token is a **personal** token — rotate it after use, never commit it.
- No API keys needed at runtime.

## Verification
After changes: `npm run build` must pass, then deploy. Spot-check `/`, `/work/<slug>`,
`/opengraph-image`, `/icon.svg` return 200. Toggle theme + language, check light mode on
desktop and mobile (WebGL should be off on mobile). Verify Archivo/IBM Plex Mono actually
render (network tab: fonts served from `/_next/static/media/`).
