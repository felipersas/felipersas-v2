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
    id: 'nestjs-api',
    title: {
      en: 'RESTful API with NestJS',
      'pt-BR': 'API RESTful com NestJS'
    },
    description: {
      en: 'Scalable backend API built with NestJS, TypeScript, and MySQL.',
      'pt-BR': 'API backend escalável construída com NestJS, TypeScript e MySQL.'
    },
    longDescription: {
      en: 'A production-ready RESTful API featuring authentication, data validation, and comprehensive error handling. Built following clean architecture principles.',
      'pt-BR': 'Uma API RESTful pronta para produção com autenticação, validação de dados e tratamento abrangente de erros. Construída seguindo princípios de arquitetura limpa.'
    },
    stack: ['NestJS', 'TypeScript', 'MySQL', 'Prisma ORM', 'Docker', 'Git'],
    links: {
      github: 'https://github.com/felipersas',
    },
    featured: true,
    status: 'completed',
    category: 'api',
    date: '2024-01'
  },
  {
    id: 'nextjs-dashboard',
    title: {
      en: 'Analytics Dashboard',
      'pt-BR': 'Dashboard de Analytics'
    },
    description: {
      en: 'Interactive dashboard with real-time data visualization and authentication.',
      'pt-BR': 'Dashboard interativo com visualização de dados em tempo real e autenticação.'
    },
    longDescription: {
      en: 'A modern analytics dashboard featuring real-time charts, user authentication with NextAuth, and responsive design optimized for all devices.',
      'pt-BR': 'Um dashboard moderno de analytics com gráficos em tempo real, autenticação de usuário com NextAuth e design responsivo otimizado para todos os dispositivos.'
    },
    stack: ['Next.js', 'React.js', 'TanStack Query', 'NextAuth', 'TypeScript', 'Tailwind'],
    links: {
      demo: 'https://github.com/felipersas',
      github: 'https://github.com/felipersas',
    },
    featured: true,
    status: 'completed',
    category: 'web',
    date: '2024-02'
  },
  {
    id: 'automation-workflow',
    title: {
      en: 'n8n Workflow Automation',
      'pt-BR': 'Automação de Workflows n8n'
    },
    description: {
      en: 'Custom n8n workflows automating business processes and data integration.',
      'pt-BR': 'Workflows n8n personalizados automatizando processos de negócios e integração de dados.'
    },
    longDescription: {
      en: 'Automated workflows using n8n to streamline data synchronization between multiple services, reducing manual work by 80%.',
      'pt-BR': 'Workflows automatizados usando n8n para otimizar a sincronização de dados entre múltiplos serviços, reduzindo o trabalho manual em 80%.'
    },
    stack: ['n8n', 'Python', 'REST APIs', 'Webhooks'],
    links: {},
    featured: false,
    status: 'completed',
    category: 'api',
    date: '2024-03'
  },
  {
    id: 'puppeteer-scraper',
    title: {
      en: 'Web Scraper with Puppeteer',
      'pt-BR': 'Web Scraper com Puppeteer'
    },
    description: {
      en: 'Automated web scraping solution for data extraction and monitoring.',
      'pt-BR': 'Solução automatizada de web scraping para extração e monitoramento de dados.'
    },
    longDescription: {
      en: 'Headless browser automation using Puppeteer for reliable data extraction from dynamic websites, with scheduled tasks and data export capabilities.',
      'pt-BR': 'Automação de browser headless usando Puppeteer para extração confiável de dados de sites dinâmicos, com tarefas agendadas e capacidades de exportação de dados.'
    },
    stack: ['Puppeteer', 'Node.js', 'TypeScript', 'Docker'],
    links: {},
    featured: false,
    status: 'inProgress',
    category: 'api',
    date: '2024-04'
  },
  {
    id: 'rust-microservice',
    title: {
      en: 'High-Performance Microservice',
      'pt-BR': 'Microserviço de Alta Performance'
    },
    description: {
      en: 'Rust-based microservice for high-performance data processing.',
      'pt-BR': 'Microserviço em Rust para processamento de dados de alta performance.'
    },
    longDescription: {
      en: 'Exploring Rust for building performant microservices. Features async I/O, memory safety, and seamless integration with existing Node.js services.',
      'pt-BR': 'Explorando Rust para construir microserviços performáticos. Recursos incluem I/O assíncrono, segurança de memória e integração transparente com serviços Node.js existentes.'
    },
    stack: ['Rust', 'Tokio', 'PostgreSQL', 'Docker'],
    links: {},
    featured: true,
    status: 'planned',
    category: 'api',
    date: '2024-05'
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
