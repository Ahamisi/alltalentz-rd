import { generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Outsourcing Agency for US Businesses | AllTalentz',
  description: 'Skip the overhead. AllTalentz builds and deploys your dedicated remote team from Africa in 2 weeks. Full outsourcing solutions for any business size.',
  alternates: { canonical: 'https://alltalentz.com/outsourcing' },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Outsourcing Agency for US Businesses | AllTalentz',
    description: 'Skip the overhead. AllTalentz builds and deploys your dedicated remote team from Africa in 2 weeks. Full outsourcing solutions for any business size.',
    url: 'https://alltalentz.com/outsourcing',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'Outsourcing', url: 'https://alltalentz.com/outsourcing' },
]);

export default function OutsourcingLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
