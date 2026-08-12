"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

/**
 * "Ready to build your remote team?" — a two-column CTA: copy + dual buttons on
 * the left, a photo card (with an orange top accent) on the right, all set on a
 * warm cream field scattered with hand-drawn doodles.
 *
 * The doodle SVGs (public/v26-images/ready-to-build/*.svg) are *filled*
 * shapes, not stroked outlines, so a self-drawing reveal isn't possible. Each is
 * treated as a whole unit: a staggered pop-in on scroll, then a de-synchronised
 * float/wobble loop — same approach as CallToAction / OnePartner.
 */
type CtaButton = {
  text: string;
  url: string;
  openNewTab?: boolean;
};

type ReadyToBuildProps = {
  title?: ReactNode;
  description?: ReactNode;
  primary?: CtaButton;
  secondary?: CtaButton;
  image?: { src: string; alt: string; width: number; height: number };
  /** Optional extra classes for the outer section. */
  className?: string;
};

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  twinkle?: boolean;
  hideOnMobile?: boolean;
};

const BASE_PATH = "/v26-images/ready-to-build/";

// left/top are percentages of the section; each doodle is centred on its point.
const DOODLES: Doodle[] = [
  { src: "1.svg", w: 34, h: 32, left: "66%", top: "9%", twinkle: true },
  { src: "2.svg", w: 44, h: 42, left: "43%", top: "20%", twinkle: true },
  { src: "4.svg", w: 46, h: 46, left: "96%", top: "19%", hideOnMobile: true },
  { src: "5.svg", w: 67, h: 65, left: "42%", top: "70%", hideOnMobile: true },
  { src: "6.svg", w: 28, h: 42, left: "12%", top: "85%" },
  { src: "7.svg", w: 48, h: 46, left: "96%", top: "88%", hideOnMobile: true },
];

const DEFAULT_IMAGE = {
  src: `${BASE_PATH}build-group.webp`,
  alt: "A team collaborating around a table",
  width: 760,
  height: 560,
};

const ReadyToBuild = ({
  title = (
    <>
      Ready to build your
      <br className="hidden sm:block" /> remote team?
    </>
  ),
  description = "Tell us what you need. We'll have the right talent matched and ready under 48 hours",
  primary = {
    text: "Book a meeting",
    url: "https://calendly.com/mnwoseh",
    openNewTab: true,
  },
  secondary = { text: "Talk to Our Team", url: "/contact" },
  image = DEFAULT_IMAGE,
  className = "",
}: ReadyToBuildProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide doodles + content before first paint so the entrance always plays from
  // scratch (no flash of fully-visible content while scrolling into view).
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(".rtb-doodle-enter", { autoAlpha: 0, scale: 0.4 });
      gsap.set(".rtb-reveal", { autoAlpha: 0, y: 30 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Copy + image rise + fade in.
      gsap.to(".rtb-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.1,
      });

      // Doodles: staggered pop-in with a little overshoot.
      gsap.to(".rtb-doodle-enter", {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: { each: 0.09, from: "random" },
      });

      // Idle float + wobble — de-synchronised so it never looks mechanical.
      gsap.utils.toArray<HTMLElement>(".rtb-doodle-float").forEach((node) => {
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

      // Extra twinkle for the sparkly doodles.
      gsap.utils.toArray<HTMLElement>(".rtb-doodle-twinkle").forEach((node) => {
        gsap.to(node, {
          scale: gsap.utils.random(0.82, 0.9),
          opacity: gsap.utils.random(0.65, 0.85),
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
      className={`relative overflow-hidden bg-[#FBF3E3] px-[24px] md:px-[40px] py-[120px] md:py-[150px] ${className}`}
    >
      {/* Decorative doodles */}
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 scale-[0.7] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="rtb-doodle-enter">
            <div className="rtb-doodle-float">
              <Image
                src={`${BASE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className={doodle.twinkle ? "rtb-doodle-twinkle" : undefined}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 items-center gap-[48px] md:grid-cols-2 md:gap-[64px]">
          {/* Copy + buttons */}
          <div className="rtb-reveal">
            <h2 className="text-[40px] leading-[1.05] tracking-[-5%] lg:text-[50px] lg:leading-[67.25px] font-medium text-[#121212]">
              {title}
            </h2>
            <p className="mt-[24px] max-w-[475px] text-[18px] leading-[25.86px] font-normal text-[#121212]">
              {description}
            </p>

            <div className="mt-[40px] flex flex-col gap-[16px] sm:flex-row sm:items-center">
              <Link
                href={primary.url}
                target={primary.openNewTab ? "_blank" : undefined}
                rel={primary.openNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center bg-[#F99621] text-[#121212] px-[40px] py-[16px] font-medium transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a]"
              >
                {primary.text}
              </Link>
              <Link
                href={secondary.url}
                target={secondary.openNewTab ? "_blank" : undefined}
                rel={secondary.openNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center border border-[#121212] text-[#121212] px-[40px] py-[16px] font-medium transition-colors duration-300 hover:bg-[#121212] hover:text-white"
              >
                {secondary.text}
              </Link>
            </div>
          </div>

          {/* Photo card with orange top accent */}
          <div className="rtb-reveal">
            <div className="overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full rounded-[20px] object-cover"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToBuild;
