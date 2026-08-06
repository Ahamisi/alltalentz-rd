"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Small animated role "bubbles" scattered around the vacancy chair in the
 * Request Talent hero. Same idea as the Hire Talentz cluster
 * (components/hire-talentz/TalentBubbles.tsx) but deliberately small — here the
 * chair is the subject and the circles only orbit it.
 *
 * Geometry lives in design units on a fixed-aspect stage and is converted to
 * percentages at render time, so the cluster scales fluidly while keeping the
 * exact composition. Two stages are defined because the hero canvas changes
 * shape at lg: a tall portrait box below lg, a wide letterbox above it. Each
 * layout keeps its own coordinates so the circles stay clear of the chair.
 *
 * NON-TOUCHING INVARIANT — bubbles must never collide with each other, with the
 * chair, or with the stage edges, so the layout is solved against the
 * animation's worst case rather than its resting state. For every pair:
 *
 *   distance(a, b)  >=  MAX_SCALE * (rA + rB) + drift(rA) + drift(rB)
 *
 * where drift(r) = DRIFT * 2r * sqrt(2) (the wander runs on both axes, so its
 * peak magnitude is the diagonal). Both layouts clear every pair, every edge,
 * and the chair's bounding box (chair = 38% of stage width below lg, 27% above,
 * anchored bottom-centre) with room to spare.
 *
 * If you retune MAX_SCALE, DRIFT, the pop-in overshoot, or any radius, re-check
 * the inequality above — the layout is only as safe as those numbers.
 */

/** Ceiling of the breathing scale — the collision maths depends on it. */
const MAX_SCALE = 1.06;
const MIN_SCALE = 0.94;
/** Wander amplitude as a fraction of each bubble's own diameter, per axis. */
const DRIFT = 0.02;

type Bubble = {
  label: string;
  /** centre + radius, in design units on the stage below */
  cx: number;
  cy: number;
  r: number;
  bg: string;
};

type Stage = {
  w: number;
  h: number;
  bubbles: Bubble[];
};

const COLORS = {
  sand: "#E3DBC1",
  yellow: "#F9CC4E",
  orange: "#F0993A",
  gold: "#F7C846",
  grey: "#E9E9E9",
};

/** Portrait canvas — below lg the chair stands tall in a narrow column. */
const PORTRAIT: Stage = {
  w: 700,
  h: 760,
  bubbles: [
    { label: "Tech", cx: 110, cy: 120, r: 78, bg: COLORS.sand },
    { label: "Finance", cx: 570, cy: 130, r: 86, bg: COLORS.yellow },
    { label: "AR Specialist", cx: 140, cy: 355, r: 88, bg: COLORS.orange },
    { label: "Reviewer", cx: 580, cy: 390, r: 82, bg: COLORS.grey },
    { label: "Estimator", cx: 115, cy: 620, r: 80, bg: COLORS.gold },
    { label: "Admin", cx: 585, cy: 625, r: 78, bg: COLORS.sand },
  ],
};

/** Letterbox canvas — from lg up the composition spreads out sideways. */
const WIDE: Stage = {
  w: 2000,
  h: 630,
  bubbles: [
    { label: "Tech", cx: 470, cy: 95, r: 68, bg: COLORS.sand },
    { label: "Finance", cx: 1500, cy: 100, r: 76, bg: COLORS.yellow },
    { label: "AR Specialist", cx: 250, cy: 320, r: 82, bg: COLORS.orange },
    { label: "Reviewer", cx: 1760, cy: 300, r: 72, bg: COLORS.grey },
    { label: "Estimator", cx: 520, cy: 500, r: 78, bg: COLORS.gold },
    { label: "Admin", cx: 1470, cy: 495, r: 70, bg: COLORS.sand },
  ],
};

const ARIA_LABEL =
  "Roles we place: Tech, Finance, AR Specialist, Reviewer, Estimator, Admin";

const BubbleStage = ({ stage, className }: { stage: Stage; className: string }) => (
  <div className={`absolute inset-0 ${className}`}>
    {stage.bubbles.map((b) => (
      <div
        key={b.label}
        className="rb-bubble absolute flex aspect-square items-center justify-center rounded-full text-center will-change-transform"
        style={{
          width: `${((2 * b.r) / stage.w) * 100}%`,
          left: `${((b.cx - b.r) / stage.w) * 100}%`,
          top: `${((b.cy - b.r) / stage.h) * 100}%`,
          backgroundColor: b.bg,
          containerType: "inline-size",
        }}
      >
        <span
          aria-hidden="true"
          className="px-[10%] font-medium leading-[1.15] tracking-[-2%]"
          style={{ color: "#121212", fontSize: "15cqw" }}
        >
          {b.label}
        </span>
      </div>
    ))}
  </div>
);

const RoleBubbles = () => {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".rb-bubble");
      const { random } = gsap.utils;

      gsap.set(items, { scale: 0.4, autoAlpha: 0 });

      gsap.to(items, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: { each: 0.09, from: "random" },
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
      aria-label={ARIA_LABEL}
      className="pointer-events-none absolute inset-0"
    >
      <BubbleStage stage={PORTRAIT} className="lg:hidden" />
      <BubbleStage stage={WIDE} className="hidden lg:block" />
    </div>
  );
};

export default RoleBubbles;
