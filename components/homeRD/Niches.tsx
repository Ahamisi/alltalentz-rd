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
      className="niche-card group flex w-full max-w-[1161px] items-center rounded-[32px] px-6 py-8 sm:min-h-[422px] sm:px-16 sm:py-14 shadow-[0_12px_28px_-14px_rgba(120,80,10,0.28)] ring-1 ring-black/5"
      style={{ backgroundColor: item.tint ?? "#FBF4E1" }}
    >
      <div className="mx-auto flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-14 sm:text-left">
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
          <h3 className="text-3xl lg:text-[76.71px] font-medium tracking-[-5%] leading-[103.17px] text-neutral-900">
            {item.title}
          </h3>
          {item.tags && (
            <p className="mt-3 text-base text-[#121212] tracking-[-6%] leading-[39.68px] lg:text-[27.62px] sm:text-lg font-normal">
              {item.tags}
            </p>
          )}

          {/* <button
            type="button"
            onClick={() => onExplore(item.path)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:gap-3 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40"
          >
            Explore
            <ArrowIcon className="h-4 w-4" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

// `title`/`subtitle` are accepted for backwards compatibility with existing
// call sites, but the redesigned deck no longer renders a section heading.
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

  // Decide layout mode once mounted (avoids SSR/hydration mismatch).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
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
      // Depth-based layout for the deck. `active` is the fractional index of
      // the front-most card; every card is placed continuously relative to it,
      // so there are no jumps as the scrubbed value sweeps through.
      const MAX_BEHIND = 3; // how many stacked cards peek behind the front one

      const render = (active: number) => {
        cards.forEach((el, i) => {
          const d = i - active; // <0 = leaving, 0 = front, >0 = waiting behind
          let yPercent: number;
          let scale: number;
          let opacity: number;
          let rotation: number;
          let zIndex: number;

          if (d < 0) {
            // Front card exiting: eases down + forward and fades out.
            const t = Math.min(-d, 1);
            const e = t * t * (3 - 2 * t); // smoothstep
            yPercent = e * 70;
            scale = 1 + e * 0.05;
            rotation = e * -3;
            opacity = 1 - e;
            zIndex = 400 - i; // stays on top while it slides away
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

        // Side progress rail.
        const current = Math.round(active);
        progressRef.current.forEach((dot, i) => {
          if (!dot) return;
          gsap.set(dot, {
            scaleY: i === current ? 1 : 0.35,
            opacity: i === current ? 1 : 0.4,
          });
        });
      };

      // Continuous, ambient float for every illustration — independent of the
      // scroll so the icons always feel alive.
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

      if (reduce) {
        // Reduced motion: no pin/scrub — just lay the cards out readably.
        render(0);
        return;
      }

      // Drive `proxy.p` from 0 → 1 across the pinned scroll distance. Using a
      // scrubbed tween (not raw scroll) means ScrollTrigger interpolates the
      // playhead for us — the source of the smoothness.
      const proxy = { p: 0 };
      render(0);

      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => render(proxy.p * (n - 1)),
        scrollTrigger: {
          trigger: pinRef.current,
          // Lock the deck the moment its centre reaches the viewport centre,
          // so it sits dead-centre on screen — never a half-empty viewport.
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

    // Fonts/images settling can shift measurements — recalc once ready.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [isDesktop, n]);

  /* ----------------------------- Mobile / list ---------------------------- */
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

  /* ----------------------------- Desktop / deck --------------------------- */
  return (
    <section ref={sectionRef} className="relative bg-white">
      <div
        ref={pinRef}
        className="relative flex h-160 w-full flex-col items-center justify-center"
      >
        {/* Deck */}
        <div className="relative z-10 flex w-full items-center justify-center px-4">
          <div className="relative h-[422px] w-full max-w-[1161px]">
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

        {/* Progress rail */}
        <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
          {niches.map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                progressRef.current[i] = el;
              }}
              className="block h-8 w-1 origin-center rounded-full bg-secondary"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default NicheSection;
