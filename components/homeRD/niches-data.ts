export interface NicheItemProp {
  title: string;
  imageSrc: string;
  description: string;
  path: string;
}

export const niches: NicheItemProp[] = [
  {
    title: "Healthcare",
    imageSrc: "/redesign-25/pricing/MedicalBillingSpecialists.webp",
    description:
      "Medical billing specialists, revenue cycle managers, healthcare admins, and HIPAA-compliant support staff.",
    path: "/hire-healthcare-talents",
  },
  {
    title: "Technology",
    imageSrc: "/redesign-25/pricing/SoftwareDevelopers.webp",
    description:
      "Data Annotators, AI Engineers, Software Developers, UI/UX designers, and IT support professionals.",
    path: "/hire-tech-talents",
  },
  {
    title: " Construction & Restoration",
    imageSrc: "/redesign-25/pricing/Estimators.webp",
    description:
      "Estimators, project administrators, AR specialists, call center agents, and digital marketing support. ",
    path: "/hire-remediation-talents",
  },
  {
    title: "Finance",
    imageSrc: "/redesign-25/pricing/AccountsReceivablesSpecialists.webp",
    description:
      "Bookkeepers, AR/AP specialists, payroll processors, financial analysts, and outsourced CFO support.",
    path: "/hire-remediation-talents",
  },
  {
    title: "Legal",
    imageSrc: "/redesign-25/pricing/TelemarketingAdminAssistants.webp",
    description:
      "Paralegals, legal virtual assistants, transcriptionists, contract managers, and legal researchers.",
    path: "/hire-remediation-talents",
  },
];
