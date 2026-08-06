import TalentHero, { type TalentHeroCard } from "@/components/shared/TalentHero";
import RolesWePlace, { type RoleCard } from "@/components/shared/RolesWePlace";
import WhyItMatters, {
  type WhyItMattersCard,
} from "@/components/shared/WhyItMatters";
import WhatWeBring from "@/components/shared/WhatWeBring";
import ClientTestimonial from "@/components/shared/ClientTestimonial";
import ReadyToBuild from "@/components/shared/ReadyToBuild";

// Photo deck, left → right; the middle card sits on top of the fan.
// hero-1 is portrait and hero-2/3 are landscape, so `pos` is the crop that
// keeps each subject inside the tall card.
const HERO_CARDS: TalentHeroCard[] = [
  {
    src: "/v26-images/talentz-pages/construction/hero-1.webp",
    alt: "Site worker in a hard hat and high-vis vest on a construction site",
    pos: "50% 35%",
  },
  {
    src: "/v26-images/talentz-pages/construction/hero-2.webp",
    alt: "Two engineers in hard hats unrolling drawings on site",
    pos: "50% 50%",
  },
  {
    src: "/v26-images/talentz-pages/construction/hero-3.webp",
    alt: "A detailed architectural floor plan with dimensions",
    pos: "50% 50%",
  },
];

const ROLES: RoleCard[] = [
  {
    src: "/v26-images/talentz-pages/construction/role-1.webp",
    alt: "Estimator in a hard hat presenting a floor plan on a large screen",
    title: "Estimator",
    description: "Produces accurate estimates to win more bids.",
  },
  {
    src: "/v26-images/talentz-pages/construction/role-2.webp",
    alt: "Site administrator holding drawings up against a wall on site",
    title: "Project Administrator",
    description: "Handles docs and scheduling for your site team.",
  },
  {
    src: "/v26-images/talentz-pages/construction/role-3.webp",
    alt: "Back-office specialist working through invoices with a calculator and laptop",
    title: "AR Specialist",
    description: "Manages invoicing to protect project cash flow.",
  },
];

const WHY_IT_MATTERS: WhyItMattersCard[] = [
  {
    stat: "Estimating delays costs firms bids they can't recover.",
    src: "/v26-images/talentz-pages/construction/why-1.webp",
    alt: "A scale ruler resting on a set of proposed building plans",
  },
  {
    stat: "Admin overload is a top cause of project delays.",
    src: "/v26-images/talentz-pages/construction/why-2.webp",
    alt: "Someone filling in a weekly planner at a desk",
  },
];

export default function RemediationTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <TalentHero
        title="ATRA-certified construction support."
        titleAccent="Within 7 days."
        description="Keep your bids moving. Keep your back office lean."
        cta={{ text: "Get Talentz", url: "/request-talent" }}
        cards={HERO_CARDS}
      />

      <RolesWePlace
        title="Roles We Place in Construction"
        roles={ROLES}
        ctaLabel="Get Construction Talent"
      />

      <WhyItMatters cards={WHY_IT_MATTERS} />

      <WhatWeBring />

      <ClientTestimonial />

      <ReadyToBuild />
    </main>
  );
}
