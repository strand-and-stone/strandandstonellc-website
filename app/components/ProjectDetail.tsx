"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "../data/projects";
import { formatProjectStatus, isLiveProjectStatus } from "../data/projects";

const ease = [0.22, 1, 0.36, 1] as const;
const dur = 0.8;

export default function ProjectDetail({ project }: { project: Project }) {
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
          href="/projects"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          ← PROJECTS
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.1 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <span
            className="font-mono text-[10px]"
            style={{ letterSpacing: "0.3em", color: "var(--accent)" }}
          >
            {project.category.toUpperCase()}
          </span>
          <span
            className="font-mono text-[9px] px-2 py-0.5 border"
            style={{
              letterSpacing: "0.15em",
              color: isLiveProjectStatus(project.status) ? "var(--accent)" : "var(--muted)",
              borderColor: isLiveProjectStatus(project.status)
                ? "rgba(201,185,154,0.4)"
                : "rgba(140,125,107,0.3)",
            }}
          >
            {formatProjectStatus(project.status)}
          </span>
          <span
            className="font-mono text-[9px] ml-auto"
            style={{ color: "var(--muted)", letterSpacing: "0.15em", opacity: 0.5 }}
          >
            {project.year}
          </span>
        </div>

        <h1
          className="font-display font-light leading-none text-foreground mb-4"
          style={{ fontSize: "clamp(3rem,7vw,6rem)", letterSpacing: "-0.02em" }}
        >
          {project.title}
        </h1>

        <p
          className="font-display italic font-light leading-relaxed mb-8"
          style={{ fontSize: "clamp(1.1rem,2vw,1.35rem)", color: "var(--muted)" }}
        >
          {project.tagline}
        </p>

        {/* CTAs — prominent, right under the title */}
        <div className="flex flex-wrap gap-4">
          {project.appStoreUrl && (
            <a
              href={project.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] px-5 py-3 border transition-all duration-300"
              style={{
                letterSpacing: "0.2em",
                color: "var(--background)",
                background: "var(--accent)",
                borderColor: "var(--accent)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--background)";
              }}
            >
              APP STORE ↗
            </a>
          )}
          {project.websiteUrl && (
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] px-5 py-3 border transition-all duration-300"
              style={{
                letterSpacing: "0.2em",
                color: "var(--foreground)",
                background: "transparent",
                borderColor: "rgba(240,237,232,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,237,232,0.2)";
                (e.currentTarget as HTMLElement).style.color = "var(--foreground)";
              }}
            >
              WEBSITE ↗
            </a>
          )}
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: dur, ease, delay: 0.25 }}
        className="w-full h-px mb-16"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
      />

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur, ease, delay: 0.3 }}
        className="font-mono text-[0.85rem] leading-loose mb-16"
        style={{ color: "var(--foreground)", opacity: 0.85 }}
      >
        {project.description}
      </motion.p>

      {/* Body paragraphs */}
      <div className="space-y-8 mb-20">
        {project.body.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur, ease, delay: 0.4 + i * 0.08 }}
            className="font-mono text-[0.78rem] leading-loose"
            style={{ color: "var(--muted)", opacity: 0.8 }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: dur, ease, delay: 0.7 }}
        className="w-full h-px mb-16"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
      />

      {/* Footer nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur, ease, delay: 0.9 }}
        className="pt-8 border-t flex justify-between items-center"
        style={{ borderColor: "rgba(201,185,154,0.15)" }}
      >
        <Link
          href="/projects"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          ← ALL PROJECTS
        </Link>
        <Link
          href="/"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          HOME
        </Link>
      </motion.div>
    </main>
  );
}
