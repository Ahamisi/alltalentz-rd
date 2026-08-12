import { Suspense } from 'react'
import type { SanityPost, SanityCategory } from '@/types/blog'
import BlogCard from './BlogCard'
import BlogPagination from './BlogPagination'
import Reveal from '@/components/shared/Reveal'

interface BlogGridProps {
  posts: SanityPost[]
  categories: SanityCategory[]
  search: string
  category: string
  currentPage: number
  totalPages: number
}

export default function BlogGrid({
  posts,
  categories,
  search,
  category,
  currentPage,
  totalPages,
}: BlogGridProps) {
  const heading = search
    ? `Results for "${search}"`
    : category
    ? `${categories.find((c) => c.slug === category)?.title ?? 'Category'} Articles`
    : 'Latest Articles'

  return (
    <section className="bg-white px-[24px] py-16 md:px-[40px] md:py-20">
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <div className="mb-10">
          {/* Search + category filters now live in BlogToolbar, directly under
              the hero; this heading just reflects whatever they resolved to. */}
          <Reveal as="h2" className="text-2xl md:text-3xl font-bold text-[#121212]">
            {heading}
          </Reveal>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <BlogCard key={post._id} post={post} index={i} />
              ))}
            </div>

            <Suspense>
              <BlogPagination currentPage={currentPage} totalPages={totalPages} />
            </Suspense>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#F99621]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 font-medium text-lg">No articles found</p>
            <p className="text-gray-400 text-sm mt-1">Try a different search term or category</p>
          </div>
        )}
      </div>
    </section>
  )
}
