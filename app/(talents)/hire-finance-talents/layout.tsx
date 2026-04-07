import type { ReactNode } from "react";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Outsource Finance & Accounting Talent | AllTalentz",
  description:
    "Accounts receivable, bookkeeping & financial analysis professionals from Africa. 70% cost savings. SOC 2 aware.",
  alternates: { canonical: "https://alltalentz.com/finance-talents" },
  openGraph: {
    type: "website",
    siteName: "AllTalentz",
    title: "Outsource Finance & Accounting Talent | AllTalentz",
    description:
      "Accounts receivable, bookkeeping & financial analysis professionals from Africa. 70% cost savings. SOC 2 aware.",
    url: "https://alltalentz.com/finance-talents",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "AllTalentz" }],
  },
};

const schema = generateServiceSchema(
  "Finance & Accounting Talent Outsourcing",
  "Accounts receivable, bookkeeping & financial analysis professionals from Africa.",
  "https://alltalentz.com/finance-talents"
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Finance Talents", url: "https://alltalentz.com/finance-talents" },
]);

export default function FinanceTalentsLayout({ children }: { children: ReactNode }) {
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
