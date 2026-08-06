import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Frequently Asked Questions | All Talentz",
  description:
    "Got questions about hiring remote talent from Africa? Find answers about our process, pricing, onboarding, and what makes All Talentz different.",
  alternates: { canonical: "https://alltalentz.com/faq" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Frequently Asked Questions | All Talentz",
    description:
      "Got questions about hiring remote talent from Africa? Find answers about our process, pricing, onboarding, and what makes All Talentz different.",
    url: "https://alltalentz.com/faq",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "FAQ", url: "https://alltalentz.com/faq" },
]);

export default function FaqLayout({ children }: { children: ReactNode }) {
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
