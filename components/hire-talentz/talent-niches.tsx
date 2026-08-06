"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { niches, type NicheItemProp } from "@/components/homeRD/niches-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Find the right talent for your industry" — niche deck with a synced tab bar.
 *
 * Reuses the scroll-driven, pinned card-deck mechanics from the home page
 * (components/homeRD/Niches.tsx): a scrubbed proxy value 0→1 drives a
 * continuous depth layout so cards stack/peel with no jumps.
 *
 * The tab bar sits above the deck and stays in sync in *both* directions:
 *   • scrolling advances the deck and highlights the matching tab, and
 *   • clicking a tab scrolls the page so that tab's card comes to the front.
 */

/** Short label shown in the tab bar for each niche (design uses one/two words). */
const TAB_LABELS = [
  "Tech",
  "Healthcare",
  "Finance",
  "Construction",
  "Legal",
  "Pest Control",
];

const Card = ({
  item,
  index,
  cardRef,
  iconRef,
  onExplore,
}: {
  item: NicheItemProp;
  index: number;
  cardRef?: (el: HTMLDivElement | null) => void;
  iconRef?: (el: HTMLDivElement | null) => void;
  onExplore: (path: string) => void;
}) => {
  return (
    /*
      md:h-full is load-bearing on desktop: the deck stacks cards with
      percentage offsets of each card's *own* box, so a card that grows with its
      content (the two-line "Construction & Restoration" title was 490px vs
      422px for the rest) breaks the concentric stack and sits visibly out of
      line. Every card is therefore sized by the deck slot, not by its content.
    */
    <div
      ref={cardRef}
      className="niche-card group flex w-full max-w-[1161px] items-center rounded-[32px] px-6 py-8 sm:min-h-[422px] sm:px-16 sm:py-14 md:h-full md:min-h-0 ring-1 ring-black/5"
      style={{ backgroundColor: item.tint ?? "#FBF4E1" }}
    >
      <div className="mx-auto flex w-full flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-14 sm:text-left">
        {/* Illustration */}
        <div
          ref={iconRef}
          className="relative shrink-0 h-40 w-40 sm:h-64 sm:w-64 lg:h-72 lg:w-72 will-change-transform"
          style={{ transformOrigin: "50% 60%" }}
        >
          {item.icon && (
            <Image
              src={item.icon}
              alt=""
              fill
              sizes="288px"
              className="object-contain select-none pointer-events-none drop-shadow-[0_18px_20px_rgba(120,80,10,0.18)]"
              priority={index < 2}
            />
          )}
        </div>

        {/* Copy */}
        <div className="max-w-xl">
          {/* leading is relative, not a fixed 103px — a two-line title has to
              fit the fixed card height without overflowing it. */}
          <h3 className="text-3xl lg:text-[76.71px] font-medium tracking-[-5%] leading-tight lg:leading-[1.1] text-neutral-900">
            {item.title}
          </h3>
          {item.tags && (
            <p className="mt-3 text-base text-[#121212] tracking-[-6%] leading-relaxed lg:leading-[39.68px] lg:text-[27.62px] sm:text-lg font-normal">
              {item.tags}
            </p>
          )}

          <button
            type="button"
            onClick={() => onExplore(item.path)}
            className="mt-8 inline-flex items-center justify-center bg-[#F99621] px-10 py-3 text-base font-semibold text-[#121212] transition-all duration-300 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  Tab bar                                   */
/* -------------------------------------------------------------------------- */

const TabBar = ({
  active,
  onSelect,
  className = "",
}: {
  active: number;
  onSelect: (i: number) => void;
  className?: string;
}) => (
  <div
    role="tablist"
    aria-label="Talent industries"
    className={`flex w-full items-center gap-2 max-w-[1054px] rounded-full border border-black/5 bg-transparent p-2 ${className}`}
  >
    {TAB_LABELS.map((label, i) => {
      const isActive = i === active;
      return (
        <button
          key={label}
          role="tab"
          aria-selected={isActive}
          type="button"
          onClick={() => onSelect(i)}
          className={`flex-1 whitespace-nowrap rounded-full px-5 py-2.5 text-center text-sm font-normal tracking-[0%] lg:text-[24.3px] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621]/60 sm:text-base ${
            isActive
              ? "bg-[#F99621] text-[#121212]"
              : "bg-[#F6F3EF] text-[#121212] hover:bg-[#ECECEC]"
          }`}
        >
          {label}
        </button>
      );
    })}
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                  Section                                   */
/* -------------------------------------------------------------------------- */

const TalentNiches = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  // Exposed so tab clicks can position the deck directly when there is no
  // scrub to ride (reduced motion).
  const renderRef = useRef<((active: number) => void) | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);

  const onExplore = (path: string) => router.push(path);
  const n = niches.length;

  // Decide layout mode once mounted (avoids SSR/hydration mismatch).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Click a tab → scroll the page so that card comes to the front of the deck.
  const goToIndex = (i: number) => {
    const st = stRef.current;
    if (!st || n < 2) {
      // No scrub to ride (reduced motion): place the deck directly instead.
      setActive(i);
      activeRef.current = i;
      renderRef.current?.(i);
      return;
    }
    const p = i / (n - 1);
    const target = st.start + (st.end - st.start) * p;

    // Lenis owns the scroll position when smoothing is on; a native scrollTo
    // would be overridden by its running animation on the next frame.
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 0.9 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    if (!isDesktop) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const MAX_BEHIND = 3; // how many stacked cards peek behind the front one

      const render = (activeVal: number) => {
        cards.forEach((el, i) => {
          const d = i - activeVal; // <0 = leaving, 0 = front, >0 = waiting behind
          let yPercent: number;
          let scale: number;
          let opacity: number;
          let rotation: number;
          let zIndex: number;

          if (d < 0) {
            // Card leaving the front: peels off the top of the deck and slides
            // down out of frame, in front of the stack.
            //
            // Two things keep it from ghosting. It stays *opaque* while it
            // overlaps the deck — cross-fading it over the next card shows two
            // near-identical layouts a few pixels apart, which reads as a
            // double-exposed card rather than a transition. And the travel is
            // eased-out and long enough (125%) to clear the deck early, so the
            // fade lands in the last quarter when the card is already off-frame.
            const t = Math.min(-d, 1);
            const e = 1 - (1 - t) * (1 - t); // ease-out: leaves briskly
            const f = Math.min(1, Math.max(0, (t - 0.75) / 0.25));
            yPercent = e * 125;
            scale = 1 + e * 0.03;
            rotation = e * -3;
            opacity = 1 - f * f * (3 - 2 * f);
            zIndex = 400 - i; // in front of the deck while it slides away
          } else {
            // Cards resting in the stack, peeking above the front one.
            const dd = Math.min(d, MAX_BEHIND);
            yPercent = -dd * 5.5;
            scale = 1 - dd * 0.05;
            rotation = 0;
            opacity = d > MAX_BEHIND ? Math.max(0, 1 - (d - MAX_BEHIND)) : 1;
            zIndex = 300 - Math.round(dd * 10);
          }

          gsap.set(el, { yPercent, scale, rotation, opacity, zIndex });
        });

        // Keep the tab bar in sync with the front-most card. The leaving card
        // owns the front of the deck until it has mostly cleared it, so the
        // highlight flips at the halfway point.
        const current = Math.round(activeVal);
        if (current !== activeRef.current) {
          activeRef.current = current;
          setActive(current);
        }
      };

      // Continuous, ambient float for every illustration.
      if (!reduce) {
        icons.forEach((icon, i) => {
          gsap.to(icon, {
            y: -14,
            rotation: i % 2 === 0 ? 4 : -4,
            duration: 2.6 + (i % 3) * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      }

      renderRef.current = render;

      if (reduce) {
        // No pin/scrub — the tab bar becomes the only way to drive the deck,
        // so start on whichever card is currently selected.
        render(activeRef.current);
        return;
      }

      const proxy = { p: 0 };
      render(0);

      const tween = gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => render(proxy.p * (n - 1)),
        scrollTrigger: {
          trigger: pinRef.current,
          // "top top" — the pinned block's top is always the viewport top, so
          // the nav-height padding below is a reliable offset. With
          // "center center" the pinned top is (vh - blockHeight) / 2, which goes
          // negative on short viewports and drags the tab bar under the navbar.
          start: "top top",
          end: () => `+=${window.innerHeight * (n - 1) * 0.4}`,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      stRef.current = tween.scrollTrigger ?? null;
    }, sectionRef);

    // Fonts/images settling can shift measurements — recalc once ready.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      stRef.current = null;
      renderRef.current = null;
      ctx.revert();
    };
  }, [isDesktop, n]);

  /* ----------------------------- Mobile / list ---------------------------- */
  if (!isDesktop) {
    const item = niches[active];
    return (
      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Scrollable tab bar */}
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabBar active={active} onSelect={setActive} className="w-max" />
          </div>

          {/* Selected card */}
          <div className="mt-8">
            <Card
              key={active}
              item={item}
              index={active}
              onExplore={onExplore}
            />
          </div>
        </div>
      </section>
    );
  }

  /* ----------------------------- Desktop / deck --------------------------- */
  return (
    <section ref={sectionRef} className="relative bg-white">
      {/*
        The pinned block is fixed to the top of the viewport for the whole scrub
        (see start: "top top"), and the sticky navbar overlaps it, so the block
        reserves the navbar's height with pt-nav — the same --spacing-nav token
        the navbar sizes itself from. min-h is deliberately absent: a block
        taller than the viewport can't be pinned flush to the top.
      */}
      <div
        ref={pinRef}
        className="relative flex h-svh w-full flex-col items-center pt-nav"
      >
        {/* Tab bar */}
        <div className="relative z-20 w-full px-4 pt-8 pb-10">
          <div className="flex justify-center">
            <TabBar active={active} onSelect={goToIndex} />
          </div>
        </div>

        {/* Deck. The slot height is fixed and every card fills it, so the stack
            stays concentric whatever the copy length. */}
        <div className="relative z-10 flex min-h-0 flex-1 w-full items-center justify-center px-4 pb-8">
          <div className="relative h-[470px] max-h-full w-full max-w-[1161px]">
            {niches.map((item, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
                style={{ transformOrigin: "50% 50%" }}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <Card
                  item={item}
                  index={i}
                  iconRef={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  onExplore={onExplore}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentNiches;
