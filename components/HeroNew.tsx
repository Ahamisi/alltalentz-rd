"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SPIRAL = "/v26-images/home/spiral";
const CENTER_IMG = `${SPIRAL}/11.webp`;

// Exact sizes from the design.
const OUTER_SIZE = 107.35;
const INNER_SIZE = 80;
const CENTER_SIZE = 99.71;

// Only images 1..10 are available for the orbits (11 is the centre / next
// section), so we cycle through them to fill the 11 + 6 slots.
const cycle = (count: number, start: number) =>
  Array.from({ length: count }, (_, i) => `${SPIRAL}/${((start + i) % 10) + 1}.webp`);

const OUTER = cycle(11, 0); // 11 circles
const INNER = cycle(6, 4); //  6 circles (offset so they don't repeat the outer run)

const ringAngles = (count: number, offset = 0) =>
  Array.from({ length: count }, (_, i) => offset + (360 / count) * i);

const HeroNew = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLElement>(null);

  // --- Entrance: heading lines rise out of their clip masks, copy fades up ---
  // The hero is above the fold, so this plays on mount rather than on scroll.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero-line-inner", { yPercent: 110 });
        gsap.set(".hero-fade-up", { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({ delay: 0.15 });

        tl.to(".hero-line-inner", {
          yPercent: 0,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.12,
        });

        tl.to(
          ".hero-fade-up",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.35"
        );

        // The spiral fades in alongside the copy. Only autoAlpha — its scale
        // comes from Tailwind classes and a GSAP scale tween would clobber it.
        tl.from(spiralRef.current, { autoAlpha: 0, duration: 1, ease: "power2.out" }, 0);
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (rotation: number, morphFrom: number) => {
        const outerImgs = gsap.utils.toArray<HTMLElement>(".orbit-img", outerRingRef.current!);
        const innerImgs = gsap.utils.toArray<HTMLElement>(".orbit-img", innerRingRef.current!);
        const nextEl = nextRef.current!;

        // Promote the real next section to a clip-revealed overlay that sits on
        // top of the hero. It stays here as the final frame after the pin ends,
        // so it's never shown a second time.
        gsap.set(nextEl, {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 30,
        });

        // Clip origin = the centre of the middle image, so the reveal reads as
        // that photo zooming out to fill the screen.
        let cx = 0;
        let cy = 0;
        let maxR = 2000;
        const clip = { r: 0 };
        const applyClip = () => {
          nextEl.style.clipPath = `circle(${clip.r}px at ${cx}px ${cy}px)`;
        };
        const measure = () => {
          const pin = pinRef.current;
          const c = centerRef.current;
          if (!pin || !c) return;
          const p = pin.getBoundingClientRect();
          const r = c.getBoundingClientRect();
          cx = r.left - p.left + r.width / 2;
          cy = r.top - p.top + r.height / 2;
          maxR = Math.hypot(Math.max(cx, p.width - cx), Math.max(cy, p.height - cy));
          applyClip();
        };
        measure();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1, // built-in smoothing — this is what kills the jerk
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: measure,
          },
        });

        // --- Rings: outer clockwise, inner anti-clockwise (whole scroll) ---
        tl.to(outerRingRef.current, { rotate: rotation, duration: 1, ease: "none" }, 0);
        tl.to(innerRingRef.current, { rotate: -rotation, duration: 1, ease: "none" }, 0);
        // Counter-rotate each photo so faces stay upright while rings spin.
        tl.to(outerImgs, { rotate: -rotation, duration: 1, ease: "none" }, 0);
        tl.to(innerImgs, { rotate: rotation, duration: 1, ease: "none" }, 0);

        // Gentle zoom on the centre image up to the hand-off.
        tl.to(centerRef.current, { scale: 1.4, duration: morphFrom, ease: "none" }, 0);

        // --- Hand-off: fade the scene, clip-zoom the next section in ---
        const rest = 1 - morphFrom;
        tl.to(
          [outerRingRef.current, innerRingRef.current],
          { autoAlpha: 0, duration: rest, ease: "power1.in" },
          morphFrom
        );
        tl.to(contentRef.current, { autoAlpha: 0, y: -40, duration: rest, ease: "power1.in" }, morphFrom);
        tl.fromTo(
          clip,
          { r: 0 },
          { r: () => maxR, duration: rest, ease: "power2.inOut", onUpdate: applyClip },
          morphFrom
        );

        // Clean the promoted styles if this breakpoint stops matching.
        return () => {
          nextEl.style.clipPath = "";
        };
      };

      // Only animate when motion is welcome; "reduce" gets the two sections
      // stacked normally (no pin, no clip, no overlay).
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () =>
        build(150, 0.45)
      );
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () =>
        build(110, 0.5)
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const orbit = (src: string, angle: number, size: number, i: number) => (
    <div
      key={`${src}-${i}`}
      className="orbit absolute left-1/2 top-1/2"
      style={{
        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(var(--ring-r) * -1)) rotate(${-angle}deg)`,
      }}
    >
      <div
        className="orbit-img overflow-hidden rounded-full shadow-lg"
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          loading={i < 5 ? "eager" : "lazy"}
          draggable={false}
        />
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className="hero-root">
      <div ref={pinRef} className="relative overflow-hidden">
        {/* ---------------- Hero ---------------- */}
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/v26-images/home/hero-bg.webp')" }}
        >
          {/* soft wash so the copy stays legible over the map */}
          <div className="pointer-events-none absolute inset-0 z-5 bg-linear-to-r from-white/85 via-white/40 to-transparent" />

          {/* copy */}
          <div ref={contentRef} className="absolute inset-0 z-20 flex items-center">
            <div className="w-full max-w-7xl mx-auto">
              <div className="max-w-[40%]">
                <h1 className="text-4xl md:text-6xl lg:text-[50px] tracking-[-5%] font-semibold leading-[67.25px] text-[#121212]">
                  {/* pb/-mb: give the clip mask room for descenders (g, y, .)
                      without changing the visual line spacing. */}
                  <span className="block overflow-hidden pb-[0.18em] mb-[-0.18em]">
                    <span className="hero-line-inner block">Remote Talents.</span>
                  </span>
                  <span className="block overflow-hidden pb-[0.18em] mb-[-0.18em]">
                    <span className="hero-line-inner block text-[#E0871E]">
                      Assigned in Less Than 48 Hours.
                    </span>
                  </span>
                </h1>
                <p className="hero-fade-up mt-6 text-base md:text-[18px] tracking-[-6%] leading-[25.86px] font-normal text-[#121212] max-w-md">
                  Pre-vetted professionals across Healthcare, Technology, Finance, Construction, Legal, and Pest Control, at up to 75% less than a local hire.
                </p>
                <div className="hero-fade-up mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/request-talent"
                    className="bg-[#F99621] text-[#121212] px-[40.74px] py-[14.87px] font-normal transition-colors hover:bg-[F99621] hover:text-white"
                  >
                    Get Talentz
                  </Link>
                  <Link
                    href="https://calendly.com/mnwoseh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-[0.56px] border-[#121212] px-[40.74px] py-[14.87px] font-normal text-[#121212] transition-colors hover:border-black"
                  >
                    Request a meeting
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* spiral */}
          <div className="absolute inset-y-0 right-0 z-10 flex w-full items-center justify-center opacity-70 md:w-[60%] md:opacity-100">
            <div
              ref={spiralRef}
              className="spiral relative scale-[0.62] md:scale-100"
              style={{ width: 600, height: 600 }}
            >
              {/* outer ring — clockwise */}
              <div ref={outerRingRef} className="absolute inset-0 [--ring-r:245px]">
                {OUTER.map((src, i) =>
                  orbit(src, ringAngles(OUTER.length, -90)[i], OUTER_SIZE, i)
                )}
              </div>

              {/* inner ring — anti-clockwise */}
              <div ref={innerRingRef} className="absolute inset-0 [--ring-r:138px]">
                {INNER.map((src, i) =>
                  orbit(src, ringAngles(INNER.length, 30)[i], INNER_SIZE, i)
                )}
              </div>

              {/* centre image (11.webp) — no border; seeds the clip zoom */}
              <div
                ref={centerRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full will-change-transform"
                style={{ width: CENTER_SIZE, height: CENTER_SIZE }}
              >
                <img
                  src={CENTER_IMG}
                  alt="A remote professional on a video call"
                  className="h-full w-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Next section (the real one, revealed in place) ---------------- */}
        <section ref={nextRef} className="relative h-screen w-full overflow-hidden">
          <img
            src={CENTER_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Overlay: a flat scrim for baseline contrast, plus a vertical
              gradient that darkens the centre band where the copy sits. */}
          <div aria-hidden="true" className="absolute inset-0 bg-[#121212]/55" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-[#121212]/70 via-[#121212]/40 to-[#121212]/80"
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <h2 className="max-w-3xl text-3xl md:text-5xl font-bold leading-tight">
              Ready to scale with talent trained for your business?
            </h2>
            {/* <p className="mt-6 max-w-xl text-base md:text-lg text-white/85">
              Fully remote, fully integrated professionals who feel like they're
              in the room with you.
            </p> */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/request-talent"
                className="group inline-flex items-center gap-2.5 bg-[#F99621] px-[40.74px] py-[14.87px] font-normal text-[#121212] transition-colors hover:bg-[F99621] hover:text-white"
              >
                Get Talentz
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="https://calendly.com/mnwoseh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border-[0.56px] border-white px-[40.74px] py-[14.87px] font-normal text-white transition-colors hover:border-white/60"
              >
                Book a Meeting
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroNew;
