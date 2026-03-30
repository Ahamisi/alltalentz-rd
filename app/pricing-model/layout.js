export const metadata = {
  title: "Transparent Talent Pricing — Starting from $400/mo | AllTalentz",
  description: "Clear, flexible pricing for every role — from Virtual Assistants to AI/ML Specialists. No hidden fees. Vetted talent deployed in 2 weeks.",
  alternates: { canonical: "https://alltalentz.com/pricing-model" },
  openGraph: {
    type: 'website',
    siteName: 'AllTalentz',
    title: 'Transparent Talent Pricing — Starting from $400/mo | AllTalentz',
    description: 'Clear, flexible pricing for every role — from Virtual Assistants to AI/ML Specialists. No hidden fees. Vetted talent deployed in 2 weeks.',
    url: 'https://alltalentz.com/pricing-model',
    images: [{ url: '/twitter/twitter-card.png', width: 1200, height: 630, alt: 'AllTalentz' }],
  },
};

export default function PricingModelLayout({ children }) {
  return children;
}
