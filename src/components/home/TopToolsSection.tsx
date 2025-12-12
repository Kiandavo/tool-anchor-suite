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
    <section className="py-10 sm:py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            ابزارهای پرکاربرد
          </h2>
          <Link 
            to="/all-tools" 
            className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1 font-medium"
          >
            همه ابزارها
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* 12 tools in a clean grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topTools.map((tool) => {
            if (!tool) return null;
            const Icon = iconMap[tool.slug] || Calculator;
            
            return (
              <Link
                key={tool.slug}
                to={`/tool/${tool.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-amber-500/50 hover:shadow-md transition-all duration-200"
              >
                {/* Icon */}
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20 transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-amber-600 transition-colors truncate">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {tool.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-amber-500 transition-colors flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
