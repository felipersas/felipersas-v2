import { DATA } from "@/data/resume"
import { Panel, PanelContent } from "@/components/ui/panel"
import { Briefcase, MapPin, Globe, Mail } from "lucide-react"

function IntroItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={`flex items-center gap-4 font-mono text-sm ${className || ""}`} {...props} />
  )
}

function IntroItemIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`flex size-6 shrink-0 items-center justify-center rounded-md border border-muted-foreground/15 bg-muted ring-1 ring-line ring-offset-1 ring-offset-background [&_svg]:pointer-events-none [&_svg]:text-muted-foreground [&_svg:not([class*="size-"])]:size-4 ${className || ""}`}
      {...props}
    />
  )
}

function IntroItemContent({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={`text-balance ${className || ""}`} {...props} />
}

function IntroItemLink({ className, href, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={`link-underline ml-0.5 ${className || ""}`}
      href={href}
      target="_blank"
      rel="noopener"
      {...props}
    >
      {children}
    </a>
  )
}

export function Overview() {
  const currentJob = DATA.work[0]
  const currentPosition = currentJob.positions[0]

  return (
    <Panel className="screen-line-bottom-none">
      <h2 className="sr-only">Overview</h2>
      <PanelContent className="grid gap-x-4 gap-y-2.5 grid-cols-1">
        <IntroItem className="col-span-1">
          <IntroItemContent>
            {currentPosition.title["en"]} <span aria-label="at">@</span>
            <IntroItemLink href={currentJob.href}>
              {currentJob.company}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        <IntroItem>
          <IntroItemContent>
            <IntroItemLink
              href={DATA.locationLink}
              aria-label={`Location: ${DATA.location}`}
            >
              {DATA.location}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        <IntroItem>
          <IntroItemContent>
            <IntroItemLink href={DATA.url}>
              {new URL(DATA.url).hostname}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        <IntroItem>
          <IntroItemContent>
            <IntroItemLink href={`mailto:${DATA.contact.email}`}>
              {DATA.contact.email}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>
      </PanelContent>

      <div className="pointer-events-none absolute top-px bottom-0 left-1/2 -z-1 w-px -translate-x-2.25 bg-[linear-gradient(to_bottom,var(--line)_4px,transparent_2px)] bg-size-[1px_6px] bg-repeat-y max-sm:hidden" />
    </Panel>
  )
}
