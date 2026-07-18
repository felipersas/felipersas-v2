import { DATA } from "@/data/resume"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/ui/panel"
import { Tag } from "@/components/ui/tag"
import type { Locale } from "@/hooks/use-translation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { LinkIcon } from "lucide-react"

const ID = "projects"

export function Projects({ locale }: { locale: Locale }) {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Projects</a>
          <PanelTitleSup>({DATA.projects.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <ul>
        {DATA.projects.map((project, index) => {
          const description = typeof project.description === "string" ? project.description : project.description[locale]

          return (
            <li key={index} className="border-b border-line last:border-none">
              <div className="group/project flex items-start hover:bg-accent-muted">
                <div className="mx-4 mt-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-line select-none">
                  <span className="text-xs font-medium">{project.title.charAt(0)}</span>
                </div>

                <div className="min-w-0 flex-1 border-l border-dashed border-line py-4 pr-4">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener"
                    className="group/link flex items-center gap-2"
                  >
                    <h3 className="text-sm font-medium">{project.title}</h3>
                    <LinkIcon className="size-3.5 shrink-0 text-muted-foreground opacity-0 group-hover/link:opacity-100 transition-opacity" aria-hidden />
                  </a>

                  {project.dates && (
                    <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                      {typeof project.dates === "string" ? project.dates : project.dates[locale]}
                    </p>
                  )}

                  {description && (
                    <div className="typeset typeset-description mt-3 text-sm leading-relaxed text-muted-foreground [&_p]:mt-0 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:mt-1 [&_ul]:space-y-0.5 [&_li]:mt-0">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {description}
                      </ReactMarkdown>
                    </div>
                  )}

                  {project.technologies && project.technologies.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, i) => (
                        <li key={i} className="flex">
                          <Tag>{tech}</Tag>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}
