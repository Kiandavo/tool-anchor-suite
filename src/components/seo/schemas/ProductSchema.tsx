import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ProductSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  category?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
  offers?: {
    price: number;
    priceCurrency: string;
    availability?: string;
  };
}

export const ProductSchema: React.FC<ProductSchemaProps> = ({
  name,
  description,
  url,
  image,
  brand = 'لنگر',
  category,
  aggregateRating,
  offers
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    ...(image && { image }),
    brand: {
      '@type': 'Brand',
      name: brand
    },
    ...(category && { category }),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: aggregateRating.bestRating || 5,
        worstRating: 1
      }
    }),
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        availability: offers.availability || 'https://schema.org/InStock',
        url
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
