"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { globalTalentz, type Talent } from "@/lib/global-talentz";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_BG = "#FDF3E2";
const CARD_LINE = "#E39B3E";
const RULE = "#EDA94D";
const MUTED = "#8E8E8E";

/* -------------------------------- rating -------------------------------- */

const STAR_PATH =
  "M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.47L12 17.43l-5.8 3.05 1.1-6.47-4.69-4.58 6.49-.95L12 2.6z";

/**
 * Five stars with a single clipped overlay, so any fractional rating (4.5, 3.7)
 * renders exactly — no separate "half star" glyph to keep in sync.
 */
const Stars = ({ rating }: { rating: number }) => {
  const pct = `${(Math.max(0, Math.min(5, rating)) / 5) * 100}%`;

  const row = (fill: string) => (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-[22px] w-[22px] shrink-0 lg:h-[26px] lg:w-[26px]"
          fill={fill}
          aria-hidden
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );

  return (
    <div
      className="relative inline-block w-fit"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {row("#E7D7BB")}
      {/* Overlay is absolutely positioned over an identical row and clipped to
          the rating width; overflow-hidden does the partial fill. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: pct }}
      >
        {row("#F5B822")}
      </div>
    </div>
  );
};

/* --------------------------------- card --------------------------------- */

const Row = ({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) => (
  <div
    className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t py-3 lg:py-[14px]"
    style={{ borderColor: RULE }}
  >
    <span
      className="text-[16px] leading-[1.4] sm:text-[18px] lg:text-[22px]"
      style={{ color: MUTED }}
    >
      {label}
    </span>
    {children}
  </div>
);

const Card = ({
  talent,
  index,
  cardRef,
  avatarRef,
}: {
  talent: Talent;
  index: number;
  cardRef?: (el: HTMLDivElement | null) => void;
  avatarRef?: (el: HTMLDivElement | null) => void;
}) => (
  <article
    ref={cardRef}
    className="talent-card flex w-full max-w-[1180px] items-center rounded-[28px] border-2 p-5 shadow-[0_18px_40px_-24px_rgba(120,80,10,0.35)] sm:rounded-[36px] sm:p-8 lg:min-h-[580px] lg:p-[44px]"
    style={{ backgroundColor: CARD_BG, borderColor: CARD_LINE }}
  >
    <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:gap-8 lg:gap-[48px]">
      {/* Avatar */}
      <div
        ref={avatarRef}
        className="relative aspect-4/5 w-full shrink-0 overflow-hidden rounded-[16px] sm:w-[38%] sm:max-w-[400px] sm:rounded-[20px]"
      >
        <Image
          src={talent.avatar}
          alt={`Portrait of ${talent.name}`}
          fill
          sizes="(max-width: 640px) 90vw, 400px"
          className="object-cover"
          priority={index < 2}
        />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-[#121212] sm:text-[38px] lg:text-[52px]">
          {talent.name}
        </h3>

        <p
          className="mt-2 text-[17px] leading-[1.4] sm:text-[19px] lg:mt-4 lg:text-[24px]"
          style={{ color: MUTED }}
        >
          {talent.role}
        </p>

        <div className="mt-3 lg:mt-4">
          <Stars rating={talent.rating} />
        </div>

        <p
          className="mt-3 mb-4 text-[16px] leading-[1.4] sm:text-[18px] lg:mt-4 lg:mb-6 lg:text-[22px]"
          style={{ color: MUTED }}
        >
          {talent.languages.join(", ")}
        </p>

        <Row label={`Industry: ${talent.industry}`} />
        <Row label={`Experience: ${talent.experience}`} />
        <Row label="Hobbies:">
          <div className="flex flex-wrap gap-2">
            {talent.hobbies.map((hobby) => (
              <span
                key={hobby}
                className="rounded-full bg-[#F0A24B] px-3 py-[6px] text-[13px] font-medium leading-none text-white sm:text-[14px] lg:px-4 lg:py-2 lg:text-[16px]"
              >
                {hobby}
              </span>
            ))}
          </div>
        </Row>
      </div>
    </div>
  </article>
);

/* --------------------------------- deck ---------------------------------- */

/**
 * Scroll-scrubbed card deck of talent profiles — the same mechanic as the
 * homepage niche deck: the section pins, and a single tween drives a fractional
 * "active index" so every card is positioned continuously against it (no
 * per-card timelines, so nothing can jump when the scrub reverses).
 *
 * Below `md` the pin is dropped entirely and the cards render as a plain list.
 */
const TalentDeck = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  const n = globalTalentz.length;

  // Layout mode is decided after mount so SSR and first client render match.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const avatars = avatarRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const MAX_BEHIND = 3; // how many stacked cards peek above the front one

      const render = (active: number) => {
        cards.forEach((el, i) => {
          const d = i - active; // <0 leaving, 0 front, >0 waiting behind
          let yPercent: number;
          let scale: number;
          let opacity: number;
          let rotation: number;
          let zIndex: number;

          if (d < 0) {
            // Front card exiting: slides down and forward, fading out.
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
            yPercent = -dd * 4.5;
            scale = 1 - dd * 0.045;
            rotation = 0;
            opacity = d > MAX_BEHIND ? Math.max(0, 1 - (d - MAX_BEHIND)) : 1;
            zIndex = 300 - Math.round(dd * 10);
          }

          gsap.set(el, { yPercent, scale, rotation, opacity, zIndex });
        });

        const current = Math.round(active);
        progressRef.current.forEach((dot, i) => {
          if (!dot) return;
          gsap.set(dot, {
            scaleY: i === current ? 1 : 0.35,
            opacity: i === current ? 1 : 0.4,
          });
        });
      };

      // Ambient float on the portraits so the deck never sits fully still.
      if (!reduce) {
        avatars.forEach((el, i) => {
          gsap.to(el, {
            y: -8,
            duration: 2.6 + (i % 3) * 0.35,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        });
      }

      if (reduce) {
        render(0);
        return;
      }

      // Drive `proxy.p` 0 → 1 across the pinned distance; ScrollTrigger
      // interpolates the playhead, which is where the smoothness comes from.
      const proxy = { p: 0 };
      render(0);

      gsap.to(proxy, {
        p: 1,
        ease: "none",
        onUpdate: () => render(proxy.p * (n - 1)),
        scrollTrigger: {
          trigger: pinRef.current,
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

    // Fonts/images settling shift measurements — recalc once they're in.
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
      <section className="relative bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {globalTalentz.map((talent, i) => (
              <Card key={talent.name} talent={talent} index={i} />
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
        className="relative flex h-[100svh] min-h-[680px] w-full flex-col items-center justify-center"
      >
        <div className="relative z-10 flex w-full items-center justify-center px-6">
          <div className="relative h-[580px] w-full max-w-[1180px]">
            {globalTalentz.map((talent, i) => (
              <div
                key={talent.name}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
                style={{ transformOrigin: "50% 50%" }}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <Card
                  talent={talent}
                  index={i}
                  avatarRef={(el) => {
                    avatarRefs.current[i] = el;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
          {globalTalentz.map((talent, i) => (
            <span
              key={talent.name}
              ref={(el) => {
                progressRef.current[i] = el;
              }}
              // Explicit hex, not `bg-secondary`: the theme's `--color-secondary`
              // is re-declared as near-white further down globals.css, so the
              // utility renders invisible against the white section.
              className="block h-8 w-1 origin-center rounded-full bg-[#F99621]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TalentDeck;
