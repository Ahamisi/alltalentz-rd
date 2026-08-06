'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { blogImageUrl } from '@/lib/sanity/image'
import type { SanityPost } from '@/types/blog'
import { readingTime } from './utils'

/**
 * Featured post — a full-bleed banner image with a cream panel beneath it
 * carrying the title, excerpt and two meta pills (category + read time).
 *
 * Deliberately no author/date row here: the featured slot is a poster, and the
 * byline detail belongs on the cards and the post page.
 */
interface FeaturedPostProps {
  post: SanityPost
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const imageUrl = blogImageUrl(post.mainImage, (b) =>
    b.width(1920).height(900).fit('crop').auto('format'),
  )
  const category = post.categories?.[0]?.title

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="bg-[#FEEFDE] mt-10"
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        {/* Banner */}
        <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-2/1 lg:aspect-21/9">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="100vw"
            priority
          />
        </div>

        {/* Copy panel */}
        <div className="px-[24px] py-[40px] md:px-[40px] lg:px-[96px]">
          <h2 className="max-w-[900px] text-[26px] leading-[1.15] font-semibold tracking-[-2%] text-[#121212] transition-colors duration-200 group-hover:text-[#F99621] sm:text-[32px] lg:text-[40px]">
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
      </Link>
    </motion.section>
  )
}
