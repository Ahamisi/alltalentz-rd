export type Talent = {
  name: string;
  role: string;
  /** 0–5, in 0.5 steps — the half-star is rendered by clipping the overlay. */
  rating: number;
  languages: string[];
  industry: string;
  experience: string;
  hobbies: string[];
  avatar: string;
};

/**
 * Sample roster for the "meet the talentz" deck. The copy is illustrative —
 * swap it for CMS data when the profiles are real. Order is intentionally
 * fixed rather than shuffled at render time: a random order would differ
 * between the server and client render and trip React hydration.
 */
export const globalTalentz: Talent[] = [
  {
    name: "Chiamaka Okafor",
    role: "Medical Billing Specialist",
    rating: 4.5,
    languages: ["English", "French"],
    industry: "Healthcare & Finance",
    experience: "5 years",
    hobbies: ["Cooking", "Yoga", "Podcasts"],
    avatar: "/v26-images/global-talentz/sample-people/Chiamaka.webp",
  },
  {
    name: "Emmanuel Boateng",
    role: "AI/ML Engineer",
    rating: 4,
    languages: ["English"],
    industry: "Technology & Construction",
    experience: "3 years",
    hobbies: ["Chess", "Coding Side Projects", "Basketball"],
    avatar: "/v26-images/global-talentz/sample-people/Emmanuel.webp",
  },
  {
    name: "Ifeoma Adeyemi",
    role: "Bookkeeper",
    rating: 5,
    languages: ["English", "Spanish"],
    industry: "Finance & Healthcare",
    experience: "6 years",
    hobbies: ["Baking", "Travel", "Personal Finance Blogging"],
    avatar: "/v26-images/global-talentz/sample-people/Ifeoma.webp",
  },
  {
    name: "Louis Plaine",
    role: "Estimator",
    rating: 4.5,
    languages: ["English", "French"],
    industry: "Construction & Restoration",
    experience: "4 years",
    hobbies: ["Reading", "Video Games", "Football"],
    avatar: "/v26-images/global-talentz/sample-people/Louis.webp",
  },
  {
    name: "Tunde Bakare",
    role: "Paralegal",
    rating: 5,
    languages: ["English"],
    industry: "Legal & Finance",
    experience: "7 years",
    hobbies: ["Debate", "Running", "Documentaries"],
    avatar: "/v26-images/global-talentz/sample-people/Tunde.webp",
  },
  {
    name: "Maria Santos",
    role: "Customer Service Agent",
    rating: 4.5,
    languages: ["English", "Spanish"],
    industry: "Pest Control & Healthcare",
    experience: "4 years",
    hobbies: ["Dancing", "Photography", "Volunteering"],
    avatar: "/v26-images/global-talentz/sample-people/Maria.webp",
  },
];
