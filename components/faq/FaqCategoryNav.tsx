"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Category navigation, in two shapes:
 *
 *  - `list` — the desktop sidebar rail. The active item is marked by a single
 *    orange underline that *glides* between items — one absolutely positioned
 *    bar animated to the measured offset of the active row, rather than each
 *    item toggling its own border.
 *  - `rail` — a horizontally scrolling pill row on mobile, where a tall vertical
 *    list would push the questions off the first screen. The active pill is
 *    always scrolled into view, including when scroll-spy (not a tap) moved it.
 *
 * Both variants are plain buttons that hand the jump back to the parent, which
 * owns the Lenis scroll.
 */
export type FaqNavItem = {
  slug: string;
  title: string;
  /** Number of questions currently matching the search. */
  count: number;
};

type FaqCategoryNavProps = {
  items: FaqNavItem[];
  activeSlug: string;
  onSelect: (slug: string) => void;
  variant?: "list" | "rail";
  /** Show per-category match counts (only useful while searching). */
  showCounts?: boolean;
};

export default function FaqCategoryNav({
  items,
  activeSlug,
  onSelect,
  variant = "list",
  showCounts = false,
}: FaqCategoryNavProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState({ y: 0, ready: false });

  // The desktop underline is positioned from the active row's own box rather
  // than rendered inside it. A `layoutId` shared element only animates when the
  // two copies are mounted in the same commit, which the rail/list pair of navs
  // doesn't guarantee — measuring makes the indicator follow `activeSlug`
  // unconditionally, on click and on scroll-spy alike.
  useEffect(() => {
    if (variant !== "list") return;
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const row = list.querySelector<HTMLElement>(
        `[data-slug="${CSS.escape(activeSlug)}"]`
      );
      if (!row) return;
      // Sit just above the row's baseline, matching the old bottom-[6px].
      setIndicator({ y: row.offsetTop + row.offsetHeight - 8, ready: true });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeSlug, variant, items]);

  // Keep the active pill visible as the user scrolls the page.
  useEffect(() => {
    if (variant !== "rail") return;
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.querySelector<HTMLElement>("[data-active='true']");
    if (!active) return;
    rail.scrollTo({
      left: active.offsetLeft - rail.clientWidth / 2 + active.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [activeSlug, variant]);

  if (variant === "rail") {
    return (
      <div
        ref={railRef}
        role="group"
        aria-label="Jump to FAQ category"
        className="faq-rail -mx-[24px] flex snap-x snap-mandatory gap-[8px] overflow-x-auto px-[24px] py-[4px]"
      >
        {items.map((item) => {
          const isActive = item.slug === activeSlug;
          return (
            <button
              key={item.slug}
              type="button"
              data-active={isActive}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onSelect(item.slug)}
              className={`relative shrink-0 snap-start rounded-full px-[18px] py-[10px] text-[14px] font-medium whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621] motion-reduce:transition-none ${
                isActive ? "text-[#121212]" : "text-[#6B6B6B] hover:text-[#121212]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="faq-nav-rail-pill"
                  className="absolute inset-0 rounded-full bg-[#F1EFEC]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">
                {item.title}
                {showCounts && (
                  <span className="ml-[6px] text-[12px] text-[#8A8A8A]">
                    {item.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <nav aria-label="FAQ categories">
      <ul ref={listRef} className="relative flex flex-col">
        {/* The single moving indicator, driven off the measured active row. */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[2px] w-[74px] rounded-full bg-[#F99621]"
          initial={false}
          animate={{ y: indicator.y, opacity: indicator.ready ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
        {items.map((item) => {
          const isActive = item.slug === activeSlug;
          return (
            <li key={item.slug} data-slug={item.slug} className="relative">
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(item.slug)}
                className={`group relative flex w-full items-center justify-between gap-[10px] py-[13px] text-left text-[16px] transition-[color,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621] motion-reduce:transition-none ${
                  isActive
                    ? "font-semibold text-[#121212]"
                    : "text-[#6B6B6B] hover:translate-x-[2px] hover:text-[#121212]"
                }`}
              >
                <span>{item.title}</span>
                {showCounts && (
                  <span
                    className={`text-[13px] tabular-nums ${
                      isActive ? "text-[#F99621]" : "text-[#A0A0A0]"
                    }`}
                  >
                    {item.count}
                  </span>
                )}

              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
