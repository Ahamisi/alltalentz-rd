/**
 * Canonical FAQ content.
 *
 * Two jobs:
 *  1. Source of truth for the Sanity seed script (`scripts/seed-faqs.ts`), which
 *     mirrors this file into `faqCategory` / `faq` documents.
 *  2. Render fallback for /faq — if the CMS returns nothing (fresh dataset,
 *     fetch failure), the page still ships the full question set rather than an
 *     empty shell.
 *
 * Once the content lives in Sanity, editors work there; this file only needs to
 * change if you want to re-seed a new dataset.
 */
export type FaqSeedEntry = {
  question: string;
  answer: string;
};

export type FaqSeedCategory = {
  /** Also the in-page anchor: /faq#construction */
  slug: string;
  title: string;
  faqs: FaqSeedEntry[];
};

export const faqCategories: FaqSeedCategory[] = [
  {
    slug: "construction",
    title: "Construction",
    faqs: [
      {
        question: "How fast can I get an estimator or admin support?",
        answer: "Within 7 days of your request — pre-vetted and ready to work.",
      },
      {
        question: "Are your construction professionals certified?",
        answer:
          "Yes. Our estimators are Xactimate and ATRA-trained and ISO 27001 certified.",
      },
      {
        question: "What roles do you place in construction?",
        answer: "Estimators, Project Administrators, and AR Specialists.",
      },
      {
        question: "Can you help with bid preparation specifically?",
        answer:
          "Yes. Our estimators are trained to keep your bids accurate and on time.",
      },
      {
        question: "Do you support ongoing projects or just one-off placements?",
        answer:
          "Both. Choose a single placement or a fully managed team through our Agency model.",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    faqs: [
      {
        question: "Is your medical billing support HIPAA-compliant?",
        answer: "Yes, every Healthcare professional is HIPAA-trained and certified.",
      },
      {
        question: "What healthcare roles can I hire for?",
        answer:
          "Medical Billing Specialists, Revenue Cycle Managers, and Healthcare Administrators.",
      },
      {
        question: "Can you help reduce our claim denial rate?",
        answer:
          "Yes. Our billing specialists focus on denial management and clean claims submission.",
      },
      {
        question: "How quickly can a billing specialist start?",
        answer: "Within 7 days of your request, fully onboarded and ready.",
      },
      {
        question: "Do you support small practices or only large health systems?",
        answer: "Both. Our talent scales to fit practices of any size.",
      },
    ],
  },
  {
    slug: "tech",
    title: "Tech",
    faqs: [
      {
        question: "Can I hire AI/ML engineers through All Talentz?",
        answer:
          "Yes. AI/ML Engineers and Data Annotators are core to our Tech vertical.",
      },
      {
        question: "How is this cheaper than a local hire?",
        answer: "You save up to 75% on labor costs with the same quality output.",
      },
      {
        question: "Is my company's data secure?",
        answer: "Yes. We are ISO 27001 and SOC-2 Type 2 certified.",
      },
      {
        question: "Can you help build a team from scratch?",
        answer: "Yes — from a single developer to a fully staffed tech team.",
      },
      {
        question: "What if I need a role you haven't listed?",
        answer:
          "Tell us what you need. We source across all industries, not just what's listed.",
      },
    ],
  },
  {
    slug: "finance",
    title: "Finance",
    faqs: [
      {
        question: "What finance roles do you place people in?",
        answer: "Bookkeepers, AR/AP Specialists, and Financial Analysts.",
      },
      {
        question: "Can you help with a backlog of unpaid invoices?",
        answer: "Yes. Our AR/AP Specialists are trained to clear backlogs fast.",
      },
      {
        question: "Is my financial data protected?",
        answer: "Yes. We are ISO 27001 and SOC-2 Type 2 certified.",
      },
      {
        question: "How fast can a finance professional start?",
        answer: "Within 7 days of your request.",
      },
      {
        question:
          "Do you offer ongoing bookkeeping support or just short-term help?",
        answer:
          "Both. A single placement or an ongoing partnership through our Agency model.",
      },
    ],
  },
  {
    slug: "pricing",
    title: "Pricing",
    faqs: [
      {
        question: "How much does it cost to hire through All Talentz?",
        answer:
          "Pricing depends on the role and vertical. Request a custom quote for exact numbers.",
      },
      {
        question: "Are there any hidden fees?",
        answer: "No. No hidden fees, and no long-term lock-ins.",
      },
      {
        question: "How much can I really save?",
        answer: "Up to 75% less than the cost of a local hire.",
      },
      {
        question: "Do I need a long-term contract?",
        answer:
          "No. Our Agency model is fully flexible, with no full-time commitment required.",
      },
      {
        question: "Can I scale my team up or down?",
        answer: "Yes, anytime — with no penalties.",
      },
    ],
  },
  {
    slug: "verification",
    title: "Verification",
    faqs: [
      {
        question: "How do you vet your talent?",
        answer:
          "Every professional goes through application screening, skills assessment, and certification training.",
      },
      {
        question: "Are your professionals background-checked?",
        answer:
          "Yes, every candidate is screened before being added to our talent pool.",
      },
      {
        question: "What certifications does All Talentz hold?",
        answer: "ISO 27001, SOC-2 Type 2, and Great Place to Work certified.",
      },
      {
        question: "How do I know the person I hire is qualified?",
        answer:
          "Every professional is trained and certified specifically for your industry before deployment.",
      },
    ],
  },
  {
    slug: "global-links",
    title: "Global Links",
    faqs: [
      {
        question: "What is All Talentz?",
        answer:
          "A remote staffing company connecting businesses with pre-vetted, industry-trained talent, deployed within 7 days.",
      },
      {
        question: "Is All Talentz a job board?",
        answer:
          "No. We source and match talent directly to your needs. You don't post or search listings.",
      },
      {
        question: "Where does All Talentz operate?",
        answer: "We connect U.S. businesses with skilled talent across the globe.",
      },
      {
        question: "Can I hire talent for industries outside your main verticals?",
        answer:
          "Yes. We source across all industries. Our six verticals are simply where we have deep, proven expertise.",
      },
    ],
  },
  {
    slug: "all-talentz-pdp",
    title: "All Talentz PDP",
    faqs: [
      {
        question: "Is the PDP program free to apply to?",
        answer:
          "Yes. The application is free. The program itself is paid once you're accepted.",
      },
      {
        question: "How long does the program run?",
        answer:
          "It runs for 3 months, covering hands-on training across multiple skill areas.",
      },
      {
        question: "What is the application process like?",
        answer:
          "Apply, get a callback, submit a video audition, interview, and then receive your slot.",
      },
      {
        question: "Do I need work experience to apply?",
        answer:
          "Not necessarily. But you must be a graduate who has completed NYSC.",
      },
      {
        question: "What will I be trained in?",
        answer:
          "Customer service, estimation tools like ATRA, Xactimate, and Encircle, and professional oral communication, among other things.",
      },
      {
        question: "Will I get placed with a client after the program?",
        answer:
          "Yes. Placement happens on completion, or sooner if you progress quickly.",
      },
    ],
  },
];

/** Shape the seed data like the CMS payload so /faq can fall back to it as-is. */
export const faqFallbackCategories = faqCategories.map((category) => ({
  _id: `fallback-${category.slug}`,
  title: category.title,
  slug: category.slug,
  faqs: category.faqs.map((faq, index) => ({
    _id: `fallback-${category.slug}-${index}`,
    question: faq.question,
    answer: faq.answer,
  })),
}));

/** Flat list, for JSON-LD and any "all questions" surface. */
export const allFaqEntries = faqCategories.flatMap((category) => category.faqs);
