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
import { ArrowUpRight } from "lucide-react"

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

  return (
    <div className="p-4">
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

        <div className="mt-3 flex items-center gap-4">
          {project.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {link.label[locale]}
              <ArrowUpRight className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden />
            </a>
          ))}
        </div>
    </div>
  )
}

export function Projects({ locale }: { locale: Locale }) {
  const sectionTitle = locale === "pt-BR" ? "Projetos" : "Projects"

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
        <div className="border-b border-line md:border-b-0 md:border-r md:border-line">
          <ProjectCard project={featuredProjects[1]} locale={locale} />
        </div>
        <div className="border-b border-line md:border-b-0 last:border-b-0">
          <ProjectCard project={featuredProjects[2]} locale={locale} />
        </div>
      </div>
    </Panel>
  )
}
