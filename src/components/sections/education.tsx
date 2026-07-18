import { DATA, localize } from "@/data/resume"
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/components/ui/panel"
import type { Locale } from "@/hooks/use-translation"

const ID = "education"

export function Education({ locale }: { locale: Locale }) {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Education</a>
        </PanelTitle>
      </PanelHeader>

      {DATA.education.map((item, i) => {
        const degree = typeof item.degree === "string" ? item.degree : item.degree[locale]
        const end = typeof item.end === "string" ? item.end : item.end[locale]
        const isOngoing = !item.end || ["present", "presente"].includes(end.toLowerCase())

        return (
          <div
            key={i}
            id={`education-${i}`}
            className="screen-line-bottom scroll-mt-14 p-4 pr-2"
          >
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex size-6 shrink-0 items-center justify-center select-none">
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={`${item.school} logo`}
                    className="size-5 rounded-full "
                    aria-hidden
                  />
                ) : (
                  <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-base font-medium">
                  <a className="link-underline" href={item.href} target="_blank" rel="noopener">
                    {item.school}
                  </a>
                </h3>

                <dl className="flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
                  <dt className="sr-only">Period</dt>
                  <dd className="tabular-nums">{item.start} — {isOngoing ? "Present" : end}</dd>
                </dl>
              </div>
            </div>

            <div className="pl-9 pt-1">
              <p className="text-sm text-muted-foreground">{degree}</p>
              {item.courses && (
                <p className="mt-1 text-xs text-muted-foreground/70">
                  {typeof item.courses === "string" ? item.courses : item.courses[locale]}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </Panel>
  )
}
