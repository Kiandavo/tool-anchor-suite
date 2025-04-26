
import React from 'react';
import { tools } from '@/data/tools';
import { ToolInfoCard } from '@/components/ToolInfoCard';
import { MetaTagGenerator } from '@/components/seo/MetaTagGenerator';
import { RobotsTxtGenerator } from '@/components/seo/RobotsTxtGenerator';
import { KeywordDensity } from '@/components/seo/KeywordDensity';
import { HtmlTools } from '@/components/seo/HtmlTools';

interface SeoToolProps {
  slug: string;
}

export default function SeoTool({ slug }: SeoToolProps) {
  const toolMeta = tools.find((t) => t.slug === slug);
  
  if (!toolMeta) return null;

  return (
    <div className="space-y-6">
      <ToolInfoCard
        name={toolMeta.name}
        description={toolMeta.description}
        learnMoreUrl={`https://www.google.com/search?q=${encodeURIComponent(toolMeta.name)}`}
      />
      
      {slug === 'meta-tag-generator' && <MetaTagGenerator />}
      {slug === 'robots-txt-generator' && <RobotsTxtGenerator />}
      {slug === 'keyword-density' && <KeywordDensity />}
      {(['html-heading-extractor', 'social-tags-generator', 'meta-refresh-generator', 'schema-generator', 'html-lang-checker'].includes(slug)) && (
        <HtmlTools />
      )}
      
      {!['meta-tag-generator', 'robots-txt-generator', 'keyword-density', 'html-heading-extractor', 'social-tags-generator', 'meta-refresh-generator', 'schema-generator', 'html-lang-checker'].includes(slug) && (
        <div className="rounded-lg border p-6 shadow-sm">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h3 className="text-lg font-medium">این ابزار در حال توسعه است</h3>
            <p className="text-muted-foreground">
              این ابزار به زودی راه‌اندازی خواهد شد. لطفاً بعداً مراجعه کنید.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
