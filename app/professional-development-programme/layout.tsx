import type { ReactNode } from "react";
import { generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Professional Development Programme — Launch a Global Career | AllTalentz',
  description: 'Join the AllTalentz PDP and gain world-class training to work with top US companies remotely. Build skills, earn globally, grow professionally.',
  alternates: { canonical: 'https://alltalentz.com/professional-development-programme' },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Professional Development Programme — Launch a Global Career | AllTalentz',
    description: 'Join the AllTalentz PDP and gain world-class training to work with top US companies remotely. Build skills, earn globally, grow professionally.',
    url: 'https://alltalentz.com/professional-development-programme',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'Professional Development Programme', url: 'https://alltalentz.com/professional-development-programme' },
]);

export default function PDPLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
