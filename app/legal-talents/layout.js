import { generateServiceSchema } from '@/components/SchemaMarkup';

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

export default function LegalTalentsLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
