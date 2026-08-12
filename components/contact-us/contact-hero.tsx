"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "We'd love to hear from you." — Contact Us hero.
 *
 * Left column: masked line-reveal heading (same treatment as the Hire Talentz /
 * Our Solutions heroes). Right column: the seven hand-drawn contact doodles
 * scattered across an invisible canvas — pin, handset, phone book, mobile,
 * chat bubbles, envelope and globe.
 *
 * Each doodle pops in with an overshoot, then floats/rotates forever on its own
 * de-synchronised loop so the cluster never reads as a static image. `pulse`
 * icons additionally breathe in scale, giving the group a second rhythm.
 */
type Doodle = {
  src: string;
  alt: string;
  /** Intrinsic viewBox size (px) — also the rendered size at desktop scale. */
  w: number;
  h: number;
  /** Centre point as a percentage of the doodle canvas. */
  left: string;
  top: string;
  /** Add a slow scale breath on top of the float. */
  pulse?: boolean;
};

const DOODLE_PATH = "/v26-images/contact-us/";

const DOODLES: Doodle[] = [
  { src: "map.svg", alt: "", w: 65, h: 79, left: "9%", top: "40%" },
  { src: "tel.svg", alt: "", w: 57, h: 90, left: "32%", top: "42%", pulse: true },
  { src: "phone-book.svg", alt: "", w: 78, h: 84, left: "59%", top: "18%" },
  { src: "mobile.svg", alt: "", w: 67, h: 81, left: "85%", top: "45%" },
  { src: "chat.svg", alt: "", w: 100, h: 89, left: "58%", top: "63%", pulse: true },
  { src: "message.svg", alt: "", w: 97, h: 70, left: "23%", top: "82%" },
  { src: "globe.svg", alt: "", w: 81, h: 74, left: "89%", top: "83%" },
];

const ContactHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide everything before first paint so the entrance always plays from scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".ch-line-inner", { yPercent: 110 });
      gsap.set(".ch-doodle-enter", { autoAlpha: 0, scale: 0.4 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each heading line rises up from behind its clip mask, staggered.
      tl.to(".ch-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Doodles pop in with a little overshoot, in a random order.
      tl.to(
        ".ch-doodle-enter",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: { each: 0.1, from: "random" },
        },
        "-=0.55"
      );

      // Endless float: every doodle drifts and tilts on its own timing.
      gsap.utils.toArray<HTMLElement>(".ch-doodle-float").forEach((node) => {
        gsap.to(node, {
          y: gsap.utils.random(-12, -6),
          rotate: gsap.utils.random(-6, 6),
          duration: gsap.utils.random(2.4, 3.8),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 1.2),
        });
      });

      // A slower scale breath on the "conversation" icons.
      gsap.utils.toArray<HTMLElement>(".ch-doodle-pulse").forEach((node) => {
        gsap.to(node, {
          scale: 1.08,
          duration: gsap.utils.random(1.6, 2.2),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 0.8),
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
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-2 lg:gap-[40px]">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <h1 className="text-[32px] leading-[1.12] tracking-[-3%] sm:text-[44px] sm:tracking-[-5%] lg:text-[60px] lg:leading-[67.25px] font-semibold text-[#121212]">
              {/* pb/-mb: give the clip mask room for descenders (y, .) without
                  changing the visual line spacing. */}
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="ch-line-inner block">We&rsquo;d love to hear</span>
              </span>
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="ch-line-inner block">from you.</span>
              </span>
            </h1>
          </div>

          {/* Doodle canvas — aspect box keeps the scatter proportional at any width */}
          <div
            aria-hidden="true"
            className="relative order-1 w-full lg:order-2"
            style={{ aspectRatio: "740 / 380" }}
          >
            {DOODLES.map((doodle) => (
              <div
                key={doodle.src}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 scale-[0.6] sm:scale-75 lg:scale-90 xl:scale-100"
                style={{ left: doodle.left, top: doodle.top }}
              >
                <div className="ch-doodle-enter">
                  <div className="ch-doodle-float">
                    <div className={doodle.pulse ? "ch-doodle-pulse" : undefined}>
                      <Image
                        src={`${DOODLE_PATH}${doodle.src}`}
                        alt={doodle.alt}
                        width={doodle.w}
                        height={doodle.h}
                        priority
                        style={{ transformOrigin: "center", height: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
