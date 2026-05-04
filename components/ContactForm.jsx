"use client";
import React, { useState, useEffect } from "react";
import { useFormPersist } from "@/hooks/useFormPersist";

const INITIAL_STATE = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  message: "",
};

/**
 * ContactForm
 *
 * Standalone contact form that demonstrates useFormPersist integration.
 * Email is the first field so the partial-capture beacon can fire as soon
 * as any email is typed — even if the user abandons after one field.
 */
export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Controls the "Draft saved" opacity indicator
  const [showDraftSaved, setShowDraftSaved] = useState(false);

  // Wire up the persistence hook — key "contact" gives localStorage key "partial_form__contact"
  const { clearPersisted, onEmailBlur } = useFormPersist("contact", formData, setFormData);

  // Flash the "Draft saved" indicator briefly after each change, but only once
  // email has been entered (since that's when we start sending beacons).
  useEffect(() => {
    if (!formData.email) return;
    setShowDraftSaved(true);
    const t = setTimeout(() => setShowDraftSaved(false), 1500);
    return () => clearTimeout(t);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return;

    try {
      setIsSubmitting(true);
      await fetch("/api/capture-partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Remove the localStorage draft so the beacon doesn't fire stale data
      // if the user navigates away after a successful submission.
      clearPersisted();
      setIsSubmitted(true);
    } catch (err) {
      console.error("ContactForm submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] " +
    "hover:border-gray-300 bg-white transition-colors";

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-sm border border-gray-100 p-10 text-center">
        <p className="text-xl font-bold text-gray-900 mb-2">Thank you!</p>
        <p className="text-gray-500 text-sm">{"We'll be in touch within 24 business hours."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-8 pt-8 pb-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">{"Let's connect."}</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Fill in the details below. Our team will respond within 24 business hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
        {/* Email first — captured as early as possible so the beacon is useful */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Email <span className="text-[#F99621]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={onEmailBlur}
            placeholder="you@company.com"
            required
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Jane"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Smith"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you need..."
            rows={4}
            className={inputClass + " resize-none"}
          />
        </div>

        <p className="text-xs text-gray-400">
          By entering your details, you agree that we may save your progress and contact you about your enquiry.
        </p>

        {/* Bottom row: "Draft saved" indicator on the left, submit button on the right */}
        <div className="flex items-center justify-between pt-1">
          <p
            className={`text-xs text-gray-400 transition-opacity duration-500 ${
              showDraftSaved ? "opacity-100" : "opacity-0"
            }`}
          >
            Draft saved
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#F99621] text-black font-semibold px-8 py-3 hover:bg-[#e8881a] transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
