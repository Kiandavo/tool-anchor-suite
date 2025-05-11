
interface MetaTagsProps {
  title: string;
  description: string;
  keywords: string;
  author: string;
  viewport: boolean;
  robots: boolean;
  canonical: string;
  language: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  ogType: string;
  twitterCard: string;
}

export function generateMetaTags({
  title,
  description,
  keywords,
  author,
  viewport,
  robots,
  canonical,
  language,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType,
  twitterCard
}: MetaTagsProps): string {
  let metaTags = '';
  
  // Basic meta tags
  if (title) {
    metaTags += `<title>${title}</title>\n`;
    metaTags += `<meta name="title" content="${title}">\n`;
  }
  
  if (description) {
    metaTags += `<meta name="description" content="${description}">\n`;
  }
  
  if (keywords) {
    metaTags += `<meta name="keywords" content="${keywords}">\n`;
  }
  
  if (author) {
    metaTags += `<meta name="author" content="${author}">\n`;
  }
  
  if (viewport) {
    metaTags += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
  }
  
  if (robots) {
    metaTags += `<meta name="robots" content="index, follow">\n`;
  } else {
    metaTags += `<meta name="robots" content="noindex, nofollow">\n`;
  }
  
  if (language) {
    metaTags += `<meta http-equiv="content-language" content="${language}">\n`;
  }
  
  if (canonical) {
    metaTags += `<link rel="canonical" href="${canonical}">\n`;
  }
  
  // Open Graph meta tags
  if (ogTitle || title) {
    metaTags += `<meta property="og:title" content="${ogTitle || title}">\n`;
  }
  
  if (ogDescription || description) {
    metaTags += `<meta property="og:description" content="${ogDescription || description}">\n`;
  }
  
  if (ogImage) {
    metaTags += `<meta property="og:image" content="${ogImage}">\n`;
  }
  
  if (ogUrl || canonical) {
    metaTags += `<meta property="og:url" content="${ogUrl || canonical}">\n`;
  }
  
  if (ogType) {
    metaTags += `<meta property="og:type" content="${ogType}">\n`;
  }
  
  // Twitter meta tags
  if (twitterCard) {
    metaTags += `<meta name="twitter:card" content="${twitterCard}">\n`;
    
    if (ogTitle || title) {
      metaTags += `<meta name="twitter:title" content="${ogTitle || title}">\n`;
    }
    
    if (ogDescription || description) {
      metaTags += `<meta name="twitter:description" content="${ogDescription || description}">\n`;
    }
    
    if (ogImage) {
      metaTags += `<meta name="twitter:image" content="${ogImage}">\n`;
    }
  }
  
  return metaTags;
}
