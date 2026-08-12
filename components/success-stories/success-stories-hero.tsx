"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

type Photo = {
  src: string;
  alt: string;
  className: string;
};

const PHOTOS: Photo[] = [
  {
    src: "/v26-images/success-stories/1.jpg",
    alt: "A client celebrating at her laptop",
    className: "md:-translate-y-[40px] md:-rotate-[8deg]",
  },
  {
    src: "/v26-images/success-stories/2.jpg",
    alt: "A client waving on a video call",
    className: "",
  },
  {
    src: "/v26-images/success-stories/3.jpg",
    alt: "A client smiling on the phone at her desk",
    className: "",
  },
  {
    src: "/v26-images/success-stories/4.jpg",
    alt: "A client cheering in front of his laptop",
    className: "md:-translate-y-[52px] md:rotate-[8deg]",
  },
];

const SuccessStoriesHero = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy and photos before the first paint, so the entrance below
  // always plays from the start instead of popping in half-finished.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".ss-line-inner", { yPercent: 110 });
      gsap.set(".ss-hero-para", { autoAlpha: 0, y: 20 });
      gsap.set(".ss-hero-photo", { autoAlpha: 0, y: 40 });
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
      tl.to(".ss-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Paragraph fades up while the heading is still settling.
      tl.to(
        ".ss-hero-para",
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      );

      // Photos rise in left to right, just behind the copy.
      tl.to(
        ".ss-hero-photo",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.35"
      );
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
      className="relative overflow-hidden bg-[#FEF5E9] px-[24px] pt-[80px] pb-0 md:px-[40px] md:pt-[120px]"
    >
      <div className="container relative z-10 mx-auto max-w-(--breakpoint-xl)">
        <div className="mx-auto max-w-[820px] text-center">
          <h1 className="text-[36px] leading-[1.1] tracking-[-3%] font-semibold text-[#121212] sm:text-[48px] lg:text-[60px]">
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
              <span className="ss-line-inner block">
                Real business, <span className="text-[#F99621]">Real result.</span>
              </span>
            </span>
          </h1>

          <p className="ss-hero-para mx-auto mt-[24px] max-w-[560px] text-[18px] leading-[25.86px] font-normal text-[#4C4C4C] md:text-[20px]">
            See how companies across the U.S. are working smarter with All
            Talentz.
          </p>
        </div>

        <div className="mt-[64px] grid grid-cols-2 gap-[16px] pb-[80px] md:mt-[112px] md:flex md:items-start md:justify-center md:gap-[48px] md:pb-[120px]">
          {PHOTOS.map((photo) => (
            <div
              key={photo.src}
              className={`ss-hero-photo aspect-square overflow-hidden rounded-[20px] shadow-[0_18px_40px_rgba(18,18,18,0.12)] md:h-[224.05px] md:w-[224.05px] md:shrink-0 md:rounded-[13px] ${photo.className}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={800}
                priority
                sizes="(max-width: 768px) 50vw, 225px"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesHero;
