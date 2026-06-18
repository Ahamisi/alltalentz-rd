import Image from "next/image";
import ClientWords from "@/components/homeRD/ClientWords";
import ClientVideos from "@/components/homeRD/ConferenceVideo";
import Milestone from "@/components/homeRD/Milestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import PricingModelList from "@/components/homeRD/PricingModelList";
import Link from "next/link";
import { Check } from "lucide-react";

const RateExplainer = () => {
  const tiers = [
    { price: "$400", label: "Entry-level & support roles" },
    { price: "$1,500", label: "Specialist & technical roles, like AI/ML engineers & developers" },
  ];

  const inclusions = ["Full vetting process", "Onboarding coordination", "24/7 operational support"];

  return (
    <section className="py-24 px-4 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: narrative + price figures */}
        <div className="lg:col-span-7">
          {/* <span className="text-sm font-semibold uppercase tracking-wider text-[#F08900]">
            Pricing
          </span> */}
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-tight">
            What Determines Your Rate?
          </h2>
          <p className="mt-5 text-xl text-gray-600 leading-relaxed">
            Pricing varies based on the role, the experience level required, and the scope of your
            engagement.
          </p>

          {/* Price figures — typographic, not boxed */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {tiers.map((tier) => (
              <div key={tier.price}>
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-500 text-sm">from</span>
                  <span className="text-4xl font-bold text-[#1A1A1A]">{tier.price}</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                </div>
                <div className="mt-2 h-1 w-12 bg-[#FFB300] rounded-full" />
                <p className="mt-3 text-gray-600 leading-relaxed">{tier.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-lg text-gray-600">
            Not sure which tier fits your needs?{" "}
            <Link
              href="/contact-us"
              className="text-[#F08900] font-semibold underline underline-offset-4 hover:text-[#FFB300] transition-colors"
            >
              Talk to our team
            </Link>{" "}
            and we'll build a plan around your budget.
          </p>
        </div>

        {/* Right: what's included — soft tinted panel, distinct from pricing cards */}
        <div className="lg:col-span-5">
          <div className="bg-[#FFF9F0] rounded-[32px] p-8 lg:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Every plan includes
            </p>
            <ul className="space-y-5">
              {inclusions.map((item) => (
                <li key={item} className="flex items-center gap-4">
                  <span className="w-7 h-7 rounded-full bg-[#FFB300] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-lg text-[#1A1A1A]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const CareerBanner = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-[#1A1A1A] leading-tight">
            Are you ready to take your career to the next level with world class training?
          </h2>

          <p className="text-xl text-gray-600">
            Don't miss this opportunity to join us today and start your journey to a global career!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src="/icons/work-life.svg"
                alt="Work-life balance"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg text-[#353535]">Healthy work-life Balance</span>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="/icons/remote.svg"
                alt="Remote work"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg text-[#353535]">100% Work from Home (remote)</span>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="/icons/employee-benefits.svg"
                alt="Employee benefits"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg text-[#353535]">Great Employment Benefits</span>
            </div>

            <div className="flex items-center gap-4">
              <Image
                src="/icons/compensation.svg"
                alt="Compensation"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg text-[#353535]">Great Compensation</span>
            </div>
          </div>

          <Link
            href="/bootcamp"
            className="block w-full lg:w-[50%] px-8 py-4 bg-[#FFB300] text-white text-lg font-semibold hover:bg-[#F08900] transition-colors text-center"
          >
            Join our Global Talent
          </Link>
        </div>

        {/* Right Image */}
        <div className="rounded-3xl overflow-hidden">
          <Image
            src="/redesign-25/career-banner.jpg"
            alt="Career opportunities"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default function About() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PageHeader>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
          {/* Left Column */}
          <div className="lg:w-[50%] flex flex-col space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Begin Your Journey Towards Hiring{" "}
              <span className="text-[#FFB300]"> World Class Talents</span>
            </h1>

            <Link
              href="/request-talent"
              className="bg-[#F99621] hover:bg-white text-[#121212] px-8 py-4 md:px-[63px] md:py-[23px] transition duration-300 w-fit"
            >
              Find Talent
            </Link>
          </div>

          {/* Right Column - Map */}
          <div className="hidden lg:block lg:w-[50%] pl-12">
            {/* <img
                    src="/redesign-25/alltalentz-star.png"
                    alt="Success Stories"
                    className="w-full h-[400px] object-contain"
                /> */}
          </div>
        </div>
      </PageHeader>

      

      <RateExplainer />

      <PricingModelList />

      {/* <CareerBanner /> */}

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}
