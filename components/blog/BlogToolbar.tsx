"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { SanityCategory } from "@/types/blog";

/**
 * Blog toolbar — search + category pills, sitting directly beneath BlogHero.
 *
 * Scaling to a long category list is the whole point of this component, so the
 * pills live on a *single* line that never wraps:
 *
 *  - "All" is pinned outside the scroller, so the escape hatch never scrolls
 *    away and the row's left edge stays stable.
 *  - The rest scroll horizontally (native swipe on touch, chevron buttons +
 *    shift-free gradient fades on desktop) with scroll-snap so pills always
 *    settle on a whole item, never clipped mid-word.
 *  - Deep links land with the active pill scrolled into view.
 *  - Past OVERFLOW_MENU_MIN categories, scrolling alone stops being a
 *    reasonable way to find one topic among many, so a "More" button appears at
 *    the end of the rail and opens a searchable panel of every category —
 *    progressive disclosure that only shows up once it earns its place.
 *
 * Wrapping to N rows was the alternative; it was rejected because the row's
 * height (and therefore the position of every post below it) would change with
 * the taxonomy and again on every viewport width.
 */
interface BlogToolbarProps {
  categories: SanityCategory[];
  currentSearch: string;
  currentSort: string;
  currentCategory: string;
}

/** Above this many categories, the rail also gets a searchable "More" panel. */
const OVERFLOW_MENU_MIN = 12;

/** How far one chevron press scrolls the rail. */
const SCROLL_STEP = 260;

const pillClass = (active: boolean) =>
  `whitespace-nowrap rounded-full px-[22px] py-[11px] text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621] ${
    active
      ? "bg-[#F99621] text-[#121212]"
      : "bg-[#F4F3F1] text-[#121212] hover:bg-[#E9E7E2]"
  }`;

export default function BlogToolbar({
  categories,
  currentSearch,
  currentSort,
  currentCategory,
}: BlogToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuQuery, setMenuQuery] = useState("");

  const hasOverflowMenu = categories.length > OVERFLOW_MENU_MIN;

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      // Any filter change invalidates the current page number.
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const push = useCallback(
    (updates: Record<string, string>) => {
      startTransition(() => {
        router.push(`${pathname}?${createQueryString(updates)}`, {
          scroll: false,
        });
      });
    },
    [router, pathname, createQueryString]
  );

  const selectCategory = useCallback(
    (slug: string) => {
      // Tapping the active pill clears the filter — the pills double as toggles.
      push({ category: currentCategory === slug ? "" : slug });
      setMenuOpen(false);
      setMenuQuery("");
    },
    [push, currentCategory]
  );

  // --- rail overflow state -------------------------------------------------
  const syncScrollState = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < max - 2);
  }, []);

  useLayoutEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncScrollState();
    const observer = new ResizeObserver(syncScrollState);
    observer.observe(el);
    Array.from(el.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [syncScrollState, categories.length]);

  // Deep link / filter change: bring the active pill into view.
  useEffect(() => {
    const el = railRef.current;
    if (!el || !currentCategory) return;
    const active = el.querySelector<HTMLElement>("[data-active='true']");
    if (!active) return;
    el.scrollTo({
      left: active.offsetLeft - el.clientWidth / 2 + active.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [currentCategory]);

  const scrollBy = (direction: -1 | 1) => {
    railRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  // --- overflow menu -------------------------------------------------------
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const filteredCategories = useMemo(() => {
    const q = menuQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.title.toLowerCase().includes(q));
  }, [categories, menuQuery]);

  const activeTitle = categories.find((c) => c.slug === currentCategory)?.title;

  return (
    <section className="bg-white px-[24px] md:px-[40px] pb-[24px]">
      <div
        className={`container mx-auto max-w-(--breakpoint-xl) transition-opacity duration-200 ${
          isPending ? "opacity-60" : "opacity-100"
        }`}
      >
        <div className="flex flex-col gap-[16px] md:flex-row md:items-center md:gap-[20px]">
          {/* Search */}
          <div className="relative w-full shrink-0 md:w-[340px] lg:w-[400px]">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-[18px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#8A8A8A]"
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
              aria-label="Search articles"
              placeholder="Search articles"
              defaultValue={currentSearch}
              onChange={(e) => {
                const val = e.target.value;
                if (searchTimeout.current) clearTimeout(searchTimeout.current);
                searchTimeout.current = setTimeout(
                  () => push({ search: val }),
                  400
                );
              }}
              className="w-full rounded-[12px] border border-[#E5E3DF] bg-white py-[13px] pl-[48px] pr-[16px] text-[15px] text-[#121212] placeholder-[#8A8A8A] transition focus:border-[#F99621] focus:outline-hidden"
            />
          </div>

          {/* Category rail */}
          {categories.length > 0 && (
            <div className="flex min-w-0 flex-1 items-center gap-[10px]">
              {/* "All" is pinned so the reset is always one click away. */}
              <button
                type="button"
                onClick={() => selectCategory("")}
                aria-pressed={!currentCategory}
                className={`${pillClass(!currentCategory)} shrink-0`}
              >
                All
              </button>

              <div className="relative min-w-0 flex-1">
                <div
                  ref={railRef}
                  onScroll={syncScrollState}
                  role="group"
                  aria-label="Filter articles by category"
                  className="blog-rail flex snap-x snap-mandatory items-center gap-[10px] overflow-x-auto scroll-smooth py-[2px]"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      type="button"
                      data-active={currentCategory === cat.slug}
                      onClick={() => selectCategory(cat.slug)}
                      aria-pressed={currentCategory === cat.slug}
                      className={`${pillClass(
                        currentCategory === cat.slug
                      )} shrink-0 snap-start`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>

                {/* Edge fades: an affordance that there is more to either side.
                    pointer-events-none so they never eat a pill click. */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 left-0 w-[48px] bg-linear-to-r from-white to-transparent transition-opacity duration-200 ${
                    canScrollLeft ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 right-0 w-[48px] bg-linear-to-l from-white to-transparent transition-opacity duration-200 ${
                    canScrollRight ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Chevrons — desktop only; touch users just swipe. Hidden
                  entirely when the rail fits, so short lists stay clean. */}
              {(canScrollLeft || canScrollRight) && (
                <div className="hidden shrink-0 items-center gap-[6px] md:flex">
                  <button
                    type="button"
                    onClick={() => scrollBy(-1)}
                    disabled={!canScrollLeft}
                    aria-label="Scroll categories left"
                    className="grid h-[36px] w-[36px] place-items-center rounded-full border border-[#E5E3DF] bg-white text-[#121212] transition-colors hover:bg-[#F4F3F1] disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-[16px] w-[16px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollBy(1)}
                    disabled={!canScrollRight}
                    aria-label="Scroll categories right"
                    className="grid h-[36px] w-[36px] place-items-center rounded-full border border-[#E5E3DF] bg-white text-[#121212] transition-colors hover:bg-[#F4F3F1] disabled:opacity-30 disabled:hover:bg-white"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-[16px] w-[16px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Searchable panel of every category — only once the list is long
                  enough that scanning the rail stops being practical. */}
              {hasOverflowMenu && (
                <div className="relative shrink-0">
                  <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-expanded={menuOpen}
                    aria-haspopup="dialog"
                    className="flex items-center gap-[6px] whitespace-nowrap rounded-full border border-[#E5E3DF] bg-white px-[18px] py-[10px] text-[15px] font-medium text-[#121212] transition-colors hover:bg-[#F4F3F1]"
                  >
                    {activeTitle ? "Topics" : "All topics"}
                    <svg
                      aria-hidden="true"
                      className={`h-[14px] w-[14px] transition-transform duration-200 ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {menuOpen && (
                    <div
                      ref={menuRef}
                      role="dialog"
                      aria-label="All categories"
                      className="absolute right-0 z-30 mt-[10px] w-[300px] rounded-[14px] border border-[#E5E3DF] bg-white p-[14px] shadow-[0_18px_40px_rgba(18,18,18,0.12)]"
                    >
                      <input
                        type="text"
                        autoFocus
                        value={menuQuery}
                        onChange={(e) => setMenuQuery(e.target.value)}
                        placeholder="Find a topic"
                        aria-label="Find a category"
                        className="w-full rounded-[10px] border border-[#E5E3DF] bg-white px-[12px] py-[9px] text-[14px] text-[#121212] placeholder-[#8A8A8A] focus:border-[#F99621] focus:outline-hidden"
                      />
                      <div className="mt-[10px] max-h-[260px] overflow-y-auto">
                        {filteredCategories.length > 0 ? (
                          <ul className="flex flex-col">
                            {filteredCategories.map((cat) => (
                              <li key={cat.slug}>
                                <button
                                  type="button"
                                  onClick={() => selectCategory(cat.slug)}
                                  className={`flex w-full items-center justify-between rounded-[8px] px-[10px] py-[9px] text-left text-[14px] transition-colors hover:bg-[#F4F3F1] ${
                                    currentCategory === cat.slug
                                      ? "font-semibold text-[#121212]"
                                      : "text-[#5C5C5C]"
                                  }`}
                                >
                                  {cat.title}
                                  {currentCategory === cat.slug && (
                                    <svg
                                      aria-hidden="true"
                                      className="h-[15px] w-[15px] text-[#F99621]"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="px-[10px] py-[12px] text-[14px] text-[#8A8A8A]">
                            No topic matches “{menuQuery}”
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Sort */}
          <div className="relative shrink-0">
            <select
              value={currentSort}
              onChange={(e) => push({ sort: e.target.value })}
              aria-label="Sort articles"
              className="w-full cursor-pointer appearance-none rounded-[12px] border border-[#E5E3DF] bg-white py-[13px] pl-[16px] pr-[40px] text-[15px] text-[#121212] transition focus:border-[#F99621] focus:outline-hidden md:w-auto"
            >
              <option value="desc">Newest</option>
              <option value="asc">Oldest</option>
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-[14px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-[#8A8A8A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
