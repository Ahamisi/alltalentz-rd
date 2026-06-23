import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Find Talent | All Talentz",
  description:
    "Find vetted remote professionals from Africa across Tech, Healthcare, Finance, Legal & Construction. 75% cost savings with All Talentz.",
  alternates: { canonical: "https://alltalentz.com/find-talent" },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Find Talent", url: "https://alltalentz.com/find-talent" },
]);

export default function FindTalentLayout({ children }: { children: ReactNode }) {
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
