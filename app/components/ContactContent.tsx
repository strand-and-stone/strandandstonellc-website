"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const dur = 0.8;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactContent() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<number>(0);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("sending");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      company: fd.get("company"),
      _startedAt: startedAtRef.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
      startedAtRef.current = Date.now();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen px-8 py-20 max-w-2xl mx-auto">
      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0 }}
        className="mb-20"
      >
        <Link
          href="/"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          ← STRAND &amp; STONE
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.1 }}
        className="mb-16"
      >
        <span
          className="font-mono text-[10px] block mb-4"
          style={{ letterSpacing: "0.3em", color: "var(--accent)" }}
        >
          CONTACT
        </span>
        <h1
          className="font-display font-light leading-none text-foreground mb-6"
          style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
        >
          Say Hello.
        </h1>
        <p
          className="font-mono text-[0.78rem] leading-loose"
          style={{ color: "var(--muted)", opacity: 0.8 }}
        >
          Got a project in mind, a question, or just want to talk?{" "}
          <a
            href="mailto:hello@strandandstonellc.com"
            className="nav-link pb-px"
            style={{ color: "var(--accent)" }}
          >
            hello@strandandstonellc.com
          </a>
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: dur, ease, delay: 0.2 }}
        className="w-full h-px mb-16"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
      />

      {/* Form */}
      {status === "sent" ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, ease }}
          className="py-20 flex flex-col items-center gap-6 text-center"
        >
          <div
            className="w-px h-16"
            style={{ background: "linear-gradient(to bottom, transparent, var(--accent), transparent)" }}
          />
          <p
            className="font-display italic font-light"
            style={{ fontSize: "clamp(1.3rem,3vw,2rem)", color: "var(--muted)" }}
          >
            Message received.
          </p>
          <span
            className="font-mono text-[10px]"
            style={{ letterSpacing: "0.25em", color: "var(--accent)" }}
          >
            WE&apos;LL BE IN TOUCH
          </span>
          <p
            className="font-mono text-[0.7rem] max-w-xs leading-relaxed"
            style={{ color: "var(--muted)", opacity: 0.65 }}
          >
            You should get a short confirmation email in a minute or two — check spam if you don&apos;t see it.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 nav-link font-mono text-[10px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            SEND ANOTHER
          </button>
        </motion.div>
      ) : (
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, ease, delay: 0.3 }}
          className="space-y-10 relative"
        >
          {/* Honeypot — bots fill this; humans never see it */}
          <div
            className="absolute w-px h-px overflow-hidden opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errorMessage && (
            <p
              className="font-mono text-[0.75rem] py-3 px-4 border"
              style={{
                borderColor: "rgba(201,185,154,0.35)",
                color: "var(--accent)",
                letterSpacing: "0.02em",
              }}
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-name"
                className="font-mono text-[9px]"
                style={{ letterSpacing: "0.25em", color: "var(--accent)" }}
              >
                NAME
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                maxLength={120}
                className="bg-transparent border-b font-mono text-[0.8rem] py-2 outline-none transition-colors duration-300 placeholder:opacity-30"
                style={{
                  borderColor: "rgba(201,185,154,0.2)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(201,185,154,0.2)")}
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="contact-email"
                className="font-mono text-[9px]"
                style={{ letterSpacing: "0.25em", color: "var(--accent)" }}
              >
                EMAIL
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
                maxLength={254}
                className="bg-transparent border-b font-mono text-[0.8rem] py-2 outline-none transition-colors duration-300 placeholder:opacity-30"
                style={{
                  borderColor: "rgba(201,185,154,0.2)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(201,185,154,0.2)")}
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="contact-message"
              className="font-mono text-[9px]"
              style={{ letterSpacing: "0.25em", color: "var(--accent)" }}
            >
              MESSAGE
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              maxLength={5000}
              placeholder="What's on your mind?"
              className="bg-transparent border-b font-mono text-[0.8rem] py-2 outline-none resize-none transition-colors duration-300 placeholder:opacity-30"
              style={{
                borderColor: "rgba(201,185,154,0.2)",
                color: "var(--foreground)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,185,154,0.2)")}
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
            <span
              className="font-mono text-[9px] order-2 sm:order-1"
              style={{ color: "var(--muted)", opacity: 0.5, letterSpacing: "0.15em" }}
            >
              Secured delivery · hello@strandandstonellc.com
            </span>
            <button
              type="submit"
              disabled={status === "sending"}
              className="font-mono text-[10px] px-6 py-3 border transition-all duration-300 disabled:opacity-50 order-1 sm:order-2 self-start sm:self-auto"
              style={{
                letterSpacing: "0.2em",
                color: "var(--background)",
                background: "var(--accent)",
                borderColor: "var(--accent)",
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--background)";
              }}
            >
              {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </div>
        </motion.form>
      )}

      {/* Footer nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur, ease, delay: 0.9 }}
        className="pt-16 mt-16 border-t flex justify-between items-center"
        style={{ borderColor: "rgba(201,185,154,0.15)" }}
      >
        <Link
          href="/"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          HOME
        </Link>
        <div className="flex flex-wrap gap-x-8 gap-y-2 justify-end">
          <Link
            href="/services"
            className="nav-link font-mono text-[10px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            SERVICES →
          </Link>
          <Link
            href="/projects"
            className="nav-link font-mono text-[10px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            PROJECTS →
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
