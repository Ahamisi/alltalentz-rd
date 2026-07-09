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
  const [showClosedModal, setShowClosedModal] = useState(false);

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
              <button
                type="button"
                onClick={() => setShowClosedModal(true)}
                className="group inline-flex items-center gap-2 bg-[#F99621] px-10 py-4 font-semibold text-[#121212] transition duration-300 hover:bg-white"
              >
                Apply now
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => setShowClosedModal(true)}
                className="inline-flex items-center gap-2 border border-white/30 px-10 py-4 font-semibold text-white transition duration-300 hover:bg-white/10"
              >
                Learn more
              </button>
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
              Applications closed
            </span>
            <h2 className="mt-4 text-3xl font-bold text-[#121212] md:text-4xl">
              We&apos;re not accepting applications at this time
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              Thank you for your interest in the All Talentz Graduate Internship Program.
              Please check back for future opportunities.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>

      {/* Applications closed modal */}
      {showClosedModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="closed-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowClosedModal(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white px-6 py-10 text-center shadow-xl">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[#F99621]" aria-hidden="true" />
            <h3
              id="closed-modal-title"
              className="mt-5 text-2xl font-bold text-[#121212]"
            >
              We&apos;re not accepting applications at this time
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-gray-600">
              Thank you for your interest in the All Talentz Graduate Internship Program.
              Please check back for future opportunities.
            </p>
            <button
              type="button"
              onClick={() => setShowClosedModal(false)}
              className="mt-8 inline-flex items-center justify-center bg-[#F99621] px-8 py-3 font-semibold text-[#121212] transition duration-300 hover:bg-[#121212] hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
