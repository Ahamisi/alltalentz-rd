import MainFooter from "@/components/MainFooter";
import HealthcareTalents from "@/components/homeRD/healthcareTalents";
import TalentHero, { type TalentHeroCard } from "@/components/shared/TalentHero";
import RolesWePlace, { type RoleCard } from "@/components/shared/RolesWePlace";
import WhyItMatters, {
  type WhyItMattersCard,
} from "@/components/shared/WhyItMatters";
import WhatWeBring from "@/components/shared/WhatWeBring";
import ClientTestimonial from "@/components/shared/ClientTestimonial";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

const HERO_CARDS: TalentHeroCard[] = [
  {
    src: "/v26-images/talentz-pages/healthcare/hero-1.webp",
    alt: "Clinician in scrubs presenting patient data on a tablet",
    pos: "50% 20%",
  },
  {
    src: "/v26-images/talentz-pages/healthcare/hero-2.webp",
    alt: "Two clinicians reviewing an X-ray together",
    pos: "10% 50%",
  },
  {
    src: "/v26-images/talentz-pages/healthcare/hero-3.webp",
    alt: "A medical invoice open on a tablet beside a payment card",
    pos: "35% 50%",
  },
];

const ROLES: RoleCard[] = [
  {
    src: "/v26-images/talentz-pages/healthcare/role-1.webp",
    alt: "Billing specialist at a laptop, checking a printed bar-chart statement against his screen",
    title: "Medical Billing Specialist",
    formValue: "Medical Billing Specialists",
    description: "Handles claims, denial management, and AR follow-up.",
  },
  {
    src: "/v26-images/talentz-pages/healthcare/role-2.webp",
    alt: "A nurse in scrubs and a doctor in a white coat going over records on a tablet in a hospital corridor",
    title: "Revenue Cycle Manager",
    formValue: "Revenue Cycle Managers",
    description: "Oversees billing cycles and reduces denial rates.",
  },
  {
    src: "/v26-images/talentz-pages/healthcare/role-3.webp",
    alt: "Administrator in an open-plan office pointing at a laptop screen while a colleague works nearby",
    title: "Healthcare Administrator",
    formValue: "Healthcare Admins",
    description: "Manages scheduling, records, and daily operations.",
  },
  {
    src: "/v26-images/talentz-pages/healthcare/role-4.webp",
    alt: "Clinician in scrubs entering patient records at a hospital workstation",
    title: "HIPAA-Compliant Support",
    formValue: "HIPAA-Compliant Support",
    description: "Handles patient data under strict HIPAA protocols.",
  },
];

const WHY_IT_MATTERS: WhyItMattersCard[] = [
  {
    stat: "1 in 7 U.S. claims is denied on first submission.",
    src: "/v26-images/talentz-pages/healthcare/why-1.webp",
    alt: "Medical health care and pharmacy paperwork beside a stethoscope",
  },
  {
    stat: "Billing staff turnover exceeds 30% annually.",
    src: "/v26-images/talentz-pages/healthcare/why-1.webp",
    alt: "Medical claim forms spread across a desk with a stethoscope on top",
  },
];

export default function HealthcareTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <TalentHero
        title="HIPAA-certified medical billing specialists."
        titleAccent="In under 48 hours."
        description="Reduce denials. Clear backlogs. Cut costs by up to 75%."
        cta={{ text: "Get Healthcare Talent", url: "/request-talent" }}
        cards={HERO_CARDS}
      />

      <RolesWePlace
        title="Roles We Place in Healthcare"
        roles={ROLES}
        industry="Healthcare"
        ctaLabel="Get Healthcare Talent"
      />

      <WhyItMatters cards={WHY_IT_MATTERS} />

      <WhatWeBring />

      <ClientTestimonial />

      <ReadyToBuild/>
    </main>
  );
}
