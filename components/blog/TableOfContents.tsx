import { extractHeadings } from './utils'

interface TableOfContentsProps {
  body: unknown[]
}

export default function TableOfContents({ body }: TableOfContentsProps) {
  const headings = extractHeadings(body)
  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 rounded-xl border border-gray-100 bg-gray-50 px-6 py-5"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
        Table of Contents
      </p>
      <ol className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className="text-sm text-gray-600 hover:text-[#F99621] transition-colors leading-snug"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
