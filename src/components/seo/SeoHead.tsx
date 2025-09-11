
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  schema?: any;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title = 'لنگر - ابزارهای آنلاین رایگان',
  description = 'مجموعه کامل ابزارهای آنلاین رایگان',
  keywords = 'ابزار آنلاین, لنگر',
  schema,
  canonical,
  ogImage = '/assets/social-logo.jpg',
  ogType = 'website',
  noindex = false
}) => {
  // Safe URL generation with fallback
  let currentUrl = 'https://langar.co/';
  try {
    currentUrl = canonical || `https://langar.co${window.location.pathname}`;
  } catch (error) {
    console.log('Using fallback URL due to window access error');
  }
  
  // Safe schema stringification
  let schemaString = '';
  try {
    if (schema) {
      schemaString = JSON.stringify(schema);
    }
  } catch (error) {
    console.error('Error stringifying schema:', error);
  }
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="لنگر - Langar" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="fa-IR" />
      <meta name="language" content="Persian" />
      
      {/* Robots and Indexing */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="bingbot" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="لنگر - ابزارهای آنلاین" />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@langar_app" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="لنگر" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect for Critical Resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" href="/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png" />
      <link rel="apple-touch-icon" href="/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png" />
      
      {/* Structured Data - Only include if valid */}
      {schemaString && (
        <script type="application/ld+json">
          {schemaString}
        </script>
      )}
    </Helmet>
  );
};
