"use client";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";

type CountUpProps = {
  /** Full display value, e.g. "75%", "7 Days", "5+", "24/7". */
  value: string;
  /** Start the count when this flips true (e.g. section in view). */
  active: boolean;
  duration?: number;
};

/**
 * Counts the first number in `value` up from zero, keeping any surrounding
 * text intact ("75%" → 0%…75%, "7 Days" → 0 Days…7 Days). Falls back to the
 * static value when there's no number or the user prefers reduced motion.
 */
const CountUp = ({ value, active, duration = 1.6 }: CountUpProps) => {
  const match = value.match(/\d[\d,]*\.?\d*/);
  const target = match ? parseFloat(match[0].replace(/,/g, "")) : NaN;
  const decimals = match && match[0].includes(".") ? match[0].split(".")[1].length : 0;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active || isNaN(target)) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setCurrent(target);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCurrent(v),
    });
    return () => controls.stop();
  }, [active, target, duration]);

  if (!match || isNaN(target)) return <>{value}</>;

  const rendered = current.toFixed(decimals);
  return (
    <>
      {value.slice(0, match.index)}
      {rendered}
      {value.slice(match.index! + match[0].length)}
    </>
  );
};

export default CountUp;
