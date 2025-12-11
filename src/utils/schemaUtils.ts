
/**
 * Utility functions for generating Schema.org structured data
 * All functions include error handling for browser compatibility
 */

// Enhanced website schema for the entire site
export const generateWebsiteSchema = () => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "لنگر - ابزارهای آنلاین رایگان",
      "alternateName": "Langar Online Tools",
      "url": "https://laangar.com",
      "description": "بیش از ۱۰۰ ابزار آنلاین رایگان فارسی برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو، فال و طالع‌بینی. بهترین ابزارهای آنلاین ایرانی.",
      "keywords": "ابزار آنلاین, محاسبه گر, تبدیل متن, ویرایش تصویر, سئو, فال, ابزار فارسی, لنگر",
      "inLanguage": "fa-IR",
      "audience": {
        "@type": "Audience",
        "audienceType": "Persian speakers, Iranian users, Online tool users"
      },
      "author": {
        "@type": "Organization",
        "name": "لنگر",
        "url": "https://laangar.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "لنگر",
        "url": "https://laangar.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://laangar.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "ابزارهای آنلاین لنگر",
        "description": "مجموعه کامل ابزارهای آنلاین رایگان",
        "numberOfItems": "100+"
      }
    };
  } catch (error) {
    console.error('Error generating website schema:', error);
    return null;
  }
};

// Enhanced tool schema for individual tool pages
export const generateToolSchema = (
  name: string, 
  description: string, 
  slug: string, 
  category: string,
  keywords?: string[],
  screenshots?: string[]
) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": name,
      "description": description,
      "url": `https://laangar.com/tool/${slug}`,
      "applicationCategory": category,
      "applicationSubCategory": "Web Application",
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript enabled",
      "permissions": "No special permissions required",
      "memoryRequirements": "Minimal",
      "storageRequirements": "No storage required",
      "inLanguage": "fa-IR",
      "availableLanguage": "fa-IR",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "author": {
        "@type": "Organization",
        "name": "لنگر",
        "url": "https://laangar.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "لنگر",
        "url": "https://laangar.com"
      },
      "isPartOf": {
        "@type": "WebSite",
        "name": "لنگر - ابزارهای آنلاین",
        "url": "https://laangar.com"
      },
      "featureList": [
        "ابزار آنلاین رایگان",
        "بدون نیاز به نصب",
        "پشتیبانی از زبان فارسی",
        "طراحی ریسپانسیو",
        "امنیت بالا"
      ],
      ...(keywords && keywords.length > 0 && { "keywords": keywords.join(", ") }),
      ...(screenshots && screenshots.length > 0 && { "screenshot": screenshots })
    };
  } catch (error) {
    console.error('Error generating tool schema:', error);
    return null;
  }
};

// BreadcrumbList schema for navigation
export const generateBreadcrumbSchema = (items: {name: string, url: string}[]) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };
  } catch (error) {
    console.error('Error generating breadcrumb schema:', error);
    return null;
  }
};

// Category schema for category pages
export const generateCategorySchema = (
  name: string,
  description: string,
  slug: string,
  tools: {name: string, slug: string, description: string}[]
) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": name,
      "description": description,
      "url": `https://laangar.com/category/${slug}`,
      "inLanguage": "fa-IR",
      "isPartOf": {
        "@type": "WebSite",
        "name": "لنگر - ابزارهای آنلاین",
        "url": "https://laangar.com"
      },
      "about": {
        "@type": "Thing",
        "name": name
      },
      "itemListElement": tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `https://laangar.com/tool/${tool.slug}`
        }
      }))
    };
  } catch (error) {
    console.error('Error generating category schema:', error);
    return null;
  }
};

// FAQ schema for FAQ sections
export const generateFAQSchema = (
  questions: {question: string, answer: string}[]
) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
  } catch (error) {
    console.error('Error generating FAQ schema:', error);
    return null;
  }
};

// HowTo schema for step-by-step instructions on tool pages
export const generateHowToSchema = (
  name: string,
  description: string,
  steps: { step: number; instruction: string }[],
  totalTime?: string
) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": name,
      "description": description,
      "inLanguage": "fa-IR",
      ...(totalTime && { "totalTime": totalTime }),
      "step": steps.map(s => ({
        "@type": "HowToStep",
        "position": s.step,
        "name": `مرحله ${s.step}`,
        "text": s.instruction
      }))
    };
  } catch (error) {
    console.error('Error generating HowTo schema:', error);
    return null;
  }
};

// Organization schema for better brand recognition
export const generateOrganizationSchema = () => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "لنگر",
      "alternateName": "Langar Online Tools",
      "url": "https://laangar.com",
      "logo": "https://laangar.com/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png",
      "description": "ارائه‌دهنده بیش از ۱۰۰ ابزار آنلاین رایگان فارسی برای محاسبات، تبدیل متن، ویرایش تصاویر و سئو",
      "foundingDate": "2024",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": ["fa-IR", "en"]
      },
      "sameAs": [
        "https://www.instagram.com/kiandavo"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IR",
        "addressLocality": "تهران"
      }
    };
  } catch (error) {
    console.error('Error generating organization schema:', error);
    return null;
  }
};

// LocalBusiness schema for local SEO
export const generateLocalBusinessSchema = () => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://laangar.com/#localbusiness",
      "name": "لنگر - ابزارهای آنلاین رایگان",
      "alternateName": "Laangar Online Tools",
      "description": "ارائه‌دهنده بیش از ۱۰۰ ابزار آنلاین رایگان فارسی شامل محاسبه‌گر، تبدیل متن، ویرایش تصویر، سئو، فال حافظ و طالع‌بینی",
      "url": "https://laangar.com",
      "logo": "https://laangar.com/assets/laangar-logo.png",
      "image": "https://laangar.com/assets/social-logo.jpg",
      "telephone": "",
      "email": "info@laangar.com",
      "priceRange": "رایگان",
      "currenciesAccepted": "IRR",
      "paymentAccepted": "Free",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IR",
        "addressRegion": "تهران",
        "addressLocality": "تهران",
        "postalCode": "",
        "streetAddress": ""
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "35.6892",
        "longitude": "51.3890"
      },
      "areaServed": {
        "@type": "Country",
        "name": "ایران"
      },
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "35.6892",
          "longitude": "51.3890"
        },
        "geoRadius": "5000000"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://www.instagram.com/kiandavo"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "ابزارهای آنلاین لنگر",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "ابزارهای محاسباتی",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "محاسبه‌گر BMI"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "محاسبه‌گر وام"
                }
              }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "فال و طالع‌بینی",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "فال حافظ"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "فال تاروت"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "استخاره مولانا"
                }
              }
            ]
          }
        ]
      }
    };
  } catch (error) {
    console.error('Error generating local business schema:', error);
    return null;
  }
};

// Enhanced WebSite schema with SearchAction
export const generateEnhancedWebsiteSchema = () => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://laangar.com/#website",
      "name": "لنگر",
      "alternateName": ["Laangar", "لنگر آنلاین", "Langar Tools"],
      "url": "https://laangar.com",
      "description": "بیش از ۱۰۰ ابزار آنلاین رایگان فارسی برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو، فال حافظ و طالع‌بینی",
      "inLanguage": "fa-IR",
      "publisher": {
        "@type": "Organization",
        "@id": "https://laangar.com/#organization"
      },
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://laangar.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "copyrightYear": "2024",
      "copyrightHolder": {
        "@type": "Organization",
        "name": "لنگر"
      }
    };
  } catch (error) {
    console.error('Error generating enhanced website schema:', error);
    return null;
  }
};

// Enhanced Organization schema
export const generateEnhancedOrganizationSchema = () => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://laangar.com/#organization",
      "name": "لنگر",
      "alternateName": ["Laangar", "Langar Online Tools"],
      "url": "https://laangar.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://laangar.com/assets/laangar-logo.png",
        "width": "512",
        "height": "512"
      },
      "image": "https://laangar.com/assets/social-logo.jpg",
      "description": "ارائه‌دهنده بیش از ۱۰۰ ابزار آنلاین رایگان فارسی برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو، فال و طالع‌بینی",
      "foundingDate": "2024",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IR",
          "addressLocality": "تهران"
        }
      },
      "areaServed": {
        "@type": "Country",
        "name": "ایران"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["fa", "en"],
          "email": "info@laangar.com"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/kiandavo"
      ],
      "knowsAbout": [
        "Online Tools",
        "Persian Fortune Telling",
        "Calculators",
        "Image Editing",
        "SEO Tools",
        "Text Conversion"
      ]
    };
  } catch (error) {
    console.error('Error generating enhanced organization schema:', error);
    return null;
  }
};

// Article schema for blog posts and guides
export const generateArticleSchema = (
  headline: string,
  description: string,
  author: string,
  datePublished: string,
  dateModified: string,
  imageUrl?: string,
  articleUrl?: string
) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": headline,
      "description": description,
      "image": imageUrl || "https://laangar.com/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png",
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "لنگر",
        "logo": {
          "@type": "ImageObject",
          "url": "https://laangar.com/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png"
        }
      },
      "datePublished": datePublished,
      "dateModified": dateModified,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl || "https://laangar.com"
      },
      "inLanguage": "fa-IR"
    };
  } catch (error) {
    console.error('Error generating article schema:', error);
    return null;
  }
};

// Video schema for tutorial videos
export const generateVideoSchema = (
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration: string,
  contentUrl?: string
) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": name,
      "description": description,
      "thumbnailUrl": thumbnailUrl,
      "uploadDate": uploadDate,
      "duration": duration,
      ...(contentUrl && { "contentUrl": contentUrl }),
      "publisher": {
        "@type": "Organization",
        "name": "لنگر",
        "logo": {
          "@type": "ImageObject",
          "url": "https://laangar.com/lovable-uploads/76e15b28-6fa7-4dd3-bb57-922abbe9dca7.png"
        }
      },
      "inLanguage": "fa-IR"
    };
  } catch (error) {
    console.error('Error generating video schema:', error);
    return null;
  }
};

// Review/Rating schema for tools
export const generateReviewSchema = (
  itemName: string,
  ratingValue: number,
  reviewCount: number,
  bestRating: number = 5
) => {
  try {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": itemName,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue.toString(),
        "reviewCount": reviewCount.toString(),
        "bestRating": bestRating.toString(),
        "worstRating": "1"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    };
  } catch (error) {
    console.error('Error generating review schema:', error);
    return null;
  }
};

// Combine multiple schema objects
export const combineSchemas = (...schemas: any[]) => {
  try {
    // Filter out null schemas
    const validSchemas = schemas.filter(schema => schema !== null && schema !== undefined);
    
    if (validSchemas.length === 0) {
      return null;
    }
    
    if (validSchemas.length === 1) {
      return validSchemas[0];
    }
    
    return {
      "@context": "https://schema.org",
      "@graph": validSchemas
    };
  } catch (error) {
    console.error('Error combining schemas:', error);
    return null;
  }
};
