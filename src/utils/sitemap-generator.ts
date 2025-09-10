/**
 * Automated Sitemap Generation for Better SEO
 * Generates complete sitemaps for all pages, tools, categories and images
 */

import { tools, categoryLabels } from '@/data/tools';
import { generateToolsSitemapEntries, generateCategorySitemapEntries } from './seo-generation';

/**
 * Generate main sitemap.xml with all static pages and dynamic content
 */
export function generateMainSitemap(): string {
  const baseUrl = 'https://langar.co';
  const today = new Date().toISOString().split('T')[0];
  
  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about-us', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'weekly' },
    { url: '/faq', priority: '0.7', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' }
  ];
  
  // Generate static pages XML
  const staticPagesXml = staticPages.map(page => 
    `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('\n');
  
  // Generate categories XML
  const categoriesXml = generateCategorySitemapEntries().join('\n');
  
  // Generate tools XML (first 50 most important)
  const toolsXml = generateToolsSitemapEntries().slice(0, 50).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${staticPagesXml}
${categoriesXml}
${toolsXml}
</urlset>`;
}

/**
 * Generate tools-specific sitemap
 */
export function generateToolsSitemap(): string {
  const baseUrl = 'https://langar.co';
  
  const toolsXml = tools.map(tool => {
    const priority = tool.isNew ? '0.9' : tool.category === 'calculators' ? '0.8' : '0.7';
    const changefreq = tool.isNew ? 'daily' : 'weekly';
    const lastmod = new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>${baseUrl}/tool/${tool.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <mobile:mobile/>
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${toolsXml}
</urlset>`;
}

/**
 * Generate images sitemap for better image SEO
 */
export function generateImagesSitemap(): string {
  const baseUrl = 'https://langar.co';
  const today = new Date().toISOString().split('T')[0];
  
  // Generate image entries for tools (icons and screenshots)
  const toolImagesXml = tools.map(tool => {
    return `  <url>
    <loc>${baseUrl}/tool/${tool.slug}</loc>
    <image:image>
      <image:loc>${baseUrl}/icons/${tool.icon || 'default'}.svg</image:loc>
      <image:title>${tool.name}</image:title>
      <image:caption>${tool.description}</image:caption>
    </image:image>
    <lastmod>${today}</lastmod>
  </url>`;
  }).join('\n');
  
  // Add main site images
  const siteImagesXml = `  <url>
    <loc>${baseUrl}/</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.jpg</image:loc>
      <image:title>لنگر - ابزارهای آنلاین رایگان فارسی</image:title>
      <image:caption>بیش از 100 ابزار آنلاین رایگان فارسی برای محاسبات، متن، تصویر و موارد دیگر</image:caption>
    </image:image>
    <lastmod>${today}</lastmod>
  </url>`;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${siteImagesXml}
${toolImagesXml}
</urlset>`;
}

/**
 * Generate sitemap index file
 */
export function generateSitemapIndex(): string {
  const baseUrl = 'https://langar.co';
  const today = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-tools.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}

/**
 * Generate robots.txt for better crawling
 */
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://langar.co/sitemap-index.xml
Sitemap: https://langar.co/sitemap.xml
Sitemap: https://langar.co/sitemap-tools.xml
Sitemap: https://langar.co/sitemap-images.xml

# Block admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important directories
Allow: /tool/
Allow: /category/
Allow: /blog/
Allow: /assets/

# Crawl delay for respectful crawling
Crawl-delay: 1

# Host declaration
Host: https://langar.co`;
}