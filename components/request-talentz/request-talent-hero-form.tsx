"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { Loader2, ChevronDown } from "lucide-react";
import { useFormPersist } from "@/hooks/useFormPersist";
import { INDUSTRIES, INDUSTRY_ROLES, TIMELINES } from "@/lib/request-talent-data";
import Field from "./field";
import RolesDropdown from "./roles-dropdown";

interface FormData {
  [key: string]: unknown;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industry: string;
  otherIndustry: string;
  roles: string[];
  otherRole: string;
  timeline: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  industry?: string;
  roles?: string;
  timeline?: string;
  recaptcha?: string | null;
}

const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  industry: "",
  otherIndustry: "",
  roles: [],
  otherRole: "",
  timeline: "",
};

// The talent pages link here as ?industry=Tech&roles=a,b when a visitor picks
// role cards in <RolesWePlace />. This turns that into form state.
const prefillFromParams = (params: URLSearchParams): Partial<FormData> | null => {
  const industryParam = params.get("industry")?.trim();
  if (!industryParam) return null;

  const requested = (params.get("roles") ?? "")
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  // An industry the form does not list becomes "Other" plus free text, and its
  // roles come along as free text too, since there is no list to match against.
  const known = INDUSTRIES.includes(industryParam) && industryParam !== "Other";
  if (!known) {
    return {
      industry: "Other",
      otherIndustry: industryParam,
      otherRole: requested.join(", "),
    };
  }

  // Known industry: tick the roles it has options for, and put the rest in the
  // "Other" free-text box rather than dropping them.
  const options = INDUSTRY_ROLES[industryParam] ?? [];
  const matched = requested.filter((r) => options.includes(r));
  const unmatched = requested.filter((r) => !options.includes(r));

  return {
    industry: industryParam,
    otherIndustry: "",
    roles: unmatched.length ? [...matched, "Other"] : matched,
    otherRole: unmatched.join(", "),
  };
};

export default function RequestTalentHeroForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const { clearPersisted, onEmailBlur } = useFormPersist("request-talent-hero", formData);
  // Applied after mount rather than as initial state: the params are not known
  // during prerender, so seeding them on the client alone would mismatch.
  const searchParams = useSearchParams();
  useEffect(() => {
    const prefill = prefillFromParams(new URLSearchParams(searchParams.toString()));
    if (prefill) setFormData((prev) => ({ ...prev, ...prefill }));
  }, [searchParams]);
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
    if (name === "industry") {
      setFormData((prev) => ({ ...prev, industry: value, roles: [], otherRole: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRolesChange = (roles: string[]) => {
    setFormData((prev) => ({
      ...prev,
      roles,
      otherRole: roles.includes("Other") ? prev.otherRole : "",
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (formData.industry && formData.industry !== "Other" && formData.roles.length === 0)
      newErrors.roles = "Please select at least one role";
    if (formData.industry === "Other" && !formData.otherRole.trim())
      newErrors.roles = "Please describe the role(s) you need";
    if (!formData.timeline) newErrors.timeline = "Timeline is required";
    if (!recaptchaToken) newErrors.recaptcha = "Please complete the reCAPTCHA verification";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildPayload = () => {
    const industryLabel =
      formData.industry === "Other" ? formData.otherIndustry || "Other" : formData.industry;
    const rolesList =
      formData.industry === "Other"
        ? formData.otherRole
          ? [formData.otherRole]
          : []
        : formData.roles.map((r) => (r === "Other" ? formData.otherRole || "Other" : r));

    return {
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      company: "",
      phone: formData.phone,
      industry: industryLabel,
      roles: rolesList,
      numberOfProfessionals: "",
      timeline: formData.timeline,
      additionalRequirements: "",
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
      <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />
      <Script id="recaptcha-callbacks-request-talent-hero" strategy="lazyOnload">
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

      <div className="w-full rounded-[16px] bg-white p-6 shadow-[0_18px_50px_rgba(18,18,18,0.08)] md:p-8">
        {isSubmitted ? (
          <div className="py-16 text-center">
            <p className="mb-2 text-xl font-bold text-[#121212]">
              {"We've received your request!"}
            </p>
            <p className="text-sm text-gray-500">
              Our team will reach out within 24 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
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

            <Field label="Email Address" required error={errors.email} className="sm:col-span-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                onBlur={onEmailBlur}
                className={inputClass("email")}
              />
            </Field>

            <Field label="Phone Number" required error={errors.phone} className="sm:col-span-2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInput}
                className={inputClass("phone")}
              />
            </Field>

            <Field label="Industry" required error={errors.industry} className="sm:col-span-2">
              <div className="relative">
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInput}
                  className={inputClass("industry") + " appearance-none cursor-pointer pr-10"}
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
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </Field>

            {formData.industry === "Other" && (
              <Field label="Describe your industry" className="sm:col-span-2">
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

            {formData.industry && (
              <Field label="Role(s) Needed" required error={errors.roles} className="sm:col-span-2">
                {formData.industry === "Other" ? (
                  <input
                    type="text"
                    name="otherRole"
                    value={formData.otherRole}
                    onChange={handleInput}
                    placeholder="e.g. Virtual Assistant"
                    className={inputClass("roles")}
                  />
                ) : (
                  <RolesDropdown
                    roles={availableRoles}
                    selected={formData.roles}
                    onChange={handleRolesChange}
                    error={errors.roles}
                  />
                )}
              </Field>
            )}

            {formData.roles.includes("Other") && formData.industry !== "Other" && (
              <Field label="Describe the custom role" className="sm:col-span-2">
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
              label="Timeline"
              required
              error={errors.timeline}
              className="sm:col-span-2"
            >
              <div className="relative">
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInput}
                  className={inputClass("timeline") + " appearance-none cursor-pointer pr-10"}
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
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              </div>
            </Field>

            <div className="flex flex-col gap-2 sm:col-span-2">
              <div
                className="g-recaptcha"
                data-sitekey="6LcsqxIsAAAAAJqcWPOgXKPKDjB1hNVpb_sNEacQ"
                data-callback="onRecaptchaSuccess"
                data-expired-callback="onRecaptchaExpired"
              />
              {errors.recaptcha && <p className="text-xs text-red-500">{errors.recaptcha}</p>}
            </div>

            <p className="text-[13px] leading-relaxed text-gray-500 sm:col-span-2">
              By entering your details, you agree that we may save your progress and contact you
              about your enquiry.
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 bg-[#F99621] py-4.5 text-[17px] font-normal text-white transition-colors hover:bg-[#e8881a] disabled:opacity-60 sm:col-span-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting…" : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
