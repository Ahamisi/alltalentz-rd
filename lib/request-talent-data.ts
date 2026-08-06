// Industry → roles mapping used by the RolesDropdown on the Request Talent form
export const INDUSTRY_ROLES: Record<string, string[]> = {
  Technology: [
    "Data Annotator",
    "AI/Machine Learning Engineer",
    "Software Dev",
    "IT Support",
    "UI/UX",
    "Digital Marketing",
    "Other",
  ],
  Healthcare: [
    "Medical Billing Specialists",
    "Revenue Cycle Managers",
    "Healthcare Admins",
    "HIPAA-Compliant Support",
    "Other",
  ],
  Finance: [
    "Bookkeepers",
    "AR/AP Specialists",
    "Payroll Processors",
    "Financial Analysts",
    "QuickBooks Specialists",
    "Digital Marketing",
    "Other",
  ],
  "Construction & Restoration": [
    "Estimators",
    "Project Administrators",
    "AR Specialists",
    "Telemarketing Agents",
    "Digital Marketing Support",
    "Other",
  ],
  Legal: [
    "Paralegals",
    "Legal Virtual Assistants",
    "Transcriptionist",
    "Contract Managers",
    "Legal Researchers",
    "Other",
  ],
};

export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Construction & Restoration",
  "Legal",
  "Other",
];

export const TIMELINES = ["ASAP", "Within 30 days", "Within 90 days", "Planning ahead"];

export interface WhatHappensNextStep {
  step: string;
  title: string;
  body: string;
}

export const WHAT_HAPPENS_NEXT: WhatHappensNextStep[] = [
  {
    step: "01",
    title: "We Review Your Request",
    body: "Our team reviews your submission and reaches out to confirm your requirements and timeline.",
  },
  {
    step: "02",
    title: "We Match Your Role",
    body: "We identify the right professional from our pre-vetted talent pool — trained for your industry, matched to your specific role.",
  },
  {
    step: "03",
    title: "You Meet Your Match",
    body: "We introduce your matched professional, walk through the onboarding plan, and lock in your start date.",
  },
  {
    step: "04",
    title: "You're Live Within 7 Days",
    body: "Your new team member is integrated, operational, and delivering from their first week.",
  },
];
