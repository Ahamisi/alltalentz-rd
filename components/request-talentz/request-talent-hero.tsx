"use client";
import { Suspense, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import RequestTalentHeroForm from "./request-talent-hero-form";
import { REVEAL_IN_VIEW } from "@/lib/motion";

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  hideOnMobile?: boolean;
};

const DOODLE_PATH = "/v26-images/about-company/doodles/";

const DOODLES: Doodle[] = [
  { src: "1.svg", w: 83, h: 84, left: "5%", top: "62%", hideOnMobile: true },
  { src: "3.svg", w: 67, h: 131, left: "38%", top: "34%", hideOnMobile: true },
];

const RequestTalentHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy and doodles before the first paint so the entrance always
  // plays from the start. The form is never hidden, it has to be usable at once.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".rt-line-inner", { yPercent: 110 });
      gsap.set(".rt-hero-cta", { autoAlpha: 0, y: 20 });
      gsap.set(".rt-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // One entrance timeline, played when the hero scrolls into view.
      const tl = gsap.timeline();

      // Heading lines slide up from behind their clip masks, one after another.
      tl.to(".rt-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // The two CTAs fade up while the heading is still settling.
      tl.to(
        ".rt-hero-cta",
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12 },
        "-=0.35"
      );

      // Doodles pop in last, in random order, with a slight overshoot.
      tl.to(
        ".rt-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.12, from: "random" },
        },
        "-=0.5"
      );

      // Then they drift forever on random durations, so they never move in sync.
      gsap.utils.toArray<HTMLElement>(".rt-doodle-float").forEach((node) => {
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
      className="relative overflow-hidden bg-[#FEF5E9] px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 scale-[0.7] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="rt-doodle-enter">
            <div className="rt-doodle-float">
              <Image
                src={`${DOODLE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className="grayscale opacity-70"
                style={{ transformOrigin: "center", height: "auto" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-[64px]">
          <div className="order-1">
            <h1 className="text-[32px] leading-[1.12] tracking-[-3%] sm:text-[44px] sm:tracking-[-5%] lg:text-[60px] lg:leading-[67.25px] font-semibold text-[#121212]">
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="rt-line-inner block">
                  Your next remote professional is 7 days away.
                </span>
              </span>
            </h1>

            <div className="mt-[32px] flex flex-wrap items-center gap-4">
              <Link
                href="https://calendly.com/mnwoseh/"
                target="_blank"
                rel="noopener noreferrer"
                className="rt-hero-cta inline-flex items-center justify-center bg-[#F99621] px-[40px] py-[16px] font-medium text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a]"
              >
                Book a Meeting
              </Link>
              <Link
                href="/contact-us"
                className="rt-hero-cta inline-flex items-center justify-center border border-[#121212] px-[40px] py-[16px] font-medium text-[#121212] transition-colors duration-300 hover:bg-[#121212] hover:text-white"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>

          <div className="order-2 w-full lg:justify-self-end lg:max-w-[620px]">
            <Suspense fallback={null}>
              <RequestTalentHeroForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestTalentHero;
