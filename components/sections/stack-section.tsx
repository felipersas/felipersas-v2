'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { techStack } from '@/content/projects'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const stackColors: Record<string, string> = {
  typescript: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
  javascript: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/20',
  rust: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20',
  python: 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20',
  nextjs: 'bg-gray-900/10 text-gray-900 dark:text-gray-100 border-gray-500/20',
  nestjs: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
  react: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
  mysql: 'bg-blue-600/10 text-blue-800 dark:text-blue-200 border-blue-600/20',
  postgresql: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
  prisma: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
  docker: 'bg-blue-400/10 text-blue-600 dark:text-blue-200 border-blue-400/20',
  git: 'bg-orange-600/10 text-orange-800 dark:text-orange-200 border-orange-600/20',
  nextauth: 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/20',
  tanstack: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
  puppeteer: 'bg-green-600/10 text-green-800 dark:text-green-200 border-green-600/20',
  n8n: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
}

export function StackSection() {
  const { t } = useTranslation()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.stack.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.stack.subtitle}
          </p>
        </motion.div>

        {/* Tech Stack Categories */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(techStack).map(([category, items]) => (
            <motion.div key={category} variants={item} whileHover={{ y: -5 }}>
              <Card className="h-full lofi-glow transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {t.stack.categories[category as keyof typeof t.stack.categories]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-sm py-1 px-3 cursor-pointer",
                            stackColors[item.id] || "border-border"
                          )}
                        >
                          <span className="mr-1">{item.icon}</span>
                          {t.stack.items[item.id as keyof typeof t.stack.items]?.name || item.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
