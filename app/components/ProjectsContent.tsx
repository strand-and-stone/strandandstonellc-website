"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "../data/projects";

const ease = [0.22, 1, 0.36, 1] as const;
const dur = 0.8;

export default function ProjectsContent() {
  return (
    <main className="min-h-screen px-8 py-20 max-w-4xl mx-auto">
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
          CATALOGUE
        </span>
        <h1
          className="font-display font-light leading-none text-foreground"
          style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
        >
          Our Work
        </h1>
      </motion.div>

      {/* Projects list */}
      <div className="divide-y" style={{ borderColor: "rgba(201,185,154,0.12)" }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, ease, delay: 0.3 + i * 0.1 }}
            style={{ borderColor: "rgba(201,185,154,0.12)" }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group py-10 flex flex-col sm:flex-row sm:items-start gap-6 block"
            >
              {/* Index */}
              <span
                className="font-mono text-[10px] shrink-0 mt-1"
                style={{ color: "var(--accent)", letterSpacing: "0.15em", minWidth: "2.5rem" }}
              >
                {project.id}
              </span>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2
                    className="font-display font-light leading-none text-foreground group-hover:text-stone-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)", transition: "color 0.3s" }}
                  >
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-3 shrink-0 mt-2">
                    <span
                      className="font-mono text-[9px]"
                      style={{ color: "var(--muted)", letterSpacing: "0.15em", opacity: 0.6 }}
                    >
                      {project.year}
                    </span>
                    <span
                      className="font-mono text-[9px] group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: "var(--accent)", opacity: 0.5, letterSpacing: "0.1em" }}
                    >
                      VIEW →
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="font-mono text-[9px]"
                    style={{ letterSpacing: "0.2em", color: "var(--accent)" }}
                  >
                    {project.category.toUpperCase()}
                  </span>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 border"
                    style={{
                      letterSpacing: "0.15em",
                      color: project.status === "live" ? "var(--accent)" : "var(--muted)",
                      borderColor:
                        project.status === "live"
                          ? "rgba(201,185,154,0.4)"
                          : "rgba(140,125,107,0.3)",
                      opacity: project.status === "live" ? 1 : 0.6,
                    }}
                  >
                    {project.status.toUpperCase()}
                  </span>
                </div>
                <p
                  className="font-mono text-[0.75rem] leading-loose max-w-lg"
                  style={{ color: "var(--muted)", opacity: 0.7 }}
                >
                  {project.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Footer nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur, ease, delay: 0.8 }}
        className="pt-8 mt-8 border-t flex justify-between items-center"
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
