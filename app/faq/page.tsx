import { client } from "@/lib/sanity/client";
import { faqCategoriesWithFaqsQuery } from "@/lib/sanity/queries";
import { faqFallbackCategories } from "@/lib/faq-data";
import { generateFAQSchema } from "@/components/SchemaMarkup";
import FaqPageFragment from "@/fragments/FaqPageFragment";
import type { SanityFaqCategory } from "@/types/faq";

export const revalidate = 60;

async function getFaqCategories(): Promise<SanityFaqCategory[]> {
  try {
    const categories = await client.fetch<SanityFaqCategory[]>(
      faqCategoriesWithFaqsQuery
    );
    // A category with no published questions would render as an empty chip.
    const populated = (categories ?? []).filter(
      (category) => category.faqs?.length > 0
    );
    // A fresh dataset or a failed fetch shouldn't leave the page blank — fall
    // back to the bundled copy (see lib/faq-data.ts).
    return populated.length > 0 ? populated : faqFallbackCategories;
  } catch {
    return faqFallbackCategories;
  }
}

export default async function FaqPage() {
  const categories = await getFaqCategories();

  // FAQPage structured data, generated from whatever is actually on the page —
  // so it can never drift from the CMS content the way a hardcoded copy did.
  const faqSchema = generateFAQSchema(
    categories.flatMap((category) =>
      category.faqs.map(({ question, answer }) => ({ question, answer }))
    )
  );

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <FaqPageFragment categories={categories} />
    </>
  );
}
