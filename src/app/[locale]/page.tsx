
import Image from "next/image";
import { DATA, localize } from "@/data/resume";
import Link from "next/link";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { TuiPanel } from "@/components/tui-panel";
import { ArrowUpRight } from "lucide-react";
import { getTranslationsServer } from "@/lib/i18n-server";
import { Locale } from "@/hooks/use-translation";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pt-BR' }];
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const { t } = await getTranslationsServer(locale);
  return (
    <main className="min-h-dvh flex flex-col gap-6 relative">
      <section id="hero" className="anim-in anim-d1">
        <div className="w-full flex flex-col md:flex-row gap-6 justify-between items-start">
          <div>
            <div className="size-24 md:size-32 border border-border rounded-md overflow-hidden relative flex-shrink-0">
              <Image
                src={DATA.avatarUrl}
                alt={`${DATA.name} — Full Stack Developer`}
                fill
                sizes="(max-width: 768px) 96px, 128px"
                className="object-cover"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
          <div className="gap-2 flex flex-col flex-1 min-w-0">
            <div className="font-mono text-xs text-muted-foreground/70">$ felipe@portfolio:~$ whoami</div>
            <h1 className="font-mono text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
              {t('hero.greeting')} {DATA.name.split(" ")[0]}<span className="tui-cursor" aria-hidden="true" />
            </h1>
          </div>
        </div>
      </section>

      <TuiPanel id="about" title={t('sections.about')} className="anim-in anim-d3">
        <div className="font-mono text-sm">
          <div className="text-muted-foreground mb-3">
            <span className="text-accent">$</span> whoami
          </div>
          <div className="space-y-1.5">
            {DATA.whoami.map((entry) => (
              <div key={entry.key} className="flex gap-3 items-baseline">
                <span className="text-accent shrink-0 min-w-[80px]">{entry.key}:</span>
                <span className="text-foreground/90">{localize(entry.value, locale)}</span>
              </div>
            ))}
          </div>
        </div>
      </TuiPanel>

      <TuiPanel id="work" title={t('sections.work')} className="anim-in anim-d5">
        <WorkSection />
      </TuiPanel>

      <TuiPanel id="education" title={t('sections.education')} className="anim-in anim-d7">
        <div className="font-mono text-sm space-y-2">
          {DATA.education.map((education, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <div key={i} className="flex gap-3">
                <span className="text-muted-foreground/50 select-none shrink-0">{isLast ? "└──" : "├──"}</span>
                <Link
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-0 group"
                >
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold group-hover:text-accent transition-colors">{education.school}</span>
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-accent transition-all duration-200" aria-hidden />
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {localize(education.start, locale)} - {localize(education.end, locale)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{localize(education.degree, locale)}</div>
                  {"courses" in education && education.courses && (
                    <div className="text-xs text-muted-foreground/70 mt-0.5">
                      <span className="text-accent">{"//"}</span> {localize(education.courses, locale)}
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </TuiPanel>

      <TuiPanel id="certifications" title={t('sections.certifications')} className="anim-in anim-d8">
        <div className="font-mono text-sm space-y-2">
          {DATA.certifications.map((cert, i, arr) => {
            const isLast = i === arr.length - 1;
            return (
              <div key={i} className="flex gap-3">
                <span className="text-muted-foreground/50 select-none shrink-0">{isLast ? "└──" : "├──"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <div>
                      <span className="font-semibold">{cert.institution}</span>
                      <span className="text-sm text-muted-foreground ml-2">{cert.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">{localize(cert.date, locale)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground/70 mt-0.5">
                    <span className="text-accent">{"//"}</span> {localize(cert.skills, locale)}
                  </div>
                  {cert.credentialId && (
                    <div className="text-xs text-muted-foreground/50">
                      <span className="text-accent">credential:</span> {cert.credentialId}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </TuiPanel>

      <TuiPanel id="skills" title={t('sections.skills')} className="anim-in anim-d9">
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {DATA.skills.map((skill) => (
            <div key={skill.name} className="font-mono text-sm flex items-center gap-1.5 text-foreground/90">
              <span className="text-accent">[</span>
              {skill.icon && <skill.icon className="size-3.5 overflow-hidden object-contain" />}
              <span>{skill.name}</span>
              <span className="text-accent">]</span>
            </div>
          ))}
        </div>
      </TuiPanel>

      <TuiPanel id="projects" title={t('projects.title')} className="anim-in anim-d11">
        <ProjectsSection locale={locale} />
      </TuiPanel>

      <TuiPanel id="contact" title={t('contact.badge')} className="anim-in anim-d13">
        <ContactSection locale={locale} />
      </TuiPanel>
    </main>
  );
}
