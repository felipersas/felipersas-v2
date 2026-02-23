import { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { getPublishedPosts } from '@/content/blog-posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://felipersas-dev.vercel.app' // Update with your actual domain
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.date ? new Date(project.date).toISOString() : currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Blog post pages
  const blogPosts = getPublishedPosts()
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}
