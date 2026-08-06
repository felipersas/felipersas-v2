import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/ui/panel"
import type { Locale } from "@/hooks/use-translation"
import { groupLinksByCategory, type ReadingLink } from "@/lib/reading-links"
import { ArrowUpRight } from "lucide-react"

const ID = "reading"

export function ReadingLinkRow({ link }: { link: ReadingLink }) {
  const meta = [link.author, link.source].filter(Boolean).join(" · ")

  return (
    <div>
      <a
        className="group/link inline-flex items-start gap-1 rounded-sm text-sm font-medium leading-relaxed link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        href={link.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {link.title}
        <ArrowUpRight
          aria-hidden
          className="mt-0.5 size-3.5 shrink-0 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
        />
      </a>

      {meta && (
        <p className="mt-1 font-mono text-xs text-muted-foreground/70">{meta}</p>
      )}

      {link.note && (
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {link.note}
        </p>
      )}
    </div>
  )
}

export function Reading({
  links,
  locale,
}: {
  links: ReadingLink[]
  locale: Locale
}) {
  const groups = groupLinksByCategory(links)
  const sectionTitle = locale === "pt-BR" ? "Leituras" : "Reading"

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{sectionTitle}</a>
          <PanelTitleSup>({links.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative [--badge-height:--spacing(6)] [--col-left-width:--spacing(40)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-(--col-left-width) -z-1 w-px bg-[linear-gradient(to_bottom,var(--line)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden"
        />

        {groups.map((group, index) => {
          const categoryId = `${ID}-${group.category.slug}`

          return (
            <div
              className="grid items-start gap-y-3 border-b border-line py-4 last:border-none sm:grid-cols-[var(--col-left-width)_1fr]"
              key={group.category.slug}
            >
              <div
                className="pl-4 text-sm/(--badge-height) text-muted-foreground"
                id={categoryId}
              >
                <span
                  aria-hidden
                  className="mr-1.5 font-mono text-muted-foreground/50 select-none"
                >
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                {group.category.label[locale]}
              </div>

              <ul
                aria-labelledby={categoryId}
                className="flex flex-col gap-4 px-4"
              >
                {group.links.map((link) => (
                  <li key={link.url}>
                    <ReadingLinkRow link={link} />
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
