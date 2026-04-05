export default function sitemap() {
  const baseUrl = 'https://alltalentz.com';

  const pages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/tech-talents', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/healthcare-talents', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/finance-talents', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/legal-talents', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/remediation-talents', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/pricing-model', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/outsourcing', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/why-africa', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/success-stories', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/request-talent', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/professional-development-programme', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/our-watchlist', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/contact-us', priority: 0.6, changeFrequency: 'yearly' },
    { url: '/faq', priority: 0.6, changeFrequency: 'monthly' },
    { url: '/news', priority: 0.5, changeFrequency: 'weekly' },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
