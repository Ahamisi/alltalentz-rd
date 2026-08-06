import ReadyToBuild from "@/components/shared/ReadyToBuild";
import Faq from "@/components/shared/Faq";
import SolutionsHero from "@/components/our-solutions/solutions-hero";
import TheModel from "@/components/our-solutions/the-model";
import WhatsIncluded from "@/components/our-solutions/whats-included";
import Pricing from "@/components/our-solutions/pricing";
import { solutionsFAQs } from "@/lib/solutions-faqs";

export default function OurSolutions() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      {/* Hero — "One model. Total clarity." */}
      <SolutionsHero />

      {/* The Model — Request → Match → Deploy → Support */}
      <TheModel />

      {/* What's included — six guarantee cards on dark */}
      <WhatsIncluded />

      {/* Pricing — local hire vs All Talentz */}
      <Pricing />

      <Faq
        faqs={solutionsFAQs}
        primaryCta={{ text: "Get a Custom Quote", url: "/request-talent" }}
        secondaryCta={{ text: "Talk to Our Team", url: "/contact" }}
      />

      <ReadyToBuild />
    </main>
  );
}
