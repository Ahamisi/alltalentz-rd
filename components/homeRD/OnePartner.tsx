"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "One partner. Every solution." — three entry-point cards (Hire Talentz,
 * Our Solutions, Agency) surrounded by scattered hand-drawn doodles.
 *
 * The doodle SVGs (public/v26-images/home/one-partner/{1..6}.svg) are *filled*
 * single-colour shapes, so a self-drawing stroke reveal isn't possible. Each is
 * treated as a whole unit: a staggered pop-in on scroll, then a de-synchronised
 * float/wobble loop — same approach as CallToAction.
 */
type Card = {
  title: string;
  description: string;
  href: string;
  img: string;
  /** Rendered illustration size (px). */
  w: number;
  h: number;
};

const CARDS: Card[] = [
  {
    title: "Hire Talentz",
    description: "Find the right professionals for your business",
    href: "/find-talent",
    img: "hire-talent.svg",
    w: 130,
    h: 156,
  },
  {
    title: "Our Solutions",
    description: "Transparent pricing, flexible models, all inclusive",
    href: "/pricing-model",
    img: "our-solutions.svg",
    w: 133,
    h: 156,
  },
  {
    title: "Agency",
    description: "Skilled talent, without the full-time commitment.",
    href: "/outsource-with-agency",
    img: "agency.svg",
    w: 200,
    h: 112,
  },
];

type Doodle = {
  src: string;
  w: number;
  h: number;
  left: string;
  top: string;
  twinkle?: boolean;
  hideOnMobile?: boolean;
};

// left/top are percentages of the section; each doodle is centred on its point.
const DOODLES: Doodle[] = [
  { src: "1.svg", w: 55, h: 55, left: "39%", top: "10%", twinkle: true },
  { src: "2.svg", w: 62, h: 59, left: "79%", top: "17%", twinkle: true },
  { src: "3.svg", w: 44, h: 42, left: "17%", top: "30%" },
  { src: "5.svg", w: 48, h: 46, left: "49%", top: "90%", twinkle: true },
  { src: "6.svg", w: 67, h: 65, left: "13%", top: "92%", hideOnMobile: true },
  { src: "4.svg", w: 46, h: 46, left: "86%", top: "94%", hideOnMobile: true },
];

const DOODLE_PATH = "/v26-images/home/one-partner/";

const OnePartner = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide doodles + cards before first paint so the entrance always plays from
  // scratch (no flash of fully-visible content while scrolling into view).
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.set(".op-doodle-enter", { autoAlpha: 0, scale: 0.4 });
      gsap.set(".op-reveal", { autoAlpha: 0, y: 24 });
      gsap.set(".op-card", { autoAlpha: 0, y: 40 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    const el = rootRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Heading leads, then the cards follow.
      gsap.to(".op-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Cards rise + fade in, staggered left-to-right.
      gsap.to(".op-card", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.1,
      });

      // Doodles: staggered pop-in with a little overshoot.
      gsap.to(".op-doodle-enter", {
        autoAlpha: 1,
        scale: 1,
        rotate: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: { each: 0.09, from: "random" },
      });

      // Idle float + wobble — de-synchronised so it never looks mechanical.
      gsap.utils.toArray<HTMLElement>(".op-doodle-float").forEach((node) => {
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
      gsap.utils.toArray<HTMLElement>(".op-doodle-twinkle").forEach((node) => {
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
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[150px] md:py-[150px]"
    >
      {/* Decorative doodles */}
      {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 scale-[0.7] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="op-doodle-enter">
            <div className="op-doodle-float">
              <Image
                src={`${DOODLE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className={doodle.twinkle ? "op-doodle-twinkle" : undefined}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <h2 className="op-reveal text-center text-[36px] leading-tight lg:text-[50px] lg: font-medium text-[#121212] mb-[64px] md:mb-[80px] mt-6">
          One partner. <span className="text-[#F99621]">The Right Solution.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="op-card border boorder-[#D9D9D9] group flex flex-col rounded-[24px] overflow-hidden min-h-[420px] transition-transform duration-300 ease-out hover:-translate-y-2 bg-[#FAFAFA]"
              // style={{
              //   background:
              //     "linear-gradient(180deg, #FBFBFB 0%, #FBFBFB 42%, #F8F0E0 42%, #F5EBD8 100%)",
              // }}
            >
              <div className="px-[32px] pt-[40px] pb-10 h-[212px]">
                <h3 className="text-[36px] md:text-[32px] font-bold text-black mb-2">
                  {card.title}
                </h3>
                <p className="text-base leading-[150%] font-normal tracking-[0%] text-[#4A4A4A]">
                  {card.description}
                </p>
              </div>
              <div className="mt-auto bg-[#FEF5E9] flex flex-1 items-center justify-center px-[32px] py-[80px]">
                <Image
                  src={`${DOODLE_PATH}${card.img}`}
                  alt=""
                  width={card.w}
                  height={card.h}
                  className="transition-transform duration-500 ease-out group-hover:scale-105"
                  style={{ height: "auto" }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnePartner;
