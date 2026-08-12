"use client";
import { useEffect, useState } from "react";

/**
 * Tracks whether the viewport is narrower than a breakpoint (Tailwind `lg` by
 * default). Starts `false` so server and first client render agree, then
 * settles on the real value after mount.
 */
export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}
