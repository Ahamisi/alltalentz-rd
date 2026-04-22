"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onBeginTest: () => void;
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
        className="relative w-full md:max-w-lg overflow-hidden rounded-t-2xl md:rounded-none shadow-2xl"
        style={{ overscrollBehavior: "contain" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dark gradient header */}
        <div
          className="relative px-6 pt-7 pb-8 overflow-hidden"
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
        <div className="bg-white overflow-hidden" style={{ minHeight: 280 }}>
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
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col-reverse sm:flex-row gap-2.5">
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
