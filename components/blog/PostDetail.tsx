import Image from 'next/image'
import Link from 'next/link'
import type { SanityPost } from '@/types/blog'
import PortableTextRenderer from './PortableTextRenderer'
import PostDetailHero from './PostDetailHero'
import TableOfContents from './TableOfContents'

interface PostDetailProps {
  post: SanityPost
  heroImageUrl: string
  authorImageUrl: string | null
}

export default function PostDetail({ post, heroImageUrl, authorImageUrl }: PostDetailProps) {
  return (
    <>
      <PostDetailHero post={post} heroImageUrl={heroImageUrl} />

      {/* Wide reading column, with a sticky table-of-contents rail to its left from lg up. */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-10 md:py-16 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-16">
        {/* Sticky lives on the grid item — the nav itself has no room to travel. */}
        {post.body && (
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <TableOfContents body={post.body} variant="sidebar" />
          </aside>
        )}

        <div className="min-w-0">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-secondary transition-colors group mb-8"
          >
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to all articles
          </Link>

          {/* <div className="flex items-start gap-3 pb-10 border-b border-gray-100">
            {authorImageUrl ? (
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                <Image src={authorImageUrl} alt={post.author.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-white font-bold">{post.author.name.charAt(0)}</span>
              </div>
            )}
            <div>
              <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
              {post.author.role && <p className="text-sm text-gray-400">{post.author.role}</p>}
              {post.author.bio && (
                <p className="max-w-[640px] text-sm text-gray-500 leading-relaxed mt-2">
                  {post.author.bio}
                </p>
              )}
            </div>
          </div> */}

          {post.body && (
            <article className="pt-10">
              {/* Below lg the rail is hidden, so the contents collapse in above the body. */}
              <TableOfContents body={post.body} variant="collapsible" />
              <PortableTextRenderer value={post.body} />
            </article>
          )}
        </div>
      </div>
    </>
  )
}
