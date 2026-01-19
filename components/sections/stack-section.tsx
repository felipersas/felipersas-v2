'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { techStack } from '@/content/projects'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const stackColors: Record<string, string> = {
  typescript: 'bg-primary/10 text-primary border-primary/20',
  javascript: 'bg-primary/10 text-primary border-primary/20',
  rust: 'bg-accent/10 text-accent border-accent/20',
  python: 'bg-muted/20 text-secondary border-muted/30',
  nextjs: 'bg-primary/15 text-primary border-primary/25',
  nestjs: 'bg-destructive/10 text-destructive border-destructive/20',
  react: 'bg-primary/10 text-primary border-primary/20',
  mysql: 'bg-muted/20 text-secondary border-muted/30',
  postgresql: 'bg-muted/20 text-secondary border-muted/30',
  prisma: 'bg-primary/10 text-primary border-primary/20',
  docker: 'bg-muted/20 text-secondary border-muted/30',
  git: 'bg-accent/10 text-accent border-accent/20',
  nextauth: 'bg-destructive/10 text-destructive border-destructive/20',
  tanstack: 'bg-muted/20 text-secondary border-muted/30',
  puppeteer: 'bg-accent/10 text-accent border-accent/20',
  n8n: 'bg-destructive/10 text-destructive border-destructive/20',
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
