"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  hideOnMobile?: boolean;
};

const BASE_PATH = "/v26-images/about-company/doodles/";

const DOODLES: Doodle[] = [
  // 1 = spark, 2 = chat bubble, 3 = light bulb
  { src: "1.svg", w: 83, h: 84, left: "50%", top: "25%" },
  { src: "3.svg", w: 67, h: 131, left: "12%", top: "83%" },
  { src: "2.svg", w: 94, h: 80, left: "86%", top: "86%", hideOnMobile: true },
];

const BeliefQuote = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the quote and doodles before the first paint, so the entrance below
  // always plays from the start instead of popping in half-finished.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".bq-doodle-enter", { autoAlpha: 0, scale: 0.4 });
      gsap.set(".bq-reveal", { autoAlpha: 0, y: 24 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // Quote rises and fades in when the section scrolls into view.
      gsap.to(".bq-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Doodles pop in just after, in random order, with an overshoot.
      gsap.to(".bq-doodle-enter", {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: { each: 0.12, from: "random" },
        delay: 0.15,
      });

      // Then they drift forever on random durations, so they never move in sync.
      gsap.utils.toArray<HTMLElement>(".bq-doodle-float").forEach((node) => {
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
      className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-white px-[24px] py-[100px] md:min-h-[560px] md:px-[40px] md:py-[180px]"
    >
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 scale-[0.6] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="bq-doodle-enter">
            <div className="bq-doodle-float">
              <Image
                src={`${BASE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className="grayscale"
                style={{ transformOrigin: "center" }}
              />
            </div>
          </div>
        </div>
      ))}

      <blockquote className="bq-reveal relative z-10 mx-auto max-w-[1080px]">
        <p
          className="text-center text-[28px] leading-[1.15] tracking-[0.01em] text-[#F99621] sm:text-[36px] lg:text-[48px] lg:leading-[48px]"
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            fontWeight: 500,
          }}
        >
          &lsquo;Great talent should not cost a fortune, and great businesses should not
          have to compromise to find it.&rsquo;
        </p>
      </blockquote>
    </section>
  );
};

export default BeliefQuote;
