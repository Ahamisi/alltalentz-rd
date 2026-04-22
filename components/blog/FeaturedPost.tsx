'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'
import type { SanityPost } from '@/types/blog'
import { formatDate } from './utils'

interface FeaturedPostProps {
  post: SanityPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const imageUrl = urlFor(post.mainImage).width(900).height(620).fit('crop').auto('format').url()
  const authorImageUrl = post.author.image
    ? urlFor(post.author.image).width(80).height(80).fit('crop').auto('format').url()
    : null

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Image */}
          <Link href={`/blog/${post.slug}`} className="block group overflow-hidden rounded-xl">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={imageUrl}
                alt={post.mainImage.alt ?? post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </Link>

          {/* Content */}
          <div className="flex flex-col justify-center">
            {/* Date + category */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
              {post.categories?.[0] && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-50 text-secondary">
                  {post.categories[0].title}
                </span>
              )}
            </div>

            {/* Title */}
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight hover:text-secondary transition-colors duration-200 mb-4">
                {post.title}
              </h2>
            </Link>

            {/* Excerpt */}
            <p className="text-gray-500 text-base leading-relaxed line-clamp-3 mb-8">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              {authorImageUrl ? (
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={authorImageUrl} alt={post.author.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{post.author.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-gray-900">{post.author.name}</p>
                {post.author.role && (
                  <p className="text-sm text-gray-400">{post.author.role}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
