"use client";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";
import MainFooter from "@/components/MainFooter";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Loader2, ChevronDown, Sparkles } from "lucide-react";

// Industry roles mapping
const INDUSTRY_ROLES: Record<string, string[]> = {
  Technology: [
    "Data Annotator",
    "AI/Machine Learning Engineer",
    "Software Dev",
    "IT Support",
    "UI/UX",
    "Digital Marketing",
    "Other",
  ],
  Healthcare: [
    "Medical Billing Specialists",
    "Revenue Cycle Managers",
    "Healthcare Admins",
    "HIPAA-Compliant Support",
    "Other",
  ],
  Finance: [
    "Bookkeepers",
    "AR/AP Specialists",
    "Payroll Processors",
    "Financial Analysts",
    "QuickBooks Specialists",
    "Digital Marketing",
    "Other",
  ],
  "Construction & Restoration": [
    "Estimators",
    "Project Administrators",
    "AR Specialists",
    "Telemarketing Agents",
    "Digital Marketing Support",
    "Other",
  ],
  Legal: [
    "Paralegals",
    "Legal Virtual Assistants",
    "Transcriptionist",
    "Contract Managers",
    "Legal Researchers",
    "Other",
  ],
};

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Construction & Restoration",
  "Legal",
  "Other",
];

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

// Custom multi-select checkbox dropdown
function RolesDropdown({
  roles,
  selected,
  onChange,
  error,
}: {
  roles: string[];
  selected: string[];
  onChange: (roles: string[]) => void;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (role: string) => {
    if (selected.includes(role)) {
      onChange(selected.filter((r) => r !== role));
    } else {
      onChange([...selected, role]);
    }
  };

  const displayText =
    selected.length === 0
      ? "Select roles"
      : selected.length === 1
        ? selected[0]
        : `${selected.length} roles selected`;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full border px-4 py-3 text-left bg-white flex items-center justify-between transition-colors focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] ${
          error ? "border-red-400" : "border-gray-200 hover:border-[#F99621]"
        } ${selected.length === 0 ? "text-gray-400" : "text-gray-800"}`}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selected.map((role) => (
            <span
              key={role}
              className="inline-flex items-center gap-1 bg-[#FEF3E2] text-[#C97D10] text-sm px-3 py-1 font-medium"
            >
              {role}
              <button
                type="button"
                onClick={() => toggle(role)}
                className="hover:text-[#F99621] ml-1"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
          {roles.map((role) => (
            <label
              key={role}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#FEF3E2] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(role)}
                onChange={() => toggle(role)}
                className="w-4 h-4 accent-[#F99621] rounded"
              />
              <span className="text-gray-700 text-sm">{role}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// Reusable field wrapper
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-[#F99621] ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

export default function RequestTalent() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("popup");

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customRoleOpen, setCustomRoleOpen] = useState(false);
  const [customRoleText, setCustomRoleText] = useState("");
  const [customRoleSent, setCustomRoleSent] = useState(false);
  const [redirect, setRedirect] = useState(false);
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

  useEffect(() => {
    if (search === "true") setIsOpen(true);
    else setIsOpen(false);

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
  }, [search]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset roles when industry changes
    if (name === "industry") {
      setFormData((prev) => ({ ...prev, industry: value, roles: [], otherRole: "" }));
    }
  };

  const handleRolesChange = (roles: string[]) => {
    setFormData((prev) => ({
      ...prev,
      roles,
      // Clear otherRole if "Other" is deselected
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
    const rolesList = formData.roles.map((r) =>
      r === "Other" ? formData.otherRole || "Other" : r
    );

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
      if (redirect) route.push("https://calendly.com/mnwoseh");
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsSubmitted(true);
      setIsLoading(false);
    }
  };

  // reCAPTCHA handlers
  const onRecaptchaLoad = () => {};

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors((prev) => ({ ...prev, recaptcha: null }));
    }
  };

  const onRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const availableRoles = formData.industry && formData.industry !== "Other"
    ? INDUSTRY_ROLES[formData.industry] ?? []
    : [];

  const inputClass = (field: keyof FormErrors) =>
    `w-full border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
    }`;

  return (
    <>
      {/* reCAPTCHA Script */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        onLoad={onRecaptchaLoad}
        strategy="lazyOnload"
      />
      <Script id="recaptcha-callbacks" strategy="lazyOnload">
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
          <div className="max-w-7xl mx-auto py-12 lg:flex relative h-fit mt-0 items-center px-2 lg:px-[20px] md:px-4">
            <div className="md:w-6/10 pr-6 md:w-full">
              <h1 className="text-2xl md:text-[60px] md:font-[700] md:leading-[70px] font-bold mb-6 text-white">
                Request Talent - Your Remote Team,{" "}
                <span className="text-secondary">Ready in 7 Days</span>.
              </h1>
              <div className="mt-10 flex flex-col lg:flex-row gap-4">
                <Btn text="Build my Team" otherCSS="w-full text-center" link="/request-talent" />
                <Btn text="Talk to our Team" otherCSS="w-full text-center" link="/contact-us" />
              </div>
            </div>
            <div className="hidden lg:block md:w-4/10 mt-8 md:mt-0">
              <Image
                src="/star-payroll-alltalentz.png"
                alt="All Talents Star"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>
        </PageHeader>

        {/* Marquee bar */}
        <div className="bg-[#F99621] py-4 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                {["ISO 27001 Certified", "SOC-2 Type 2 Certified", "7-Day Deployment", "24/7 Operational Support"].map(
                  (item) => (
                    <span key={item} className="flex items-center mx-8 text-white font-bold text-xl">
                      <span className="mr-3">✦</span>
                      {item}
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-[#F8F8F8] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="bg-white shadow-sm border border-gray-100 p-10 text-center">
              <div className="flex items-center justify-center mb-4">
                <Image src="/star-shine.svg" alt="Alltalentz Shine" width={80} height={80} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Thank you!</h3>
              <p className="text-gray-500 text-base">We will keep you updated via email.</p>
              <Btn link="https://calendly.com/mnwoseh" target="_blank" text="Meet With Us" otherCSS="mt-6" />
            </div>
          ) : (
            <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
              {/* Form header */}
              <div className="px-8 pt-8 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">{"Let's Find Your Talentz."}</h2>
                <p className="text-gray-500 mt-1 text-sm">
                  Fill in the details below. Our team will respond within 24 business hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
                {/* Row: First Name + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="First Name" required error={errors.firstName}>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInput}
                      placeholder="John"
                      className={inputClass("firstName")}
                    />
                  </Field>
                  <Field label="Last Name" required error={errors.lastName}>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInput}
                      placeholder="Doe"
                      className={inputClass("lastName")}
                    />
                  </Field>
                </div>

                {/* Company Name */}
                <Field label="Company Name" required error={errors.company}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInput}
                    placeholder="Acme Inc."
                    className={inputClass("company")}
                  />
                </Field>

                {/* Row: Business Email + Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Business Email" required error={errors.email}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInput}
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
                </div>

                {/* Industry / Vertical */}
                <Field label="Industry / Vertical" required error={errors.industry}>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInput}
                    className={inputClass("industry")}
                  >
                    <option value="" disabled>
                      Choose Industry
                    </option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Other Industry textbox */}
                {formData.industry === "Other" && (
                  <Field label="Specify your industry" required>
                    <input
                      type="text"
                      name="otherIndustry"
                      value={formData.otherIndustry}
                      onChange={handleInput}
                      placeholder="Enter your industry"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] transition-colors"
                    />
                  </Field>
                )}

                {/* Role(s) You Need — only if industry is selected and not "Other" */}
                {formData.industry && formData.industry !== "Other" && (
                  <Field label="Role(s) You Need" required error={errors.roles}>
                    <RolesDropdown
                      roles={availableRoles}
                      selected={formData.roles}
                      onChange={handleRolesChange}
                      error={errors.roles}
                    />
                  </Field>
                )}

                {/* Other Role textbox */}
                {formData.roles.includes("Other") && (
                  <Field label="Specify the role(s)" required>
                    <input
                      type="text"
                      name="otherRole"
                      value={formData.otherRole}
                      onChange={handleInput}
                      placeholder="Describe the role you need"
                      className="w-full border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] transition-colors"
                    />
                  </Field>
                )}

                {/* Row: Number of Professionals + Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Number of Professionals" required error={errors.numberOfProfessionals}>
                    <input
                      type="number"
                      name="numberOfProfessionals"
                      value={formData.numberOfProfessionals}
                      onChange={handleInput}
                      placeholder="e.g. 3"
                      min="1"
                      className={inputClass("numberOfProfessionals")}
                    />
                  </Field>
                  <Field label="Timeline" required error={errors.timeline}>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInput}
                      className={inputClass("timeline")}
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
                </div>

                {/* Additional Requirements */}
                <Field label="Additional Requirements">
                  <textarea
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleInput}
                    placeholder="Any specific skills, certifications, or requirements..."
                    rows={4}
                    className="w-full border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] transition-colors resize-none hover:border-gray-300"
                  />
                  <p className="text-xs text-gray-400">Optional</p>
                </Field>

                {/* reCAPTCHA */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="g-recaptcha"
                    data-sitekey="6LcsqxIsAAAAAJqcWPOgXKPKDjB1hNVpb_sNEacQ"
                    data-callback="onRecaptchaSuccess"
                    data-expired-callback="onRecaptchaExpired"
                  />
                  {errors.recaptcha && (
                    <p className="text-red-500 text-sm text-center">{errors.recaptcha}</p>
                  )}
                </div>

                {/* Submit buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => setRedirect(false)}
                    className="flex-1 bg-[#F99621] text-black font-bold py-3 px-6 hover:bg-[#e8881a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading && !redirect ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Submit My Request →"}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={() => setRedirect(true)}
                    className="flex-1 border-2 border-[#F99621] text-[#F99621] font-bold py-3 px-6 hover:bg-[#FEF3E2] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isLoading && redirect ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Meet With Us"}
                  </button>
                </div>

                {/* Microcopy */}
                <p className="text-xs text-gray-400 text-center">
                  No commitment required. We&apos;ll review your request and be in touch within 24 hours.
                </p>
              </form>
            </div>
          )}

          {/* Don't see your role — collapsible panel */}
          {!isSubmitted && (
            <div className="mt-4 bg-white border border-gray-100 shadow-sm overflow-hidden">
              {/* Trigger row */}
              <button
                type="button"
                onClick={() => setCustomRoleOpen((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#FEF3E2] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#FEF3E2] group-hover:bg-white transition-colors">
                    <Sparkles className="w-4 h-4 text-[#F99621]" />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">{"Don't see your role?"}</p>
                    <p className="text-xs text-gray-400">{"Tell us what you need — we'll source it."}</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-300 ${customRoleOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expandable body */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${customRoleOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  {customRoleSent ? (
                    <div className="flex items-center gap-2 py-3 text-sm text-[#C97D10] font-medium">
                      <Sparkles className="w-4 h-4" />
                      Got it! {"We'll"} reach out with matching options.
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={customRoleText}
                        onChange={(e) => setCustomRoleText(e.target.value)}
                        placeholder="e.g. A bilingual customer support lead with healthcare experience..."
                        rows={3}
                        className="w-full border border-gray-200 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] transition-colors resize-none hover:border-gray-300 text-sm mt-3"
                      />
                      <button
                        type="button"
                        disabled={!customRoleText.trim()}
                        onClick={() => setCustomRoleSent(true)}
                        className="mt-3 bg-[#F99621] text-black text-sm font-bold px-5 py-2 hover:bg-[#e8881a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Send us a note →
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 6 — What Happens Next */}
      <section className="bg-[#F8F8F8] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#F99621] text-xs font-bold uppercase tracking-[0.2em] mb-3">After you submit</p>
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

      {/* Section 7 — CTA */}
      {/* <section className="bg-[#131313] py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Not Sure Where to Start?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Our team will walk you through everything. Schedule a 15-minute call and we&apos;ll map
            the right talent solution for your operation — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://calendly.com/mnwoseh"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#F99621] text-black font-bold py-3 px-8 hover:bg-[#e8881a] transition-colors"
            >
              Schedule a Call →
            </a>
            <a
              href="/alltalentz-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-bold py-3 px-8 hover:bg-white hover:text-black transition-colors"
            >
              Download Our Brochure
            </a>
          </div>
        </div>
      </section> */}

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </>
  );
}
