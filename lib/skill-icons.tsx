import { SiTypescript, SiJavascript, SiRust, SiPython, SiNextdotjs, SiNestjs, SiReact, SiMysql, SiPostgresql, SiPrisma, SiDocker, SiGitlab, SiReactquery, SiPuppeteer, SiNodedotjs, SiTailwindcss } from 'react-icons/si'
import { RiCodeBoxLine } from 'react-icons/ri'

export const skillIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Rust': SiRust,
  'Python': SiPython,
  'Next.js': SiNextdotjs,
  'NestJS': SiNestjs,
  'React.js': SiReact,
  'React': SiReact,
  'MySQL': SiMysql,
  'PostgreSQL': SiPostgresql,
  'Prisma ORM': SiPrisma,
  'Prisma': SiPrisma,
  'Docker': SiDocker,
  'Git': SiGitlab,
  'NextAuth': RiCodeBoxLine,
  'TanStack Query': SiReactquery,
  'TanStack': SiReactquery,
  'Puppeteer': SiPuppeteer,
  'n8n': RiCodeBoxLine,
  'Node.js': SiNodedotjs,
  'Node': SiNodedotjs,
  'Tailwind CSS': SiTailwindcss,
  'Tailwind': SiTailwindcss,
}
