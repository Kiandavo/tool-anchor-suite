
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { tools, Tool as ToolType } from '@/data/tools';
import TextTool from './ToolTypes/TextTool';
import ImageTool from './ToolTypes/ImageTool';
import RandomPasswordTool from './ToolTypes/RandomPasswordTool';
import PrimeCheckerTool from './ToolTypes/PrimeCheckerTool';
import CalculatorTool from './ToolTypes/CalculatorTool';
import SeoTool from './ToolTypes/SeoTool';
import RandomTool from './ToolTypes/RandomTool';
import NumberTool from './ToolTypes/NumberTool';
import ToolNotImplemented from './ToolTypes/ToolNotImplemented';
import InvestmentCalculator from './ToolTypes/CalculatorTools/InvestmentCalculator';
import MortgageCalculator from './ToolTypes/CalculatorTools/MortgageCalculator';

const toolTypeBySlug: Record<string, 'text' | 'image' | 'random-password' | 'prime-checker' | 'calculator' | 'seo' | 'random' | 'number' | 'investment-calculator' | 'mortgage-calculator'> = {
  // Text tools
  'latin-to-persian-convertor': 'text',
  'text-counter': 'text',
  'text-reverse': 'text',
  'remove-duplicate-lines': 'text',
  'text-sorter': 'text',
  'text-trimmer': 'text',
  'remove-empty-lines': 'text',
  'emoji-remover': 'text',
  'slug-generator': 'text',
  'text-uppercasing': 'text',
  'text-lowercasing': 'text',
  'text-titlecase': 'text',
  'uppercase-finder': 'text',
  'character-remover': 'text',
  'word-replacer': 'text',
  'random-paragraph-generator': 'text',
  'capitalize-tool': 'text',
  'advanced-text-analyzer': 'text',
  'bulk-slug-generator': 'text',
  'filter-lines-tool': 'text',
  'emoji-text-inserter': 'text',
  'remove-html-tags': 'text',
  'mirror-text': 'text',
  'special-character-finder': 'text',
  'remove-accent-tool': 'text',
  
  // Image tools
  'image-compressor': 'image',
  'image-resizer': 'image',
  'image-to-webp': 'image',
  'image-to-jpg': 'image',
  'image-to-png': 'image',
  'image-rotate': 'image',
  'image-flip': 'image',
  'image-grayscale': 'image',
  'image-blur': 'image',
  'image-cropper': 'image',
  'image-editor': 'image',
  'remove-bg': 'image',
  'image-pixelator': 'image',
  'image-sepia': 'image',
  'photo-dimensions-finder': 'image',
  'batch-image-converter': 'image',
  'svg-to-png-converter': 'image',
  
  // Special tools with dedicated components
  'random-password': 'random-password',
  'prime-checker': 'prime-checker',
  
  // Calculator tools
  'percentage-calculator': 'calculator',
  'loan-calculator': 'calculator',
  'age-calculator': 'calculator',
  'bmi-calculator': 'calculator',
  'salary-tax-calculator': 'calculator', 
  'discount-calculator': 'calculator',
  'unit-converter': 'calculator',
  'currency-converter': 'calculator',
  'date-difference': 'calculator',
  'tip-calculator': 'calculator',
  'area-calculator': 'calculator',
  'volume-calculator': 'calculator',
  'font-size-calculator': 'calculator',
  'range-calculator': 'calculator',
  'unit-list-generator': 'calculator',
  'investment-calculator': 'investment-calculator',
  'mortgage-calculator': 'mortgage-calculator',
  
  // SEO tools
  'meta-tag-generator': 'seo',
  'robots-txt-generator': 'seo',
  'utm-builder': 'seo',
  'keyword-density': 'seo',
  'open-graph-generator': 'seo',
  'sitemap-generator': 'seo',
  'favicon-generator': 'seo',
  'page-title-check': 'seo',
  'canonical-check': 'seo',
  'alt-text-analyzer': 'seo',
  'friendly-url-checker': 'seo',
  'heading-structure-checker': 'seo',
  'seo-title-case': 'seo',
  'auto-shorten-link': 'seo',
  'meta-description-suggester': 'seo',
  'alt-attribute-generator': 'seo',
  'bulk-url-checker': 'seo',
  'seo-redirect-generator': 'seo',
  'meta-viewport-checker': 'seo',
  
  // Random tools
  'random-color-generator': 'random',
  'random-string': 'random',
  'random-date': 'random',
  'random-number': 'random',
  'coin-flip': 'random',
  'random-picker': 'random',
  'random-emoji-generator': 'random',
  'random-word-generator': 'random',
  'dice-roller': 'random',
  'random-user-generator': 'random',
  'random-quote-generator': 'random',
  'random-qrcode-generator': 'random',
  'password-strength-check': 'random',
  'random-username-generator': 'random',
  
  // Number tools
  'number-converter': 'number',
  'roman-numeral-converter': 'number', 
  'number-formatter': 'number',
  'number-rounder': 'number',
  'decimal-binary-converter': 'number',
  'decimal-hex-converter': 'number',
  'decimal-octal-converter': 'number',
  'even-odd-checker': 'number',
  'sum-calculator': 'number',
  'random-number-picker': 'number',
  'fibonacci-finder': 'number',
  'even-number-list': 'number',
  'odd-number-list': 'number', 
  'decimal-to-roman': 'number',
  'number-shuffler': 'number',
  'number-comparator': 'number',
  'duplicate-number-finder': 'number'
};

export default function Tool() {
  const { slug } = useParams<{ slug: string }>();
  const tool = tools.find(t => t.slug === slug) as ToolType | undefined;

  if (!tool) {
    return (
      <Layout backUrl="/" showSearch={false}>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ابزار یافت نشد</h1>
          <p className="text-gray-600">ابزار مورد نظر شما در سیستم وجود ندارد.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout backUrl="/" showSearch={false}>
      <div className="max-w-2xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-primary mb-4">{tool.name}</h1>
        <p className="mb-6 text-muted-foreground">{tool.description}</p>
        {toolTypeBySlug[tool.slug] === "text" ? (
          <TextTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "image" ? (
          <ImageTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "random-password" ? (
          <RandomPasswordTool />
        ) : toolTypeBySlug[tool.slug] === "prime-checker" ? (
          <PrimeCheckerTool />
        ) : toolTypeBySlug[tool.slug] === "calculator" ? (
          <CalculatorTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "seo" ? (
          <SeoTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "random" ? (
          <RandomTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "number" ? (
          <NumberTool slug={tool.slug} />
        ) : toolTypeBySlug[tool.slug] === "investment-calculator" ? (
          <InvestmentCalculator />
        ) : toolTypeBySlug[tool.slug] === "mortgage-calculator" ? (
          <MortgageCalculator />
        ) : (
          <ToolNotImplemented />
        )}
      </div>
    </Layout>
  );
}
