"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const links = [
  { href: "/projects", label: "PROJECTS" },
  { href: "/ethos", label: "ETHOS" },
];

export default function HomeHero() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,185,154,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-12">
        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0 }}
          className="flex flex-col items-center gap-3"
        >
          <span
            className="font-mono text-[10px] uppercase select-none"
            style={{ letterSpacing: "0.3em", color: "var(--accent)" }}
          >
            est. 2013
          </span>
          <h1
            className="font-display font-light leading-none text-foreground"
            style={{
              fontSize: "clamp(3.5rem,10vw,9rem)",
              letterSpacing: "-0.02em",
            }}
          >
            STRAND
            <span style={{ color: "var(--accent)" }}>&amp;</span>
            STONE
          </h1>
          <span
            className="font-mono text-[10px] uppercase select-none"
            style={{ letterSpacing: "0.3em", color: "var(--muted)" }}
          >
            LLC
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.5, scaleY: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="w-px h-16"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="font-display italic font-light max-w-md leading-relaxed"
          style={{ fontSize: "clamp(1.1rem,2.5vw,1.5rem)", color: "var(--muted)" }}
        >
          Crafting unique digital experiences.
        </motion.p>

        {/* Nav Links */}
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="flex gap-12 items-center mt-4"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link font-mono text-[11px] text-foreground pb-1"
              style={{ letterSpacing: "0.25em", transition: "color 0.3s" }}
            >
              {label}
            </Link>
          ))}
        </motion.nav>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 1.0 }}
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
      >
        <div
          className="font-mono text-[9px] text-center"
          style={{ letterSpacing: "0.2em", color: "var(--muted)", opacity: 0.6 }}
        >
          SANTA MONICA, CA — FOUNDED 2013
        </div>
      </motion.footer>
    </main>
  );
}
