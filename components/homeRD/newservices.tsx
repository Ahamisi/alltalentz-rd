import Link from "next/link";
import Image from "next/image";

const NewServices = () => {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="flex flex-col space-y-8 items-center">
        <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto">
          Today's business challenges are industry-specific. Generic support isn't enough. At All
          Talentz, we've moved beyond one-size-fits-all services to become your strategic partner.
          We provide deeply specialized talent solutions that integrate seamlessly into the core
          workflows of your sector, driving efficiency, innovation, and growth.
        </p>
        <Link
          href="/request-talent"
          className="bg-[#F99621] text-black font-semibold px-16 py-6 hover:bg-[#e88710] transition duration-300 w-fit"
        >
          Request Talent
        </Link>
      </div>

      <div className="flex flex-col space-y-8 items-center text-black mt-24">
        <h2 className="text-4xl md:text-5xl font-semibold text-center">Our DNA</h2>
        <p className="text-center text-gray-600">
          Explore our tailored solutions for your industry
        </p>
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
          <p className="text-gray-600">Rigorous screening and role-specific training.</p>
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
          <p className="text-gray-600">We are always here to ensure seamless delivery</p>
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
          <p className="text-gray-600">Teams built to match your project pace and needs.</p>
        </div>
      </div>

      <div className="flex flex-col space-y-8 items-center text-black mt-24">
        <h2 className="text-4xl md:text-5xl font-semibold max-w-4xl text-center px-4">
          Explore our tailored solutions for your industry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pb-24 max-w-7xl mx-auto w-full px-4">
          <div className="flex flex-col gap-6">
            <Link
              href="/hire-tech-talents"
              className="relative overflow-hidden rounded-xl h-[280px] group cursor-pointer"
            >
              <Image
                alt="Technology & Startups"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src="/redesign-25/new-services/tech&startup.png"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute top-0 text-white p-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                  Technology & Startups
                </h2>
                <p className="text-sm md:text-base pt-2">
                  Fuel innovation with agile teams of developers, AI specialists, and data experts.
                </p>
              </div>
            </Link>

            <Link
              href="/hire-finance-talents"
              className="relative overflow-hidden rounded-xl h-[280px] group cursor-pointer"
            >
              <Image
                alt="Finance"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src="/redesign-25/new-services/finance.png"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute top-0 text-white p-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Finance</h2>
                <p className="text-sm md:text-base pt-2">
                  Secure and scale your operations with precise talent for receivables, data
                  management, and client outreach.
                </p>
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <Link
              href="/hire-healthcare-talents"
              className="relative overflow-hidden rounded-xl h-[280px] group cursor-pointer"
            >
              <Image
                alt="Healthcare & Life Sciences"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src="/redesign-25/new-services/healthcare.png"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute top-0 text-white p-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                  Healthcare & Life Sciences
                </h2>
                <p className="text-sm md:text-base pt-2">
                  Navigate complexity with compliant specialists in billing, data annotation, and
                  admin support.
                </p>
              </div>
            </Link>

            <Link
              href="/hire-remediation-talents"
              className="relative overflow-hidden rounded-xl h-[280px] group cursor-pointer"
            >
              <Image
                alt="Construction & Remediation"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                src="/redesign-25/new-services/construction.png"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              <div className="absolute top-0 text-white p-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                  Construction & Remediation
                </h2>
                <p className="text-sm md:text-base pt-2">
                  Restore and rebuild with certified estimators and coordinated project support.
                </p>
              </div>
            </Link>
          </div>

          <Link
            href="/hire-legal-talents"
            className="relative overflow-hidden rounded-xl h-[280px] md:h-[576px] group cursor-pointer"
          >
            <Image
              alt="Legal Talent & Paralegal Services"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              src="/redesign-25/new-services/legal.png"
              className="object-cover group-hover:scale-105 transition duration-500 max-md:object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute top-0 text-white p-6">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                Legal Talent & Paralegal Services
              </h2>
              <p className="text-sm md:text-base pt-2">
                Expert support for law firms and legal departments.
              </p>
            </div>
          </Link>
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
