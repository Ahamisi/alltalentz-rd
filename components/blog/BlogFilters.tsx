'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useRef, useTransition } from 'react'
import type { SanityCategory } from '@/types/blog'

interface BlogFiltersProps {
  categories: SanityCategory[]
  currentSearch: string
  currentSort: string
  currentCategory: string
}

export default function BlogFilters({
  categories,
  currentSearch,
  currentSort,
  currentCategory,
}: BlogFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })
      params.delete('page')
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = useCallback(
    (value: string) => {
      startTransition(() => {
        router.push(`${pathname}?${createQueryString({ search: value })}`, { scroll: false })
      })
    },
    [router, pathname, createQueryString]
  )

  const handleSort = useCallback(
    (value: string) => {
      startTransition(() => {
        router.push(`${pathname}?${createQueryString({ sort: value })}`, { scroll: false })
      })
    },
    [router, pathname, createQueryString]
  )

  const handleCategory = useCallback(
    (slug: string) => {
      startTransition(() => {
        router.push(
          `${pathname}?${createQueryString({ category: currentCategory === slug ? '' : slug })}`,
          { scroll: false }
        )
      })
    },
    [router, pathname, createQueryString, currentCategory]
  )

  return (
    <div className={`transition-opacity duration-200 ${isPending ? 'opacity-60' : 'opacity-100'}`}>
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles…"
            defaultValue={currentSearch}
            onChange={(e) => {
              const val = e.target.value
              if (searchTimeout.current) clearTimeout(searchTimeout.current)
              searchTimeout.current = setTimeout(() => handleSearch(val), 400)
            }}
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={currentSort}
            onChange={(e) => handleSort(e.target.value)}
            className="appearance-none pl-4 pr-10 py-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition cursor-pointer min-w-[170px]"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Category pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategory('')}
            className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
              !currentCategory
                ? 'bg-secondary border-secondary text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategory(cat.slug)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
                currentCategory === cat.slug
                  ? 'bg-secondary border-secondary text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-secondary hover:text-secondary'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
