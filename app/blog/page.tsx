import { getPostsByLocale } from '@/lib/mdx'
import { BlogPostsList } from './blog-posts-list'

export default function BlogPage() {
  // Get posts for both locales
  const postsPtBr = getPostsByLocale('pt-BR')
  const postsEn = getPostsByLocale('en')

  return <BlogPostsList postsPtBr={postsPtBr} postsEn={postsEn} />
}
