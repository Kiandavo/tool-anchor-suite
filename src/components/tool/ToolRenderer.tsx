import React, { Suspense, lazy } from 'react';
import { Tool } from '@/data/tools';

// Lazy load all renderers for better performance
const TextToolRenderer = lazy(() => import('./renderers/TextToolRenderer').then(m => ({ default: m.TextToolRenderer })));
const ImageToolRenderer = lazy(() => import('./renderers/ImageToolRenderer').then(m => ({ default: m.ImageToolRenderer })));
const CalculatorToolRenderer = lazy(() => import('./renderers/CalculatorToolRenderer').then(m => ({ default: m.CalculatorToolRenderer })));
const UtilityToolRenderer = lazy(() => import('./renderers/UtilityToolRenderer').then(m => ({ default: m.UtilityToolRenderer })));
const DesignToolRenderer = lazy(() => import('./renderers/DesignToolRenderer').then(m => ({ default: m.DesignToolRenderer })));
const ProductivityToolRenderer = lazy(() => import('./renderers/ProductivityToolRenderer').then(m => ({ default: m.ProductivityToolRenderer })));
const EducationalToolRenderer = lazy(() => import('./renderers/EducationalToolRenderer').then(m => ({ default: m.EducationalToolRenderer })));
const ReadingTool = lazy(() => import('@/pages/ToolTypes/ReadingTool'));
const PersianCulturalTool = lazy(() => import('@/pages/ToolTypes/PersianCulturalTool'));
const TextAnalyzer = lazy(() => import('@/pages/ToolTypes/TextTools/TextAnalyzer'));
const BirthChart = lazy(() => import('@/components/fal/BirthChart').then(m => ({ default: m.BirthChart })));
const CrystalBall = lazy(() => import('@/components/fal/CrystalBall').then(m => ({ default: m.CrystalBall })));

// Optimized loading skeleton
const ToolLoadingSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="bg-muted/30 rounded-xl p-6">
      <div className="h-8 bg-muted/50 rounded w-1/3 mb-4" />
      <div className="h-4 bg-muted/40 rounded w-2/3 mb-2" />
      <div className="h-4 bg-muted/40 rounded w-1/2" />
    </div>
    <div className="bg-muted/30 rounded-xl p-6 h-64" />
  </div>
);

interface ToolRendererProps {
  tool: Tool;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool, slug }) => {
  const renderTool = () => {
    // Special-case slugs that have dedicated renderers outside their categories
    if (tool.slug === 'random-password' || tool.slug === 'password-generator') {
      return <UtilityToolRenderer slug={slug} type="random-password" />;
    }
    if (tool.slug === 'prime-checker') {
      return <UtilityToolRenderer slug={slug} type="prime-checker" />;
    }
    if (tool.slug === 'text-counter') {
      return <UtilityToolRenderer slug={slug} type="text-counter" />;
    }
    if (tool.slug === 'robots-txt-generator') {
      return <UtilityToolRenderer slug={slug} type="robots-txt-generator" />;
    }
    if (tool.slug === 'qr-code-generator') {
      return <UtilityToolRenderer slug={slug} type="qr-code-generator" />;
    }
    if (tool.slug === 'text-analyzer') {
      return <TextAnalyzer />;
    }

    // Route tools based on their category
    switch (tool.category) {
      case 'calculators':
        return <CalculatorToolRenderer slug={slug} type={getCalculatorType(slug)} />;
      
      case 'text':
        return <TextToolRenderer slug={slug} />;
      
      case 'image':
        return <ImageToolRenderer slug={slug} />;
      
      case 'seo':
        return <UtilityToolRenderer slug={slug} type="seo" />;
      
      case 'random':
        return <UtilityToolRenderer slug={slug} type="random" />;
      
      case 'number':
        return <UtilityToolRenderer slug={slug} type="number" />;
      
      case 'readings':
        if (slug === 'birth-chart') return <BirthChart />;
        if (slug === 'crystal-ball') return <CrystalBall />;
        return <ReadingTool slug={slug} />;
      
      case 'design':
        return <DesignToolRenderer slug={slug} />;
      
      case 'productivity':
        return <ProductivityToolRenderer slug={slug} />;
      
      case 'educational':
        return <EducationalToolRenderer slug={slug} />;
      
      case 'persian-cultural':
        return <PersianCulturalTool slug={slug} />;
      
      default:
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h1 className="text-2xl font-bold mb-4">{tool.name}</h1>
              <p className="text-muted-foreground mb-6">{tool.description}</p>
              
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <h3 className="text-lg font-medium mb-2">این ابزار در حال توسعه است</h3>
                <p className="text-muted-foreground">به زودی راه‌اندازی خواهد شد</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Suspense fallback={<ToolLoadingSkeleton />}>
      {renderTool()}
    </Suspense>
  );
};

function getCalculatorType(slug: string): 'calculator' | 'investment-calculator' | 'mortgage-calculator' | 'today-date' | 'date-difference' | 'world-time' | 'profit' | 'scientific-calculator' | 'rent-factors' | 'loan-calculator' | 'power-calculator' | 'tip-calculator' | 'volume-calculator' {
  switch (slug) {
    case 'investment-calculator':
      return 'investment-calculator';
    case 'mortgage-calculator':
      return 'mortgage-calculator';
    case 'today-date-converter':
      return 'today-date';
    case 'date-difference':
      return 'date-difference';
    case 'world-time':
      return 'world-time';
    case 'profit':
    case 'profit-calculator':
      return 'profit';
    case 'scientific-calculator':
      return 'scientific-calculator';
    case 'rent-factors':
      return 'rent-factors';
    case 'loan-calculator':
      return 'loan-calculator';
    case 'power-calculator':
      return 'power-calculator';
    case 'tip-calculator':
      return 'tip-calculator';
    case 'volume-calculator':
      return 'volume-calculator';
    default:
      return 'calculator';
  }
}
