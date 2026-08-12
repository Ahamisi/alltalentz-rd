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
    src: "/v26-images/talentz-pages/tech/hero-1.webp",
    alt: "Developer coding at a desktop workstation in a colourful open-plan office",
    pos: "50% 40%",
  },
  {
    src: "/v26-images/talentz-pages/tech/hero-2.webp",
    alt: "A product team reviewing code together around a bank of laptops",
    pos: "45% 50%",
  },
  {
    src: "/v26-images/talentz-pages/tech/hero-3.webp",
    alt: "Close-up of a laptop screen full of code as an engineer types",
    pos: "55% 50%",
  },
];

const ROLES: RoleCard[] = [
  {
    src: "/v26-images/talentz-pages/tech/role-1.webp",
    alt: "Engineer working across a monitor and a laptop, both filled with code",
    title: "AI/ML Engineer",
    formValue: "AI/Machine Learning Engineer",
    description: "Builds and trains models for your product.",
  },
  {
    src: "/v26-images/talentz-pages/tech/role-2.webp",
    alt: "Analyst labelling data across a row of dashboard screens",
    title: "Data Annotator",
    description: "Creates the training data your models need.",
  },
  {
    src: "/v26-images/talentz-pages/tech/role-3.webp",
    alt: "Software developer writing code at a multi-monitor desk",
    title: "Software Developer",
    formValue: "Software Dev",
    description: "Ships clean, reliable code across your stack.",
  },
  {
    src: "/v26-images/talentz-pages/tech/role-4.webp",
    alt: "Support agent in a headset smiling at her desk on a busy support floor",
    title: "IT Support",
    description: "Keeps your systems, devices, and users running.",
  },
  {
    src: "/v26-images/talentz-pages/tech/role-5.webp",
    alt: "Designer laying out screens on a desktop machine in a studio office",
    title: "UI/UX Designer",
    formValue: "UI/UX",
    description: "Designs interfaces your customers enjoy using.",
  },
  {
    src: "/v26-images/talentz-pages/tech/role-6.webp",
    alt: "Marketing team working through a campaign together around a boardroom table of laptops",
    title: "Digital Marketer",
    formValue: "Digital Marketing",
    description: "Runs campaigns that bring in qualified leads.",
  },
];

const WHY_IT_MATTERS: WhyItMattersCard[] = [
  {
    stat: "US AI engineer salaries average $160K+ yearly.",
    src: "/v26-images/talentz-pages/tech/why-1.webp",
    alt: "Payroll paperwork, cash and a calculator spread across a desk",
  },
  {
    stat: "Most AI roles take 90+ days to fill.",
    src: "/v26-images/talentz-pages/tech/why-2.webp",
    alt: "A hiring manager reading a candidate's CV across the interview table",
  },
];

export default function TechTalentsPage() {
  return (
    <main className="relative overflow-hidden overflow-y-hidden">
      <TalentHero
        title="Pre-vetted AI and tech talent."
        titleAccent="In under 48 hours."
        description="Scale your team without the salary overhead."
        cta={{ text: "Get Tech Talentz", url: "/request-talent" }}
        cards={HERO_CARDS}
      />

      <RolesWePlace
        title="Roles We Place in Technology"
        roles={ROLES}
        industry="Technology"
        ctaLabel="Get Tech Talent"
      />

      <WhyItMatters cards={WHY_IT_MATTERS} />

      <WhatWeBring />

      <ClientTestimonial />

      <ReadyToBuild />
    </main>
  );
}
