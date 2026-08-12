"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Btn from "@/components/Btn";
import Reveal from "@/components/shared/Reveal";
import { useFormPersist } from "@/hooks/useFormPersist";

/**
 * Contact Us form section (v26).
 *
 * Underline fields on a 740px centred column: two equal columns with a 50px
 * gutter, the Message textarea spanning the full height of the right column
 * alongside the single-line fields on the left, then a full-width "Send to us"
 * button and the response-time note. Closes with a wide map of the head office.
 *
 * Plumbing is unchanged from components/homeRD/ContactForm.tsx — same
 * /api/contact endpoint, same field set, same reCAPTCHA v2 checkbox flow, same
 * partial-form beacon via useFormPersist("contact-us").
 */

/** Head office, as listed in the footer — what the embedded map is centred on. */
const HEAD_OFFICE = "2020 Brice Road, Suite 180, Reynoldsburg, OH 43068";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(HEAD_OFFICE)}&z=15&output=embed`;

/**
 * Underline-field chrome: grey label above the rule, turning black + semibold
 * while the control has focus. focus-within on the wrapper (rather than a peer
 * selector) keeps the label first in the DOM, where it belongs.
 */
const FIELD_WRAP = "group flex flex-col";
const FIELD_LABEL =
  "mb-[6px] text-[15px] leading-[24px] text-[#767676] transition-colors group-focus-within:font-semibold group-focus-within:text-[#121212]";
const FIELD_CONTROL =
  "w-full border-b border-[#121212] bg-transparent pb-[6px] text-[16px] leading-[24px] text-[#121212] outline-hidden placeholder:text-[#B5B5B5]";

const ContactFormSection = ({ services = [] }: { services?: string[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const { clearPersisted, onEmailBlur } = useFormPersist("contact-us", formData);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.service) newErrors.service = "Service is required";
    if (!recaptchaToken) newErrors.recaptcha = "Please complete the reCAPTCHA verification";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      // Field names the /api/contact route (and its email template) expects.
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: formData.service,
          industry: "",
          // the route reports the selection under "Roles" in the email + sheet
          roles: formData.service ? [formData.service.trim()] : [],
          numberOfProfessionals: "",
          timeline: "",
          additionalRequirements: formData.message,
          recaptchaToken,
        }),
      });

      clearPersisted();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send email:", error);
      setErrors({ submit: "Something went wrong. Please try again or email us directly." });
    } finally {
      setIsLoading(false);
    }
  };

  // reCAPTCHA v2 talks to us through window callbacks -> custom events.
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

  const fieldError = (key: string) =>
    errors[key] ? (
      <p className="order-3 mt-[6px] text-[13px] leading-[18px] text-red-500">{errors[key]}</p>
    ) : null;

  return (
    <section className="relative bg-white pb-[80px] md:pb-[120px]">
      {/* reCAPTCHA */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        onLoad={() => setRecaptchaLoaded(true)}
        strategy="lazyOnload"
      />
      <Script id="recaptcha-callbacks-contact-v26" strategy="lazyOnload">
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

      <div className="px-[24px] md:px-[40px]">
        <div className="mx-auto w-full max-w-[740px]">
          {isSubmitted ? (
            <Reveal className="bg-[#FDDEBA] px-[24px] py-[48px] text-center">
              <div className="flex items-center justify-center">
                <Image src="/star-shine.svg" alt="" width={80} height={80} />
              </div>
              <h3 className="mb-[8px] text-[24px] font-semibold text-[#121212]">Thank you!</h3>
              <p className="text-[16px] text-[#4F4F4F]">
                A member of our team responds within 24 business hours.
              </p>
              <Btn
                link="https://calendly.com/mnwoseh"
                target="_blank"
                text="Meet With Us"
                otherCSS="mt-6"
              />
            </Reveal>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Two columns of short fields, then the two wide ones full
                  width — no half-empty cells, no stretched textarea.
                  The reveal stops at the field grid on purpose: reCAPTCHA's
                  challenge overlay is position:fixed, and a transformed
                  ancestor would anchor it to this box instead of the viewport. */}
              <Reveal className="grid grid-cols-1 gap-x-[50px] gap-y-[36px] md:grid-cols-2">
                <div className={FIELD_WRAP}>
                  <label htmlFor="contact-name" className={FIELD_LABEL}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    aria-invalid={!!errors.fullName}
                    className={FIELD_CONTROL}
                  />
                  {fieldError("fullName")}
                </div>

                <div className={FIELD_WRAP}>
                  <label htmlFor="contact-email" className={FIELD_LABEL}>
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={onEmailBlur}
                    placeholder="jane@company.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={FIELD_CONTROL}
                  />
                  {fieldError("email")}
                </div>

                <div className={FIELD_WRAP}>
                  <label htmlFor="contact-phone" className={FIELD_LABEL}>
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 614 502 1440"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    className={FIELD_CONTROL}
                  />
                  {fieldError("phone")}
                </div>

                <div className={FIELD_WRAP}>
                  <label htmlFor="contact-company" className={FIELD_LABEL}>
                    Company
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company name"
                    autoComplete="organization"
                    aria-invalid={!!errors.company}
                    className={FIELD_CONTROL}
                  />
                  {fieldError("company")}
                </div>

                {/* Talents needed — full width */}
                <div className={`${FIELD_WRAP} relative md:col-span-2`}>
                  <label htmlFor="contact-service" className={FIELD_LABEL}>
                    Talents needed
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.service}
                    className={`${FIELD_CONTROL} cursor-pointer appearance-none pr-6 ${
                      formData.service ? "" : "text-[#B5B5B5]"
                    }`}
                  >
                    <option value="" disabled>
                      Select the talents you need
                    </option>
                    {services.map((service) => (
                      <option key={service} value={service} className="text-[#121212]">
                        {service}
                      </option>
                    ))}
                  </select>
                  {/* chevron sits on the rule, outside the flow */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute right-0 bottom-2.5 h-4 w-4 fill-[#767676]"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                  {fieldError("service")}
                </div>

                {/* Message — full width, the only multi-line field */}
                <div className={`${FIELD_WRAP} md:col-span-2`}>
                  <label htmlFor="contact-message" className={FIELD_LABEL}>
                    Message (Optional)
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Tell us a little about what you need"
                    className={`${FIELD_CONTROL} h-[86px] resize-none`}
                  />
                </div>
              </Reveal>

              <div className="mt-[42px] flex flex-col items-center">
                {recaptchaLoaded && (
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LcsqxIsAAAAAJqcWPOgXKPKDjB1hNVpb_sNEacQ"
                    data-callback="onRecaptchaSuccess"
                    data-expired-callback="onRecaptchaExpired"
                  />
                )}
                {errors.recaptcha && (
                  <p className="mt-[8px] text-[13px] text-red-500">{errors.recaptcha}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-[42px] flex h-[63px] w-full items-center justify-center bg-[#E8952F] text-[16px] leading-[24px] font-medium text-white transition-colors hover:bg-[#d98523] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-label="Sending"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.018 7.97l2.018-2.68z"
                    />
                  </svg>
                ) : (
                  "Send to us"
                )}
              </button>

              {errors.submit && (
                <p className="mt-[12px] text-center text-[13px] text-red-500">{errors.submit}</p>
              )}

              <p className="mt-[16px] text-center text-[13px] leading-[20px] text-[#909090]">
                By entering your details and submitting this form, you agree that we may store your
                information and contact you about your enquiry by email or phone. See our{" "}
                <Link
                  href="/privacy-policy"
                  className="underline underline-offset-2 hover:text-[#121212]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          )}

          <p className="mt-[120px] text-center text-[28px] leading-[44px] font-normal text-[#A3A3A3] md:text-[34px] md:leading-[52px]">
            A member of our team responds within
            <br className="hidden md:block" /> 24 business hours.
          </p>
        </div>
      </div>

      {/* Head office map */}
      <div className="mt-[110px] mx-auto lg:max-w-7xl">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1264 / 530" }}>
          <iframe
            src={MAP_SRC}
            title={`Map of the All Talentz head office at ${HEAD_OFFICE}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
