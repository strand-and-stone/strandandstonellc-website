# Strand & Stone LLC — Website

Marketing site for [Strand & Stone LLC](https://strandandstonellc.com). Next.js 14 (App Router), deployed on Vercel.

## Stack

- **Framework:** Next.js 14, TypeScript, Tailwind CSS
- **Motion:** Framer Motion
- **Fonts:** Cormorant Garamond (display), DM Mono (body) via `next/font`
- **Analytics:** Google Analytics 4 (gtag)
- **Host:** Vercel

## Repo

- **GitHub:** [strand-and-stone/strandandstonellc-website](https://github.com/strand-and-stone/strandandstonellc-website)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (e.g. `G-RMZGVPXJ69`). Optional; falls back to hardcoded ID. |

Set in Vercel under **Settings → Environment Variables** for production.

## Deploy

Pushes to `main` trigger automatic deploys on Vercel. Primary domain: **strandandstonellc.com**.

## Project structure

- `app/` — App Router pages and layout
- `app/components/` — Home hero, sand canvas, magnetic wordmark, ethos/projects content
- `app/not-found.tsx` — Custom 404
- `public/` — Static assets (e.g. sitemap)
- `.cursor/` — Cursor/MCP config (e.g. Google Analytics MCP)

## Scripts

- `npm run dev` — Local dev server
- `npm run build` — Production build
- `npm run start` — Run production build locally
- `npm run lint` — ESLint
