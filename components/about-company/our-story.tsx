"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_SCROLL_START } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Our Story" — the company timeline told as a cyclist riding down a road.
 *
 * The illusion of movement is built from four layers, all driven by one
 * scrubbed ScrollTrigger so scroll *is* the throttle:
 *
 *   1. travel  — the rider's x is mapped linearly to scroll progress, so the
 *                page scroll physically pushes him along the road.
 *   2. life    — an independent, always-on bob + wobble loop (pedalling), so
 *                he never looks like a frozen sticker when scrolling stops.
 *   3. speed   — road speed-streaks and a forward lean whose intensity is fed
 *                from ScrollTrigger's own velocity, so fast flicks read fast
 *                and a paused scroll settles the rider upright.
 *   4. payoff  — each flag pops in the instant the rider passes it (back-ease
 *                pole + a waving cloth loop) and the road behind him fills
 *                gold, so the ride leaves a visible trail of progress.
 *
 * Mobile gets the same mechanics rotated 90°: a vertical rail, a gold fill,
 * and the rider descending it as you scroll.
 */

const BASE = "/v26-images/about-company/";

type Milestone = {
  /** Position along the road, as a fraction of the track width (desktop). */
  at: number;
  /** Shown beside the milestone in the mobile list. */
  year: string;
  label: string;
  /** Which of the supplied flag artworks to plant. */
  flag: "red" | "orange" | "magenta";
};

const MILESTONES: Milestone[] = [
  { at: 0.14, year: "2022", label: "All Talentz begins with a small, mighty team.", flag: "red" },
  { at: 0.3, year: "2023", label: "Opened our first office. Launched our first bootcamp. Grew to 75.", flag: "red" },
  { at: 0.45, year: "2024", label: "Crossed 300 employees. 100,000+ projects delivered.", flag: "orange" },
  { at: 0.6, year: "2025", label: "Earned our security certifications and Great Place to Work status.", flag: "orange" },
  // Magenta marks where we are today.
  { at: 0.76, year: "2026", label: "Crossed 400 employees. Our 10th PDP bootcamp this year.", flag: "magenta" },
  { at: 0.91, year: "2026", label: "First European conference. Now serving 100+ clients.", flag: "magenta" },
];

/**
 * Era markers printed under the road. Kept in step with MILESTONES above — the
 * two 2026 flags share one marker, sat between them.
 */
const ERAS: { at: number; year: string }[] = [
  { at: 0.14, year: "2022" },
  { at: 0.3, year: "2023" },
  { at: 0.45, year: "2024" },
  { at: 0.6, year: "2025" },
  { at: 0.835, year: "2026" },
];

const FLAG_SRC: Record<Milestone["flag"], string> = {
  red: `${BASE}flag-type-1.svg`,
  orange: `${BASE}flag-ttype-2.svg`,
  magenta: `${BASE}flag-type-3.svg`,
};

const OurStory = () => {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const riderRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Resting state: flags un-planted, rider off-stage left, road unlit.
      gsap.set(".os-flag", { autoAlpha: 0, y: 14, scale: 0.75, transformOrigin: "bottom center" });
      gsap.set(".os-flag-label", { autoAlpha: 0, y: 8 });
      gsap.set(".os-trail", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".os-era", { autoAlpha: 0.25 });
      gsap.set(".os-streak", { autoAlpha: 0 });

      // Reduced motion: skip the ride, show the finished timeline.
      if (prefersReduced) {
        gsap.set(".os-flag", { autoAlpha: 1, y: 0, scale: 1 });
        gsap.set(".os-flag-label", { autoAlpha: 1, y: 0 });
        gsap.set(".os-trail", { scaleX: 1 });
        gsap.set(".os-era", { autoAlpha: 1 });
        gsap.set(riderRef.current, { xPercent: 0, left: "100%", x: -220 });
        gsap.set(".os-mobile-fill", { scaleY: 1 });
        gsap.set(".os-mobile-item", { autoAlpha: 1, x: 0 });
        return;
      }

      /* ── 2. life: pedalling loop, independent of scroll ─────────────── */
      gsap.to(".os-rider-bob", {
        y: -3,
        duration: 0.42,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(".os-rider-bob", {
        rotate: 0.9,
        duration: 0.84,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      /* ── 4a. flags: cloth waving loop (runs once planted) ───────────── */
      gsap.utils.toArray<HTMLElement>(".os-flag-cloth").forEach((cloth, i) => {
        gsap.to(cloth, {
          skewY: 2.5,
          scaleX: 0.94,
          transformOrigin: "left center",
          duration: gsap.utils.random(0.9, 1.3),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.15,
        });
      });

      /* ── 1 + 3: the ride itself ─────────────────────────────────────── */
      const scene = sceneRef.current;
      const rider = riderRef.current;

      const planted = MILESTONES.map(() => false);
      const flagEls = gsap.utils.toArray<HTMLElement>(".os-flag");
      const labelEls = gsap.utils.toArray<HTMLElement>(".os-flag-label");
      const eraEls = gsap.utils.toArray<HTMLElement>(".os-era");
      const eraLit = ERAS.map(() => false);

      const leanTo = rider ? gsap.quickTo(".os-rider-lean", "rotate", { duration: 0.4 }) : null;
      const streakTo = gsap.quickTo(".os-streak", "opacity", { duration: 0.25 });
      const trailTo = gsap.quickSetter(".os-trail", "scaleX");

      /**
       * Where the rider's centre sits *as a fraction of the road*, at a given
       * scroll progress.
       *
       * These are not the same number: the rider enters from off-stage left and
       * exits off-stage right, so he covers `sceneWidth + riderWidth + 80` while
       * progress runs 0 → 1. Comparing `m.at` against raw progress therefore
       * plants flags early — visibly so for the first flag, which would pop
       * while the rider is still off-screen. Everything positional is driven
       * through here instead.
       */
      const roadFraction = (progress: number) => {
        if (!scene || !rider) return 0;
        const sceneW = scene.offsetWidth;
        if (!sceneW) return 0;
        const riderW = rider.offsetWidth;
        const start = -(riderW + 40);
        const distance = sceneW + riderW + 80;
        return (start + progress * distance + riderW / 2) / sceneW;
      };

      /** Plant / unplant markers as the rider sweeps past them. */
      const sync = (progress: number) => {
        const reached = roadFraction(progress);

        // The gold trail's leading edge is the rider's wheel, not the scrollbar.
        trailTo(gsap.utils.clamp(0, 1, reached));

        MILESTONES.forEach((m, i) => {
          const passed = reached >= m.at;
          if (passed === planted[i]) return;
          planted[i] = passed;
          gsap.to(flagEls[i], {
            autoAlpha: passed ? 1 : 0,
            y: passed ? 0 : 14,
            scale: passed ? 1 : 0.75,
            duration: passed ? 0.55 : 0.25,
            ease: passed ? "back.out(2.4)" : "power2.in",
          });
          gsap.to(labelEls[i], {
            autoAlpha: passed ? 1 : 0,
            y: passed ? 0 : 8,
            duration: 0.4,
            delay: passed ? 0.12 : 0,
            ease: "power2.out",
          });
        });

        ERAS.forEach((e, i) => {
          const lit = reached >= e.at;
          if (lit === eraLit[i]) return;
          eraLit[i] = lit;
          gsap.to(eraEls[i], { autoAlpha: lit ? 1 : 0.25, duration: 0.4 });
        });
      };

      if (scene && rider) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scene,
              start: REVEAL_SCROLL_START,
              end: "bottom 52%",
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                sync(self.progress);
                // 3. speed: intensity of streaks + lean follows scroll velocity.
                const v = Math.min(Math.abs(self.getVelocity()) / 1400, 1);
                streakTo(v * 0.9);
                leanTo?.(-2.2 * v);
              },
              // Widths feed roadFraction, so re-settle the markers after a
              // resize — and after load, when we may already be mid-section.
              onRefresh: (self) => sync(self.progress),
            },
          })
          .fromTo(
            rider,
            { x: () => -(rider.offsetWidth + 40) },
            { x: () => scene.offsetWidth + 40, ease: "none" },
            0
          );
      }

      /* ── mobile: same ride, rotated onto a vertical rail ────────────── */
      const rail = mobileRailRef.current;
      if (rail) {
        gsap.timeline({
          scrollTrigger: {
            trigger: rail,
            start: REVEAL_SCROLL_START,
            end: "bottom 70%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(".os-mobile-fill", { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0)
          .fromTo(".os-mobile-rider", { top: "0%" }, { top: "100%", ease: "none" }, 0);

        gsap.utils.toArray<HTMLElement>(".os-mobile-item").forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            x: -18,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: REVEAL_SCROLL_START },
          });
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-white py-[72px] md:py-[120px]">
      {/* Header */}
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <h2 className="text-[30px] font-semibold leading-[1.05] text-[#121212] sm:text-[36px] lg:text-[60px] tracking-[-4%]">
          Our Story
        </h2>
        <p className="mx-auto mt-5 font-medium tracking-[0px] max-w-[680.11px] text-[16px] leading-[1.6] text-[#B6B6B6] md:text-[16.12px]">
          We started with a simple mission: connect great talent to great businesses. Four years on, that mission has only gotten sharper.
        </p>
      </div>

      {/* ───────────────────────── Desktop / tablet scene ───────────────── */}
      <div
        ref={sceneRef}
        className="relative left-1/2 mt-[80px] hidden h-[300px] w-screen -translate-x-1/2 md:block lg:h-[340px]"
        aria-hidden="true"
      >
        {/* Road — inlined so `preserveAspectRatio="none"` can stretch the
            1440-wide artwork edge to edge at any viewport width. */}
        <div className="absolute bottom-[74px] left-0 h-[48px] w-full lg:h-[56px]">
          <svg
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-full w-full"
          >
            <path
              d="M1440.85 0.00012207H-0.831055V47.9887H1440.85V0.00012207Z"
              fill="url(#os-road-surface)"
            />
            <path d="M1483.77 4.30249H-29.4463V5.30242H1483.77V4.30249Z" fill="white" />
            <path d="M1483.77 42.0405H-29.4463V43.0405H1483.77V42.0405Z" fill="white" />
            <path d="M1483.77 22.4939H-29.4463V25.4957H1483.77V22.4939Z" fill="white" />
            <defs>
              <radialGradient
                id="os-road-surface"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(720.008 23.9944) scale(512.918 151.95)"
              >
                <stop stopColor="#262626" />
                <stop offset="0.3115" stopColor="#212121" />
                <stop offset="0.674" stopColor="#131313" />
                <stop offset="1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Gold trail the rider leaves on the centre line */}
          <div
            className="os-trail absolute left-0 w-full"
            style={{
              top: "46.9%",
              height: "6.25%",
              background: "linear-gradient(90deg, rgba(255,196,3,0) 0%, #FFC403 12%, #F99621 100%)",
            }}
          />
        </div>

        {/* Milestone flags */}
        {MILESTONES.map((m) => (
          <div
            key={m.label}
            className="absolute bottom-[122px] -translate-x-1/2"
            style={{ left: `${m.at * 100}%` }}
          >
            <p className="os-flag-label absolute bottom-full left-1/2 mb-3 w-28 -translate-x-1/2 text-center text-[11px] font-normal leading-[1.35] text-[#2D3748] lg:w-42 lg:text-[13px]">
              {m.label}
            </p>
            <div className="os-flag">
              <div className="os-flag-cloth">
                <Image
                  src={FLAG_SRC[m.flag]}
                  alt=""
                  width={28}
                  height={70}
                  className="h-[70px] w-[28px]"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Era markers */}
        {ERAS.map((e) => (
          <p
            key={e.year}
            className="os-era absolute bottom-[16px] -translate-x-1/2 text-[26px] font-medium text-[#57350C] lg:text-[32px]"
            style={{ left: `${e.at * 100}%` }}
          >
            {e.year}
          </p>
        ))}

        {/* Rider */}
        <div ref={riderRef} className="absolute bottom-[104px] left-0 will-change-transform">
          <div className="os-rider-lean origin-bottom">
            <div className="os-rider-bob relative">
              {/* Speed streaks — opacity is driven by scroll velocity. The
                  negative margin claws back the square canvas's ~10% of empty
                  space on the left, so they trail the rear wheel rather than
                  the canvas edge (a % margin resolves against the rider's
                  width, keeping it right at both breakpoints). */}
              <div className="pointer-events-none absolute bottom-[6px] right-full mr-[-9%] flex flex-col gap-[7px]">
                <span className="os-streak block h-[2px] w-[34px] rounded-full bg-gradient-to-l from-[#B3B3B3] to-transparent" />
                <span className="os-streak block h-[2px] w-[22px] rounded-full bg-gradient-to-l from-[#C9C9C9] to-transparent" />
                <span className="os-streak block h-[2px] w-[40px] rounded-full bg-gradient-to-l from-[#A8A8A8] to-transparent" />
              </div>
              {/* bike-rider.svg is a square 2300×2300 canvas whose artwork stops
                  at y=2020 — i.e. 12.17% of the canvas is dead space under the
                  wheels. Declaring the true square ratio stops next/image
                  letterboxing it, and the translate pushes that padding below
                  the element box so the wheel line, not the canvas edge, is
                  what `bottom-[104px]` plants on the road. The offset is a
                  percentage of the element's own height, so it stays correct at
                  both widths. */}
              <Image
                src={`${BASE}bike-rider.svg`}
                alt=""
                width={196}
                height={196}
                priority={false}
                className="h-auto w-[168px] translate-y-[12.17%] lg:w-[196px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────── Mobile scene ─────────────────────────── */}
      <div ref={mobileRailRef} className="relative mt-14 px-6 md:hidden">
        <div className="relative pl-12">
          {/* Vertical road */}
          <div className="absolute left-[14px] top-0 h-full w-[6px] overflow-hidden rounded-full bg-[#1A1A1A]">
            <div
              className="os-mobile-fill h-full w-full origin-top"
              style={{ background: "linear-gradient(180deg, #FFC403 0%, #F99621 100%)" }}
            />
          </div>

          {/* Rider descending the rail */}
          <div
            className="os-mobile-rider pointer-events-none absolute left-[17px] top-0 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div className="os-rider-bob">
              {/* Same square asset as the desktop rider. No y-nudge needed here:
                  the artwork is all but centred in its canvas (51% / 49%), so
                  centring the box on the rail centres the rider. The width is
                  up from 58px because the artwork only spans 82% of the square,
                  which would otherwise read as a size drop. */}
              <Image
                src={`${BASE}bike-rider.svg`}
                alt=""
                width={196}
                height={196}
                className="h-auto w-[70px] rotate-90"
              />
            </div>
          </div>

          <ul className="space-y-10">
            {MILESTONES.map((m) => (
              <li key={m.label} className="os-mobile-item relative flex items-start gap-4">
                <Image
                  src={FLAG_SRC[m.flag]}
                  alt=""
                  width={28}
                  height={70}
                  className="os-flag-cloth h-[46px] w-auto shrink-0"
                />
                <div className="pt-1">
                  <p className="text-[20px] font-bold text-[#7A5C22]">{m.year}</p>
                  <p className="text-[14px] leading-[1.5] text-[#3A3A3A]">{m.label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
