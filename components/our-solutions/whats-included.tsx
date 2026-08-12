"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

// Grid rules come from a 1px gap showing the container colour through, so
// there's no nth-child border maths.
type Item = {
  title: string;
  icon: string;
  // proof: string;
};

const ICONS = "/v26-images/our-solutions/whats-included";

const ITEMS: Item[] = [
  {
    title: "Pre-vetted talent",
    icon: `${ICONS}/pre-vetted.webp`,
    // proof:
    //   "Skills tests, English fluency and background checks are cleared before you see a shortlist.",
  },
  {
    title: "Industry-specific training",
    icon: `${ICONS}/industry-specific.webp`,
    // proof:
    //   "Trained on your sector's tools, terminology and compliance rules before day one.",
  },
  {
    title: "ISO 27001 & SOC-2 certified",
    icon: `${ICONS}/certification.webp`,
    // proof: "Audited security controls, signed NDAs, managed devices.",
  },
  {
    title: "Deployed in less than 48 hours",
    icon: `${ICONS}/deployed.webp`,
    // proof: "Request on Monday. Someone is working by Friday.",
  },
  {
    title: "24/7 support",
    icon: `${ICONS}/customer-support.webp`,
    // proof:
    //   "A named account lead, plus cover across every US timezone including weekends.",
  },
  {
    title: "Flexible scale up/down",
    icon: `${ICONS}/scale-up.webp`,
    // proof: "Add or release seats month to month. No renegotiation.",
  },
];

const BADGE = "/v26-images/our-solutions/certificate-badge.svg";

/** Hairline colour — also the grid container fill that shows through the gaps. */
const RULE = "rgba(255, 255, 255, 0.13)";
const SECTION_BG = "#121212";

const WhatsIncluded = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide everything before first paint so the entrance always plays from
  // scratch rather than flashing fully visible while scrolling in.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".wi-head", { autoAlpha: 0, y: 20 });
      gsap.set(".wi-stamp", { autoAlpha: 0, scale: 0.8, rotate: -22 });
      gsap.set(".wi-matrix", { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(".wi-cell-text", { autoAlpha: 0, y: 16 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".wi-head", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });

      // The stamp lands like it was pressed onto the page.
      tl.to(
        ".wi-stamp",
        {
          autoAlpha: 1,
          scale: 1,
          rotate: -9,
          duration: 0.55,
          ease: "back.out(1.6)",
        },
        "-=0.35"
      );

      // Rules wipe down the page, copy follows a beat behind.
      tl.to(
        ".wi-matrix",
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.3"
      );

      tl.to(
        ".wi-cell-text",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.09,
        },
        "-=0.75"
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
      aria-labelledby="whats-included-heading"
      className="relative overflow-hidden px-[24px] md:px-[40px] py-[100px] md:py-[150px]"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="relative z-10 container mx-auto max-w-(--breakpoint-xl) xl:max-w-[1100px]">
        <div className="flex items-start justify-between gap-[40px]">
          <div className="max-w-[620px]">
            <h2
              id="whats-included-heading"
              className="wi-head text-[36px] leading-[105%] lg:text-[60px] font-semibold tracking-[-0.01em] text-white"
            >
              What&apos;s included
            </h2>
            <p className="wi-head mt-[20px] text-[18px] leading-[160%] lg:text-[21px] lg:leading-[165%] font-normal text-[#FFFFFF8F]">
              Six things every engagement ships with, at the same flat rate.
              Nothing here is an upgrade.
            </p>
          </div>

          {/* The certification stamp, pressed onto the page */}
          <div className="wi-stamp hidden lg:block shrink-0 pt-[10px]">
            <Image
              src={BADGE}
              alt=""
              aria-hidden="true"
              width={41}
              height={60}
              className="w-[74px] opacity-70"
              style={{ height: "auto" }}
            />
          </div>
        </div>

        {/*
          The 1px gap is the rule: the container colour shows between cells,
          while the cells themselves are filled with the section colour.
        */}
        <ul
          className="wi-matrix mt-[64px] md:mt-[88px] grid grid-cols-1 gap-px border-y sm:grid-cols-2 lg:grid-cols-3"
          style={{ backgroundColor: RULE, borderColor: RULE }}
        >
          {ITEMS.map((item, index) => (
            <li
              key={item.title}
              // Fill matches the section so only the gaps read as rules; the
              // hover fill lifts a single cell without breaking the grid.
              className="group flex min-h-[210px] flex-col bg-[#121212] px-[26px] py-[32px] transition-colors duration-500 ease-out hover:bg-[#181818] md:min-h-[248px] md:px-[32px] md:py-[36px]"
            >
              <span className="wi-cell-text text-[13px] leading-none font-normal tabular-nums tracking-[0.18em] text-[#FFFFFF4D] transition-colors duration-400 group-hover:text-[#F99621]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="wi-cell-text mt-auto flex flex-col items-start gap-[18px] pt-[32px]">
                <Image
                  src={item.icon}
                  alt=""
                  aria-hidden="true"
                  width={44}
                  height={44}
                  sizes="44px"
                  className="size-[38px] shrink-0 object-contain md:size-[44px]"
                />
                <h3 className="text-[21px] leading-[132%] md:text-[24px] font-medium tracking-[-0.005em] text-white">
                  {item.title}
                </h3>
                {/* Proof line held back until marketing signs off the copy.
                <p className="mt-[12px] text-[15.5px] leading-[168%] md:text-[16px] font-normal text-[#FFFFFF87]">
                  {item.proof}
                </p>
                */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhatsIncluded;
