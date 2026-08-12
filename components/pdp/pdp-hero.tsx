"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

/**
 * "Build the skills. Get the placement. Change your career." — PDP hero.
 *
 * Same split treatment as the Outsourcing hero: copy + CTA on the left,
 * programme photo on the right, with a couple of grayscaled hand-drawn doodles
 * floating over the section.
 */
type PdpHeroProps = {
  /** Fires the application flow owned by the page fragment. */
  onApply?: () => void;
};

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  hideOnMobile?: boolean;
};

// left/top are percentages of the section; each doodle is centred on its point.
const DOODLES: Doodle[] = [
  { src: "2.svg", w: 121, h: 79, left: "50%", top: "24%", hideOnMobile: true },
  { src: "3.svg", w: 104, h: 104, left: "40%", top: "88%", hideOnMobile: true },
];

const DOODLE_PATH = "/v26-images/agency/";

const PdpHero = ({ onApply }: PdpHeroProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy + photo before first paint so the entrance always plays from
  // scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".pdp-line-inner", { yPercent: 110 });
      gsap.set(".pdp-hero-para, .pdp-hero-cta", { autoAlpha: 0, y: 20 });
      gsap.set(".pdp-hero-art", { autoAlpha: 0, y: 30, scale: 0.96 });
      gsap.set(".pdp-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".pdp-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Paragraph then button fade up just after the heading settles.
      tl.to(
        ".pdp-hero-para, .pdp-hero-cta",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.35"
      );

      // Photo settles in alongside the copy.
      tl.to(
        ".pdp-hero-art",
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Doodles pop in with a little overshoot, then float on a loop.
      tl.to(
        ".pdp-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.12, from: "random" },
        },
        "-=0.5"
      );

      gsap.utils.toArray<HTMLElement>(".pdp-doodle-float").forEach((node) => {
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
      className="relative overflow-hidden bg-white px-[24px] py-[80px] md:px-[40px] md:py-[120px]"
    >
      {/* Decorative doodles */}
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-[0.7] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="pdp-doodle-enter">
            <div className="pdp-doodle-float">
              <Image
                src={`${DOODLE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className="grayscale"
                style={{ transformOrigin: "center", height: "auto" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-[40px]">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <h1 className="text-[36px] leading-[1.1] tracking-[-3%] font-semibold text-[#121212] sm:text-[48px] lg:text-[60px]">
              {/* pb/-mb: give the clip mask room for descenders without
                  changing the visual line spacing. */}
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="pdp-line-inner block">Build the skills.</span>
              </span>
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="pdp-line-inner block">Get the placement.</span>
              </span>
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="pdp-line-inner block">Change your career.</span>
              </span>
            </h1>

            <p className="pdp-hero-para mt-[24px] max-w-[520px] text-[18px] leading-[25.86px] font-normal text-[#121212] md:text-[20px]">
              The All Talentz Professional Development Programme opens doors to
              real, paid placements with U.S. businesses.
            </p>

            <button
              type="button"
              onClick={onApply}
              className="pdp-hero-cta mt-[32px] inline-flex items-center justify-center bg-[#F99621] px-[40px] py-[16px] text-[18px] font-medium text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#121212] focus-visible:ring-offset-2"
            >
              Apply for next Cohort
            </button>
          </div>

          {/* Programme photo */}
          <div className="order-1 lg:order-2">
            <Image
              src="/v26-images/pdp/hero-img.png"
              alt="A student smiling at her laptop in a university library"
              width={1434}
              height={1476}
              priority
              className="pdp-hero-art mx-auto h-auto w-full max-w-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdpHero;
