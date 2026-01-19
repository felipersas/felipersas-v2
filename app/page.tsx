import { HeroSection } from '@/components/sections/hero-section'
import { StackSection } from '@/components/sections/stack-section'
import { ContactSection } from '@/components/sections/contact-section'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Separator />
      <StackSection />
      <Separator />
      <ContactSection />
    </>
  )
}
