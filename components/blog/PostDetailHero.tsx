'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { SanityPost } from '@/types/blog'
import { formatDate, readingTime } from './utils'

/**
 * Post detail hero — three stacked bands:
 *  1. white field with the article title centred and the author name beneath it
 *  2. a full-bleed banner image
 *  3. a cream panel repeating the title with the excerpt and two meta pills
 *     (category + read time), matching the featured slot on the listing page.
 *
 * Kept separate from PostDetail so the article body component stays about the
 * body, and the hero can be reused/restyled on its own.
 */
interface PostDetailHeroProps {
  post: SanityPost
  heroImageUrl: string
}

export default function PostDetailHero({ post, heroImageUrl }: PostDetailHeroProps) {
  const category = post.categories?.[0]?.title

  return (
    <section>
      {/* Title + byline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="bg-white px-[24px] py-[56px] md:px-[40px] md:py-[80px]"
      >
        <div className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
          <h1 className="text-[30px] leading-[1.1] font-semibold tracking-[-2%] text-[#121212] sm:text-[40px] lg:text-[52px]">
            {post.title}
          </h1>
          <p className="mt-[16px] text-[18px] font-normal text-[#9E9E9E] md:text-[22px]">
            {post.author.name}
          </p>
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="mt-[8px] text-[14px] font-normal text-[#9E9E9E] md:text-[16px]"
            >
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </motion.div>

      {/* Banner */}
      <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-2/1 lg:aspect-21/9">
        <Image
          src={heroImageUrl}
          alt={post.mainImage?.alt ?? post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Cream copy panel */}
      <div className="bg-[#FEEFDE] px-[24px] py-[40px] md:px-[40px] lg:px-[96px]">
        <h2 className="max-w-[900px] text-[26px] leading-[1.15] font-semibold tracking-[-2%] text-[#121212] sm:text-[32px] lg:text-[40px]">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="mt-[16px] max-w-[720px] text-[16px] leading-[1.6] font-normal text-[#3D3D3D] md:text-[18px]">
            {post.excerpt}
          </p>
        )}

        <div className="mt-[24px] flex flex-wrap items-center gap-[12px]">
          {category && (
            <span className="rounded-full bg-[#121212] px-[18px] py-[9px] text-[14px] font-medium text-white">
              {category}
            </span>
          )}
          <span className="rounded-full bg-[#121212] px-[18px] py-[9px] text-[14px] font-medium text-white">
            {readingTime(post.charCount)}
          </span>
        </div>
      </div>
    </section>
  )
}
