/**
 * Static content for the Professional Development Programme page — kept out of
 * the page fragment so copy edits don't touch component code.
 */

/** YouTube testimonials shown in the PDP testimonials reel. */
export const pdpTestimonialVideos = [
  { id: 1, videoUrl: "https://youtu.be/lg97MSTAepc" },
  { id: 2, videoUrl: "https://youtu.be/rLBx8RZl9YU" },
  { id: 3, videoUrl: "https://youtu.be/nY32P9n6XSs" },
  { id: 4, videoUrl: "https://youtu.be/EHcDdGuOhSg" },
  { id: 5, videoUrl: "https://youtu.be/RXTCpHs8lC8" },
];

/**
 * "What is the PDP" explainer video. Placeholder for now — swap in the real
 * explainer once it's cut; this is the first testimonial reused.
 */
export const pdpExplainerVideoUrl = "https://youtu.be/lg97MSTAepc";

/** Roles cycled through the orange marquee band under the hero. */
export const pdpMarqueeRoles = [
  "ESTIMATOR",
  "ACCOUNT RECEIVABLES SPECIALIST",
  "REVIEWER",
  "ADMINS",
  "CSR",
  "ESTIMATOR",
];

export const pdpFaqs = [
  {
    question: "Is the PDP program free to apply to?",
    answer:
      "Yes. The application is free. The program itself is paid once you're accepted.",
  },
  {
    question: "Do I need work experience to apply?",
    answer:
      "Not necessarily. But you must be a graduate who has completed NYSC.",
  },
  {
    question: "What will I be trained in?",
    answer:
      "Customer service, estimation tools like ATRA, Xactimate, and Encircle, and professional oral communication.",
  },
  {
    question: "Will I get placed with a client after the program?",
    answer:
      "Yes. Placement happens on completion, or sooner if you progress quickly.",
  },
];
