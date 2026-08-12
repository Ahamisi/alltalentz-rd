"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_SCROLL_START } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Programme Highlights" — heading on the left, a four-card photo collage on the
 * right, on a white field scattered with the same hand-drawn doodles as
 * ReadyToBuild (already grayscale at #5C5C5C).
 *
 * The collage is a pinwheel, not a plain 2×2: each row splits its width
 * differently and the cards stagger vertically, so on lg+ it's laid out on a
 * 24-column × 4-row grid with explicit spans taken from the design. Below lg it
 * degrades to a simple stack of 4:3 cards.
 *
 * Card 1's warm fade is baked into the artwork; cards 2–4 get their gradient
 * scrims from `overlay` so the label stays readable.
 */
type Highlight = {
  title: string;
  src: string;
  /** CSS gradient painted over the photo; omit when the image already fades. */
  overlay?: string;
  /** Label colour — card 3's scrim is dark, so its text flips to white. */
  dark?: boolean;
  /** lg+ placement on the collage grid: row-start / col-start / row-end / col-end. */
  area: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Industry Specific Training",
    src: "/v26-images/pdp/highlight-1.webp",
    area: "1 / 1 / 4 / 10",
  },
  {
    title: "Real placement Opportunity",
    src: "/v26-images/pdp/highlight-2.webp",
    overlay:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.88) 70.63%)",
    area: "1 / 11 / 2 / 25",
  },
  {
    title: "Certification on completion",
    src: "/v26-images/pdp/highlight-3.webp",
    overlay:
      "linear-gradient(359.37deg, rgba(0, 0, 0, 0.82) 35.33%, rgba(102, 102, 102, 0) 95.13%)",
    dark: true,
    area: "5 / 1 / 6 / 15",
  },
  {
    title: "Mentorship",
    src: "/v26-images/pdp/highlight-4.webp",
    overlay:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.83) 100%)",
    area: "3 / 16 / 6 / 25",
  },
];

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  twinkle?: boolean;
  /** Responsive visibility classes — the collage leaves no room for some of them. */
  show?: string;
};

const DOODLE_PATH = "/v26-images/ready-to-build/";

// left/top position each doodle's centre. Most are percentages of the section —
// they live in the empty margin beside the heading. The two right-hand ones are
// pinned just outside the (capped) container instead, and only appear from 2xl:
// below that the cards reach within a padding's width of the viewport edge and
// there is simply no margin for them to sit in.
const OUTSIDE_CONTAINER_RIGHT = "calc(50% + 690px)";

const DOODLES: Doodle[] = [
  { src: "1.svg", w: 34, h: 32, left: "23%", top: "7%", twinkle: true },
  { src: "3.svg", w: 38, h: 44, left: "78%", top: "5%", show: "hidden md:block" },
  { src: "6.svg", w: 28, h: 42, left: "6%", top: "35%" },
  { src: "2.svg", w: 44, h: 42, left: OUTSIDE_CONTAINER_RIGHT, top: "45%", show: "hidden 2xl:block" },
  { src: "4.svg", w: 46, h: 46, left: "32%", top: "74%", show: "hidden md:block" },
  { src: "5.svg", w: 67, h: 65, left: "10%", top: "89%" },
  {
    src: "7.svg",
    w: 48,
    h: 46,
    left: OUTSIDE_CONTAINER_RIGHT,
    top: "78%",
    twinkle: true,
    show: "hidden 2xl:block",
  },
];

const ProgrammeHighlights = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.set(".ph-reveal", { autoAlpha: 0, y: 28 });
      gsap.set(".ph-doodle-enter", { autoAlpha: 0, scale: 0.4 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: REVEAL_SCROLL_START, once: true },
      });

      tl.to(".ph-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Doodles: staggered pop-in with a little overshoot.
      tl.to(
        ".ph-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.09, from: "random" },
        },
        "-=0.4"
      );

      // Idle float + wobble — de-synchronised so it never looks mechanical.
      gsap.utils.toArray<HTMLElement>(".ph-doodle-float").forEach((node) => {
        gsap.to(node, {
          y: gsap.utils.random(-10, -6),
          rotate: gsap.utils.random(-5, 5),
          duration: gsap.utils.random(2.4, 3.6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.9),
        });
      });

      gsap.utils.toArray<HTMLElement>(".ph-doodle-twinkle").forEach((node) => {
        gsap.to(node, {
          scale: gsap.utils.random(0.82, 0.9),
          opacity: gsap.utils.random(0.65, 0.85),
          duration: gsap.utils.random(0.9, 1.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.6),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      {/* Decorative doodles */}
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 scale-[0.7] md:scale-100 ${
            doodle.show ?? ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="ph-doodle-enter">
            <div className="ph-doodle-float">
              <Image
                src={`${DOODLE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className={doodle.twinkle ? "ph-doodle-twinkle" : undefined}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-[64px]">
          <h2 className="ph-reveal text-[40px] leading-[1.05] tracking-[-0.03em] font-semibold text-[#121212] lg:text-[42px] xl:text-[54px]">
            Programme
            <br className="hidden lg:block" /> Highlights
          </h2>

          {/*
            lg+: 24 equal columns × 5 rows sized from the design so the cards
            pinwheel exactly as mocked. The gutters are dedicated empty tracks
            (column 10 / 15, row 2 / 4) rather than a grid gap — with 24 columns a
            32px gap would add ~736px of gutters and overflow the viewport.
            Below lg the template is ignored and the cards stack.
          */}
          <div className="grid grid-cols-1 gap-[16px] lg:h-[800px] lg:grid-cols-24 lg:grid-rows-[364fr_8fr_152fr_20fr_372fr] lg:gap-0">
            {HIGHLIGHTS.map((card) => (
              <div
                key={card.title}
                className="relative aspect-4/3 overflow-hidden rounded-[16px] lg:aspect-auto lg:h-full lg:[grid-area:var(--area)]"
                style={{ ["--area" as string]: card.area }}
              >
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                {card.overlay && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: card.overlay }}
                  />
                )}
                <h3
                  className={`absolute bottom-[24px] left-[24px] right-[24px] max-w-[240px] text-[18px] leading-[1.3] font-bold md:text-[20px] ${
                    card.dark ? "text-white" : "text-[#121212]"
                  }`}
                >
                  {card.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammeHighlights;
