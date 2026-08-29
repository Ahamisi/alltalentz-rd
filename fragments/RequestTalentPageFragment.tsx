"use client";
import PageHeader from "@/components/PageHeader";
import MainFooter from "@/components/MainFooter";
import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { Loader2 } from "lucide-react";
import { useFormPersist } from "@/hooks/useFormPersist";
import {
  trackFormStart,
  trackFormValidationError,
  trackLeadSubmitted,
  trackFormSubmitError,
  trackOutboundClick,
  trackContactClick,
} from "@/utils/analytics";

const FORM_NAME = "request_talent";
const CTA_LOCATION = "request_talent_hero";

const INDUSTRIES = [
  "Healthcare",
  "Technology",
  "Finance",
  "Construction",
  "Legal",
  "Pest Control",
  "Other",
];

const CALENDLY_LINK = "https://calendly.com/mnwoseh";
const PHONE_LINK = "tel:+16145021440";

// The widget is skipped locally since the site key is tied to the live domain
const RECAPTCHA_REQUIRED = process.env.NODE_ENV === "production";

const TIMELINES = ["ASAP", "Within 30 days", "Within 90 days", "Planning ahead"];

const WHAT_HAPPENS_NEXT = [
  {
    step: "01",
    title: "We Review Your Request",
    body: "Our team reviews your submission and reaches out to confirm your requirements and timeline.",
  },
  {
    step: "02",
    title: "We Match Your Role",
    body: "We identify the right professional from our pre-vetted talent pool — trained for your industry, matched to your specific role.",
  },
  {
    step: "03",
    title: "You Meet Your Match",
    body: "We introduce your matched professional, walk through the onboarding plan, and lock in your start date.",
  },
  {
    step: "04",
    title: "You're Live Within 7 Days",
    body: "Your new team member is integrated, operational, and delivering from their first week.",
  },
];

interface FormData {
  [key: string]: unknown;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industry: string;
  otherIndustry: string;
  roles: string;
  timeline: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  industry?: string;
  otherIndustry?: string;
  roles?: string;
  timeline?: string;
  recaptcha?: string | null;
}

// Field wrapper with a label, optional hint and inline error
function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-[#F99621] ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 -mt-1">{hint}</p>}
      {children}
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

export default function RequestTalent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    industry: "",
    otherIndustry: "",
    roles: "",
    timeline: "",
  });

  const { clearPersisted, onEmailBlur } = useFormPersist("request-talent", formData);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!startedRef.current) {
      startedRef.current = true;
      trackFormStart(FORM_NAME);
    }
    if (name === "industry") {
      // Reset the "Other" text when the industry changes
      setFormData((prev) => ({ ...prev, industry: value, otherIndustry: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (formData.industry === "Other" && !formData.otherIndustry.trim())
      newErrors.otherIndustry = "Please tell us your industry";
    if (!formData.roles.trim()) newErrors.roles = "Please tell us the role(s) you need";
    if (!formData.timeline) newErrors.timeline = "Timeline is required";
    if (RECAPTCHA_REQUIRED && !recaptchaToken)
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    setErrors(newErrors);
    return newErrors;
  };

  const buildPayload = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const industryLabel =
      formData.industry === "Other" ? formData.otherIndustry || "Other" : formData.industry;

    return {
      fullName,
      email: formData.email,
      company: "",
      phone: formData.phone,
      industry: industryLabel,
      roles: formData.roles.trim() ? [formData.roles.trim()] : [],
      numberOfProfessionals: "",
      timeline: formData.timeline,
      additionalRequirements: "",
      recaptchaToken,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      trackFormValidationError(FORM_NAME, Object.keys(validationErrors));
      return;
    }

    const payload = buildPayload();

    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        trackLeadSubmitted(FORM_NAME, {
          industry: payload.industry,
          timeline: payload.timeline,
        });
      } else {
        console.error("Failed to submit talent request:", res.status);
        trackFormSubmitError(FORM_NAME, `http_${res.status}`);
      }

      clearPersisted();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit talent request:", error);
      trackFormSubmitError(FORM_NAME, "network_error");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
    }`;

  return (
    <>
      {/* Script id must be unique per page or Next.js dedupes it away */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
      <Script id="recaptcha-callbacks-request-talent" strategy="lazyOnload">
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

      <section>
        <PageHeader>
          <div className="max-w-7xl w-full mx-auto py-12 lg:flex lg:gap-12 relative h-fit mt-0 items-center px-2 lg:px-[20px] md:px-4">
            {/* Left column */}
            <div className="lg:w-1/2 pr-0 lg:pr-6">
              <h1 className="text-3xl md:text-[60px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white">
                Request <span className="text-secondary">Talent</span>.
              </h1>
              <p className="text-lg md:text-[20px] text-[#FEF5E9]">
                {
                  "Tell us what you need. We'll match, vet, and assign the right talent — in under 48 hours."
                }
              </p>
              <div className="mt-10 flex flex-col lg:flex-row gap-4">
                <a
                  href={CALENDLY_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackOutboundClick("book_a_meeting", CTA_LOCATION, CALENDLY_LINK, true)
                  }
                  className="bg-[#F99621] hover:bg-white text-[#121212] font-medium px-8 py-4 text-center transition duration-300"
                >
                  Book a Meeting
                </a>
                <a
                  href={PHONE_LINK}
                  onClick={() =>
                    trackContactClick("talk_to_our_team", CTA_LOCATION, "phone", PHONE_LINK)
                  }
                  className="border border-[#F99621] hover:bg-[#F99621] text-[#F99621] hover:text-[#121212] font-medium px-8 py-4 text-center transition duration-300"
                >
                  Talk to Our Team
                </a>
              </div>
            </div>

            {/* Right column - form */}
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="bg-white shadow-lg border border-gray-100 overflow-hidden">
                {isSubmitted ? (
                  <div className="px-8 py-16 text-center">
                    <p className="text-xl font-bold text-gray-900 mb-2">Thank you!</p>
                    <p className="text-gray-500 text-sm">
                      A member of our team will be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="px-6 md:px-8 py-8 space-y-5">
                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="First Name" required error={errors.firstName}>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInput}
                          placeholder="Jane"
                          className={inputClass("firstName")}
                        />
                      </Field>
                      <Field label="Last Name" required error={errors.lastName}>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInput}
                          placeholder="Smith"
                          className={inputClass("lastName")}
                        />
                      </Field>
                    </div>

                    <Field label="Email Address" required error={errors.email}>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        onBlur={onEmailBlur}
                        placeholder="you@company.com"
                        className={inputClass("email")}
                      />
                    </Field>

                    <Field label="Phone Number" required error={errors.phone}>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInput}
                        placeholder="+1 (555) 000-0000"
                        className={inputClass("phone")}
                      />
                    </Field>

                    <Field label="Industry" required error={errors.industry}>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInput}
                        className={
                          inputClass("industry") + " appearance-none bg-white cursor-pointer"
                        }
                      >
                        <option value="" disabled>
                          Select industry
                        </option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </Field>

                    {/* Shown when industry is "Other" */}
                    {formData.industry === "Other" && (
                      <Field label="Tell us your industry" required error={errors.otherIndustry}>
                        <input
                          type="text"
                          name="otherIndustry"
                          value={formData.otherIndustry}
                          onChange={handleInput}
                          placeholder="e.g. Real Estate"
                          className={inputClass("otherIndustry")}
                        />
                      </Field>
                    )}

                    {/* Shown once an industry is picked */}
                    {formData.industry && (
                      <Field label="Role(s) Needed" required error={errors.roles}>
                        <input
                          type="text"
                          name="roles"
                          value={formData.roles}
                          onChange={handleInput}
                          placeholder="e.g. Medical Billing Specialist, AR/AP Analyst, Estimator"
                          className={inputClass("roles")}
                        />
                      </Field>
                    )}

                    <Field
                      label="Timeline"
                      required
                      hint="How soon do you need this talent?"
                      error={errors.timeline}
                    >
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInput}
                        className={
                          inputClass("timeline") + " appearance-none bg-white cursor-pointer"
                        }
                      >
                        <option value="" disabled>
                          Select timeline
                        </option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>

                    {/* Same site key as ContactForm.tsx */}
                    {RECAPTCHA_REQUIRED ? (
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="g-recaptcha"
                          data-sitekey="6LcsqxIsAAAAAJqcWPOgXKPKDjB1hNVpb_sNEacQ"
                          data-callback="onRecaptchaSuccess"
                          data-expired-callback="onRecaptchaExpired"
                        />
                        {errors.recaptcha && (
                          <p className="text-red-500 text-xs">{errors.recaptcha}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 text-center">
                        reCAPTCHA disabled in development
                      </p>
                    )}

                    <p className="text-xs text-gray-400">
                      By entering your details, you agree that we may save your progress and contact
                      you about your enquiry.
                    </p>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#F99621] text-black font-bold py-3 px-8 hover:bg-[#e8881a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isLoading ? "Submitting…" : "Submit Request"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </PageHeader>

        {/* Marquee bar */}
        <div className="bg-[#F99621] py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                {[
                  "ISO 27001 Certified",
                  "SOC-2 Type 2 Certified",
                  "7-Day Deployment",
                  "24/7 Operational Support",
                ].map((item) => (
                  <span key={item} className="flex items-center mx-8 text-white font-bold text-xl">
                    <span className="mr-3">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="bg-[#F8F8F8] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#F99621] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              After you submit
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Happens Next</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_HAPPENS_NEXT.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 p-8 flex flex-col gap-5 hover:border-[#F99621]/40 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-6xl font-black text-gray-100 group-hover:text-[#FEF3E2] transition-colors leading-none select-none">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </>
  );
}
