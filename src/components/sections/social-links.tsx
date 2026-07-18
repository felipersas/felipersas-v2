"use client"
import { DATA } from "@/data/resume"
import { Panel, PanelContent } from "@/components/ui/panel"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>
      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {Object.entries(DATA.contact.social).map(([name, social]) => {
            const IconComponent = social.icon
            return (
              <li key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener"
                      aria-label={name}
                      className="flex size-9 items-center justify-center rounded-lg border border-line bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <IconComponent className="size-4.5" aria-hidden="true" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </PanelContent>
    </Panel>
  )
}
