import { ReadingLinkRow } from "@/components/sections/reading"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/ui/panel"
import type { Locale } from "@/hooks/use-translation"
import type { ReadingLink } from "@/lib/reading-links"
import { ArrowRight } from "lucide-react"

const ID = "reading"
const TEASER_SIZE = 4

export function ReadingTeaser({
  links,
  locale,
}: {
  links: ReadingLink[]
  locale: Locale
}) {
  // Rendering nothing beats an empty panel: a transient failure upstream should
  // make the section disappear, not advertise that there is nothing to read.
  if (links.length === 0) return null

  const isPtBR = locale === "pt-BR"
  const latest = links.slice(0, TEASER_SIZE)

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{isPtBR ? "Leituras" : "Reading"}</a>
          <PanelTitleSup>({links.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <ul>
        {latest.map((link) => (
          <li className="border-b border-line p-4" key={link.url}>
            <ReadingLinkRow link={link} />
          </li>
        ))}
      </ul>

      <div className="p-4">
        <a
          className="group/link inline-flex items-center gap-1 rounded-sm text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          href={`/${locale}/reading`}
        >
          {isPtBR ? "Ver todas as leituras" : "See all reading"}
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5"
          />
        </a>
      </div>
    </Panel>
  )
}
