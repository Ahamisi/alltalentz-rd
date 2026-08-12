"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "One model. Total clarity." — Our Solutions hero.
 *
 * Left column: heading + supporting copy. Right column: the 70% cost-saving
 * world-map illustration (metrics-hero.png — metrics.png trimmed of its
 * transparent canvas padding, which was inflating the section height). Follows the same masked
 * line-reveal + fade-up entrance as the Hire Talentz hero.
 *
 * Scattered hand-drawn doodles (flame, bulb) pop in and then float on a
 * de-synchronised loop, mirroring the OnePartner treatment. They render in
 * grayscale so the orange stays on the copy and illustration.
 */
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
  { src: "1.svg", w: 62, h: 65, left: "41%", top: "20%" },
  { src: "3.svg", w: 57, h: 111, left: "13%", top: "84%", hideOnMobile: true },
];

const DOODLE_PATH = "/v26-images/our-solutions/";

const SolutionsHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy + illustration before first paint so the entrance always
  // plays from scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".sh-line-inner", { yPercent: 110 });
      gsap.set(".sh-hero-para", { autoAlpha: 0, y: 20 });
      gsap.set(".sh-hero-art", { autoAlpha: 0, y: 30, scale: 0.96 });
      gsap.set(".sh-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".sh-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Paragraph fades up just after the heading settles.
      tl.to(
        ".sh-hero-para",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.35"
      );

      // Illustration settles in alongside the copy.
      tl.to(
        ".sh-hero-art",
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.7"
      );

      // Doodles pop in with a little overshoot, then float on a loop.
      tl.to(
        ".sh-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.12, from: "random" },
        },
        "-=0.5"
      );

      gsap.utils.toArray<HTMLElement>(".sh-doodle-float").forEach((node) => {
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
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      {/* Decorative doodles */}
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-[0.7] grayscale md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="sh-doodle-enter">
            <div className="sh-doodle-float">
              <Image
                src={`${DOODLE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                style={{ transformOrigin: "center", height: "auto" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-2 lg:gap-[40px]">
          {/* Copy */}
          <div className="sh-hero-copy order-2 lg:order-1">
            <h1 className="text-[44px] tracking-[-5%] lg:text-[60px] lg:leading-[67.25px] font-semibold text-[#121212]">
              {/* pb/‑mb: give the clip mask room for descenders without
                  changing the visual line spacing. */}
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="sh-line-inner block">One model.</span>
              </span>
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="sh-line-inner block text-[#F99621]">
                  Total clarity.
                </span>
              </span>
            </h1>
            <p className="sh-hero-para mt-[24px] text-[18px] leading-[25.86px] font-normal text-[#121212] md:text-[20px] max-w-[475.89px]">
              Exactly how we work, what you get, and what it costs.
            </p>
          </div>

          {/* Illustration — 70% cost saving over a dotted world map */}
          <div className="order-1 lg:order-2">
            <Image
              src="/v26-images/our-solutions/metrics-hero.png"
              alt="70% cost saving illustrated over a dotted world map with a globe of landmarks"
              width={2968}
              height={2011}
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="sh-hero-art mx-auto h-auto w-full max-w-[640px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
