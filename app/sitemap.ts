import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/posts";
import { pages } from "@/content/lp/pages";

const BASE = "https://andreantunes.co";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE}/calculadora`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...pages.map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: p.bucket === "easy" ? 0.85 : 0.75,
    })),
  ];
}
