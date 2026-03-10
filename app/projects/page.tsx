import type { Metadata } from "next";
import ProjectsContent from "../components/ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A catalogue of digital experiences, web applications, and brand identities crafted by Strand & Stone LLC. Thoughtful work built with precision and intention.",
  keywords: [
    "Strand and Stone projects",
    "digital experience portfolio",
    "web application design",
    "brand identity design",
    "digital studio work",
    "creative technology",
  ],
  alternates: {
    canonical: "https://strandandstonellc.com/projects",
  },
  openGraph: {
    title: "Projects — Strand & Stone LLC",
    description:
      "A catalogue of digital experiences, web applications, and brand identities. Built with precision and intention.",
    url: "https://strandandstonellc.com/projects",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Strand & Stone LLC — Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Strand & Stone LLC",
    description:
      "A catalogue of digital experiences, web applications, and brand identities. Built with precision and intention.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
