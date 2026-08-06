"use client";

import Link from "next/link";

/**
 * "Still have questions?" escape hatch. Rendered twice — pinned at the bottom of
 * the desktop sidebar, and again after the list on mobile, where a sidebar card
 * would otherwise sit above the content the user came for.
 */
export default function FaqSupportCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[14px] bg-[#F1F1F1] p-[24px] ${className}`}>
      <p className="text-[16px] font-semibold text-[#121212]">
        Still have questions?
      </p>
      <p className="mt-[8px] text-[15px] leading-[160%] text-[#5F5F5F]">
        If you don’t find your answer, feel free to talk to our team.
      </p>
      <Link
        href="/contact-us"
        className="mt-[20px] flex w-full items-center justify-center bg-[#F99621] px-[24px] py-[14px] text-[15px] font-medium text-white transition-[background-color,transform] duration-300 hover:-translate-y-[2px] hover:bg-[#E8871A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F99621] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        Contact Support
      </Link>
    </div>
  );
}
