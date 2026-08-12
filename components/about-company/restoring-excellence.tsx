"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CERTIFICATIONS } from "@/lib/certifications";
import { REVEAL_SCROLL_START } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// type Doodle = {
//   /** Full path — the set is deliberately mixed to match the design's colours. */
//   src: string;
//   w: number;
//   h: number;
//   left: string;
//   top: string;
//   hideOnMobile?: boolean;
// };

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

const CARD_STYLE = {
  backgroundImage:
    "radial-gradient(117.2% 352.94% at 3.21% 1.26%, rgba(38, 38, 38, 0.18) 0%, rgba(168, 168, 168, 0.14) 100%)",
  border: "1.3px solid transparent",
  borderImageSource:
    "linear-gradient(104.59deg, rgba(255, 255, 255, 0.3) 0.76%, rgba(180, 180, 180, 0.0768416) 32.78%, rgba(226, 226, 226, 0.220526) 69.11%, rgba(186, 181, 181, 0.021) 99%)",
  borderImageSlice: 1,
} as const;

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
      // matchMedia gives us three branches: reduced motion (nothing runs), normal
      // motion, and hover, and it tears each one down when the query stops matching.
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          motion: "(prefers-reduced-motion: no-preference)",
          hoverable: "(hover: hover) and (pointer: fine)",
        },
        (self) => {
          const { reduced, hoverable } = self.conditions as Record<string, boolean>;

          // Reduced motion: everything stays in its final CSS state.
          if (reduced) return;

          // 1. Type. Heading words rise out of their clip masks, then the sub copy.
          gsap
            .timeline({ scrollTrigger: { trigger: headerRef.current, start: REVEAL_SCROLL_START } })
            .from(".rx-head .rx-word", {
              yPercent: 118,
              duration: 0.95,
              ease: "expo.out",
              stagger: 0.055,
            })
            .from(".rx-sub", { autoAlpha: 0, y: 18, duration: 0.7, ease: "power3.out" }, "-=0.55");

          // The deck title sits far below the statement, so it gets its own
          // trigger instead of riding the header timeline off screen.
          gsap.from(".rx-deck-title .rx-word", {
            yPercent: 118,
            duration: 0.95,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: ".rx-deck-title", start: REVEAL_SCROLL_START },
          });

          // 2. Deck. Park the sheen off the left of the cards first. It stays on
          // its CSS opacity-0 until now, which stops it flashing on first paint.
          gsap.set(".rx-sheen", { xPercent: -170, autoAlpha: 1 });

          // Cards lift in, each badge and its copy follow, then one light sweeps
          // across the row.
          gsap
            .timeline({ scrollTrigger: { trigger: deckRef.current, start: REVEAL_SCROLL_START } })
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
            .to(
              ".rx-sheen",
              { xPercent: 170, duration: 1.15, ease: "power2.inOut", stagger: 0.09 },
              "-=0.3"
            );

          // 3. Depth. The header drifts against the scroll.
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

          // Badges drift the other way inside their cards. This runs on the badge
          // image, not the .rx-badge wrapper the entrance animates, so the two
          // never fight over the same transform.
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

          // 4. Ambient. Two slow gold blooms behind the deck, offset so the
          // background never sits completely still.
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

          // Hover, pointer devices only: lift the card, warm its wash and grow
          // the badge.
          if (!hoverable) return;

          const teardown: Array<() => void> = [];

          gsap.utils.toArray<HTMLElement>(".rx-card").forEach((card) => {
            const glow = card.querySelector(".rx-card-glow");
            const badge = card.querySelector(".rx-badge-img");

            // overwrite: "auto" so a fast pointer across the row cannot leave a
            // card stranded halfway through its tween.
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

          // gsap.context tracks tweens but not listeners, so unbind them here.
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
        <div ref={headerRef} className="mx-auto max-w-[900px] text-center will-change-transform">
          <h2 className="rx-head text-[34px] font-semibold leading-[100%] tracking-[0%] text-white md:text-[52px] lg:text-[60px]">
            <MaskedLine text="Restoring Excellence Globally" />
          </h2>
          <p className="rx-sub mx-auto mt-[20px] max-w-[560px] text-[16px] font-medium leading-[1.6] tracking-[0%] text-[#B6B6B6] md:text-[16.12px]">
            We connect skilled talent to the businesses that need them, and we do it right.
          </p>
        </div>

        <h3 className="rx-deck-title mt-[72px] text-center text-[30px] font-medium leading-[100%] tracking-[0%] text-white md:mt-[180px] md:text-[48px] lg:text-[64px]">
          <MaskedLine text="Certifications" />
        </h3>

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
              <div
                aria-hidden="true"
                className="rx-card-glow pointer-events-none absolute inset-0 opacity-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 12% 78%, rgba(255,196,3,0.13) 0%, transparent 62%)",
                }}
              />
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
                  width={cert.artwork.w}
                  height={cert.artwork.h}
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
