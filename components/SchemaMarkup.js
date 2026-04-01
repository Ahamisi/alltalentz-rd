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

// Employment Agency Schema
export const EmploymentAgencySchema = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "name": "All Talentz LLC",
  "url": "https://alltalentz.com",
  "description": "AllTalentz connects US businesses with vetted remote talent from Africa across Tech, Healthcare, Finance, Legal & Construction.",
  "telephone": "+1-614-502-1440",
  "email": "info@alltalentz.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2020 Brice Road, Suite 180",
    "addressLocality": "Reynoldsburg",
    "addressRegion": "OH",
    "postalCode": "43068",
    "addressCountry": "US"
  },
  "areaServed": ["US", "CA", "GB"],
  "priceRange": "$400-$2500/month"
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

// BreadcrumbList Schema Generator
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url,
  })),
});

// Service Schema Generator
export const generateServiceSchema = (name, description, url) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "url": url,
  "provider": {
    "@type": "EmploymentAgency",
    "name": "All Talentz LLC",
    "url": "https://alltalentz.com"
  },
  "areaServed": "US",
  "serviceType": "Remote Talent Outsourcing"
});
