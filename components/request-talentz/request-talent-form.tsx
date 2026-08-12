"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Loader2, ChevronDown } from "lucide-react";
import { useFormPersist } from "@/hooks/useFormPersist";
import { INDUSTRIES, INDUSTRY_ROLES, TIMELINES } from "@/lib/request-talent-data";
import Field from "./field";
import RolesDropdown from "./roles-dropdown";
import Reveal from "@/components/shared/Reveal";

interface FormData {
  [key: string]: unknown;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  otherIndustry: string;
  roles: string[];
  otherRole: string;
  numberOfProfessionals: string;
  timeline: string;
  additionalRequirements: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  roles?: string;
  numberOfProfessionals?: string;
  timeline?: string;
  recaptcha?: string | null;
}

export default function RequestTalentForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    otherIndustry: "",
    roles: [],
    otherRole: "",
    numberOfProfessionals: "",
    timeline: "",
    additionalRequirements: "",
  });

  const { clearPersisted, onEmailBlur } = useFormPersist("request-talent", formData);

  // ── reCAPTCHA listeners ───────────────────────────────────────────────────
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

  // ── Form handlers ─────────────────────────────────────────────────────────

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "industry") {
      // Reset role selection when the industry changes
      setFormData((prev) => ({ ...prev, industry: value, roles: [], otherRole: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRolesChange = (roles: string[]) => {
    setFormData((prev) => ({
      ...prev,
      roles,
      // Clear the custom-role text if "Other" is deselected
      otherRole: roles.includes("Other") ? prev.otherRole : "",
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.email.trim()) newErrors.email = "Business email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (formData.industry !== "Other" && formData.roles.length === 0)
      newErrors.roles = "Please select at least one role";
    if (formData.industry === "Other" && !formData.otherRole.trim())
      newErrors.roles = "Please describe the role(s) you need";
    if (!formData.numberOfProfessionals.trim())
      newErrors.numberOfProfessionals = "Number of professionals is required";
    if (!formData.timeline) newErrors.timeline = "Timeline is required";
    if (!recaptchaToken) newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const industryLabel =
      formData.industry === "Other" ? formData.otherIndustry || "Other" : formData.industry;
    const rolesList =
      formData.industry === "Other"
        ? formData.otherRole
          ? [formData.otherRole]
          : []
        : formData.roles.map((r) => (r === "Other" ? formData.otherRole || "Other" : r));

    return {
      fullName,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      industry: industryLabel,
      roles: rolesList,
      numberOfProfessionals: formData.numberOfProfessionals,
      timeline: formData.timeline,
      additionalRequirements: formData.additionalRequirements,
      recaptchaToken,
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      clearPersisted();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full rounded-[10px] border px-4 py-3.5 text-[15px] text-[#121212] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#F99621] transition-colors ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-transparent bg-[#F2F2F2] hover:bg-[#ECECEC]"
    }`;

  const availableRoles =
    formData.industry && formData.industry !== "Other"
      ? (INDUSTRY_ROLES[formData.industry] ?? [])
      : [];

  return (
    <>
      {/* reCAPTCHA — id is unique to this page to prevent Next.js Script deduplication
          from silently dropping this block when ContactForm is also mounted */}
      <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />
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

      <section className="bg-white px-6 md:px-10 py-20 md:py-25">
        <div className="mx-auto max-w-[713px]">
          {/* Heading sits above the form, centred */}
          <Reveal
            as="h2"
            className="text-center text-[32px] leading-[1.15] tracking-[-3%] font-bold text-[#121212] md:text-[48px] lg:text-[56px]"
          >
            {"Let's find your Talentz"}
          </Reveal>

          {isSubmitted ? (
            <div className="mt-12 text-center">
              <p className="text-xl font-bold text-[#121212] mb-2">
                {"We've received your request!"}
              </p>
              <p className="text-gray-500 text-sm">
                Our team will reach out within 24 business hours.
              </p>
            </div>
          ) : (
            <>
              {/* Two columns from lg upward, all the way through */}
              <form
                onSubmit={handleSubmit}
                className="mt-12 grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-2"
              >
                <Field label="First Name" required error={errors.firstName}>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInput}
                    className={inputClass("firstName")}
                  />
                </Field>

                <Field label="Last Name" required error={errors.lastName}>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInput}
                    className={inputClass("lastName")}
                  />
                </Field>

                <Field label="Company Name" required error={errors.company}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInput}
                    className={inputClass("company")}
                  />
                </Field>

                <Field label="Business Email" required error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInput}
                    onBlur={onEmailBlur}
                    className={inputClass("email")}
                  />
                </Field>

                <Field label="Phone Number" required error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInput}
                    className={inputClass("phone")}
                  />
                </Field>

                <Field label="Industry / Vertical" required error={errors.industry}>
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInput}
                      className={inputClass("industry") + " appearance-none cursor-pointer pr-10"}
                    >
                      <option value="" disabled>Select industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </Field>

                {/* "Other" industry: free-text description */}
                {formData.industry === "Other" && (
                  <Field label="Describe your industry">
                    <input
                      type="text"
                      name="otherIndustry"
                      value={formData.otherIndustry}
                      onChange={handleInput}
                      placeholder="e.g. Real Estate"
                      className={inputClass("industry")}
                    />
                  </Field>
                )}

                {/* Roles — always occupies a cell so the two columns stay aligned */}
                <Field label="Roles you need" required error={errors.roles}>
                  {formData.industry === "Other" ? (
                    <input
                      type="text"
                      name="otherRole"
                      value={formData.otherRole}
                      onChange={handleInput}
                      placeholder="e.g. Virtual Assistant"
                      className={inputClass("roles")}
                    />
                  ) : formData.industry ? (
                    <RolesDropdown
                      roles={availableRoles}
                      selected={formData.roles}
                      onChange={handleRolesChange}
                      error={errors.roles}
                    />
                  ) : (
                    <input
                      type="text"
                      disabled
                      placeholder="Select an industry first"
                      className={inputClass("roles") + " cursor-not-allowed"}
                    />
                  )}
                </Field>

                {/* Custom role text — "Other" selected inside a known industry */}
                {formData.roles.includes("Other") && formData.industry !== "Other" && (
                  <Field label="Describe the custom role">
                    <input
                      type="text"
                      name="otherRole"
                      value={formData.otherRole}
                      onChange={handleInput}
                      placeholder="e.g. Content Writer"
                      className={inputClass("roles")}
                    />
                  </Field>
                )}

                <Field
                  label="How many professionals"
                  required
                  error={errors.numberOfProfessionals}
                >
                  <input
                    type="text"
                    name="numberOfProfessionals"
                    value={formData.numberOfProfessionals}
                    onChange={handleInput}
                    className={inputClass("numberOfProfessionals")}
                  />
                </Field>

                <Field
                  label="Timeline"
                  required
                  error={errors.timeline}
                  className="lg:col-span-2"
                >
                  <div className="relative">
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInput}
                      className={inputClass("timeline") + " appearance-none cursor-pointer pr-10"}
                    >
                      <option value="" disabled>Select timeline</option>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </Field>

                <Field label="Additional notes" className="lg:col-span-2">
                  <textarea
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleInput}
                    rows={6}
                    className={inputClass("industry") + " resize-none"}
                  />
                </Field>

                {/* Full-width footer of the form */}
                <div className="lg:col-span-2 flex flex-col items-center gap-2">
                  {/* reCAPTCHA — site key matches the one already used in ContactForm.tsx */}
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

                <p className="lg:col-span-2 text-[13px] leading-relaxed text-gray-500">
                  By entering your details, you agree that we may save your progress and contact
                  you about your enquiry.
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="lg:col-span-2 w-full bg-[#F99621] text-white py-4.5 text-[17px] font-normal hover:bg-[#e8881a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isLoading ? "Submitting…" : "Submit My Request"}
                </button>
              </form>

              <p className="mt-10 text-center text-[18px] font-semibold text-[#6B6B6B] md:text-[20px]">
                No commitment required. We&apos;ll be in touch within 24 business hours.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
