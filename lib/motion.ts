/**
 * Shared trigger settings for scroll-reveal animations.
 *
 * An IntersectionObserver fires as soon as one pixel of the target crosses the
 * bottom of the viewport, and a `threshold` doesn't help on a tall section: 20%
 * of a 1500px section is 300px, which is still only its very top edge. The
 * reveal therefore finished while the section was off screen, and by the time
 * you scrolled to it everything was already in place.
 *
 * Pulling the observer root's bottom edge up by 30% of the viewport height
 * moves the trigger line to 70% down the screen, so a section starts animating
 * just after it becomes properly visible — which is the point of the animation.
 *
 * Don't use these on the footer or anything else that can only ever sit in the
 * bottom third of the last screen: it would never reach the trigger line, and
 * the element would stay stuck at its `initial` (invisible) state.
 */
const TRIGGER_LINE_MARGIN = "0px 0px -30% 0px";

/** Options for `useInView` from react-intersection-observer. */
export const REVEAL_IN_VIEW = {
  triggerOnce: true,
  rootMargin: TRIGGER_LINE_MARGIN,
} as const;

/** The same trigger line for framer-motion's `viewport` prop / `useInView`. */
export const REVEAL_VIEWPORT = {
  once: true,
  margin: TRIGGER_LINE_MARGIN,
} as const;

/** Equivalent `ScrollTrigger.start` for GSAP-driven reveals. */
export const REVEAL_SCROLL_START = "top 70%";
