import type { Locale } from "@/hooks/use-translation"

export type ReadingCategory = {
  slug: string
  label: Readonly<Record<Locale, string>>
}

/**
 * Display order is the array order. This is an array and not a keyed object on
 * purpose: object keys that look like integers get hoisted to the front, so a
 * slug such as "2024" would silently reorder the page.
 */
export const READING_CATEGORIES: readonly ReadingCategory[] = [
  { slug: "frontend", label: { en: "Frontend", "pt-BR": "Frontend" } },
  { slug: "backend", label: { en: "Backend", "pt-BR": "Backend" } },
  { slug: "database", label: { en: "Databases", "pt-BR": "Banco de dados" } },
  { slug: "ai", label: { en: "AI & LLMs", "pt-BR": "IA e LLMs" } },
  {
    slug: "architecture",
    label: { en: "Architecture", "pt-BR": "Arquitetura" },
  },
  { slug: "devops", label: { en: "DevOps & Infra", "pt-BR": "DevOps e Infra" } },
  { slug: "career", label: { en: "Career", "pt-BR": "Carreira" } },
  { slug: "other", label: { en: "Other", "pt-BR": "Outros" } },
] as const

/** Rows whose category is missing or unrecognized land here. */
export const FALLBACK_READING_CATEGORY = "other"
