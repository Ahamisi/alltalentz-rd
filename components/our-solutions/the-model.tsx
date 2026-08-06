"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "The Model" — four-step process deck (Request → Match → Deploy → Support).
 *
 * Heading fades up, then the cards rise + fade in staggered left-to-right on
 * scroll — one short pass, nothing left running afterwards. Driven by
 * ScrollTrigger (not IntersectionObserver) so the entrance stays in step with
 * the Lenis smooth scroll that `SmoothScroll` pumps from the GSAP ticker.
 */
type Step = {
  title: string;
  description: string;
  img: string;
  /** Rendered icon size (px), from each SVG's intrinsic viewBox. */
  w: number;
  h: number;
};

const STEPS: Step[] = [
  {
    title: "Request",
    description: "Tell us the role and timeline you need filled.",
    img: "1.svg",
    w: 76,
    h: 72,
  },
  {
    title: "Match",
    description: "We match you to the right professional.",
    img: "2.svg",
    w: 61,
    h: 68,
  },
  {
    title: "Deploy",
    description: "Your hire is onboarded within 7 days.",
    img: "3.svg",
    w: 62,
    h: 68,
  },
  {
    title: "Support",
    description: "24/7 support, from day one onward.",
    img: "4.svg",
    w: 64,
    h: 66,
  },
];

const ICON_PATH = "/v26-images/our-solutions/models/";

const TheModel = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Resting state, set before first paint so the entrance always plays
      // from scratch.
      gsap.set(".tm-heading", { autoAlpha: 0, y: 16 });
      gsap.set(".tm-card", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          // Fires once the section is a comfortable way into the viewport.
          start: "top 75%",
          once: true,
        },
      });

      tl.to(".tm-heading", {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      tl.to(
        ".tm-card",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          // Hand the transform back to CSS once the cards have landed, so
          // nothing GSAP-inline lingers on them.
          clearProps: "transform",
        },
        "-=0.2"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <h2 className="tm-heading text-center text-[36px] leading-tight lg:text-[60px] font-semibold text-[#121212] mb-[64px] md:mb-[80px] lg:tracking-[0%]">
          The Model
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="tm-card flex flex-col items-center rounded-[37.71px] border-[1.51px] border-transparent px-[24px] py-[48px] text-center bg-position-[0%_50%,0%_50%] transition-[background-position] duration-900 ease-out hover:bg-position-[0%_50%,100%_50%] motion-reduce:transition-none"
              style={{
                backgroundImage:
                  "linear-gradient(#FEF5E9, #FEF5E9), linear-gradient(104.59deg, rgba(102, 102, 102, 0.3) 0.76%, rgba(180, 180, 180, 0.0768416) 32.78%, rgba(90, 90, 90, 0.220526) 69.11%, rgba(186, 181, 181, 0.021) 99%)",
                backgroundSize: "auto, 220% 220%",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <div className="flex h-[80px] items-center justify-center">
                <Image
                  src={`${ICON_PATH}${step.img}`}
                  alt=""
                  width={step.w}
                  height={step.h}
                  style={{ height: "auto" }}
                />
              </div>
              <h3 className="mt-[32px] text-[22px] leading-[142%] font-semibold text-[#2E2E2E]">
                {step.title}
              </h3>
              <p className="mt-[24px] text-[16px] leading-[150%] font-normal text-[#5F5F5F] max-w-[180px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TheModel;
