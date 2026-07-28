import { featuredProjects } from "@/data/featured-projects";
import { DATA, localize } from "@/data/resume";
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

function buildPortfolioFacts(): readonly PortfolioFact[] {
  const profile = getPublicProfile("en");

  const facts: PortfolioFact[] = [
    {
      id: "identity:profile",
      topic: "identity",
      evidenceKey: "experience",
      text: normalizeWhitespace(
        `${profile.name} is a ${profile.role} based in ${profile.location}. ` +
          `Current documented role: ${profile.currentRole.title} at ${profile.currentRole.company}. ` +
          profile.summary
      ),
    },
    {
      id: "skills:documented",
      topic: "skills",
      evidenceKey: "stack",
      text: `Documented technical skills: ${profile.skills.join(", ")}.`,
    },
    ...profile.experience.map(
      (experience): PortfolioFact => ({
        id: `experience:${slugify(experience.company)}`,
        topic: "experience",
        evidenceKey: "experience",
        text: normalizeWhitespace(
          `${experience.company}. ${experience.positions
            .map(
              (position) =>
                `${position.title}, ${position.start} to ${position.end ?? "present"}. ${
                  position.description ?? ""
                }`
            )
            .join(" ")} Official website: ${experience.url}`
        ),
      })
    ),
    ...DATA.education.map(
      (education, index): PortfolioFact => ({
        id: `education:${slugify(education.school)}-${index + 1}`,
        topic: "education",
        evidenceKey: "experience",
        text: normalizeWhitespace(
          `${education.school}: ${localize(education.degree, "en")}, ${
            education.start
          } to ${localize(education.end, "en")}. Coursework: ${localize(
            education.courses,
            "en"
          )}.`
        ),
      })
    ),
    ...DATA.certifications.map(
      (certification): PortfolioFact => ({
        id: `certification:${slugify(
          `${certification.institution}-${certification.name}`
        )}`,
        topic: "education",
        evidenceKey: "experience",
        text: normalizeWhitespace(
          `${certification.institution}: ${certification.name}, ${
            certification.date
          }. Credential ID: ${certification.credentialId}. Documented topics: ${localize(
            certification.skills,
            "en"
          )}.`
        ),
      })
    ),
    ...profile.projects.map((project): PortfolioFact => {
      const source = featuredProjects.find(
        (candidate) => candidate.slug === project.slug
      );
      const caseStudy = source
        ? `Challenge: ${source.caseStudy.challenge.en} Approach: ${source.caseStudy.approach.en} Outcome: ${source.caseStudy.outcome.en}`
        : "";

      return {
        id: `project:${project.slug}`,
        topic: "projects",
        evidenceKey: `project:${project.slug}`,
        text: normalizeWhitespace(
          `${project.title}. ${project.description} ${project.technicalSummary} ${
            project.evidence ?? ""
          } ${caseStudy} Technologies: ${project.technologies.join(
            ", "
          )}. Public links: ${project.links
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
        `Public contact details only. Email: ${profile.contact.email}. ` +
          `GitHub: ${profile.contact.github}. LinkedIn: ${profile.contact.linkedin}. ` +
          `Résumé: ${profile.contact.resume}. The portfolio documents openness to professional conversations, but does not document response time, compensation, schedule, relocation, or contract terms.`
      ),
    },
  ];

  return Object.freeze(facts.map((fact) => Object.freeze(fact)));
}

const portfolioFacts = buildPortfolioFacts();
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
  /https?:\/\/[^\s)]+|\b\d{4}\b|\b\d+(?:[.,]\d+)?\s*(?:%|\+|ms|milliseconds?|milissegundos?|seconds?|segundos?|s|hours?|horas?|(?:(?:active|automated)\s+)?users?|usuários?|(?:(?:active|automated)\s+)?tests?|testes|serviços?|services?)/giu;

function protectedClaims(value: string): string[] {
  return [...value.matchAll(protectedClaimPattern)].map((match) => {
    const claim = match[0].toLowerCase();
    if (claim.startsWith("http")) {
      return claim.replace(/[.,;:]+$/g, "");
    }

    return (
      claim.match(/\d+(?:[.,]\d+)?/)?.[0].replace(",", ".") ?? claim
    );
  });
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
    citedFacts.flatMap((fact) => protectedClaims(fact?.text ?? ""))
  );
  const hasUnsupportedClaim = protectedClaims(answer).some(
    (claim) => !sourceClaims.has(claim)
  );

  if (hasUnsupportedClaim) {
    return {
      factIds: uniqueFactIds,
      valid: false,
      reason: "unsupported-claim",
    };
  }

  return { factIds: uniqueFactIds, valid: true };
}
