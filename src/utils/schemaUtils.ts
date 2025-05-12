
/**
 * Utility functions for generating Schema.org structured data
 */

// Website schema for the entire site
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "لنگر - ابزارهای آنلاین رایگان",
    "url": "https://langar.co",
    "description": "مجموعه کامل ابزارهای آنلاین رایگان برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو و بهینه‌سازی",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://langar.co/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "fa-IR"
  };
};

// Tool schema for individual tool pages
export const generateToolSchema = (
  name: string, 
  description: string, 
  slug: string, 
  category: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": `https://langar.co/tool/${slug}`,
    "applicationCategory": category,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Any",
    "inLanguage": "fa-IR",
    "isPartOf": {
      "@type": "WebSite",
      "name": "لنگر - ابزارهای آنلاین",
      "url": "https://langar.co"
    }
  };
};

// BreadcrumbList schema for navigation
export const generateBreadcrumbSchema = (items: {name: string, url: string}[]) => {
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
};

// Category schema for category pages
export const generateCategorySchema = (
  name: string,
  description: string,
  slug: string,
  tools: {name: string, slug: string, description: string}[]
) => {
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
};

// FAQ schema for FAQ sections
export const generateFAQSchema = (
  questions: {question: string, answer: string}[]
) => {
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
};

// Combine multiple schema objects
export const combineSchemas = (...schemas: any[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": schemas
  };
};
