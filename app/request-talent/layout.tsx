import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Request Talent — Hire Vetted Remote Professionals | All Talentz",
  description:
    "Ready to hire? Tell us what you need. All Talentz matches you with vetted African professionals in Tech, Healthcare, Finance, Legal & Construction.",
  alternates: { canonical: "https://alltalentz.com/request-talent" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Request Talent — Hire Vetted Remote Professionals | All Talentz",
    description:
      "Ready to hire? Tell us what you need. All Talentz matches you with vetted African professionals in Tech, Healthcare, Finance, Legal & Construction.",
    url: "https://alltalentz.com/request-talent",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Request Talent", url: "https://alltalentz.com/request-talent" },
]);

export default function RequestTalentLayout({ children }: { children: ReactNode }) {
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
