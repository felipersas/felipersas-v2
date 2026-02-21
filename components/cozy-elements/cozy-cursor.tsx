'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CozyCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Smooth following with spring animation
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Trail effect motion values (slower follow for trailing effect)
  const trailX = useMotionValue(0)
  const trailY = useMotionValue(0)
  const trailSpringConfig = { damping: 40, stiffness: 100 }
  const trailXSpring = useSpring(trailX, trailSpringConfig)
  const trailYSpring = useSpring(trailY, trailSpringConfig)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      // Trail follows with slight delay
      setTimeout(() => {
        trailX.set(e.clientX)
        trailY.set(e.clientY)
      }, 50)
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hover states on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.matches('button, a, [role="button"], input, textarea, select') ||
        !!target.closest('button, a, [role="button"]')

      setIsHovering(isClickable)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY])

  // Hide on touch devices
  const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  if (typeof window === 'undefined' || isTouch || !isVisible) return null

  return (
    <>
      {/* Large outer glow */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
      >
        <motion.div
          animate={{
            scale: isHovering ? 2.5 : 1.5,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          className="w-8 h-8 rounded-full bg-primary/10 blur-md"
        />
      </motion.div>

      {/* Inner cursor dot */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.2 : 1,
            backgroundColor: isHovering ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.8)',
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          className="w-4 h-4 rounded-full"
        />
      </motion.div>

      {/* Subtle trail effect */}
      <motion.div
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
      >
        <motion.div
          animate={{
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
          className="w-6 h-6 rounded-full bg-primary/20 blur-sm"
        />
      </motion.div>
    </>
  )
}
