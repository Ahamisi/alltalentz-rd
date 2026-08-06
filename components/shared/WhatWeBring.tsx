"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * "What All Talentz brings" — the same headline and three proof points on every
 * talent page, so the copy lives here rather than being passed in.
 *
 * A single hairline-bordered panel: headline centred, then a row of icon + label
 * pairs. The panel is white on the left and warms to cream on the right — that
 * wash is the design's radial gradient (#70440F → #FBA600) laid over the panel at
 * low opacity, blurred, and masked so it only reads on the right-hand side.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** Icons are drawn ~1.35× their intrinsic size to match the reference layout. */
const ICON_SCALE = 1.35;

// The SVGs differ in aspect ratio, so each carries its own intrinsic size.
const ITEMS = [
  {
    src: "/v26-images/talentz-pages/certified.svg",
    label: "Certified",
    width: 42,
    height: 60,
  },
  {
    src: "/v26-images/talentz-pages/fast.svg",
    label: "Fast",
    width: 70,
    height: 38,
  },
  {
    src: "/v26-images/talentz-pages/cost-efficient.svg",
    label: "Cost-efficient",
    width: 47,
    height: 68,
  },
];

const WhatWeBring = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative bg-white px-[24px] py-[72px] md:px-[40px] md:py-[120px]"
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative overflow-hidden rounded-[24px] px-[24px] py-[48px] md:rounded-[32px] md:px-[48px] md:py-[80px]"
          style={{ border: "0.5px solid #F99621" }}
        >
          {/*
            The warm right-hand wash. Sized past the panel's edges so the blur
            never feathers back inside and expose a soft rim; the horizontal mask
            keeps the left half white, as in the design.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[25%] -right-[8%] -bottom-[25%] w-[72%]"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, #70440F 0%, #FBA600 100%)",
              opacity: 0.1,
              filter: "blur(40px)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 45%, #000 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 45%, #000 100%)",
            }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-[900px] text-center text-[30px] leading-[1.12] font-semibold tracking-[-0.03em] text-[#121212] md:text-[42px] lg:text-[50px] lg:leading-[1.15]">
              What All Talentz brings
            </h2>

            <ul className="mt-[40px] flex flex-col items-center justify-center gap-[32px] md:mt-[64px] md:flex-row md:gap-[64px] lg:mt-[80px] lg:gap-[110px]">
              {ITEMS.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: 0.2 + i * 0.12,
                  }}
                  className="flex items-center gap-[14px] md:gap-[18px]"
                >
                  <Image
                    src={item.src}
                    alt=""
                    aria-hidden
                    width={Math.round(item.width * ICON_SCALE)}
                    height={Math.round(item.height * ICON_SCALE)}
                    className="h-auto w-auto shrink-0"
                  />
                  <span className="text-[20px] leading-[1.2] font-medium tracking-[-0.01em] text-[#121212] md:text-[24px]">
                    {item.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeBring;
