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
    <div
      ref={cardRef}
      className="niche-card group flex w-full max-w-[1161px] items-center rounded-[32px] px-6 py-8 sm:min-h-[422px] sm:px-16 sm:py-14 md:h-full md:min-h-0 ring-1 ring-black/5"
      style={{ backgroundColor: item.tint ?? "#FBF4E1" }}
    >
      <div className="mx-auto flex w-full flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-14 sm:text-left">
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

        <div className="max-w-xl">
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

const TalentNiches = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const renderRef = useRef<((active: number) => void) | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(0);

  const onExplore = (path: string) => router.push(path);
  const n = niches.length;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Clicking a tab scrolls the page to the point where that card is at the
  // front of the deck, and the scroll animation moves the deck from there.
  const goToIndex = (i: number) => {
    const st = stRef.current;
    // No pinned scroll to ride (reduced motion): place the deck directly.
    if (!st || n < 2) {
      setActive(i);
      activeRef.current = i;
      renderRef.current?.(i);
      return;
    }
    // Card index -> a scroll position inside the pinned range.
    const p = i / (n - 1);
    const target = st.start + (st.end - st.start) * p;

    // Lenis owns the scroll position, so a native scrollTo would be overridden.
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
      // How many cards stay visible behind the front one.
      const MAX_BEHIND = 3;

      // Positions every card from one number: `activeVal` is the fractional
      // index of the front card (2.4 = card 2 is 40% of the way out). Called on
      // every scroll frame, so the deck moves continuously instead of snapping.
      const render = (activeVal: number) => {
        const front = Math.round(activeVal);

        cards.forEach((el, i) => {
          // Distance from the front. Negative = already leaving, 0 = front,
          // positive = still waiting in the stack.
          const d = i - activeVal;
          let yPercent: number;
          let scale: number;
          let opacity: number;
          let rotation: number;
          let zIndex: number;

          if (d < 0) {
            // Leaving: slides 125% down and off screen, eased out so it clears
            // the deck early. t is its exit progress 0 -> 1, e is t eased.
            const t = Math.min(-d, 1);
            const e = 1 - (1 - t) * (1 - t);
            // f delays the fade to the last quarter of the exit, so the card is
            // already off screen before it becomes transparent. Cross-fading it
            // over the near-identical card behind looks like a double exposure.
            const f = Math.min(1, Math.max(0, (t - 0.75) / 0.25));
            yPercent = e * 125;
            scale = 1 + e * 0.03;
            rotation = e * -3;
            opacity = 1 - f * f * (3 - 2 * f);
            zIndex = 400 - i;
          } else {
            // Waiting: each card sits a little higher and smaller than the one
            // in front, which is what gives the stack its depth. Cards further
            // back than MAX_BEHIND fade away.
            const dd = Math.min(d, MAX_BEHIND);
            yPercent = -dd * 5.5;
            scale = 1 - dd * 0.05;
            rotation = 0;
            opacity = d > MAX_BEHIND ? Math.max(0, 1 - (d - MAX_BEHIND)) : 1;
            zIndex = 300 - Math.round(dd * 10);
          }

          gsap.set(el, {
            yPercent,
            scale,
            rotation,
            opacity,
            zIndex,
            // Only the front card takes clicks. The leaving card sits above the
            // deck while it fades, so without this an Explore click could land
            // on the wrong card.
            pointerEvents: i === front ? "auto" : "none",
          });
        });

        // Keep the tab bar highlight on whichever card is at the front.
        if (front !== activeRef.current) {
          activeRef.current = front;
          setActive(front);
        }
      };

      // Each illustration floats up and down forever. Durations differ per icon
      // so they never bob in unison.
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

      // Reduced motion: no pin or scroll animation, so the tab bar is the only
      // way to change cards. Start on whichever one is selected.
      if (reduce) {
        render(activeRef.current);
        return;
      }

      // Scroll drives `proxy.p` from 0 to 1, and that maps onto card 0 -> last.
      // Animating a plain object (rather than reading scroll directly) lets
      // ScrollTrigger's scrub smooth the value for us.
      const proxy = { p: 0 };
      render(0);

      const tween = gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => render(proxy.p * (n - 1)),
        scrollTrigger: {
          trigger: pinRef.current,
          // Pin from the top of the viewport, so the padding below the navbar
          // stays a fixed offset, and hold it for ~40vh per card.
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

    // Fonts and images settling change the measurements, so recalculate once
    // the page has finished loading.
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

  if (!isDesktop) {
    const item = niches[active];
    return (
      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabBar active={active} onSelect={setActive} className="w-max" />
          </div>

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

  return (
    <section ref={sectionRef} className="relative bg-white">
      <div
        ref={pinRef}
        className="relative flex h-svh w-full flex-col items-center pt-nav"
      >
        <div className="relative z-20 w-full px-4 pt-8 pb-10">
          <div className="flex justify-center">
            <TabBar active={active} onSelect={goToIndex} />
          </div>
        </div>

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
