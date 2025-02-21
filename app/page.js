import Clients from "@/components/Clients";
import Hero from "@/components/Hero";
import MainFooter from "@/components/MainFooter";
import Offerings from "@/components/Offerings";
import ClientCarousel from "@/components/ClientSlider";
import TestimonialSlider from "@/components/TestimonialSlider";
import Btn from "@/components/Btn";
import Header from "@/components/Header";

import Link from "next/link";
import HeroNew from "@/components/HeroNew";
import ValueProp from "@/components/homeRD/ValueProp";
import NicheSection from "@/components/homeRD/Niches";
import TheAgency from "@/components/homeRD/TheAgency";
import ConferenceVideo from "@/components/homeRD/ConferenceVideo";
import HowWeWork from "@/components/homeRD/HowWeWork";
import OurClients from "@/components/homeRD/OurClients";
import MainTestimony from "@/components/homeRD/MainTestimony";
import Faq from "@/components/homeRD/Faq";
export default function Home() {


  const clientVideos = [
    {
      id: 1,
      videoUrl: 'https://youtu.be/p5F-iGADZRI',
    },
    {
      id: 2,
      videoUrl: 'https://youtu.be/ze9eSdRedt0',
    },
    {
      id: 3,
      videoUrl: 'https://youtu.be/NeVJwPh3GZ0',
    },
    {
      id: 4,
      videoUrl: 'https://youtu.be/aN_0I5tN5Eo',
    },
    {
      id: 5,
      videoUrl: 'https://youtu.be/_Vx_xNe4TdA',
    },
  ];

   
  
 

  return (
    <main className="relative overflow-hidden overflow-y-hidden">


<section className="xs:px-0 sm:px-[30px] md:px-0">
  <HeroNew/>
</section>



    {/* our value proposition */}
    <ValueProp/>




    {/* vetted niche */}
    <NicheSection/>



    {/* alltalentz agency */}
    <TheAgency/>

    {/* conference Video */}
    <ConferenceVideo
      title="Take a first glance about all Talentz"
      description="Here are some video clips from our Clients"
      videos={clientVideos}
    />

    {/* how we work */}
    <HowWeWork/>


    <OurClients/>









    <MainTestimony/>

    <Faq 
      title="Frequently Asked Questions"
      description="Find answers to common questions about our services"
      faqs={[
        {
          question: "What is All Talentz?",
          answer: "All Talentz connects Employers with highly skilled remote workers from Africa at a low cost. Our service is flexible and helps you grow your business with the right talent for your needs."
        },
        {
          question: "Is All Talentz a Job Board?",
          answer: "All Talentz is more than a job board. It is a platform that connects you with the best Talents for your specific needs. Whether you are looking for talent in a certain industry, skill, or role, we have a curated pool of qualified professionals ready to work with you. You don't have to waste time browsing through resumes or posting ads. Just tell us what you need and we will match you with the right talent."
        },
        {
          question: "Can I find any type of Remote Talent here?",
          answer: "At All Talentz, we offer a range of Talents for various needs, such as Administrative, Digital, Software development and Marketing roles. If you need Talents for other roles that are not listed on our website, you can contact us for a customised role and we will find a suitable professional for you.",
        },
        {
          question: "My needs aren't fully remote, more of hybrid; What do I do ?",
          answer: "All Talentz only provides remote workers for various businesses at the moment. However, we can discuss your hybrid needs and might be able to work with you on an Immigration visa for on-site talent that suits your specific situation."
        },
     
        // ... more general FAQs
      ]}
    />


    <section className="px-[10px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>







    






    
    
    </main>
  )
}
