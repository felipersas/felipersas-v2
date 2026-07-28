import { featuredProjects } from "../data/featured-projects";
import type { Locale } from "../hooks/use-translation";
import {
  getPortfolioFacts,
  validatePortfolioGrounding,
  type PortfolioFactTopic,
} from "./portfolio-grounding";

const UI_MARKER = "<!-- portfolio-ui";
const INLINE_FACT_CITATION =
  /\s*\[(?:certification|contact|education|experience|identity|project|skills):[^\]]+\]/giu;
const MAX_EVIDENCE_LINKS = 3;

export type AgentGroundingStatus =
  | "conversational"
  | "grounded"
  | "insufficient"
  | "invalid"
  | "out-of-scope";

type AgentResponseMetadata = {
  factIds?: unknown;
  status?: unknown;
};

export type AgentEvidenceLink = {
  external: boolean;
  href: string;
  key: string;
  label: string;
};

export type ParsedAgentResponse = {
  evidence: AgentEvidenceLink[];
  grounding: {
    factIds: string[];
    reason?:
      | "invalid-metadata"
      | "missing-facts"
      | "unknown-fact"
      | "unsupported-claim";
    status: AgentGroundingStatus;
    valid: boolean;
  };
  suggestions: string[];
  visibleText: string;
};

const portfolioFacts = getPortfolioFacts();
const factsById = new Map(portfolioFacts.map((fact) => [fact.id, fact]));

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

const fallbackText = {
  en: "I can’t verify that answer against the documented portfolio information.",
  "pt-BR":
    "Não consigo confirmar essa resposta com as informações documentadas no portfólio.",
} as const;

const safeTextByStatus = {
  conversational: {
    en: "Hello! I can answer questions about Felipe’s documented experience, projects, skills, and public contact details.",
    "pt-BR":
      "Olá! Posso responder sobre as experiências, projetos, habilidades e contatos públicos documentados do Felipe.",
  },
  insufficient: fallbackText,
  "out-of-scope": {
    en: "I can only help with Felipe’s documented professional portfolio.",
    "pt-BR":
      "Só consigo ajudar com as informações profissionais documentadas no portfólio do Felipe.",
  },
} as const;

const followUpsByTopic: Record<
  PortfolioFactTopic | "default",
  Record<Locale, [string, string]>
> = {
  contact: {
    en: ["Which contact channel is best?", "Can I open the English résumé?"],
    "pt-BR": [
      "Qual canal de contato é mais indicado?",
      "Posso abrir o currículo em português?",
    ],
  },
  education: {
    en: [
      "Which coursework is most relevant?",
      "How does his education support his experience?",
    ],
    "pt-BR": [
      "Quais disciplinas são mais relevantes?",
      "Como a formação complementa a experiência dele?",
    ],
  },
  experience: {
    en: [
      "Which results from this experience stand out?",
      "How does this experience connect to his stack?",
    ],
    "pt-BR": [
      "Quais resultados dessa experiência se destacam?",
      "Como essa experiência se conecta à stack dele?",
    ],
  },
  identity: {
    en: ["What is Felipe working on now?", "Which projects best show his work?"],
    "pt-BR": [
      "Em que o Felipe trabalha atualmente?",
      "Quais projetos mostram melhor o trabalho dele?",
    ],
  },
  projects: {
    en: [
      "Which architectural decisions did this project make?",
      "Where can I see the project evidence?",
    ],
    "pt-BR": [
      "Quais decisões arquiteturais esse projeto tomou?",
      "Onde posso ver as evidências desse projeto?",
    ],
  },
  skills: {
    en: [
      "Where has Felipe applied this stack?",
      "Which projects demonstrate these skills?",
    ],
    "pt-BR": [
      "Onde o Felipe aplicou essa stack?",
      "Quais projetos demonstram essas habilidades?",
    ],
  },
  default: {
    en: [
      "Which experiences are documented?",
      "Which projects can I explore?",
    ],
    "pt-BR": [
      "Quais experiências estão documentadas?",
      "Quais projetos posso explorar?",
    ],
  },
};

export function stripAgentResponseUi(text: string): string {
  const markerIndex = text.lastIndexOf(UI_MARKER);
  return (markerIndex === -1 ? text : text.slice(0, markerIndex)).trimEnd();
}

function stripInlineFactCitations(text: string): string {
  return text.replace(INLINE_FACT_CITATION, "").replace(/[ \t]+\n/g, "\n").trim();
}

function parseFactIds(value: unknown): {
  factIds: string[];
  valid: boolean;
} {
  if (!Array.isArray(value) || value.length > portfolioFacts.length) {
    return { factIds: [], valid: false };
  }

  const unique = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string") {
      return { factIds: [], valid: false };
    }
    const normalized = item.trim();
    if (!normalized || unique.has(normalized)) {
      return { factIds: [], valid: false };
    }
    unique.add(normalized);
  }
  return { factIds: [...unique], valid: true };
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

function isResponseStatus(value: unknown): value is Exclude<
  AgentGroundingStatus,
  "invalid"
> {
  return (
    value === "grounded" ||
    value === "insufficient" ||
    value === "out-of-scope" ||
    value === "conversational"
  );
}

function evidenceForFacts(
  factIds: readonly string[],
  locale: Locale
): AgentEvidenceLink[] {
  const keys = new Set<string>();
  for (const factId of factIds) {
    const evidenceKey = factsById.get(factId)?.evidenceKey;
    if (!evidenceKey) continue;
    keys.add(evidenceKey);
    if (evidenceKey.startsWith("project:")) {
      keys.add(evidenceKey.replace("project:", "code:"));
    }
  }

  const evidence: AgentEvidenceLink[] = [];
  for (const key of keys) {
    const resolved = resolveEvidence(key, locale);
    if (resolved) evidence.push(resolved);
    if (evidence.length === MAX_EVIDENCE_LINKS) break;
  }
  return evidence;
}

export function parseAgentResponse(
  text: string,
  locale: Locale
): ParsedAgentResponse {
  const rawVisibleText = stripInlineFactCitations(stripAgentResponseUi(text));
  const metadata = parseMetadata(text);
  const parsedFactIds = parseFactIds(metadata?.factIds);
  const factIds = parsedFactIds.factIds;

  if (
    !metadata ||
    !isResponseStatus(metadata.status) ||
    !parsedFactIds.valid ||
    (metadata.status !== "grounded" && factIds.length > 0)
  ) {
    return {
      evidence: [],
      grounding: {
        factIds: [],
        reason: "invalid-metadata",
        status: "invalid",
        valid: false,
      },
      suggestions: followUpsByTopic.default[locale],
      visibleText: fallbackText[locale],
    };
  }

  const status = metadata.status;
  if (status === "grounded") {
    const validation = validatePortfolioGrounding(rawVisibleText, factIds);
    if (!validation.valid) {
      return {
        evidence: [],
        grounding: {
          factIds: validation.factIds,
          reason: validation.reason,
          status,
          valid: false,
        },
        suggestions: followUpsByTopic.default[locale],
        visibleText: fallbackText[locale],
      };
    }
  }

  const effectiveFactIds = status === "grounded" ? factIds : [];
  const primaryTopic =
    factsById.get(effectiveFactIds[0])?.topic ?? "default";
  return {
    evidence: evidenceForFacts(effectiveFactIds, locale),
    grounding: {
      factIds: effectiveFactIds,
      status,
      valid: true,
    },
    suggestions: followUpsByTopic[primaryTopic][locale],
    visibleText:
      status === "grounded"
        ? rawVisibleText
        : safeTextByStatus[status][locale],
  };
}
