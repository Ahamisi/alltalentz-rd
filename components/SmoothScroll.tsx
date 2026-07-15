"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth scroll. Lenis interpolates the raw (spiky) wheel/scroll input
 * into a continuous stream, and we drive it from GSAP's single ticker so Lenis,
 * ScrollTrigger and every scrubbed timeline update on the exact same frame —
 * which is what removes the jerk from scroll-driven pins.
 */
const SmoothScroll = () => {
  useEffect(() => {
    // Honour users who ask for less motion — skip smoothing entirely.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1, // lower = smoother/heavier, higher = snappier
      smoothWheel: true,
    });

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // One RAF for everything: GSAP's ticker pumps Lenis.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default SmoothScroll;
