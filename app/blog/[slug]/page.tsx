'use client'

import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getPostBySlug, getRelatedPosts } from '@/content/blog-posts'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Clock, Share2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// This would normally be a server component, but for simplicity we're making it client
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { t, locale } = useTranslation()
  const post = getPostBySlug(params.slug)
  const relatedPosts = getRelatedPosts(params.slug)

  if (!post) {
    notFound()
  }

  const dateFormatted = formatDate(new Date(post.date), locale === 'pt-BR' ? 'pt-BR' : 'en-US')

  return (
    <div className="min-h-screen py-20 md:py-32">
      <article className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="lofi-glow">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.blog.backToList}
            </Link>
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <time dateTime={post.date}>{dateFormatted}</time>
            </div>
            <span>•</span>
            <span>{t.blog.readTime.replace('{{min}}', String(post.readTime))}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title[locale]}
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-6">
            {post.description[locale]}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Share Button */}
          <Button variant="outline" size="sm" className="lofi-glow">
            <Share2 className="h-4 w-4 mr-2" />
            {locale === 'pt-BR' ? 'Compartilhar' : 'Share'}
          </Button>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="lofi-glow">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Placeholder content - in production, this would render MDX */}
                <p className="text-lg leading-relaxed text-muted-foreground handwritten">
                  {locale === 'pt-BR'
                    ? '🚧 Este artigo está sendo escrito. O conteúdo completo estará disponível em breve!'
                    : '🚧 This article is being written. Full content coming soon!'
                  }
                </p>

                <p className="mt-6">
                  {locale === 'pt-BR'
                    ? 'Por enquanto, aqui está um esboço do que vou cobrir:'
                    : 'For now, here\'s a rough outline of what I\'ll cover:'
                  }
                </p>

                <ul>
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <p className="mt-6 text-muted-foreground">
                  {locale === 'pt-BR'
                    ? 'Fique tuned para updates! 📝'
                    : 'Stay tuned for updates! 📝'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <h2 className="text-2xl font-bold mb-6">
              {locale === 'pt-BR' ? 'Artigos Relacionados' : 'Related Articles'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="lofi-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {relatedPost.title[locale]}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {relatedPost.description[locale]}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </div>
  )
}
