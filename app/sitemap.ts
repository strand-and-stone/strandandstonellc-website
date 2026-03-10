import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = "https://strandandstonellc.com";
  const lastModified = new Date();

  return [
    {
      url: BASE,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/ethos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/projects`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
