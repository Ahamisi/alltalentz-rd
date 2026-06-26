import type { ReactNode } from "react";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Outsource Pest Control Support — CSRs, Accountants & Sales | All Talentz",
  description:
    "Hire trained pest control back-office talent: customer service reps, accountants, billing specialists & inside sales reps. Up to 75% cost savings.",
  alternates: { canonical: "https://alltalentz.com/hire-pest-control-talents" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Outsource Pest Control Support — CSRs, Accountants & Sales | All Talentz",
    description:
      "Hire trained pest control back-office talent: customer service reps, accountants, billing specialists & inside sales reps. Up to 75% cost savings.",
    url: "https://alltalentz.com/hire-pest-control-talents",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const schema = generateServiceSchema(
  "Pest Control Talent Outsourcing",
  "Trained back-office talent for pest control companies — customer service reps, accountants, billing specialists, and inside sales representatives.",
  "https://alltalentz.com/hire-pest-control-talents"
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Pest Control Talents", url: "https://alltalentz.com/hire-pest-control-talents" },
]);

export default function PestControlTalentsLayout({ children }: { children: ReactNode }) {
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
