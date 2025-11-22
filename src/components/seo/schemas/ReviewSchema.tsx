import React from 'react';
import { Helmet } from 'react-helmet-async';

interface ReviewSchemaProps {
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}

export const ReviewSchema: React.FC<ReviewSchemaProps> = ({
  itemName,
  ratingValue,
  reviewCount,
  bestRating = 5,
  worstRating = 1
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": itemName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": ratingValue,
      "reviewCount": reviewCount,
      "bestRating": bestRating,
      "worstRating": worstRating
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
