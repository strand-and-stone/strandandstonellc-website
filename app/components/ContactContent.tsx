"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const dur = 0.8;

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactContent() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.currentTarget);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    // mailto fallback — opens default mail client with pre-filled fields
    const subject = encodeURIComponent(`Message from ${name} — strandandstonellc.com`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:hello@strandandstonellc.com?subject=${subject}&body=${body}`;

    // Show sent state briefly
    setTimeout(() => {
      setStatus("sent");
      formRef.current?.reset();
    }, 400);
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
          <button
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
          className="space-y-10"
        >
          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label
                className="font-mono text-[9px]"
                style={{ letterSpacing: "0.25em", color: "var(--accent)" }}
              >
                NAME
              </label>
              <input
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
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
                className="font-mono text-[9px]"
                style={{ letterSpacing: "0.25em", color: "var(--accent)" }}
              >
                EMAIL
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="your@email.com"
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
              className="font-mono text-[9px]"
              style={{ letterSpacing: "0.25em", color: "var(--accent)" }}
            >
              MESSAGE
            </label>
            <textarea
              name="message"
              required
              rows={6}
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
          <div className="flex items-center justify-between pt-4">
            <span
              className="font-mono text-[9px]"
              style={{ color: "var(--muted)", opacity: 0.5, letterSpacing: "0.15em" }}
            >
              hello@strandandstonellc.com
            </span>
            <button
              type="submit"
              disabled={status === "sending"}
              className="font-mono text-[10px] px-6 py-3 border transition-all duration-300 disabled:opacity-50"
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
        <Link
          href="/projects"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          PROJECTS →
        </Link>
      </motion.div>
    </main>
  );
}
