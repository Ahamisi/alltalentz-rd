"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "The Talent Edge" — newsletter sign-up block that sits directly beneath the
 * blog grid: a cream card (copy on the left, a black subscribe panel on the
 * right) floating on white, ringed with hand-drawn doodles.
 *
 * The doodle SVGs in public/v26-images are *filled* shapes rather than stroked
 * outlines, so a self-drawing reveal isn't possible; each is treated as a whole
 * unit — a staggered pop-in on scroll, then a de-synchronised float loop plus a
 * per-doodle character beat (twinkle / pulse / spin / sway), same approach as
 * BlogHero and ReadyToBuild.
 *
 * Submitting hands off to the Substack-hosted newsletter with the address
 * pre-filled, which is where the footer sign-up already points.
 */
type DoodleMotion = "twinkle" | "pulse" | "spin" | "sway";

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  motion?: DoodleMotion;
  hideOnMobile?: boolean;
};

const SUBSCRIBE_URL = "https://blog.alltalentz.com/subscribe";

// left/top are percentages of the section; each doodle is centred on its point.
const DOODLES: Doodle[] = [
  // green swirl-cluster, upper left
  {
    src: "/v26-images/our-solutions/doodles/5.svg",
    w: 62,
    h: 39,
    left: "13%",
    top: "17%",
    motion: "sway",
  },
  // purple double-exclamation, top centre
  {
    src: "/v26-images/home/cta-doodle/1.svg",
    w: 39,
    h: 74,
    left: "48%",
    top: "10%",
    motion: "pulse",
  },
  // yellow sparkles, upper right
  {
    src: "/v26-images/home/cta-doodle/7.svg",
    w: 81,
    h: 104,
    left: "85%",
    top: "15%",
    motion: "twinkle",
    hideOnMobile: true,
  },
  // red hash, lower left
  {
    src: "/v26-images/agency/1.svg",
    w: 56,
    h: 58,
    left: "14%",
    top: "70%",
    motion: "sway",
  },
  // green atom swirl, bottom centre-right
  {
    src: "/v26-images/home/cta-doodle/2.svg",
    w: 78,
    h: 67,
    left: "51%",
    top: "71%",
    motion: "spin",
  },
  // red spark-burst, bottom centre-left
  {
    src: "/v26-images/home/cta-doodle/3.svg",
    w: 74,
    h: 83,
    left: "38%",
    top: "92%",
    motion: "twinkle",
    hideOnMobile: true,
  },
  // red speech bubble with heart, lower right
  {
    src: "/v26-images/home/cta-doodle/6.svg",
    w: 116,
    h: 117,
    left: "83%",
    top: "82%",
    motion: "pulse",
    hideOnMobile: true,
  },
];

export default function NewsletterCta() {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide everything animated before first paint so the entrance always plays
  // from scratch (no flash of fully-visible content).
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".nl-reveal", { autoAlpha: 0, y: 28 });
      gsap.set(".nl-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Card + copy rise and fade in.
      tl.to(".nl-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Doodles pop in around it with a little overshoot.
      tl.to(
        ".nl-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.09, from: "random" },
        },
        "-=0.5"
      );

      // Idle float + wobble — de-synchronised so it never looks mechanical.
      gsap.utils.toArray<HTMLElement>(".nl-doodle-float").forEach((node) => {
        gsap.to(node, {
          y: gsap.utils.random(-12, -6),
          rotate: gsap.utils.random(-6, 6),
          duration: gsap.utils.random(2.4, 3.8),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.9),
        });
      });

      // Sparkles: quick shrink/fade twinkle.
      gsap.utils.toArray<HTMLElement>(".nl-motion-twinkle").forEach((node) => {
        gsap.to(node, {
          scale: gsap.utils.random(0.8, 0.88),
          opacity: gsap.utils.random(0.6, 0.85),
          rotate: gsap.utils.random(-14, 14),
          duration: gsap.utils.random(0.9, 1.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.6),
        });
      });

      // Exclamation / bubble: a rhythmic "hey, look" pulse.
      gsap.utils.toArray<HTMLElement>(".nl-motion-pulse").forEach((node) => {
        gsap.to(node, {
          scale: gsap.utils.random(1.08, 1.16),
          opacity: 0.78,
          duration: gsap.utils.random(1.1, 1.6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.8),
        });
      });

      // Atom swirl: a lazy full rotation.
      gsap.utils.toArray<HTMLElement>(".nl-motion-spin").forEach((node) => {
        gsap.to(node, {
          rotate: 360,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      });

      // Hash / cluster: a gentle side-to-side sway.
      gsap.utils.toArray<HTMLElement>(".nl-motion-sway").forEach((node) => {
        gsap.to(node, {
          x: gsap.utils.random(-8, -4),
          rotate: gsap.utils.random(-10, -4),
          duration: gsap.utils.random(2, 3.2),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.7),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [inView, prefersReduced]);

  const setRefs = (node: HTMLElement | null) => {
    rootRef.current = node;
    inViewRef(node);
  };

  return (
    <section
      ref={setRefs}
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[120px] md:py-[180px]"
    >
      {/* Decorative doodles */}
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 scale-[0.6] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="nl-doodle-enter">
            <div className="nl-doodle-float">
              <Image
                src={doodle.src}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className={doodle.motion ? `nl-motion-${doodle.motion}` : undefined}
                style={{ transformOrigin: "center", height: "auto" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="nl-reveal rounded-[27px] bg-[#FEF5E9] px-[28px] py-[40px] md:px-[64px] md:py-[56px]">
          <div className="grid grid-cols-1 items-center gap-[36px] md:grid-cols-2 md:gap-[56px]">
            {/* Copy */}
            <div className="text-center md:text-left">
              <h2 className="text-[34px] leading-[1.05] text-center tracking-[-3%] font-semibold text-[#121212] sm:text-[44px] lg:text-[54px]">
                The Talent Edge
              </h2>
              <p className="mt-[16px] text-center text-[16px] leading-[25.86px] font-normal text-[#121212] md:text-[18px]">
                Quarterly insights for operators and business leaders.
              </p>
            </div>

            {/* Subscribe panel */}
            <form
              action={SUBSCRIBE_URL}
              method="get"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#121212] p-[24px] md:p-[28px]"
            >
              <label
                htmlFor="talent-edge-email"
                className="block text-[15px] font-medium text-white"
              >
                Email
              </label>
              <input
                id="talent-edge-email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
                autoComplete="email"
                className="mt-[12px] w-full border-b border-white bg-transparent pb-[8px] text-[16px] text-white placeholder:text-white/40 focus:border-[#F99621] focus:outline-hidden"
              />
              <button
                type="submit"
                className="mt-[24px] block w-full bg-[#F99621] py-[14px] text-center text-[16px] font-medium text-white transition-colors duration-300 hover:bg-[#e8871a]"
              >
                Subscribe to The Talent Edge
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
