'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedGradientProps {
  className?: string
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 transition-opacity duration-500",
        prefersReducedMotion ? "opacity-30" : "opacity-60 animated-gradient",
        className
      )}
      style={{
        background: prefersReducedMotion ? undefined : undefined
      }}
      aria-hidden="true"
    />
  )
}
