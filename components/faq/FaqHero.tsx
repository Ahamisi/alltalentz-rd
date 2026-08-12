"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * FAQ page heading — "Frequently Asked Questions" set large and left-aligned,
 * each line rising out of its own clip mask.
 *
 * Same entrance grammar as BlogHero (clip-masked lines, power4.out) so the two
 * content pages feel like one system. Runs on mount rather than on scroll: it
 * sits at the top of the document and is always in view on load.
 */
export default function FaqHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(".fq-line-inner", { yPercent: 110 });
      gsap.set(".fq-reveal", { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({ delay: 0.05 });
      tl.to(".fq-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.1,
      }).to(
        ".fq-reveal",
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" },
        "-=0.45"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="max-w-[720px]">
      <h1 className="text-[34px] leading-[1.06] tracking-[-3%] font-semibold text-[#121212] sm:text-[46px] lg:text-[60px]">
        {/* pb/-mb pair: room for descenders inside the mask without changing
            the visual line spacing. */}
        <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
          <span className="fq-line-inner block">Frequently Asked</span>
        </span>
        <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
          <span className="fq-line-inner block">Questions</span>
        </span>
      </h1>

      {/* <p className="fq-reveal mt-[20px] max-w-[520px] text-[16px] leading-[26px] text-[#5C5C5C] md:text-[17px]">
        Everything you’re wondering about hiring, pricing, vetting and our
        programmes — answered by vertical.
      </p> */}
    </div>
  );
}
