"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import TalentBubbles from "./TalentBubbles";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "Find the right talent for your industry." hero.
 *
 * Left column: heading + supporting copy. Right column: <TalentBubbles />, the
 * animated cluster of role circles.
 */
const HireTalentzHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy before first paint so the entrance always plays from scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      // Heading lines start below their clip mask; paragraph starts faded down.
      gsap.set(".ht-line-inner", { yPercent: 110 });
      gsap.set(".ht-hero-para", { autoAlpha: 0, y: 20 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".ht-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Paragraph fades up just after the heading settles.
      tl.to(
        ".ht-hero-para",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
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
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-2 lg:gap-[40px]">
          {/* Copy */}
          <div className="ht-hero-copy order-2 lg:order-1">
            <h1 className="text-[32px] leading-[1.12] tracking-[-3%] sm:text-[44px] sm:tracking-[-5%] lg:text-[60px] lg:leading-[67.25px] font-semibold text-[#121212]">
              {/* pb/‑mb: give the clip mask room for descenders (g, y, .)
                  without changing the visual line spacing. */}
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="ht-line-inner block">Find the right talent</span>
              </span>
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="ht-line-inner block text-[#F99621]">
                  for your industry.
                </span>
              </span>
            </h1>
            <p className="ht-hero-para mt-[24px] text-[18px] leading-[25.86px] font-normal text-[#121212] md:text-[20px] max-w-[475.89px]">
              Pre-vetted professionals across verticals. Deployed in 7 days.
            </p>
          </div>

          {/* Illustration — animated cluster of role bubbles */}
          <div className="order-1 lg:order-2">
            <TalentBubbles />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireTalentzHero;
