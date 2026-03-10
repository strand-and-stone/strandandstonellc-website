import type { Metadata } from "next";
import EthosContent from "../components/EthosContent";

export const metadata: Metadata = {
  title: "Ethos",
  description:
    "Strand & Stone LLC was founded in 2013 in a Santa Monica apartment by three friends who believed digital experiences should be as considered and alive as the physical world. Learn our story, values, and the people behind the work.",
  keywords: [
    "Strand and Stone ethos",
    "digital studio about",
    "founding story",
    "Santa Monica studio",
    "digital craftsmanship",
    "about Strand & Stone",
  ],
  alternates: {
    canonical: "https://strandandstonellc.com/ethos",
  },
  openGraph: {
    title: "Ethos — Strand & Stone LLC",
    description:
      "Founded in 2013 in Santa Monica. Three friends, one shared belief: digital experiences should be as considered and alive as the physical world.",
    url: "https://strandandstonellc.com/ethos",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Strand & Stone LLC — Ethos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethos — Strand & Stone LLC",
    description:
      "Founded in 2013 in Santa Monica. Three friends, one shared belief: digital experiences should be as considered and alive as the physical world.",
    images: ["/og-image.png"],
  },
};

export default function EthosPage() {
  return <EthosContent />;
}
