import React from 'react';
import { Helmet } from 'react-helmet-async';

interface GeoTargetingProps {
  title: string;
  description: string;
  canonical: string;
}

/**
 * Geo-targeting component for Persian-speaking regions
 * Phase 5: Persian-Specific SEO
 */
export function GeoTargeting({ title, description, canonical }: GeoTargetingProps) {
  // Generate alternate URLs for different regions
  const alternateUrls = [
    { hreflang: 'fa', href: canonical }, // Generic Persian
    { hreflang: 'fa-IR', href: canonical }, // Iran
    { hreflang: 'fa-AF', href: canonical }, // Afghanistan (Dari)
    { hreflang: 'fa-TJ', href: canonical }, // Tajikistan
    { hreflang: 'x-default', href: canonical } // Default fallback
  ];

  return (
    <Helmet>
      {/* Hreflang tags for regional targeting */}
      {alternateUrls.map((alt) => (
        <link
          key={alt.hreflang}
          rel="alternate"
          hrefLang={alt.hreflang}
          href={alt.href}
        />
      ))}

      {/* Geo-targeting meta tags */}
      <meta name="geo.region" content="IR" />
      <meta name="geo.placename" content="Iran" />
      
      {/* Additional geo meta tags for search engines */}
      <meta name="geo.position" content="35.6892;51.3890" /> {/* Tehran coordinates */}
      <meta name="ICBM" content="35.6892, 51.3890" />
      
      {/* Language and content targeting */}
      <meta httpEquiv="content-language" content="fa" />
      <meta name="language" content="Persian" />
      
      {/* Regional schema markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "لنگر",
          "url": canonical,
          "inLanguage": "fa",
          "areaServed": [
            {
              "@type": "Country",
              "name": "Iran",
              "alternateName": "ایران"
            },
            {
              "@type": "Country",
              "name": "Afghanistan",
              "alternateName": "افغانستان"
            },
            {
              "@type": "Country",
              "name": "Tajikistan",
              "alternateName": "تاجیکستان"
            }
          ],
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${canonical}?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        })}
      </script>

      {/* Regional business schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "لنگر",
          "url": canonical,
          "logo": `${canonical}/logo.png`,
          "description": description,
          "areaServed": ["IR", "AF", "TJ"],
          "availableLanguage": [
            {
              "@type": "Language",
              "name": "Persian",
              "alternateName": "فارسی"
            }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "",
            "contactType": "customer service",
            "areaServed": ["IR", "AF", "TJ"],
            "availableLanguage": ["fa"]
          }
        })}
      </script>
    </Helmet>
  );
}

/**
 * Regional content recommendations based on location
 */
export function getRegionalContent(region: 'IR' | 'AF' | 'TJ' | 'default') {
  const content = {
    IR: {
      currency: 'تومان',
      dateFormat: 'شمسی',
      holidays: ['نوروز', 'عید فطر', 'عید قربان', 'تاسوعا', 'عاشورا'],
      popular: ['محاسبه‌گر بیمه', 'محاسبه‌گر وام', 'تبدیل تاریخ']
    },
    AF: {
      currency: 'افغانی',
      dateFormat: 'شمسی',
      holidays: ['نوروز', 'عید فطر', 'عید قربان'],
      popular: ['تبدیل ارز', 'محاسبه‌گر قیمت', 'تقویم']
    },
    TJ: {
      currency: 'سامانی',
      dateFormat: 'میلادی',
      holidays: ['نوروز', 'روز استقلال'],
      popular: ['تبدیل تاریخ', 'محاسبه‌گر', 'ابزار متن']
    },
    default: {
      currency: 'تومان',
      dateFormat: 'شمسی',
      holidays: ['نوروز', 'عید فطر'],
      popular: ['محاسبه‌گر', 'تبدیل متن', 'ابزار تصویر']
    }
  };

  return content[region] || content.default;
}

/**
 * Get regional keywords for better local SEO
 */
export function getRegionalKeywords(region: 'IR' | 'AF' | 'TJ' | 'default'): string[] {
  const keywords = {
    IR: [
      'ابزار آنلاین ایران',
      'محاسبه‌گر ایرانی',
      'تبدیل تومان',
      'بیمه ایران',
      'تقویم شمسی ایران',
      'اوقات شرعی ایران'
    ],
    AF: [
      'ابزار آنلاین افغانستان',
      'محاسبه‌گر افغانی',
      'تبدیل افغانی',
      'تقویم افغانستان'
    ],
    TJ: [
      'ابزار آنلاین تاجیکستان',
      'محاسبه‌گر تاجیکی',
      'تبدیل سامانی'
    ],
    default: [
      'ابزار آنلاین فارسی',
      'محاسبه‌گر فارسی',
      'ابزار رایگان'
    ]
  };

  return keywords[region] || keywords.default;
}
