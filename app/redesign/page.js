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









    <MainTestimony/>


    <section className="px-[10px] md:px-0 bg-[#131313]">
      <MainFooter/>
    </section>







    






    
    
    </>
  )
}
