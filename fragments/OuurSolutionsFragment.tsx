import ReadyToBuild from "@/components/shared/ReadyToBuild";
import Faq from "@/components/shared/Faq";
import SolutionsHero from "@/components/our-solutions/solutions-hero";
import TheModel from "@/components/our-solutions/the-model";
import WhatsIncluded from "@/components/our-solutions/whats-included";
import Pricing from "@/components/our-solutions/pricing";
import { solutionsFAQs } from "@/lib/solutions-faqs";

export default function OurSolutions() {
  return (
    <>
      {/* Hero */}
      <SolutionsHero />

      {/* The Model */}
      <TheModel />

      {/* What's included */}
      <WhatsIncluded />

      {/* Pricing */}
      <Pricing />

      <Faq
        faqs={solutionsFAQs}
        primaryCta={{ text: "Request Talent", url: "/request-talent" }}
        secondaryCta={{ text: "Talk to Our Team", url: "tel:+16145021440" }}
      />

      <ReadyToBuild />
    </>
  );
}
