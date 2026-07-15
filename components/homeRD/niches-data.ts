export interface NicheItemProp {
  title: string;
  imageSrc: string;
  description: string;
  path: string;
  /** Short "·"-separated role tags shown under the title on the card. */
  tags?: string;
  /** Inline illustration used on the redesigned deck card. */
  icon?: string;
  /** Card background tint — gives the stacked deck its layered warmth. */
  tint?: string;
}

export const niches: NicheItemProp[] = [
  {
    title: "Tech Talents",
    imageSrc: "/redesign-25/pricing/SoftwareDevelopers.webp",
    description:
      "Data Annotators, AI Engineers, Software Developers, UI/UX designers, and IT support professionals.",
    tags: "AI/ML Engineers · Data Annotators · Software Developers",
    icon: "/v26-images/talents-svgs/tech.svg",
    tint: "#FEF5E9",
    path: "/hire-tech-talents",
  },
  {
    title: "Healthcare",
    imageSrc: "/redesign-25/pricing/MedicalBillingSpecialists.webp",
    description:
      "Medical billing specialists, revenue cycle managers, healthcare admins, and HIPAA-compliant support staff.",
    tags: "Medical Billing · Revenue Cycle · Healthcare Admin",
    icon: "/v26-images/talents-svgs/healthcare.svg",
    tint: "#FEEFDE",
    path: "/hire-healthcare-talents",
  },
  {
    title: "Finance",
    imageSrc: "/redesign-25/pricing/AccountsReceivablesSpecialists.webp",
    description:
      "Bookkeepers, AR/AP specialists, payroll processors, financial analysts, and outsourced CFO support.",
    tags: "Bookkeepers · AR/AP Specialists · Financial Analysts",
    icon: "/v26-images/talents-svgs/finance.svg",
    tint: "#FDDEBA",
    path: "/hire-remediation-talents",
  },
  {
    title: "Construction & Restoration",
    imageSrc: "/redesign-25/pricing/Estimators.webp",
    description:
      "Estimators, project administrators, AR specialists, call center agents, and digital marketing support.",
    tags: "Estimators · Project Admins · ATRA-trained Professionals",
    icon: "/v26-images/talents-svgs/construction.svg",
    tint: "#FDDEBA",
    path: "/hire-remediation-talents",
  },
  {
    title: "Legal",
    imageSrc: "/redesign-25/pricing/TelemarketingAdminAssistants.webp",
    description:
      "Paralegals, legal virtual assistants, transcriptionists, contract managers, and legal researchers.",
    tags: "Paralegals · Legal VAs · Transcriptionists",
    icon: "/v26-images/talents-svgs/legal.svg",
    tint: "#FEEFDE",
    path: "/hire-remediation-talents",
  },
  {
    title: "Pest Control",
    imageSrc: "/redesign-25/pricing/Estimators.webp",
    description:
      "Admin support, scheduling coordinators, customer service reps, and call center agents.",
    tags: "Admin Support · Scheduling · Customer Service",
    icon: "/v26-images/talents-svgs/pest-contorl.svg",
    tint: "#FEF5E9",
    path: "/hire-pest-control-talents",
  },
];
