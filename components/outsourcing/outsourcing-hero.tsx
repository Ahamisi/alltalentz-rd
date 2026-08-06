"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

/**
 * "Your talent partner, Not just a staffing agency." — Outsourcing hero.
 *
 * Left column: heading + supporting copy + "Work with us" CTA.
 * Right column: the collage handshake-through-laptops illustration.
 *
 * A single grayscaled hand-drawn "rays" doodle pops in and then floats on a
 * gentle loop, matching the Our Solutions hero treatment.
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
  { src: "2.svg", w: 121, h: 79, left: "52%", top: "33%" },
];

const DOODLE_PATH = "/v26-images/agency/";

const OutsourcingHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy + illustration before first paint so the entrance always
  // plays from scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".oh-line-inner", { yPercent: 110 });
      gsap.set(".oh-hero-para, .oh-hero-cta", { autoAlpha: 0, y: 20 });
      gsap.set(".oh-hero-art", { autoAlpha: 0, y: 30, scale: 0.96 });
      gsap.set(".oh-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".oh-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Paragraph then button fade up just after the heading settles.
      tl.to(
        ".oh-hero-para, .oh-hero-cta",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.35"
      );

      // Illustration settles in alongside the copy.
      tl.to(
        ".oh-hero-art",
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Doodles pop in with a little overshoot, then float on a loop.
      tl.to(
        ".oh-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.12, from: "random" },
        },
        "-=0.5"
      );

      gsap.utils.toArray<HTMLElement>(".oh-doodle-float").forEach((node) => {
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
          className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-[0.7] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="oh-doodle-enter">
            <div className="oh-doodle-float">
              <Image
                src={`${DOODLE_PATH}${doodle.src}`}
                alt=""
                width={doodle.w}
                height={doodle.h}
                className="grayscale"
                style={{ transformOrigin: "center", height: "auto" }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        {/* Copy column is intentionally much wider than the illustration (≈65/35). */}
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-[1.3fr_0.7fr] lg:gap-[40px]">
          {/* Copy */}
          <div className="oh-hero-copy order-2 lg:order-1">
            <h1 className="text-[44px] tracking-[-5%] lg:text-[60px] lg:leading-[67.25px] font-semibold text-[#121212]">
              {/* pb/‑mb: give the clip mask room for descenders (y, g, .)
                  without changing the visual line spacing. */}
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="oh-line-inner block">Your talent partner,</span>
              </span>
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="oh-line-inner block">
                  Not just a staffing agency.
                </span>
              </span>
            </h1>
            <p className="oh-hero-para mt-[24px] text-[18px] leading-[25.86px] font-normal text-[#121212] md:text-[20px] max-w-[520px]">
              From single placements to fully managed remote teams — we scale
              with you.
            </p>
            <Link
              href="https://calendly.com/mnwoseh/"
              target="_blank"
              rel="noopener noreferrer"
              className="oh-hero-cta mt-[32px] inline-flex items-center justify-center bg-[#F99621] px-[40px] py-[16px] font-medium text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a]"
            >
              Work with us
            </Link>
          </div>

          {/* Illustration — handshake through two laptops */}
          <div className="order-1 lg:order-2">
            <Image
              src="/v26-images/agency/hero.png"
              alt="Two hands shaking through laptop screens, illustrating a remote partnership"
              width={614}
              height={493}
              priority
              className="oh-hero-art mx-auto h-auto w-full max-w-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutsourcingHero;
