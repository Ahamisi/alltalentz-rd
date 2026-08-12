"use client";
import { Suspense, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import RequestTalentHeroForm from "./request-talent-hero-form";

/**
 * "Your next remote professional is 7 days away." — Request Talent hero.
 *
 * Same shape as the Outsourcing / Our Solutions heroes: copy on the left,
 * the supporting element on the right — except here that element is the request
 * form itself (<RequestTalentHeroForm />), since filling it in is the whole
 * point of the page.
 *
 * A couple of grayscaled hand-drawn doodles sit around the copy column; they pop
 * in with an overshoot and then float on de-synchronised loops, matching the
 * treatment used on the other page heroes.
 */
type Doodle = {
  src: string;
  w: number;
  h: number;
  /** Centre point as a percentage of the section. */
  left: string;
  top: string;
  hideOnMobile?: boolean;
};

const DOODLE_PATH = "/v26-images/about-company/doodles/";

// left/top are percentages of the section; each doodle is centred on its point.
const DOODLES: Doodle[] = [
  { src: "1.svg", w: 83, h: 84, left: "5%", top: "62%", hideOnMobile: true },
  { src: "3.svg", w: 67, h: 131, left: "38%", top: "34%", hideOnMobile: true },
];

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
  // The form is never hidden — it is the primary action and must be usable the
  // moment the page paints.
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
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".rt-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // The two CTAs fade up just after the heading settles.
      tl.to(
        ".rt-hero-cta",
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.12 },
        "-=0.35"
      );

      // Doodles pop in with a little overshoot, then float on a loop.
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
      {/* Decorative doodles — grayscaled so the orange stays on the copy and the
          form's submit button. */}
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
          {/* Copy */}
          <div className="order-1">
            <h1 className="text-[44px] tracking-[-5%] lg:text-[60px] lg:leading-[67.25px] font-semibold text-[#121212]">
              {/* pb/-mb: give the clip mask room for descenders (y, p, .) without
                  changing the visual line spacing. */}
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

          {/* Form — takes the slot the illustration occupies on the other heroes */}
          <div className="order-2 w-full lg:justify-self-end lg:max-w-[620px]">
            {/* Suspense: the form reads ?industry/?roles via useSearchParams. */}
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
