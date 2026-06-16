import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { slugify } from './utils'
import FaqBlock, { type FaqItem } from './FaqBlock'

interface TableRow {
  _key: string
  cells: string[]
}

interface TableValue {
  headerRow?: string[]
  rows?: TableRow[]
}

interface CtaButtonValue {
  text?: string
  url?: string
  style?: 'primary' | 'secondary' | 'outline'
  openInNewTab?: boolean
}

const ctaStyles = {
  primary: 'bg-[#F99621] text-white hover:bg-[#e08500]',
  secondary: 'bg-gray-900 text-white hover:bg-gray-700',
  outline: 'border-2 border-[#F99621] text-[#F99621] hover:bg-[#F99621] hover:text-white',
}

function getHeadingId(value: PortableTextBlock): string {
  const text = (value.children as { text?: string }[])
    ?.map((span) => span.text ?? '')
    .join('') ?? ''
  return slugify(text)
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image
              src={urlFor(value).width(1200).auto('format').url()}
              alt={value.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    table: ({ value }: { value: TableValue }) => {
      const rows = value?.rows ?? []
      const headerRow = value?.headerRow ?? []
      if (rows.length === 0 && headerRow.length === 0) return null
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            {headerRow.length > 0 && (
              <thead className="bg-gray-100 text-gray-900 font-semibold">
                <tr>
                  {headerRow.map((heading, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 border-b border-gray-200 border-r last:border-r-0 font-semibold"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={row._key} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.cells?.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-4 py-3 border-b border-gray-200 border-r last:border-r-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    ctaButton: ({ value }: { value: CtaButtonValue }) => {
      if (!value?.url || !value?.text) return null
      const style = value.style ?? 'primary'
      return (
        <div className="my-8 flex justify-center">
          <a
            href={value.url}
            target={value.openInNewTab ? '_blank' : undefined}
            rel={value.openInNewTab ? 'noopener noreferrer' : undefined}
            className={`inline-block rounded-lg px-8 py-3 font-semibold transition-colors duration-200 ${ctaStyles[style]}`}
          >
            {value.text}
          </a>
        </div>
      )
    },
    faq: ({ value }: { value: { items?: FaqItem[] } }) => <FaqBlock value={value} />,
  },
  block: {
    h2: ({ children, value }) => (
      <h2 id={getHeadingId(value)} className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={getHeadingId(value)} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children, value }) => (
      <h4 id={getHeadingId(value)} className="text-lg font-bold text-gray-900 mt-6 mb-2">{children}</h4>
    ),
    h5: ({ children, value }) => (
      <h5 id={getHeadingId(value)} className="text-base font-bold text-gray-900 mt-5 mb-2">{children}</h5>
    ),
    h6: ({ children, value }) => (
      <h6 id={getHeadingId(value)} className="text-sm font-bold text-gray-500 uppercase tracking-wide mt-4 mb-1">{children}</h6>
    ),
    normal: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-5 text-base md:text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#F99621] pl-6 my-6 italic text-gray-600 text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 space-y-2 mb-5 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 space-y-2 mb-5 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base md:text-lg leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base md:text-lg leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
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

interface PortableTextRendererProps {
  value: PortableTextBlock[]
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return <PortableText value={value} components={components} />
}
