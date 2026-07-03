"use client";
import { useState } from "react";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import {
  Briefcase,
  Users,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Megaphone,
  UserCog,
  Code2,
  ShoppingCart,
  Calculator,
  Building2,
  HeartHandshake,
  FileText,
  Send,
  BadgeCheck,
  Loader2,
  CheckCircle2,
  Upload,
} from "lucide-react";

const HERO_IMAGE = "/redesign-25/internship-banner.webp";

const applyLinkProps = {
  href: "#apply",
};

const BENEFITS = [
  {
    icon: Briefcase,
    title: "Real project experience",
    text: "Work on live briefs that make an impact. No busywork, no photocopying; the real thing.",
  },
  {
    icon: Users,
    title: "Get Insightful Mentorship",
    text: "Learn directly from experienced teams and see how modern businesses operate, day to day.",
  },
  {
    icon: Lightbulb,
    title: "Gain Employable Skills",
    text: "Build the practical, professional skills that turn a CV into a callback.",
  },
  {
    icon: TrendingUp,
    title: "A real head start",
    text: "Leave with confidence, a portfolio, and momentum most graduates spend years chasing.",
  },
];

const DEPARTMENTS = [
  { icon: Megaphone, name: "Marketing" },
  { icon: UserCog, name: "Human Relations (HR)" },
  { icon: Code2, name: "Tech / Engineering" },
  { icon: ShoppingCart, name: "Procurement" },
  { icon: Calculator, name: "Accounting / Finance" },
  { icon: Building2, name: "Business Development" },
  { icon: HeartHandshake, name: "Relationship Management" },
];

const STEPS = [
  {
    icon: FileText,
    title: "Complete the form",
    text: "Tell us who you are, what you studied, and the team you want to grow with.",
  },
  {
    icon: Send,
    title: "Submit your resume",
    text: "Attach your CV so we can get to know your background and experience.",
  },
  {
    icon: BadgeCheck,
    title: "We'll be in touch",
    text: "Shortlisted applicants will be contacted with the next steps. Keep an eye on your inbox.",
  },
];

const inputClass =
  "w-full border border-gray-200 bg-[#F8F8F8] px-4 py-3 text-[#121212] placeholder:text-gray-400 focus:border-[#F99621] focus:outline-none focus:ring-1 focus:ring-[#F99621]";

export default function InternshipPageFragment() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseOfStudy: "",
    department: "",
    alternativeDepartment: "",
    whyInterested: "",
    expectations: "",
    achievement: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "department" && prevData.alternativeDepartment === value
        ? { alternativeDepartment: "" }
        : {}),
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.courseOfStudy) {
      newErrors.courseOfStudy = "Course of Study is required";
    }
    if (!formData.department) {
      newErrors.department = "Please choose a department";
    }
    if (!formData.alternativeDepartment) {
      newErrors.alternativeDepartment = "Please select a second choice";
    } else if (formData.alternativeDepartment === formData.department) {
      newErrors.alternativeDepartment =
        "Alternative department must differ from your first choice";
    }
    if (!formData.whyInterested) {
      newErrors.whyInterested = "This field is required";
    }
    if (!formData.expectations) {
      newErrors.expectations = "This field is required";
    }
    if (!formData.achievement) {
      newErrors.achievement = "This field is required";
    }
    if (!selectedFile) {
      newErrors.resume = "Resume upload is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("courseOfStudy", formData.courseOfStudy);
      payload.append("department", formData.department);
      payload.append("alternativeDepartment", formData.alternativeDepartment);
      payload.append("whyInterested", formData.whyInterested);
      payload.append("expectations", formData.expectations);
      payload.append("achievement", formData.achievement);
      if (selectedFile) payload.append("resume", selectedFile);

      const response = await fetch("/api/internship", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Failed to submit application");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit application:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden">
      {/* Hero with backdrop image */}
      <section
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 100%)",
          }}
        />

        <div className="relative z-10">
          <Header theme="dark" />

          <div className="mx-auto max-w-4xl px-4 py-24 text-center md:py-36">
            <span className="inline-block rounded-full border border-[#F99621]/40 bg-[#F99621]/10 px-4 py-1.5 text-sm font-medium uppercase tracking-[0.2em] text-[#F99621]">
              Graduate Internship Program
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Start Your Career Where It Actually Counts
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
              Are you a recent graduate ready for real work ? The All Talentz Graduate Internship Program hands you live projects, real mentors, and a great head start.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                {...applyLinkProps}
                className="group inline-flex items-center gap-2 bg-[#F99621] px-10 py-4 font-semibold text-[#121212] transition duration-300 hover:bg-white"
              >
                Apply now
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 border border-white/30 px-10 py-4 font-semibold text-white transition duration-300 hover:bg-white/10"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro / about */}
      <section id="about" className="scroll-mt-24 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F99621]">
            About the program
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#121212] md:text-4xl">
            Experience that prepares you for the real world
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-gray-600">
            <p>
              The All Talentz Graduate Internship Program gives aspiring professionals a seat at the table — working on live projects, learning from experienced teams, and seeing how a modern, globally-facing business runs.
            </p>
            <p>
              Whether you're awaiting NYSC or sharpening your edge before the job hunt, this is where you build the confidence, skills, and network that classrooms don't teach. It's also part of how we give back: a commitment to raising the next generation of talent.
            </p>
          </div>
        </div>
      </section>

      {/* What you'll gain */}
      <section className="bg-[#F8F8F8] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F99621]">
              What you&apos;ll gain
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#121212] md:text-4xl">
              More than an internship
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#F99621]/30 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F99621]/10 text-[#F99621] transition duration-300 group-hover:bg-[#F99621] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#121212]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F99621]">
              Departments
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#121212] md:text-4xl">
              Choose where you want to grow 
            </h2>
            <p className="mt-4 text-gray-600">
              Seven teams. One of them fits you. Apply to the department that matches your interests and ambitions.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="flex items-center gap-4 rounded-xl border border-gray-100 bg-[#F8F8F8] px-5 py-4 transition duration-300 hover:border-[#F99621]/40 hover:bg-white hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#F99621] shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-[#121212]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="bg-[#F8F8F8] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F99621]">
              How to apply
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#121212] md:text-4xl">
              Three simple steps
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#121212] text-[#F99621]">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-5 block text-sm font-semibold uppercase tracking-widest text-[#F99621]">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-[#121212]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-24 bg-white px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F99621]">
              Application form
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#121212] md:text-4xl">
              Ready to apply?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Complete the form below to join the All Talentz Graduate Internship Program. Please make sure every detail is accurate and up to date — it's the first thing we notice.
            </p>
          </div>

          {isSubmitted ? (
            <div className="mt-14 rounded-2xl border border-gray-100 bg-[#F8F8F8] px-6 py-16 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#F99621]" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-bold text-[#121212]">
                Application submitted!
              </h3>
              <p className="mx-auto mt-3 max-w-md text-gray-600">
                Thank you for applying to the All Talentz Graduate Internship Program.
                Shortlisted applicants will be contacted with the next steps.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-14 space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-2 block font-medium text-[#121212]">
                    Name (First and Last Name) <span className="text-[#F99621]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your answer"
                    className={inputClass}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block font-medium text-[#121212]">
                    Email Address <span className="text-[#F99621]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your answer"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block font-medium text-[#121212]">
                    Phone Number <span className="text-[#F99621]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your answer"
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="courseOfStudy"
                    className="mb-2 block font-medium text-[#121212]"
                  >
                    Course of Study <span className="text-[#F99621]">*</span>
                  </label>
                  <input
                    id="courseOfStudy"
                    name="courseOfStudy"
                    type="text"
                    value={formData.courseOfStudy}
                    onChange={handleInputChange}
                    placeholder="Enter your answer"
                    className={inputClass}
                  />
                  {errors.courseOfStudy && (
                    <p className="mt-1.5 text-sm text-red-600">{errors.courseOfStudy}</p>
                  )}
                </div>
              </div>

              <fieldset>
                <legend className="mb-3 block font-medium text-[#121212]">
                  Department of Choice <span className="text-[#F99621]">*</span>
                </legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {DEPARTMENTS.map(({ name }) => (
                    <label
                      key={name}
                      className={`flex cursor-pointer items-center gap-3 border px-4 py-3 transition duration-150 ${
                        formData.department === name
                          ? "border-[#F99621] bg-[#F99621]/5"
                          : "border-gray-200 bg-[#F8F8F8] hover:border-[#F99621]/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="department"
                        value={name}
                        checked={formData.department === name}
                        onChange={handleInputChange}
                        className="h-4 w-4 accent-[#F99621]"
                      />
                      <span className="text-sm text-[#121212]">{name}</span>
                    </label>
                  ))}
                </div>
                {errors.department && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.department}</p>
                )}
              </fieldset>

              <fieldset>
                <legend className="mb-3 block font-medium text-[#121212]">
                  Alternative Department <span className="text-[#F99621]">*</span>
                </legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {DEPARTMENTS.map(({ name }) => {
                    const isPrimary = name === formData.department;
                    return (
                      <label
                        key={name}
                        className={`flex items-center gap-3 border px-4 py-3 transition duration-150 ${
                          isPrimary
                            ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-50"
                            : formData.alternativeDepartment === name
                              ? "cursor-pointer border-[#F99621] bg-[#F99621]/5"
                              : "cursor-pointer border-gray-200 bg-[#F8F8F8] hover:border-[#F99621]/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="alternativeDepartment"
                          value={name}
                          checked={formData.alternativeDepartment === name}
                          onChange={handleInputChange}
                          disabled={isPrimary}
                          className="h-4 w-4 accent-[#F99621]"
                        />
                        <span className="text-sm text-[#121212]">{name}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.alternativeDepartment && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.alternativeDepartment}
                  </p>
                )}
              </fieldset>

              <div>
                <label
                  htmlFor="whyInterested"
                  className="mb-2 block font-medium text-[#121212]"
                >
                  Why are you interested in the All Talentz Internship Program?{" "}
                  <span className="text-[#F99621]">*</span>
                </label>
                <textarea
                  id="whyInterested"
                  name="whyInterested"
                  rows={4}
                  value={formData.whyInterested}
                  onChange={handleInputChange}
                  placeholder="Enter your answer"
                  className={inputClass}
                />
                {errors.whyInterested && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.whyInterested}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="expectations"
                  className="mb-2 block font-medium text-[#121212]"
                >
                  What do you hope to gain from this internship?{" "}
                  <span className="text-[#F99621]">*</span>
                </label>
                <textarea
                  id="expectations"
                  name="expectations"
                  rows={4}
                  value={formData.expectations}
                  onChange={handleInputChange}
                  placeholder="Enter your answer"
                  className={inputClass}
                />
                {errors.expectations && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.expectations}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="achievement"
                  className="mb-2 block font-medium text-[#121212]"
                >
                  An achievement you&apos;re proud of{" "}
                  <span className="text-[#F99621]">*</span>
                </label>
                <textarea
                  id="achievement"
                  name="achievement"
                  rows={4}
                  value={formData.achievement}
                  onChange={handleInputChange}
                  placeholder="Enter your answer"
                  className={inputClass}
                />
                {errors.achievement && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.achievement}</p>
                )}
              </div>

              <div>
                <label htmlFor="resume" className="mb-2 block font-medium text-[#121212]">
                  Upload your Resume <span className="text-[#F99621]">*</span>
                </label>
                <label
                  htmlFor="resume"
                  className="flex cursor-pointer items-center gap-3 border border-dashed border-gray-300 bg-[#F8F8F8] px-4 py-4 transition duration-150 hover:border-[#F99621]/60"
                >
                  <Upload className="h-5 w-5 shrink-0 text-[#F99621]" aria-hidden="true" />
                  <span className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : "Upload file (PDF or Word, max 5MB)"}
                  </span>
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                {errors.resume && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.resume}</p>
                )}
              </div>

              {submitError && (
                <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group inline-flex w-full items-center justify-center gap-2 bg-[#F99621] px-10 py-4 font-semibold text-[#121212] transition duration-300 hover:bg-[#121212] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit application
                    <ArrowRight
                      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}
