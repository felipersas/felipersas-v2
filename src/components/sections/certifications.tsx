import { DATA, localize } from "@/data/resume"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/components/ui/panel"
import type { Locale } from "@/hooks/use-translation"

const ID = "certifications"

export function Certifications({ locale }: { locale: Locale }) {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Certifications</a>
          <PanelTitleSup>({DATA.certifications.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      {DATA.certifications.map((cert, i) => {
        const skills = typeof cert.skills === "string" ? cert.skills : cert.skills[locale]

        return (
          <div
            key={i}
            className="screen-line-bottom scroll-mt-14 flex items-start gap-3 p-4 pr-2"
          >
            <div className="flex size-6 shrink-0 items-center justify-center select-none">
              <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-medium">{cert.institution}</h3>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{cert.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{cert.name}</p>
              {cert.credentialId && (
                <p className="text-xs text-muted-foreground/50 mt-0.5">
                  Credential: {cert.credentialId}
                </p>
              )}
              {skills && (
                <p className="text-xs text-muted-foreground/70 mt-1">{skills}</p>
              )}
            </div>
          </div>
        )
      })}
    </Panel>
  )
}
