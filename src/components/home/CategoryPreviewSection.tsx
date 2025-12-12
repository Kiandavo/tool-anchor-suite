import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, FileText, Image, Sparkles, Code, Globe } from 'lucide-react';
import { tools, categoryLabels } from '@/data/tools';
import { ToolCategory } from '@/types/tool-types';
import { SectionDecorator } from './SectionDecorator';

// Category config with icons, URLs and featured tools
const categoryConfig: {
  category: ToolCategory;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  featuredSlugs: string[];
  gradient: string;
}[] = [
  {
    category: 'calculators',
    url: '/calculators',
    icon: Calculator,
    featuredSlugs: ['bmi-calculator', 'percentage-calculator', 'discount-calculator', 'age-calculator'],
    gradient: 'from-blue-500/10 to-blue-600/5'
  },
  {
    category: 'text',
    url: '/text-tools',
    icon: FileText,
    featuredSlugs: ['text-counter', 'password-generator', 'base64-encoder-decoder', 'text-translator'],
    gradient: 'from-emerald-500/10 to-emerald-600/5'
  },
  {
    category: 'image',
    url: '/image-tools',
    icon: Image,
    featuredSlugs: ['image-compressor', 'image-resizer', 'qr-code-generator', 'image-cropper'],
    gradient: 'from-purple-500/10 to-purple-600/5'
  },
  {
    category: 'readings',
    url: '/readings',
    icon: Sparkles,
    featuredSlugs: ['hafez-fortune', 'tarot-reading', 'horoscope', 'numerology'],
    gradient: 'from-amber-500/10 to-amber-600/5'
  },
  {
    category: 'seo',
    url: '/seo-tools',
    icon: Code,
    featuredSlugs: ['meta-tag-generator', 'keyword-density', 'robots-txt-generator', 'utm-builder'],
    gradient: 'from-rose-500/10 to-rose-600/5'
  },
  {
    category: 'persian-cultural',
    url: '/persian-tools',
    icon: Globe,
    featuredSlugs: ['today-date', 'age-calculator', 'date-difference', 'world-time'],
    gradient: 'from-teal-500/10 to-teal-600/5'
  }
];

export const CategoryPreviewSection = () => {
  return (
    <section className="relative py-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-persian-gold/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-gradient-to-br from-persian-turquoise/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="container-narrow relative z-10 space-y-4">
        {categoryConfig.map(({ category, url, icon: Icon, featuredSlugs, gradient }, categoryIndex) => {
          const categoryTools = featuredSlugs
            .map(slug => tools.find(t => t.slug === slug))
            .filter(Boolean)
            .slice(0, 4);

          if (categoryTools.length === 0) return null;

          return (
            <div 
              key={category} 
              className={`relative bg-gradient-to-br ${gradient} border border-border/50 rounded-xl p-4 overflow-hidden group hover:border-primary/20 transition-all duration-300`}
            >
              {/* Subtle pattern overlay */}
              {categoryIndex === 0 && <SectionDecorator variant="circles" position="right" opacity={0.08} />}
              {categoryIndex === 1 && <SectionDecorator variant="stars" position="right" opacity={0.08} />}
              {categoryIndex === 2 && <SectionDecorator variant="diamonds" position="right" opacity={0.08} />}
              
              {/* Category header */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">
                    {categoryLabels[category]}
                  </h3>
                </div>
                <Link
                  to={url}
                  className="text-xs text-primary hover:underline flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                >
                  همه
                  <ArrowLeft className="w-3 h-3" />
                </Link>
              </div>

              {/* 4 tools in a row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool!.slug}
                    to={`/tool/${tool!.slug}`}
                    className="group/tool p-2.5 rounded-lg bg-card/60 backdrop-blur-sm hover:bg-card hover:shadow-sm transition-all duration-200 text-center border border-transparent hover:border-primary/20"
                  >
                    <span className="text-sm font-medium text-foreground group-hover/tool:text-primary transition-colors line-clamp-1">
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
