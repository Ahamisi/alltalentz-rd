"use client";

import { motion, AnimatePresence } from "framer-motion";
import { highlight } from "./highlight";
import FaqBadgeIcon from "./FaqBadgeIcon";

/**
 * One question row.
 *
 * Closed it is a single bordered line; open it becomes a raised card — the
 * border, radius, padding and shadow all shift together so the open item reads
 * as lifted out of the list rather than merely taller.
 *
 * Motion notes:
 *  - Height is animated by framer-motion (`height: auto`), with the answer text
 *    fading/rising on a slightly longer, offset tween so it arrives *after* the
 *    box has made room — an instant text swap inside a growing box is what makes
 *    accordions feel snappy-but-cheap.
 *  - The toggle is the shield badge from the v26 asset set; only the glyph inside
 *    it crossfades (plus → minus) so the shield itself never flickers.
 *  - Every transition is dropped under prefers-reduced-motion.
 */
type FaqAccordionItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  /** Current search term — highlighted inside the question and answer. */
  query?: string;
  id: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  query = "",
  id,
}: FaqAccordionItemProps) {
  return (
    <div
      data-open={isOpen}
      className={`group rounded-[13px] border transition-[border-color,box-shadow,background-color] duration-300 motion-reduce:transition-none ${
        isOpen
          ? "border-[#E3E1DD] bg-white"
          : "border-[#E7E7E7] bg-white hover:border-[#D9D7D3]"
      }`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-[16px] px-[20px] py-[22px] text-left md:px-[28px] md:py-[26px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621] rounded-[12px]"
        >
          <span
            className={`text-[16px] leading-[150%] font-medium transition-colors duration-300 motion-reduce:transition-none md:text-[18px] ${
              isOpen ? "text-[#121212]" : "text-[#1D1D1D] group-hover:text-[#121212]"
            }`}
          >
            {highlight(question, query)}
          </span>

          {/* Shield badge: plus crossfades to minus, grey warms to orange. */}
          <FaqBadgeIcon
            isOpen={isOpen}
            className={`h-[26px] w-[26px] shrink-0 transition-colors duration-300 motion-reduce:transition-none ${
              isOpen ? "text-[#F99621]" : "text-[#5A5F73] group-hover:text-[#121212]"
            }`}
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-button`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.42, ease: EASE },
              opacity: { duration: 0.24 },
            }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 4, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.06 }}
              className="px-[20px] pb-[26px] text-[15px] leading-[180%] text-[#5F5F5F] md:px-[28px] md:pb-[30px] md:pr-[64px] md:text-[16px]"
            >
              {highlight(answer, query)}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
