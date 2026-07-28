import { featuredProjects } from "@/data/featured-projects"
import type { FeaturedProject } from "@/data/featured-projects"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/ui/panel"
import { Tag } from "@/components/ui/tag"
import type { Locale } from "@/hooks/use-translation"
import { ArrowRight, ArrowUpRight, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

const ID = "projects"

function ProjectCard({
  project,
  locale,
}: {
  project: FeaturedProject
  locale: Locale
}) {
  const description = project.description[locale]
  const technicalSummary = project.technicalSummary[locale]
  const evidence = project.evidence?.[locale]
  const agentPrompt =
    locale === "pt-BR"
      ? `Explique o projeto ${project.title}, suas decisões de arquitetura, trade-offs e evidências técnicas.`
      : `Explain the ${project.title} project, its architecture decisions, trade-offs, and technical evidence.`

  return (
    <div className="scroll-mt-24 p-4" id={`project-${project.slug}`}>
        <h3 className="text-base font-medium">{project.title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground/70">
          {technicalSummary}
        </p>

        {evidence && (
          <p className="mt-2 text-xs text-muted-foreground/50 tabular-nums">
            {evidence}
          </p>
        )}

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((tech, i) => (
            <li key={i}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            href={`/${locale}/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            {locale === "pt-BR" ? "Ver case study" : "View case study"}
            <ArrowRight className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5" aria-hidden />
          </a>
          {project.links.map((link, i) => {
            const isExternal = link.href.startsWith("http")
            const href =
              link.href === "/agent" ? `/${locale}/agent` : link.href

            return (
            <a
              key={i}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="group/link inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {link.label[locale]}
              <ArrowUpRight className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
            </a>
            )
          })}
          <a
            href={`/${locale}/agent?prompt=${encodeURIComponent(agentPrompt)}`}
            className="group/link inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            <Bot className="size-3.5" aria-hidden />
            {locale === "pt-BR" ? "Perguntar" : "Ask"}
          </a>
        </div>
    </div>
  )
}

export function Projects({ locale }: { locale: Locale }) {
  const sectionTitle = locale === "pt-BR" ? "Projetos" : "Projects"
  const remainingProjects = featuredProjects.slice(1)
  const finalRowSize = remainingProjects.length % 2 === 0 ? 2 : 1
  const finalRowStart = remainingProjects.length - finalRowSize

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{sectionTitle}</a>
          <PanelTitleSup>({featuredProjects.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="border-b border-line">
        <ProjectCard project={featuredProjects[0]} locale={locale} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {remainingProjects.map((project, index) => (
          <div
            className={cn(
              "border-line",
              index < remainingProjects.length - 1 && "border-b",
              index % 2 === 0 && "md:border-r",
              index >= finalRowStart && "md:border-b-0"
            )}
            key={project.slug}
          >
            <ProjectCard project={project} locale={locale} />
          </div>
        ))}
      </div>
    </Panel>
  )
}
