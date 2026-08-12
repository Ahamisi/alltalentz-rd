"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";
import { REVEAL_IN_VIEW } from "@/lib/motion";

/**
 * Shared "Why it matters" section for every talent page.
 *
 * Centred headline over a row of stat cards. Each card is a coloured panel with
 * the stat set in white at the top and a photo filling the rest, flush with the
 * card's bottom edge. Everything niche-specific comes in through props, so a new
 * page is one `<WhyItMatters {...} />` call.
 *
 * Two cards read best; three fit one desktop row, four wrap to a second.
 */
export type WhyItMattersCard = {
  /** The stat line, e.g. "1 in 7 U.S. claims is denied on first submission." */
  stat: ReactNode;
  src: string;
  alt: string;
  /** object-position for the crop — keeps the subject inside the card. */
  pos?: string;
  /** Per-card panel colour, when one card should stand apart. */
  background?: string;
};

type WhyItMattersProps = {
  /** Headline, rendered in near-black. */
  title?: ReactNode;
  /** Optional second headline line, rendered in orange. */
  titleAccent?: ReactNode;
  cards: WhyItMattersCard[];
  /** Section background — white by default. */
  background?: string;
  /** Default card panel colour. */
  cardBackground?: string;
  /** Optional extra classes for the outer section. */
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const WhyItMatters = ({
  title = "Why it matters",
  titleAccent,
  cards,
  background = "#FFFFFF",
  cardBackground = "#8C5A14",
  className = "",
}: WhyItMattersProps) => {
  const { ref, inView } = useInView(REVEAL_IN_VIEW);

  // Two cards stay side by side; three or more get a third desktop column.
  const columns = cards.length >= 3 ? "lg:grid-cols-3" : "";

  return (
    <section
      ref={ref}
      className={`relative px-[24px] py-[72px] md:px-[40px] md:py-[150px] ${className}`}
      style={{ backgroundColor: background }}
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-[900px] text-center text-[32px] leading-[1.12] font-medium tracking-[-0.03em] text-[#121212] md:text-[42px] lg:text-[50px] lg:leading-[67.25px] lg:tracking-[-5%]"
        >
          {title}
          {titleAccent ? (
            <span className="block text-[#F99621]">{titleAccent}</span>
          ) : null}
        </motion.h2>

        <div
          className={`mt-[40px] grid grid-cols-1 gap-[20px] md:mt-[64px] md:grid-cols-2 md:gap-[24px] ${columns}`}
        >
          {cards.map((card, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: 0.15 + i * 0.12,
              }}
              className="group flex flex-col overflow-hidden rounded-[24px] px-[24px] pt-[32px] md:px-[32px] md:pt-[40px]"
              style={{ backgroundColor: card.background ?? cardBackground }}
            >
              <p className="mx-auto max-w-[420px] text-center text-[20px] leading-[1.6] font-semibold tracking-[-0.01em] text-white md:text-[24px] md:leading-[1.7]">
                {card.stat}
              </p>

              {/* Flush with the card's bottom edge — the section's rounding clips it. */}
              <div className="relative mt-[28px] h-[280px] w-full overflow-hidden rounded-t-[16px] md:mt-[40px] md:h-[380px]">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 560px"
                  style={{ objectPosition: card.pos ?? "50% 50%" }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
