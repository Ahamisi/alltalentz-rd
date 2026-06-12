"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimate } from "framer-motion";

const AUTO_CLOSE_MS = 10000;

export default function BootcampModal() {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progressScope, animate] = useAnimate();

  useEffect(() => {
    setIsOpen(true);
    timerRef.current = setTimeout(() => setIsOpen(false), AUTO_CLOSE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    animate(
      progressScope.current,
      { scaleX: 0 },
      { duration: AUTO_CLOSE_MS / 1000, ease: "linear" as const }
    );
  }, [isOpen, animate, progressScope]);

  function handleClose() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bootcamp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden shadow-2xl"
        style={{ overscrollBehavior: "contain" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative px-6 pt-8 pb-10 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close announcement"
            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ touchAction: "manipulation" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Live badge */}
          <span className="inline-flex items-center gap-1.5 bg-[#F99621] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            Registration Open
          </span>

          <h2
            id="bootcamp-modal-title"
            className="text-white text-[28px] font-bold leading-snug"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            All Talentz Professional Development Program
            <br />
            <span className="text-[#F99621]">is Now Open!</span>
          </h2>

          {/* Date pill */}
          <div className="inline-flex items-center gap-2 mt-4 bg-white/10 rounded-full px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-[#F99621]"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white text-sm font-semibold">April 6th &ndash; 12th, 2026</span>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white px-6 pt-5 pb-6 space-y-5">
          {/* Highlights */}
          <ul className="space-y-2.5">
            {[
              "Industry-trained expert instructors",
              "Hands-on, intensive 7-day programme",
              "Limited cohort — spots are filling fast",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span
                  className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-[#FEF5E9] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5 text-[#F99621]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              href="/professional-development-programme"
              onClick={handleClose}
              className="flex-1 text-center bg-[#F99621] hover:bg-[#e8870e] active:bg-[#d47a0a] text-white font-bold px-6 py-3.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2"
              style={{ touchAction: "manipulation" }}
            >
              Reserve Your Spot
            </Link>
            <button
              onClick={handleClose}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded-xl px-4 py-3.5"
              style={{ touchAction: "manipulation" }}
            >
              Maybe later
            </button>
          </div>
        </div>

        {/* Auto-close progress bar */}
        <div className="h-1 bg-gray-100">
          <motion.div
            ref={progressScope}
            className="h-full bg-[#F99621]"
            style={{ transformOrigin: "left" }}
          />
        </div>
      </div>
    </div>
  );
}
