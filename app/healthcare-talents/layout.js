import { generateServiceSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Outsource Medical Billing & Healthcare Talent | AllTalentz',
  description: 'HIPAA-trained medical billing specialists, coders & admin support from Africa. 70% savings. Scale your healthcare operations.',
  alternates: { canonical: 'https://alltalentz.com/healthcare-talents' },
};

const schema = generateServiceSchema(
  'Healthcare Talent Outsourcing',
  'HIPAA-trained medical billing specialists, coders & admin support from Africa.',
  'https://alltalentz.com/healthcare-talents'
);

export default function HealthcareTalentsLayout({ children }) {
  return (
    <>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      {children}
    </>
  );
}
