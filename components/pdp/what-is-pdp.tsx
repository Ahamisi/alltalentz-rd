"use client";
import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { REVEAL_SCROLL_START } from "@/lib/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "What is the PDP" — the explainer video that sits directly under the hero.
 *
 * Shows the YouTube poster frame with an orange play button and only swaps in
 * the iframe once it's clicked, so the section costs nothing until someone
 * wants to watch. Heading fades up, then the card rises in — same entrance as
 * the other v26 sections.
 */
type WhatIsPdpProps = {
  title?: string;
  /** YouTube watch/short URL for the explainer. */
  videoUrl: string;
};

/** Pulls the 11-char id out of a youtu.be / watch?v= / embed URL. */
const getYouTubeVideoId = (url: string) => {
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
};

const WhatIsPdp = ({ title = "What is the PDP", videoUrl }: WhatIsPdpProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeVideoId(videoUrl);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.set(".wip-heading", { autoAlpha: 0, y: 16 });
      gsap.set(".wip-card", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: REVEAL_SCROLL_START, once: true },
      });

      tl.to(".wip-heading", { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
      tl.to(
        ".wip-card",
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", clearProps: "transform" },
        "-=0.25"
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (!videoId) return null;

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px]"
    >
      <div className="container mx-auto max-w-(--breakpoint-xl)">
        <h2 className="wip-heading text-center text-[36px] leading-tight lg:text-[60px] font-semibold text-[#121212] mb-[48px] md:mb-[72px] lg:tracking-[0%]">
          {title}
        </h2>

        <div className="wip-card relative mx-auto w-full max-w-[1080px] aspect-video overflow-hidden rounded-[24px] bg-[#121212] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
          {isPlaying ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&modestbranding=1&controls=1&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              aria-label={`Play video: ${title}`}
              className="group relative h-full w-full cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2"
            >
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt=""
                fill
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="object-cover"
                unoptimized
              />
              {/* Scrim keeps the play button readable over bright frames. */}
              <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
              <span className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F99621] shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg className="ml-1 h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatIsPdp;
