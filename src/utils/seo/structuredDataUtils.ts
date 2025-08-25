// Enhanced structured data utilities for better SEO

interface WebsiteStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  alternateName?: string;
  url: string;
  description: string;
  inLanguage: string;
  publisher: {
    "@type": string;
    name: string;
  };
  potentialAction: {
    "@type": string;
    target: string;
    name: string;
  };
}

interface ToolStructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  provider: {
    "@type": string;
    name: string;
    url: string;
  };
}

interface ArticleStructuredData {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author: {
    "@type": string;
    name: string;
  };
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  mainEntityOfPage: {
    "@type": string;
    "@id": string;
  };
}

export const generateWebsiteStructuredData = (): WebsiteStructuredData => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "لنگر - ابزارهای آنلاین رایگان",
  alternateName: "Langar Online Tools",
  url: "https://langar.co",
  description: "بیش از ۱۰۰ ابزار آنلاین رایگان فارسی برای محاسبات، تبدیل متن، ویرایش تصاویر، سئو، فال و طالع‌بینی",
  inLanguage: "fa-IR",
  publisher: {
    "@type": "Organization",
    name: "لنگر"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://langar.co/search?q={search_term_string}",
    name: "جستجوی ابزارها"
  }
});

export const generateToolStructuredData = (
  name: string,
  description: string,
  slug: string,
  category: string
): ToolStructuredData => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url: `https://langar.co/tool/${slug}`,
  applicationCategory: category,
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IRR"
  },
  provider: {
    "@type": "Organization",
    name: "لنگر",
    url: "https://langar.co"
  }
});

export const generateArticleStructuredData = (
  title: string,
  description: string,
  slug: string,
  publishDate: string,
  modifiedDate?: string
): ArticleStructuredData => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  author: {
    "@type": "Organization",
    name: "لنگر"
  },
  publisher: {
    "@type": "Organization",
    name: "لنگر",
    logo: {
      "@type": "ImageObject",
      url: "https://langar.co/logo.png"
    }
  },
  datePublished: publishDate,
  dateModified: modifiedDate || publishDate,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://langar.co/blog/${slug}`
  }
});

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url?: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url ? `https://langar.co${crumb.url}` : undefined
  }))
});

export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(faq => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});