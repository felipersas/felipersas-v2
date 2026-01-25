'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'
import { AvatarScene } from '@/components/3d/avatar-scene'
import { FloatingParticles } from '@/components/animations/floating-particles'
import { AnimatedGradient } from '@/components/animations/animated-gradient'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getGreeting } from '@/lib/utils'

export function HeroSection() {
  const { t, locale } = useTranslation()

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <AnimatedGradient />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/40 -z-10" />

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Time-based greeting */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base md:text-lg text-muted-foreground handwritten text-lg md:text-xl"
            >
              {getGreeting(locale)}
            </motion.p>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
            >
              {t.hero.greeting}{' '}
              <span className="text-primary handwritten">{t.hero.name}</span>
            </motion.h1>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl text-muted-foreground"
            >
              {t.hero.role}
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0"
            >
              {t.hero.tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="lofi-glow">
                  <Link href="/projects">
                    {t.hero.cta.projects}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="outline" size="lg" className="lofi-glow">
                  <Link href="/about">{t.hero.cta.contact}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3D Avatar Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative order-1 lg:order-2"
          >
            <AvatarScene />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
