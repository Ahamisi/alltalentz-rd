"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

/**
 * "How to apply" — four numbered steps inside a curved cream band.
 *
 * The band's curved top/bottom edges follow the same SVG-strip approach as
 * `components/our-global-talentz/HowWeVet`: `preserveAspectRatio="none"` stretches
 * the arc to any viewport width while `vector-effect` keeps the tan outline an
 * even weight.
 */
const STEPS = [
  {
    number: 1,
    title: "Submit Application",
    // Each card carries the radial sheen over its own linear base so the tint
    // reads on the cream band instead of disappearing into it.
    background:
      "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(249, 150, 33, 0.18) 0%, rgba(253, 222, 186, 0.18) 100%), linear-gradient(180deg, #FDF0DF 0%, #FDF3E6 100%)",
  },
  {
    number: 2,
    title: "Video Audition",
    background:
      "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(249, 150, 33, 0.29) 0%, rgba(253, 222, 186, 0.13) 100%), linear-gradient(180deg, #FCEAD5 0%, #FDF1E1 100%)",
  },
  {
    number: 3,
    title: "Get Interviewed",
    background:
      "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(249, 150, 33, 0.18) 0%, rgba(253, 222, 186, 0.14) 100%), linear-gradient(180deg, #FDF0DF 0%, #FDF4E9 100%)",
  },
  {
    number: 4,
    title: "Programme & Placement",
    background:
      "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(249, 150, 33, 0.18) 0%, rgba(253, 222, 186, 0.14) 100%), linear-gradient(180deg, #FDF0DF 0%, #FDF4E9 100%)",
  },
];

const NUMBER_GRADIENT = "linear-gradient(180deg, #FFE2C2 0%, #E07B01 100%)";

const BAND_FILL = "#FDF4E9";
const BAND_LINE = "#F5D5A3";

/**
 * The arc, inside a 1440x120 viewBox. It ends at y=104 (not 120) and crests at
 * y=8 (not 0) so the stroke has room at both the edges and the crest — a path
 * sitting exactly on the viewBox boundary gets half its stroke clipped.
 */
const ARC = "M0 104 Q720 -88 1440 104";

/** One curved edge of the band. `flip` mirrors it for the bottom. */
const BandArc = ({ flip = false }: { flip?: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 1440 120"
    preserveAspectRatio="none"
    className={`block h-[40px] w-full md:h-[76px] ${flip ? "scale-y-[-1]" : ""}`}
  >
    <path d={`${ARC} L1440 130 L0 130 Z`} fill={BAND_FILL} />
    <path
      d={ARC}
      fill="none"
      stroke={BAND_LINE}
      vectorEffect="non-scaling-stroke"
      className="[stroke-width:5px] md:[stroke-width:8px]"
    />
  </svg>
);

/** Counts 0 → `target`, rendered zero-padded to two digits ("04"). */
const StepNumber = ({ target, active, delay = 0 }: { target: number; active: boolean; delay?: number }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;

    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setCurrent(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.2,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setCurrent(v),
    });
    return () => controls.stop();
  }, [active, target, delay]);

  return (
    <span
      className="bg-clip-text text-[92px] font-light leading-[0.85] tracking-[-2%] text-transparent tabular-nums md:text-[120px] lg:text-[172.82px]"
      style={{ backgroundImage: NUMBER_GRADIENT }}
    >
      {String(Math.round(current)).padStart(2, "0")}
    </span>
  );
};

const VIEWPORT = { once: true, amount: 0.15 } as const;

const HowToApply = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  // Drives the counters — the numbers should start together with the cards, not
  // on mount, or they finish counting before anyone sees them.
  const inView = useInView(gridRef, VIEWPORT);

  return (
    <section className="relative bg-white">
      <BandArc />

      {/* -mt/-mb close the hairline seam against the arc strips. */}
      <div className="relative -mt-[1px] -mb-[1px] bg-[#FDF4E9]">
        <div className="px-[24px] pb-[90px] pt-[40px] md:px-[40px] md:pb-[130px] md:pt-[60px]">
          <div className="container mx-auto max-w-(--breakpoint-xl)">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5 }}
              className="text-center text-3xl font-semibold tracking-[-5%] text-[#121212] md:text-[55px] md:leading-[64px] lg:text-[60px] lg:leading-[67.25px]"
            >
              How to apply
            </motion.h2>

            {/* Cards sit flush against each other, as one continuous strip. */}
            <div
              ref={gridRef}
              className="mt-[48px] grid grid-cols-1 gap-[2px] sm:grid-cols-2 md:mt-[70px] lg:grid-cols-4"
            >
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                  className="flex aspect-square flex-col items-center justify-center gap-[18px] px-[20px] py-[32px] text-center"
                  style={{ background: step.background }}
                >
                  <StepNumber target={step.number} active={inView} delay={0.15 + i * 0.12} />
                  <h3 className="text-[16px] font-bold leading-[130%] tracking-[0%] text-[#121212] md:text-[18px]">
                    {step.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BandArc flip />
    </section>
  );
};

export default HowToApply;
