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
    icon: "/v26-images/talentz/tech.png",
    tint: "#FEF5E9",
    path: "/hire-tech-talents",
  },
  {
    title: "Healthcare",
    imageSrc: "/redesign-25/pricing/MedicalBillingSpecialists.webp",
    description:
      "Medical billing specialists, revenue cycle managers, healthcare admins, and HIPAA-compliant support staff.",
    tags: "Medical Billing Specialists · Revenue Cycle Managers · Healthcare Admins",
    icon: "/v26-images/talentz/healthcare.png",
    tint: "#FEEFDE",
    path: "/hire-healthcare-talents",
  },
  {
    title: "Finance",
    imageSrc: "/redesign-25/pricing/AccountsReceivablesSpecialists.webp",
    description:
      "Bookkeepers, AR/AP specialists, payroll processors, financial analysts, and outsourced CFO support.",
    tags: "Bookkeepers · AR/AP Specialists · Financial Analysts",
    icon: "/v26-images/talentz/finance.png",
    tint: "#FDDEBA",
    path: "/hire-finance-talents",
  },
  {
    title: "Construction & Restoration",
    imageSrc: "/redesign-25/pricing/Estimators.webp",
    description:
      "Estimators, project administrators, AR specialists, call center agents, and digital marketing support.",
    tags: "Estimators · Project Administrators · AR Specialists",
    icon: "/v26-images/talentz/construction.png",
    tint: "#FDDEBA",
    path: "/hire-remediation-talents",
  },
  {
    title: "Legal",
    imageSrc: "/redesign-25/pricing/TelemarketingAdminAssistants.webp",
    description:
      "Paralegals, legal virtual assistants, transcriptionists, contract managers, and legal researchers.",
    tags: "Paralegals · Legal Virtual Assistants · Transcriptionists",
    icon: "/v26-images/talentz/legal.png",
    tint: "#FEEFDE",
    path: "/hire-legal-talents",
  },
  {
    title: "Pest Control",
    imageSrc: "/redesign-25/pricing/Estimators.webp",
    description:
      "Admin support, scheduling coordinators, customer service reps, and call center agents.",
    tags: "Admin Support · Scheduling Coordinators · Customer Service Agents",
    icon: "/v26-images/talentz/pest-control.png",
    tint: "#FEF5E9",
    path: "/hire-pest-control-talents",
  },
];
