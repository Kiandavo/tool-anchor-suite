// Generate robots.txt content for SEO
export const generateRobotsTxt = (): string => {
  const baseUrl = 'https://langar.co';
  
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Disallow search result pages to prevent duplicate content
Disallow: /search?*

# Allow important crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

# Crawl delay for less aggressive crawlers
User-agent: *
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Additional directives for Persian search engines
User-agent: YandexBot
Allow: /

User-agent: BaiduSpider
Allow: /
`;
};