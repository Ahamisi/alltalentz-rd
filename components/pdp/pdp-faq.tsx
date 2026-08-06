"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaqAccordionItem from "@/components/faq/FaqAccordionItem";
import { pdpFaqs } from "./pdp-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * PDP FAQs — centred heading over a narrow accordion column, with a single
 * hand-drawn squiggle sitting in the empty margin beside the list.
 *
 * The rows themselves are the shared `FaqAccordionItem` (shield badge, animated
 * panel) so this section and /faq stay one component, not two lookalikes. Only
 * one question is open at a time; the first opens on load so the section never
 * reads as an unlabelled stack of bars.
 */
const PdpFaq = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(".pf-reveal", { autoAlpha: 0, y: 24 });

      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        })
        .to(".pf-reveal", {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.08,
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-white px-[24px] py-[80px] md:px-[40px] md:py-[120px]"
    >
      <div className="relative z-10 mx-auto max-w-[760px]">
        <h2 className="pf-reveal text-center text-[36px] leading-[1.05] tracking-[-0.03em] font-bold text-[#121212] md:text-[56px] lg:text-[64px]">
          Frequently Asked
          <br className="hidden md:block" /> Questions
        </h2>

        <div className="mt-[48px] flex flex-col gap-[14px] md:mt-[72px]">
          {pdpFaqs.map((faq, index) => (
            <div key={faq.question} className="pf-reveal">
              <FaqAccordionItem
                id={`pdp-faq-${index}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === index ? null : index))
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Squiggle in the left margin — only where there's room for it. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 34 64"
        fill="none"
        className="pointer-events-none absolute left-[calc(50%-500px)] top-1/2 hidden h-[64px] w-[34px] -translate-y-1/2 text-[#5C5C5C] xl:block"
      >
        <path
          d="M6 4c9 3 13 10 10 17-2.6 6-11 8-13 15-2 7 6 14 17 24"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </section>
  );
};

export default PdpFaq;
