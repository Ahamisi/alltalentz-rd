import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Contact All Talentz — Talk to Our Talent Experts",
  description:
    "Get in touch with All Talentz. Reach our team by email, phone, or visit our offices in Ohio, USA or Lagos, Nigeria. We respond fast.",
  alternates: { canonical: "https://alltalentz.com/contact-us" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Contact All Talentz — Talk to Our Talent Experts",
    description:
      "Get in touch with All Talentz. Reach our team by email, phone, or visit our offices in Ohio, USA or Lagos, Nigeria. We respond fast.",
    url: "https://alltalentz.com/contact-us",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Contact Us", url: "https://alltalentz.com/contact-us" },
]);

export default function ContactLayout({ children }: { children: ReactNode }) {
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
