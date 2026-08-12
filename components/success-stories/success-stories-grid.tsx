import { Suspense } from 'react'
import BlogPagination from '@/components/blog/BlogPagination'
import SuccessStoryCard from './success-story-card'
import type { SanitySuccessStory, SuccessStoryCategory } from '@/types/success-story'

interface SuccessStoriesGridProps {
  stories: SanitySuccessStory[]
  categories: SuccessStoryCategory[]
  search: string
  category: string
  currentPage: number
  totalPages: number
}

export default function SuccessStoriesGrid({
  stories,
  categories,
  search,
  category,
  currentPage,
  totalPages,
}: SuccessStoriesGridProps) {
  const heading = search
    ? `Results for "${search}"`
    : category
    ? `${categories.find((c) => c.slug === category)?.title ?? 'Industry'} Stories`
    : null

  return (
    <section className="bg-white px-[24px] py-[56px] md:px-[40px] md:py-[80px]">
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        {heading && (
          <h2 className="mb-[40px] text-[24px] font-semibold tracking-[-2%] text-[#121212] md:text-[30px]">
            {heading}
          </h2>
        )}

        {stories.length > 0 ? (
          <>
            <div className="grid grid-cols-1 items-stretch gap-[24px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[32px]">
              {stories.map((story, i) => (
                <SuccessStoryCard key={story._id} story={story} index={i} />
              ))}
            </div>

            <Suspense>
              <BlogPagination currentPage={currentPage} totalPages={totalPages} />
            </Suspense>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-[96px] text-center">
            <div className="mb-[16px] grid h-[64px] w-[64px] place-items-center rounded-full bg-orange-50">
              <svg
                aria-hidden="true"
                className="h-[28px] w-[28px] text-[#F99621]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-[18px] font-medium text-[#4C4C4C]">No success stories found</p>
            <p className="mt-[4px] text-[14px] text-[#9E9E9E]">
              Try a different search term or industry
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
