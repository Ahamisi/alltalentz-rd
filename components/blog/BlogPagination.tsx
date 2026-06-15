'use client'

import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
}

export default function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    const qs = params.toString()
    return `${pathname}${qs ? `?${qs}` : ''}`
  }

  // Build visible page numbers with ellipsis logic
  const pages: (number | '...')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-14" aria-label="Pagination">
      {/* Prev */}
      <Link
        href={buildHref(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`flex items-center justify-center w-9 h-9 rounded-full border text-sm transition-all duration-200 ${
          currentPage === 1
            ? 'pointer-events-none border-gray-100 text-gray-300'
            : 'border-gray-200 text-gray-600 hover:border-[#F99621] hover:text-[#F99621]'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`flex items-center justify-center w-9 h-9 rounded-full border text-sm font-medium transition-all duration-200 ${
              currentPage === p
                ? 'bg-[#F99621] border-[#F99621] text-white'
                : 'border-gray-200 text-gray-600 hover:border-[#F99621] hover:text-[#F99621]'
            }`}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      <Link
        href={buildHref(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-9 h-9 rounded-full border text-sm transition-all duration-200 ${
          currentPage === totalPages
            ? 'pointer-events-none border-gray-100 text-gray-300'
            : 'border-gray-200 text-gray-600 hover:border-[#F99621] hover:text-[#F99621]'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </nav>
  )
}
