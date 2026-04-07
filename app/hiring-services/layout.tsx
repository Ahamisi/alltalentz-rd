import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Industry-Specific Outsourcing Solutions | AllTalentz",
  description:
    "Explore tailored outsourcing solutions for Tech, Healthcare, Finance, Legal & Construction. Vetted specialists. 70% savings. Deployed in 2 weeks.",
  alternates: { canonical: "https://alltalentz.com/services" },
  openGraph: {
    type: "website",
    siteName: "AllTalentz",
    title: "Industry-Specific Outsourcing Solutions | AllTalentz",
    description:
      "Explore tailored outsourcing solutions for Tech, Healthcare, Finance, Legal & Construction. Vetted specialists. 70% savings. Deployed in 2 weeks.",
    url: "https://alltalentz.com/services",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "AllTalentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Services", url: "https://alltalentz.com/services" },
]);

export default function ServicesLayout({ children }: { children: ReactNode }) {
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
