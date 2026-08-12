"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { niches, type NicheItemProp } from "./niches-data";
export { niches };

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 12h14M13 6l6 6-6 6"
    />
  </svg>
);

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
      className="niche-card group flex w-full max-w-[1161px] items-center rounded-[24px] px-5 py-8 sm:rounded-[32px] sm:min-h-[422px] sm:px-10 sm:py-14 lg:px-16 lg:h-full lg:min-h-0 ring-1 ring-black/5"
      style={{ backgroundColor: item.tint ?? "#FBF4E1" }}
    >
      <div className="mx-auto flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-14 sm:text-left">
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
          <h3 className="text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.1] lg:text-[66.71px] lg:leading-[1.15] font-medium tracking-[-5%] text-neutral-900">
            {item.title}
          </h3>
          {item.tags && (
            <p className="mt-3 text-base leading-relaxed text-[#121212] tracking-[-6%] sm:text-lg lg:text-[27.62px] lg:leading-[1.45] font-normal">
              {item.tags}
            </p>
          )}

          <button
            type="button"
            onClick={() => onExplore(item.path)}
            aria-label={`Explore ${item.title}`}
            className="mt-6 inline-flex items-center gap-2 bg-[#F99621] px-8 py-3 text-base font-semibold text-[#121212] transition-all duration-300 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 sm:px-10 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100"
          >
            Explore
            <ArrowIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const NicheSection = ({}: {
  title?: string;
  subtitle?: string;
}) => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  const onExplore = (path: string) => router.push(path);

  const n = niches.length;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

      // Positions every card from one number: `active` is the fractional index
      // of the front card (2.4 = card 2 is 40% of the way out). Called on every
      // scroll frame, so the deck moves continuously instead of snapping.
      const render = (active: number) => {
        const front = Math.round(active);

        cards.forEach((el, i) => {
          // Distance from the front. Negative = already leaving, 0 = front,
          // positive = still waiting in the stack.
          const d = i - active;
          let yPercent: number;
          let scale: number;
          let opacity: number;
          let rotation: number;
          let zIndex: number;

          if (d < 0) {
            // Leaving: slide down, grow slightly, tilt and fade out.
            // t goes 0 -> 1 as it exits; e is t eased with a smoothstep curve.
            const t = Math.min(-d, 1);
            const e = t * t * (3 - 2 * t);
            yPercent = e * 70;
            scale = 1 + e * 0.05;
            rotation = e * -3;
            opacity = 1 - e;
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
            // deck while it fades, so without this a click could hit that one.
            pointerEvents: i === front ? "auto" : "none",
          });
        });

        // Highlight the rail dot for whichever card is at the front.
        const current = front;
        progressRef.current.forEach((dot, i) => {
          if (!dot) return;
          gsap.set(dot, {
            scaleY: i === current ? 1 : 0.35,
            opacity: i === current ? 1 : 0.4,
          });
        });
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

      // Reduced motion: show the first card and skip the pin entirely.
      if (reduce) {
        render(0);
        return;
      }

      // Scroll drives `proxy.p` from 0 to 1, and that maps onto card 0 -> last.
      // Animating a plain object (rather than reading scroll directly) lets
      // ScrollTrigger's scrub smooth the value for us.
      const proxy = { p: 0 };
      render(0);

      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => render(proxy.p * (n - 1)),
        scrollTrigger: {
          trigger: pinRef.current,
          // Pin once the deck is centred, and hold it for ~35vh per card.
          start: "center center",
          end: () => `+=${window.innerHeight * (n - 1) * 0.35}`,
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    // Fonts and images settling change the measurements, so recalculate once
    // the page has finished loading.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [isDesktop, n]);

  if (!isDesktop) {
    return (
      <section className="relative bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {niches.map((item, i) => (
              <Card key={i} item={item} index={i} onExplore={onExplore} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative bg-white">
      <div
        ref={pinRef}
        className="relative flex h-svh min-h-140 w-full flex-col items-center justify-center"
      >
        <div className="relative z-10 flex w-full items-center justify-center px-4">
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

        <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 xl:right-8">
          {niches.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                progressRef.current[i] = el;
              }}
              className="block h-8 w-1 origin-center rounded-full bg-[#F99621]"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default NicheSection;
