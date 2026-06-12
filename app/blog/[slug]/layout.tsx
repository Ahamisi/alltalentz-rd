import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { postBySlugQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import type { SanityPost } from '@/types/blog'

interface LayoutProps {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug })

  if (!post) {
    return {
      title: 'Post Not Found — AllTalentz Blog',
      description: 'The article you are looking for could not be found.',
    }
  }

  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').auto('format').url()
    : '/twitter/twitter-card.png'

  const categoryTags = post.categories?.map((c) => c.title) ?? []

  return {
    title: `${post.title} | AllTalentz Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://alltalentz.com/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      siteName: 'AllTalentz',
      title: post.title,
      description: post.excerpt,
      url: `https://alltalentz.com/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [`https://alltalentz.com/blog?author=${post.author.name}`] : undefined,
      tags: categoryTags.length > 0 ? categoryTags : undefined,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  }
}

export default async function PostLayout({ params, children }: LayoutProps) {
  const { slug } = await params
  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug })

  const articleSchema = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author?.name,
          jobTitle: post.author?.role,
        },
        publisher: {
          '@type': 'Organization',
          name: 'AllTalentz',
          url: 'https://alltalentz.com',
        },
        image: post.mainImage
          ? urlFor(post.mainImage).width(1200).height(630).fit('crop').auto('format').url()
          : '/twitter/twitter-card.png',
        url: `https://alltalentz.com/blog/${slug}`,
      }
    : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://alltalentz.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://alltalentz.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post?.title ?? 'Article',
        item: `https://alltalentz.com/blog/${slug}`,
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
