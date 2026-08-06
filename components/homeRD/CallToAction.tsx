"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

type CallToActionProps = {
  /**
   * Optional heading shown above the button. Accepts a ReactNode so callers can
   * add line breaks or coloured spans, e.g.
   * `<>Don&apos;t see your role?<br />We source beyond our listed verticals.</>`.
   */
  heading?: ReactNode;
  /** Button label, e.g. "Get Started". */
  text: string;
  /** Destination the button links to (internal path or external URL). */
  url: string;
  /** Open the link in a new tab. Defaults to false. */
  openNewTab?: boolean;
  /** Extra classes for the outer section (spacing, background, min-height…). */
  className?: string;
  /** Extra classes for the inner content wrapper. */
  contentClassName?: string;
  /** Extra classes for the heading. */
  headingClassName?: string;
  /** Extra classes for the CTA button. */
  buttonClassName?: string;
};

/**
 * Decorative hand-drawn doodles scattered around the CTA button — the same
 * doodle set as OnePartner (public/v26-images/home/one-partner/{1..6}.svg).
 *
 * These SVGs are *filled* single-colour shapes, not stroked outlines, so a
 * self-drawing (stroke-dashoffset) reveal isn't possible. Instead each doodle
 * is treated as a whole unit and animated by transform: a staggered pop-in on
 * scroll, then a gentle, de-synchronised float/wobble loop. `left`/`top` are
 * percentages of the section, and each doodle is centred on that point.
 */
type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  twinkle?: boolean;
  hideOnMobile?: boolean;
};

const DOODLES: Doodle[] = [
  { src: "1.svg", w: 55, h: 55, left: "36%", top: "16%", twinkle: true },
  { src: "2.svg", w: 62, h: 59, left: "82%", top: "22%", twinkle: true },
  { src: "3.svg", w: 44, h: 42, left: "15%", top: "78%" },
  { src: "5.svg", w: 48, h: 46, left: "72%", top: "84%", twinkle: true },
];

const BASE_PATH = "/v26-images/home/one-partner/";

const CallToAction = ({
  heading,
  text,
  url,
  openNewTab = false,
  className = "",
  contentClassName = "",
  headingClassName = "",
  buttonClassName = "",
}: CallToActionProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide doodles before first paint so the entrance always plays from scratch
  // (no flash of fully-visible doodles while scrolling into view).
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(".cta-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  // Play the entrance + start the idle loops once in view.
  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Entrance: staggered pop-in with a little overshoot + random settle.
      gsap.to(".cta-doodle-enter", {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: { each: 0.09, from: "random" },
      });

      // Idle float + wobble — de-synchronised so it never looks mechanical.
      gsap.utils.toArray<HTMLElement>(".cta-doodle-float").forEach((node) => {
        gsap.to(node, {
          y: gsap.utils.random(-10, -6),
          rotate: gsap.utils.random(-4, 4),
          duration: gsap.utils.random(2.4, 3.6),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.9),
        });
      });

      // Extra twinkle for the sparkly doodles.
      gsap.utils.toArray<HTMLElement>(".cta-doodle-twinkle").forEach((node) => {
        gsap.to(node, {
          scale: gsap.utils.random(0.82, 0.9),
          opacity: gsap.utils.random(0.65, 0.8),
          duration: gsap.utils.random(0.9, 1.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.6),
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
      className={`relative overflow-hidden bg-white px-6 py-14 md:py-16 min-h-64 md:min-h-75 flex items-center justify-center ${className}`}
    >
      {/* Decorative doodles */}
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 scale-[0.65] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="cta-doodle-enter">
            <div className="cta-doodle-float">
              <Image
                src={`${BASE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className={doodle.twinkle ? "cta-doodle-twinkle" : undefined}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Anchored heading + CTA button */}
      <div
        className={`relative z-10 flex flex-col items-center text-center ${contentClassName}`}
      >
        {heading && (
          <h2
            className={`mb-8 max-w-3xl xl:max-w-[829px] text-3xl lg:text-[48px] lg:leading-[67.25px] font-medium leading-tight text-[#121212] md:text-5xl tracking-[-5%] ${headingClassName}`}
          >
            {heading}
          </h2>
        )}
        <Link
          href={url}
          target={openNewTab ? "_blank" : undefined}
          rel={openNewTab ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center justify-center bg-[#F99621] text-[#121212] px-[40px] py-[15px] font-medium transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a] ${buttonClassName}`}
        >
          {text}
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
