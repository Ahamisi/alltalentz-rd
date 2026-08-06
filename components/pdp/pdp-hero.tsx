"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

/**
 * "Build the skills. Get the placement. Change your career." — PDP hero.
 *
 * Full-bleed library photo with the copy overlaid on the left. The subject sits
 * on the right of the frame, so a left-weighted dark scrim keeps the heading
 * legible without dimming her. Same masked line-reveal + fade-up entrance as
 * the other v26 heroes.
 */
type PdpHeroProps = {
  /** Fires the application flow owned by the page fragment. */
  onApply?: () => void;
};

const PdpHero = ({ onApply }: PdpHeroProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy before first paint so the entrance always plays from scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".pdp-line-inner", { yPercent: 110 });
      gsap.set(".pdp-hero-para", { autoAlpha: 0, y: 20 });
      gsap.set(".pdp-hero-cta", { autoAlpha: 0, y: 20 });
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
        ".pdp-hero-para",
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      );
      tl.to(
        ".pdp-hero-cta",
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.35"
      );
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
      className="relative flex min-h-[600px] items-center overflow-hidden bg-[#121212] lg:h-[calc(100svh-var(--spacing-nav))]"
    >
      {/* Library photo — object-position keeps the subject in frame as the
          viewport narrows. */}
      <Image
        src="/v26-images/pdp/hero.webp"
        alt="A student smiling at her laptop in a university library"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_50%]"
      />

      {/* Left-weighted scrim: dark behind the copy, clear over the subject. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10"
      />

      <div className="relative z-10 w-full px-[24px] py-[80px] md:px-[40px]">
        <div className="container mx-auto max-w-(--breakpoint-xl)">
          <h1 className="max-w-[820px] text-[36px] leading-[1.1] tracking-[-3%] font-semibold text-white sm:text-[52px] lg:text-[68px]">
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

          <p className="pdp-hero-para mt-[24px] max-w-[520px] text-[18px] leading-[25.86px] font-normal text-white md:text-[20px]">
            The All Talentz Professional Development Programme opens doors to real,
            paid placements with U.S. businesses.
          </p>

          <button
            type="button"
            onClick={onApply}
            className="pdp-hero-cta mt-[32px] bg-[#F99621] px-[40px] py-[20px] text-[18px] font-medium text-[#121212] transition-colors hover:bg-[#e8870e] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Apply for next Cohort
          </button>
        </div>
      </div>
    </section>
  );
};

export default PdpHero;
