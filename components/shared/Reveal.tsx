"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { REVEAL_VIEWPORT } from "@/lib/motion";

/**
 * Fade-and-rise reveal for section headings, subheadings and copy.
 *
 * Sections that already run their own entrance (a GSAP timeline keyed off a
 * class, or a framer-motion variant tree) should keep doing that — one section,
 * one timeline. This is for the sections that had no entrance at all, and for
 * server components, where it acts as the client boundary so the page around it
 * can stay a server component.
 *
 * It reuses `REVEAL_VIEWPORT`, so it starts at the same trigger line as every
 * other reveal on the site rather than the moment its top edge appears.
 */
export type RevealTag =
  | "div"
  | "section"
  | "header"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "span"
  | "ul"
  | "li"
  | "blockquote"
  | "figure";

type RevealProps = {
  /** Element to render. Keep the semantic tag the markup already used. */
  as?: RevealTag;
  /** Seconds to wait before starting — stagger a group by passing `i * 0.08`. */
  delay?: number;
  /** How far it rises, in px. */
  distance?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children?: ReactNode;
};

const Reveal = ({
  as = "div",
  delay = 0,
  distance = 24,
  duration = 0.6,
  className,
  style,
  id,
  children,
}: RevealProps) => {
  const prefersReduced = useReducedMotion();
  const Tag = motion[as] as ElementType;

  // `initial` deliberately does NOT depend on prefersReduced: it is rendered
  // into the server HTML, and a value that flipped on hydration would be a
  // markup mismatch. Reduced motion instead collapses the transition to zero,
  // so the element snaps to its final state the moment it crosses the line.
  return (
    <Tag
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={
        prefersReduced
          ? { duration: 0, delay: 0 }
          : { duration, delay, ease: "easeOut" }
      }
    >
      {children}
    </Tag>
  );
};

export default Reveal;
