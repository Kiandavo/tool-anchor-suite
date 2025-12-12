import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, FileText, Image, Sparkles, Code, Globe } from 'lucide-react';
import { tools, categoryLabels } from '@/data/tools';
import { ToolCategory } from '@/types/tool-types';

// Category config with icons and featured tools
const categoryConfig: {
  category: ToolCategory;
  icon: React.ComponentType<{ className?: string }>;
  featuredSlugs: string[];
}[] = [
  {
    category: 'calculators',
    icon: Calculator,
    featuredSlugs: ['bmi-calculator', 'percentage-calculator', 'discount-calculator', 'age-calculator']
  },
  {
    category: 'text',
    icon: FileText,
    featuredSlugs: ['text-counter', 'json-formatter', 'password-generator', 'base64-encoder-decoder']
  },
  {
    category: 'image',
    icon: Image,
    featuredSlugs: ['image-compressor', 'image-resizer', 'qr-code-generator', 'image-cropper']
  },
  {
    category: 'readings',
    icon: Sparkles,
    featuredSlugs: ['hafez-fortune', 'tarot-reading', 'horoscope', 'numerology']
  },
  {
    category: 'seo',
    icon: Code,
    featuredSlugs: ['meta-tag-generator', 'keyword-density', 'robots-txt-generator', 'utm-builder']
  },
  {
    category: 'persian-cultural',
    icon: Globe,
    featuredSlugs: ['persian-calendar', 'persian-names', 'persian-proverbs', 'persian-holidays']
  }
];

export const CategoryPreviewSection = () => {
  return (
    <section className="py-8">
      <div className="container-narrow space-y-6">
        {categoryConfig.map(({ category, icon: Icon, featuredSlugs }) => {
          const categoryTools = featuredSlugs
            .map(slug => tools.find(t => t.slug === slug))
            .filter(Boolean)
            .slice(0, 4);

          if (categoryTools.length === 0) return null;

          return (
            <div key={category} className="bg-card border border-border rounded-xl p-4">
              {/* Category header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">
                    {categoryLabels[category]}
                  </h3>
                </div>
                <Link
                  to={`/category/${category}`}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  همه
                  <ArrowLeft className="w-3 h-3" />
                </Link>
              </div>

              {/* 4 tools in a row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool!.slug}
                    to={`/tool/${tool!.slug}`}
                    className="group p-2.5 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors text-center"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {tool!.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
