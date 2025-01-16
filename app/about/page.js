import Milestone from "@/components/homeRD/Milestone";
import MobileMilestone from "@/components/homeRD/MobileMilestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";

export default function About() {


 

  return (
    <main className="relative overflow-hidden overflow-y-hidden" >
    
        
    <PageHeader about={true} showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
            {/* Left Column */}
            <div className="lg:w-[45%] flex flex-col">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
                    The Best <span className="text-[#FFB300]">Value<br/>Solution</span> for your<br/>workforce needs.
                </h1>
                    
                <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl">
                    All Talentz is more than just a recruitment company; We connect you with the best remote talent in Africa. Whether you need skilled, experienced, or reliable talent, we have the perfect match for you. And the best part is, you get amazing value for your money!
                </p>
            </div>

            {/* Right Column - Map */}
            <div className="hidden lg:block lg:w-[55%] pl-12">
                <img
                    src="/african-maps.png"
                    alt="Global Talent Map"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>
    </PageHeader>


    
    {/* our value proposition */}
    <section className="relative bg-white py-20 px-4 bg-[url('/redesign-25/backgrounds/partners.svg')] bg-center bg-cover bg-no-repeat">
      <div className="max-w-7xl mx-auto">
        {/* Icon and Mission Statement */}
        <div className="mb-16">
          <img 
            src="/icons/target.svg" 
            alt="Mission Target" 
            className="w-16 h-16 mb-6"
          />
          <h2 className="text-4xl md:text-4xl font-bold mb-8 text-black">
            Our Mission
          </h2>
          <p className="text-2xl md:text-3xl lg:text-2xl leading-tight max-w-5xl">
            <span className="text-[#FFB300]">To utilize our talent solutions and technology expertise</span>
            <span className="text-black"> to develop cutting edge products for businesses across several industries</span>
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-[#F99621] rounded-xl p-8 text-white">
            <div className="text-5xl font-bold mb-2">100+</div>
            <div className="text-xl">Clients</div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-[#F99621] rounded-xl p-8 text-white">
            <div className="text-5xl font-bold mb-2">50+</div>
            <div className="text-xl">Locations</div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-[#F99621] rounded-xl p-8 text-white">
            <div className="text-5xl font-bold mb-2">99%</div>
            <div className="text-xl">Positive feedbacks</div>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-[#F99621] rounded-xl p-8 text-white">
            <div className="text-5xl font-bold mb-2">5000+</div>
            <div className="text-xl">Quality Professionals</div>
          </div>
        </div>
      </div>
    </section>



    <section className="relative bg-white py-24 px-4  bg-[url('/redesign-25/backgrounds/frame-pattern-1.svg')] bg-center bg-cover bg-no-repeat">

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-16 text-[#121212]">
          Our core Value
        </h2>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service */}
          <div className="p-6 rounded-[8px] border border-[#EBEBF0]">
            <div className="mb-6">
              <img src="/icons/service.svg" alt="Service" className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#121212]">Service</h3>
            <p className="text-gray-600 leading-relaxed">
              We're dedicated to providing exceptional service by focusing on what truly matters. We don't overcomplicate solutions or chase unnecessary features. We deliver clear and efficient service, meeting your needs without wasted effort.
            </p>
          </div>

          {/* Growth */}
          <div className="p-6 rounded-[8px] border border-[#EBEBF0]">
            <div className="mb-6">
              <img src="/icons/growth.svg" alt="Growth" className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#121212]">Growth</h3>
            <p className="text-gray-600 leading-relaxed">
              Our approach to growth is purposeful and deliberate. Growth drives us to improve and evolve continuously. We focus on sustainable progress, embracing opportunities to advance while keeping our core values intact
            </p>
          </div>

          {/* Professionalism */}
          <div className="p-6 rounded-[8px] border border-[#EBEBF0]">
            <div className="mb-6">
              <img src="/icons/professionalism.svg" alt="Professionalism" className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#121212]">Professionalism</h3>
            <p className="text-gray-600 leading-relaxed">
              We embody professionalism by streamlining our efforts and avoiding distractions. We deliver high-quality work with integrity, focus, and respect, ensuring excellence and building trust in every interaction.
            </p>
          </div>

          {/* Consistency */}
          <div className="p-6 rounded-[8px] border border-[#EBEBF0]">
            <div className="mb-6">
              <img src="/icons/consistency.svg" alt="Consistency" className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#121212]">Consistency</h3>
            <p className="text-gray-600 leading-relaxed">
              Consistency is key to our success. We deliver reliable results by maintaining clear, steady practices and adapting as needed to uphold our standards.
            </p>
          </div>

          {/* Integrity */}
          <div className="p-6 rounded-[8px] border border-[#EBEBF0]">
            <div className="mb-6">
              <img src="/icons/integrity.svg" alt="Integrity" className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#121212]">Integrity</h3>
            <p className="text-gray-600 leading-relaxed">
              Integrity guides our actions. We make honest decisions and stay true to our values, ensuring transparency and trust in everything we do.
            </p>
          </div>

          {/* Discipline */}
          <div className="p-6 rounded-[8px] border border-[#EBEBF0]">
            <div className="mb-6">
              <img src="/icons/discipline.svg" alt="Discipline" className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#121212]">Discipline</h3>
            <p className="text-gray-600 leading-relaxed">
              Discipline guides our work. We avoid the pitfalls of over-engineering and unnecessary features, maintaining a clear and focused approach. We ensure that every decision is made with purpose and precision.
            </p>
          </div>
        </div>
      </div>
    </section>




    {/* Desktop Milestone (hidden on mobile) */}
    <div className="hidden md:block">
      <Milestone />
    </div>

    {/* Mobile Milestone (hidden on desktop) */}
    <div className="block md:hidden">
      <MobileMilestone />
    </div>



    <Team/>




    






    <section className="px-[10px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>







    






    
    
    </main>
  )
}
