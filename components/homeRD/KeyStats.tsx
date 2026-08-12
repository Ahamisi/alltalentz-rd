"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GradientStar from "./GradientStar";
import CountUp from "./CountUp";
import { REVEAL_IN_VIEW } from "@/lib/motion";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "75%", label: "Average savings on labour costs" },
  { value: "< 48 hours", label: "From request to assignment" },
  { value: "6+", label: "Industries served across the U.S." },
  { value: "24/7", label: "Operational support, always on." },
];

const KeyStats = () => {
  const { ref, inView } = useInView(REVEAL_IN_VIEW);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <section className="bg-[#121212] py-[150px] px-[24px] md:px-[40px]" ref={ref}>
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {stats.map((stat, index) => (
            // Gradient border: this wrapper is the border and the div inside is
            // the fill, so the 1.24px padding is the border width. border-image
            // cannot follow rounded corners, which is why it is faked this way.
            <motion.div
              key={stat.value}
              className="group rounded-[24px] p-[1.24px] [background-position:0%_50%] hover:[background-position:100%_50%] transition-[background-position] duration-[900ms] ease-out"
              style={{
                backgroundImage:
                  "linear-gradient(104.59deg, rgba(255, 255, 255, 0.3) 0.76%, rgba(255, 255, 255, 0.0768416) 32.78%, rgba(255, 255, 255, 0.220526) 69.11%, rgba(255, 255, 255, 0.021) 99%)",
                backgroundSize: "220% 220%",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={controls}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
            >
              <div
                className="flex h-full flex-col items-center justify-center text-center rounded-[22.76px] px-[28px] py-[44px] min-h-[280px] [background-position:0%_0%] group-hover:[background-position:60%_45%] transition-[background-position] duration-[900ms] ease-out"
                style={{
                  backgroundColor: "#141414",
                  backgroundImage:
                    "linear-gradient(145deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 45%)",
                  backgroundSize: "200% 200%",
                }}
              >
                <div className="flex items-center gap-[6px] mb-[22px]">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <GradientStar
                      key={star}
                      id={`keystat-${index}-${star}`}
                      delay={(index * 5 + star) * 0.18}
                    />
                  ))}
                </div>

                <span className="text-white text-[46.29px] leading-[62.07px] font-normal tracking-[0%] mb-[16px]">
                  <CountUp value={stat.value} active={inView} />
                </span>
                <p className="text-[#FFFFFFA8] text-[18px] font-normal max-w-[206.68px]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStats;
