import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";

export const metadata = {
  title: "Join Our Talent Watchlist — Get Noticed by Top US Employers | All Talentz",
  description:
    "Get on All Talentz's radar. Add yourself to our talent watchlist and be the first considered when new remote roles open with US clients.",
  alternates: { canonical: "https://alltalentz.com/our-watchlist" },
  openGraph: {
    type: "website",
    siteName: "All Talentz",
    title: "Join Our Talent Watchlist — Get Noticed by Top US Employers | All Talentz",
    description:
      "Get on All Talentz's radar. Add yourself to our talent watchlist and be the first considered when new remote roles open with US clients.",
    url: "https://alltalentz.com/our-watchlist",
    images: [{ url: "/twitter/twitter-card.png", width: 1200, height: 630, alt: "All Talentz" }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://alltalentz.com" },
  { name: "Our Watchlist", url: "https://alltalentz.com/our-watchlist" },
]);

export default function OurWatchlistLayout({ children }: { children: ReactNode }) {
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
