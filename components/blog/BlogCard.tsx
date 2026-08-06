'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { blogImageUrl } from '@/lib/sanity/image'
import type { SanityPost } from '@/types/blog'
import { readingTime } from './utils'

/**
 * Blog card — image on top of a soft grey panel carrying the title, excerpt and
 * a footer row ("Read story…" on the left, read-time pill on the right).
 *
 * The whole card is one link; the footer link is a visual affordance inside it
 * rather than a second tab stop, so keyboard users get one target per card.
 */
interface BlogCardProps {
  post: SanityPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const imageUrl = blogImageUrl(post.mainImage, (b) =>
    b.width(800).height(640).fit('crop').auto('format'),
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-[#FAFAFA] duration-300"
      >
        {/* Image */}
        <div className="relative aspect-5/4 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Copy */}
        <div className="flex flex-1 flex-col px-[28px] pt-[28px] pb-[36px]">
          <h3 className="text-[20px] leading-[1.25] font-semibold tracking-[-2%] text-[#121212] transition-colors duration-200 group-hover:text-[#F99621] md:text-[22px]">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="mt-[12px] text-[14px] leading-[1.55] font-normal text-black line-clamp-2">
              {post.excerpt}
            </p>
          )}

          <div className="mt-[24px] flex items-center justify-between gap-[12px] pt-[4px]">
            <span className="text-[16px] font-normal text-[#F99621] underline underline-offset-4">
              Read story...
            </span>
            <span className="shrink-0 rounded-full bg-[#B6B6B6] px-[12px] py-[4px] text-[13px] font-medium text-white">
              {readingTime(post.charCount)}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
