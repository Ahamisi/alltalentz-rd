"use client";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { FileField, TextField } from "@/components/pdp/form-controls";

/**
 * PDP application modal — owns the whole application form: field state,
 * validation, the POST to `/api/bootcamp`, and the three terminal states
 * (submitted, duplicate, applications-closed).
 *
 * The page fragment stays in charge of *when* the modal opens and of what
 * happens after a successful submission (`onSubmitted` → test portal), so the
 * routing/session concerns live with the page, not the form.
 */
type PdpApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** When true the form is replaced by the "applications closed" notice. */
  applicationsClosed?: boolean;
  /** Fired ~2s after a successful submit, once the success state has been seen. */
  onSubmitted?: () => void;
};

const PdpApplicationModal = ({ isOpen, onClose, applicationsClosed = false, onSubmitted }: PdpApplicationModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    yoe: "",
    career: "",
    phone: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [nyscFile, setNyscFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /** Populates `errors`; returns true when the form is good to send. */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.yoe) newErrors.yoe = "Experience field is required";
    if (!formData.career) newErrors.career = "Career field is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!cvFile) newErrors.cv = "CV upload is required";
    if (!nyscFile) newErrors.nysc = "NYSC upload is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
      if (cvFile) payload.set("cv", cvFile);
      if (nyscFile) payload.set("nysc", nyscFile);

      // Duplicate check runs on the server (see /api/bootcamp), which reports
      // it back as { duplicate: true }.
      const res = await fetch("/api/bootcamp", { method: "POST", body: payload });
      const result = await res.json().catch(() => ({}));

      if (result?.duplicate) {
        setIsDuplicate(true);
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      setIsLoading(false);

      // Let the success state land before handing off to the test portal.
      setTimeout(() => onSubmitted?.(), 2000);
    } catch (error) {
      console.error("Failed to submit PDP application:", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Service Request Form"
      className="modal p-0! rounded-none! shadow-2xl w-[95%] md:w-[580px] overflow-y-auto max-h-[92vh]"
      overlayClassName="overlay"
    >
      {applicationsClosed ? (
        /* ── Application closed ── */
        <div className="p-10 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">😔</div>
          <h1 className="text-xl font-bold text-gray-900">Applications Closed</h1>
          <p className="text-gray-500 text-sm max-w-xs">
            The professional development programme application period is over. Please be on the lookout for the next cycle.
          </p>
          <button onClick={onClose} className="mt-2 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
            Close
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* ── Modal header ── */}
          <div
            className="relative px-6 pt-7 pb-7 shrink-0"
            style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image src="/logo.svg" alt="All Talentz" width={100} height={36} className="h-8 w-auto mb-4 brightness-0 invert" />
            <h2 className="text-white text-xl font-bold leading-snug">PDP Application</h2>
            <p className="text-white/55 text-sm mt-1">
              Fill in your details to apply for the Professional Development Programme.
            </p>
          </div>

          {/* ── Body ── */}
          <div className="bg-white flex-1 overflow-y-auto">
            {isSubmitted ? (
              /* ── Success state ── */
              <div className="px-6 py-12 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Application Received!</h3>
                <p className="text-gray-500 text-sm">Preparing your test portal, please wait a moment...</p>
                <div className="mt-2">
                  <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#F99621] mx-auto"></div>
                </div>
              </div>
            ) : isDuplicate ? (
              /* ── Duplicate state ── */
              <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-2xl">
                  ⚠️
                </div>
                <h3 className="text-base font-bold text-gray-900">Application Already Submitted</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  We have already received your application. Please contact support for further assistance.
                </p>
                <button onClick={onClose} className="mt-2 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2">
                  Close
                </button>
              </div>
            ) : (
              /* ── Application form ── */
              <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="px-6 py-6 space-y-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Personal Information</p>
                  <div className="space-y-4">
                    <TextField
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      error={errors.fullName}
                      placeholder="e.g. Adaeze Okonkwo"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="you@example.com"
                      />
                      <TextField
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="+234 800 000 0000"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField
                        label="Years of Experience"
                        name="yoe"
                        type="number"
                        min="0"
                        value={formData.yoe}
                        onChange={handleInputChange}
                        error={errors.yoe}
                        placeholder="e.g. 2"
                      />
                      <TextField
                        label="Career Field"
                        name="career"
                        value={formData.career}
                        onChange={handleInputChange}
                        error={errors.career}
                        placeholder="e.g. Software Engineering"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Documents</p>
                  <div className="space-y-4">
                    <FileField
                      label="CV / Résumé"
                      name="cv"
                      file={cvFile}
                      onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
                      error={errors.cv}
                      prompt="Click to upload your CV"
                    />
                    <FileField
                      label="NYSC Certificate"
                      name="nysc"
                      file={nyscFile}
                      onChange={(event) => setNyscFile(event.target.files?.[0] ?? null)}
                      error={errors.nysc}
                      prompt="Click to upload your NYSC certificate"
                    />
                  </div>
                </div>

                {/* Notice */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-amber-500 shrink-0 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Once you submit, you&apos;ll be redirected to take a compulsory assessment test as the final stage of your
                    application.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#F99621] hover:bg-[#e8870e] active:bg-[#d47a0a] text-white font-bold py-4 text-sm tracking-wide transition-colors disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F99621] focus-visible:ring-offset-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.018 7.97l2.018-2.68z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PdpApplicationModal;
