import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Academy',
  description: 'Welcome to All Talentz, the leading platform for recruiting the best remote talent from Africa at a fraction of the cost.',
  alternates: { canonical: 'https://alltalentz.com/academy' },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'Academy', url: 'https://alltalentz.com/academy' },
]);

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
