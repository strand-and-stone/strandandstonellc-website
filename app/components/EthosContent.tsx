"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;
const dur = 0.8;

const founders = [
  /* Phil — redacted listing; restore when ready
  {
    name: "",
    redactName: true,
    role: "Chief Strategy",
    bio: "Connects the dots between vision and execution — ensuring every decision serves a purpose and every project leaves a mark worth making.",
  },
  */
  {
    name: "John Meeker",
    redactName: false,
    role: "Chief Technology",
    bio: "Builds the systems underneath — turning ambitious ideas into reliable, performant experiences that hold up under pressure and scale with intention.",
  },
  {
    name: "Cameron Meeker",
    redactName: false,
    role: "Chief Creative",
    bio: "Shapes the visual language of every project — bringing a sharp eye for craft, restraint, and the kind of design that feels inevitable in hindsight.",
  },
];

export default function EthosPage() {
  return (
    <main className="min-h-screen px-8 py-20 max-w-3xl mx-auto">
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
          ETHOS
        </span>
        <h1
          className="font-display font-light leading-none text-foreground"
          style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
        >
          Who We Are
        </h1>
      </motion.div>

      {/* Origin story */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.2 }}
        className="mb-20 space-y-6"
      >
        <p
          className="font-display italic text-[1.25rem] leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          It started in a Santa Monica apartment in 2013.
        </p>
        <p className="font-mono text-[0.8rem] leading-loose" style={{ color: "var(--muted)", opacity: 0.8 }}>
          Three friends — drawn together by a shared restlessness with the ordinary — decided to build
          something different. Not a studio, not an agency. A collective of makers who refused to separate
          craft from intention.
        </p>
        <p className="font-mono text-[0.8rem] leading-loose" style={{ color: "var(--muted)", opacity: 0.8 }}>
          Years passed. Life happened. But the idea never left. Strand &amp; Stone is the culmination of that
          original conversation: a belief that digital experiences should feel as considered and alive as the
          physical world.
        </p>
        <p className="font-mono text-[0.8rem] leading-loose" style={{ color: "var(--muted)", opacity: 0.8 }}>
          We build with precision, design with restraint, and ship work that endures.
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: dur, ease, delay: 0.35 }}
        className="w-full h-px mb-20"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
      />

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.4 }}
        className="mb-20"
      >
        <span
          className="font-mono text-[10px] block mb-6"
          style={{ letterSpacing: "0.3em", color: "var(--accent)" }}
        >
          MISSION
        </span>
        <blockquote
          className="font-display font-light italic leading-snug text-foreground"
          style={{ fontSize: "clamp(1.5rem,3.5vw,2.5rem)" }}
        >
          &ldquo;To make things worth making — and experiences worth having.&rdquo;
        </blockquote>
      </motion.div>

      {/* Founders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.5 }}
        className="mb-20"
      >
        <span
          className="font-mono text-[10px] block mb-10"
          style={{ letterSpacing: "0.3em", color: "var(--accent)" }}
        >
          FOUNDING MEMBERS
        </span>
        <div className="grid gap-10">
          {founders.map((f, i) => (
            <motion.div
              key={`founder-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur, ease, delay: 0.55 + i * 0.1 }}
              className="flex gap-8 items-start"
            >
              <div
                className="font-mono text-[10px] pt-1 shrink-0"
                style={{ color: "var(--accent)", letterSpacing: "0.15em", minWidth: "2rem" }}
              >
                0{i + 1}
              </div>
              <div>
                <p className="font-display text-xl text-foreground leading-none mb-1">
                  {f.redactName ? (
                    <span
                      className="relative inline-block group cursor-help align-baseline rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                      tabIndex={0}
                      aria-label="Founding member — name withheld on purpose"
                      title="They’re under an NDA with the concept of ‘personal brand.’ We’re not allowed to say who — only that they’re very strategic about it."
                    >
                      <span
                        className="font-mono text-[0.95rem] sm:text-lg tracking-[0.12em] select-none inline-flex items-center gap-2 flex-wrap"
                        style={{ color: "var(--accent)" }}
                      >
                        <span className="opacity-50" aria-hidden="true">
                          ░▒▓
                        </span>
                        <span className="italic font-display font-light tracking-normal opacity-90">
                          Classified Strategist
                        </span>
                        <span className="opacity-50" aria-hidden="true">
                          ▓▒░
                        </span>
                      </span>
                      <span
                        className="pointer-events-none absolute z-20 left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-[calc(100%+12px)] w-max max-w-[min(300px,88vw)] px-4 py-3 font-mono text-[10px] leading-relaxed text-left opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0"
                        style={{
                          background: "#111110",
                          border: "1px solid rgba(201,185,154,0.35)",
                          color: "var(--foreground)",
                          letterSpacing: "0.04em",
                          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
                        }}
                        role="tooltip"
                      >
                        Official reason: witness protection from a rogue PowerPoint template that escaped in 2014. Unofficial reason: they told Legal &ldquo;just redact me, it&apos;ll look cool&rdquo; — and honestly? Fair.
                      </span>
                    </span>
                  ) : (
                    f.name
                  )}
                </p>
                <p
                  className="font-mono text-[9px] mb-3"
                  style={{ letterSpacing: "0.2em", color: "var(--accent)" }}
                >
                  {f.role.toUpperCase()}
                </p>
                <p className="font-mono text-[0.75rem] leading-loose" style={{ color: "var(--muted)", opacity: 0.7 }}>
                  {f.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur, ease, delay: 0.9 }}
        className="pt-8 border-t flex justify-between items-center"
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
