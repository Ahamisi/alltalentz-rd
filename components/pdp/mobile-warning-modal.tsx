"use client";

/**
 * Shown when someone starts the PDP application on a narrow screen — the form
 * and the assessment test that follows are built for a laptop. They can dismiss
 * it or push on regardless (`onContinue`).
 */
type MobileWarningModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** "Continue Anyway" — dismisses and proceeds with the application flow. */
  onContinue: () => void;
};

const MobileWarningModal = ({ isOpen, onClose, onContinue }: MobileWarningModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/65 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-sm overflow-hidden rounded-t-2xl md:rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 pt-7 pb-6"
          style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)" }}
        >
          <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mb-4 text-2xl">💻</div>
          <h2 className="text-white text-xl font-bold leading-snug">Switch to a Laptop</h2>
          <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
            For the best experience, the PDP application process and assessment test are designed for laptops and desktop
            computers.
          </p>
        </div>

        {/* Body */}
        <div className="bg-white px-6 py-5 space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800">
            <strong>Mobile devices are not recommended.</strong> The test may not function optimally on a phone screen.
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={onContinue}
              className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium py-3 rounded-xl transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-300"
              style={{ touchAction: "manipulation" }}
            >
              Continue Anyway
            </button>
            <button
              onClick={onClose}
              className="w-full bg-[#F99621] hover:bg-[#e8870e] text-white font-bold py-3 rounded-xl transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2"
              style={{ touchAction: "manipulation" }}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileWarningModal;
