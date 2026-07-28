import { featuredProjects } from "../data/featured-projects";
import type { Locale } from "../hooks/use-translation";

const UI_MARKER = "<!-- portfolio-ui";
const MAX_SUGGESTION_LENGTH = 180;
const MAX_EVIDENCE_LINKS = 3;

type AgentResponseMetadata = {
  evidence?: unknown;
  suggestions?: unknown;
};

export type AgentEvidenceLink = {
  external: boolean;
  href: string;
  key: string;
  label: string;
};

export type ParsedAgentResponse = {
  evidence: AgentEvidenceLink[];
  suggestions: string[];
  visibleText: string;
};

const sectionEvidence = {
  experience: {
    hash: "experience",
    label: { en: "View experience", "pt-BR": "Ver experiência" },
  },
  projects: {
    hash: "projects",
    label: { en: "View projects", "pt-BR": "Ver projetos" },
  },
  stack: {
    hash: "stack",
    label: { en: "View technical stack", "pt-BR": "Ver stack técnica" },
  },
} as const;

export function stripAgentResponseUi(text: string): string {
  const markerIndex = text.lastIndexOf(UI_MARKER);
  return (markerIndex === -1 ? text : text.slice(0, markerIndex)).trimEnd();
}

function uniqueStrings(value: unknown, limit: number): string[] {
  if (!Array.isArray(value)) return [];

  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") continue;
    const normalized = item.trim().slice(0, MAX_SUGGESTION_LENGTH);
    if (normalized) unique.add(normalized);
    if (unique.size === limit) break;
  }
  return [...unique];
}

function resolveEvidence(
  key: string,
  locale: Locale
): AgentEvidenceLink | undefined {
  if (key in sectionEvidence) {
    const section = sectionEvidence[key as keyof typeof sectionEvidence];
    return {
      external: false,
      href: `/${locale}#${section.hash}`,
      key,
      label: section.label[locale],
    };
  }

  const [kind, slug, ...rest] = key.split(":");
  if (rest.length > 0 || !slug || (kind !== "project" && kind !== "code")) {
    return undefined;
  }

  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) return undefined;

  if (kind === "project") {
    return {
      external: false,
      href: `/${locale}#project-${project.slug}`,
      key,
      label:
        locale === "pt-BR"
          ? `Abrir ${project.title}`
          : `Open ${project.title}`,
    };
  }

  const source = project.links.find((link) =>
    link.href.startsWith("https://github.com/")
  );
  if (!source) return undefined;

  return {
    external: true,
    href: source.href,
    key,
    label: locale === "pt-BR" ? "Ver código" : "View code",
  };
}

function parseMetadata(text: string): AgentResponseMetadata | undefined {
  const markerIndex = text.lastIndexOf(UI_MARKER);
  if (markerIndex === -1) return undefined;

  const metadataComment = text
    .slice(markerIndex)
    .match(/^<!-- portfolio-ui\s+([\s\S]*?)\s*-->/);
  if (!metadataComment) return undefined;

  try {
    const parsed: unknown = JSON.parse(metadataComment[1]);
    return typeof parsed === "object" && parsed !== null
      ? (parsed as AgentResponseMetadata)
      : undefined;
  } catch {
    return undefined;
  }
}

export function parseAgentResponse(
  text: string,
  locale: Locale
): ParsedAgentResponse {
  const metadata = parseMetadata(text);
  const parsedSuggestions = uniqueStrings(metadata?.suggestions, 2);
  const suggestions =
    parsedSuggestions.length === 2 ? parsedSuggestions : [];
  const evidenceKeys = uniqueStrings(
    metadata?.evidence,
    MAX_EVIDENCE_LINKS * 2
  );
  const evidence: AgentEvidenceLink[] = [];

  for (const key of evidenceKeys) {
    const resolved = resolveEvidence(key, locale);
    if (resolved && !evidence.some((item) => item.key === resolved.key)) {
      evidence.push(resolved);
    }
    if (evidence.length === MAX_EVIDENCE_LINKS) break;
  }

  return {
    evidence,
    suggestions,
    visibleText: stripAgentResponseUi(text),
  };
}
