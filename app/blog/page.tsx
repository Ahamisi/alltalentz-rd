import { client } from '@/lib/sanity/client'
import {
  featuredPostQuery,
  postsQueryDesc,
  postsQueryAsc,
  postCountQuery,
  allCategoriesQuery,
} from '@/lib/sanity/queries'
import type { SanityPost, SanityCategory } from '@/types/blog'
import Header from '@/components/Header'
import MainFooter from '@/components/MainFooter'
import BlogHero from '@/components/blog/BlogHero'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogGrid from '@/components/blog/BlogGrid'

export const revalidate = 60

const POSTS_PER_PAGE = 9

interface SearchParams {
  search?: string
  sort?: string
  category?: string
  page?: string
}

interface BlogPageProps {
  searchParams: Promise<SearchParams>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const search = params.search ?? ''
  const sort = params.sort === 'asc' ? 'asc' : 'desc'
  const category = params.category ?? ''
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const offset = (page - 1) * POSTS_PER_PAGE

  const postsQuery = sort === 'asc' ? postsQueryAsc : postsQueryDesc

  const [featuredPost, posts, totalCount, categories] = await Promise.all([
    client.fetch<SanityPost | null>(featuredPostQuery),
    client.fetch<SanityPost[]>(postsQuery, {
      category,
      search: search ? `${search}*` : '',
      offset,
      limit: offset + POSTS_PER_PAGE,
    }),
    client.fetch<number>(postCountQuery, {
      category,
      search: search ? `${search}*` : '',
    }),
    client.fetch<SanityCategory[]>(allCategoriesQuery),
  ])

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  return (
    <>
      <div className="bg-primary">
        <Header />
        <BlogHero />
      </div>
      <main>
        {featuredPost && !search && !category && page === 1 && (
          <FeaturedPost post={featuredPost} />
        )}
        <BlogGrid
          posts={posts}
          categories={categories}
          search={search}
          sort={sort}
          category={category}
          currentPage={page}
          totalPages={totalPages}
        />
      </main>
      <MainFooter />
    </>
  )
}
