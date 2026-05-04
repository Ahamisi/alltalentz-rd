"use client";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Btn from "@/components/Btn";
import MainFooter from "@/components/MainFooter";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Loader2, ChevronDown } from "lucide-react";
import { useFormPersist } from "@/hooks/useFormPersist";

// Industry → roles mapping used by the RolesDropdown
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

// Custom multi-select checkbox dropdown for roles
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

      {/* Selected role tags */}
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

// Reusable field wrapper with label and inline error message
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

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  // Controls the brief "Draft saved" opacity flash in the form footer
  const [showDraftSaved, setShowDraftSaved] = useState(false);

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

  // ── Partial capture ───────────────────────────────────────────────────────
  // Saves every keystroke to localStorage; fires a beacon to /api/capture-partial
  // on page leave if the user hasn't submitted. Call clearPersisted() on success.
  const { clearPersisted, onEmailBlur } = useFormPersist("request-talent", formData, setFormData);

  // ── "Draft saved" indicator ───────────────────────────────────────────────
  // Only show after email is entered — that's when beacons become meaningful.
  useEffect(() => {
    if (!formData.email) return;
    setShowDraftSaved(true);
    const t = setTimeout(() => setShowDraftSaved(false), 1500);
    return () => clearTimeout(t);
  }, [formData]);

  // ── reCAPTCHA listeners ───────────────────────────────────────────────────
  useEffect(() => {
    if (search === "true") {
      // Previously this opened a popup — kept for URL-param compatibility
    }

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
      // Clear the localStorage draft so the beacon doesn't fire stale data
      // if the user navigates away after a successful submission.
      clearPersisted();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field: keyof FormErrors) =>
    `w-full border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F99621] focus:border-[#F99621] transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
    }`;

  const availableRoles =
    formData.industry && formData.industry !== "Other"
      ? (INDUSTRY_ROLES[formData.industry] ?? [])
      : [];

  return (
    <>
      {/* reCAPTCHA — id is unique to this page to prevent Next.js Script deduplication
          from silently dropping this block when ContactForm is also mounted */}
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

      {/* Form section */}
      <section className="bg-[#F8F8F8] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">

            <div className="px-8 pt-8 pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">{"Let's Find Your Talentz."}</h2>
              <p className="text-gray-500 mt-1 text-sm">
                Fill in the details below. Our team will respond within 24 business hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="px-8 py-12 text-center">
                <p className="text-xl font-bold text-gray-900 mb-2">
                  {"We've received your request!"}
                </p>
                <p className="text-gray-500 text-sm">
                  Our team will reach out within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
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

                <Field label="Business Email" required error={errors.email}>
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

                <Field label="Company" required error={errors.company}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInput}
                    placeholder="Acme Corp"
                    className={inputClass("company")}
                  />
                </Field>

                <Field label="Phone" required error={errors.phone}>
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
                    className={inputClass("industry") + " appearance-none bg-white cursor-pointer"}
                  >
                    <option value="" disabled>Select industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
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

                {/* Roles dropdown — shown for known industries */}
                {formData.industry && formData.industry !== "Other" && (
                  <Field label="Role(s) Needed" required error={errors.roles}>
                    <RolesDropdown
                      roles={availableRoles}
                      selected={formData.roles}
                      onChange={handleRolesChange}
                      error={errors.roles}
                    />
                  </Field>
                )}

                {/* "Other" industry: describe the roles instead of dropdown */}
                {formData.industry === "Other" && (
                  <Field label="Describe the role(s)" required error={errors.roles}>
                    <input
                      type="text"
                      name="otherRole"
                      value={formData.otherRole}
                      onChange={handleInput}
                      placeholder="e.g. Virtual Assistant"
                      className={inputClass("roles")}
                    />
                  </Field>
                )}

                {/* Custom role text — shown when "Other" is selected inside a known industry */}
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

                <Field label="Number of Professionals" required error={errors.numberOfProfessionals}>
                  <input
                    type="text"
                    name="numberOfProfessionals"
                    value={formData.numberOfProfessionals}
                    onChange={handleInput}
                    placeholder="e.g. 2"
                    className={inputClass("numberOfProfessionals")}
                  />
                </Field>

                <Field label="Timeline" required error={errors.timeline}>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInput}
                    className={inputClass("timeline") + " appearance-none bg-white cursor-pointer"}
                  >
                    <option value="" disabled>Select timeline</option>
                    {TIMELINES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Additional Requirements">
                  <textarea
                    name="additionalRequirements"
                    value={formData.additionalRequirements}
                    onChange={handleInput}
                    placeholder="Any specific skills, tools, or time zones..."
                    rows={4}
                    className={inputClass("industry") + " resize-none"}
                  />
                </Field>

                {/* reCAPTCHA — site key matches the one already used in ContactForm.tsx */}
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

                <p className="text-xs text-gray-400">
                  By entering your details, you agree that we may save your progress and contact you about your enquiry.
                </p>

                {/* Footer row: "Draft saved" flash on the left, submit button on the right */}
                <div className="flex items-center justify-between pt-2">
                  <p
                    className={`text-xs text-gray-400 transition-opacity duration-500 ${
                      showDraftSaved ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Draft saved
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#F99621] text-black font-bold py-3 px-8 hover:bg-[#e8881a] transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isLoading ? "Submitting…" : "Submit Request"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section — What Happens Next */}
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
