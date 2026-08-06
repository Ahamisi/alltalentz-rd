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
    src: "/v26-images/talentz-pages/finance/hero-1.webp",
    alt: "Finance professional reviewing a statement beside her laptop",
    pos: "50% 35%",
  },
  {
    src: "/v26-images/talentz-pages/finance/hero-2.webp",
    alt: "Accountant working through paperwork with a calculator and laptop",
    pos: "45% 50%",
  },
  {
    src: "/v26-images/talentz-pages/finance/hero-3.webp",
    alt: "Two envelopes marked PAID and DUE beside a calculator",
    pos: "50% 50%",
  },
];

const ROLES: RoleCard[] = [
  {
    src: "/v26-images/talentz-pages/finance/role-1.webp",
    alt: "Bookkeeper running figures on a calculator next to a written ledger",
    title: "Bookkeeper",
    description: "Keeps your records clean and audit-ready.",
  },
  {
    src: "/v26-images/talentz-pages/finance/role-2.webp",
    alt: "Two colleagues going over a company invoice on a clipboard",
    title: "AR/AP Specialist",
    description: "Protects your cash flow and vendor relations.",
  },
  {
    src: "/v26-images/talentz-pages/finance/role-3.webp",
    alt: "Analyst reading financial charts across a bank of monitors",
    title: "Financial Analyst",
    description: "Delivers reporting to support better decisions.",
  },
];

const WHY_IT_MATTERS: WhyItMattersCard[] = [
  {
    stat: "AR backlogs cost US businesses billions yearly.",
    src: "/v26-images/talentz-pages/finance/why-1.webp",
    alt: "A desk covered in unsorted receipts, cash and a calculator",
  },
  {
    stat: "Finance roles see high annual staff turnover.",
    src: "/v26-images/talentz-pages/finance/why-2.webp",
    alt: "A handshake across a desk at the end of a hiring interview",
  },
];

export default function FinanceTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <TalentHero
        title="Trained finance professionals."
        titleAccent="Within 7 days."
        description="Clean books. Healthy cash flow. Lower costs."
        cta={{ text: "Get Talentz", url: "/request-talent" }}
        cards={HERO_CARDS}
      />

      <RolesWePlace
        title="Roles We Place in Finance"
        roles={ROLES}
        ctaLabel="Get Finance Talent"
      />

      <WhyItMatters cards={WHY_IT_MATTERS} />

      <WhatWeBring />

      <ClientTestimonial />

      <ReadyToBuild />
    </main>
  );
}
