"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "We started with One Belief!" about-page hero.
 *
 * The heading sits inside the empty upper region of the studio photo, so the
 * photo is full-bleed and the copy is overlaid rather than stacked above it —
 * that way there is never a seam between the section colour and the image.
 */
const AboutHero = () => {
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
      gsap.set(".ab-line-inner", { yPercent: 110 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".ab-line-inner", {
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
      className="relative h-[90vh] overflow-hidden bg-[#F6F1EF]"
    >
      {/* Studio photo — fills the viewport. The object-position y% favours the
          top of the source frame, which pushes the group down and leaves clear
          space for the heading. */}
      <Image
        src="/v26-images/about-company/hero.jpg"
        alt="A team of professionals working together on the floor of a studio"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_25%]"
      />

      {/* Heading overlaid on the empty upper area of the photo */}
      <div className="absolute inset-x-0 top-0 px-[24px] pt-[64px] md:px-[40px] md:pt-[7%]">
        <h1 className="mx-auto max-w-(--breakpoint-xl) text-center text-[32px] leading-[1.15] tracking-[-3%] font-semibold text-[#121212] sm:text-[44px] lg:text-[60px] lg:leading-[67.25px]">
          {/* pb/-mb: room for descenders inside the clip mask, without
              changing the visual line spacing. */}
          <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
            <span className="ab-line-inner block">
              We started with <span className="text-[#F99621]">One Belief!</span>
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
};

export default AboutHero;
