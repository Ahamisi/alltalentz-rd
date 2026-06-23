import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Client Success Stories — Real Results with All Talentz",
  description:
    "See how US businesses across restoration, healthcare, tech & finance scaled operations and cut costs by 75% with All Talentz remote talent.",
  alternates: { canonical: "https://alltalentz.com/success-stories" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Client Success Stories — Real Results with All Talentz",
    description:
      "See how US businesses across restoration, healthcare, tech & finance scaled operations and cut costs by 75% with All Talentz remote talent.",
    url: "https://alltalentz.com/success-stories",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Success Stories", url: "https://alltalentz.com/success-stories" },
]);

export default function SuccessStoriesLayout({ children }: { children: ReactNode }) {
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
