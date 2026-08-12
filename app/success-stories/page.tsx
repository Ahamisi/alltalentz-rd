import { generateBreadcrumbSchema } from "@/components/SchemaMarkup";
import SuccessStoriesPageFragment from "@/fragments/SuccessStoriesPageFragment";

export const revalidate = 60;

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

interface SearchParams {
  search?: string;
  sort?: string;
  category?: string;
  page?: string;
}

export default async function SuccessStoriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SuccessStoriesPageFragment {...params} />
    </>
  );
}
