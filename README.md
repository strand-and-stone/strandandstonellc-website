# Strand & Stone LLC — Website

Marketing site for [Strand & Stone LLC](https://strandandstonellc.com). Next.js 14 (App Router), deployed on Vercel.

## Stack

- **Framework:** Next.js 14, TypeScript, Tailwind CSS
- **Motion:** Framer Motion
- **Fonts:** Cormorant Garamond (display), DM Mono (body) via `next/font`
- **Analytics:** Google Analytics 4 (gtag)
- **Contact form:** [Resend](https://resend.com) — notifies `hello@…` and sends the visitor an auto-reply (`/api/contact`)
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

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | **Yes** (contact form) | API key from [Resend](https://resend.com). Without it, the form returns 503 (dev shows a hint to add `.env.local`). |
| `CONTACT_FROM_EMAIL` | Recommended | Verified sender, e.g. `Strand & Stone <hello@strandandstonellc.com>`. Until your domain is verified in Resend, use `Strand & Stone <onboarding@resend.dev>` (sending may be limited to your own inbox on the free tier). |
| `CONTACT_TO_EMAIL` | Optional | Inbox for form submissions. Default: `hello@strandandstonellc.com`. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Production site URL (no trailing slash) for stricter `Origin` checks on the contact API. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID; falls back to hardcoded ID if unset. |

**Resend setup:** Add and verify **strandandstonellc.com** in Resend, then create an API key and set `CONTACT_FROM_EMAIL` to an address on that domain.

**What each submit does:** (1) Email to `CONTACT_TO_EMAIL` (default `hello@strandandstonellc.com`) with name, email, and message — **Reply-To** is the visitor. (2) Auto-reply to the visitor confirming receipt — **Reply-To** is `hello@…` so they can follow up. If the auto-reply fails, the team email still went out (check server logs).

Set variables in Vercel under **Settings → Environment Variables**. For the live site, add `RESEND_API_KEY` (and recommended `CONTACT_FROM_EMAIL`) with **Environment** = **Production** (not only Preview/Development), then **Redeploy** so the new values load. If `RESEND_API_KEY` is missing in Production, the contact form shows a generic “try again” message and the function logs a `[contact] RESEND_API_KEY is missing…` line in Vercel → Logs.

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
