import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import Link from 'next/link';
import FinanceTalents from "@/components/homeRD/financeTalents";


export default function FinanceTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <PageHeader>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
          {/* Left Column */}
          <div className="lg:w-[60%] flex flex-col space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-snug">
              Secure, Scale, and Succeed with Financial Operations Talent
            </h1>
            
            <a 
              href="/request-talent" 
              className="bg-[#F99621] hover:bg-white text-[#121212] px-[63px] py-[23px] transition duration-300 w-fit"
            >
              Hire Talent
            </a>
          </div>

          {/* Right Column - Map */}
          <div className="hidden lg:block lg:w-[40%] pl-0">
            <img
                    src="/redesign-25/finance-header.png"
                    alt="Success Stories"
                    className="w-full h-[500px] object-contain"
                />
          </div>
        </div>
      </PageHeader>
      
      <FinanceTalents />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>
    </main>
  );
}