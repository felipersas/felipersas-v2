'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/use-translation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { projects, techStack } from '@/content/projects'
import { skillIcons } from '@/lib/skill-icons'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ProjectsPage() {
  const { t, locale } = useTranslation()
  const [filter, setFilter] = useState<'all' | 'featured' | 'web' | 'api'>('all')

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return project.featured || !project.featured
    if (filter === 'featured') return project.featured
    return project.category === filter
  })

  const statusColors: Record<string, string> = {
    completed: 'bg-success/10 text-success border-success/20',
    inProgress: 'bg-warning/10 text-warning border-warning/20',
    planned: 'bg-muted text-muted-foreground',
  }

  return (
    <div className="min-h-screen py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.projects.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {(['all', 'featured', 'web', 'api'] as const).map((filterValue) => (
            <Button
              key={filterValue}
              onClick={() => setFilter(filterValue)}
              variant={filter === filterValue ? 'default' : 'outline'}
              className={cn(
                "lofi-glow",
                filter === filterValue && "bg-primary text-primary-foreground"
              )}
            >
              {t.projects.filter[filterValue]}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col lofi-glow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl line-clamp-2">
                      {project.title[locale]}
                    </CardTitle>
                    {project.featured && (
                      <Badge variant="secondary" className="shrink-0">
                        ⭐
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description[locale]}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* Tech Stack */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      {t.projects.stack}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => {
                        const IconComponent = skillIcons[tech]
                        return (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs gap-1"
                          >
                            {IconComponent && <IconComponent className="h-3 w-3" />}
                            {tech}
                          </Badge>
                        )
                      })}
                      {project.stack.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.stack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      statusColors[project.status]
                    )}
                  >
                    {t.projects.status[project.status]}
                  </Badge>
                </CardContent>

                <CardFooter className="gap-2 flex-wrap">
                  {project.links.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-w-fit lofi-glow"
                      asChild
                    >
                      <Link
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1"
                      >
                        <Github className="h-4 w-4 shrink-0" />
                        <span className="whitespace-nowrap">{t.common.viewSource}</span>
                      </Link>
                    </Button>
                  )}
                  {project.links.demo && (
                    <Button size="sm" className="flex-1 min-w-fit lofi-glow" asChild>
                      <Link
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        <span className="whitespace-nowrap">{t.common.viewProject}</span>
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* No projects message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-muted-foreground handwritten">
              {locale === 'pt-BR'
                ? 'Nenhum projeto encontrado nesta categoria... por enquanto! 🚀'
                : 'No projects found in this category... yet! 🚀'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
