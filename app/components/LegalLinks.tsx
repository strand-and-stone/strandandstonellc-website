import Link from "next/link";

const variants = {
  home: {
    className: "nav-link font-mono text-[9px] pb-px",
    style: { letterSpacing: "0.2em", color: "var(--muted)", opacity: 0.45 },
  },
  page: {
    className: "nav-link font-mono text-[10px] pb-1",
    style: { letterSpacing: "0.25em", color: "var(--muted)" },
  },
} as const;

/** Privacy and Terms, styled like the footer links on the page that hosts them. */
export default function LegalLinks({
  variant = "page",
}: {
  variant?: keyof typeof variants;
}) {
  const link = variants[variant];
  return (
    <>
      <Link href="/privacy" className={link.className} style={link.style}>
        Privacy
      </Link>
      <Link href="/terms" className={link.className} style={link.style}>
        Terms
      </Link>
    </>
  );
}
