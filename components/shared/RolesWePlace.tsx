"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";

export type RoleCard = {
  src: string;
  alt: string;
  title: string;
  description: string;
  pos?: string;
  formValue?: string;
};

type RolesWePlaceProps = {
  title: ReactNode;
  titleAccent?: ReactNode;
  roles: RoleCard[];
  background?: string;
  className?: string;
  ctaLabel?: string;
  ctaHref?: string;
  industry?: string;
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
  industry,
}: RolesWePlaceProps) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (title: string) =>
    setSelected((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );

  // Selected cards ride to the Request Talent form on the CTA query string,
  // which prefills it. With nothing picked the link stays exactly as passed in.
  const href = (() => {
    if (selected.length === 0) return ctaHref;
    const params = new URLSearchParams();
    if (industry) params.set("industry", industry);
    params.set(
      "roles",
      roles
        .filter((r) => selected.includes(r.title))
        .map((r) => r.formValue ?? r.title)
        .join(",")
    );
    return `${ctaHref}${ctaHref.includes("?") ? "&" : "?"}${params.toString()}`;
  })();

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
          {roles.map((role, i) => {
            const isSelected = selected.includes(role.title);

            return (
              <motion.article
                key={role.title}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.7,
                  ease: EASE,
                  delay: 0.15 + i * 0.12,
                }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => toggle(role.title)}
                  aria-pressed={isSelected}
                  className={`relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[24px] bg-white text-left transition-shadow duration-300 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2 ${
                    isSelected
                      ? "ring-2 ring-[#F99621] shadow-[0_18px_40px_rgba(249,150,33,0.18)]"
                      : "ring-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-[16px] left-[16px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isSelected
                        ? "scale-100 border-[#F99621] bg-[#F99621] text-white"
                        : "scale-95 border-white/80 bg-black/20 text-transparent backdrop-blur-[2px]"
                    }`}
                  >
                    <Check className="h-[18px] w-[18px]" strokeWidth={3} />
                  </span>

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

                    <span
                      className={`mt-[6px] inline-flex w-fit items-center gap-[8px] rounded-full px-[18px] py-[10px] text-[14px] font-medium transition-colors duration-300 ${
                        isSelected
                          ? "bg-[#F99621] text-[#121212]"
                          : "bg-[#FEF5E9] text-[#121212] group-hover:bg-[#F99621]/25"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="h-[16px] w-[16px]" strokeWidth={3} />
                          Selected
                        </>
                      ) : (
                        "Select role"
                      )}
                    </span>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.7,
            ease: EASE,
            delay: 0.15 + roles.length * 0.12,
          }}
          className="mt-[32px] flex flex-col items-center gap-[12px] md:mt-[48px]"
        >
          <Link
            href={href}
            className="inline-flex items-center justify-center bg-[#F99621] px-[40px] py-[16px] text-center font-medium text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a] motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            {ctaLabel}
          </Link>
          {selected.length > 0 && (
            <p className="text-[14px] text-[#121212]/70">
              {selected.length} role{selected.length > 1 ? "s" : ""} selected —
              we&rsquo;ll carry this into your request.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default RolesWePlace;
