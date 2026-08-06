import { Tag } from "@/components/ui/tag";
import { DATA } from "@/data/resume";
import { featuredProjects } from "@/data/featured-projects";
import type { Locale } from "@/hooks/use-translation";
import { ArrowLeft, Bot, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function getProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return featuredProjects.flatMap((project) =>
    ["en", "pt-BR"].map((locale) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata(
  props: ProjectPageProps
): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  const currentLocale = locale === "pt-BR" ? "pt-BR" : "en";
  const title = `${project.title} — Case Study`;
  const description = project.description[currentLocale];
  const url = `${DATA.url}/${currentLocale}/projects/${project.slug}`;

  return {
    metadataBase: new URL(DATA.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${DATA.url}/pt-BR/projects/${project.slug}`,
        en: `${DATA.url}/en/projects/${project.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectPage(props: ProjectPageProps) {
  const { locale: localeParam, slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const locale: Locale = localeParam === "pt-BR" ? "pt-BR" : "en";
  const isPtBR = locale === "pt-BR";
  const agentPrompt = isPtBR
    ? `Quero aprofundar o case study do ${project.title}. Explique as decisões de arquitetura, os principais trade-offs e as evidências técnicas.`
    : `I want to explore the ${project.title} case study. Explain its architecture decisions, main trade-offs, and technical evidence.`;

  const sections = [
    {
      title: isPtBR ? "Desafio" : "Challenge",
      content: project.caseStudy.challenge[locale],
    },
    {
      title: isPtBR ? "Abordagem" : "Approach",
      content: project.caseStudy.approach[locale],
    },
    {
      title: isPtBR ? "Resultado" : "Outcome",
      content: project.caseStudy.outcome[locale],
    },
  ];

  return (
    <main className="min-h-screen pt-12 pb-28">
      <article className="mx-auto max-w-2xl border-x border-line bg-background">
        <header className="border-b border-line px-5 py-8 sm:px-8 sm:py-12">
          <a
            className="link-underline inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            href={`/${locale}#project-${project.slug}`}
          >
            <ArrowLeft className="size-4" aria-hidden />
            {isPtBR ? "Voltar ao portfólio" : "Back to portfolio"}
          </a>

          <h1 className="mt-8 text-balance text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.description[locale]}
          </p>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Tag>{technology}</Tag>
              </li>
            ))}
          </ul>
        </header>

        <div>
          {sections.map((section) => (
            <section
              className="grid gap-3 border-b border-line px-5 py-7 sm:grid-cols-[9rem_1fr] sm:px-8 sm:py-9"
              key={section.title}
            >
              <h2 className="text-sm font-medium text-muted-foreground">
                {section.title}
              </h2>
              <p className="text-pretty leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

        {project.evidence && (
          <section className="border-b border-line px-5 py-7 sm:px-8">
            <h2 className="text-sm font-medium text-muted-foreground">
              {isPtBR ? "Evidência principal" : "Key evidence"}
            </h2>
            <p className="mt-2 font-mono text-sm">{project.evidence[locale]}</p>
          </section>
        )}

        <footer className="px-5 py-8 sm:px-8 sm:py-10">
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
            {project.links.map((link) => {
              const href =
                link.href === "/agent" ? `/${locale}/agent` : link.href;
              return (
                <a
                  className="link-underline inline-flex items-center gap-1.5"
                  href={href}
                  key={link.href}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  target={href.startsWith("http") ? "_blank" : undefined}
                >
                  {link.label[locale]}
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              );
            })}
            <a
              className="link-underline inline-flex items-center gap-1.5"
              href={`/${locale}/agent?prompt=${encodeURIComponent(agentPrompt)}`}
            >
              <Bot className="size-4" aria-hidden />
              {isPtBR ? "Perguntar sobre este projeto" : "Ask about this project"}
            </a>
          </div>
        </footer>
      </article>
    </main>
  );
}
