
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { MetaTagGenerator as SeoMetaTagGenerator } from '@/components/seo/MetaTagGenerator';
import { HtmlTools } from '@/components/seo/HtmlTools';
import { KeywordDensity } from '@/components/seo/KeywordDensity';
import { KeywordExtractor } from '@/components/seo/KeywordExtractor';
import { RobotsTxtGenerator } from '@/components/seo/RobotsTxtGenerator';
import { UTMBuilder } from '@/components/seo/UTMBuilder';
import { OGTagGenerator } from '@/components/seo/OGTagGenerator';
import { SitemapGenerator } from '@/components/seo/SitemapGenerator';
import { SchemaGenerator } from '@/components/seo-tools/SchemaGenerator';
import { MetaTagGenerator } from '@/components/seo-tools/MetaTagGenerator';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { 
  generateCalendarSeoData, 
  generateReadingsSeoData, 
  generateLongTailKeywords,
  generateIntentKeywords,
  generateCulturalKeywords 
} from '@/utils/seoUtils';

interface SeoToolProps {
  slug: string;
}

export default function SeoTool({ slug }: SeoToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);

  if (!toolMeta) return null;

  // Generate enhanced SEO data for the tool
  const enhancedKeywords = [
    ...generateLongTailKeywords(toolMeta.name, 'seo'),
    ...generateIntentKeywords(toolMeta.name, 'seo'),
    ...generateCulturalKeywords('seo')
  ].join(', ');

  const renderToolContent = () => {
    switch (slug) {
      case 'meta-tag-generator':
        return <MetaTagGenerator />;
      case 'html-meta-tags':
        return <HtmlTools />;
      case 'keyword-density':
        return <KeywordDensity />;
      case 'keyword-extractor':
        return <KeywordExtractor />;
      case 'robots-txt-generator':
        return <RobotsTxtGenerator />;
      case 'utm-builder':
        return <UTMBuilder />;
      case 'open-graph-generator':
        return <OGTagGenerator />;
      case 'sitemap-generator':
        return <SitemapGenerator />;
      case 'schema-generator':
        return <SchemaGenerator />;
      default:
        return (
          <div className="rounded-lg border p-6 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
              <p className="text-muted-foreground">
                این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
              </p>
            </div>
          </div>
        );
    }
  };

  // Generate breadcrumbs for SEO
  const breadcrumbs = [
    { name: 'لنگر', url: 'https://laangar.com/' },
    { name: 'ابزارهای سئو', url: 'https://laangar.com/category/seo' },
    { name: toolMeta.name, url: `https://laangar.com/tool/${slug}` }
  ];

  return (
    <div className="space-y-6">
      <EnhancedSeoHead
        toolSlug={slug}
        pageType="tool"
        title={`${toolMeta.name} | ابزار سئو حرفه‌ای رایگان - لنگر`}
        description={`✅ ${toolMeta.name} حرفه‌ای | ${toolMeta.description} | بهینه‌سازی سئو | رایگان و کامل | لنگر`}
        keywords={enhancedKeywords}
        breadcrumbs={breadcrumbs}
      />
      <ToolInfoCard
        name={toolMeta.name}
        description={toolMeta.description}
        learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name + ' سئو')}`}
      />
      {renderToolContent()}
    </div>
  );
}
