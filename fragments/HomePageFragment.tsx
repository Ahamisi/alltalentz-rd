import MainFooter from "@/components/MainFooter";
import HeroNew from "@/components/HeroNew";
import ValueProp from "@/components/homeRD/ValueProp";
import NicheSection from "@/components/homeRD/Niches";
import TheAgency from "@/components/homeRD/TheAgency";
import ConferenceVideo from "@/components/homeRD/ConferenceVideo";
import HowWeWork from "@/components/homeRD/HowWeWork";
import OurClients from "@/components/homeRD/OurClients";
import MainTestimony from "@/components/homeRD/MainTestimony";
import Faq from "@/components/homeRD/Faq";
import PdpModal from "@/components/PdpModal";
import BootcampModal from "@/components/BootcampModal";
import { homepageFAQs } from "@/lib/homepage-faqs";

export default function Home() {
  const clientVideos = [
    {
      id: 1,
      videoUrl: "https://youtu.be/p5F-iGADZRI",
    },
    {
      id: 2,
      videoUrl: "https://youtu.be/ze9eSdRedt0",
    },
    {
      id: 3,
      videoUrl: "https://youtu.be/NeVJwPh3GZ0",
    },
    {
      id: 4,
      videoUrl: "https://youtu.be/aN_0I5tN5Eo",
    },
    {
      id: 5,
      videoUrl: "https://youtu.be/_Vx_xNe4TdA",
    },
  ];

  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <section className="xs:px-0 sm:px-[30px] md:px-0">
        <HeroNew />
      </section>

      {/* our value proposition */}
      <ValueProp />

      {/* vetted niche */}
      <NicheSection />

      {/* alltalentz agency */}
      <TheAgency />

      {/* conference Video */}
      {/* <ConferenceVideo
        title="Take a first glance about all Talentz"
        description="Here are some video clips from our Clients"
        videos={clientVideos}
      /> */}

      {/* how we work */}
      <HowWeWork />

      <OurClients />

      {/* <MainTestimony /> */}

      <ConferenceVideo
        title="What our partners say"
        description="Here are some video clips from our Clients"
        videos={clientVideos}
      />

      <Faq
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services"
        faqs={homepageFAQs}
      />

      <section className="px-[10px] md:px-0 bg-[#131313]">
        <MainFooter />
      </section>

      <PdpModal />
      <BootcampModal />
    </main>
  );
}
