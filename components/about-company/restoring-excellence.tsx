"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Restoring Excellence Globally" — the about page's certifications band.
 *
 * Two halves on one dark field: the section statement up top, then the
 * `Certifications` deck. The deck is the same panel geometry as the Outsourcing
 * page's `certifications.tsx` (four square-cornered cards butted together with
 * `-space-x-px`, badges sharing a fixed-height band so the titles land on a
 * common baseline) inverted for the dark ground.
 *
 * ── Motion ────────────────────────────────────────────────────────────────
 * The section is a dark, near-static field, so the motion carries all of its
 * energy. Four layers, ordered by how much attention each deserves:
 *
 *   1. type    — headings rise out of a clip mask word by word (`expo.out`,
 *                the fastest-settling ease we use), so the statement reads as
 *                *typeset*, not faded in. The body copy follows a beat behind.
 *   2. deck    — cards lift in on a stagger; each badge pops just behind its
 *                own panel, then a single specular sheen sweeps the row. The
 *                sheen is the payoff beat: it's what makes four flat panels
 *                read as one polished object.
 *   3. depth   — the header drifts against the scroll and each badge counter-
 *                drifts inside its card. Both are scrubbed, both are small
 *                (≤14%); they exist to stop the band feeling like a flat sheet.
 *   4. ambient — two slow gold blooms behind the deck, de-synchronised so the
 *                field never sits perfectly still once the entrance is spent.
 *
 * Hover (pointer devices only) lifts a card, warms its wash and grows the
 * badge — all on `power3.out` with `overwrite: "auto"`, so a fast pointer
 * sweep across the row can't leave a card stranded mid-tween.
 *
 * Everything is built inside a `gsap.matchMedia`, which gives us the reduced-
 * motion branch (final state, no loops, no scrubs) and the hover branch for
 * free, and tears both down on revert.
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
    description: "Operators scaling beyond 5 remote professionals",
  },
  {
    src: "/v26-images/certs/aicpa.png",
    w: 676,
    h: 671,
    name: "SOC 2 Type II",
    description: "Operators scaling beyond 5 remote professionals",
  },
  {
    src: "/v26-images/certs/great-place.png",
    w: 475,
    h: 671,
    name: "Great Place To Work",
    description: "Operators scaling beyond 5 remote professionals",
  },
  {
    src: "/v26-images/certs/hipaa.png",
    w: 1200,
    h: 635,
    name: "HIPAA Compliant",
    description: "Operators scaling beyond 5 remote professionals",
  },
];

// type Doodle = {
//   /** Full path — the set is deliberately mixed to match the design's colours. */
//   src: string;
//   w: number;
//   h: number;
//   left: string;
//   top: string;
//   hideOnMobile?: boolean;
// };

// left/top are percentages of the section; each doodle is centred on its point.
// const DOODLES: Doodle[] = [
//   { src: "/v26-images/home/cta-doodle/1.svg", w: 39, h: 74, left: "13%", top: "8%" },
//   { src: "/v26-images/our-solutions/doodles/2.svg", w: 28, h: 42, left: "62%", top: "3%" },
//   { src: "/v26-images/our-solutions/doodles/3.svg", w: 60, h: 46, left: "91%", top: "19%", hideOnMobile: true },
//   { src: "/v26-images/about-company/doodles/1.svg", w: 83, h: 84, left: "22%", top: "33%" },
//   { src: "/v26-images/our-solutions/doodles/4.svg", w: 20, h: 52, left: "52%", top: "33%", hideOnMobile: true },
//   { src: "/v26-images/about-company/doodles/3.svg", w: 67, h: 131, left: "77%", top: "43%", hideOnMobile: true },
//   { src: "/v26-images/our-solutions/doodles/5.svg", w: 49, h: 31, left: "6%", top: "59%" },
//   { src: "/v26-images/our-solutions/doodles/6.svg", w: 79, h: 75, left: "57%", top: "96%" },
// ];

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

/**
 * A line of type split into words, each in its own clip mask so it can be
 * driven up from below. The mask needs room for descenders — the padding would
 * otherwise push the baseline down, so an equal negative margin claws it back.
 */
const MaskedLine = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, i) => (
      <span
        key={`${word}-${i}`}
        className="mr-[0.26em] mb-[-0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom last:mr-0"
      >
        <span className="rx-word inline-block will-change-transform">{word}</span>
      </span>
    ))}
  </>
);

const RestoringExcellence = () => {
  const rootRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
          hoverable: "(hover: hover) and (pointer: fine)",
        },
        (self) => {
          const { reduced, hoverable } = self.conditions as Record<string, boolean>;

          // Reduced motion: land on the finished frame and stop. No entrance,
          // no scrubs, no loops. The sheen stays on its CSS `opacity-0`, which
          // is also what keeps it from flashing as a bright band across every
          // panel in the server-rendered paint, before this runs.
          if (reduced) return;

          /* ── 1. type ─────────────────────────────────────────────────── */
          gsap
            .timeline({ scrollTrigger: { trigger: headerRef.current, start: "top 82%" } })
            .from(".rx-head .rx-word", {
              yPercent: 118,
              duration: 0.95,
              ease: "expo.out",
              stagger: 0.055,
            })
            .from(".rx-sub", { autoAlpha: 0, y: 18, duration: 0.7, ease: "power3.out" }, "-=0.55");

          // The deck title sits ~180px below the statement, so it gets its own
          // trigger rather than riding the header's timeline off-screen.
          gsap.from(".rx-deck-title .rx-word", {
            yPercent: 118,
            duration: 0.95,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: ".rx-deck-title", start: "top 88%" },
          });

          /* ── 2. deck ─────────────────────────────────────────────────── */
          // Lift the sheen off its CSS opacity-0 only once it's parked off-card.
          gsap.set(".rx-sheen", { xPercent: -170, autoAlpha: 1 });

          gsap
            .timeline({ scrollTrigger: { trigger: deckRef.current, start: "top 85%" } })
            .from(".rx-card", {
              autoAlpha: 0,
              y: 56,
              scale: 0.97,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.09,
            })
            .from(
              ".rx-badge",
              {
                autoAlpha: 0,
                scale: 0.82,
                y: 12,
                duration: 0.62,
                ease: "back.out(2)",
                stagger: 0.09,
              },
              "-=0.62"
            )
            .from(
              ".rx-card-copy",
              { autoAlpha: 0, y: 14, duration: 0.55, ease: "power2.out", stagger: 0.045 },
              "-=0.48"
            )
            // The payoff: one light pass across the row, panel after panel.
            .to(
              ".rx-sheen",
              { xPercent: 170, duration: 1.15, ease: "power2.inOut", stagger: 0.09 },
              "-=0.3"
            );

          /* ── 3. depth ────────────────────────────────────────────────── */
          gsap.to(headerRef.current, {
            yPercent: -13,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          // Counter-drift inside each card. This runs on the badge *image*, not
          // the `.rx-badge` band the entrance animates, so the two never fight
          // over the same transform.
          gsap.fromTo(
            ".rx-badge-img",
            { yPercent: 9 },
            {
              yPercent: -9,
              ease: "none",
              scrollTrigger: {
                trigger: deckRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );

          /* ── 4. ambient ──────────────────────────────────────────────── */
          gsap.to(".rx-glow-a", {
            xPercent: 10,
            yPercent: -8,
            scale: 1.16,
            duration: 15,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(".rx-glow-b", {
            xPercent: -12,
            yPercent: 7,
            scale: 1.1,
            duration: 19,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1.4,
          });

          /* ── hover ───────────────────────────────────────────────────── */
          if (!hoverable) return;

          const teardown: Array<() => void> = [];

          gsap.utils.toArray<HTMLElement>(".rx-card").forEach((card) => {
            const glow = card.querySelector(".rx-card-glow");
            const badge = card.querySelector(".rx-badge-img");

            const settle = (hovered: boolean) => {
              gsap.to(card, {
                y: hovered ? -8 : 0,
                duration: hovered ? 0.45 : 0.55,
                ease: "power3.out",
                overwrite: "auto",
              });
              gsap.to(glow, {
                autoAlpha: hovered ? 1 : 0,
                duration: hovered ? 0.4 : 0.55,
                ease: "power2.out",
                overwrite: "auto",
              });
              gsap.to(badge, {
                scale: hovered ? 1.07 : 1,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto",
              });
            };

            const onEnter = () => settle(true);
            const onLeave = () => settle(false);

            card.addEventListener("pointerenter", onEnter);
            card.addEventListener("pointerleave", onLeave);
            teardown.push(() => {
              card.removeEventListener("pointerenter", onEnter);
              card.removeEventListener("pointerleave", onLeave);
            });
          });

          // matchMedia runs this when the query stops matching or on revert —
          // gsap.context tracks tweens, not listeners, so we unbind them here.
          return () => teardown.forEach((off) => off());
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-[#0A0A0A] px-[24px] py-[80px] md:px-[40px] md:py-[120px]"
    >
      {/* Ambient gold blooms — the only colour on the field, kept low enough
          (≤10% alpha) to read as light rather than as a shape. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="rx-glow-a absolute left-[8%] top-[42%] h-[520px] w-[520px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(255,196,3,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="rx-glow-b absolute right-[6%] top-[62%] h-[460px] w-[460px] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(249,150,33,0.09) 0%, transparent 70%)" }}
        />
      </div>

      {/* Decorative doodles */}
      {/* {DOODLES.map((doodle) => (
        <div
          key={doodle.src}
          aria-hidden="true"
          className={`pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 scale-[0.65] md:scale-100 ${
            doodle.hideOnMobile ? "hidden md:block" : ""
          }`}
          style={{ left: doodle.left, top: doodle.top }}
        >
          <div className="rx-doodle-enter">
            <div className="rx-doodle-float">
              <Image
                src={doodle.src}
                alt=""
                width={doodle.w}
                height={doodle.h}
                style={{ transformOrigin: "center" }}
              />
            </div>
          </div>
        </div>
      ))} */}

      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        {/* Section statement */}
        <div ref={headerRef} className="mx-auto max-w-[900px] text-center will-change-transform">
          <h2 className="rx-head text-[34px] font-semibold leading-[100%] tracking-[0%] text-white md:text-[52px] lg:text-[60px]">
            <MaskedLine text="Restoring Excellence Globally" />
          </h2>
          <p className="rx-sub mx-auto mt-[20px] max-w-[560px] text-[16px] font-medium leading-[1.6] tracking-[0%] text-[#B6B6B6] md:text-[16.12px]">
            We connect skilled talent to the businesses that need them, and we do it right.
          </p>
        </div>

        {/* Certifications deck */}
        <h3 className="rx-deck-title mt-[72px] text-center text-[30px] font-medium leading-[100%] tracking-[0%] text-white md:mt-[180px] md:text-[48px] lg:text-[64px]">
          <MaskedLine text="Certifications" />
        </h3>

        {/* auto-rows-fr + h-full keeps every panel the same height even when a
            name wraps to two lines. */}
        <ul
          ref={deckRef}
          className="mt-[48px] grid auto-rows-fr grid-cols-1 items-stretch sm:grid-cols-2 lg:mt-[80px] lg:grid-cols-4 lg:-space-x-px"
        >
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert.src}
              className="rx-card relative flex h-full flex-col justify-end overflow-hidden px-[24px] pb-[40px] pt-[40px] will-change-transform md:px-[32px] md:pb-[75px] md:pt-[75px] lg:min-h-[450px]"
              style={CARD_STYLE}
            >
              {/* Hover wash — a warm bloom anchored to the badge corner. */}
              <div
                aria-hidden="true"
                className="rx-card-glow pointer-events-none absolute inset-0 opacity-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 12% 78%, rgba(255,196,3,0.13) 0%, transparent 62%)",
                }}
              />
              {/* Specular sheen — parked off-card by GSAP and swept across once
                  on entrance. Skewed so the light reads as a raking pass. */}
              <div
                aria-hidden="true"
                className="rx-sheen pointer-events-none absolute -inset-y-8 -left-1/3 w-2/3 -skew-x-12 opacity-0 will-change-transform"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 50%, transparent 100%)",
                }}
              />

              <div className="rx-badge relative flex h-[90px] items-end md:h-[120px]">
                <Image
                  src={cert.src}
                  alt={`${cert.name} certification badge`}
                  width={cert.w}
                  height={cert.h}
                  className="rx-badge-img max-h-full w-auto origin-bottom-left object-contain object-left will-change-transform"
                />
              </div>

              <h4 className="rx-card-copy relative mt-[20px] text-[16px] font-bold uppercase leading-[120%] tracking-[0%] text-white md:mt-[24px] md:text-[17.28px]">
                {cert.name}
              </h4>
              <p className="rx-card-copy relative mt-2 max-w-[260px] text-[12px] font-normal leading-[150%] tracking-[0%] text-white/70 md:mt-[12px] lg:text-sm">
                {cert.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RestoringExcellence;
