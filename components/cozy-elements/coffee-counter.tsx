'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/use-translation'

const STORAGE_KEY = 'coffee-counter'

export function CoffeeCounter() {
  const { t } = useTranslation()
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? parseInt(saved, 10) : 1
    }
    return 1
  })

  const coffeeLabel = count === 1 ? t.cozy.coffee.singular : t.cozy.coffee.plural

  const [showAnimation, setShowAnimation] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, count.toString())
  }, [count])

  const addCoffee = () => {
    setCount(prev => prev + 1)
    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 600)
  }

  // Auto-increment every 5 minutes for ambient feeling
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const newCount = prev + 1
        localStorage.setItem(STORAGE_KEY, newCount.toString())
        return newCount
      })
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="hidden md:block fixed left-4 bottom-4 z-40"
    >
      <motion.div
        className="group"
        onHoverStart={() => setShowButton(true)}
        onHoverEnd={() => setShowButton(false)}
      >
        {/* Coffee cup with animation */}
        <motion.div
          className={cn(
            "relative bg-background/95 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 shadow-lg",
            "transition-all duration-300"
          )}
          whileHover={{ scale: 1.02 }}
        >
          {/* Steam animation */}
          <AnimatePresence>
            {showAnimation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-1"
              >
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-4 bg-primary/30 rounded-full"
                    animate={{
                      height: [8, 16, 8],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coffee content */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Coffee className="h-6 w-6 text-primary" />
            </motion.div>

            <div className="text-left">
              <p className="text-sm font-medium">
                {count} <span className="text-muted-foreground">{coffeeLabel}</span>
              </p>
            </div>
          </div>

          {/* Add button (appears on hover) */}
          <AnimatePresence>
            {showButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={addCoffee}
                className="absolute -right-2 -bottom-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors"
                aria-label={t.cozy.coffee.add}
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
