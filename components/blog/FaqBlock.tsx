'use client'

import { useState } from 'react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export interface FaqItem {
  _key: string
  question: string
  answer?: PortableTextBlock[]
}

interface FaqBlockProps {
  value: {
    items?: FaqItem[]
  }
}

// Compact serializers for FAQ answers (paragraphs, lists, inline marks, links).
// Kept local to avoid a circular import with PortableTextRenderer.
const answerComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-4 last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-5 space-y-1.5 mb-4 text-gray-600">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-5 space-y-1.5 mb-4 text-gray-600">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-gray-800 text-sm font-mono px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          target={value?.blank || isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#F99621] font-medium underline underline-offset-2 hover:text-[#e08500] transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}

export default function FaqBlock({ value }: FaqBlockProps) {
  const items = value?.items ?? []
  const [openKey, setOpenKey] = useState<string | null>(null)

  if (items.length === 0) return null

  return (
    <div className="my-8 divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item) => {
        const isOpen = openKey === item._key
        return (
          <div key={item._key}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : item._key)}
                aria-expanded={isOpen}
                className="w-full py-5 flex items-center justify-between gap-4 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-[#F99621] transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </h3>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-[2000px] opacity-100 pb-5' : 'max-h-0 opacity-0'
              }`}
            >
              {item.answer && <PortableText value={item.answer} components={answerComponents} />}
            </div>
          </div>
        )
      })}
    </div>
  )
}
