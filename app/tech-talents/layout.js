import { generateServiceSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Outsource Tech Talent — Developers, AI/ML & QA | AllTalentz',
  description: 'Hire vetted software developers, AI/ML specialists & QA engineers from Africa. 70% cost savings. Deployed in 2 weeks.',
  alternates: { canonical: 'https://alltalentz.com/tech-talents' },
};

const schema = generateServiceSchema(
  'Tech Talent Outsourcing',
  'Hire vetted software developers, AI/ML specialists & QA engineers from Africa.',
  'https://alltalentz.com/tech-talents'
);

export default function TechTalentsLayout({ children }) {
  return (
    <>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      {children}
    </>
  );
}
