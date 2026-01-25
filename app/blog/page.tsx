'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getPostsByLocale } from '@/content/blog-posts'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { ArrowRight, Clock } from 'lucide-react'

export default function BlogPage() {
  const { t, locale } = useTranslation()
  const posts = getPostsByLocale(locale as 'en' | 'pt-BR')

  // Sample blog post cards (since we don't have actual MDX files yet)
  const samplePosts = posts.map(post => ({
    ...post,
    excerpt: post.description[locale],
    dateFormatted: formatDate(new Date(post.date), locale === 'pt-BR' ? 'pt-BR' : 'en-US')
  }))

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.blog.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {samplePosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {samplePosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full flex flex-col lofi-glow">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {post.dateFormatted}
                      </time>
                      <span>•</span>
                      <span>{t.blog.readTime.replace('{{min}}', String(post.readTime))}</span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title[locale]}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" asChild className="lofi-glow">
                        <Link href={`/blog/${post.slug}`}>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 max-w-2xl mx-auto"
          >
            <Card className="lofi-glow">
              <CardContent className="pt-6">
                <p className="text-xl text-muted-foreground handwritten">
                  {t.blog.noPosts}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {locale === 'pt-BR'
                    ? 'Estou trabalhando em alguns artigos interessantes. Fique tuned! ✍️'
                    : 'I\'m working on some interesting articles. Stay tuned! ✍️'
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Call to Action */}
        {samplePosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground handwritten text-xl">
              {locale === 'pt-BR'
                ? 'Mais artigos chegando em breve... 📝'
                : 'More articles coming soon... 📝'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
