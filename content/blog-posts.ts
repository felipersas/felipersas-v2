/**
 * Blog Posts Metadata
 * MDX files should be placed in content/blog/ directory
 *
 * This file now re-exports from lib/mdx.ts for backward compatibility
 */

export type { MDXPost as BlogPost } from '@/lib/mdx'

export {
  getAllPosts,
  getPublishedPosts,
  getPostsByLocale,
  getPostBySlug,
  getRelatedPosts
} from '@/lib/mdx'

// Legacy: Keep the old mock data as reference for creating new MDX files
/*
export interface BlogPost {
  slug: string
  title: { en: string; 'pt-BR': string }
  description: { en: string; 'pt-BR': string }
  date: string
  readTime: number // in minutes
  tags: string[]
  locale: 'en' | 'pt-BR'
  published: boolean
}

Example MDX frontmatter:

---
title: Hello, World!
description: First post introducing myself
date: 2024-01-15
readTime: 3
tags: ['intro', 'welcome']
locale: pt-BR
published: true
---

# Hello, World! 👋

Content goes here...
*/
