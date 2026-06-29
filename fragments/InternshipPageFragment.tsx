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
} from "lucide-react";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeQVQ8kCbLo6mvmYtyZG7FRKgRL3ZHEXoYraj6-E6_34YBIqQ/viewform";

const HERO_IMAGE = "/redesign-25/career-banner.jpg";

const applyLinkProps = {
  href: FORM_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

const BENEFITS = [
  {
    icon: Briefcase,
    title: "Real project experience",
    text: "Work on live projects that make a genuine impact, not busywork.",
  },
  {
    icon: Users,
    title: "Learn from experienced teams",
    text: "Gain mentorship and exposure to how modern businesses operate.",
  },
  {
    icon: Lightbulb,
    title: "Build workplace skills",
    text: "Develop the practical, professional skills employers look for.",
  },
  {
    icon: TrendingUp,
    title: "Accelerate your career",
    text: "Build confidence and a head start on your professional journey.",
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
    text: "Tell us about yourself, your course of study, and your department of choice.",
  },
  {
    icon: Send,
    title: "Submit your resume",
    text: "Attach your CV so we can get to know your background and experience.",
  },
  {
    icon: BadgeCheck,
    title: "We'll be in touch",
    text: "Shortlisted applicants will be contacted with the next steps.",
  },
];

export default function InternshipPageFragment() {
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
              Apply for the All Talentz Graduate Internship Program
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
              Are you a recent graduate looking to gain practical work experience and
              develop skills that will prepare you for the professional world?
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
            Practical experience that prepares you for the real world
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-gray-600">
            <p>
              The All Talentz Graduate Internship Program provides aspiring professionals
              with the opportunity to work on real projects, learn from experienced teams,
              and gain valuable exposure to modern business operations.
            </p>
            <p>
              Whether you&apos;re awaiting NYSC or looking to strengthen your professional
              experience, this program is designed to help you build confidence, develop
              workplace skills, and accelerate your career growth.
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
              Apply to the team that best matches your interests and ambitions.
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

      {/* Apply CTA banner */}
      <section id="apply" className="scroll-mt-24 bg-white px-4 py-20 md:py-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#121212] px-6 py-16 text-center md:px-16">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#F99621]/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#F99621]/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to apply?</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-gray-300">
              Complete the application form to join the All Talentz Graduate Internship
              Program. Please ensure all information provided is accurate and up to date.
            </p>
            <a
              {...applyLinkProps}
              className="group mt-10 inline-flex items-center gap-2 bg-[#F99621] px-12 py-4 font-semibold text-[#121212] transition duration-300 hover:bg-white"
            >
              Apply now
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}
