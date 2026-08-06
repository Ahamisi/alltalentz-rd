"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

/**
 * Shared "Roles We Place in <niche>" section for every talent page.
 *
 * Centred headline over a grid of photo cards: image on top, then role name and
 * a one-line description on a white panel, with a single CTA under the grid
 * pointing at the request-talent page. Everything niche-specific comes in
 * through props, so a new page is one `<RolesWePlace {...} />` call.
 *
 * Three cards read best (one row on desktop); four+ wrap to a second row.
 */
export type RoleCard = {
  src: string;
  alt: string;
  title: string;
  description: string;
  /** object-position for the crop — keeps the subject inside the card. */
  pos?: string;
};

type RolesWePlaceProps = {
  /** Headline, rendered in near-black. */
  title: ReactNode;
  /** Optional second headline line, rendered in orange. */
  titleAccent?: ReactNode;
  roles: RoleCard[];
  /** Section background — cream by default, to sit against white neighbours. */
  background?: string;
  /** Optional extra classes for the outer section. */
  className?: string;
  /** CTA label under the grid — e.g. "Get Healthcare Talent". */
  ctaLabel?: string;
  /** Where the CTA points. */
  ctaHref?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const RolesWePlace = ({
  title,
  titleAccent,
  roles,
  background = "#FEF5E9",
  className = "",
  ctaLabel = "Get Talent",
  ctaHref = "/request-talent",
}: RolesWePlaceProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

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

        <div className="mt-[40px] grid grid-cols-1 gap-[20px] md:mt-[64px] md:grid-cols-2 md:gap-[24px] lg:grid-cols-3">
          {roles.map((role, i) => (
            <motion.article
              key={role.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                ease: EASE,
                delay: 0.15 + i * 0.12,
              }}
              className="group flex flex-col overflow-hidden rounded-[24px] bg-white md:rounded-[24px]"
            >
              <div className="relative h-[316px] w-full overflow-hidden">
                <Image
                  src={role.src}
                  alt={role.alt}
                  fill
                  sizes="(max-width: 768px) 92vw, (max-width: 1024px) 46vw, 380px"
                  style={{ objectPosition: role.pos ?? "50% 50%" }}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>

              <div className="flex flex-1 flex-col gap-[10px] px-[24px] py-[24px] md:px-[28px] md:py-[28px]">
                <h3 className="text-[20px] leading-[1.25] font-semibold tracking-[-0.01em] text-[#121212] md:text-[20px]">
                  {role.title}
                </h3>
                <p className="text-[15px] leading-[1.5] font-normal text-black md:text-[15px] trackinng-[0%]">
                  {role.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.7,
            ease: EASE,
            delay: 0.15 + roles.length * 0.12,
          }}
          className="mt-[32px] flex justify-center md:mt-[48px]"
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center bg-[#F99621] px-[40px] py-[16px] text-center font-medium text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            {ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RolesWePlace;
