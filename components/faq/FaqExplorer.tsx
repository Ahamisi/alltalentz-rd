"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { SanityFaqCategory } from "@/types/faq";
import FaqAccordionItem from "./FaqAccordionItem";
import FaqCategoryNav from "./FaqCategoryNav";
import FaqSupportCard from "./FaqSupportCard";

/**
 * The /faq body: a pinned search + category rail on the left, the grouped
 * accordion on the right.
 *
 * Behaviour worth knowing:
 *  - **Search is client-side.** The whole question set is a few KB, so filtering
 *    in the browser gives instant feedback with no request per keystroke, and it
 *    can match against answers too (not just titles).
 *  - **While searching, every match is expanded.** The user asked a question with
 *    the search box; making them click again to read each answer is a wasted
 *    step. Outside search, one item is open at a time so the page stays scannable.
 *  - **Active category is measured off a reading line**, not IntersectionObserver,
 *    so the rail highlights the group being *read* rather than whichever heading
 *    happens to clip the viewport edge. Lenis emits scroll every frame, so the
 *    measurement is rAF-coalesced. Same approach as the blog TOC.
 *  - **Jumps are handed to Lenis** when smoothing is on; a native scroll would be
 *    overridden by its running animation.
 */
type FaqExplorerProps = {
  categories: SanityFaqCategory[];
};

/** Distance from the viewport top that counts as "the category you're reading". */
const READING_LINE = 180;

/** Extra breathing room above a category when we jump to it. */
const JUMP_OFFSET = -132;

const sectionId = (slug: string) => `faq-${slug}`;

export default function FaqExplorer({ categories }: FaqExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? "");
  const [openId, setOpenId] = useState<string | null>(
    categories[0]?.faqs[0]?._id ?? null
  );
  // While searching every match is expanded, so "open" is expressed as the
  // inverse: the ids the user has explicitly collapsed again.
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  // Suppresses scroll-spy while a click-triggered smooth scroll is in flight —
  // otherwise the rail flickers through every category it passes on the way.
  const lockRef = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return categories;
    return categories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(needle) ||
            faq.answer.toLowerCase().includes(needle)
        ),
      }))
      .filter((category) => category.faqs.length > 0);
  }, [categories, query]);

  const totalMatches = useMemo(
    () => filtered.reduce((sum, category) => sum + category.faqs.length, 0),
    [filtered]
  );

  // The rail always lists every category (so the taxonomy doesn't jump around as
  // you type); counts show how many questions currently match.
  const navItems = useMemo(
    () =>
      categories.map((category) => ({
        slug: category.slug,
        title: category.title,
        count:
          filtered.find((c) => c.slug === category.slug)?.faqs.length ?? 0,
      })),
    [categories, filtered]
  );

  const visibleSlugs = filtered.map((c) => c.slug).join("|");

  // ---- Scroll spy -----------------------------------------------------------
  useEffect(() => {
    if (!visibleSlugs) return;
    const slugs = visibleSlugs.split("|");
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (lockRef.current) return;
      let current = "";
      for (const slug of slugs) {
        const el = document.getElementById(sectionId(slug));
        if (!el) continue;
        if (el.getBoundingClientRect().top <= READING_LINE) current = slug;
        else break;
      }
      setActiveSlug(current || slugs[0]);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visibleSlugs]);

  // ---- Jump to a category ---------------------------------------------------
  const jumpTo = useCallback((slug: string) => {
    const target = document.getElementById(sectionId(slug));
    if (!target) return;

    setActiveSlug(slug);

    // Hold the highlight on the clicked item until the scroll settles.
    lockRef.current = true;
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      lockRef.current = false;
    }, 1000);

    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: JUMP_OFFSET, duration: 0.9 });
    } else {
      const top =
        target.getBoundingClientRect().top + window.scrollY + JUMP_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }

    window.history.replaceState(null, "", `#${sectionId(slug)}`);
  }, []);

  useEffect(
    () => () => {
      if (lockTimer.current) clearTimeout(lockTimer.current);
    },
    []
  );

  // Deep link support: /faq#healthcare lands on that group.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const slug = hash.startsWith("faq-") ? hash.slice(4) : hash;
    if (!categories.some((c) => c.slug === slug)) return;
    // One frame so the sections are laid out before we measure.
    const id = requestAnimationFrame(() => jumpTo(slug));
    return () => cancelAnimationFrame(id);
    // Intentionally mount-only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearSearch = () => {
    setQuery("");
    setCollapsedIds(new Set());
    setOpenId(categories[0]?.faqs[0]?._id ?? null);
  };

  // A fresh search starts with all its matches expanded again.
  const onQueryChange = (value: string) => {
    setQuery(value);
    setCollapsedIds(new Set());
  };

  const toggle = (id: string) => {
    if (isSearching) {
      setCollapsedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
      return;
    }
    setOpenId((prev) => (prev === id ? null : id));
  };

  const isItemOpen = (id: string) =>
    isSearching ? !collapsedIds.has(id) : openId === id;

  return (
    <div className="mt-[48px] flex flex-col gap-[40px] md:mt-[56px] lg:flex-row lg:gap-[80px]">
      {/* ---------------- Sidebar ---------------- */}
      <aside className="lg:w-[300px] lg:shrink-0">
        <div className="lg:sticky lg:top-[120px]">
          {/* Search */}
          <div className="relative">
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
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              aria-label="Search questions"
              placeholder="Search questions"
              className="w-full rounded-[8px] border border-[#E3E1DD] bg-white py-[15px] pl-[48px] pr-[42px] text-[15px] text-[#121212] placeholder-[#9A9A9A] transition-colors duration-300 focus:border-[#F99621] focus:outline-hidden motion-reduce:transition-none"
            />
            {isSearching && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-[14px] top-1/2 grid h-[22px] w-[22px] -translate-y-1/2 place-items-center rounded-full bg-[#EFEFEF] text-[#5F5F5F] transition-colors duration-200 hover:bg-[#E2E0DC]"
              >
                <svg
                  aria-hidden="true"
                  className="h-[12px] w-[12px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Live region: search results are otherwise a silent change. */}
          <p aria-live="polite" className="sr-only">
            {isSearching
              ? `${totalMatches} question${totalMatches === 1 ? "" : "s"} match ${query}`
              : ""}
          </p>

          {/* Category nav — vertical on desktop, a pill rail on mobile. */}
          <div className="mt-[20px] lg:hidden">
            <FaqCategoryNav
              items={navItems}
              activeSlug={activeSlug}
              onSelect={jumpTo}
              variant="rail"
              showCounts={isSearching}
            />
          </div>
          <div className="mt-[36px] hidden lg:block">
            <FaqCategoryNav
              items={navItems}
              activeSlug={activeSlug}
              onSelect={jumpTo}
              showCounts={isSearching}
            />
          </div>

          <FaqSupportCard className="mt-[48px] hidden lg:block" />
        </div>
      </aside>

      {/* ---------------- Questions ---------------- */}
      <div className="min-w-0 flex-1">
        {filtered.length === 0 ? (
          <div className="rounded-[14px] border border-[#ECECEC] bg-white px-[24px] py-[56px] text-center">
            <p className="text-[18px] font-medium text-[#121212]">
              No question matches “{query.trim()}”
            </p>
            <p className="mx-auto mt-[10px] max-w-[380px] text-[15px] leading-[170%] text-[#5F5F5F]">
              Try a shorter phrase, or reach out and we’ll answer it directly.
            </p>
            <button
              type="button"
              onClick={clearSearch}
              className="mt-[24px] rounded-[6px] border border-[#E3E1DD] px-[22px] py-[11px] text-[14px] font-medium text-[#121212] transition-colors duration-300 hover:bg-[#F3F2F0]"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[56px] md:gap-[72px]">
            {filtered.map((category) => (
              <section
                key={category._id}
                id={sectionId(category.slug)}
                aria-labelledby={`${sectionId(category.slug)}-label`}
                // Anchor jumps land below the sticky navbar even without JS.
                className="scroll-mt-[132px]"
              >
                <motion.h2
                  id={`${sectionId(category.slug)}-label`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex rounded-full bg-[#E7E7E7] px-[20px] py-[9px] text-[16px] font-medium text-[#121212] md:text-[18px]"
                >
                  {category.title}
                </motion.h2>

                <div className="mt-[20px] flex flex-col gap-[14px] md:mt-[24px]">
                  {category.faqs.map((faq, index) => (
                    <motion.div
                      key={faq._id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        // Cap the stagger so long groups don't trail off.
                        delay: Math.min(index, 5) * 0.06,
                      }}
                    >
                      <FaqAccordionItem
                        id={faq._id}
                        question={faq.question}
                        answer={faq.answer}
                        query={query}
                        isOpen={isItemOpen(faq._id)}
                        onToggle={() => toggle(faq._id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <FaqSupportCard className="mt-[48px] lg:hidden" />
      </div>
    </div>
  );
}
