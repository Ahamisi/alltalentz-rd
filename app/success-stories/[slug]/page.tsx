import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import {
  successStoryBySlugQuery,
  allSuccessStorySlugsQuery,
  relatedSuccessStoriesQuery,
} from '@/lib/sanity/queries'
import { urlFor, blogImageUrl } from '@/lib/sanity/image'
import type { SanitySuccessStory } from '@/types/success-story'
import SuccessStoryDetail from '@/components/success-stories/success-story-detail'
import RelatedSuccessStories from '@/components/success-stories/related-success-stories'
import ReadyToBuild from '@/components/shared/ReadyToBuild'

export const revalidate = 60

interface StoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allSuccessStorySlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export default async function SuccessStoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const story = await client.fetch<SanitySuccessStory | null>(successStoryBySlugQuery, { slug })

  if (!story) notFound()

  const heroImageUrl = blogImageUrl(story.mainImage, (b) =>
    b.width(1400).height(700).fit('crop').auto('format'),
  )
  const clientLogoUrl = story.clientLogo
    ? urlFor(story.clientLogo).width(120).height(120).fit('max').auto('format').url()
    : null

  const categorySlugList = story.categories?.map((c) => c.slug) ?? []
  const relatedStories =
    categorySlugList.length > 0
      ? await client.fetch<SanitySuccessStory[]>(relatedSuccessStoriesQuery, {
          slug,
          categories: categorySlugList,
        })
      : []

  return (
    <>
      <SuccessStoryDetail
        story={story}
        heroImageUrl={heroImageUrl}
        clientLogoUrl={clientLogoUrl}
      />
      <RelatedSuccessStories stories={relatedStories} />
      <ReadyToBuild />
    </>
  )
}
