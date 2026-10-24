import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument, { LegalLead } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for strandandstonellc.com, operated by Strand and Stone LLC, a New Mexico limited liability company.",
  alternates: {
    canonical: "https://www.strandandstonellc.com/terms",
  },
  openGraph: {
    title: "Terms of Use — Strand & Stone LLC",
    description:
      "Terms of Use for strandandstonellc.com, operated by Strand and Stone LLC.",
    url: "https://www.strandandstonellc.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <LegalDocument kicker="TERMS" title="Terms of Use">
      <p>
        <LegalLead>Effective date:</LegalLead> October 23, 2026
      </p>
      <p>
        These Terms govern your use of strandandstonellc.com (the &quot;Site&quot;), operated by
        Strand and Stone LLC, a New Mexico limited liability company (entity no. 0008085725). By
        using the Site you agree to them.
      </p>
      <p>
        <LegalLead>Information only.</LegalLead> The Site describes our company and work. Nothing
        on it is an offer, a contract or professional advice. Any services we provide are governed
        by a separate written agreement.
      </p>
      <p>
        <LegalLead>Intellectual property.</LegalLead> Site content and design belong to us or our
        licensors. Do not copy or republish it without permission. Third-party names and marks
        belong to their owners.
      </p>
      <p>
        <LegalLead>Third-party sites.</LegalLead> We are not responsible for websites we link to.
      </p>
      <p>
        <LegalLead>No warranty.</LegalLead> The Site is provided &quot;as is,&quot; without
        warranties of any kind, to the fullest extent the law allows.
      </p>
      <p>
        <LegalLead>Limitation of liability.</LegalLead> To the fullest extent the law allows, we
        are not liable for indirect, incidental or consequential damages arising from use of the
        Site, and our total liability is limited to $100.
      </p>
      <p>
        <LegalLead>Privacy.</LegalLead> See our{" "}
        <Link href="/privacy" className="nav-link pb-px" style={{ color: "var(--accent)" }}>
          Privacy Policy
        </Link>.
      </p>
      <p>
        <LegalLead>Changes.</LegalLead> We may update these Terms by posting a new version with a
        new effective date.
      </p>
      <p>
        <LegalLead>Governing law.</LegalLead> New Mexico law governs, and disputes go to the state
        or federal courts in New Mexico.
      </p>
      <p>
        <LegalLead>Contact.</LegalLead> hello@strandandstonellc.com
      </p>
    </LegalDocument>
  );
}
