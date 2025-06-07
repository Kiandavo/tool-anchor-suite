
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  schema?: any;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'لنگر - ابزارهای آنلاین رایگان',
  description = 'مجموعه کامل ابزارهای آنلاین رایگان',
  keywords = 'ابزار آنلاین, لنگر',
  schema
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
