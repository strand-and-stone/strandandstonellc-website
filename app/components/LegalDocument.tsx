import Link from "next/link";
import type { ReactNode } from "react";
import LegalLinks from "./LegalLinks";

export function LegalLead({ children }: { children: ReactNode }) {
  return (
    <strong className="font-medium" style={{ color: "var(--foreground)" }}>
      {children}
    </strong>
  );
}

export default function LegalDocument({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen px-8 py-20 max-w-3xl mx-auto">
      <div className="mb-20">
        <Link
          href="/"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          ← STRAND &amp; STONE
        </Link>
      </div>

      <header className="mb-16">
        <span
          className="font-mono text-[10px] block mb-4"
          style={{ letterSpacing: "0.3em", color: "var(--accent)" }}
        >
          {kicker}
        </span>
        <h1
          className="font-display font-light leading-none text-foreground"
          style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}
        >
          {title}
        </h1>
      </header>

      <article
        className="space-y-6 font-mono text-[0.8rem] leading-loose"
        style={{ color: "var(--body)" }}
      >
        {children}
      </article>

      <footer
        className="pt-16 mt-16 border-t flex flex-wrap gap-x-8 gap-y-3 justify-between items-center"
        style={{ borderColor: "rgba(201,185,154,0.15)" }}
      >
        <Link
          href="/"
          className="nav-link font-mono text-[10px] pb-1"
          style={{ letterSpacing: "0.25em", color: "var(--muted)" }}
        >
          HOME
        </Link>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-8 gap-y-2">
          <LegalLinks />
        </nav>
      </footer>
    </main>
  );
}
