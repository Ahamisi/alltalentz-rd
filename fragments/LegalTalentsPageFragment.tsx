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
    src: "/v26-images/talentz-pages/legal/hero-1.webp",
    alt: "Legal professional reading through a case file beside her desk",
    pos: "50% 35%",
  },
  {
    src: "/v26-images/talentz-pages/legal/hero-2.webp",
    alt: "Two attorneys at a firm's boardroom table with the scales of justice",
    pos: "50% 45%",
  },
  {
    src: "/v26-images/talentz-pages/legal/hero-3.webp",
    alt: "A laptop on an office desk beside a brass set of justice scales",
    pos: "50% 50%",
  },
];

const ROLES: RoleCard[] = [
  {
    src: "/v26-images/talentz-pages/legal/role-1.webp",
    alt: "Paralegal reviewing a bundle of documents at a bright office desk",
    title: "Paralegal",
    description: "Supports case prep, legal research, and documentation.",
  },
  {
    src: "/v26-images/talentz-pages/legal/role-2.webp",
    alt: "Assistant taking a call while working on a laptop in an open-plan office",
    title: "Legal Virtual Assistant",
    description:
      "Handles scheduling so attorneys can focus on billable work.",
  },
  {
    src: "/v26-images/talentz-pages/legal/role-3.webp",
    alt: "Transcriptionist in a headset typing at a desktop computer",
    title: "Transcriptionist",
    description:
      "Delivers accurate, confidential transcription of proceedings.",
  },
];

const WHY_IT_MATTERS: WhyItMattersCard[] = [
  {
    stat: "Paralegal costs are rising fast in US firms.",
    src: "/v26-images/talentz-pages/legal/why-1.webp",
    alt: "A hand resting on a law book stacked on a desk",
  },
  {
    stat: "Document backlogs cause most missed deadlines.",
    src: "/v26-images/talentz-pages/legal/why-2.webp",
    alt: "Someone searching through a drawer of filed documents",
  },
];

export default function LegalTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <TalentHero
        title="Vetted legal support professionals."
        titleAccent="Within 7 days."
        description="Cut costs. Maintain compliance. Meet every deadline."
        cta={{ text: "Get Talentz", url: "/request-talent" }}
        cards={HERO_CARDS}
      />

      <RolesWePlace
        title="Roles We Place in Legal"
        roles={ROLES}
        ctaLabel="Get Legal Talent"
      />

      <WhyItMatters cards={WHY_IT_MATTERS} />

      <WhatWeBring />

      <ClientTestimonial />

      <ReadyToBuild />
    </main>
  );
}
