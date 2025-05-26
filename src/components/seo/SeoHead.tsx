
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  schema?: any;
  noindex?: boolean;
  language?: string;
  structuredData?: Record<string, any>;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'لنگر - مجموعه ابزارهای آنلاین رایگان | Langar Tools',
  description = 'مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو و بهینه‌سازی. بیش از ۱۱۰ ابزار کاربردی در یک پلتفرم.',
  keywords = 'ابزار آنلاین, ابزار سئو, تبدیل متن, محاسبه گر آنلاین, ویرایش تصویر, ابزارهای رایگان, langar, لنگر, فرهنگ فارسی, آموزش زبان فارسی, فال و طالع‌بینی, فال حافظ, استخاره',
  image = '/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png',
  schema,
  noindex = false,
  language = 'fa',
  structuredData
}) => {
  const location = useLocation();
  const currentUrl = `https://langar.co${location.pathname}`;
  const logoUrl = '/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png';
  
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <html lang={language} dir="rtl" />
      
      {/* Google's Core Web Vitals optimization */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <link rel="dns-prefetch" href="https://cdn.fontcdn.ir" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdn.fontcdn.ir" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Critical resource preloading */}
      <link rel="preload" as="font" href="https://cdn.fontcdn.ir/Font/Persian/Yekan/Yekan.woff" type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" as="image" href={logoUrl} />
      
      {/* PWA and mobile optimization */}
      <meta name="theme-color" content="#7E49F2" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="لنگر" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Enhanced robots meta tags for Google compliance */}
      {noindex ? (
        <>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
          <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet" />
        </>
      ) : (
        <>
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Enhanced favicon support */}
      <link rel="icon" href={logoUrl} />
      <link rel="apple-touch-icon" sizes="180x180" href={logoUrl} />
      <link rel="icon" type="image/png" sizes="32x32" href={logoUrl} />
      <link rel="icon" type="image/png" sizes="16x16" href={logoUrl} />
      <link rel="mask-icon" href={logoUrl} color="#7E49F2" />
      
      {/* Enhanced Open Graph for better social sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://langar.co${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content={language === 'fa' ? 'fa_IR' : 'en_US'} />
      <meta property="og:site_name" content="لنگر - ابزارهای آنلاین" />

      {/* Enhanced Twitter Cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://langar.co${image}`} />
      <meta property="twitter:image:alt" content={title} />
      <meta property="twitter:site" content="@langar_app" />
      <meta property="twitter:creator" content="@langar_app" />
      
      {/* Additional SEO meta tags */}
      <meta name="author" content="Langar Tools" />
      <meta name="publisher" content="Langar Tools" />
      <meta name="copyright" content="© 2024 Langar Tools" />
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Schema.org structured data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Additional structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
