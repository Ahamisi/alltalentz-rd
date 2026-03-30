import { generateServiceSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Outsource Legal Research & Paralegal Services | AllTalentz',
  description: 'Legal research, contract review & paralegal support from Africa. Reduce legal ops costs by 70%.',
  alternates: { canonical: 'https://alltalentz.com/legal-talents' },
};

const schema = generateServiceSchema(
  'Legal Research & Paralegal Outsourcing',
  'Legal research, contract review & paralegal support from Africa.',
  'https://alltalentz.com/legal-talents'
);

export default function LegalTalentsLayout({ children }) {
  return (
    <>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      {children}
    </>
  );
}
