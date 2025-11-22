import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'WebApplication' | 'SoftwareApplication' | 'Article';
  name: string;
  description: string;
  url?: string;
  keywords?: string[];
  author?: string;
  datePublished?: string;
  applicationCategory?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({
  type,
  name,
  description,
  url = "https://laangar.com",
  keywords = [],
  author = "لنگر",
  datePublished = "2024-01-01",
  applicationCategory = "Utility"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": name,
    "description": description,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "لنگر",
      "url": "https://laangar.com"
    },
    "datePublished": datePublished,
    "inLanguage": "fa-IR",
    ...(type === 'WebApplication' || type === 'SoftwareApplication' ? {
      "applicationCategory": applicationCategory,
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "IRR"
      },
      "featureList": keywords
    } : {}),
    ...(keywords.length > 0 ? { "keywords": keywords.join(", ") } : {})
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};