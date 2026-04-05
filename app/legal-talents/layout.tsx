import type { ReactNode } from "react";
import { generateServiceSchema, generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Outsource Legal Research & Paralegal Services | AllTalentz',
  description: 'Legal research, contract review & paralegal support from Africa. Reduce legal ops costs by 70%.',
  alternates: { canonical: 'https://alltalentz.com/legal-talents' },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Outsource Legal Research & Paralegal Services | AllTalentz',
    description: 'Legal research, contract review & paralegal support from Africa. Reduce legal ops costs by 70%.',
    url: 'https://alltalentz.com/legal-talents',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

const schema = generateServiceSchema(
  'Legal Research & Paralegal Outsourcing',
  'Legal research, contract review & paralegal support from Africa.',
  'https://alltalentz.com/legal-talents'
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'Legal Talents', url: 'https://alltalentz.com/legal-talents' },
]);

export default function LegalTalentsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
