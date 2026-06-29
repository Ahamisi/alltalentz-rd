import type { ReactNode } from "react";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Graduate Internship Program | All Talentz",
  description:
    "Apply for the All Talentz Graduate Internship Program and gain practical work experience, develop professional skills, and prepare for your career journey.",
  alternates: { canonical: "https://alltalentz.com/internship" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Graduate Internship Program | All Talentz",
    description:
      "Apply for the All Talentz Graduate Internship Program and gain practical work experience, develop professional skills, and prepare for your career journey.",
    url: "https://alltalentz.com/internship",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const schema = generateServiceSchema(
  "Graduate Internship Program",
  "The All Talentz Graduate Internship Program gives recent graduates practical work experience on real projects, professional skill development, and exposure to modern business operations.",
  "https://alltalentz.com/internship"
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Graduate Internship Program", url: "https://alltalentz.com/internship" },
]);

export default function InternshipLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
