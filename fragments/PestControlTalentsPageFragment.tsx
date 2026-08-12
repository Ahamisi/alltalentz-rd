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
    src: "/v26-images/talentz-pages/pest-control/hero-1.webp",
    alt: "Back-office coordinator working on a laptop in a bright office",
    pos: "50% 35%",
  },
  {
    src: "/v26-images/talentz-pages/pest-control/hero-2.webp",
    alt: "Pest control technician fogging the exterior of a property",
    pos: "45% 55%",
  },
  {
    src: "/v26-images/talentz-pages/pest-control/hero-3.webp",
    alt: "Two support agents in headsets taking customer calls",
    pos: "40% 50%",
  },
];

const ROLES: RoleCard[] = [
  {
    src: "/v26-images/talentz-pages/pest-control/role-1.webp",
    alt: "Administrator sorting through paperwork at an office desk",
    title: "Admin Support",
    description:
      "Manages daily operations, paperwork, and back-office tasks.",
  },
  {
    src: "/v26-images/talentz-pages/pest-control/role-2.webp",
    alt: "Coordinator planning the week's schedule at a computer",
    title: "Scheduling Coordinator",
    description: "Organizes routes and technician calendars for efficiency.",
  },
  {
    src: "/v26-images/talentz-pages/pest-control/role-3.webp",
    alt: "Customer service agent in a headset ready to take a call",
    title: "Customer Service Agent",
    description:
      "Handles inquiries and keeps clients satisfied and retained.",
  },
];

const WHY_IT_MATTERS: WhyItMattersCard[] = [
  {
    stat: "Technicians lose 30% of time to admin work.",
    src: "/v26-images/talentz-pages/pest-control/why-1.webp",
    alt: "Technician in protective gear treating the inside of a home",
  },
  {
    stat: "Poor scheduling drives most missed appointments.",
    src: "/v26-images/talentz-pages/pest-control/why-2.webp",
    alt: "A pen circling a date on a desk calendar",
  },
];

export default function PestControlTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <TalentHero
        title="Back-office support for pest control."
        titleAccent="In under 48 hours."
        description="Free your field team. Let us handle the admin."
        cta={{ text: "Get Pest Control Talentz", url: "/request-talent" }}
        cards={HERO_CARDS}
      />

      <RolesWePlace
        title="Roles We Place in Pest Control"
        roles={ROLES}
        industry="Pest Control"
        ctaLabel="Get Pest Control Talent"
      />

      <WhyItMatters cards={WHY_IT_MATTERS} />

      <WhatWeBring />

      <ClientTestimonial />

      <ReadyToBuild />
    </main>
  );
}
