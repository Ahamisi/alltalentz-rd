import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeQVQ8kCbLo6mvmYtyZG7FRKgRL3ZHEXoYraj6-E6_34YBIqQ/viewform";

const HERO_IMAGE = "/redesign-25/career-banner.jpg";

const applyLinkProps = {
  href: FORM_URL,
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

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
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#F99621]">
              Graduate Internship Program
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              Apply for the All Talentz Graduate Internship Program
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
              Are you a recent graduate looking to gain practical work experience and
              develop skills that will prepare you for the professional world?
            </p>
            <a
              {...applyLinkProps}
              className="mt-10 inline-block bg-[#F99621] px-10 py-4 font-semibold text-[#121212] transition duration-300 hover:bg-white"
            >
              Apply now
            </a>
          </div>
        </div>
      </section>

      {/* Intro / about */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl space-y-6 px-4 text-lg leading-relaxed text-gray-700">
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
      </section>

      {/* Apply */}
      <section id="apply" className="scroll-mt-24 bg-[#F8F8F8] py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-3xl font-bold text-[#121212] md:text-4xl">
            Ready to apply?
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Complete the application form to apply for the All Talentz Graduate
            Internship Program.
          </p>
          <p className="mt-3 text-gray-600">
            Please ensure that all information provided is accurate and up to date.
          </p>
          <a
            {...applyLinkProps}
            className="mt-10 inline-block bg-[#F99621] px-12 py-4 font-semibold text-[#121212] transition duration-300 hover:bg-[#e88710]"
          >
            Apply now
          </a>
        </div>
      </section>

      {/* Footer */}
      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}
