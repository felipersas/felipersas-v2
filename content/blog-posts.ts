/**
 * Blog Posts Metadata
 * MDX files should be placed in content/blog/ directory
 */

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

export const blogPosts: BlogPost[] = [
  {
    slug: 'hello-world',
    title: {
      en: 'Hello, World! Welcome to My Blog',
      'pt-BR': 'Olá, Mundo! Bem-vindo ao Meu Blog'
    },
    description: {
      en: 'First post introducing myself and what you can expect from this blog.',
      'pt-BR': 'Primeira postagem me apresentando e o que você pode esperar deste blog.'
    },
    date: '2024-01-15',
    readTime: 3,
    tags: ['intro', 'welcome'],
    locale: 'en',
    published: true
  },
  {
    slug: 'getting-started-with-nextjs',
    title: {
      en: 'Getting Started with Next.js 14',
      'pt-BR': 'Começando com Next.js 14'
    },
    description: {
      en: 'A comprehensive guide to building modern web applications with Next.js.',
      'pt-BR': 'Um guia completo para construir aplicações web modernas com Next.js.'
    },
    date: '2024-02-01',
    readTime: 8,
    tags: ['nextjs', 'tutorial', 'react'],
    locale: 'en',
    published: true
  },
  {
    slug: 'lo-fi-design-principles',
    title: {
      en: 'The Art of Lo-Fi Design: Building Cozy Web Experiences',
      'pt-BR': 'A Arte do Design Lo-Fi: Construindo Experiências Web Aconchegantes'
    },
    description: {
      en: 'Exploring how lo-fi aesthetics can create more comfortable, welcoming digital spaces.',
      'pt-BR': 'Explorando como a estética lo-fi pode criar espaços digitais mais confortáveis e acolhedores.'
    },
    date: '2024-02-15',
    readTime: 6,
    tags: ['design', 'ui/ux', 'lo-fi'],
    locale: 'en',
    published: true
  },
  {
    slug: 'typescript-best-practices',
    title: {
      en: 'TypeScript Best Practices for Better Code',
      'pt-BR': 'Melhores Práticas TypeScript para Código Melhor'
    },
    description: {
      en: 'Essential TypeScript patterns and practices for writing maintainable code.',
      'pt-BR': 'Padrões e práticas essenciais TypeScript para escrever código manutenível.'
    },
    date: '2024-03-01',
    readTime: 7,
    tags: ['typescript', 'best-practices', 'tutorial'],
    locale: 'en',
    published: false // Work in progress
  },
]

/**
 * Get published blog posts
 */
export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published)
}

/**
 * Get blog posts by locale
 */
export function getPostsByLocale(locale: 'en' | 'pt-BR'): BlogPost[] {
  return blogPosts.filter(post => post.locale === locale && post.published)
}

/**
 * Get blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

/**
 * Get related posts by tags
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug)
  if (!post) return []

  return blogPosts
    .filter(p => p.slug !== slug && p.published && p.tags.some(t => post.tags.includes(t)))
    .slice(0, limit)
}
