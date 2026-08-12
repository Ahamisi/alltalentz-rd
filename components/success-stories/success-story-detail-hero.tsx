'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { formatDate, readingTime } from '@/components/blog/utils'
import type { SanitySuccessStory } from '@/types/success-story'

/**
 * Success story hero — the blog post hero's three bands (title field, full-bleed
 * banner, cream copy panel), with the byline reading as the client rather than an
 * author, and the editor's key results rendered as a stat row inside the cream
 * panel where the numbers land next to the context that explains them.
 */
interface SuccessStoryDetailHeroProps {
  story: SanitySuccessStory
  heroImageUrl: string
  clientLogoUrl: string | null
}

export default function SuccessStoryDetailHero({
  story,
  heroImageUrl,
  clientLogoUrl,
}: SuccessStoryDetailHeroProps) {
  const industry = story.categories?.[0]?.title
  const metrics = story.metrics ?? []

  return (
    <section>
      {/* Title + client byline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="bg-white px-[24px] py-[56px] md:px-[40px] md:py-[80px]"
      >
        <div className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
          <h1 className="text-[30px] leading-[1.1] font-semibold tracking-[-2%] text-[#121212] sm:text-[40px] lg:text-[52px]">
            {story.title}
          </h1>

          {(story.clientName || clientLogoUrl) && (
            <div className="mt-[20px] flex items-center gap-[10px]">
              {clientLogoUrl && (
                <span className="relative h-[32px] w-[32px] shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={clientLogoUrl}
                    alt={story.clientName ? `${story.clientName} logo` : ''}
                    fill
                    className="object-contain"
                  />
                </span>
              )}
              {story.clientName && (
                <p className="text-[18px] font-normal text-[#9E9E9E] md:text-[22px]">
                  {story.clientName}
                  {story.clientLocation ? ` · ${story.clientLocation}` : ''}
                </p>
              )}
            </div>
          )}

          {story.publishedAt && (
            <time
              dateTime={story.publishedAt}
              className="mt-[8px] text-[14px] font-normal text-[#9E9E9E] md:text-[16px]"
            >
              {formatDate(story.publishedAt)}
            </time>
          )}
        </div>
      </motion.div>

      {/* Banner */}
      <div className="relative aspect-16/10 w-full overflow-hidden sm:aspect-2/1 lg:aspect-21/9">
        <Image
          src={heroImageUrl}
          alt={story.mainImage?.alt ?? story.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Cream copy panel */}
      <div className="bg-[#FEEFDE] px-[24px] py-[40px] md:px-[40px] lg:px-[96px]">
        <h2 className="max-w-[900px] text-[26px] leading-[1.15] font-semibold tracking-[-2%] text-[#121212] sm:text-[32px] lg:text-[40px]">
          {story.title}
        </h2>

        {story.excerpt && (
          <p className="mt-[16px] max-w-[720px] text-[16px] leading-[1.6] font-normal text-[#3D3D3D] md:text-[18px]">
            {story.excerpt}
          </p>
        )}

        <div className="mt-[24px] flex flex-wrap items-center gap-[12px]">
          {industry && (
            <span className="rounded-full bg-[#121212] px-[18px] py-[9px] text-[14px] font-medium text-white">
              {industry}
            </span>
          )}
          <span className="rounded-full bg-[#121212] px-[18px] py-[9px] text-[14px] font-medium text-white">
            {readingTime(story.charCount)}
          </span>
        </div>

        {/* Key results. Divided columns rather than cards — the row reads as one
            set of figures about a single engagement, not four separate tiles. */}
        {metrics.length > 0 && (
          <dl className="mt-[36px] grid grid-cols-1 gap-y-[24px] border-t border-[#F1D4AE] pt-[32px] sm:grid-cols-2 sm:gap-x-[32px] lg:flex lg:flex-wrap lg:gap-x-[64px]">
            {metrics.map((metric) => (
              <div key={metric._key ?? metric.label}>
                <dt className="text-[32px] leading-[1.05] font-semibold tracking-[-2%] text-[#F99621] md:text-[40px]">
                  {metric.value}
                </dt>
                <dd className="mt-[6px] max-w-[220px] text-[15px] leading-[1.4] font-normal text-[#3D3D3D]">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
