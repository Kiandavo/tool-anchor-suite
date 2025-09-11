import React from 'react';
import { Helmet } from 'react-helmet-async';
import { toolsSeoData } from '@/data/seo-content';
import { generateToolSchema, generateBreadcrumbSchema, generateFAQSchema, generateHowToSchema, combineSchemas } from '@/utils/schemaUtils';

interface EnhancedSeoHeadProps {
  toolSlug?: string;
  pageType?: 'tool' | 'category' | 'home' | 'blog';
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  breadcrumbs?: { name: string; url: string }[];
  faq?: { question: string; answer: string }[];
}

/**
 * Enhanced SEO Head component with automatic rich content generation
 */
export const EnhancedSeoHead: React.FC<EnhancedSeoHeadProps> = ({
  toolSlug,
  pageType = 'tool',
  title,
  description,
  keywords,
  canonical,
  ogImage,
  noindex = false,
  breadcrumbs,
  faq
}) => {
  // Auto-generate SEO content for tools
  const toolSeoData = toolSlug ? toolsSeoData[toolSlug] : null;
  
  // Use generated content or fallback to props
  const finalTitle = title || toolSeoData?.metaTitle || 'لنگر - ابزارهای آنلاین رایگان';
  const finalDescription = description || toolSeoData?.metaDescription || 'بیش از 100 ابزار آنلاین رایگان فارسی';
  const finalKeywords = keywords || toolSeoData?.keywords.join(', ') || 'ابزار آنلاین, رایگان, فارسی';
  const finalCanonical = canonical || (toolSlug ? `https://langar.co/tool/${toolSlug}` : 'https://langar.co/');
  const finalOgImage = ogImage || '/src/assets/social-logo.jpg';
  
  // Generate rich schemas
  let schemas: any[] = [];
  
  if (toolSeoData && toolSlug) {
    // Tool schema
    const toolSchema = generateToolSchema(
      toolSeoData.title,
      toolSeoData.description,
      toolSlug,
      'ابزار آنلاین',
      toolSeoData.keywords
    );
    if (toolSchema) schemas.push(toolSchema);
    
    // FAQ schema if available
    if (toolSeoData.faq?.length > 0) {
      const faqSchema = generateFAQSchema(toolSeoData.faq);
      if (faqSchema) schemas.push(faqSchema);
    }

    // HowTo schema from how-to steps
    if (toolSeoData.howToUse?.length > 0) {
      const howToSchema = generateHowToSchema(
        toolSeoData.title,
        toolSeoData.description,
        toolSeoData.howToUse
      );
      if (howToSchema) schemas.push(howToSchema);
    }
  }
  
  // Breadcrumb schema
  if (breadcrumbs?.length > 0) {
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
    if (breadcrumbSchema) schemas.push(breadcrumbSchema);
  }
  
  // FAQ schema from props
  if (faq?.length > 0) {
    const faqSchema = generateFAQSchema(faq);
    if (faqSchema) schemas.push(faqSchema);
  }
  
  const combinedSchema = schemas.length > 0 ? combineSchemas(...schemas) : null;
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Enhanced SEO Meta Tags */}
      <meta name="author" content="لنگر" />
      <meta name="publisher" content="لنگر" />
      <meta name="copyright" content="لنگر © 2024" />
      <meta name="language" content="fa-IR" />
      <meta name="geo.region" content="IR" />
      <meta name="geo.country" content="Iran" />
      
      {/* Canonical */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content="لنگر" />
      <meta property="og:locale" content="fa_IR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      
      {/* Additional SEO enhancements */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Structured Data */}
      {combinedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(combinedSchema)}
        </script>
      )}
      
      {/* Additional tool-specific meta tags */}
      {toolSeoData && (
        <>
          <meta name="application-name" content={toolSeoData.title} />
          <meta name="msapplication-tooltip" content={toolSeoData.description} />
          <meta name="msapplication-starturl" content={finalCanonical} />
          <meta name="format-detection" content="telephone=no" />
        </>
      )}
    </Helmet>
  );
};