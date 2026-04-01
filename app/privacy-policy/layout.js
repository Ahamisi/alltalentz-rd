import { generateBreadcrumbSchema } from '@/components/SchemaMarkup';

export const metadata = {
  title: 'Privacy Policy | AllTalentz',
  description: "Read AllTalentz's privacy policy to understand how we collect, use, and protect your personal data.",
  alternates: { canonical: 'https://alltalentz.com/privacy-policy' },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://alltalentz.com' },
  { name: 'Privacy Policy', url: 'https://alltalentz.com/privacy-policy' },
]);

export default function PrivacyPolicyLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
