
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  schema?: any;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools',
  description = 'مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو و بهینه‌سازی. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم.',
  keywords = 'ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, ابزارهای رایگان, langar, لنگر, فرهنگ فارسی, آموزش زبان فارسی',
  image = '/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png',
  schema
}) => {
  const location = useLocation();
  const currentUrl = `https://langar.co${location.pathname}`;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
