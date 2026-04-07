import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "About AllTalentz — Africa's Premier Remote Talent Partner",
  description:
    "Learn how AllTalentz connects US businesses with Africa's top remote professionals. Our mission, values, and the team behind 100+ satisfied clients worldwide.",
  alternates: { canonical: "https://alltalentz.com/about" },
  openGraph: {
    type: "website",
    siteName: "AllTalentz",
    title: "About AllTalentz — Africa's Premier Remote Talent Partner",
    description:
      "Learn how AllTalentz connects US businesses with Africa's top remote professionals. Our mission, values, and the team behind 100+ satisfied clients worldwide.",
    url: "https://alltalentz.com/about",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "AllTalentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "About", url: "https://alltalentz.com/about" },
]);

export default function AboutLayout({ children }: { children: ReactNode }) {
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
