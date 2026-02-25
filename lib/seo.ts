import { Metadata } from 'next'

/**
 * SEO Configuration
 * Centralized SEO settings for the portfolio
 */

export const siteConfig = {
  name: 'Felipe Marques',
  title: 'Felipe Marques | Full Stack Developer',
  description: 'Building cozy digital experiences, one commit at a time. Full Stack Developer specializing in Next.js, NestJS, and TypeScript.',
  url: 'https://felipemarques.dev', // Update with your actual domain
  author: 'Felipe Marques',
  email: 'contact@felipemarques.dev', // Update with your actual email
  github: 'https://github.com/felipersas',
  linkedin: 'https://linkedin.com/in/felipersas', // Update with your actual LinkedIn
  ogImage: '/og-image.png', // Create this image
  twitterHandle: '@felipersas', // Update with your actual handle
  locale: 'pt-BR',
  alternateLocale: 'en',
}

/**
 * Default metadata for the portfolio
 */
export function getDefaultMetadata(locale: string = 'pt-BR'): Metadata {
  const isPtBr = locale === 'pt-BR'

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: isPtBr
        ? 'Felipe Marques | Desenvolvedor Full Stack'
        : siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      'Full Stack Developer',
      'Next.js',
      'NestJS',
      'TypeScript',
      'React',
      'Portfolio',
      'Desenvolvedor Web',
      'Web Developer',
      'Frontend',
      'Backend',
    ],
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
    manifest: '/manifest.json', // Create this file
    openGraph: {
      type: 'website',
      locale: isPtBr ? 'pt_BR' : 'en_US',
      alternateLocale: isPtBr ? ['en_US'] : ['pt_BR'],
      url: siteConfig.url,
      title: isPtBr
        ? 'Felipe Marques | Desenvolvedor Full Stack'
        : siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: isPtBr
            ? 'Felipe Marques - Desenvolvedor Full Stack'
            : 'Felipe Marques - Full Stack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isPtBr
        ? 'Felipe Marques | Desenvolvedor Full Stack'
        : siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  }
}

/**
 * Generate page metadata with custom options
 */
export function getPageMetadata({
  title,
  description,
  path,
  images,
  locale = 'pt-BR',
}: {
  title: string
  description: string
  path: string
  images?: string[]
  locale?: string
}): Metadata {
  const defaultMetadata = getDefaultMetadata(locale)
  const isPtBr = locale === 'pt-BR'
  const url = `${siteConfig.url}${path}`

  return {
    ...defaultMetadata,
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `${siteConfig.url}${path.replace('/en', '/pt-BR')}`,
        en: `${siteConfig.url}${path.replace('/pt-BR', '/en')}`,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      url,
      title,
      description,
      images: images?.length
        ? images.map((img) => ({
            url: img,
            width: 1200,
            height: 630,
            alt: title,
          }))
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
      images: images || [siteConfig.ogImage],
    },
  }
}

/**
 * Generate JSON-LD Person data
 */
export function getPersonStructuredData(locale: string = 'pt-BR') {
  const isPtBr = locale === 'pt-BR'

  return {
    name: siteConfig.name,
    jobTitle: isPtBr ? 'Desenvolvedor Full Stack' : 'Full Stack Developer',
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    github: siteConfig.github,
    linkedin: siteConfig.linkedin,
    image: `${siteConfig.url}/avatar.jpg`, // Create this image
    sameAs: [
      siteConfig.github,
      siteConfig.linkedin,
      // Add more social links as needed
    ],
    knowsAbout: [
      'Next.js',
      'React',
      'TypeScript',
      'NestJS',
      'Node.js',
      'Full Stack Development',
      'Web Development',
    ],
  }
}

/**
 * Generate JSON-LD WebSite data
 */
export function getWebSiteStructuredData(locale: string = 'pt-BR') {
  const isPtBr = locale === 'pt-BR'

  return {
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: siteConfig.author,
    alternateName: isPtBr
      ? ['Felipe Marques Portfolio', 'Portfolio Felipe Marques']
      : ['Felipe Marques Portfolio', 'Felipe Marques'],
  }
}

/**
 * Generate breadcrumb list for structured data
 */
export function getBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return items
}
