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
export default function Home() {

   
 

  return (
    <>

    <HeroNew/>



    {/* our value proposition */}
    <ValueProp/>




    {/* vetted niche */}
    <NicheSection/>



    {/* alltalentz agency */}
    <TheAgency/>

    {/* conference Video */}
    <ConferenceVideo/>

    {/* how we work */}
    <HowWeWork/>


    <OurClients/>









        {/* testimonial */}
    <section className="relative bg-cover bg-center bg-no-repeat text-[#282828] py-[50px] md:py-[70px] px-[40px] md:px-0" style={{ backgroundImage: "url('/home-img/testimonial.jpg')" }}>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div> */}
        <div className="relative inset-0 flex flex-col items-center justify-center text-[#282828]">
          <h2 className="text-2xl md:text-[45px] md:leading-[62px] font-bold mb-8 text-center">
          What our Partners say          </h2>
            <div className="w-[100%] md:w-[65%] md:max-8xl mx-auto flex flex-col md:flex-row items-center">
              <TestimonialSlider/>
            </div>
              
            
        </div>      
    </section>



    <section className="px-[30px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>







    






    
    
    </>
  )
}
