import React from 'react';
import { Tool } from '@/data/tools';
import { TextToolRenderer } from './renderers/TextToolRenderer';
import { ImageToolRenderer } from './renderers/ImageToolRenderer';
import { CalculatorToolRenderer } from './renderers/CalculatorToolRenderer';
import { UtilityToolRenderer } from './renderers/UtilityToolRenderer';
import { DesignToolRenderer } from './renderers/DesignToolRenderer';
import { ProductivityToolRenderer } from './renderers/ProductivityToolRenderer';
import { EducationalToolRenderer } from './renderers/EducationalToolRenderer';
import ReadingTool from '@/pages/ToolTypes/ReadingTool';
import PersianCulturalTool from '@/pages/ToolTypes/PersianCulturalTool';

interface ToolRendererProps {
  tool: Tool;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool, slug }) => {
  // Special-case slugs that have dedicated renderers outside their categories
  if (tool.slug === 'random-password') {
    return <UtilityToolRenderer slug={slug} type="random-password" />;
  }
  if (tool.slug === 'prime-checker') {
    return <UtilityToolRenderer slug={slug} type="prime-checker" />;
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
      return <ReadingTool slug={slug} />;
    
    case 'persian-cultural':
      return <PersianCulturalTool slug={slug} />;
    
    case 'design':
      return <DesignToolRenderer slug={slug} />;
    
    case 'productivity':
      return <ProductivityToolRenderer slug={slug} />;
    
    case 'educational':
      return <EducationalToolRenderer slug={slug} />;
    
    default:
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h1 className="text-2xl font-bold mb-4">{tool.name}</h1>
            <p className="text-gray-600 mb-6">{tool.description}</p>
            
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-2">این ابزار در حال توسعه است</h3>
              <p className="text-gray-500">به زودی راه‌اندازی خواهد شد</p>
            </div>
          </div>
        </div>
      );
  }
};

function getCalculatorType(slug: string): 'calculator' | 'investment-calculator' | 'mortgage-calculator' | 'today-date' | 'date-difference' | 'world-time' | 'profit' | 'scientific-calculator' | 'rent-factors' | 'loan-calculator' {
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
    default:
      return 'calculator';
  }
}
