import { Suspense } from 'react'
import type { SanityPost, SanityCategory } from '@/types/blog'
import BlogFilters from './BlogFilters'
import BlogCard from './BlogCard'
import BlogPagination from './BlogPagination'

interface BlogGridProps {
  posts: SanityPost[]
  categories: SanityCategory[]
  search: string
  sort: string
  category: string
  currentPage: number
  totalPages: number
}

export default function BlogGrid({
  posts,
  categories,
  search,
  sort,
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
    <section className="bg-[#f8f8f8] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{heading}</h2>

          <Suspense>
            <BlogFilters
              categories={categories}
              currentSearch={search}
              currentSort={sort}
              currentCategory={category}
            />
          </Suspense>
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
