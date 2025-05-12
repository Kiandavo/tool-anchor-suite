
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  schema?: any;
  noindex?: boolean;
  language?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools',
  description = 'مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو و بهینه‌سازی. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم.',
  keywords = 'ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, ابزارهای رایگان, langar, لنگر, فرهنگ فارسی, آموزش زبان فارسی',
  image = '/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png',
  schema,
  noindex = false,
  language = 'fa'
}) => {
  const location = useLocation();
  const currentUrl = `https://langar.co${location.pathname}`;
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <html lang={language} />
      
      {/* Robots meta tags */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://langar.co${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={language} />
      <meta property="og:site_name" content="لنگر - ابزارهای آنلاین" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://langar.co${image}`} />
      <meta property="twitter:site" content="@langar_app" />
      
      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
