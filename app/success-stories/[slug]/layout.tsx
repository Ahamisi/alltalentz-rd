import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { successStoryBySlugQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { SanitySuccessStory } from '@/types/success-story'

interface LayoutProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params
  const story = await client.fetch<SanitySuccessStory | null>(successStoryBySlugQuery, { slug })

  if (!story) {
    return {
      title: 'Success Story Not Found — All Talentz',
      description: 'The success story you are looking for could not be found.',
    }
  }

  const ogImage = story.mainImage
    ? urlFor(story.mainImage).width(1200).height(630).fit('crop').auto('format').url()
    : '/twitter/twitter-card.png'

  const industryTags = story.categories?.map((c) => c.title) ?? []

  return {
    title: `${story.title} | All Talentz Success Stories`,
    description: story.excerpt,
    alternates: {
      canonical: `https://alltalentz.com/success-stories/${slug}`,
    },
    openGraph: {
      type: 'article',
      siteName: 'All Talentz',
      title: story.title,
      description: story.excerpt,
      url: `https://alltalentz.com/success-stories/${slug}`,
      publishedTime: story.publishedAt,
      tags: industryTags.length > 0 ? industryTags : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.excerpt,
      images: [ogImage],
    },
  }
}

export default async function SuccessStoryLayout({ params, children }: LayoutProps) {
  const { slug } = await params
  const story = await client.fetch<SanitySuccessStory | null>(successStoryBySlugQuery, { slug })

  const articleSchema = story
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: story.title,
        description: story.excerpt,
        datePublished: story.publishedAt,
        dateModified: story._updatedAt ?? story.publishedAt,
        about: story.clientName
          ? { '@type': 'Organization', name: story.clientName }
          : undefined,
        author: {
          '@type': 'Organization',
          name: 'All Talentz',
          url: 'https://alltalentz.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'All Talentz',
          url: 'https://alltalentz.com',
        },
        image: story.mainImage
          ? urlFor(story.mainImage).width(1200).height(630).fit('crop').auto('format').url()
          : '/twitter/twitter-card.png',
        url: `https://alltalentz.com/success-stories/${slug}`,
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://alltalentz.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Success Stories',
        item: 'https://alltalentz.com/success-stories',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: story?.title ?? 'Success Story',
        item: `https://alltalentz.com/success-stories/${slug}`,
      },
    ],
  }

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
