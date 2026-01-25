'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Clock, Share2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { MDXPost } from '@/lib/mdx'

const mdxComponents = {
  // Custom components can be added here
}

interface BlogPostContentProps {
  post: MDXPost
  relatedPosts: MDXPost[]
}

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const dateFormatted = formatDate(new Date(post.date), post.locale === 'pt-BR' ? 'pt-BR' : 'en-US')

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
              {post.locale === 'pt-BR' ? 'Voltar aos posts' : 'Back to posts'}
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
            <span>{post.readTime} {post.locale === 'pt-BR' ? 'min de leitura' : 'min read'}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
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
            {post.locale === 'pt-BR' ? 'Compartilhar' : 'Share'}
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
              <div className="prose prose-lg max-w-none">
                <MDXRemote
                  source={post.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: []
                    }
                  }}
                />
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
              {post.locale === 'pt-BR' ? 'Artigos Relacionados' : 'Related Articles'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.slug} className="lofi-glow">
                  <CardContent className="p-6">
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                        <Clock className="h-3 w-3" />
                        <time dateTime={relatedPost.date}>
                          {formatDate(new Date(relatedPost.date), relatedPost.locale === 'pt-BR' ? 'pt-BR' : 'en-US')}
                        </time>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </div>
  )
}
