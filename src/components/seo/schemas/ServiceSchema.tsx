import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  serviceType?: string;
  areaServed?: string;
  availableLanguage?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  offers?: {
    price: number;
    priceCurrency: string;
  };
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  url,
  provider = 'لنگر',
  serviceType,
  areaServed = 'IR',
  availableLanguage = 'fa',
  aggregateRating,
  offers
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://laangar.com'
    },
    ...(serviceType && { serviceType }),
    areaServed: {
      '@type': 'Country',
      name: areaServed
    },
    availableLanguage,
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
        worstRating: 1
      }
    }),
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        availability: 'https://schema.org/InStock'
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
