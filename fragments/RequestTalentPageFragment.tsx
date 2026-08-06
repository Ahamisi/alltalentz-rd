import MainFooter from "@/components/MainFooter";
import Certifications from "@/components/homeRD/Certifications";
import RequestTalentHero from "@/components/request-talentz/request-talent-hero";
import RequestTalentForm from "@/components/request-talentz/request-talent-form";
import WhatHappensNext from "@/components/request-talentz/what-happens-next";
import ReadyToBuild from "@/components/shared/ReadyToBuild";
import CallToAction from "@/components/homeRD/CallToAction";
import RequestTalentTestimonials from "@/components/request-talentz/testimonials";

export default function RequestTalent() {
  return (
    <>
      <RequestTalentHero />
      <Certifications />
      <RequestTalentForm />
      <RequestTalentTestimonials />
      {/* <WhatHappensNext /> */}
      <CallToAction heading="Prefer to talk first?" text="Book a call" url="/contact-us"/>
      <ReadyToBuild/>
    </>
  );
}
