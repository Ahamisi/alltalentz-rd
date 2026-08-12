'use client'

import { useCallback, useRef, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { SuccessStoryCategory } from '@/types/success-story'

interface SuccessStoriesToolbarProps {
  categories: SuccessStoryCategory[]
  currentSearch: string
  currentCategory: string
}

const chipClass = (active: boolean) =>
  `whitespace-nowrap rounded-full px-[22px] py-[12px] text-[16px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621] ${
    active
      ? 'bg-[#F99621] text-[#121212]'
      : 'bg-[#F1EFEC] text-[#121212] hover:bg-[#E6E3DE]'
  }`

export default function SuccessStoriesToolbar({
  categories,
  currentSearch,
  currentCategory,
}: SuccessStoriesToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Filters live in the URL, so the grid can stay a server component and every
  // filtered view is linkable and back-button safe.
  const push = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value)
        else params.delete(key)
      })
      // Any filter change invalidates the page number.
      params.delete('page')
      const qs = params.toString()
      startTransition(() => {
        router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false })
      })
    },
    [router, pathname, searchParams],
  )

  const hasFilter = Boolean(currentSearch || currentCategory)

  return (
    <section className="bg-white px-[24px] pt-[56px] md:px-[40px] md:pt-[72px]">
      <div
        className={`container mx-auto max-w-(--breakpoint-xl) transition-opacity duration-200 ${
          isPending ? 'opacity-60' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col gap-[20px] lg:flex-row lg:items-center lg:gap-[32px]">
          <div className="relative w-full shrink-0 lg:w-[340px] xl:w-[400px]">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-[18px] top-1/2 h-[20px] w-[20px] -translate-y-1/2 text-[#8A8A8A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              aria-label="Search success stories"
              placeholder="Search success stories"
              defaultValue={currentSearch}
              onChange={(e) => {
                const val = e.target.value
                if (searchTimeout.current) clearTimeout(searchTimeout.current)
                searchTimeout.current = setTimeout(() => push({ search: val }), 400)
              }}
              className="w-full rounded-[12px] border border-[#E5E3DF] bg-white py-[15px] pl-[52px] pr-[16px] text-[16px] text-[#121212] placeholder-[#8A8A8A] transition focus:border-[#F99621] focus:outline-hidden"
            />
          </div>

          {categories.length > 0 && (
            <div
              role="group"
              aria-label="Filter success stories by industry"
              className="flex flex-wrap items-center gap-[12px]"
            >
              {categories.map((cat) => {
                const active = currentCategory === cat.slug
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => push({ category: active ? '' : cat.slug })}
                    aria-pressed={active}
                    className={chipClass(active)}
                  >
                    {cat.title}
                  </button>
                )
              })}

              {hasFilter && (
                <button
                  type="button"
                  onClick={() => push({ category: '', search: '' })}
                  className="whitespace-nowrap rounded-full border border-[#E5E3DF] bg-white px-[18px] py-[11px] text-[15px] font-medium text-[#5C5C5C] transition-colors hover:bg-[#F4F3F1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621]"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
