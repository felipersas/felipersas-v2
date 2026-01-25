import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface MDXPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: number
  tags: string[]
  locale: 'en' | 'pt-BR'
  published: boolean
  content: string
}

/**
 * Get all MDX files from the blog directory
 */
function getMDXFiles() {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR)
  return files.filter(file => file.endsWith('.mdx'))
}

/**
 * Parse frontmatter and content from MDX file
 */
function parseMDXFile(slug: string): MDXPost | null {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      readTime: data.readTime || 5,
      tags: data.tags || [],
      locale: data.locale || 'pt-BR',
      published: data.published !== false,
      content
    }
  } catch (error) {
    console.error(`Error parsing MDX file ${slug}:`, error)
    return null
  }
}

/**
 * Get all blog posts from MDX files
 */
export function getAllPosts(): MDXPost[] {
  const files = getMDXFiles()
  const posts = files
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      return parseMDXFile(slug)
    })
    .filter((post): post is MDXPost => post !== null)

  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get published blog posts
 */
export function getPublishedPosts(): MDXPost[] {
  return getAllPosts().filter(post => post.published)
}

/**
 * Get blog posts by locale
 */
export function getPostsByLocale(locale: 'en' | 'pt-BR'): MDXPost[] {
  return getPublishedPosts().filter(post => post.locale === locale)
}

/**
 * Get blog post by slug
 */
export function getPostBySlug(slug: string): MDXPost | null {
  return parseMDXFile(slug)
}

/**
 * Get related posts by tags
 */
export function getRelatedPosts(slug: string, limit = 3): MDXPost[] {
  const post = getPostBySlug(slug)
  if (!post) return []

  return getAllPosts()
    .filter(p => p.slug !== slug && p.published && p.tags.some(t => post.tags.includes(t)))
    .slice(0, limit)
}
