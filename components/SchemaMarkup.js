"use client"
import Script from 'next/script';

// Organization Schema
export const OrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "All Talentz LLC",
  "url": "https://alltalentz.com",
  "logo": "https://alltalentz.com/all-talents-footer.svg",
  "description": "AllTalentz delivers expert, vetted talent solutions tailored to the unique demands of Technology, Healthcare, Finance, and Remediation.",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "2020 Brice Road, Suite 180",
      "addressLocality": "Reynoldsburg",
      "addressRegion": "OH",
      "postalCode": "43068",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "151 Herbert Macaulay Way",
      "addressLocality": "Yaba",
      "addressRegion": "Lagos",
      "addressCountry": "NG"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-614-502-1440",
    "contactType": "Customer Service",
    "email": "info@alltalentz.com",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/all-talentz/",
    "https://twitter.com/AllTalentz",
    "https://www.facebook.com/Alltalentz",
    "https://instagram.com/all_talentz"
  ]
};

// Website Schema
export const WebsiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "All Talentz",
  "url": "https://alltalentz.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://alltalentz.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// FAQ Schema Generator
export const generateFAQSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Schema Markup Component
export default function SchemaMarkup({ schemas = [] }) {
  if (!schemas || schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, index) => (
        schema && (
          <Script
            key={index}
            id={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema)
            }}
          />
        )
      ))}
    </>
  );
}
