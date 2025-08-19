
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
      "url": "https://langar.co",
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
        "url": "https://langar.co"
      },
      "publisher": {
        "@type": "Organization",
        "name": "لنگر",
        "url": "https://langar.co"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://langar.co/search?q={search_term_string}",
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
      "url": `https://langar.co/tool/${slug}`,
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
        "url": "https://langar.co"
      },
      "publisher": {
        "@type": "Organization",
        "name": "لنگر",
        "url": "https://langar.co"
      },
      "isPartOf": {
        "@type": "WebSite",
        "name": "لنگر - ابزارهای آنلاین",
        "url": "https://langar.co"
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
      "url": `https://langar.co/category/${slug}`,
      "inLanguage": "fa-IR",
      "isPartOf": {
        "@type": "WebSite",
        "name": "لنگر - ابزارهای آنلاین",
        "url": "https://langar.co"
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
          "url": `https://langar.co/tool/${tool.slug}`
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
