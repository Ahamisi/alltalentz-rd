"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * Blog hero — "Insights on talent, outsourcing, and the future of work."
 *
 * A clean white field with the heading centred and hand-drawn doodles scattered
 * around it (sprout, bulb, sparkles, rays, spark-burst). The doodle SVGs in
 * public/v26-images are *filled* shapes rather than stroked outlines, so a
 * self-drawing reveal isn't possible; each is treated as a whole unit — a
 * staggered pop-in, then a de-synchronised float loop with an extra per-doodle
 * character beat (glow / twinkle / pulse / spin), same approach as
 * SolutionsHero and ReadyToBuild.
 */
type DoodleMotion = "glow" | "twinkle" | "pulse" | "spin";

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  motion?: DoodleMotion;
  hideOnMobile?: boolean;
};

// left/top are percentages of the section; each doodle is centred on its point.
const DOODLES: Doodle[] = [
  // green sprout, upper left
  {
    src: "/v26-images/our-solutions/doodles/5.svg",
    w: 74,
    h: 47,
    left: "14%",
    top: "16%",
  },
  // lightbulb, dead centre above the heading
  {
    src: "/v26-images/about-company/doodles/3.svg",
    w: 62,
    h: 122,
    left: "50%",
    top: "20%",
    motion: "glow",
  },
  // purple spark, upper right
  {
    src: "/v26-images/home/cta-doodle/1.svg",
    w: 46,
    h: 88,
    left: "85%",
    top: "17%",
    motion: "pulse",
    hideOnMobile: true,
  },
  // purple sparkle cluster, lower left
  {
    src: "/v26-images/our-solutions/doodles/1.svg",
    w: 62,
    h: 62,
    left: "13%",
    top: "78%",
    motion: "twinkle",
  },
  // yellow rays, bottom centre
  {
    src: "/v26-images/agency/2.svg",
    w: 104,
    h: 68,
    left: "50%",
    top: "83%",
    motion: "pulse",
  },
  // red burst, lower right
  {
    src: "/v26-images/home/cta-doodle/3.svg",
    w: 84,
    h: 94,
    left: "87%",
    top: "76%",
    motion: "spin",
    hideOnMobile: true,
  },
];

export default function BlogHero() {
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
      gsap.set(".bh-line-inner", { yPercent: 110 });
      gsap.set(".bh-reveal", { autoAlpha: 0, y: 20 });
      gsap.set(".bh-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".bh-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Eyebrow + supporting copy fade up as the heading settles.
      tl.to(
        ".bh-reveal",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.4"
      );

      // Doodles pop in with a little overshoot.
      tl.to(
        ".bh-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.1, from: "random" },
        },
        "-=0.6"
      );

      // Idle float + wobble — de-synchronised so it never looks mechanical.
      gsap.utils.toArray<HTMLElement>(".bh-doodle-float").forEach((node) => {
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

      // Bulb: a slow "idea" glow that brightens and swells a touch.
      gsap.utils.toArray<HTMLElement>(".bh-motion-glow").forEach((node) => {
        gsap.to(node, {
          opacity: 0.55,
          scale: 1.08,
          duration: 1.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // Sparkles: quick shrink/fade twinkle.
      gsap.utils.toArray<HTMLElement>(".bh-motion-twinkle").forEach((node) => {
        gsap.to(node, {
          scale: gsap.utils.random(0.8, 0.88),
          opacity: gsap.utils.random(0.6, 0.8),
          rotate: gsap.utils.random(-14, 14),
          duration: gsap.utils.random(0.9, 1.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.6),
        });
      });

      // Rays / spark: a rhythmic emit-pulse out from the centre.
      gsap.utils.toArray<HTMLElement>(".bh-motion-pulse").forEach((node) => {
        gsap.to(node, {
          scale: gsap.utils.random(1.1, 1.18),
          opacity: 0.72,
          duration: gsap.utils.random(1.1, 1.6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.8),
        });
      });

      // Burst: a lazy full rotation, so it reads as spinning off energy.
      gsap.utils.toArray<HTMLElement>(".bh-motion-spin").forEach((node) => {
        gsap.to(node, {
          rotate: 360,
          duration: 22,
          ease: "none",
          repeat: -1,
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
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[96px] md:py-[140px]"
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
          <div className="bh-doodle-enter">
            <div className="bh-doodle-float">
              <Image
                src={doodle.src}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className={doodle.motion ? `bh-motion-${doodle.motion}` : undefined}
                style={{ transformOrigin: "center", height: "auto" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <h1 className="mt-[20px] text-[34px] leading-[1.08] tracking-[-3%] font-semibold text-[#121212] sm:text-[44px] lg:text-[60px]">
            {/* pb/-mb: give the clip mask room for descenders without
                changing the visual line spacing. */}
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
              <span className="bh-line-inner block">
                Insights on talent, outsourcing,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
              <span className="bh-line-inner block">
                and the future of work.
              </span>
            </span>
          </h1>

          <p className="bh-reveal mt-[24px] max-w-[560px] text-[16px] leading-[25.86px] font-normal text-[#5C5C5C] md:text-[18px]">
            Perspectives from the All Talentz team on remote hiring, global
            talent, and building teams that last.
          </p>
        </div>
      </div>
    </section>
  );
}
