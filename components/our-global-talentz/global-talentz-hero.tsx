"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "The people behind your result." global-talentz hero.
 *
 * Centred copy above a full-width filmstrip of narrow portrait slices — eight
 * distinct portraits, one per slice. The band is desaturated so it reads as one
 * graphic; hovering a slice restores that portrait's original colour.
 *
 * The slices are much narrower than the source photos, so `pos` is the
 * object-position that keeps each face inside the crop.
 */
const STRIPS = [
  { src: "/v26-images/global-talentz/people/1b.png", alt: "Professional in a blue shirt holding a laptop", pos: "58% 50%" },
  { src: "/v26-images/global-talentz/people/2b.png", alt: "Professional in a navy blazer with arms crossed", pos: "48% 50%" },
  { src: "/v26-images/global-talentz/people/3b.png", alt: "Professional in a light blue blouse with arms crossed", pos: "53% 50%" },
  { src: "/v26-images/global-talentz/people/4b.png", alt: "Professional in a black suit working on a laptop", pos: "52% 50%" },
  { src: "/v26-images/global-talentz/people/5b.png", alt: "Professional in a navy blazer typing at a desk", pos: "47% 50%" },
  { src: "/v26-images/global-talentz/people/6b.png", alt: "Professional in a white coat holding a clipboard", pos: "49% 50%" },
  { src: "/v26-images/global-talentz/people/7b.png", alt: "Professional in a black suit with arms crossed", pos: "52% 50%" },
  { src: "/v26-images/global-talentz/people/8b.png", alt: "Professional in a black suit smiling", pos: "55% 50%" },
];

const GlobalTalentzHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy + strips before first paint so the entrance always plays.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".gt-line-inner", { yPercent: 110 });
      gsap.set(".gt-hero-para", { autoAlpha: 0, y: 20 });
      gsap.set(".gt-strip", { autoAlpha: 0, y: 48 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".gt-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      tl.to(
        ".gt-hero-para",
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      );

      // Strips rise left-to-right into the band.
      tl.to(
        ".gt-strip",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.07,
        },
        "-=0.3"
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
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] pt-[80px] md:pt-[120px] pb-[60px] md:pb-[100px]"
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        {/* Copy */}
        <div className="mx-auto max-w-[902.58px] text-center">
          <h1 className="text-[40px] leading-[90px] tracking-[-5%] font-semibold text-[#121212] lg:text-[60px]">
            {/* pb/-mb: room for descenders inside the clip mask without
                changing the visual line spacing. */}
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
              <span className="gt-line-inner block">
                The people behind{" "}
                <span className="text-[#F99621]">your result.</span>
              </span>
            </span>
          </h1>
          <p className="gt-hero-para mx-auto mt-[24px] max-w-[520px] text-[18px] leading-[25.86px] font-normal text-[#121212] lg:text-[24px] lg:leading-[32px] tracking-[0%]">
            Every professional we place is vetted, trained, and ready to work.
          </p>
        </div>

        {/* Filmstrip */}
        <div className="mt-[56px] flex gap-[6px] md:mt-[88px] md:gap-[8px]">
          {STRIPS.map((strip, i) => (
            <div
              key={strip.src}
              // The last four slices only appear once there is room for them.
              className={`gt-strip group relative h-[320px] flex-1 overflow-hidden lg:h-[424.69px] xl:h-[524.69px] ${
                i >= 4 ? "hidden md:block" : ""
              }`}
            >
              <Image
                src={strip.src}
                alt={strip.alt}
                fill
                sizes="(max-width: 768px) 25vw, 13vw"
                priority={i < 4}
                style={{ objectPosition: strip.pos }}
                // Desaturated band by default; the hovered slice returns to
                // its original colour.
                className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0 motion-reduce:transition-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalTalentzHero;
