import { cn } from "@/lib/utils"
import { PortfolioHero } from "@/components/sections/portfolio-hero"
import { ProfileHeader } from "@/components/sections/profile-header"
import { Overview } from "@/components/sections/overview"
import { SocialLinks } from "@/components/sections/social-links"
import { Hello } from "@/components/sections/hello"
import { TechStack } from "@/components/sections/tech-stack"
import { Experiences } from "@/components/sections/experiences"
import { Education } from "@/components/sections/education"
import { Projects } from "@/components/sections/projects"
import { Certifications } from "@/components/sections/certifications"
import { ContactFooter } from "@/components/sections/contact-footer"
import { ReadingTeaser } from "@/components/sections/reading-teaser"
import { Locale } from "@/hooks/use-translation"
import { getReadingLinks } from "@/lib/reading-links"

function Separator({ className }: { className?: string }) {
  return (
    <div className={cn("stripe-divider h-8 w-full border-x border-line", className)} />
  )
}

// The reading teaser reads a published Google Sheet, so this page is no longer
// fully static — it regenerates at most once every 10 minutes.
export const revalidate = 600

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const locale = params.locale as Locale
  const { links: readingLinks } = await getReadingLinks()

  return (
    <main className="relative max-w-screen overflow-x-clip [--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
      <PortfolioHero />
      {/* From sm up the artwork is absolutely positioned, so the column starts at
          y=0 and has to clear the fixed header itself. Below sm the artwork is in
          flow and already provides that offset. */}
      <div className="relative z-1 mx-auto max-w-2xl bg-background px-6 pb-28 sm:pt-16">
        <ProfileHeader />
        <Separator />

        <Overview />
        <SocialLinks />
        <Separator />

        <Hello locale={locale} />

        <TechStack />
        <Separator />

        <Experiences locale={locale} />

        <Education locale={locale} />

        <Certifications locale={locale} />
        <Separator />

        <Projects locale={locale} />

        <ReadingTeaser links={readingLinks} locale={locale} />
        <ContactFooter locale={locale} />
      </div>
    </main>
  )
}
