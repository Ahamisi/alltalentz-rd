export interface Testimonial {
  quote: string;
  name: string;
  company?: string;
  location?: string;
  companyLogo?: string;
  image?: string;
  thankYou?: string;
}

export const homepageTestimonials: Testimonial[] = [
  {
    name: "Robert Jordan",
    company: "Puroclean of Lynwood",
    location: "Washington, USA",
    companyLogo: "/clients/puroclean-icon.png",
    quote:
      "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella.",
    thankYou: "Thank you!",
  },
  {
    quote:
      "Hiring from All Talentz has helped take a lot of pressure off, and allowed me to focus more on administrative tasks, it's been fantastic so far",
    name: "Bryan Towne",
    location: "Puroclean of Burlington., USA",
    companyLogo: "/clients/puroclean-icon.png",
  },
  {
    quote:
      "The reliability, accountability, accuracy and communication style at AllTalentz has been very top notch.",
    name: "Craig Hawkins",
    location: "Owner, Puroclean of Redmond",
    companyLogo: "/clients/puroclean-icon.png",
  },
  {
    quote:
      "Working with AllTalentz is kinda like having a shortcut, they train and prepare talents with the requisite industry experience to come in and make the work so much easier.",
    name: "Johnetta Johnson",
    location: "SVP Operations, Alacrity Solutions.",
    companyLogo: "/clients/puroclean-icon.png",
  },
  {
    quote:
      "Ella has been doing fantastic and we are so pleased with her performances. She has been responsive to our request and is supplying quality estimates. We are very pleased with Ella.",
    name: "Robert Jordan",
    location: "Puroclean of Lynwood, Washington, USA",
    companyLogo: "/clients/puroclean-icon.png",
    thankYou: "Thank you!",
  },
  {
    quote:
      "It's been amazing; I appreciate the tenacity and the focus and the drive to keep learning and growing and getting things done",
    name: "Jenny Hawkins",
    location: "Puroclean of Redmond",
    companyLogo: "/clients/puroclean-icon.png",
  },
];
