import {
  FALLBACK_READING_CATEGORY,
  READING_CATEGORIES,
  type ReadingCategory,
} from "@/data/reading-categories"

export type ReadingLink = {
  author?: string
  category: string
  date?: string
  note?: string
  /** Hostname without `www.`, derived from the URL rather than typed. */
  source: string
  title: string
  url: string
}

export type ReadingGroup = {
  category: ReadingCategory
  links: ReadingLink[]
}

export type ReadingLinksResult = {
  links: ReadingLink[]
  ok: boolean
}

export const READING_LINKS_TAG = "reading-links"
export const READING_LINKS_REVALIDATE_SECONDS = 600

const FETCH_TIMEOUT_MS = 8_000
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const HIDDEN_VALUES = new Set(["1", "sim", "s", "true", "x", "y", "yes"])

/**
 * Minimal RFC 4180 reader: quoted fields, delimiters and newlines inside
 * quotes, `""` escapes, CRLF, and a leading BOM. Rows where every field is
 * blank are dropped — a published sheet almost always carries a tail of them.
 */
export function parseDelimited(input: string): string[][] {
  const text = input.charCodeAt(0) === 0xfeff ? input.slice(1) : input
  const rows: string[][] = []

  let row: string[] = []
  let field = ""
  let inQuotes = false
  let index = 0

  const endField = () => {
    row.push(field)
    field = ""
  }

  const endRow = () => {
    endField()
    if (row.some((value) => value.trim() !== "")) rows.push(row)
    row = []
  }

  while (index < text.length) {
    const char = text[index]

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          field += '"'
          index += 2
          continue
        }
        inQuotes = false
        index += 1
        continue
      }
      field += char
      index += 1
      continue
    }

    if (char === '"') {
      inQuotes = true
      index += 1
      continue
    }

    if (char === ",") {
      endField()
      index += 1
      continue
    }

    if (char === "\r") {
      endRow()
      index += text[index + 1] === "\n" ? 2 : 1
      continue
    }

    if (char === "\n") {
      endRow()
      index += 1
      continue
    }

    field += char
    index += 1
  }

  if (field !== "" || row.length > 0) endRow()

  return rows
}

/** Hostname without a leading `www.`; empty string when the URL is unusable. */
export function sourceFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

function columnIndex(header: string[], name: string): number {
  return header.findIndex((cell) => cell.trim().toLowerCase() === name)
}

function isPublishableUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}

function normalizeCategory(value: string): string {
  const slug = value.trim().toLowerCase()
  return READING_CATEGORIES.some((category) => category.slug === slug)
    ? slug
    : FALLBACK_READING_CATEGORY
}

/**
 * Maps parsed rows onto links. Column order does not matter — the header is
 * matched by name. Invalid rows are dropped rather than thrown, so one typo in
 * the sheet cannot take the page down. Returns `null` when the header itself is
 * unusable, which is how an HTML error page served with a 200 gets caught.
 */
export function rowsToLinks(rows: string[][]): ReadingLink[] | null {
  const [header, ...body] = rows
  if (!header) return null

  const urlColumn = columnIndex(header, "url")
  const titleColumn = columnIndex(header, "title")
  if (urlColumn === -1 || titleColumn === -1) return null

  const authorColumn = columnIndex(header, "author")
  const categoryColumn = columnIndex(header, "category")
  const noteColumn = columnIndex(header, "note")
  const dateColumn = columnIndex(header, "date")
  const hiddenColumn = columnIndex(header, "hidden")

  const cell = (row: string[], column: number) =>
    column === -1 ? "" : (row[column] ?? "").trim()

  const links: ReadingLink[] = []

  for (const row of body) {
    if (HIDDEN_VALUES.has(cell(row, hiddenColumn).toLowerCase())) continue

    const url = cell(row, urlColumn)
    const title = cell(row, titleColumn)
    if (!title || !isPublishableUrl(url)) continue

    const author = cell(row, authorColumn)
    const note = cell(row, noteColumn)
    const date = cell(row, dateColumn)

    links.push({
      ...(author ? { author } : {}),
      category: normalizeCategory(cell(row, categoryColumn)),
      ...(ISO_DATE.test(date) ? { date } : {}),
      ...(note ? { note } : {}),
      source: sourceFromUrl(url),
      title,
      url,
    })
  }

  return sortLinks(links)
}

/** Newest first; undated entries keep their sheet order at the end. */
export function sortLinks(links: ReadingLink[]): ReadingLink[] {
  return [...links].sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date)
    if (a.date) return -1
    if (b.date) return 1
    return 0
  })
}

/** Only non-empty categories, in `READING_CATEGORIES` order. */
export function groupLinksByCategory(links: ReadingLink[]): ReadingGroup[] {
  return READING_CATEGORIES.map((category) => ({
    category,
    links: links.filter((link) => link.category === category.slug),
  })).filter((group) => group.links.length > 0)
}

/**
 * Reads the published Google Sheet. Never throws: the page renders an explicit
 * failure state instead, and the build cannot break on a third-party outage.
 *
 * The timeout only guards the first fetch — Next strips the signal when it
 * refetches in the background for ISR, so revalidations run untimed.
 */
export async function getReadingLinks(): Promise<ReadingLinksResult> {
  const source = process.env.BLOG_LINKS_CSV_URL?.trim()
  if (!source) return { links: [], ok: false }

  try {
    const response = await fetch(source, {
      next: {
        revalidate: READING_LINKS_REVALIDATE_SECONDS,
        tags: [READING_LINKS_TAG],
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    })

    if (!response.ok) return { links: [], ok: false }

    // An unpublished or rate-limited sheet answers 200 with an HTML page, so
    // `response.ok` alone would read as "the list is simply empty".
    if (!response.headers.get("content-type")?.includes("text/csv")) {
      return { links: [], ok: false }
    }

    const links = rowsToLinks(parseDelimited(await response.text()))
    return links ? { links, ok: true } : { links: [], ok: false }
  } catch {
    return { links: [], ok: false }
  }
}
