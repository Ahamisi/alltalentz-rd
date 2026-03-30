import { generateServiceSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Outsource Finance & Accounting Talent | AllTalentz',
  description: 'Accounts receivable, bookkeeping & financial analysis professionals from Africa. 70% cost savings. SOC 2 aware.',
  alternates: { canonical: 'https://alltalentz.com/finance-talents' },
};

const schema = generateServiceSchema(
  'Finance & Accounting Talent Outsourcing',
  'Accounts receivable, bookkeeping & financial analysis professionals from Africa.',
  'https://alltalentz.com/finance-talents'
);

export default function FinanceTalentsLayout({ children }) {
  return (
    <>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </head>
      {children}
    </>
  );
}
