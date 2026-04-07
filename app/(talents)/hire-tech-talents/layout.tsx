import type { ReactNode } from "react";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Outsource Tech Talent — Developers, AI/ML & QA | AllTalentz",
  description:
    "Hire vetted software developers, AI/ML specialists & QA engineers from Africa. 70% cost savings. Deployed in 2 weeks.",
  alternates: { canonical: "https://alltalentz.com/tech-talents" },
  openGraph: {
    type: "website",
    siteName: "AllTalentz",
    title: "Outsource Tech Talent — Developers, AI/ML & QA | AllTalentz",
    description:
      "Hire vetted software developers, AI/ML specialists & QA engineers from Africa. 70% cost savings. Deployed in 2 weeks.",
    url: "https://alltalentz.com/tech-talents",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "AllTalentz" }],
  },
};

const schema = generateServiceSchema(
  "Tech Talent Outsourcing",
  "Hire vetted software developers, AI/ML specialists & QA engineers from Africa.",
  "https://alltalentz.com/tech-talents"
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Tech Talents", url: "https://alltalentz.com/tech-talents" },
]);

export default function TechTalentsLayout({ children }: { children: ReactNode }) {
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
