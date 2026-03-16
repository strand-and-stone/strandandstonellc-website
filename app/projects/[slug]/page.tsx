import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "../../data/projects";
import ProjectDetail from "../../components/ProjectDetail";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug);
  if (!project) return {};

  const BASE = "https://strandandstonellc.com";
  const url = `${BASE}/projects/${project.slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Strand & Stone LLC`,
      description: project.description,
      url,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Strand & Stone LLC`,
      description: project.description,
      images: ["/og-image.png"],
    },
  };
}

export default function ProjectPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
