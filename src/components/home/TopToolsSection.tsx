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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

        <TooltipProvider delayDuration={200}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {topTools.map((tool) => {
              if (!tool) return null;
              const Icon = iconMap[tool.slug] || Calculator;
              const isNew = newToolSlugs.includes(tool.slug);
              
              return (
                <Tooltip key={tool.slug}>
                  <TooltipTrigger asChild>
                    <Link
                      to={`/tool/${tool.slug}`}
                      className="group relative flex items-center gap-2.5 p-3 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors"
                    >
                      {isNew && (
                        <span className="absolute -top-1.5 -right-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                          جدید
                        </span>
                      )}
                      
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[200px] text-center">
                    <p className="text-xs">{tool.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};
