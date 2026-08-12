"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "Premium Talent. Honest Pricing" — a two-card cost comparison: the true cost
 * of a US full-time hire (cream card, red outline) against the All Talentz rate
 * (orange card) — each closed out with the shared close / check mark.
 *
 * Heading fades up, then the cards rise + fade in staggered — same entrance
 * treatment as TheModel and the rest of the redesign.
 */
const CLOSE_ICON = "/v26-images/agency/tables/close-icon.svg";
const CHECK_ICON = "/v26-images/agency/tables/check-icon.svg";

const Pricing = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the heading + cards before first paint so the entrance always plays
  // from scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".pr-heading", { autoAlpha: 0, y: 24 });
      gsap.set(".pr-card", { autoAlpha: 0, y: 40 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".pr-heading", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
      });

      tl.to(
        ".pr-card",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.25"
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
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <h2 className="pr-heading text-center text-[32px] leading-[100%] lg:text-[48px] xl:text-[50px] font-semibold tracking-[0%] text-[#121212]">
          Premium Talent. Honest Pricing
        </h2>
        <p className="pr-heading mt-[16px] text-center text-[18px] leading-[150%] lg:leading-[32px] lg:text-[24px] font-normal text-[#B6B6B6]">
          No hidden fees. No long-term lock-ins.
        </p>

        <div className="mt-[64px] md:mt-[96px] mx-auto grid max-w-[780px] grid-cols-1 items-stretch gap-[32px] md:grid-cols-2 md:gap-[60px]">
          {/* The true cost of a local hire */}
          <div className="pr-card flex flex-col overflow-hidden rounded-[12px] border border-[#ECECEC] bg-white">
            <div className="bg-[#FDDEBA] px-[24px] py-[40px] text-center">
              <h3 className="text-[22px] leading-[130%] lg:leading-[42.41px] font-semibold text-[#171923]">
                US Full Time Salary
              </h3>
              <p className="mt-[12px] text-[44px] leading-[120%] font-bold text-[#121212]">
                $85k-$127k
              </p>
              <p className="mt-[12px] text-[18px] font-normal text-[#171923]">Per year</p>
            </div>
            <div className="flex flex-1 flex-col items-center gap-[40px] px-[32px] py-[48px] text-center">
              <p className="text-[20px] leading-[150%] font-normal text-[#2D3748] max-w-[400px]">
                Salary + taxes + benefits + office + recruitment
              </p>
              <Image
                src={CLOSE_ICON}
                alt=""
                width={19}
                height={19}
                className="w-[40px]"
                style={{ height: "auto" }}
              />
            </div>
          </div>

          {/* All Talentz */}
          <div className="pr-card flex flex-col overflow-hidden rounded-[12px] border border-[#ECECEC] bg-white">
            <div className="bg-[#F99621] px-[24px] py-[40px] text-center">
              <h3 className="text-[22px] leading-[130%] lg:leading-[42.41px] font-semibold text-white">All Talentz</h3>
              <p className="mt-[12px] text-[44px] leading-[120%] font-bold text-white">$6,000</p>
              <p className="mt-[12px] text-[18px] font-normal text-white">Per year</p>
            </div>
            <div className="flex flex-1 flex-col items-center gap-[40px] px-[32px] py-[48px] text-center">
              <p className="text-[20px] leading-[150%] font-normal text-[#121212] max-w-[400px]">
                75% back in your budget — every year
              </p>
              <Image
                src={CHECK_ICON}
                alt=""
                width={26}
                height={22}
                className="w-[48px]"
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>

        <div className="pr-card mt-[48px] flex justify-center md:mt-[64px]">
          <Link
            href="/request-talent"
            className="inline-flex w-full max-w-[356px] items-center justify-center bg-[#F99621] px-[40px] py-[16px] text-[16px] font-medium text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a]"
          >
            Get Talentz
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
