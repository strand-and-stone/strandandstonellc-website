import { createTransport } from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_NAME = 120;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;
const MIN_FORM_MS = 2500;

const NO_STORE = { "Cache-Control": "no-store, max-age=0" } as const;

function json(data: unknown, init?: { status?: number }) {
  return NextResponse.json(data, {
    status: init?.status,
    headers: NO_STORE,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(email: string) {
  if (email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeHost(raw: string | undefined): string | null {
  if (!raw) return null;
  const h = raw.trim().replace(/^https?:\/\//i, "").split("/")[0]?.toLowerCase();
  return h || null;
}

function isLocalDevHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]"
  );
}

function allowedHostsForRequest(): Set<string> {
  const hosts = new Set<string>(["strandandstonellc.com", "www.strandandstonellc.com"]);
  const fromEnv = [
    process.env.VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
  ];
  for (const raw of fromEnv) {
    const h = normalizeHost(raw);
    if (h) hosts.add(h);
  }
  return hosts;
}

function originHostnameAllowed(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    if (isLocalDevHost(hostname)) return true;
    return allowedHostsForRequest().has(hostname);
  } catch {
    return false;
  }
}

/** Same-origin browser requests include Sec-Fetch-Site: same-origin (CSRF-safe signal). */
function isSameOriginBrowserRequest(req: NextRequest): boolean {
  return req.headers.get("sec-fetch-site") === "same-origin";
}

function isContactPostAllowed(req: NextRequest): boolean {
  if (isSameOriginBrowserRequest(req)) return true;

  const origin = req.headers.get("origin");
  if (!origin || origin === "null") return true;

  return originHostnameAllowed(origin);
}

function envTrim(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

function serviceUnavailableMessage(): string {
  if (process.env.NODE_ENV === "development") {
    return "Contact form needs ZOHO_SMTP_USER and ZOHO_SMTP_PASS. Add them to .env.local and restart the dev server.";
  }
  return "We couldn’t send that just now. Please try again in a moment or write directly to hello@strandandstonellc.com.";
}

function mailErrorDetail(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "unknown error";
}

export async function POST(req: NextRequest) {
  if (!isContactPostAllowed(req)) {
    return json({ error: "Forbidden" }, { status: 403 });
  }

  const smtpUser = envTrim("ZOHO_SMTP_USER");
  const smtpPass = envTrim("ZOHO_SMTP_PASS");
  if (!smtpUser || !smtpPass) {
    const missing = [
      !smtpUser ? "ZOHO_SMTP_USER" : null,
      !smtpPass ? "ZOHO_SMTP_PASS" : null,
    ]
      .filter((name): name is string => name !== null)
      .join(", ");
    console.error(
      `[contact] No Zoho SMTP credentials found. Set ZOHO_SMTP_USER and ZOHO_SMTP_PASS. Missing: ${missing}.`
    );
    return json({ error: serviceUnavailableMessage() }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid payload" }, { status: 400 });
  }

  const company = typeof body.company === "string" ? body.company.trim() : "";
  if (company.length > 0) {
    return json({ ok: true });
  }

  const startedAt = Number(body._startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_MS) {
    return json({ error: "Please take a moment before sending." }, { status: 429 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE) : "";

  if (!name || !isValidEmail(email) || message.length < MIN_MESSAGE) {
    return json({ error: "Please check your name, email, and message." }, { status: 400 });
  }

  const inbox = envTrim("CONTACT_TO_EMAIL") ?? smtpUser;
  const smtpHost = envTrim("ZOHO_SMTP_HOST") ?? "smtp.zoho.com";
  // Zoho rejects any From address other than the authenticated mailbox.
  const from = smtpUser;

  const transporter = createTransport({
    host: smtpHost,
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    try {
      await transporter.sendMail({
        from,
        to: inbox,
        replyTo: email,
        subject: `New contact: ${name}`,
        text: [
          `New message from the strandandstonellc.com contact form.`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          ``,
          `Message:`,
          message,
        ].join("\n"),
        html: `<p style="margin:0 0 1rem;font-family:system-ui,sans-serif;font-size:14px;color:#333">New contact from <strong>strandandstonellc.com</strong></p>
<table style="font-family:system-ui,sans-serif;font-size:14px;color:#333;border-collapse:collapse">
<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#666">Name</td><td style="padding:4px 0">${escapeHtml(name)}</td></tr>
<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#666">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
</table>
<p style="margin:1rem 0 0;font-family:system-ui,sans-serif;font-size:14px;color:#333"><strong>Message</strong></p>
<p style="margin:0.5rem 0 0;font-family:system-ui,sans-serif;font-size:14px;color:#333;white-space:pre-wrap">${escapeHtml(message)}</p>`,
      });
    } catch (err) {
      console.error("[contact] team notify failed", mailErrorDetail(err));
      return json(
        {
          error:
            "Could not deliver your message. Try again or email hello@strandandstonellc.com directly.",
        },
        { status: 502 }
      );
    }

    const first = name.split(/\s+/)[0] ?? name;
    const autoReplyText = [
      `Hi ${first},`,
      ``,
      `Thanks for reaching out through strandandstonellc.com — your note is in our inbox.`,
      ``,
      `We read everything that comes through. If there’s a fit or a clear next step, you’ll hear from us. No ticket numbers, no black holes — just humans on the other end.`,
      ``,
      `If something’s urgent, replying to this email goes straight to the same place.`,
      ``,
      `— Strand & Stone LLC`,
    ].join("\n");

    const autoReplyHtml = `<p style="margin:0 0 1rem;font-family:Georgia,serif;font-size:16px;line-height:1.5;color:#1a1a1a">Hi ${escapeHtml(first)},</p>
<p style="margin:0 0 1rem;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#333">Thanks for reaching out through <strong>strandandstonellc.com</strong> — your note is in our inbox.</p>
<p style="margin:0 0 1rem;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#333">We read everything that comes through. If there’s a fit or a clear next step, you’ll hear from us. No ticket numbers, no black holes — just humans on the other end.</p>
<p style="margin:0 0 1rem;font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#333">If something’s urgent, replying to this email goes straight to the same place.</p>
<p style="margin:1.5rem 0 0;font-family:Georgia,serif;font-size:16px;color:#555">— Strand &amp; Stone LLC</p>`;

    try {
      await transporter.sendMail({
        from,
        to: email,
        replyTo: inbox,
        subject: "We received your message — Strand & Stone",
        text: autoReplyText,
        html: autoReplyHtml,
      });
    } catch (err) {
      console.error("[contact] auto-reply failed (team email was sent)", mailErrorDetail(err));
    }

    return json({ ok: true });
  } finally {
    transporter.close();
  }
}
