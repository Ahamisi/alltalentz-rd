"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { CERTIFICATIONS } from "@/lib/certifications";
import { REVEAL_IN_VIEW } from "@/lib/motion";

const CARD_STYLE = {
  backgroundImage:
    "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(38, 38, 38, 0.18) 0%, rgba(168, 168, 168, 0.14) 100%)",
  border: "1.3px solid transparent",
  borderImageSource:
    "linear-gradient(104.59deg, rgba(255, 255, 255, 0.3) 0.76%, rgba(180, 180, 180, 0.0768416) 32.78%, rgba(226, 226, 226, 0.220526) 69.11%, rgba(186, 181, 181, 0.021) 99%)",
  borderImageSlice: 1,
} as const;

const Certifications = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".cert-title", { autoAlpha: 0, y: 20 });
      gsap.set(".cert-card", { autoAlpha: 0, y: 40 });
      gsap.set(".cert-badge", { autoAlpha: 0, scale: 0.9 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // One entrance timeline, played when the section scrolls into view.
      const tl = gsap.timeline();

      // Title first.
      tl.to(".cert-title", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Then the four panels rise in one after another.
      tl.to(
        ".cert-card",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.3"
      );

      // Each badge settles in just behind its own panel.
      tl.to(
        ".cert-badge",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.55"
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
      className="relative overflow-hidden bg-white px-[24px] py-[80px] md:px-[40px] md:py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="cert-title text-center text-[30px] font-medium leading-[100%] tracking-[0%] text-[#121212] md:text-[48px] lg:text-[64px]">
          Certifications
        </h2>

        <ul className="mt-[48px] grid auto-rows-fr grid-cols-2 items-stretch lg:mt-[100px] lg:grid-cols-4 lg:-space-x-px">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert.src}
              className="cert-card flex h-full flex-col items-center justify-end px-[16px] pb-[32px] pt-[32px] text-center sm:items-start sm:px-[24px] sm:pb-[40px] sm:pt-[40px] sm:text-left md:px-[32px] md:pb-[75px] md:pt-[75px] lg:min-h-[450px]"
              style={CARD_STYLE}
            >
              <div className="cert-badge flex h-[72px] items-end justify-center sm:h-[90px] sm:justify-start md:h-[120px]">
                <Image
                  src={cert.src}
                  alt={`${cert.name} certification badge`}
                  width={cert.artwork.w}
                  height={cert.artwork.h}
                  className="max-h-full w-auto object-contain object-center sm:object-left"
                />
              </div>

              <h3 className="mt-[20px] text-[14px] font-bold uppercase leading-[120%] tracking-[0%] text-[#121212] sm:text-[16px] md:mt-[24px] md:text-[17.28px]">
                {cert.name}
              </h3>
              <p className="mx-auto mt-2 max-w-[260px] text-[12px] font-normal leading-[150%] tracking-[0%] text-[#121212]/80 sm:mx-0 md:mt-[12px] lg:text-sm">
                {cert.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Certifications;
