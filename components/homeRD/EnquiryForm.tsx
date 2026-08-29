"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import { Loader2 } from "lucide-react";
import { useFormPersist } from "@/hooks/useFormPersist";
import {
  trackFormStart,
  trackFormValidationError,
  trackLeadSubmitted,
  trackFormSubmitError,
} from "@/utils/analytics";

// The widget is skipped locally since the site key is tied to the live domain
const RECAPTCHA_REQUIRED = process.env.NODE_ENV === "production";

const FORM_NAME = "contact_us_enquiry";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  recaptcha?: string | null;
}

const EnquiryForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const { clearPersisted, onEmailBlur } = useFormPersist("contact-us", formData);

  const startedRef = useRef(false);

  useEffect(() => {
    const handleRecaptchaSuccess = (event: Event) => {
      setRecaptchaToken((event as CustomEvent<string>).detail);
      setErrors((prev) => ({ ...prev, recaptcha: null }));
    };
    const handleRecaptchaExpired = () => setRecaptchaToken(null);

    window.addEventListener("recaptchaSuccess", handleRecaptchaSuccess);
    window.addEventListener("recaptchaExpired", handleRecaptchaExpired);
    return () => {
      window.removeEventListener("recaptchaSuccess", handleRecaptchaSuccess);
      window.removeEventListener("recaptchaExpired", handleRecaptchaExpired);
    };
  }, []);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!startedRef.current) {
      startedRef.current = true;
      trackFormStart(FORM_NAME);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Please tell us how we can help";
    if (RECAPTCHA_REQUIRED && !recaptchaToken)
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      trackFormValidationError(FORM_NAME, Object.keys(validationErrors));
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      if (res.ok) {
        trackLeadSubmitted(FORM_NAME);
      } else {
        console.error("Failed to send enquiry:", res.status);
        trackFormSubmitError(FORM_NAME, `http_${res.status}`);
      }

      clearPersisted();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send enquiry:", error);
      trackFormSubmitError(FORM_NAME, "network_error");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 text-black rounded-lg border focus:outline-none transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-300 focus:border-[#F99621]"
    }`;

  return (
    <div>
      {/* Script id must be unique per page or Next.js dedupes it away */}
      <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />
      <Script id="recaptcha-callbacks-enquiry-form" strategy="lazyOnload">
        {`
          window.onRecaptchaSuccess = function(token) {
            window.recaptchaToken = token;
            window.dispatchEvent(new CustomEvent('recaptchaSuccess', { detail: token }));
          };
          window.onRecaptchaExpired = function() {
            window.recaptchaToken = null;
            window.dispatchEvent(new CustomEvent('recaptchaExpired'));
          };
        `}
      </Script>

      <h2 className="text-4xl font-bold text-gray-800 mb-2 text-center">Send us a note</h2>
      <p className="text-gray-600 mb-8 text-center">
        Tell us a little about what you need — we&apos;ll take it from there.
      </p>

      {isSubmitted ? (
        <div className="p-4 rounded-lg bg-[#FDDEBA] text-center mt-6 w-full m-0">
          <div className="flex items-center justify-center">
            <Image src="/star-shine.svg" alt="Alltalentz Shine" width={80} height={80} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-black">Thanks for reaching out!</h3>
          <p className="text-gray-600">Our team will respond within 24 business hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Your name*"
              value={formData.fullName}
              onChange={handleInput}
              className={inputClass("fullName")}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleInput}
              onBlur={onEmailBlur}
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number*"
              value={formData.phone}
              onChange={handleInput}
              className={inputClass("phone")}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell us what you need or what you'd like to know.*"
              value={formData.message}
              onChange={handleInput}
              className={inputClass("message") + " resize-y"}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {RECAPTCHA_REQUIRED ? (
            <div className="flex flex-col items-center gap-2">
              <div
                className="g-recaptcha"
                data-sitekey="6LcsqxIsAAAAAJqcWPOgXKPKDjB1hNVpb_sNEacQ"
                data-callback="onRecaptchaSuccess"
                data-expired-callback="onRecaptchaExpired"
              />
              {errors.recaptcha && <p className="text-red-500 text-xs">{errors.recaptcha}</p>}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center">reCAPTCHA disabled in development</p>
          )}

          <p className="text-xs text-gray-400">
            By entering your details, you agree that we may save your progress and contact you about
            your enquiry.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#F99621] text-black font-semibold py-4 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Sending…" : "Send Message →"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EnquiryForm;
