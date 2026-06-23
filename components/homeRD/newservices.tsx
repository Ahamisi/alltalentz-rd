import Link from "next/link";
import Image from "next/image";
import { niches } from "./niches-data";

const NewServices = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="flex flex-col space-y-8 items-center">
        <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto">
          Generic staffing leaves gaps. At All Talentz, we match you with trained, vetted professionals who understand your industry — not just your job description. From a single specialist to a full remote team, we build the talent solution your business actually needs. 
        </p>
        <Link
          href="#our-dna"
          className="bg-[#F99621] text-black font-semibold px-16 py-6 hover:bg-[#e88710] transition duration-300 w-fit"
        >
          Explore Our Solutions
        </Link>
      </div>

      <div id="our-dna" className="flex flex-col space-y-8 items-center text-black mt-[120px]">
        <h2 className="text-4xl md:text-5xl font-semibold text-center">Why Businesses Hire Through Us </h2>
        {/* <p className="text-center text-gray-600">
          Explore our tailored solutions for your industry
        </p> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition duration-300">
          <div className="mb-6">
            <Image
              alt="Highly-Skilled Employees"
              width={48}
              height={48}
              src="/redesign-25/icons/skill.svg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">Highly Trained & Vetted</h3>
          <p className="text-gray-600">Every candidate goes through role-specific screening and skills assessment before they ever join your team. No guesswork, no trial-and-error.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition duration-300">
          <div className="mb-6">
            <Image
              alt="Affordable Cost"
              width={48}
              height={48}
              src="/redesign-25/icons/affordable.svg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">24/7 Operational Support</h3>
          <p className="text-gray-600">Our support doesn't clock out. From onboarding to ongoing delivery, we're always available to ensure seamless operations across time zones.</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border hover:shadow-md transition duration-300">
          <div className="mb-6">
            <Image
              alt="Vetted & Reliable Employees"
              width={48}
              height={48}
              src="/redesign-25/icons/reliable.svg"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-black">Scalable & Flexible</h3>
          <p className="text-gray-600">Spin up a team of two or twenty. Our talent solutions scale with your project pace, budget, and growth stage —no long-term lock-ins required.</p>
        </div>
      </div>

      <div className="flex flex-col space-y-8 items-center text-black mt-[120px]">
        <h2 className="text-4xl md:text-5xl font-semibold max-w-4xl text-center px-4">
          Our Industry Solutions 
        </h2>

        <div className="flex flex-wrap justify-center gap-6 !mt-[50px] pb-24 max-w-7xl mx-auto w-full px-4">
          {niches.map((niche, i) => (
            <Link
              key={i}
              href={niche.path}
              className="relative rounded-[24px] overflow-hidden bg-neutral-900/90 w-full md:w-[calc(33.333%-1rem)] cursor-pointer group block"
            >
              {/* Default State */}
              <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                <Image src={niche.imageSrc} alt={niche.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-300" />
              </div>
              {/* Default Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 group-hover:opacity-0 transition-opacity duration-300">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">{niche.title}</h2>
                  <div className="inline-flex items-center">
                    <span className="text-white border-b border-white">Explore tech talent</span>
                    <svg className="w-6 h-6 ml-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Hover State */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-neutral-800/95">
                <div className="flex flex-col h-full pt-6">
                  <div className="relative h-[45%] px-8">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <Image src={niche.imageSrc} alt={niche.title} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-start p-8 flex-grow">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{niche.title}</h2>
                    <p className="text-white/80 mb-6">{niche.description}</p>
                    <div className="inline-flex items-center mt-auto">
                      <span className="text-white border-b border-white">Hire now</span>
                      <svg className="w-6 h-6 ml-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-32">
          <Link
            href="/hiring-services"
            className="bg-[#F99621] text-black text-center font-semibold px-8 py-4 md:px-16 md:py-6 hover:bg-[#e88710] transition duration-300 inline-block"
          >
            Explore Our Industry Solutions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewServices;
