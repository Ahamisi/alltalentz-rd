"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBeginTest: () => void;
}

const SAVEWYZE_APP_STORE_URL = "https://apps.apple.com/us/app/savewyze/id6449370010";
const SAVEWYZE_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.savewyze";

type MobileOS = "ios" | "android" | "other";

function detectMobileOS(): MobileOS {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

/** Official "Download on the App Store" badge (inline SVG). */
function AppStoreBadge() {
  return (
    <svg
      viewBox="0 0 120 40"
      role="img"
      aria-label="Download on the App Store"
      className="h-11 w-auto"
    >
      <rect
        x="0.5"
        y="0.5"
        width="119"
        height="39"
        rx="8"
        fill="#000"
        stroke="#A6A6A6"
        strokeWidth="1"
      />
      <g fill="#fff">
        <path d="M24.77 19.78c-.02-2.4 1.96-3.56 2.05-3.62-1.12-1.64-2.86-1.86-3.48-1.89-1.48-.15-2.9.87-3.66.87-.75 0-1.92-.85-3.16-.83-1.62.02-3.11.94-3.94 2.4-1.7 2.95-.43 7.3 1.2 9.68.82 1.17 1.78 2.48 3.03 2.43 1.22-.05 1.68-.78 3.15-.78 1.46 0 1.88.78 3.16.75 1.31-.02 2.13-1.18 2.93-2.36.94-1.35 1.32-2.67 1.34-2.74-.03-.01-2.56-.98-2.58-3.88z" />
        <path d="M22.36 12.71c.66-.83 1.11-1.96 .99-3.1-.96.04-2.15.66-2.84 1.47-.61.72-1.15 1.88-1.01 2.98 1.08.08 2.19-.55 2.86-1.35z" />
      </g>
      <text x="34" y="16" fill="#fff" fontSize="6.5" fontFamily="Helvetica, Arial, sans-serif">
        Download on the
      </text>
      <text
        x="34"
        y="31"
        fill="#fff"
        fontSize="16"
        fontWeight="600"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        App Store
      </text>
    </svg>
  );
}

/** Official "Get it on Google Play" badge (inline SVG). */
function GooglePlayBadge() {
  return (
    <svg
      viewBox="0 0 135 40"
      role="img"
      aria-label="Get it on Google Play"
      className="h-11 w-auto"
    >
      <rect
        x="0.5"
        y="0.5"
        width="134"
        height="39"
        rx="8"
        fill="#000"
        stroke="#A6A6A6"
        strokeWidth="1"
      />
      <g transform="translate(11 10)">
        <path
          d="M.4.35C.15.62 0 1.03 0 1.57v16.86c0 .54.15.95.4 1.22l.06.05L9.9 10.11v-.22L.46.3.4.35z"
          fill="#00A0FF"
        />
        <path
          d="M13.05 13.26 9.9 10.11v-.22l3.15-3.15.07.04 3.73 2.12c1.07.6 1.07 1.59 0 2.2l-3.73 2.12-.07.04z"
          fill="#FFCE00"
        />
        <path
          d="M13.12 13.22 9.9 10 .4 19.65c.35.37.93.42 1.59.05l11.13-6.48z"
          fill="#FF3A44"
        />
        <path
          d="M13.12 6.78 1.99 .3C1.33-.07.75-.02.4.35L9.9 10l3.22-3.22z"
          fill="#00E676"
        />
      </g>
      <text x="34" y="16" fill="#fff" fontSize="6" fontFamily="Helvetica, Arial, sans-serif">
        GET IT ON
      </text>
      <text
        x="34"
        y="31"
        fill="#fff"
        fontSize="16"
        fontWeight="600"
        fontFamily="Helvetica, Arial, sans-serif"
      >
        Google Play
      </text>
    </svg>
  );
}

const savewyzeSteps: { num: string; text: React.ReactNode }[] = [
  {
    num: "1",
    text: (
      <>
        Ensure you have your <strong>NIN slip or card</strong> in your possession
      </>
    ),
  },
  {
    num: "2",
    text: (
      <>
        Fill in your <strong>First Name and Last Name</strong> exactly as seen on your NIN slip or
        card (<strong>not your Middle Name</strong>). This makes your NIN verification seamless.
      </>
    ),
  },
  {
    num: "3",
    text: (
      <>
        Your <strong>Wyze tag</strong> is a unique handle (like a nickname) — you can decide what
        that should be.
      </>
    ),
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export default function PreTestNoticeModal({ isOpen, onClose, onBeginTest }: Props) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [mobileOS, setMobileOS] = useState<MobileOS>("other");

  useEffect(() => {
    setMobileOS(detectMobileOS());
  }, []);

  function goToStep2() {
    setDirection(1);
    setStep(2);
  }

  function goToStep1() {
    setDirection(-1);
    setStep(1);
  }

  function handleClose() {
    onClose();
    // Reset state after animation
    setTimeout(() => {
      setStep(1);
      setDirection(1);
    }, 300);
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pre-test-modal-title"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/65 backdrop-blur-sm"
      onClick={handleClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" as const }}
        className="relative w-full md:max-w-lg flex flex-col max-h-[92dvh] md:max-h-[90vh] overflow-hidden rounded-t-2xl md:rounded-2xl shadow-2xl"
        style={{ overscrollBehavior: "contain" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Grab handle (mobile bottom-sheet affordance) */}
        <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 z-10 h-1.5 w-10 rounded-full bg-white/30" />

        {/* Dark gradient header */}
        <div
          className="relative shrink-0 px-6 pt-7 pb-8 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ touchAction: "manipulation" }}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Step badge */}
          <span className="inline-flex items-center gap-1.5 bg-[#F99621] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            Step {step} of 2
          </span>

          {/* Title */}
          <h2
            id="pre-test-modal-title"
            className="text-white text-2xl font-bold leading-snug"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {step === 1 ? (
              <>
                <span className="mr-2">⚠️</span>Important Notice
                <br />
                <span className="text-[#F99621]">Before You Begin</span>
              </>
            ) : (
              <>
                Savewyze
                <br />
                <span className="text-[#F99621]">Setup Guide</span>
              </>
            )}
          </h2>

          <p className="text-white/60 text-sm mt-2">
            {step === 1
              ? "Please read carefully before starting your test"
              : "Complete these steps before starting your test"}
          </p>

          {/* Step progress indicator */}
          <div className="flex items-center gap-2 mt-5">
            <div className="h-1.5 rounded-full bg-[#F99621] transition-all duration-300" style={{ width: step === 1 ? "50%" : "100%" }} />
            <div className="h-1.5 rounded-full bg-white/20 flex-1" />
          </div>
        </div>

        {/* Body */}
        <div
          className="bg-white flex-1 overflow-y-auto overflow-x-hidden"
          style={{ minHeight: 220, overscrollBehavior: "contain" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeInOut" as const }}
                className="px-6 pt-5 pb-6 space-y-4"
              >
                <ul className="space-y-4">
                  {/* Item 1 */}
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-base" aria-hidden="true">
                      ⏱
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      This test takes approximately <strong>90 minutes</strong>. Ensure you are in a comfortable environment with a stable internet connection.{" "}
                      <span className="text-red-600 font-medium">Refreshing the page will automatically submit your test.</span>
                    </p>
                  </li>

                  {/* Item 2 */}
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-base" aria-hidden="true">
                      💻
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      You are <strong>strongly advised</strong> to take this test on a laptop for the best experience.{" "}
                      <span className="text-amber-700 font-medium">Mobile devices are not recommended.</span>
                    </p>
                  </li>

                  {/* Item 3 */}
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-base" aria-hidden="true">
                      🏷️
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Earn a <strong>5-point bonus</strong> when you have a WyzeTag. If you don&apos;t have one, please download the{" "}
                      <strong>Savewyze app</strong> and register before starting your test.
                    </p>
                  </li>
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: "easeInOut" as const }}
                className="px-6 pt-5 pb-6 space-y-4"
              >
                {/* Download Savewyze */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-sm font-semibold text-gray-800 mb-2.5">
                    Don&apos;t have the app yet? Download Savewyze:
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {(mobileOS === "ios" || mobileOS === "other") && (
                      <a
                        href={SAVEWYZE_APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Download Savewyze on the App Store"
                        className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2 transition-opacity hover:opacity-85"
                        style={{ touchAction: "manipulation" }}
                      >
                        <AppStoreBadge />
                      </a>
                    )}
                    {(mobileOS === "android" || mobileOS === "other") && (
                      <a
                        href={SAVEWYZE_PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Get Savewyze on Google Play"
                        className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2 transition-opacity hover:opacity-85"
                        style={{ touchAction: "manipulation" }}
                      >
                        <GooglePlayBadge />
                      </a>
                    )}
                  </div>
                  {mobileOS === "other" && (
                    <p className="text-xs text-gray-500 mt-2">
                      Savewyze is a mobile app — open one of these links on your phone to install.
                    </p>
                  )}
                </div>

                {/* Blue info banner */}
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-3">
                  <p className="text-sm font-semibold text-blue-800">
                    To have a seamless onboarding on Savewyze, kindly follow the instructions below:
                  </p>
                </div>

                {/* 3 steps */}
                <div className="space-y-3">
                  {savewyzeSteps.map(({ num, text }) => (
                    <div key={num} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F99621] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {num}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">{text}</p>
                    </div>
                  ))}
                </div>

                {/* Yellow help box */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-3 space-y-1.5">
                  <p className="text-sm font-semibold text-gray-800">Need help?</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>
                      • For <strong>Savewyze onboarding issues</strong>, contact{" "}
                      <a href="mailto:info@savewyze.com" className="text-[#F99621] hover:underline font-semibold">
                        info@savewyze.com
                      </a>
                    </li>
                    <li>
                      • For <strong>test difficulties</strong>, contact{" "}
                      <a href="mailto:recruitment@alltalentz.com" className="text-[#F99621] hover:underline font-semibold">
                        recruitment@alltalentz.com
                      </a>{" "}
                      or{" "}
                      <a href="mailto:hr@alltalentz.com" className="text-[#F99621] hover:underline font-semibold">
                        hr@alltalentz.com
                      </a>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div
          className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col-reverse sm:flex-row gap-2.5 shrink-0"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          {step === 1 ? (
            <>
              <button
                onClick={handleClose}
                className="flex-1 sm:flex-none text-sm text-gray-500 hover:text-gray-700 transition-colors px-5 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                style={{ touchAction: "manipulation" }}
              >
                Cancel
              </button>
              <button
                onClick={goToStep2}
                className="flex-1 bg-[#F99621] hover:bg-[#e8870e] active:bg-[#d47a0a] text-white font-bold px-6 py-3 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                style={{ touchAction: "manipulation" }}
              >
                Next: Setup Guide
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={goToStep1}
                className="flex-1 sm:flex-none text-sm text-gray-500 hover:text-gray-700 transition-colors px-5 py-3 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 flex items-center justify-center gap-1.5"
                style={{ touchAction: "manipulation" }}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>
              <button
                onClick={onBeginTest}
                className="flex-1 bg-[#F99621] hover:bg-[#e8870e] active:bg-[#d47a0a] text-white font-bold px-6 py-3 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2"
                style={{ touchAction: "manipulation" }}
              >
                I Understand, Continue
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
