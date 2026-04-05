import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'BootCamp',
  description: 'Join Our Estimator Bootcamp - All Talentz Training 5.0',
  alternates: { canonical: 'https://alltalentz.com/bootcamp' },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'Bootcamp', url: 'https://alltalentz.com/bootcamp' },
]);

export default function BootcampLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
