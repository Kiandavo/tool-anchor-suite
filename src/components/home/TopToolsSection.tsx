import React from 'react';
import { Link } from 'react-router-dom';
import { tools } from '@/data/tools';
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

// Top tools based on common usage - hardcoded for consistency
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
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
          ابزارهای پرکاربرد این هفته
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {topTools.map((tool) => {
            if (!tool) return null;
            const Icon = iconMap[tool.slug] || Calculator;
            
            return (
              <Link
                key={tool.slug}
                to={`/tool/${tool.slug}`}
                className="group flex flex-col p-4 sm:p-5 rounded-xl bg-card border border-border/60 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-amber-600 group-hover:from-amber-500/20 group-hover:to-orange-500/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-amber-600 transition-colors line-clamp-1">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
