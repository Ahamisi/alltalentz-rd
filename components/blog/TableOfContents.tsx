'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { extractHeadings } from './utils'

/**
 * Table of contents, in two shapes driven by `variant`:
 *
 *  - `sidebar` — a rail to the left of the article on lg+ screens. The rail is
 *    pinned by its grid-item wrapper in PostDetail (`lg:sticky lg:self-start`);
 *    note that sticky only works because <body> no longer sets an overflow —
 *    any scroll-container ancestor silently disables it.
 *  - `collapsible` — a closed-by-default disclosure above the body on small
 *    screens, where a permanently expanded list would push the article off the
 *    first screen. Its summary doubles as a "you are here" readout.
 *
 * Active section: measured off a reading line just below the navbar rather than
 * with IntersectionObserver, so the highlight follows the section being *read*
 * rather than whichever heading happens to be clipping the viewport edge. The
 * measurement is rAF-coalesced because Lenis emits scroll every frame.
 *
 * Motion: one marker element glides between items (transform + height, both
 * compositor-friendly) instead of each item toggling its own border, which is
 * what makes the rail read as a single moving indicator. Suppressed under
 * prefers-reduced-motion, where the marker jumps instead.
 */
interface TableOfContentsProps {
  body: unknown[]
  variant?: 'sidebar' | 'collapsible'
}

/** Distance from the viewport top that counts as "the section you're reading". */
const READING_LINE = 140

export default function TableOfContents({ body, variant = 'sidebar' }: TableOfContentsProps) {
  const headings = extractHeadings(body)
  const [activeId, setActiveId] = useState<string>('')
  const [marker, setMarker] = useState<{ top: number; height: number } | null>(null)

  const detailsRef = useRef<HTMLDetailsElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({})

  const ids = headings.map((h) => h.id).join('|')

  // ---- Scroll spy -----------------------------------------------------------
  useEffect(() => {
    if (!ids) return
    const idList = ids.split('|')
    let frame = 0

    const measure = () => {
      frame = 0
      let current = ''
      for (const id of idList) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= READING_LINE) current = id
        else break
      }
      // Before the first heading passes the line, highlight it rather than nothing.
      setActiveId(current || idList[0])
    }

    const onScroll = () => {
      // Lenis fires scroll on every animation frame; coalesce to one measure.
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  // ---- Marker geometry ------------------------------------------------------
  const syncMarker = useCallback(() => {
    const item = activeId ? itemRefs.current[activeId] : null
    if (!item) return
    setMarker({ top: item.offsetTop, height: item.offsetHeight })
  }, [activeId])

  useLayoutEffect(syncMarker, [syncMarker])

  // Item heights change when the rail reflows (wrapping headings, open/close).
  useEffect(() => {
    const list = listRef.current
    if (!list || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(syncMarker)
    observer.observe(list)
    return () => observer.disconnect()
  }, [syncMarker])

  // ---- Anchor navigation ----------------------------------------------------
  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    event.preventDefault()
    setActiveId(id)
    if (detailsRef.current) detailsRef.current.open = false

    // Lenis owns the scroll position when smoothing is on; a native jump would
    // be immediately overridden by its running animation.
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -READING_LINE + 28, duration: 0.9 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Keep the URL shareable without letting the browser also jump.
    window.history.replaceState(null, '', `#${id}`)
  }

  if (headings.length === 0) return null

  const activeHeading = headings.find((h) => h.id === activeId)

  const list = (
    <ol ref={listRef} className="relative">
      {/* Static track the marker rides on. */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-gray-200/80" />

      {/* The single moving indicator. */}
      <span
        aria-hidden="true"
        className="absolute left-0 w-[2px] rounded-full bg-[#F99621] transition-[transform,height,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{
          height: marker?.height ?? 0,
          transform: `translateY(${marker?.top ?? 0}px)`,
          opacity: marker ? 1 : 0,
        }}
      />

      {headings.map((heading) => {
        const isActive = heading.id === activeId
        return (
          <li
            key={heading.id}
            ref={(node) => {
              itemRefs.current[heading.id] = node
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(event) => goTo(event, heading.id)}
              aria-current={isActive ? 'true' : undefined}
              className={`block py-[7px] pr-2 text-[13.5px] leading-snug transition-[color,transform] duration-300 ease-out motion-reduce:transition-none ${
                isActive
                  ? 'font-semibold text-[#121212]'
                  : 'text-gray-500 hover:text-[#121212] hover:translate-x-[2px]'
              }`}
              style={{ paddingLeft: `${16 + (heading.level - 2) * 12}px` }}
            >
              {heading.text}
            </a>
          </li>
        )
      })}
    </ol>
  )

  if (variant === 'collapsible') {
    return (
      <details
        ref={detailsRef}
        className="group mb-10 overflow-hidden rounded-2xl border border-gray-100 bg-[#FAFAFA] lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-500 shadow-xs">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h7" />
            </svg>
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
              On this page
            </span>
            <span className="block truncate text-sm font-medium text-[#121212]">
              {activeHeading?.text ?? `${headings.length} sections`}
            </span>
          </span>

          <svg
            className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <nav aria-label="Table of contents" className="border-t border-gray-100 px-4 py-3">
          {list}
        </nav>
      </details>
    )
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 pl-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-400">
        On this page
      </p>
      {/* Long TOCs scroll inside the rail instead of running past the pinned viewport. */}
      <div className="max-h-[calc(100vh-220px)] overflow-y-auto pb-1">{list}</div>
    </nav>
  )
}
