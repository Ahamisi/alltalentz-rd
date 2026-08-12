import Link from 'next/link'
import PortableTextRenderer from '@/components/blog/PortableTextRenderer'
import TableOfContents from '@/components/blog/TableOfContents'
import SuccessStoryDetailHero from './success-story-detail-hero'
import type { SanitySuccessStory } from '@/types/success-story'

interface SuccessStoryDetailProps {
  story: SanitySuccessStory
  heroImageUrl: string
  clientLogoUrl: string | null
}

function youTubeId(url: string): string | null {
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/)
  return match && match[2]?.length === 11 ? match[2] : null
}

export default function SuccessStoryDetail({
  story,
  heroImageUrl,
  clientLogoUrl,
}: SuccessStoryDetailProps) {
  const videoId = story.videoUrl ? youTubeId(story.videoUrl) : null
  const testimonial = story.testimonial
  const hasTestimonial = Boolean(testimonial?.quote)

  return (
    <>
      <SuccessStoryDetailHero
        story={story}
        heroImageUrl={heroImageUrl}
        clientLogoUrl={clientLogoUrl}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-16">
        {story.body && (
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <TableOfContents body={story.body} variant="sidebar" />
          </aside>
        )}

        <div className="min-w-0">
          <Link
            href="/success-stories"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-secondary"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to all success stories
          </Link>

          {story.body && (
            <article className="pt-10">
              <TableOfContents body={story.body} variant="collapsible" />
              <PortableTextRenderer value={story.body} />
            </article>
          )}

          {videoId && (
            <div className="mt-12">
              <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                  title={`${story.clientName ?? story.title} video testimonial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          )}

          {hasTestimonial && (
            <figure className="mt-12 rounded-[20px] border-l-4 border-[#F99621] bg-[#FAFAFA] px-[28px] py-[32px]">
              <blockquote className="text-[18px] leading-[1.6] font-normal text-[#121212] md:text-[20px]">
                “{testimonial?.quote}”
              </blockquote>
              {(testimonial?.name || testimonial?.role) && (
                <figcaption className="mt-[20px] text-[15px] text-[#5C5C5C]">
                  {testimonial?.name && (
                    <span className="font-semibold text-[#121212]">{testimonial.name}</span>
                  )}
                  {testimonial?.name && testimonial?.role && ' — '}
                  {testimonial?.role}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </div>
    </>
  )
}
