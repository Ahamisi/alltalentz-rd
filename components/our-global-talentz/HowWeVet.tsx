"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { REVEAL_VIEWPORT } from "@/lib/motion";

/**
 * "How we Vet" — three numbered steps inside a cream band.
 *
 * The band's curved top/bottom edges are SVG strips (`preserveAspectRatio="none"`,
 * so the arc stretches to any viewport width while `vector-effect` keeps the tan
 * outline an even 3px). The quadratic control point sits at `-100` so the curve
 * peaks exactly at the top of the 100-unit viewBox — the arc's full depth is the
 * strip's CSS height, and its ends land flush with the viewport edges.
 */
const STEPS = [
  {
    number: "01",
    title: ["Application", "Screening"],
    src: "/v26-images/global-talentz/how-we-vet/1.jpg",
    alt: "Candidate reviewing an application on a laptop",
  },
  {
    number: "02",
    title: ["Skills", "Assessment"],
    src: "/v26-images/global-talentz/how-we-vet/2.jpg",
    alt: "Two clinicians reviewing notes on a tablet",
  },
  {
    number: "03",
    title: ["Training &", "Certification"],
    src: "/v26-images/global-talentz/how-we-vet/3.jpg",
    alt: "Engineer working through a training exercise",
  },
];

const NUMBER_GRADIENT = "linear-gradient(180deg, #FFE2C2 0%, #E07B01 100%)";

const BAND_FILL = "#FDFAEA";
const BAND_LINE = "#F5D5A3";

/**
 * The arc, inside a 1440x120 viewBox. It ends at y=104 (not 120) and crests at
 * y=8 (not 0) so the stroke has room at both the edges and the crest — sitting a
 * path exactly on the viewBox boundary clips half the stroke and the line looks
 * like it thins out and dies before reaching the viewport edge.
 *
 * Quadratic peak = (P0 + 2C + P2) / 4, so C.y = -88 puts the crest at y=8.
 * Visible depth is therefore 96/120 = 0.8x the strip's CSS height.
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
    {/* Fill closes below the curve, out past the viewBox, so the cream meets
        the solid middle with no gap at any width. */}
    <path d={`${ARC} L1440 130 L0 130 Z`} fill={BAND_FILL} />
    <path
      d={ARC}
      fill="none"
      stroke={BAND_LINE}
      // non-scaling-stroke: keeps the line an even weight despite the extreme
      // horizontal stretch from preserveAspectRatio="none".
      vectorEffect="non-scaling-stroke"
      className="[stroke-width:5px] md:[stroke-width:8px]"
    />
  </svg>
);

const HowWeVet = () => {
  return (
    <section className="relative bg-white">
      {/* Curved cream band */}
      <BandArc />

      {/* -mt/-mb close the hairline seam against the arc strips. */}
      <div className="relative -mt-[1px] -mb-[1px] bg-[#FDFAEA]">
        <div className="px-[24px] pb-[90px] pt-[70px] md:px-[40px] md:pb-[130px] md:pt-[100px]">
          <div className="container mx-auto max-w-(--breakpoint-xl)">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{ duration: 0.5 }}
              className="text-center text-3xl font-semibold tracking-[-5%] text-[#121212] md:text-[55px] md:leading-[64px] tracking-[-4px] lg:text-[60px] lg:leading-[67.25px]"
            >
              How we vet
            </motion.h2>

            <div className="mt-[48px] grid gap-[24px] md:mt-[70px] md:grid-cols-3">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={REVEAL_VIEWPORT}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                  className="overflow-hidden rounded-[24px] bg-[#FEF5E9]"
                >
                  {/* Title + step number */}
                  <div className="flex items-center justify-between gap-[8px] pl-[24px] pr-[20px] pt-[24px] pb-5">
                    <h3 className="text-[18px] lg:text-[20px] lg:leading-[120%] font-bold leading-[24px] text-[#121212] tracking-[0%]">
                      {step.title[0]}
                      <br />
                      {step.title[1]}
                    </h3>
                    <span
                      className="-mb-[0.12em] bg-clip-text text-[120px] font-light leading-[0.85] tracking-[-2%] text-transparent lg:text-[172.82px] pr-4"
                      style={{ backgroundImage: NUMBER_GRADIENT }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Photo */}
                  <div className="relative mt-[20px] h-[260px] w-full lg:h-[320px]">
                    <Image
                      src={step.src}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
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

export default HowWeVet;
