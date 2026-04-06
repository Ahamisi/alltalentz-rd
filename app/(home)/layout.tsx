import { generateFAQSchema } from "@/components/SchemaMarkup";
import { homepageFAQs } from "@/lib/homepage-faqs";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(homepageFAQs);
  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {children}
    </>
  );
}
