"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { REVEAL_IN_VIEW } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared hero for every "hire <niche> talent" page (healthcare, finance, legal,
 * tech, pest control, remediation…).
 *
 * Centred two-line headline (line two in orange) + one-line proof copy + a
 * single orange CTA, above a fanned deck of photo cards that bleeds off the
 * bottom of the section.
 *
 * Everything niche-specific comes in through props — copy, CTA, and the photo
 * deck — so a new talent page is one `<TalentHero {...} />` call.
 *
 * Motion is layered so each element is owned by exactly one animation and
 * transforms never fight:
 *   .th-card-shell    → scroll-scrubbed parallax drift (depth)
 *   .th-card-enter    → the deal-in entrance (rise + fan out to its rotation)
 *   .th-card-hover    → pointer hover lift + straighten
 *   the <Image> itself → CSS-only zoom on hover
 * The whole deck also drifts a few pixels toward the cursor.
 */
export type TalentHeroCard = {
  src: string;
  alt: string;
  /** object-position for the crop — keeps the subject inside a tall card. */
  pos?: string;
};

type TalentHeroProps = {
  /** First headline line, rendered in near-black. */
  title: ReactNode;
  /** Second headline line, rendered in orange. Omit for a one-line headline. */
  titleAccent?: ReactNode;
  /** Single line of supporting proof copy. */
  description?: ReactNode;
  cta?: { text: string; url: string; openNewTab?: boolean };
  /**
   * Photo deck, left → right. Three reads best; the middle card sits highest
   * and on top of the fan. Two or five also lay out symmetrically.
   */
  cards: TalentHeroCard[];
  /** Optional extra classes for the outer section. */
  className?: string;
};

/** Rotation, in degrees, of the outermost cards in the fan. */
const FAN_SPREAD = 9;
/** How far the centre of the fan sits above the outer cards, in % of card height. */
const FAN_LIFT = 9;

/**
 * Resting geometry for the card at `i` of `total`: a symmetric fan that tilts
 * and drops away from the centre, with the centre stacked on top.
 */
const cardGeometry = (i: number, total: number) => {
  const mid = (total - 1) / 2;
  // 0 at the centre of the fan, 1 at either edge.
  const edge = mid === 0 ? 0 : (i - mid) / mid;
  const depth = Math.abs(edge);

  return {
    rotation: edge * FAN_SPREAD,
    /** % of card height — the centre card rides highest. */
    lift: -(1 - depth) * FAN_LIFT,
    scale: 1 - depth * 0.04,
    zIndex: total - Math.round(depth * total),
    /** Outer cards drift furthest on scroll, so the fan opens as you read. */
    drift: -16 - depth * 14,
  };
};

const TalentHero = ({
  title,
  titleAccent,
  description,
  cta,
  cards,
  className = "",
}: TalentHeroProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView(REVEAL_IN_VIEW);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the copy + collapse the deck before first paint so the entrance always
  // plays from scratch.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".th-line-inner", { yPercent: 110 });
      gsap.set(".th-hero-para, .th-hero-cta", { autoAlpha: 0, y: 20 });
      // Cards start as a squared-up, slightly sunken stack; the entrance fans
      // them out to the rotations set in `style`.
      gsap.set(".th-card-enter", {
        autoAlpha: 0,
        y: 90,
        rotation: 0,
        scale: 0.9,
        yPercent: 0,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [prefersReduced]);

  useLayoutEffect(() => {
    if (!inView || prefersReduced) return;
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Each headline line rises from behind its clip mask, staggered.
      tl.to(".th-line-inner", {
        yPercent: 0,
        duration: 0.85,
        ease: "power4.out",
        stagger: 0.12,
      });

      // Proof copy, then the CTA, fade up as the headline settles.
      tl.to(
        ".th-hero-para",
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.35"
      );
      tl.to(
        ".th-hero-cta",
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.35"
      );

      // The deck deals itself out: cards rise, fan to their rotation, and land
      // centre-first so the outer two look flicked into place. The label has to
      // exist before the tweens that position themselves against it.
      tl.addLabel("deck", "-=0.45");

      gsap.utils.toArray<HTMLElement>(".th-card-enter").forEach((card) => {
        tl.to(
          card,
          {
            autoAlpha: 1,
            y: 0,
            yPercent: Number(card.dataset.lift ?? 0),
            rotation: Number(card.dataset.rotation ?? 0),
            scale: Number(card.dataset.scale ?? 1),
            duration: 1,
            ease: "power3.out",
          },
          `deck+=${Number(card.dataset.delay ?? 0)}`
        );
      });

      // Depth: cards drift up as the section scrolls past, outer ones furthest.
      gsap.utils.toArray<HTMLElement>(".th-card-shell").forEach((shell) => {
        gsap.to(shell, {
          y: Number(shell.dataset.drift ?? 0),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [inView, prefersReduced]);

  // The deck leans a few pixels toward the cursor — parallax on the wrapper, so
  // it never touches the per-card transforms.
  useLayoutEffect(() => {
    if (prefersReduced) return;
    const deck = deckRef.current;
    if (!deck) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const moveX = gsap.quickTo(deck, "x", { duration: 0.8, ease: "power3.out" });
    const moveY = gsap.quickTo(deck, "y", { duration: 0.8, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const { left, top, width, height } = deck.getBoundingClientRect();
      moveX(((event.clientX - (left + width / 2)) / width) * 18);
      moveY(((event.clientY - (top + height / 2)) / height) * 12);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    deck.addEventListener("pointermove", onMove);
    deck.addEventListener("pointerleave", onLeave);
    return () => {
      deck.removeEventListener("pointermove", onMove);
      deck.removeEventListener("pointerleave", onLeave);
    };
  }, [prefersReduced]);

  const setRefs = (node: HTMLElement | null) => {
    rootRef.current = node;
    inViewRef(node);
  };

  // Hover: lift the card and straighten it a little, so the hovered photo reads
  // as pulled out of the fan.
  const onCardEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    gsap.to(event.currentTarget, {
      y: -18,
      scale: 1.03,
      rotation: Number(event.currentTarget.dataset.straighten ?? 0),
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onCardLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    gsap.to(event.currentTarget, {
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  return (
    <section
      ref={setRefs}
      className={`relative overflow-hidden bg-white px-[24px] md:px-[40px] pt-[80px] md:pt-[120px] ${className}`}
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        {/* Copy */}
        <div className="mx-auto max-w-[900px] xl:max-w-[1000px] text-center">
          <h1 className="text-[38px] leading-[1.12] tracking-[-3%] font-semibold text-[#121212] md:text-[42px] lg:text-[50px] lg:leading-[56px] lg:tracking-[-5%]">
            {/* pb/-mb: room for descenders inside the clip mask without
                changing the visual line spacing. */}
            <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
              <span className="th-line-inner block">{title}</span>
            </span>
            {titleAccent ? (
              <span className="block overflow-hidden pb-[0.18em] -mb-[0.18em]">
                <span className="th-line-inner block text-[#F99621]">
                  {titleAccent}
                </span>
              </span>
            ) : null}
          </h1>

          {description ? (
            <p className="th-hero-para mx-auto mt-[24px] max-w-[620px] text-[17px] leading-[1.5] font-normal text-[#121212] md:text-[20px]">
              {description}
            </p>
          ) : null}

          {cta ? (
            <div className="th-hero-cta mt-[32px] md:mt-[40px]">
              <Link
                href={cta.url}
                target={cta.openNewTab ? "_blank" : undefined}
                rel={cta.openNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center bg-[#F99621] px-[40px] py-[16px] font-medium text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                {cta.text}
              </Link>
            </div>
          ) : null}
        </div>

        {/* Photo deck — fanned cards, clipped by the section's bottom edge. */}
        <div
          ref={deckRef}
          className="relative mx-auto mt-18 -mb-6 flex max-w-[1120px] items-start justify-center md:mt-30 md:-mb-18 lg:mt-38 lg:-mb-24"
        >
          {cards.map((card, i) => {
            const geo = cardGeometry(i, cards.length);
            return (
              <div
                key={card.src}
                // Layout + scroll parallax live here; the entrance and hover
                // transforms belong to the nested wrappers.
                className="th-card-shell relative w-[36%] max-w-[360px] shrink-0"
                style={{ zIndex: geo.zIndex, marginLeft: i === 0 ? 0 : "-3%" }}
                data-drift={geo.drift}
              >
                <div
                  className="th-card-enter"
                  data-rotation={geo.rotation}
                  data-lift={geo.lift}
                  data-scale={geo.scale}
                  // Centre-first: the fan opens outward from the middle.
                  data-delay={Math.abs(i - (cards.length - 1) / 2) * 0.12}
                  // Resting transform for reduced-motion / pre-hydration, where
                  // the GSAP entrance never runs.
                  style={{
                    transform: `translateY(${geo.lift}%) rotate(${geo.rotation}deg) scale(${geo.scale})`,
                  }}
                >
                  <div
                    className="th-card-hover group relative aspect-[3/4] overflow-hidden rounded-[14px] shadow-[0_28px_60px_-24px_rgba(18,18,18,0.45)] md:rounded-[24px]"
                    // Hovering pulls the card halfway back to upright.
                    data-straighten={-geo.rotation * 0.5}
                    onPointerEnter={onCardEnter}
                    onPointerLeave={onCardLeave}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 768px) 36vw, 360px"
                      priority={i < 3}
                      style={{ objectPosition: card.pos ?? "50% 50%" }}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TalentHero;
