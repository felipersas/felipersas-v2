import { featuredProjects } from "@/data/featured-projects";
import { DATA, localize } from "@/data/resume";
import type { Locale } from "@/hooks/use-translation";
import { getPublicProfile } from "@/lib/public-profile";

export type PortfolioFactTopic =
  | "contact"
  | "education"
  | "experience"
  | "identity"
  | "projects"
  | "skills";

export type PortfolioFact = {
  evidenceKey: string;
  id: string;
  localizedText: Readonly<Record<Locale, string>>;
  text: string;
  topic: PortfolioFactTopic;
};

export type PortfolioGroundingValidation = {
  factIds: string[];
  reason?: "missing-facts" | "unknown-fact" | "unsupported-claim";
  valid: boolean;
};

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, " ").trim();

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type LocalizedPortfolioFact = Omit<PortfolioFact, "localizedText">;

function buildPortfolioFactsForLocale(
  locale: Locale
): readonly LocalizedPortfolioFact[] {
  const profile = getPublicProfile(locale);
  const copy =
    locale === "pt-BR"
      ? {
          approach: "Abordagem",
          challenge: "Desafio",
          contact:
            "Somente dados públicos de contato. O portfólio registra abertura para conversas profissionais, mas não informa tempo de resposta, remuneração, agenda, mudança de cidade ou termos contratuais.",
          coursework: "Disciplinas",
          currentRole: "Cargo atual documentado",
          documentedSkills: "Habilidades técnicas documentadas",
          officialWebsite: "Site oficial",
          outcome: "Resultado",
          present: "atual",
          publicLinks: "Links públicos",
          technologies: "Tecnologias",
        }
      : {
          approach: "Approach",
          challenge: "Challenge",
          contact:
            "Public contact details only. The portfolio documents openness to professional conversations, but does not document response time, compensation, schedule, relocation, or contract terms.",
          coursework: "Coursework",
          currentRole: "Current documented role",
          documentedSkills: "Documented technical skills",
          officialWebsite: "Official website",
          outcome: "Outcome",
          present: "present",
          publicLinks: "Public links",
          technologies: "Technologies",
        };

  const facts: LocalizedPortfolioFact[] = [
    {
      id: "identity:profile",
      topic: "identity",
      evidenceKey: "experience",
      text: normalizeWhitespace(
        `${profile.name}: ${profile.role}. ${profile.location}. ` +
          `${copy.currentRole}: ${profile.currentRole.title}, ${profile.currentRole.company}. ` +
          profile.summary
      ),
    },
    {
      id: "skills:documented",
      topic: "skills",
      evidenceKey: "stack",
      text: `${copy.documentedSkills}: ${profile.skills.join(", ")}.`,
    },
    ...profile.experience.map(
      (experience): LocalizedPortfolioFact => ({
        id: `experience:${slugify(experience.company)}`,
        topic: "experience",
        evidenceKey: "experience",
        text: normalizeWhitespace(
          `${experience.company}. ${experience.positions
            .map(
              (position) =>
                `${position.title}, ${position.start} — ${
                  position.end ?? copy.present
                }. ${
                  position.description ?? ""
                }`
            )
            .join(" ")} ${copy.officialWebsite}: ${experience.url}`
        ),
      })
    ),
    ...DATA.education.map(
      (education, index): LocalizedPortfolioFact => ({
        id: `education:${slugify(education.school)}-${index + 1}`,
        topic: "education",
        evidenceKey: "experience",
        text: normalizeWhitespace(
          `${education.school}: ${localize(education.degree, locale)}, ${
            education.start
          } — ${localize(education.end, locale)}. ${copy.coursework}: ${localize(
            education.courses,
            locale
          )}.`
        ),
      })
    ),
    ...DATA.certifications.map(
      (certification): LocalizedPortfolioFact => ({
        id: `certification:${slugify(
          `${certification.institution}-${certification.name}`
        )}`,
        topic: "education",
        evidenceKey: "experience",
        text: normalizeWhitespace(
          `${certification.institution}: ${certification.name}, ${
            certification.date
          }. Credential ID: ${certification.credentialId}. ${copy.documentedSkills}: ${localize(
            certification.skills,
            locale
          )}.`
        ),
      })
    ),
    ...profile.projects.map((project): LocalizedPortfolioFact => {
      const source = featuredProjects.find(
        (candidate) => candidate.slug === project.slug
      );
      const caseStudy = source
        ? `${copy.challenge}: ${source.caseStudy.challenge[locale]} ${copy.approach}: ${source.caseStudy.approach[locale]} ${copy.outcome}: ${source.caseStudy.outcome[locale]}`
        : "";

      return {
        id: `project:${project.slug}`,
        topic: "projects",
        evidenceKey: `project:${project.slug}`,
        text: normalizeWhitespace(
          `${project.title}. ${project.description} ${project.technicalSummary} ${
            project.evidence ?? ""
          } ${caseStudy} ${copy.technologies}: ${project.technologies.join(
            ", "
          )}. ${copy.publicLinks}: ${project.links
            .map((link) => `${link.label}: ${link.url}`)
            .join("; ")}.`
        ),
      };
    }),
    {
      id: "contact:public",
      topic: "contact",
      evidenceKey: "experience",
      text: normalizeWhitespace(
        `${copy.contact} Email: ${profile.contact.email}. ` +
          `GitHub: ${profile.contact.github}. LinkedIn: ${profile.contact.linkedin}. ` +
          `Currículo/Résumé: ${profile.contact.resume}.`
      ),
    },
  ];

  return Object.freeze(facts.map((fact) => Object.freeze(fact)));
}

const englishFacts = buildPortfolioFactsForLocale("en");
const portugueseFactsById = new Map(
  buildPortfolioFactsForLocale("pt-BR").map((fact) => [fact.id, fact])
);
const portfolioFacts: readonly PortfolioFact[] = Object.freeze(
  englishFacts.map((fact) =>
    Object.freeze({
      ...fact,
      localizedText: Object.freeze({
        en: fact.text,
        "pt-BR": portugueseFactsById.get(fact.id)?.text ?? fact.text,
      }),
    })
  )
);
const factsById = new Map(portfolioFacts.map((fact) => [fact.id, fact]));

export function getPortfolioFacts(): readonly PortfolioFact[] {
  return portfolioFacts;
}

export function getPortfolioKnowledgeMarkdown(): string {
  const facts = portfolioFacts
    .map((fact) => `- [${fact.id}] ${fact.text}`)
    .join("\n");

  return `# Canonical portfolio facts

The facts below are the only authoritative source for claims about Felipe.
Conversation history is not evidence. Previous assistant messages are not
evidence. Translate or paraphrase facts when useful, but never add a company,
date, metric, technology, credential, link, client, or result that is absent
from these facts.

${facts}
`;
}

const protectedClaimPattern =
  /https?:\/\/[^\s)]+|\b\d{4}\b|\b\d+(?:[.,]\d+)?\s*(?:%|\+|ms|milliseconds?|milissegundos?|seconds?|segundos?|s|hours?|horas?|years?|anos?|(?:(?:active|automated|ativos?|automatizados?)\s+)?(?:users?|usuários?|tests?|testes|serviços?|services?)(?:\s+(?:active|automated|ativos?|automatizados?))?)/giu;
const protectedEntityPattern =
  /\b[\p{Lu}][\p{L}\p{N}]*(?:[.+#/-][\p{L}\p{N}]+)*\b/gu;
const safeEntityWords = new Set(
  [
    "a",
    "além",
    "an",
    "as",
    "at",
    "currently",
    "dec",
    "december",
    "dez",
    "dezembro",
    "destaques",
    "ele",
    "em",
    "experience",
    "experiência",
    "felipe",
    "for",
    "he",
    "highlights",
    "his",
    "in",
    "jan",
    "janeiro",
    "january",
    "jun",
    "june",
    "junho",
    "jul",
    "julho",
    "july",
    "na",
    "no",
    "o",
    "os",
    "overall",
    "para",
    "professionally",
    "projects",
    "projetos",
    "seu",
    "sua",
    "the",
    "this",
  ].map((word) => slugify(word))
);

function claimUnit(claim: string): string {
  const unit = claim.replace(/^\d+(?:[.,]\d+)?\s*/, "");
  if (unit.startsWith("%")) return "percent";
  if (unit.startsWith("+")) return "plus";
  if (/^(?:ms|milliseconds?|milissegundos?)\b/.test(unit)) return "ms";
  if (/^(?:seconds?|segundos?|s)\b/.test(unit)) return "seconds";
  if (/^(?:hours?|horas?)\b/.test(unit)) return "hours";
  if (/^(?:years?|anos?)\b/.test(unit)) return "years";
  if (/^(?:users?|usuários?)\b/.test(unit)) return "users";
  if (/^(?:tests?|testes)\b/.test(unit)) return "tests";
  if (/^(?:services?|serviços?)\b/.test(unit)) return "services";
  return "number";
}

function protectedClaims(value: string): string[] {
  return [...value.matchAll(protectedClaimPattern)].map((match) => {
    const claim = match[0].toLowerCase();
    if (claim.startsWith("http")) {
      return claim.replace(/[.,;:]+$/g, "");
    }

    const number =
      claim.match(/\d+(?:[.,]\d+)?/)?.[0].replace(",", ".") ?? claim;
    return `${number}:${claimUnit(claim)}`;
  });
}

function protectedEntities(
  value: string,
  includeSentenceLeads = false
): string[] {
  const normalizedValue = value.replace(/[‐‑‒–—−]/g, "-");
  return [...normalizedValue.matchAll(protectedEntityPattern)]
    .filter((match) => {
      if (includeSentenceLeads) return true;

      const token = match[0];
      const before = normalizedValue.slice(0, match.index).trimEnd();
      const startsSentence =
        before.length === 0 ||
        /[.!?]\s*$/u.test(before) ||
        /(?:^|\n)\s*[-*]\s*$/u.test(before);
      const isOrdinaryCapitalizedWord =
        /^\p{Lu}\p{Ll}+$/u.test(token);
      return !(startsSentence && isOrdinaryCapitalizedWord);
    })
    .map((match) => slugify(match[0]))
    .filter((entity) => entity && !safeEntityWords.has(entity));
}

export function validatePortfolioGrounding(
  answer: string,
  factIds: readonly string[]
): PortfolioGroundingValidation {
  const uniqueFactIds = [...new Set(factIds)];
  if (uniqueFactIds.length === 0) {
    return { factIds: [], valid: false, reason: "missing-facts" };
  }

  const citedFacts = uniqueFactIds.map((id) => factsById.get(id));
  if (citedFacts.some((fact) => fact === undefined)) {
    return {
      factIds: uniqueFactIds.filter((id) => factsById.has(id)),
      valid: false,
      reason: "unknown-fact",
    };
  }

  const sourceClaims = new Set(
    citedFacts.flatMap((fact) =>
      Object.values(fact?.localizedText ?? {}).flatMap(protectedClaims)
    )
  );
  const hasUnsupportedClaim = protectedClaims(answer).some(
    (claim) => !sourceClaims.has(claim)
  );
  const sourceEntities = new Set(
    citedFacts.flatMap((fact) =>
      Object.values(fact?.localizedText ?? {}).flatMap((text) =>
        protectedEntities(text, true)
      )
    )
  );
  const hasUnsupportedEntity = protectedEntities(answer).some(
    (entity) => !sourceEntities.has(entity)
  );

  if (hasUnsupportedClaim || hasUnsupportedEntity) {
    return {
      factIds: uniqueFactIds,
      valid: false,
      reason: "unsupported-claim",
    };
  }

  return { factIds: uniqueFactIds, valid: true };
}
