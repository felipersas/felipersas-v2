import { ProjectCard } from "@/components/project-card";
import { DATA, localize } from "@/data/resume";
import { getTranslationsServer } from "@/lib/i18n-server";
import { Locale } from "@/hooks/use-translation";

export default async function ProjectsSection({ locale }: { locale: Locale }) {
  const { t } = await getTranslationsServer(locale);
  return (
    <div className="flex flex-col divide-y divide-border/60">
      {DATA.projects.map((project) => (
        <ProjectCard
          href={project.href}
          key={project.title}
          title={project.title}
          description={localize(project.description, locale)}
          dates={localize(project.dates, locale)}
          tags={project.technologies}
          links={project.links}
          className="py-5 first:pt-0 last:pb-0"
        />
      ))}
    </div>
  );
}
