# Strand & Stone LLC — Website

Marketing site for [Strand & Stone LLC](https://strandandstonellc.com). Next.js 14 (App Router), deployed on Vercel.

## Stack

- **Framework:** Next.js 14, TypeScript, Tailwind CSS
- **Motion:** Framer Motion
- **Fonts:** Cormorant Garamond (display), DM Mono (body) via `next/font`
- **Analytics:** Google Analytics 4 (gtag). Google Signals and ads personalization are disabled on the tag. The tag is not loaded when `navigator.globalPrivacyControl === true`. Set event retention to 14 months in GA4 Admin → Data settings → Data retention (that control is not in this repo). Fonts are self-hosted with `next/font`.
- **Contact form:** Zoho Mail SMTP via nodemailer — notifies the studio inbox and sends the visitor an auto-reply (`/api/contact`)
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

Contact mail is sent with nodemailer over Zoho SMTP (`smtp.zoho.com`, port 465, SSL). Names only — do not commit values.

| Variable | Required | Description |
|----------|----------|-------------|
| `ZOHO_SMTP_USER` | **Yes** (contact form) | Zoho mailbox login. The message **From** address is this value; Zoho rejects any other sender. |
| `ZOHO_SMTP_PASS` | **Yes** (contact form) | Zoho app password for `ZOHO_SMTP_USER`. |
| `CONTACT_TO_EMAIL` | Optional | Inbox that receives form submissions. Defaults to `ZOHO_SMTP_USER` when unset. |
| `ZOHO_SMTP_HOST` | Optional | SMTP host. Defaults to `smtp.zoho.com` when unset. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Production site URL (no trailing slash) for stricter `Origin` checks on the contact API. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 measurement ID; falls back to hardcoded ID if unset. |

**What each submit does:** (1) Email to `CONTACT_TO_EMAIL` (or `ZOHO_SMTP_USER`) with name, email, and message — **From** is `ZOHO_SMTP_USER`, **Reply-To** is the visitor. (2) Auto-reply to the visitor confirming receipt — **Reply-To** is the same inbox so they can follow up. If the auto-reply fails, the team email still went out (check server logs).

Set variables in Vercel under **Settings → Environment Variables** for **Production** (and Preview, if the form should work there), then **Redeploy** so the new values load. If `ZOHO_SMTP_USER` or `ZOHO_SMTP_PASS` is missing, the contact form shows a generic “try again” message and the function logs a `[contact]` line naming `ZOHO_SMTP_USER` and `ZOHO_SMTP_PASS`.

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
