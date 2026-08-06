"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Animated cluster of role "bubbles" for the Hire Talentz hero.
 *
 * Geometry lives in design units on a fixed-aspect stage (STAGE_W x STAGE_H) and
 * is converted to percentages at render time, so the whole cluster scales
 * fluidly with its column while keeping the exact composition.
 *
 * NON-TOUCHING INVARIANT — the bubbles must never collide, so the layout is
 * solved against the animation's worst case rather than its resting state. For
 * every pair:
 *
 *   distance(a, b)  >=  MAX_SCALE * (rA + rB) + drift(rA) + drift(rB) + 12px
 *
 * where drift(r) = DRIFT * 2r * sqrt(2) (the wander runs on both axes, so its
 * peak magnitude is the diagonal). The tightest pair is Estimator / AR
 * Specialist at ~14.5 design px of clearance. Both bounds also hold against the
 * stage edges, so nothing clips either.
 *
 * The pop-in is checked separately: back.out(1.6) overshoots to ~1.098, above
 * MAX_SCALE, but it carries no drift and still clears by ~20px at the tightest
 * pair (AR Specialist / Admin).
 *
 * If you retune MAX_SCALE, DRIFT, the pop-in overshoot, or any radius, re-check
 * every pair against the inequality above — the layout is only as safe as those
 * numbers.
 *
 * Motion: a staggered pop-in, then each bubble breathes on its own randomised
 * loop (scale + drift). The two loops have different periods per bubble, so the
 * cluster drifts permanently out of phase instead of pulsing in unison.
 */
const STAGE_W = 910;
const STAGE_H = 665;

/** Ceiling of the breathing scale — the collision maths depends on it. */
const MAX_SCALE = 1.06;
const MIN_SCALE = 0.94;
/** Wander amplitude as a fraction of each bubble's own diameter, per axis. */
const DRIFT = 0.02;

type Bubble = {
  label: string;
  /** centre + radius, in design units on the STAGE_W x STAGE_H stage */
  cx: number;
  cy: number;
  r: number;
  bg: string;
  /** label font-size as a % of the bubble's own width */
  fontScale: number;
};

const BUBBLES: Bubble[] = [
  { label: "Tech", cx: 128, cy: 152, r: 64, bg: "#E3DBC1", fontScale: 27 },
  { label: "Estimator", cx: 415, cy: 202, r: 174, bg: "#F0993A", fontScale: 12.7 },
  { label: "Finance", cx: 762, cy: 146, r: 98, bg: "#E3DBC1", fontScale: 19.3 },
  { label: "AR Specialist", cx: 140, cy: 414, r: 124, bg: "#F9CC4E", fontScale: 16.3 },
  { label: "Admin", cx: 390, cy: 538, r: 112, bg: "#E9E9E9", fontScale: 17.4 },
  { label: "Reviewer", cx: 720, cy: 470, r: 170, bg: "#F7C846", fontScale: 12.7 },
];

const TalentBubbles = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".tb-bubble");
      const { random } = gsap.utils;

      gsap.set(items, { scale: 0.4, autoAlpha: 0 });

      gsap.to(items, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: { each: 0.09, from: "center" },
        onComplete: () => {
          items.forEach((el, i) => {
            // Breathe: fresh random target every cycle (repeatRefresh).
            gsap.to(el, {
              scale: () => random(MIN_SCALE, MAX_SCALE),
              duration: () => random(2.1, 3.9),
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              repeatRefresh: true,
              delay: i * 0.17,
            });

            // Wander, in % of own size so the amplitude scales with the layout
            // (a px value would grow relative to the cluster on small screens
            // and break the clearance maths).
            const pct = DRIFT * 100;
            gsap.to(el, {
              xPercent: () => random(-pct, pct),
              yPercent: () => random(-pct, pct),
              duration: () => random(3.4, 6),
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              repeatRefresh: true,
              delay: i * 0.23,
            });
          });
        },
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label="Talent roles we place: Tech, Estimator, Finance, AR Specialist, Admin, Reviewer"
      className="relative mx-auto w-full max-w-[620px]"
      style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}` }}
    >
      {BUBBLES.map((b) => (
        <div
          key={b.label}
          className="tb-bubble absolute flex aspect-square items-center justify-center rounded-full text-center will-change-transform"
          style={{
            width: `${((2 * b.r) / STAGE_W) * 100}%`,
            left: `${((b.cx - b.r) / STAGE_W) * 100}%`,
            top: `${((b.cy - b.r) / STAGE_H) * 100}%`,
            backgroundColor: b.bg,
            containerType: "inline-size",
          }}
        >
          <span
            aria-hidden="true"
            className="px-[8%] font-medium leading-[1.15] tracking-[-2%]"
            style={{ color: "#121212", fontSize: `${b.fontScale}cqw` }}
          >
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TalentBubbles;
