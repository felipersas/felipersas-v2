'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { Code2, Database, Globe, Wrench } from 'lucide-react'
import { getGreeting } from '@/lib/utils'
import { skillIcons } from '@/lib/skill-icons'

export default function AboutPage() {
  const { t, locale } = useTranslation()

  const skills = [
    {
      category: t.about.skills.backend,
      icon: Database,
      items: ['NestJS', 'Node.js', 'TypeScript', 'MySQL', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Git']
    },
    {
      category: t.about.skills.frontend,
      icon: Globe,
      items: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'NextAuth']
    },
    {
      category: t.about.skills.tools,
      icon: Wrench,
      items: ['Docker', 'Git', 'Puppeteer', 'n8n', 'Rust', 'Python']
    }
  ]

  const timeline = [
    {
      year: '2026',
      title: locale === 'pt-BR' ? 'Desenvolvedor Full Stack' : 'Full Stack Developer',
      description: locale === 'pt-BR'
        ? 'Em constante evolução e aprendizado, buscando sempre aprimorar minhas habilidades e contribuir com projetos inovadores, atualmente focado em estudar tópicos relacionados a Machine Learning e Inteligência Artificial'
        : 'Constantly evolving and learning, always seeking to improve my skills and contribute to innovative projects, currently focused on studying topics related to Machine Learning and Artificial Intelligence',

      icon: '🚀'
    },
    {
      year: '2025',
      title: locale === 'pt-BR' ? 'Desenvolvedor Full Stack' : 'Full Stack Developer',
      description: locale === 'pt-BR'
        ? 'Iniciando oficialmente a carreira como Desenvolvedor Full Stack, aplicando meus conhecimentos em projetos reais e colaborando com equipes de desenvolvimento'
        : 'Starting my career officially as a Full Stack Developer, applying my knowledge to real projects and collaborating with development teams',

      icon: '👨🏻‍💻'
    },
    {
      year: '2024',
      title: locale === 'pt-BR' ? 'Explorando mais a fundo' : 'Exploring More Deeply',
      description: locale === 'pt-BR'
        ? 'Inciando estudos mais aprofundados com foco em Estrutura de Dados, TypeScript, Next.js e NestJS e finalizando meu curso técnico no SENAI'
        : 'Beginning more in-depth studies focusing on Data Structures, TypeScript, Next.js, and NestJS while completing my technical course at SENAI',
      icon: '📚'
    },
    {
      year: '2023',
      title: locale === 'pt-BR' ? 'Iniciando Curso Técnico no SENAI' : 'Initiating Technical Course at SENAI',
      description: locale === 'pt-BR'
        ? 'Iniciando o curso técnico de Desenvolvimento de Sistemas, aprendendo fundamentos de programação e desenvolvimento web'
        : 'Initiating the technical course in Systems Development, learning programming fundamentals and web development',
      icon: '🔧'
    },
    {
      year: '2022',
      title: locale === 'pt-BR' ? 'Início da Jornada' : 'Journey Begins',
      description: locale === 'pt-BR'
        ? 'Começando a entender o básico, pequenos projetos e estudos iniciais, por conta própria'
        : 'Starting to learn the basics, small projects and initial studies, self-taught',
      icon: '🌱'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-10 md:py-20 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground handwritten text-xl mb-4">
              {getGreeting(locale)}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{t.about.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="lofi-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-6 w-6 text-primary" />
                  {locale === 'pt-BR' ? 'Sobre Mim' : 'About Me'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg leading-relaxed">
                <p>{t.about.description}</p>
                <div className="space-y-4 text-muted-foreground">
                  {t.about.text.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            {t.about.skills.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skills.map((skillGroup, index) => {
              const Icon = skillGroup.icon
              return (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="h-full lofi-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Icon className="h-5 w-5 text-primary" />
                        {skillGroup.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => {
                          const IconComponent = skillIcons[skill]
                          return (
                            <Badge key={skill} variant="secondary" className="gap-1">
                              {IconComponent && <IconComponent className="h-3.5 w-3.5" />}
                              {skill}
                            </Badge>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-12"
          >
            {locale === 'pt-BR' ? 'Minha Jornada' : 'My Journey'}
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="lofi-glow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="default">{item.year}</Badge>
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
