import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SoftwareApplicationSchemaProps {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  url?: string;
  author?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  offers?: {
    price: string;
    priceCurrency: string;
  };
  screenshot?: string[];
  featureList?: string[];
}

export const SoftwareApplicationSchema: React.FC<SoftwareApplicationSchemaProps> = ({
  name,
  description,
  applicationCategory,
  operatingSystem = "Web Browser",
  url = "https://langar.co",
  author = "لنگر",
  aggregateRating,
  offers = { price: "0", priceCurrency: "IRR" },
  screenshot,
  featureList
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency
    },
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "reviewCount": aggregateRating.reviewCount,
        "bestRating": 5
      }
    }),
    ...(screenshot && { "screenshot": screenshot }),
    ...(featureList && { "featureList": featureList }),
    "inLanguage": "fa-IR"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
