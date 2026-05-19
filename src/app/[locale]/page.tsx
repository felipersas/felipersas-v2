/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { DATA, localize } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight } from "lucide-react";
import { getTranslationsServer } from "@/lib/i18n-server";
import { Locale } from "@/hooks/use-translation";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pt-BR' }];
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const { t } = await getTranslationsServer(locale)
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <h1 className="anim-in anim-d1 text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                {t('hero.greeting')} {DATA.name.split(" ")[0]}
              </h1>
              <p className="anim-in anim-d2 text-muted-foreground max-w-[600px] md:text-lg lg:text-xl">
                {localize(DATA.description, locale)}
              </p>
            </div>
            <div className="anim-in anim-d1 order-1 md:order-2">
              <div className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted overflow-hidden relative flex-shrink-0">
                <Image
                  src={DATA.avatarUrl}
                  alt={`${DATA.name} — Full Stack Developer`}
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-cover rounded-full"
                  priority
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <div className="anim-in anim-d3">
            <h2 className="text-xl font-bold">{t('sections.about')}</h2>
          </div>
          <div className="anim-in anim-d4">
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {localize(DATA.summary, locale)}
              </Markdown>
            </div>
          </div>
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <div className="anim-in anim-d5">
            <h2 className="text-xl font-bold">{t('sections.work')}</h2>
          </div>
          <div className="anim-in anim-d6">
            <WorkSection />
          </div>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <div className="anim-in anim-d7">
            <h2 className="text-xl font-bold">{t('sections.education')}</h2>
          </div>
          <div className="anim-in anim-d8">
            <div className="flex flex-col gap-8">
              {DATA.education.map((education, i) => (
                <Link
                  key={i}
                  href={education.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-x-3 justify-between group"
                >
                  <div className="flex items-start gap-x-3 flex-1 min-w-0">
                    {education.logoUrl ? (
                      <div className="size-8 md:size-10 flex-none relative mt-0.5">
                        <Image
                          src={education.logoUrl}
                          alt={education.school}
                          fill
                          sizes="(max-width: 768px) 32px, 40px"
                          className="p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain"
                        />
                      </div>
                    ) : (
                      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {education.school}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {localize(education.degree, locale)}
                      </div>
                      {"courses" in education && education.courses && (
                        <div className="font-sans text-xs text-muted-foreground/70 mt-1">
                          {localize(education.courses, locale)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none mt-0.5">
                    <span>
                      {localize(education.start, locale)} - {localize(education.end, locale)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="certifications">
        <div className="flex min-h-0 flex-col gap-y-6">
          <h2 className="text-xl font-bold">{t('sections.certifications')}</h2>
          <div className="flex flex-col gap-6">
            {DATA.certifications.map((cert, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold leading-none">{cert.institution}</span>
                    <span className="font-sans text-sm text-muted-foreground">{cert.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs tabular-nums text-muted-foreground flex-none">
                    <span>{localize(cert.date, locale)}</span>
                  </div>
                </div>
                <div className="font-sans text-xs text-muted-foreground/70">
                  {localize(cert.skills, locale)}
                </div>
                {cert.credentialId && (
                  <div className="font-sans text-xs text-muted-foreground/50">
                    Credential ID: {cert.credentialId}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <div className="anim-in anim-d9">
            <h2 className="text-xl font-bold">{t('sections.skills')}</h2>
          </div>
          <div className="anim-in anim-d10">
            <div className="flex flex-wrap gap-2">
              {DATA.skills.map((skill) => (
                <div key={skill.name} className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="anim-in anim-d11">
          <ProjectsSection locale={locale} />
        </div>
      </section>
      <section id="contact">
        <div className="anim-in anim-d13">
          <ContactSection locale={locale} />
        </div>
      </section>
    </main>
  );
}
