import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import Link from 'next/link';
import NewServices from "@/components/homeRD/newservices";

export default function Services() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden ">
      <PageHeader>
        <div className="max-w-7xl mx-auto px-4 lg:flex mt-0 lg:mt-12 h-[100%] items-center ">
          {/* Left Column */}
          <div className="lg:w-[55%] flex flex-col space-y-8 py-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-snug">
              Your Strategic Partner for <span className="text-[#FFB300]">Industry-Specific Talents</span>
            </h1>
            
            <a 
              href="/request-talent" 
              className="bg-[#F99621] hover:bg-white text-[#121212] px-[63px] py-[23px] transition duration-300 w-fit"
            >
              Explore Talent
            </a>
          </div>

          {/* Right Column - Map */}
          <div className="hidden lg:block lg:w-[45%] absolute bottom-[-1px] right-4 pl-0">
            <img
                    src="/redesign-25/service-header.png"
                    alt="Success Stories"
                    className="w-full h-[500px] object-contain"
                />
          </div>
        </div>
      </PageHeader>

      <NewServices />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}