"use client"

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  BriefcaseBusinessIcon,
  ChevronDownIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  InfinityIcon,
  LightbulbIcon,
} from "lucide-react"

import { DATA, type LocalizedText, localize } from "@/data/resume"
import { cn } from "@/lib/utils"
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/components/ui/panel"
import { Tag } from "@/components/ui/tag"
import type { Locale } from "@/hooks/use-translation"

const ID = "experience"
const MAX = 3

function parseLocalizedDate(str: string): Date {
  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  }
  const parts = str.split(" ")
  if (parts.length === 2 && months[parts[0]?.toLowerCase().slice(0, 3) ?? ""] !== undefined) {
    return new Date(parseInt(parts[1]), months[parts[0].toLowerCase().slice(0, 3)], 1)
  }
  if (parts.length === 1 && /^\d{4}$/.test(str)) {
    return new Date(parseInt(str), 0, 1)
  }
  return new Date(str)
}

function formatDuration(start: string, end?: string): string {
  const startDate = parseLocalizedDate(start)
  const endDate = end ? parseLocalizedDate(end) : new Date()

  const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12
    + endDate.getMonth() - startDate.getMonth() + 1

  if (totalMonths <= 0) return ""

  if (totalMonths < 12) return `${totalMonths}m`

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) return `${years}y`
  return `${years}y ${months}m`
}

function detectPositionIcon(title: string) {
  const lower = title.toLowerCase()
  if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) {
    return <DraftingCompassIcon />
  }
  if (lower.includes("founder") || lower.includes("creator") || lower.includes("owner")) {
    return <LightbulbIcon />
  }
  return <CodeXmlIcon />
}

const SEPARATOR_CLASS = "shrink-0 bg-border data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px"

function PositionSeparator() {
  return <div className={SEPARATOR_CLASS} data-orientation="vertical" />
}

function PositionIconBox({ icon, className }: { icon: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md",
        "bg-muted text-muted-foreground",
        "border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background",
        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
    >
      {icon}
    </div>
  )
}

function PositionDetails({
  position,
  locale,
}: {
  position: typeof DATA.work[number]["positions"][number]
  locale: Locale
}) {
  const [open, setOpen] = useState(false)
  const title = localize(position.title, locale)
  const start = localize(position.start, locale)
  const end = position.end ? localize(position.end, locale) : undefined
  const isOngoing = !end || ["present", "presente"].includes(end.toLowerCase())
  const description = position.description ? localize(position.description, locale) : undefined
  const duration = formatDuration(start, end)
  const hasContent = description || (Array.isArray(position.skills) && position.skills.length > 0)

  return (
    <div className="group/experience-position relative">
      <div className="pointer-events-none absolute bottom-0 left-3 hidden size-4 bg-background group-last/experience-position:flex">
        <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l" />
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={!hasContent}
        className={cn(
          "group block w-full text-left",
          "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out",
          "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
          "data-disabled:before:content-none"
        )}
      >
        <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
          <h4 className="flex-1 font-medium text-balance">{title}</h4>

          {hasContent && (
            <div className="shrink-0 text-muted-foreground [&_svg]:h-lh [&_svg]:w-4">
              <ChevronDownIcon
                className={cn("size-4 transition-transform duration-150", open && "rotate-180")}
              />
            </div>
          )}
        </div>

        <dl className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <div>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </div>
              <PositionSeparator />
            </>
          )}

          <div>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{start}</span>
              <span className="font-mono">—</span>
              {isOngoing ? (
                <InfinityIcon
                  className="size-4.5 translate-y-[0.5px]"
                  aria-label="Present"
                  strokeWidth={1.5}
                />
              ) : (
                <span>{end}</span>
              )}
            </dd>
          </div>

          {duration && (
            <>
              <PositionSeparator />
              <div>
                <dt className="sr-only">Duration</dt>
                <dd className="tabular-nums">{duration}</dd>
              </div>
            </>
          )}
        </dl>
      </button>

      {open && description && (
        <div className="typeset typeset-description pt-3 pb-1 pl-9">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      )}

      {open && Array.isArray(position.skills) && position.skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
          {position.skills.map((skill, index) => (
            <li key={index} className="flex">
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ExperienceItem({
  experience,
  locale,
}: {
  experience: typeof DATA.work[number]
  locale: Locale
}) {
  return (
    <div
      className="group/experience screen-line-bottom scroll-mt-14 space-y-4 py-4"
    >
      <div className="flex items-start gap-3 sm:items-center">
        <div className="flex size-6 shrink-0 items-center justify-center select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
          {experience.logoUrl ? (
            <img
              src={experience.logoUrl}
              alt={`${experience.company} logo`}
              className="size-5 rounded-full transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/experience:grayscale-0"
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-xl/6 font-medium">
            <a
              className="link-underline"
              href={experience.href}
              target="_blank"
              rel="noopener"
            >
              {experience.company}
            </a>
          </h3>

          {experience.location && (
            <dl className="flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap text-muted-foreground">
              <dt className="sr-only">Location</dt>
              <dd className="truncate">
                {typeof experience.location === "string"
                  ? experience.location
                  : localize(experience.location, locale)}
              </dd>

              {experience.locationType && (
                <>
                  <dt className="sr-only">Location type</dt>
                  <dd>({experience.locationType})</dd>
                </>
              )}
            </dl>
          )}
        </div>
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position, idx) => (
          <PositionDetails
            key={idx}
            position={position}
            locale={locale}
          />
        ))}
      </div>
    </div>
  )
}

export function Experiences({ locale }: { locale: Locale }) {
  const [showAll, setShowAll] = useState(false)
  const experiences = showAll ? DATA.work : DATA.work.slice(0, MAX)
  const hasMore = DATA.work.length > MAX

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Experience</a>
        </PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {experiences.map((experience, idx) => (
          <ExperienceItem
            key={idx}
            experience={experience}
            locale={locale}
          />
        ))}
      </div>
    </Panel>
  )
}
