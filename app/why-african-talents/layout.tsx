import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Why Hire African Talent? 75% Savings & World-Class Skills | All Talentz",
  description:
    "Discover why 100+ US companies choose African talent. Multilingual, highly skilled, culturally compatible professionals at a fraction of local hiring costs.",
  alternates: { canonical: "https://alltalentz.com/why-africa" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Why Hire African Talent? 75% Savings & World-Class Skills | All Talentz",
    description:
      "Discover why 100+ US companies choose African talent. Multilingual, highly skilled, culturally compatible professionals at a fraction of local hiring costs.",
    url: "https://alltalentz.com/why-africa",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Why Africa", url: "https://alltalentz.com/why-africa" },
]);

export default function WhyAfricaLayout({ children }: { children: ReactNode }) {
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
