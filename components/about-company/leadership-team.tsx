"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import instagramIcon from "@iconify-icons/mdi/instagram";
import twitterIcon from "@iconify-icons/mdi/twitter";
import linkedinIcon from "@iconify-icons/mdi/linkedin";
import facebookIcon from "@iconify-icons/mdi/facebook";
import chevronLeftIcon from "@iconify-icons/mdi/chevron-left";
import chevronRightIcon from "@iconify-icons/mdi/chevron-right";
import { useInView } from "react-intersection-observer";
import {
  COMPANY_SOCIALS,
  LEADERSHIP_TEAM,
  type LeadershipMember,
} from "@/lib/leadership-team";

/**
 * "Leadership Team" — the about page's roster band.
 *
 * A single filmstrip of portraits sits on the right: the active member's frame
 * is wide, everyone else is a narrow slice butted against it. The strip cycles
 * on its own every `ROTATE_MS` and never stops on its own — copy and portrait
 * change together — and *clicking* a slice promotes that member to active (and
 * restarts the clock, so a deliberate click isn't yanked away a beat later).
 * Hover only pauses the rotation — it never changes the selection, so passing
 * the cursor across the strip can't strobe through the roster.
 *
 * The roster is longer than the strip is wide, so the strip is a carousel: it
 * shows a `WINDOW` of frames and slides to keep the active one in view, with
 * arrows above the portraits both to page it by hand and to advertise that
 * there's more roster off-frame.
 *
 * Two things carry the geometry. Frame widths are computed in px from the
 * measured column width — `WINDOW` visible frames share `TOTAL_UNITS` of space,
 * the active one taking `ACTIVE_UNITS` of them — so the strip's visible width is
 * constant no matter who's expanded. And the window itself is a `translate3d` on
 * the track, which composites instead of relaying out eleven frames per frame.
 * Only the copy column is animated with GSAP, matching the entrance style used
 * by the neighbouring `RestoringExcellence` / `OurStory` sections.
 */
const ROTATE_MS = 5000;

/** Frames visible at once on md+. */
const WINDOW = 5;
/** Width of the expanded frame, in units of a collapsed one. */
const ACTIVE_UNITS = 4;
/** One active frame + the collapsed remainder of the window. */
const TOTAL_UNITS = ACTIVE_UNITS + (WINDOW - 1);
const GAP = 4;

const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", icon: instagramIcon },
  { key: "twitter", label: "X (Twitter)", icon: twitterIcon },
  { key: "linkedin", label: "LinkedIn", icon: linkedinIcon },
  { key: "facebook", label: "Facebook", icon: facebookIcon },
] as const;

const socialHref = (member: LeadershipMember, key: keyof typeof COMPANY_SOCIALS) =>
  member.socials?.[key] ?? COMPANY_SOCIALS[key];

const TOTAL = LEADERSHIP_TEAM.length;
const MAX_START = Math.max(0, TOTAL - WINDOW);
const pad = (n: number) => String(n).padStart(2, "0");

const LeadershipTeam = () => {
  const rootRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [paused, setPaused] = useState(false);
  /** Column width in px; 0 until measured, which also means "not windowed yet". */
  const [columnWidth, setColumnWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const { ref: inViewRef, inView } = useInView({ threshold: 0.15 });
  // A separate one-shot observer for the entrance, so the rotation observer can
  // keep reporting (it also gates the timer — an off-screen strip shouldn't spin).
  const { ref: enterRef, inView: entered } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const active = LEADERSHIP_TEAM[activeIndex];

  const select = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Arrows move the *selection*, not just the viewport — the copy column has to
  // agree with whichever portrait is lit — and wrap, matching the auto-rotation.
  const step = useCallback((delta: number) => {
    setActiveIndex((i) => (i + delta + TOTAL) % TOTAL);
  }, []);

  // Auto-advance. Re-created on every activeIndex change, which is also what
  // gives a click its full dwell time before the next hop.
  useEffect(() => {
    if (prefersReduced || paused || !inView) return;
    const id = window.setInterval(
      () => setActiveIndex((i) => (i + 1) % TOTAL),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [activeIndex, paused, inView, prefersReduced]);

  // md+ gets the windowed carousel; below that the strip stays a plain
  // scroll-snap rail, which is the better gesture on a touch screen.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    setColumnWidth(el.clientWidth);
    const ro = new ResizeObserver(([entry]) =>
      setColumnWidth(entry.contentRect.width)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const windowed = isDesktop && columnWidth > 0;
  const unit = windowed
    ? Math.max(0, (columnWidth - GAP * (WINDOW - 1)) / TOTAL_UNITS)
    : 0;
  const offset = windowStart * (unit + GAP);

  // Slide the window the shortest distance that brings the active frame back
  // inside it — so a click on a visible slice never shifts the strip, and the
  // wrap from last to first rewinds all the way home.
  useEffect(() => {
    setWindowStart((start) => {
      if (activeIndex < start) return activeIndex;
      if (activeIndex > start + WINDOW - 1)
        return Math.min(activeIndex - WINDOW + 1, MAX_START);
      return Math.min(start, MAX_START);
    });
  }, [activeIndex]);

  // Keep the active slice visible in the mobile strip, which scrolls sideways.
  // `scrollLeft` rather than `scrollIntoView` so the page itself never moves —
  // on md+ the strip is translated instead and this is a no-op.
  useEffect(() => {
    const strip = stripRef.current;
    if (windowed || !strip || strip.scrollWidth <= strip.clientWidth) return;
    const node = strip.children[activeIndex] as HTMLElement | undefined;
    if (!node) return;
    strip.scrollTo({
      left: node.offsetLeft - strip.offsetLeft - (strip.clientWidth - node.clientWidth) / 2,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, [activeIndex, prefersReduced, windowed]);

  // Hide the entrance targets before first paint.
  useLayoutEffect(() => {
    if (prefersReduced || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".lt-reveal", { autoAlpha: 0, y: 24 });
      gsap.set(".lt-frame", { autoAlpha: 0, y: 32 });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!entered || prefersReduced || !rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(".lt-reveal", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
      });
      tl.to(
        ".lt-frame",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
        },
        "-=0.35"
      );
    }, rootRef);
    return () => ctx.revert();
  }, [entered, prefersReduced]);

  // Crossfade the copy column whenever the active member changes.
  useLayoutEffect(() => {
    if (prefersReduced || !entered || !copyRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".lt-swap",
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.06,
          overwrite: "auto",
        }
      );
    }, copyRef);
    return () => ctx.revert();
  }, [activeIndex, entered, prefersReduced]);

  const setRefs = (node: HTMLElement | null) => {
    rootRef.current = node;
    inViewRef(node);
    enterRef(node);
  };

  const autoplayRunning = !prefersReduced && !paused && inView;

  return (
    <section
      ref={setRefs}
      aria-labelledby="leadership-team-heading"
      className="bg-[#F6F1EF] px-[16px] py-[40px] md:px-[40px] md:py-[60px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-[1440px] bg-white px-[24px] py-[56px] md:px-[64px] md:py-[80px] lg:px-[96px] lg:py-[104px]">
        {/* Section statement */}
        <span className="lt-reveal block h-[3px] w-[110px] bg-[#F99621]" />
        <h2
          id="leadership-team-heading"
          className="lt-reveal mt-[24px] text-[34px] font-medium leading-[100%] tracking-[0px] text-[#121212] lg:text-[42.97px]"
        >
          Leadership Team
        </h2>
        <p className="lt-reveal mt-[16px] max-w-[620px] text-[16px] font-normal leading-[160%] tracking-[0%] text-[#B6B6B6] md:text-[18px]">
          The people driving All Talentz forward — across strategy, operations, and growth.
        </p>

        <div className="mt-[48px] grid grid-cols-1 items-center gap-x-[40px] lg:mt-[80px] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-x-[64px]">
          {/* Active member */}
          <div ref={copyRef} aria-live="polite">
            <h3 className="lt-swap text-[34px] font-medium leading-[90.31px] tracking-[0%] text-[#121212] md:text-[48px] lg:text-[42.97px]">
              {active.name}
              {active.title && (
                <span className="ml-2 align-middle text-[14px] font-medium text-[#F99621]">
                  {active.title}
                </span>
              )}
            </h3>
            <p className="lt-swap mt-1 text-[16px] lg:text-[16.12px] font-normal leading-[150%] tracking-[0%] text-[#B6B6B6] md:text-[18px]">
              {active.role}
            </p>

            <ul className="lt-swap mt-4 flex items-center gap-[10px]">
              {SOCIAL_LINKS.map(({ key, label, icon }) => (
                <li key={key}>
                  <Link
                    href={socialHref(active, key)}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${active.name} on ${label}`}
                    className="flex size-[28px] items-center justify-center rounded-full bg-[#E7E7E7] text-[#121212] transition-colors duration-300 hover:bg-[#F99621] hover:text-[#121212]"
                  >
                    <Icon icon={icon} className="size-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="lt-swap mt-[28px] max-w-[420px] text-[18px] lg:text-[18.8px] font-normal leading-[160%] tracking-[0%] text-[#B6B6B6] md:text-[22px]">
              {active.blurb}
            </p>
          </div>

          {/* Filmstrip carousel */}
          <div className="mt-[32px] lg:mt-0">
            {/* Controls — above the portraits, so the roster reads as pageable
                before anyone touches it. */}
            <div className="lt-reveal mb-[16px] flex items-center justify-between gap-[16px] md:justify-end">
              <div className="flex items-center gap-[12px]">
                <span className="text-[13px] font-medium tabular-nums text-[#121212]">
                  {pad(activeIndex + 1)}
                  <span className="mx-[4px] text-[#D8D8D8]">/</span>
                  <span className="text-[#B6B6B6]">{pad(TOTAL)}</span>
                </span>
                {/* Autoplay tell: drains once per dwell, freezes on hover/focus. */}
                <span
                  aria-hidden="true"
                  className="hidden h-[2px] w-[64px] overflow-hidden bg-[#EDEDED] md:block"
                >
                  <span
                    key={activeIndex}
                    style={{
                      ["--lt-rotate" as string]: `${ROTATE_MS}ms`,
                      animationPlayState: autoplayRunning ? "running" : "paused",
                    }}
                    className="lt-progress-fill block h-full w-full bg-[#F99621]"
                  />
                </span>
              </div>

              <div className="flex items-center gap-[8px]">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous team member"
                  aria-controls="leadership-strip"
                  className="flex size-[36px] cursor-pointer items-center justify-center border border-[#E7E7E7] text-[#121212] transition-colors duration-300 hover:border-[#F99621] hover:bg-[#F99621] focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2 focus-visible:outline-hidden"
                >
                  <Icon icon={chevronLeftIcon} className="size-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next team member"
                  aria-controls="leadership-strip"
                  className="flex size-[36px] cursor-pointer items-center justify-center border border-[#E7E7E7] text-[#121212] transition-colors duration-300 hover:border-[#F99621] hover:bg-[#F99621] focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2 focus-visible:outline-hidden"
                >
                  <Icon icon={chevronRightIcon} className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Viewport — measured for the frame maths, and the clip the window
                slides behind on md+. */}
            <div ref={viewportRef} className="md:overflow-hidden">
              <ul
                id="leadership-strip"
                ref={stripRef}
                style={
                  windowed
                    ? { transform: `translate3d(${-offset}px, 0, 0)` }
                    : undefined
                }
                className="-mx-[24px] flex snap-x gap-[4px] overflow-x-auto px-[24px] pb-2 md:mx-0 md:overflow-visible md:px-0 md:pb-0 md:transition-transform md:duration-700 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:will-change-transform md:motion-reduce:transition-none"
              >
                {LEADERSHIP_TEAM.map((member, index) => {
                  const isActive = index === activeIndex;
                  const visible =
                    !windowed ||
                    (index >= windowStart && index < windowStart + WINDOW);
                  return (
                    <li
                      key={member.id}
                      style={
                        windowed
                          ? { width: isActive ? unit * ACTIVE_UNITS : unit }
                          : undefined
                      }
                      className={`lt-frame min-w-0 shrink-0 snap-start transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        isActive ? "w-[240px]" : "w-[76px]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => select(index)}
                        aria-pressed={isActive}
                        aria-label={`Show ${member.name}, ${member.role}`}
                        // Frames parked outside the window shouldn't be tab stops.
                        tabIndex={visible ? undefined : -1}
                        className="relative block h-[320px] w-full cursor-pointer overflow-hidden outline-hidden focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2 md:h-[420px] lg:h-[480px]"
                      >
                        <Image
                          src={member.image}
                          alt={`${member.name}, ${member.role}`}
                          fill
                          sizes="(max-width: 768px) 240px, 30vw"
                          className={`object-cover object-top transition-[filter] duration-500 ${
                            isActive ? "grayscale-0" : "grayscale"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
