/**
 * Leadership roster for the about page's `LeadershipTeam` band.
 *
 * The names, roles and bios are the same ones the legacy `homeRD/Team` deck
 * renders — lifted out into shared data so both surfaces stay in step. `blurb`
 * is the short line the v26 design shows beside the portrait; `bio` is the long
 * form kept for anywhere that still wants it.
 *
 * `socials` defaults to the company handles when a member has no personal
 * profile on file.
 */
export type LeadershipSocials = {
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  facebook?: string;
};

export type LeadershipMember = {
  /** Stable key, also used for the deep-link hash. */
  id: string;
  name: string;
  /** Post-nominal, e.g. "MBA" — rendered small beside the name. */
  title?: string;
  role: string;
  image: string;
  /** Short line shown under the socials in the v26 layout. */
  blurb: string;
  bio: string;
  socials?: LeadershipSocials;
};

export const COMPANY_SOCIALS: Required<LeadershipSocials> = {
  instagram: "https://instagram.com/all_talentz",
  twitter: "https://twitter.com/AllTalentz",
  linkedin: "https://www.linkedin.com/company/all-talentz/",
  facebook: "https://www.facebook.com/alltalentz",
};

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    id: "sadiq-isu",
    name: "Sadiq Isu",
    title: "MBA",
    role: "Founder & CEO",
    image: "/redesign-25/teams/sadiq-isu.webp",
    blurb:
      "Restoration industry veteran turned outsourcing leader, built on 20+ years of experience.",
    bio: "Sadiq Isu is a seasoned professional with extensive expertise in the restoration industry, honed through key roles at renowned companies such as PuroClean and Kroger. As the founder and leader of All Talentz, he now spearheads a dynamic talent outsourcing firm dedicated to delivering exceptional staffing solutions to small, medium, and large organizations.",
  },
  {
    id: "abdul-isu",
    name: "Abdul Isu",
    title: "Ph.D.",
    role: "Chairman & Co-Founder",
    image: "/redesign-25/teams/abdul.jpg",
    blurb:
      "Global business leader driving All Talentz's vision across industries and continents.",
    bio: "Dr Abdulmumin Isu is a renowned global business leader, with the passion for solving problems across different industries. With great experience at Corporate America and a strong background in the sciences, outsourcing, manufacturing, venture capital as well as Business Administration, Dr Isu drives the vision of transforming lives and restoring the confidence of the global market in the African community.",
  },
  {
    id: "thompson-opurum",
    name: "Thompson Opurum",
    role: "Director, Operations",
    image: "/redesign-25/teams/tommy.webp",
    blurb:
      "PMP-certified strategist with 15+ years in project management and supply chain.",
    bio: "Thompson Opurum holds a B.Sc. in Mathematics/Statistics from the University of Lagos, a Masters in Economics from the University of Aberdeen, and is a PMP-certified professional with the Project Management Institute (PMI) as well as a member of the Chartered Institute of Procurement and Supply (CIPS). With over 15 years of experience in project management, logistics, procurement, supply chain, he is a visionary leader known for his strategic decision-making and goal-driven leadership.",
  },
  {
    id: "gina-isu",
    name: "Gina Isu",
    role: "Director of Marketing",
    image: "/redesign-25/teams/gina-isu.webp",
    blurb:
      "Entrepreneur and marketer with a resilient, ambitious approach to business.",
    bio: "Gina Isu is a dynamic entrepreneur, wife, and devoted mother of four. Known for her adventurous spirit and deep love for God, Gina's journey has been resilient, ambitious, and successful across various fields. From a young age, she displayed an entrepreneurial mindset, engaging in trade in her home country, and laying the foundation for a life of business endeavors.",
  },
  {
    id: "michael-nwoseh",
    name: "Michael Nwoseh",
    role: "Business & Digital Solutions Director",
    image: "/redesign-25/teams/michael.webp",
    blurb:
      "Growth strategist with over a decade of experience scaling businesses.",
    bio: "Michael is the Business and Digital Solutions Director for All Talentz LLC. He is a seasoned growth strategist with over a decade of experience in propelling businesses toward optimal growth.",
  },
  /* ------------------------------------------------------------------------ *
   * The strip shows five portraits at a time and pages through the rest, so
   * the whole roster lives here — order is the order it's cycled in.
   * ------------------------------------------------------------------------ */
  {
    id: "samuel-akingbade",
    name: "Samuel Akingbade",
    role: "Head of Product & Marketing",
    image: "/redesign-25/teams/samuel-akingbade.webp",
    blurb:
      "Solutions architect with a decade of marketing expertise across 140+ clients.",
    bio: "Samuel is a dynamic Solutions Architect with a decade of marketing expertise and four years of experience running a successful digital agency. He has consulted with over 140 clients across 18+ industries, with a special passion for collaborating with emerging challenger brands. Samuel has spearheaded the digital and business strategy for the Creative Intelligence Group and is currently leading the marketing efforts for Rest Lives' innovative African fintech product, Savewyze.",
  },
  {
    id: "kehinde-oluwafemi",
    name: "Kehinde Oluwafemi",
    role: "HR Manager",
    image: "/redesign-25/teams/kehinde-oluwafemi.webp",
    blurb:
      "HR professional driving culture and engagement across the organization.",
    bio: "Kehinde (Kenny) Oluwafemi is a passionate, results-driven HR professional with over three years of professional experience in Performance Management, Recruitment, Employee Relations, and Policy Development. At All Talentz, as the Human Resource Manager, Kenny has driven several strategic HR initiatives aimed at creating a better company culture and improving employee engagement toward higher organizational efficiency.",
  },
  {
    id: "haolat-ogbomo",
    name: "Haolat Ogbomo",
    role: "HR Manager",
    image: "/redesign-25/teams/haolat-ogbomo.webp",
    blurb:
      "HR leader with a decade of experience in talent acquisition and development.",
    bio: "With over a decade year of dedicated service in Human Resources, Haolat brings an extensive expertise in talent acquisition, employee relations, and organizational development. She is committed to fostering a productive and inclusive workplace environment that supports both company success and employee well-being.",
  },
  {
    id: "adetayo-obinaike",
    name: "Adetayo Obinaike",
    role: "Head, SW Engineering",
    image: "/redesign-25/teams/adetayo-obinaike.webp",
    blurb:
      "Product and marketing leader with a decade at Nokia, Microsoft, and HMD Global.",
    bio: "Adetayo is an experienced Product and Marketing Manager with over a decade of experience cutting across multinationals such as Nokia, Microsoft and HMD Global. Within this period, he built great collaborations with major Mobile Operators, Marketing Agencies, Retail brands, and Marketing Influencers across West Africa. Currently he leads a fantastic team of Software Engineers and Product developers in All Talentz LLC.",
  },
  {
    id: "helen-essiet",
    name: "Helen-Sylvanus Essiet",
    role: "Snr. Relationship Manager",
    image: "/redesign-25/teams/helen-essiet.webp",
    blurb:
      "Relationship management expert, devoted to All Talentz's mission of excellence.",
    bio: "Helen Essiet-Sylvanus is a dynamic Senior Relationship Manager with a decade of experience in customer service and relationship management across several prestigious organizations. Known for her dedication, passion, and drive, Helen tackles every task with unwavering commitment. She lives by the mantra, 'If you can think it, you can do it', and firmly believes that excuses are the tools of the incompetent, hindering organizational growth. Helen is devoted to the All Talentz vision of restoring excellence globally, making her an invaluable asset to any team.",
  },
  {
    id: "akwaowo-willie",
    name: "Akwaowo Willie",
    role: "Snr. Relationship Manager",
    image: "/redesign-25/teams/willie-akwaowo.webp",
    blurb:
      "Experienced in client relationships and strategic growth across sectors.",
    bio: "Experienced in building strong client relationships and driving strategic growth across varied sectors. Now leading client engagement initiatives at All Talentz.",
  },
];
