import { featuredProjects } from "@/data/featured-projects";
import { DATA } from "@/data/resume";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["pt-BR", "en"] as const;
  const lastModified = new Date();

  return locales.flatMap((locale) => [
    {
      url: `${DATA.url}/${locale}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: {
        languages: {
          "pt-BR": `${DATA.url}/pt-BR`,
          en: `${DATA.url}/en`,
        },
      },
    },
    {
      url: `${DATA.url}/${locale}/agent`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${DATA.url}/${locale}/reading`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          "pt-BR": `${DATA.url}/pt-BR/reading`,
          en: `${DATA.url}/en/reading`,
        },
      },
    },
    ...featuredProjects.map((project) => ({
      url: `${DATA.url}/${locale}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.9 : 0.7,
      alternates: {
        languages: {
          "pt-BR": `${DATA.url}/pt-BR/projects/${project.slug}`,
          en: `${DATA.url}/en/projects/${project.slug}`,
        },
      },
    })),
  ]);
}
