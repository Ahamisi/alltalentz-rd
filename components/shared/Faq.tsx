"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { homepageFAQs } from "@/lib/homepage-faqs";
import Reveal from "@/components/shared/Reveal";

/**
 * Reusable FAQ block for the redesigned pages: italic heading + "see all" link
 * on the left, an accordion list on the right, and an optional centred CTA row
 * underneath.
 *
 * Content is fully prop-driven so each page can pass its own questions; the
 * defaults fall back to the shared homepage set.
 */
export type FaqEntry = {
  question: string;
  answer: ReactNode;
};

type FaqCta = {
  text: string;
  url: string;
  openNewTab?: boolean;
};

type FaqProps = {
  title?: ReactNode;
  /** Text for the link under the heading. Hidden when `linkHref` is null. */
  linkText?: string;
  /** Destination of the "see all" link. Pass null to drop the link entirely. */
  linkHref?: string | null;
  faqs?: FaqEntry[];
  /** Optional filled button shown centred below the list. */
  primaryCta?: FaqCta;
  /** Optional outlined button shown next to the primary one. */
  secondaryCta?: FaqCta;
  /** Optional extra classes for the outer section. */
  className?: string;
};

const ChevronIcon = () => (
  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.5"
      d="M11.0104 2.6748C15.8772 2.6748 19.8225 6.62013 19.8225 11.4869C19.8225 16.3537 15.8772 20.2991 11.0104 20.2991C6.14357 20.2991 2.19824 16.3537 2.19824 11.4869C2.19824 6.62013 6.14357 2.6748 11.0104 2.6748Z"
      fill="#1D1D1D"
    />
    <path
      d="M7.89939 8.86986C7.64129 8.61176 7.64129 8.1933 7.89939 7.9352C8.15749 7.6771 8.57595 7.6771 8.83405 7.9352L11.0104 10.1115L13.1867 7.9352C13.4448 7.6771 13.8632 7.6771 14.1213 7.9352C14.3794 8.1933 14.3794 8.61176 14.1213 8.86987L11.4777 11.5135C11.2196 11.7716 10.8011 11.7716 10.543 11.5135L7.89939 8.86986Z"
      fill="#1D1D1D"
    />
    <path
      d="M7.89939 12.3947C7.64129 12.1366 7.64129 11.7182 7.89939 11.4601C8.15749 11.2019 8.57595 11.2019 8.83405 11.4601L11.0104 13.6364L13.1867 11.4601C13.4448 11.2019 13.8632 11.2019 14.1213 11.4601C14.3794 11.7182 14.3794 12.1366 14.1213 12.3947L11.4777 15.0384C11.2196 15.2965 10.8011 15.2965 10.543 15.0384L7.89939 12.3947Z"
      fill="#1D1D1D"
    />
  </svg>
);

const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="border-b border-[#ECECEC]">
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={onClick}
      className="flex w-full items-center justify-between gap-[16px] py-[20px] text-left"
    >
      <span className="text-[16px] leading-[150%] font-normal text-[#121212]">{question}</span>
      <span
        className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
          isOpen ? "-rotate-180" : ""
        }`}
      >
        <ChevronIcon />
      </span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pb-[20px] pr-[38px] text-[16px] leading-[160%] text-[#5F5F5F]">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Faq = ({
  title = (
    <>
      Frequently asked
      <br className="hidden md:block" /> questions
    </>
  ),
  linkText = "See all questions",
  linkHref = "/faq",
  faqs = homepageFAQs.slice(0, 4),
  primaryCta,
  secondaryCta,
  className = "",
}: FaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`relative bg-white px-[24px] md:px-[40px] py-[80px] md:py-[120px] ${className}`}>
      <div className="container mx-auto max-w-(--breakpoint-xl) lg:max-w-[937.17px]">
        <div className="flex flex-col gap-[40px] md:flex-row md:gap-[80px]">
          {/* Heading + "see all" link */}
          <Reveal className="md:w-[42%]">
            <h2 className="text-[30px] leading-[124%] md:text-[36px] font-medium italic text-[#292929]">
              {title}
            </h2>
            {linkHref && (
              <Link
                href={linkHref}
                className="mt-[20px] inline-block text-[16px] text-[#F99621] transition-opacity duration-300 hover:opacity-80"
              >
                {linkText}
              </Link>
            )}
          </Reveal>

          {/* Accordion — each row rises just after the heading. */}
          <div className="md:w-[58%]">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={0.1 + index * 0.07}>
                <FaqItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {(primaryCta || secondaryCta) && (
          <Reveal className="mt-[64px] flex flex-col items-center justify-center gap-[16px] sm:flex-row md:mt-[96px]">
            {primaryCta && (
              <Link
                href={primaryCta.url}
                target={primaryCta.openNewTab ? "_blank" : undefined}
                rel={primaryCta.openNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center bg-[#F99621] px-[32px] py-[14px] text-[14px] font-normal text-[#121212] transition-transform duration-300 hover:scale-105 hover:bg-[#e8871a]"
              >
                {primaryCta.text}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.url}
                target={secondaryCta.openNewTab ? "_blank" : undefined}
                rel={secondaryCta.openNewTab ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center border border-[#ECECEC] px-[32px] py-[14px] text-[14px] font-normal text-[#121212] transition-colors duration-300 hover:bg-[#121212] hover:text-white"
              >
                {secondaryCta.text}
              </Link>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default Faq;
