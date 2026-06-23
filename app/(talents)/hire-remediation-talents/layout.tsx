import type { ReactNode } from "react";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Outsource Construction Estimating & Remediation | All Talentz",
  description:
    "Certified estimators, takeoff specialists & project coordinators for restoration companies. 75% cost savings.",
  alternates: { canonical: "https://alltalentz.com/remediation-talents" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Outsource Construction Estimating & Remediation | All Talentz",
    description:
      "Certified estimators, takeoff specialists & project coordinators for restoration companies. 75% cost savings.",
    url: "https://alltalentz.com/remediation-talents",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const schema = generateServiceSchema(
  "Construction & Remediation Talent Outsourcing",
  "Certified estimators, takeoff specialists & project coordinators for restoration companies.",
  "https://alltalentz.com/remediation-talents"
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Remediation Talents", url: "https://alltalentz.com/remediation-talents" },
]);

export default function RemediationTalentsLayout({ children }: { children: ReactNode }) {
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
