"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;
const dur = 0.8;

const areas = [
  {
    id: "01",
    label: "Direction",
    title: "Clarity before pixels",
    copy:
      "We help you name the problem worth solving — audience, constraints, and the story that will carry the work. Less theater, more signal.",
  },
  {
    id: "02",
    label: "Product & experience",
    title: "Interfaces that respect attention",
    copy:
      "Flows, systems, and surfaces that feel inevitable: navigation, motion, and detail tuned for real people on real devices — not trend decks.",
  },
  {
    id: "03",
    label: "Brand & craft",
    title: "A voice you can ship",
    copy:
      "Identity, typography, and visual language with restraint. The kind of consistency that scales from a landing page to a product without losing soul.",
  },
  {
    id: "04",
    label: "Build & launch",
    title: "From prototype to production",
    copy:
      "Modern web and native stacks, performance as a feature, and the discipline to ship — then measure, refine, and improve without rewriting the brief every week.",
  },
  {
    id: "05",
    label: "Partnership",
    title: "After the launch",
    copy:
      "We’re happiest alongside teams who care about the unglamorous middle: iteration, hardening, and the small fixes that compound. Engagements flex to the work — not the other way around.",
  },
];

export default function ServicesContent() {
  return (
    <main className="min-h-screen px-8 py-20 max-w-3xl mx-auto">
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
          SERVICES
        </span>
        <h1
          className="font-display font-light leading-none text-foreground mb-6"
          style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
        >
          How We Help
        </h1>
        <p
          className="font-display italic text-[1.2rem] leading-relaxed max-w-xl"
          style={{ color: "var(--muted)" }}
        >
          Creative and technical work for teams who want something considered — not generic.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: dur, ease, delay: 0.2 }}
        className="w-full h-px mb-16"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.25 }}
        className="font-mono text-[0.8rem] leading-loose mb-20 max-w-2xl"
        style={{ color: "var(--muted)", opacity: 0.85 }}
      >
        We’re a small studio — strategy, design, and engineering under one roof. No bloated retainers
        pitched in slide one; no handoffs where the vision gets lost. If there’s a fit, we’ll say so. If
        not, we’ll point you somewhere honest.
      </motion.p>

      <div className="space-y-0 divide-y" style={{ borderColor: "rgba(201,185,154,0.12)" }}>
        {areas.map((a, i) => (
          <motion.article
            key={a.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, ease, delay: 0.35 + i * 0.07 }}
            className="py-12 first:pt-0 grid gap-8 sm:grid-cols-[minmax(0,4.5rem)_1fr] sm:gap-10"
            style={{ borderColor: "rgba(201,185,154,0.12)" }}
          >
            <span
              className="font-mono text-[10px] shrink-0 sm:pt-1"
              style={{ color: "var(--accent)", letterSpacing: "0.15em" }}
            >
              {a.id}
            </span>
            <div>
              <span
                className="font-mono text-[9px] block mb-3"
                style={{ letterSpacing: "0.22em", color: "var(--accent)", opacity: 0.85 }}
              >
                {a.label.toUpperCase()}
              </span>
              <h2
                className="font-display font-light text-foreground text-2xl sm:text-[1.65rem] leading-snug mb-4"
              >
                {a.title}
              </h2>
              <p
                className="font-mono text-[0.78rem] leading-loose max-w-xl"
                style={{ color: "var(--muted)", opacity: 0.8 }}
              >
                {a.copy}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.75 }}
        className="mt-20 mb-8 p-8 sm:p-10 border"
        style={{ borderColor: "rgba(201,185,154,0.2)" }}
      >
        <p
          className="font-display italic text-lg sm:text-xl leading-relaxed mb-6"
          style={{ color: "var(--muted)" }}
        >
          Have something forming — or stuck mid-flight?
        </p>
        <Link
          href="/contact"
          className="inline-block font-mono text-[10px] px-6 py-3 border transition-all duration-300"
          style={{
            letterSpacing: "0.2em",
            color: "var(--background)",
            background: "var(--accent)",
            borderColor: "var(--accent)",
          }}
        >
          START A CONVERSATION
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur, ease, delay: 0.85 }}
        className="pt-8 border-t flex flex-wrap gap-x-10 gap-y-3 justify-between items-center"
        style={{ borderColor: "rgba(201,185,154,0.15)" }}
      >
        <Link
          href="/"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          HOME
        </Link>
        <div className="flex flex-wrap gap-x-10 gap-y-2">
          <Link
            href="/projects"
            className="nav-link font-mono text-[10px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            PROJECTS →
          </Link>
          <Link
            href="/ethos"
            className="nav-link font-mono text-[10px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            ETHOS →
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
