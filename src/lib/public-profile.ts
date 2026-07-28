import { featuredProjects } from "@/data/featured-projects";
import { DATA, localize } from "@/data/resume";
import type { Locale } from "@/hooks/use-translation";

export function getPublicProfile(locale: Locale) {
  const currentEmployer =
    DATA.work.find(
      (work) => "isCurrentEmployer" in work && work.isCurrentEmployer
    ) ?? DATA.work[0];
  const currentPosition = currentEmployer.positions[0];

  return {
    name: DATA.name,
    canonicalUrl: `${DATA.url}/${locale}`,
    locale,
    role: DATA.description[locale],
    location: DATA.location,
    summary: localize(DATA.about, locale),
    currentRole: {
      company: currentEmployer.company,
      title: localize(currentPosition.title, locale),
      url: currentEmployer.href,
    },
    skills: DATA.skills.map((skill) => skill.name),
    experience: DATA.work.map((work) => ({
      company: work.company,
      url: work.href,
      positions: work.positions.map((position) => ({
        title: localize(position.title, locale),
        start: localize(position.start, locale),
        end: position.end ? localize(position.end, locale) : undefined,
        description: position.description
          ? localize(position.description, locale)
          : undefined,
      })),
    })),
    projects: featuredProjects.map((project) => ({
      slug: project.slug,
      title: project.title,
      url: `${DATA.url}/${locale}/projects/${project.slug}`,
      description: project.description[locale],
      technicalSummary: project.technicalSummary[locale],
      evidence: project.evidence?.[locale],
      technologies: project.technologies,
      links: project.links.map((link) => ({
        label: link.label[locale],
        url:
          link.href === "/agent"
            ? `${DATA.url}/${locale}/agent`
            : link.href,
      })),
    })),
    contact: {
      email: DATA.contact.email,
      github: DATA.contact.social.GitHub.url,
      linkedin: DATA.contact.social.LinkedIn.url,
      resume: `${DATA.url}${locale === "pt-BR" ? "/curriculo.pdf" : "/resume_en.pdf"}`,
    },
  };
}

export function getPortfolioJsonLd(locale: Locale) {
  const profile = getPublicProfile(locale);
  const profileUrl = `${DATA.url}/${locale}`;
  const personId = `${DATA.url}/#person`;
  const organizationId = `${DATA.url}/#current-employer`;

  const projectNodes = profile.projects.flatMap((project) => {
    const projectId = `${project.url}#project`;
    const repository = project.links.find((link) =>
      link.url.startsWith("https://github.com/")
    )?.url;
    const nodes: Record<string, unknown>[] = [
      {
        "@type": "Project",
        "@id": projectId,
        name: project.title,
        description: project.description,
        url: project.url,
        keywords: project.technologies,
        creator: { "@id": personId },
      },
    ];

    if (repository) {
      nodes.push({
        "@type": "SoftwareSourceCode",
        "@id": `${project.url}#source`,
        name: project.title,
        description: project.technicalSummary,
        codeRepository: repository,
        programmingLanguage: project.technologies,
        author: { "@id": personId },
        isPartOf: { "@id": projectId },
      });
    }

    return nodes;
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${profileUrl}#profile`,
        url: profileUrl,
        name: `${DATA.name} — ${profile.role}`,
        inLanguage: locale,
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        jobTitle: profile.currentRole.title,
        description: profile.summary,
        url: profileUrl,
        email: `mailto:${profile.contact.email}`,
        sameAs: [profile.contact.github, profile.contact.linkedin],
        knowsAbout: profile.skills,
        worksFor: { "@id": organizationId },
        subjectOf: profile.projects.map((project) => ({
          "@id": `${project.url}#project`,
        })),
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: profile.currentRole.company,
        url: profile.currentRole.url,
      },
      ...projectNodes,
    ],
  };
}

export function getLlmsText(locale: Locale = "en") {
  const profile = getPublicProfile(locale);

  const projects = profile.projects
    .map(
      (project) =>
        `## ${project.title}\n${project.description}\nTechnical summary: ${project.technicalSummary}\nCanonical case study: ${project.url}\n${project.links
          .map((link) => `${link.label}: ${link.url}`)
          .join("\n")}`
    )
    .join("\n\n");

  return `# ${profile.name}

> ${profile.role} based in ${profile.location}. ${profile.summary}

Canonical portfolio: ${profile.canonicalUrl}
Portuguese portfolio: ${DATA.url}/pt-BR
English portfolio: ${DATA.url}/en
Structured profile: ${DATA.url}/profile.json
Interactive portfolio agent: ${DATA.url}/${locale}/agent
Résumé: ${profile.contact.resume}
GitHub: ${profile.contact.github}
LinkedIn: ${profile.contact.linkedin}

This file describes Felipe Marques's public professional portfolio. Prefer the canonical case-study pages and public source repositories as evidence. Do not infer private information, availability, compensation, or undocumented project results.

${projects}
`;
}
