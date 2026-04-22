'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import type { SanityPost } from '@/types/blog'
import { formatDate } from './utils'

interface BlogCardProps {
  post: SanityPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const imageUrl = urlFor(post.mainImage).width(600).height(400).fit('crop').auto('format').url()
  const authorImageUrl = post.author.image
    ? urlFor(post.author.image).width(64).height(64).fit('crop').auto('format').url()
    : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="flex flex-col"
    >
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block group overflow-hidden rounded-xl mb-5">
        <div className="relative w-full aspect-[16/10]">
          <Image
            src={imageUrl}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Date + category */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm text-gray-400">{formatDate(post.publishedAt)}</span>
        {post.categories?.[0] && (
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-secondary">
            {post.categories[0].title}
          </span>
        )}
      </div>

      {/* Title */}
      <Link href={`/blog/${post.slug}`} className="block mb-3">
        <h3 className="text-gray-900 font-bold text-xl leading-snug hover:text-secondary transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">
        {post.excerpt}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        {authorImageUrl ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image src={authorImageUrl} alt={post.author.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">{post.author.name.charAt(0)}</span>
          </div>
        )}
        <div>
          <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
          {post.author.role && (
            <p className="text-xs text-gray-400">{post.author.role}</p>
          )}
        </div>
      </div>
    </motion.article>
  )
}
