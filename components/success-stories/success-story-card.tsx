'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { blogImageUrl } from '@/lib/sanity/image'
import { readingTime } from '@/components/blog/utils'
import type { SanitySuccessStory } from '@/types/success-story'
import { REVEAL_VIEWPORT } from "@/lib/motion";

interface SuccessStoryCardProps {
  story: SanitySuccessStory
  index?: number
}

export default function SuccessStoryCard({ story, index = 0 }: SuccessStoryCardProps) {
  const imageUrl = blogImageUrl(story.mainImage, (b) =>
    b.width(800).height(600).fit('crop').auto('format'),
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <Link
        href={`/success-stories/${story.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#F99621] bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(249,150,33,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621]"
      >
        <div className="flex flex-1 flex-col px-[28px] pt-[32px] pb-[24px]">
          <h3 className="text-[26px] leading-[1.15] font-semibold tracking-[-2%] text-[#121212] transition-colors duration-200 group-hover:text-[#F99621] md:text-[30px]">
            {story.title}
          </h3>

          {story.excerpt && (
            <p className="mt-[16px] text-[16px] leading-[1.5] font-normal text-[#121212] line-clamp-2">
              {story.excerpt}
            </p>
          )}

          <div className="mt-auto flex items-center justify-between gap-[12px] pt-[28px]">
            <span className="text-[16px] font-normal text-[#F99621] underline underline-offset-4">
              Read story...
            </span>
            <span className="shrink-0 rounded-full bg-[#B6B6B6] px-[12px] py-[4px] text-[13px] font-medium text-white">
              {readingTime(story.charCount)}
            </span>
          </div>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={story.mainImage?.alt ?? story.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
    </motion.article>
  )
}
