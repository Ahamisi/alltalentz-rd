import Image from "next/image";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import TechTalents from "@/components/homeRD/techTalents";

export default function TechTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PageHeader>
        <div className="max-w-7xl mx-auto px-4 lg:flex h-[100%]  items-center ">
          {/* Left Column */}
          <div className="lg:w-[55%] flex flex-col space-y-8 py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-snug">
              Build the Future with Agile, Technical Talent
            </h1>

            <Link
              href="/request-talent"
              className="bg-[#F99621] hover:bg-white text-[#121212] px-8 py-4 md:px-[63px] md:py-[23px] transition duration-300 w-fit"
            >
              Hire Talent
            </Link>
          </div>

          {/* Right Column - Map */}
          <div className="hidden lg:block absolute bottom-0 right-4 lg:w-[45%] ">
            <Image
              src="/redesign-25/tech-header.png"
              alt="Tech Talents"
              width={800}
              height={500}
              className="w-full h-[500px] object-contain"
            />
          </div>
        </div>
      </PageHeader>

      <TechTalents />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}
