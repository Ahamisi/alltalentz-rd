import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Request Talent - Alacrity",
  description: "Discover Great Talent Offers and Save on Payroll with All Talentz",
  alternates: { canonical: "https://alltalentz.com/alacrity" },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Alacrity", url: "https://alltalentz.com/alacrity" },
]);

export default function AlacrityLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
