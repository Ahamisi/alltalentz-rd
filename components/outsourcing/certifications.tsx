"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

/**
 * "Certifications" — Outsourcing page.
 *
 * Same panel geometry as `the-process.tsx`: four square-cornered cards butted
 * together with `-space-x-px`, content bottom-aligned. Here the wash is the
 * design's translucent charcoal radial, which reads as pale grey on the white
 * section.
 *
 * Each badge sits in a fixed-height band rather than being sized individually —
 * the four logos have wildly different aspect ratios (the ISO shield is wide,
 * the Great Place To Work badge is tall), and a shared band is what keeps the
 * titles and descriptions on a common baseline.
 */
type Certification = {
  src: string;
  /** Intrinsic dimensions, for next/image. */
  w: number;
  h: number;
  name: string;
  description: string;
};

const CERTIFICATIONS: Certification[] = [
  {
    src: "/v26-images/certs/iso.png",
    w: 676,
    h: 676,
    name: "ISO 27001",
    description: "Your data protected by global security standards.",
  },
  {
    src: "/v26-images/certs/aicpa.png",
    w: 676,
    h: 671,
    name: "SOC 2 Type II",
    description: "Independently audited for security and trust.",
  },
  {
    src: "/v26-images/certs/great-place.png",
    w: 475,
    h: 671,
    name: "Great Place To Work",
    description: "Certified for culture, care, and consistency.",
  },
  {
    src: "/v26-images/certs/hipaa.png",
    w: 1200,
    h: 635,
    name: "HIPAA Compliant",
    description: "Healthcare data handled safely, always compliant.",
  },
];

/**
 * Charcoal → grey radial wash plus the gradient hairline from the design. Square
 * corners let the edge be a plain `border-image` (`border-image-slice: 1`
 * stretches the single gradient tile across all four sides).
 */
const CARD_STYLE = {
  backgroundImage:
    "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(38, 38, 38, 0.18) 0%, rgba(168, 168, 168, 0.14) 100%)",
  border: "1.3px solid transparent",
  borderImageSource:
    "linear-gradient(104.59deg, rgba(255, 255, 255, 0.3) 0.76%, rgba(180, 180, 180, 0.0768416) 32.78%, rgba(226, 226, 226, 0.220526) 69.11%, rgba(186, 181, 181, 0.021) 99%)",
  borderImageSlice: 1,
} as const;

const Certifications = () => {
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
      gsap.set(".cert-title", { autoAlpha: 0, y: 20 });
      gsap.set(".cert-card", { autoAlpha: 0, y: 40 });
      gsap.set(".cert-badge", { autoAlpha: 0, scale: 0.9 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".cert-title", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.to(
        ".cert-card",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.3"
      );

      // Badges settle in just behind their panel.
      tl.to(
        ".cert-badge",
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.55"
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
      className="relative overflow-hidden bg-white px-[24px] py-[80px] md:px-[40px] md:py-[120px]"
    >
      <div className="mx-auto w-full max-w-[1180px]">
        <h2 className="cert-title text-center text-[30px] font-medium leading-[100%] tracking-[0%] text-[#121212] md:text-[48px] lg:text-[64px]">
          Certifications
        </h2>

        {/* auto-rows-fr + h-full keeps every panel the same height even when a
            name wraps to two lines. */}
        <ul className="mt-[48px] grid auto-rows-fr grid-cols-1 items-stretch sm:grid-cols-2 lg:mt-[100px] lg:grid-cols-4 lg:-space-x-px">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert.src}
              className="cert-card flex h-full flex-col justify-end px-[24px] pb-[40px] pt-[40px] md:px-[32px] md:pb-[75px] md:pt-[75px] lg:min-h-[450px]"
              style={CARD_STYLE}
            >
              <div className="cert-badge flex h-[90px] items-end md:h-[120px]">
                <Image
                  src={cert.src}
                  alt={`${cert.name} certification badge`}
                  width={cert.w}
                  height={cert.h}
                  className="max-h-full w-auto object-contain object-left"
                />
              </div>

              <h3 className="mt-[20px] text-[16px] font-bold uppercase leading-[120%] tracking-[0%] text-[#121212] md:mt-[24px] md:text-[17.28px]">
                {cert.name}
              </h3>
              <p className="mt-2 max-w-[260px] text-[12px] font-normal leading-[150%] tracking-[0%] text-[#121212]/80 md:mt-[12px] lg:text-sm">
                {cert.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Certifications;
