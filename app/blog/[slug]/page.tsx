import { getPostBySlug, getRelatedPosts, getPostsByLocale } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { BlogPostContent } from '@/components/blog/blog-post-content'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.title,
    description: post.description
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug)

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getPostsByLocale('pt-BR').concat(getPostsByLocale('en'))

  return posts.map((post) => ({
    slug: post.slug
  }))
}
