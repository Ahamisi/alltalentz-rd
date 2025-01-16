import ClientWords from "@/components/homeRD/ClientWords";
import ClientVideos from "@/components/homeRD/ClientVideos";
import Milestone from "@/components/homeRD/Milestone";
import Team from "@/components/homeRD/Team";
import MainFooter from "@/components/MainFooter";
import PageHeader from "@/components/PageHeader";

export default function About() {
  const successVideos = [
    {
      videoUrl: "https://youtu.be/NeVJwPh3GZ0",
      id: 1,
    },
    {
      videoUrl: "https://youtu.be/ze9eSdRedt0",
      id: 2,
    },
    {
      videoUrl: "https://youtu.be/aN_0I5tN5Eo",
      id: 3,
    },
    {
      videoUrl: "https://youtu.be/_Vx_xNe4TdA",
      id: 4,
    },
    {
      videoUrl: "https://youtu.be/p5F-iGADZRI",
      id: 5,
    },
  ];

  return (
    <main className="relative overflow-hidden overflow-y-hidden" >
    
        
    <PageHeader showBg={false}>
        <div className="max-w-7xl mx-auto px-4 lg:flex relative h-[100%] items-center py-20">
            {/* Left Column */}
            <div className="lg:w-[45%] flex flex-col">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
                We have Stories to <span className="text-[#FFB300]">inspire you</span>
                </h1>
                    
               
            </div>

            {/* Right Column - Map */}
            <div className="hidden lg:block lg:w-[55%] pl-12">
                <img
                    src="/redesign-25/success-stories.png"
                    alt="Success Stories"
                    className="w-full h-[400px] object-contain"
                    // className="w-full h-auto object-contain"
                />
            </div>
        </div>
    </PageHeader>


    
    <ClientVideos 
      title="Success Stories"
      description="Hear from our successful clients about their journey with us."
      videos={successVideos}
    />

    <ClientWords 
      title="What Our Clients Say"
      description="Hear directly from our clients about their experiences"
      theme="light"
      testimonials={[
        {
          name: "Robert Jordan",
          company: "Puroclean of Lynwood",
          location: "Washington, USA",
          companyLogo: '/clients/puroclean-icon.png',
          quote: "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella.",
          thankYou: "Thank you!"
        },
        {
          quote: "Hiring from All Talentz has helped take a lot of pressure off, and allowed me to focus more on administrative tasks, it’s been fantastic so far",
          name: "Bryan Towne",
          company: "Puroclean of Lynwood",
          companyLogo: '/clients/puroclean-icon.png',
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"

        },
        {
          quote: "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella.",
          name: "Robert Jordan",
          company: "Puroclean of Lynwood",
          location: "Puroclean of Lynwood, Washington, USA",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "The reliability, accountability, accuracy and communication style at AllTalentz has been very top notch.",
          name: "Johnetta Johnson",
          location: "SVP Operations, Alacrity Solutions.",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "The reliability, accountability, accuracy and communication style at AllTalentz has been very top notch.",
          name: "Craig Hawkins",
          location: "Owner, Puroclean of Redmond",
          company: "Puroclean of Lynwood",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
          name: "Robert Jordan",
          location: "Puroclean of Lynwood, Washington, USA",
          company: "Puroclean of Lynwood",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "It's been amazing; I appreciate the tenacity and the focus and the drive to keep learning and growing and getting things done",
          name: "Jenny Hawkins",
          location: "Puroclean of Redmond",
          company: "Puroclean of Redmond",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "Hiring from All Talentz has helped take a lot of pressure off, and allowed me to focus more on administrative tasks, it's been fantastic so far",
          name: "Bryan Towne",
          location  : "Puroclean of Burlington, USA",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
          name: "Robert Jordan",
          location: "Puroclean of Lynwood, Washington, USA",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
          name: "Robert Jordan",
          location: "Puroclean of Lynwood, Washington, USA",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
        {
          quote: "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella. Thank you!",
          name: "Robert Jordan",
          location: "Puroclean of Lynwood, Washington, USA",
          companyLogo: '/clients/puroclean-icon.png',
          thankYou: "Thank you!"
        },
      ]}
    />

    






    <section className="px-[10px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>







    






    
    
    </main>
  )
}
