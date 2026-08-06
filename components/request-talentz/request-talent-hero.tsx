"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import RoleBubbles from "./role-bubbles";

/**
 * "Your next remote professional is 7 days away." — Request Talent hero.
 *
 * Centred masked line-reveal heading, then a canvas holding the static
 * "VACANCY" chair illustration with six small animated role circles
 * (<RoleBubbles />) scattered around it.
 *
 * The chair is deliberately motionless — it is the anchor of the composition.
 * The circles run their own pop-in and breathing loops, so the cluster never
 * reads as a flat image.
 */
const ASSET_PATH = "/v26-images/request-talentz/";

const RequestTalentHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy before first paint so the entrance always plays from scratch.
  // The chair is never touched — it renders as-is, immediately, and the role
  // circles own their own entrance.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".rt-line-inner", { yPercent: 110 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".rt-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
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
      className="relative overflow-hidden bg-[#FEF5E9] px-[24px] md:px-[40px] pt-[80px] md:pt-[100px] pb-[40px] md:pb-[60px]"
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        {/* Copy */}
        <h1 className="mx-auto max-w-[900px] text-center text-[36px] leading-[1.12] tracking-[-3%] font-semibold text-[#121212] md:text-[56px] lg:text-[60px] lg:tracking-[-5%]">
          {/* pb/-mb: give the clip mask room for descenders (y, p, .) without
              changing the visual line spacing. */}
          <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
            <span className="rt-line-inner block">Your next remote professional is 7 days away.</span>
          </span>
          {/* <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
            <span className="rt-line-inner block"></span>
          </span> */}
        </h1>

        {/* Illustration canvas — aspect box keeps the scatter proportional at
            any width. The chair sits dead centre, the role circles orbit it.
            Portrait box on small screens, letterbox from lg up; RoleBubbles
            carries matching coordinates for both. */}
        <div className="relative mx-auto mt-[32px] aspect-700/760 w-full max-w-[520px] lg:mt-[8px] lg:aspect-2000/630 lg:max-w-[1400px]">
          {/* The chair — static by design, no entrance and no loop. */}
          <div className="absolute bottom-0 left-1/2 w-[38%] max-w-[390px] -translate-x-1/2 sm:w-[32%] lg:w-[27%]">
            <Image
              src={`${ASSET_PATH}vacancy-chair.svg`}
              alt="An empty office chair with a vacancy sign"
              width={390}
              height={451}
              priority
              className="h-auto w-full"
            />
          </div>

          <RoleBubbles />
        </div>
      </div>
    </section>
  );
};

export default RequestTalentHero;
