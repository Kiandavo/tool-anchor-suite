import React from 'react';
import { Link } from 'react-router-dom';
import { tools, getNewTools } from '@/data/tools';
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
  
  const newToolSlugs = getNewTools().map(t => t.slug);

  return (
    <section className="py-8">
      <div className="container-narrow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            پرکاربرد
          </h2>
          <Link 
            to="/all-tools" 
            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          >
            همه
            <ArrowLeft className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topTools.map((tool) => {
            if (!tool) return null;
            const Icon = iconMap[tool.slug] || Calculator;
            const isNew = newToolSlugs.includes(tool.slug);
            
            return (
              <Link
                key={tool.slug}
                to={`/tool/${tool.slug}`}
                className="group relative flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
              >
                {isNew && (
                  <span className="absolute -top-2 -right-2 text-[9px] font-medium px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    جدید
                  </span>
                )}
                
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {tool.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
