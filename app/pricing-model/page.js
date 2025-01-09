import ClientWords from "@/components/homeRD/ClientWords";
import ClientVideos from "@/components/homeRD/ConferenceVideo";
import Milestone from "@/components/homeRD/Milestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";
import PricingModelList from "@/components/homeRD/PricingModelList";
import Link from 'next/link';

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
              <img src="/icons/work-life.svg" alt="" className="w-8 h-8" />
              <span className="text-lg text-[#353535]">Healthy work-life Balance</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img src="/icons/remote.svg" alt="" className="w-8 h-8" />
              <span className="text-lg text-[#353535]">100% Work from Home (remote)</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img src="/icons/employee-benefits.svg" alt="" className="w-8 h-8" />
              <span className="text-lg text-[#353535]">Great Employment Benefits</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img src="/icons/compensation.svg" alt="" className="w-8 h-8" />
              <span className="text-lg text-[#353535]">Great Compensation</span>
            </div>
          </div>

          <Link href="/bootcamp" className="block w-[50%] px-8 py-4 bg-[#FFB300] text-white text-lg font-semibold hover:bg-[#F08900] transition-colors">
            Join our Global Talent
          </Link>
        </div>

        {/* Right Image */}
        <div className="rounded-3xl overflow-hidden">
          <img 
            src="/redesign-25/career-banner.jpg" 
            alt="Career opportunities" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default function About() {


 

  return (
    <>
    
        
    <PageHeader>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
            {/* Left Column */}
            <div className="lg:w-[50%] flex flex-col space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Begin Your Journey To A <span className="text-[#FFB300]">Global Career</span>
                </h1>
                    
                <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
                Feel Free to send us a message, call us or visit our office or drop us an email anytime.  We'd love to hear from you.
                </p>
                
                <a href="/request-talent" className="bg-[#F99621] hover:bg-white text-[#121212] px-[63px] py-[23px] transition duration-300 w-fit">
                Find Talent
              </a>
  
            </div>

            {/* Right Column - Map */}
            <div className="hidden lg:block lg:w-[50%] pl-12">
                <img
                    src="/redesign-25/alltalentz-star.png"
                    alt="Success Stories"
                    className="w-full h-[400px] object-contain"
                    // className="w-full h-auto object-contain"
                />
            </div>
        </div>
    </PageHeader>


    

    <PricingModelList/>

    <CareerBanner />





    
    






    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>







    






    
    
    </>
  )
}
