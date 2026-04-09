import type { Metadata } from "next";
import ServicesContent from "../components/ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strand & Stone LLC — direction, product and experience design, brand craft, engineering, and ongoing partnership. A boutique digital studio for considered work.",
  keywords: [
    "digital studio services",
    "product design",
    "web development studio",
    "brand design",
    "Strand and Stone services",
  ],
  alternates: {
    canonical: "https://strandandstonellc.com/services",
  },
  openGraph: {
    title: "Services — Strand & Stone LLC",
    description:
      "Creative and technical work for teams who want something considered — direction, product, brand, build, and partnership.",
    url: "https://strandandstonellc.com/services",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Strand & Stone LLC — Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services — Strand & Stone LLC",
    description:
      "Direction, product, brand, engineering, and partnership — boutique studio, one roof.",
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
