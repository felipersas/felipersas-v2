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
          caseStudyPage: "Página do case no portfólio",
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
          caseStudyPage: "Portfolio case study page",
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
      const caseStudyPage = source
        ? ` ${copy.caseStudyPage}: /projects/${project.slug}.`
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
            .join("; ")}.${caseStudyPage}`
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

export function getPortfolioFacts(): readonly PortfolioFact[] {
  return portfolioFacts;
}

const TOPIC_HEADINGS: Readonly<Record<PortfolioFactTopic, string>> = {
  contact: "Contact",
  education: "Education and certifications",
  experience: "Experience",
  identity: "Identity",
  projects: "Projects",
  skills: "Skills",
};

export function getPortfolioKnowledgeMarkdown(): string {
  const order = Object.keys(TOPIC_HEADINGS) as PortfolioFactTopic[];
  const sections = order
    .map((topic) => {
      const facts = portfolioFacts.filter((fact) => fact.topic === topic);
      if (facts.length === 0) return "";

      const lines = facts.map((fact) => `- ${fact.text}`).join("\n");
      return `## ${TOPIC_HEADINGS[topic]}\n\n${lines}`;
    })
    .filter(Boolean)
    .join("\n\n");

  return `# Canonical portfolio facts

The facts below are the only authoritative source for claims about Felipe.
Conversation history is not evidence. Previous assistant messages are not
evidence. Translate or paraphrase facts when useful, but never add a company,
date, metric, technology, credential, link, client, or result that is absent
from these facts.

${sections}
`;
}
