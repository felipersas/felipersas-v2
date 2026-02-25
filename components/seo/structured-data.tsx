'use client'

import Script from 'next/script'

interface PersonStructuredData {
  name: string
  jobTitle: string
  description: string
  url: string
  email: string
  github: string
  linkedin: string
  image: string
  sameAs: string[]
  worksFor?: string
  knowsAbout: string[]
}

interface WebSiteStructuredData {
  name: string
  url: string
  description: string
  author: string
  alternateName: string[]
}

interface BreadcrumbStructuredData {
  items: {
    name: string
    url: string
  }[]
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  email,
  github,
  linkedin,
  image,
  sameAs,
  worksFor,
  knowsAbout,
}: PersonStructuredData) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    email,
    image,
    sameAs: [github, linkedin, ...sameAs],
    ...(worksFor && { worksFor }),
    knowsAbout,
  }

  return (
    <Script
      id="structured-data-person"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebSiteStructuredData({
  name,
  url,
  description,
  author,
  alternateName,
}: WebSiteStructuredData) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    alternateName,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Script
      id="structured-data-website"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredData) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="structured-data-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
