"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import {
  homepageTestimonials,
  type Testimonial,
} from "@/lib/homepage-testimonials";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * Shared single-quote testimonial section, used on the home page niches and
 * every talent page.
 *
 * One testimonial at a time: the client's logo sits in a ring on the left, the
 * quote and attribution on the right, and a pair of round arrows steps through
 * the set underneath. Quotes come from `lib/homepage-testimonials` unless a page
 * passes its own.
 */
type ClientTestimonialProps = {
  testimonials?: Testimonial[];
  /** Section background — white by default. */
  background?: string;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const ClientTestimonial = ({
  testimonials = homepageTestimonials,
  background = "#FFFFFF",
  className = "",
}: ClientTestimonialProps) => {
  const { ref, inView } = useInView(REVEAL_IN_VIEW);
  // Direction only drives which way the quote slides in.
  const [[index, direction], setIndex] = useState<[number, number]>([0, 1]);

  if (testimonials.length === 0) return null;

  const total = testimonials.length;
  const active = testimonials[index];
  const logo = active.companyLogo || active.image;

  const go = (step: number) =>
    setIndex(([current]) => [(current + step + total) % total, step]);

  return (
    <section
      ref={ref}
      className={`relative px-[24px] py-[72px] md:px-[40px] md:py-[150px] ${className}`}
      style={{ backgroundColor: background }}
    >
      <div className="container mx-auto max-w-275">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center gap-[32px] md:flex-row md:items-start md:gap-[64px] lg:gap-[100px]"
        >
          {logo ? (
            <div className="relative size-[120px] shrink-0 overflow-hidden rounded-full border-[0.62px] border-[#D9D9D9] bg-white md:size-[160px]">
              <Image
                src={logo}
                alt={active.company || active.name}
                fill
                sizes="160px"
                className="object-contain p-[24px] md:p-[32px]"
              />
            </div>
          ) : null}

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="text-[20px] leading-[1.6] font-medium tracking-[-0.02em] text-[#3D3D3D] md:text-[26px] md:leading-[1.7] lg:text-[24px] lg:leading-[45px]">
                  {active.quote}
                  {active.thankYou ? ` ${active.thankYou}` : null}
                </p>

                <footer className="mt-[32px] md:mt-[48px]">
                  <p className="text-[16px] leading-[1.2] font-semibold text-[#404040] md:text-[20px] md:leading-[36px] tracking-[0%]">
                    {active.name}
                  </p>
                  {active.company || active.location ? (
                    <p className="mt-[6px] text-[14px] leading-[1.4] font-normal text-[#303030] tracking-[0%] md:text-[15px]">
                      {[active.company, active.location]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  ) : null}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </motion.div>

        {total > 1 && (
          <div className="mt-[40px] flex items-center justify-center gap-[16px] md:mt-[64px]">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex size-[48px] items-center justify-center rounded-full bg-[#E3B989] text-[#8C5A14] transition-colors duration-300 hover:bg-[#EC9A3C] hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="size-[20px]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.5 7.5 12 15 4.5"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex size-[48px] items-center justify-center rounded-full bg-[#E3B989] text-[#8C5A14] transition-colors duration-300 hover:bg-[#EC9A3C] hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="size-[20px]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 4.5l7.5 7.5L9 19.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientTestimonial;
