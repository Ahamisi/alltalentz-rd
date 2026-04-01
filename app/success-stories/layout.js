import { generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: "Client Success Stories — Real Results with AllTalentz",
  description: "See how US businesses across restoration, healthcare, tech & finance scaled operations and cut costs by 70% with AllTalentz remote talent.",
  alternates: { canonical: "https://alltalentz.com/success-stories" },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Client Success Stories — Real Results with AllTalentz',
    description: 'See how US businesses across restoration, healthcare, tech & finance scaled operations and cut costs by 70% with AllTalentz remote talent.',
    url: 'https://alltalentz.com/success-stories',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'Success Stories', url: 'https://alltalentz.com/success-stories' },
]);

export default function SuccessStoriesLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
