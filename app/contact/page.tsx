import type { Metadata } from "next";
import ContactContent from "../components/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Strand & Stone LLC. Whether you have a project in mind or just want to say hello — we'd love to hear from you.",
  alternates: {
    canonical: "https://strandandstonellc.com/contact",
  },
  openGraph: {
    title: "Contact — Strand & Stone LLC",
    description: "Get in touch. hello@strandandstonellc.com",
    url: "https://strandandstonellc.com/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
