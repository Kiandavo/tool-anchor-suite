
/**
 * Utility functions for generating Schema.org structured data
 * All functions include error handling for browser compatibility
 */

// Website schema for the entire site
export const generateWebsiteSchema = () => {
  try {
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
  } catch (error) {
    console.error('Error generating website schema:', error);
    return null;
  }
};

// Tool schema for individual tool pages
export const generateToolSchema = (
  name: string, 
  description: string, 
  slug: string, 
  category: string
) => {
  try {
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
