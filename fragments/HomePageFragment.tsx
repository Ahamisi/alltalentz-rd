import Footer from "@/components/shared/Footer";
import HeroNew from "@/components/HeroNew";
import ValueProp from "@/components/homeRD/ValueProp";
import NicheSection from "@/components/homeRD/Niches";
import TheAgency from "@/components/homeRD/TheAgency";
import ConferenceVideo from "@/components/homeRD/ConferenceVideo";
import HowWeWork from "@/components/homeRD/HowWeWork";
import OurClients from "@/components/homeRD/OurClients";
import KeyStats from "@/components/homeRD/KeyStats";
import OnePartner from "@/components/homeRD/OnePartner";
import CallToAction from "@/components/homeRD/CallToAction";
import ReadyToBuild from "@/components/shared/ReadyToBuild";
import ClientWords from "@/components/homeRD/ClientWords";
import Certifications from "@/components/homeRD/Certifications";
import MainTestimony from "@/components/homeRD/MainTestimony";
import Faq from "@/components/homeRD/Faq";
import PdpModal from "@/components/PdpModal";
import BootcampModal from "@/components/BootcampModal";
import { homepageFAQs } from "@/lib/homepage-faqs";
import { homepageTestimonials } from "@/lib/homepage-testimonials";

export default function Home() {
  // const clientVideos = [
  //   {
  //     id: 1,
  //     videoUrl: "https://youtu.be/p5F-iGADZRI",
  //   },
  //   {
  //     id: 2,
  //     videoUrl: "https://youtu.be/ze9eSdRedt0",
  //   },
  //   {
  //     id: 3,
  //     videoUrl: "https://youtu.be/NeVJwPh3GZ0",
  //   },
  //   {
  //     id: 4,
  //     videoUrl: "https://youtu.be/aN_0I5tN5Eo",
  //   },
  //   {
  //     id: 5,
  //     videoUrl: "https://youtu.be/_Vx_xNe4TdA",
  //   },
  // ];

  return (
    <>
      {/* Hero */}
      <HeroNew/>

      {/* certifications */}
      <Certifications />

      {/* vetted niche */}
      <NicheSection />

      {/* Our Clients */}
      <OurClients />

      {/* how we work */}
      <HowWeWork />

      {/* call to action */}
      <CallToAction text="Get Started" url="/request-talent" />

      {/* client testimonials */}
      <ClientWords
        title={
          <>
            What Our <span className="text-[#F99621]">Clients Say</span>
          </>
        }
        theme="light"
        testimonials={homepageTestimonials}
      />

      {/* key stats */}
      <KeyStats />

      {/* one partner, every solution */}
      <OnePartner />

      {/* ready to build your remote team */}
      <ReadyToBuild />

      {/* <PdpModal /> */}
      {/* <BootcampModal /> */}
    </>
  );
}
