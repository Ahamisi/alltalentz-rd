import { generateServiceSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Outsource Medical Billing & Healthcare Talent | AllTalentz',
  description: 'HIPAA-trained medical billing specialists, coders & admin support from Africa. 70% savings. Scale your healthcare operations.',
  alternates: { canonical: 'https://alltalentz.com/healthcare-talents' },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Outsource Medical Billing & Healthcare Talent | AllTalentz',
    description: 'HIPAA-trained medical billing specialists, coders & admin support from Africa. 70% savings. Scale your healthcare operations.',
    url: 'https://alltalentz.com/healthcare-talents',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

const schema = generateServiceSchema(
  'Healthcare Talent Outsourcing',
  'HIPAA-trained medical billing specialists, coders & admin support from Africa.',
  'https://alltalentz.com/healthcare-talents'
);

export default function HealthcareTalentsLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
    </>
  );
}
