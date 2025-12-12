import React from 'react';
import { Link } from 'react-router-dom';
import { tools } from '@/data/tools';
import { ArrowLeft } from 'lucide-react';
import { 
  Calculator, 
  FileText, 
  Image, 
  Sparkles, 
  QrCode, 
  Percent, 
  Scale, 
  Lock,
  Palette,
  Hash,
  Calendar,
  Type
} from 'lucide-react';

// 12 top tools - hardcoded for consistency
const topToolSlugs = [
  'bmi-calculator',
  'percentage-calculator',
  'text-counter',
  'image-compressor',
  'hafez-fortune',
  'qr-code-generator',
  'json-formatter',
  'password-generator',
  'discount-calculator',
  'age-calculator',
  'color-palette-generator',
  'unit-converter',
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'bmi-calculator': Scale,
  'percentage-calculator': Percent,
  'text-counter': FileText,
  'image-compressor': Image,
  'hafez-fortune': Sparkles,
  'qr-code-generator': QrCode,
  'json-formatter': Type,
  'password-generator': Lock,
  'discount-calculator': Calculator,
  'age-calculator': Calendar,
  'color-palette-generator': Palette,
  'unit-converter': Hash,
};

export const TopToolsSection = () => {
  const topTools = topToolSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter(Boolean);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            ابزارهای پرکاربرد
          </h2>
          <Link 
            to="/all-tools" 
            className="text-sm text-link flex items-center gap-1 font-medium"
          >
            همه ابزارها
            <ArrowLeft className="icon-sm" />
          </Link>
        </div>

        {/* 12 tools in unified grid */}
        <div className="grid-tools">
          {topTools.map((tool) => {
            if (!tool) return null;
            const Icon = iconMap[tool.slug] || Calculator;
            
            return (
              <Link
                key={tool.slug}
                to={`/tool/${tool.slug}`}
                className="tool-card group"
              >
                {/* Icon */}
                <div className="icon-box group-hover:bg-primary/20 transition-colors">
                  <Icon className="icon-md" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {tool.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <ArrowLeft className="icon-sm text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
