/**
 * Projects Data
 * Easy to add, remove, or reorder projects
 */

export interface Project {
  id: string
  title: { en: string; 'pt-BR': string }
  description: { en: string; 'pt-BR': string }
  longDescription?: { en: string; 'pt-BR': string }
  stack: string[]
  image?: string
  links: {
    demo?: string
    github?: string
  }
  featured: boolean
  status: 'completed' | 'inProgress' | 'planned'
  category: 'web' | 'api' | 'mobile'
  date: string
}

export const projects: Project[] = [
  {
    id: 'fasty-orm',
    title: {
      en: 'Fasty-ORM',
      'pt-BR': 'Fasty-ORM'
    },
    description: {
      en: 'High-performance TypeScript ORM powered by a native Rust engine.',
      'pt-BR': 'ORM TypeScript de alta performance com engine nativo em Rust.'
    },
    longDescription: {
      en: 'A type-safe ORM for Node.js featuring a Drizzle-inspired query builder, blazing-fast native caching with TTL, and a robust migration system. The Rust engine provides unmatched performance for query execution.',
      'pt-BR': 'ORM type-safe para Node.js com query builder inspirado no Drizzle, caching nativo ultrarrápido com TTL e sistema robusto de migrações. O engine em Rust oferece performance incomparável para execução de queries.'
    },
    stack: ['TypeScript', 'Rust', 'MySQL', 'Node.js', 'N-API'],
    links: {
      github: 'https://github.com/felipersas/fasty-orm'
    },
    featured: true,
    status: 'inProgress',
    category: 'api',
    date: '2024-12'
  },
]

export const techStack = {
  languages: [
    { id: 'typescript', name: 'TypeScript', icon: '🔷' },
    { id: 'javascript', name: 'JavaScript', icon: '💛' },
    { id: 'rust', name: 'Rust', icon: '🦀' },
    { id: 'python', name: 'Python', icon: '🐍' },
  ],
  frameworks: [
    { id: 'nextjs', name: 'Next.js', icon: '▲' },
    { id: 'nestjs', name: 'NestJS', icon: '🥚' },
    { id: 'react', name: 'React', icon: '⚛️' },
  ],
  databases: [
    { id: 'mysql', name: 'MySQL', icon: '🗄️' },
    { id: 'postgresql', name: 'PostgreSQL', icon: '🐘' },
    { id: 'prisma', name: 'Prisma', icon: '🔮' },
  ],
  tools: [
    { id: 'docker', name: 'Docker', icon: '🐳' },
    { id: 'git', name: 'Git', icon: '📦' },
    { id: 'nextauth', name: 'NextAuth', icon: '🔐' },
  ],
  libraries: [
    { id: 'tanstack', name: 'TanStack', icon: '📊' },
    { id: 'puppeteer', name: 'Puppeteer', icon: '🎭' },
    { id: 'n8n', name: 'n8n', icon: '🔄' },
  ],
}

/**
 * Helper function to get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured)
}

/**
 * Helper function to get projects by category
 */
export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects
  return projects.filter(p => p.category === category)
}

/**
 * Helper function to get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}
