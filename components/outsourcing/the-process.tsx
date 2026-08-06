"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

/**
 * "The Process" — Outsourcing page.
 *
 * Four glass panels on an orange wash, each stamped with a big step number:
 * Poppins ExtraLight at 172.82px, filled with the design's peach → orange
 * gradient via `background-clip: text`. The 200 weight is registered in
 * `app/layout.tsx` for this.
 *
 * The panels butt up against each other in the design, so the row collapses the
 * shared 1px edges with `-space-x-px` instead of drawing a gap.
 *
 * The whole section sits on the brand orange #F99621 — one flat colour, no
 * bands or gradient.
 */
type Step = {
  /** Rendered as the outlined numeral — kept as a string to preserve "01". */
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discovery call",
    description: "We learn your business, your needs, and your timeline.",
  },
  {
    number: "02",
    title: "Team Design",
    description: "We match the right professionals to your brief.",
  },
  {
    number: "03",
    title: "Deployment",
    description: "Your team is operational within 7 days.",
  },
  {
    number: "04",
    title: "Ongoing Management",
    description: "We monitor performance and support you",
  },
];

/**
 * The numeral's gradient from the design, painted through the glyphs with
 * `background-clip: text`.
 */
/**
 * Panel wash + hairline. The original design tinted the glass with orange, which
 * vanished once the section itself became #F99621 — so the wash is now white at
 * low alpha, which lifts the panel off the orange from any angle.
 *
 * The panels are square-cornered, so the gradient edge can be a plain
 * `border-image` (`border-image-slice: 1` stretches the single gradient tile
 * across all four sides).
 */
const CARD_STYLE = {
  backgroundImage:
    "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.07) 100%)",
  border: "1.3px solid transparent",
  borderImageSource:
    "linear-gradient(104.59deg, rgba(255, 255, 255, 0.45) 0.76%, rgba(255, 255, 255, 0.12) 32.78%, rgba(255, 255, 255, 0.32) 69.11%, rgba(255, 255, 255, 0.08) 99%)",
  borderImageSlice: 1,
} as const;

/**
 * Any dark stop turns muddy against the flat orange, so the numerals fade from
 * solid white down to translucent white instead — the glyph still falls away
 * toward its base, but stays in the same family as the panel glass.
 */
const NUMBER_STYLE = {
  backgroundImage:
    "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.28) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
} as const;

const TheProcess = () => {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".tp-title", { autoAlpha: 0, y: 20 });
      gsap.set(".tp-card", { autoAlpha: 0, y: 40 });
      gsap.set(".tp-number", { autoAlpha: 0, y: 16 });
      // Start every counter at "00" so the roll-up begins from zero.
      gsap.utils.toArray<HTMLElement>(".tp-number").forEach((node) => {
        node.textContent = "00";
      });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".tp-title", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.to(
        ".tp-card",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.3"
      );

      // Numerals trail their panel so the stroke reads after the glass lands.
      // The label lets the counters share this exact start time instead of
      // chaining fragile relative offsets.
      tl.addLabel("numbers", "-=0.55");
      tl.to(
        ".tp-number",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "numbers"
      );

      // …and each one counts up from 00 to its step number as it fades in,
      // staying zero-padded so "01" never renders as "1".
      gsap.utils.toArray<HTMLElement>(".tp-number").forEach((node, i) => {
        const target = Number(node.dataset.value ?? 0);
        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value: target,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = String(Math.round(counter.value)).padStart(
                2,
                "0"
              );
            },
          },
          `numbers+=${i * 0.12}`
        );
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
      className="relative overflow-hidden bg-[#F99621]"
    >
      <div className="w-full px-[24px] py-[80px] md:px-[40px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1180px]">
          <h2 className="tp-title text-center text-[30px] lg:text-[64px] lg:tracking-[0%] font-medium leading-[100%] text-white md:text-[48px]">
            The Process
          </h2>

          {/* auto-rows-fr + h-full keeps every panel the same height even when a
              title wraps to two lines. */}
          <ol className="mt-[48px] grid auto-rows-fr grid-cols-1 items-stretch sm:grid-cols-2 lg:mt-[100px] lg:grid-cols-4 lg:-space-x-px">
            {STEPS.map((step) => (
              <li
                key={step.number}
                className="tp-card flex h-full flex-col justify-end px-[24px] pb-[40px] pt-[80px] md:px-[32px] md:pb-[56px] md:pt-[140px] lg:min-h-[480px]"
                style={CARD_STYLE}
              >
                <span
                  aria-hidden="true"
                  data-value={step.number}
                  className="tp-number block text-[110px] font-extralight leading-[100%] tracking-[0%] md:text-[172.82px]"
                  style={NUMBER_STYLE}
                >
                  {step.number}
                </span>

                {/* Two lines are reserved so a wrapping title ("Ongoing
                    Management") doesn't shove its numeral out of line with the
                    others. */}
                <h3 className="mt-[32px] text-[16px] font-bold lg:leading-[120%] text-white md:mt-[48px] md:text-[17.28px] tracking-[0%]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[260px] text-[12px] tracking-[0%] font-normal leading-[150%] text-white/85 md:mt-[12px] lg:text-sm">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default TheProcess;
