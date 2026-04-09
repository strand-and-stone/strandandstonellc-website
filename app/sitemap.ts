import type { MetadataRoute } from "next";
import { projects } from "./data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = "https://strandandstonellc.com";
  const lastModified = new Date();

  const projectPages = projects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/ethos`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...projectPages,
  ];
}
