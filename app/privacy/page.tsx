import type { Metadata } from "next";
import LegalDocument, { LegalLead } from "../components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Strand and Stone LLC, a New Mexico limited liability company, operator of strandandstonellc.com.",
  alternates: {
    canonical: "https://strandandstonellc.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy — Strand & Stone LLC",
    description:
      "Privacy Policy for Strand and Stone LLC, operator of strandandstonellc.com.",
    url: "https://strandandstonellc.com/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <LegalDocument kicker="PRIVACY" title="Privacy Policy">
      <p>
        <LegalLead>Effective date:</LegalLead> October 21, 2026
      </p>
      <p>
        Strand and Stone LLC, a New Mexico limited liability company (entity no.
        0008085725) (&quot;we,&quot; &quot;us&quot;), operates strandandstonellc.com (the
        &quot;Site&quot;).
      </p>
      <div className="space-y-4">
        <p>
          <LegalLead>What we collect.</LegalLead>
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <em>Contact form:</em> the email address and message you send us through the
            contact page, delivered to [FORM PROVIDER/INBOX].
          </li>
          <li>
            <em>Server logs:</em> our host, Vercel, automatically records basic request data
            (IP address, browser, page, referrer, time).
          </li>
          <li>
            <em>Analytics cookies:</em> Google Analytics 4 collects pages viewed,
            device/browser type, approximate location and referral source.
          </li>
        </ul>
      </div>
      <p>
        <LegalLead>How we use it.</LegalLead> To reply to you, to run and secure the Site, and
        to understand site traffic.
      </p>
      <p>
        <LegalLead>No sale, no targeted ads.</LegalLead> We do not sell your personal
        information or share it for targeted advertising.
      </p>
      <p>
        <LegalLead>Opt-outs.</LegalLead> We honor Global Privacy Control signals by not loading
        analytics. You can also block cookies in your browser or use Google&apos;s{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          className="nav-link pb-px"
          style={{ color: "var(--accent)" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          opt-out add-on
        </a>.
      </p>
      <p>
        <LegalLead>Retention.</LegalLead> Contact messages are kept as long as needed to handle
        your inquiry and our business records. Analytics data is kept up to 14 months. Host logs
        are kept briefly under Vercel&apos;s own schedule.
      </p>
      <p>
        <LegalLead>Your rights.</LegalLead> US residents of states with privacy laws may ask to
        know, access, correct or delete their personal information, or to opt out. Email
        robert@strandandstonellc.com. We respond within 45 days, and you may appeal a denial by
        replying.
      </p>
      <p>
        <LegalLead>Children.</LegalLead> The Site is not directed to children under 13, and we do
        not knowingly collect their information.
      </p>
      <p>
        <LegalLead>Security.</LegalLead> HTTPS and limited collection. No system is perfectly
        secure.
      </p>
      <p>
        <LegalLead>Changes.</LegalLead> Updates will be posted here with a new effective date.
      </p>
      <p>
        <LegalLead>Contact.</LegalLead> robert@strandandstonellc.com
      </p>
    </LegalDocument>
  );
}
