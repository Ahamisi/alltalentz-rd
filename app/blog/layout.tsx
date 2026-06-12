import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Insights — Remote Work, Talent & Africa | AllTalentz',
  description:
    'Explore the latest articles, industry insights, and remote work trends from the AllTalentz team. Expert perspectives on talent acquisition, outsourcing, and the future of work in Africa.',
  alternates: {
    canonical: 'https://alltalentz.com/blog',
  },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Blog & Insights — Remote Work, Talent & Africa | AllTalentz',
    description:
      'Explore the latest articles, industry insights, and remote work trends from the AllTalentz team. Expert perspectives on talent acquisition, outsourcing, and the future of work in Africa.',
    url: 'https://alltalentz.com/blog',
    images: [
      {
        url: '/twitter/twitter-card.png',
        width: 1200,
        height: 630,
        alt: 'AllTalentz Blog & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog & Insights — Remote Work, Talent & Africa | AllTalentz',
    description:
      'Expert perspectives on talent acquisition, remote work, and the future of work in Africa.',
    images: ['/twitter/twitter-card.png'],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://alltalentz.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://alltalentz.com/blog',
    },
  ],
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
