import { generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'AllTalentz Blog & News — Remote Work Insights from Africa',
  description: 'Stay up to date with the latest from AllTalentz. Industry insights, remote work trends, talent tips, and company updates.',
  alternates: { canonical: 'https://alltalentz.com/news' },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'AllTalentz Blog & News — Remote Work Insights from Africa',
    description: 'Stay up to date with the latest from AllTalentz. Industry insights, remote work trends, talent tips, and company updates.',
    url: 'https://alltalentz.com/news',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'News', url: 'https://alltalentz.com/news' },
]);

export default function NewsLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
