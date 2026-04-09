"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const SandCanvas = dynamic(() => import("./components/SandCanvas"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
      <SandCanvas />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(10,10,10,0.7) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-10">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="font-display font-light leading-none text-foreground select-none"
            style={{ fontSize: "clamp(6rem,18vw,14rem)", letterSpacing: "-0.04em", opacity: 0.12 }}
          >
            404
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.4, scaleY: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, transparent, var(--accent), transparent)", marginTop: "-4rem" }}
        />

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <span
            className="font-mono text-[10px] uppercase"
            style={{ letterSpacing: "0.3em", color: "var(--accent)" }}
          >
            Lost in the sand
          </span>
          <p
            className="font-display italic font-light max-w-sm leading-relaxed"
            style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", color: "var(--muted)" }}
          >
            This page doesn&apos;t exist — or has drifted somewhere else.
          </p>
        </motion.div>

        {/* Nav links */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 items-center mt-2 max-w-md"
        >
          <Link
            href="/"
            className="nav-link font-mono text-[11px] text-foreground pb-1"
            style={{ letterSpacing: "0.25em" }}
          >
            HOME
          </Link>
          <Link
            href="/projects"
            className="nav-link font-mono text-[11px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            PROJECTS
          </Link>
          <Link
            href="/services"
            className="nav-link font-mono text-[11px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            SERVICES
          </Link>
          <Link
            href="/ethos"
            className="nav-link font-mono text-[11px] pb-1"
            style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
          >
            ETHOS
          </Link>
        </motion.nav>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.8 }}
        className="absolute bottom-8 font-mono text-[9px] text-center z-10"
        style={{ letterSpacing: "0.2em", color: "var(--muted)", opacity: 0.5 }}
      >
        STRAND &amp; STONE LLC
      </motion.div>
    </main>
  );
}
