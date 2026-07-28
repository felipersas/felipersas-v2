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
import { Locale } from "@/hooks/use-translation"

function Separator({ className }: { className?: string }) {
  return (
    <div className={cn("stripe-divider h-8 w-full border-x border-line", className)} />
  )
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const locale = params.locale as Locale

  return (
    <main className="relative max-w-screen overflow-x-clip [--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
      <PortfolioHero />
      <div className="relative z-1 mx-auto max-w-2xl bg-background px-6 sm:pt-4 sm:pb-28">
        <ProfileHeader />
        <Separator />

        <Overview />
        <SocialLinks />
        <Separator />

        <Hello locale={locale} />
        <Separator />

        <TechStack />
        <Separator />

        <Experiences locale={locale} />
        <Separator />

        <Education locale={locale} />
        <Separator />

        <Certifications locale={locale} />
        <Separator />

        <Projects locale={locale} />
      </div>
    </main>
  )
}
