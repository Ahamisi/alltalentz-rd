import Image from 'next/image'
import Link from 'next/link'
import type { SanityPost } from '@/types/blog'
import PortableTextRenderer from './PortableTextRenderer'
import { formatDate } from './utils'

interface PostDetailProps {
  post: SanityPost
  heroImageUrl: string
  authorImageUrl: string | null
}

export default function PostDetail({ post, heroImageUrl, authorImageUrl }: PostDetailProps) {
  return (
    <>
      <div className="relative w-full h-72 sm:h-96 md:h-[520px]">
        <Image
          src={heroImageUrl}
          alt={post.mainImage.alt ?? post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
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

        <div className="flex flex-wrap items-center gap-3 mb-5">
          {post.categories?.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog?category=${cat.slug}`}
              className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-secondary hover:opacity-80 transition-opacity"
            >
              {cat.title}
            </Link>
          ))}
          <span className="text-sm text-gray-400">{formatDate(post.publishedAt)}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          {post.title}
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed mb-8">{post.excerpt}</p>

        <div className="flex items-center gap-3 pb-10 border-b border-gray-100">
          {authorImageUrl ? (
            <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
              <Image src={authorImageUrl} alt={post.author.name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">{post.author.name.charAt(0)}</span>
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
            {post.author.role && <p className="text-sm text-gray-400">{post.author.role}</p>}
          </div>
        </div>

        {post.body && (
          <article className="pt-10">
            <PortableTextRenderer value={post.body} />
          </article>
        )}
      </div>
    </>
  )
}
