import { rumiSeoContent } from '@/data/rumi-seo-content';

export const generateRumiStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://langar.co/tool/rumi-istikhara#webapp",
        "name": "استخاره با مولانا",
        "description": rumiSeoContent.description,
        "url": "https://langar.co/tool/rumi-istikhara",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "IRR",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "150",
          "bestRating": "5",
          "worstRating": "1"
        },
        "author": {
          "@type": "Organization",
          "name": "لنگر",
          "url": "https://langar.co"
        },
        "potentialAction": {
          "@type": "UseAction",
          "target": "https://langar.co/tool/rumi-istikhara"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://langar.co/tool/rumi-istikhara#faq",
        "mainEntity": rumiSeoContent.faq.map((item, index) => ({
          "@type": "Question",
          "@id": `https://langar.co/tool/rumi-istikhara#faq-${index}`,
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      {
        "@type": "HowTo",
        "@id": "https://langar.co/tool/rumi-istikhara#howto",
        "name": "نحوه استفاده از استخاره با مولانا",
        "description": "راهنمای گام به گام استفاده از ابزار استخاره با مولانا",
        "step": rumiSeoContent.howToUse.map((step, index) => ({
          "@type": "HowToStep",
          "position": step.step,
          "name": `مرحله ${step.step}`,
          "text": step.instruction,
          "url": `https://langar.co/tool/rumi-istikhara#step-${index}`
        }))
      },
      {
        "@type": "Person",
        "@id": "https://langar.co/tool/rumi-istikhara#rumi",
        "name": "جلال‌الدین مولوی",
        "alternateName": ["مولانا", "رومی"],
        "description": "عارف، شاعر و فیلسوف بزرگ قرن هفتم هجری",
        "birthDate": "1207",
        "deathDate": "1273",
        "nationality": "Persian",
        "knownFor": "مثنوی معنوی، دیوان شمس"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://langar.co/tool/rumi-istikhara#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "لنگر",
            "item": "https://langar.co/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "ابزارهای طالع‌بینی",
            "item": "https://langar.co/category/readings"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "استخاره با مولانا",
            "item": "https://langar.co/tool/rumi-istikhara"
          }
        ]
      }
    ]
  };
};