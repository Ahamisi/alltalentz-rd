"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * "Who this is for" — Outsourcing page.
 *
 * Three square cards, each an illustration over a peach radial wash. The
 * gradients come straight from the design; a flat linear-gradient layer sits
 * under each radial so the translucent radial reads as the intended peach
 * rather than washing out against the white section.
 *
 * The hairline border is a gradient too. `border-image-source` squares off the
 * corners on a rounded box, so it's painted as an extra background layer
 * clipped to the border box while the fills stay clipped to the padding box.
 */
type Card = {
  src: string;
  w: number;
  h: number;
  label: string;
  /** Radial wash from the design, layered over a flat peach base (2 layers). */
  background: string;
};

/** Shared 1.51px gradient hairline, from the design. */
const CARD_BORDER =
  "linear-gradient(104.59deg, rgba(102, 102, 102, 0.3) 0.76%, rgba(180, 180, 180, 0.0768416) 32.78%, rgba(90, 90, 90, 0.220526) 69.11%, rgba(186, 181, 181, 0.021) 99%)";

/** Fills clip to the padding box; the border gradient fills the border box. */
const cardStyle = (card: Card) => ({
  backgroundImage: `${card.background}, ${CARD_BORDER}`,
  backgroundOrigin: "padding-box, padding-box, border-box",
  backgroundClip: "padding-box, padding-box, border-box",
  border: "1.51px solid transparent",
});

const CARDS: Card[] = [
  {
    src: "/v26-images/agency/who-this-for/1.svg",
    w: 206,
    h: 142,
    label: "Growing startups building their first team",
    background:
      "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(249, 150, 33, 0.18) 0%, rgba(253, 222, 186, 0.18) 100%), linear-gradient(180deg, #FDF0DF 0%, #FDF3E6 100%)",
  },
  {
    src: "/v26-images/agency/who-this-for/2.svg",
    w: 175,
    h: 137,
    label: "Operators scaling beyond 5 remote professionals",
    background:
      "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(249, 150, 33, 0.29) 0%, rgba(253, 222, 186, 0.13) 100%), linear-gradient(180deg, #FCEAD5 0%, #FDF1E1 100%)",
  },
  {
    src: "/v26-images/agency/who-this-for/3.svg",
    w: 152,
    h: 112,
    label: "Businesses replacing a full in-house department",
    background:
      "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(249, 150, 33, 0.18) 0%, rgba(253, 222, 186, 0.14) 100%), linear-gradient(180deg, #FDF0DF 0%, #FDF4E9 100%)",
  },
];

const WhoThisIsFor = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".wtif-title", { autoAlpha: 0, y: 20 });
      gsap.set(".wtif-card", { autoAlpha: 0, y: 40 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".wtif-title", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.to(
        ".wtif-card",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.3"
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
      className="relative bg-white px-[24px] py-[80px] md:px-[40px] md:py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="wtif-title text-center text-[30px] font-medium leading-tight tracking-[-0.05em] text-[#121212] md:text-[48px]">
          Who this is for
        </h2>

        <ul className="mt-[48px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 md:mt-[80px] lg:grid-cols-3 lg:gap-[40px]">
          {CARDS.map((card) => (
            <li
              key={card.src}
              className="wtif-card flex aspect-square flex-col items-center justify-center rounded-[37.71px] px-[32px] py-[32px] md:rounded-[37.71px]"
              style={cardStyle(card)}
            >
              <Image
                src={card.src}
                alt=""
                aria-hidden="true"
                width={card.w}
                height={card.h}
                className="h-auto w-[55%] max-w-[206px]"
              />
              <p className="mt-[32px] max-w-[300px] text-center text-[16px] leading-[100%] text-[#57350C] md:mt-[48px] md:text-[20px] font-normal tracking-[0%]">
                {card.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhoThisIsFor;
