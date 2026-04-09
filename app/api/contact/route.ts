import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_NAME = 120;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;
const MIN_FORM_MS = 2500;

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

function isLocalDevOrigin(origin: string): boolean {
  try {
    const u = new URL(origin);
    return (
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname === "::1" ||
      u.hostname === "[::1]"
    );
  } catch {
    return false;
  }
}

function allowedOrigin(origin: string | null): boolean {
  if (!origin || origin === "null") return true;
  if (isLocalDevOrigin(origin)) return true;

  const allowed = new Set([
    "https://strandandstonellc.com",
    "https://www.strandandstonellc.com",
  ]);
  if (process.env.VERCEL_URL) {
    allowed.add(`https://${process.env.VERCEL_URL}`);
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    allowed.add(process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, ""));
  }
  return allowed.has(origin);
}

function serviceUnavailableMessage(): string {
  if (process.env.NODE_ENV === "development") {
    return "Contact form needs RESEND_API_KEY. Add it to .env.local and restart the dev server.";
  }
  return "We couldn’t send that just now. Please try again in a moment or write directly to hello@strandandstonellc.com.";
}

export async function POST(req: NextRequest) {
  if (!allowedOrigin(req.headers.get("origin"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: serviceUnavailableMessage() }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const company = typeof body.company === "string" ? body.company.trim() : "";
  if (company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const startedAt = Number(body._startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FORM_MS) {
    return NextResponse.json({ error: "Please take a moment before sending." }, { status: 429 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE) : "";

  if (!name || !isValidEmail(email) || message.length < MIN_MESSAGE) {
    return NextResponse.json({ error: "Please check your name, email, and message." }, { status: 400 });
  }

  const inbox = process.env.CONTACT_TO_EMAIL ?? "hello@strandandstonellc.com";
  const from =
    process.env.CONTACT_FROM_EMAIL ??
    "Strand & Stone <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  // 1) Notify team at hello@ — full context, Reply-To = visitor
  const teamMail = await resend.emails.send({
    from,
    to: [inbox],
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

  if (teamMail.error) {
    console.error("[contact] team notify failed", teamMail.error);
    return NextResponse.json(
      { error: "Could not deliver your message. Try again or email hello@strandandstonellc.com directly." },
      { status: 502 }
    );
  }

  // 2) Auto-reply to visitor — subtle confirmation (non-fatal if this fails)
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

  const visitorMail = await resend.emails.send({
    from,
    to: [email],
    replyTo: inbox,
    subject: "We received your message — Strand & Stone",
    text: autoReplyText,
    html: autoReplyHtml,
  });

  if (visitorMail.error) {
    console.error("[contact] auto-reply failed (team email was sent)", visitorMail.error);
  }

  return NextResponse.json({ ok: true });
}
