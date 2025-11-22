
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { BreadcrumbNavigation } from '@/components/ui/breadcrumb-navigation';
import { tools, categoryLabels } from '@/data/tools';
import { useRecentTools } from '@/hooks/useRecentTools';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { EnhancedToolContent } from '@/components/seo/EnhancedToolContent';
import { SuggestedTools } from '@/components/seo/SuggestedTools';
import { RelatedToolsWidget } from '@/components/seo/RelatedToolsWidget';
import { toolsSeoData } from '@/data/seo-content';
import { getRelatedTools } from '@/utils/related-tools';
import {
  generateOptimizedTitle,
  generateOptimizedDescription,
  generateComprehensiveKeywords,
  generateDefaultFAQ,
  generateHowToSteps,
  generateBenefitsList,
  generateComprehensiveDescription,
  calculateWordCount
} from '@/utils/seoOptimization';

const Tool = () => {
  const { slug } = useParams();
  const { addToRecent } = useRecentTools();
  const tool = tools.find(t => t.slug === slug);

  useEffect(() => {
    if (tool) {
      addToRecent({
        id: tool.id,
        slug: tool.slug,
        name: tool.name
      });
    }
  }, [tool, addToRecent]);

  if (!tool) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ابزار پیدا نشد</h1>
          <p className="text-gray-600">ابزار مورد نظر شما یافت نشد.</p>
        </div>
      </Layout>
    );
  }

  const breadcrumbs = [
    { label: 'خانه', href: '/' },
    { label: tool.category, href: `/category/${tool.category}` },
    { label: tool.name, current: true }
  ];

  // Enhanced SEO data - Phase 2
  const categoryLabel = (categoryLabels as any)[tool.category] || tool.category;
  const toolSeoData = toolsSeoData[tool.slug];
  const relatedTools = getRelatedTools(tool);
  
  // Generate Phase 2 SEO optimizations
  const optimizedTitle = generateOptimizedTitle(tool.name, categoryLabel, true);
  const optimizedDescription = generateOptimizedDescription(tool.name, tool.description, categoryLabel);
  const comprehensiveKeywords = generateComprehensiveKeywords(tool.name, categoryLabel);
  const defaultFAQ = generateDefaultFAQ(tool.name, categoryLabel);
  const howToSteps = generateHowToSteps(tool.name, 'tool');
  const benefitsList = generateBenefitsList(tool.name);
  const comprehensiveDesc = generateComprehensiveDescription(tool.name, tool.description, categoryLabel);
  const contentWordCount = calculateWordCount(comprehensiveDesc);
  
  // Merge with existing SEO data if available
  const finalFAQ = toolSeoData?.faq || defaultFAQ;
  const finalHowTo = toolSeoData?.howToUse || howToSteps;
  const finalBenefits = toolSeoData?.benefits || benefitsList;

  return (
    <Layout>
      <EnhancedSeoHead 
        toolSlug={tool.slug}
        pageType="tool"
        title={optimizedTitle}
        description={optimizedDescription}
        keywords={comprehensiveKeywords}
        breadcrumbs={[
          { name: 'لنگر', url: 'https://langar.co/' },
          { name: categoryLabel, url: `https://langar.co/category/${tool.category}` },
          { name: tool.name, url: `https://langar.co/tool/${tool.slug}` }
        ]}
        faq={finalFAQ}
      />
      
      <div className="mb-6">
        <BreadcrumbNavigation items={breadcrumbs} />
      </div>

      {/* H1 - Main heading */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {tool.name} - ابزار رایگان ۲۰۲۵
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {tool.description}
        </p>
      </div>
      
      {/* Tool Interface */}
      <ToolRenderer tool={tool} slug={slug!} />
      
      {/* Phase 2: Enhanced SEO Content with 800-1200 words */}
      <EnhancedToolContent
        toolName={tool.name}
        category={categoryLabel}
        comprehensiveDescription={comprehensiveDesc}
        benefits={finalBenefits}
        howToSteps={finalHowTo}
        faq={finalFAQ}
        wordCount={contentWordCount}
      />
      
      {/* Suggested Tools for Internal Linking */}
      <div className="mt-8">
        <SuggestedTools 
          category={tool.category} 
          currentToolSlug={tool.slug} 
        />
      </div>
      
      {/* Enhanced Related Tools Widget for Better Internal Linking */}
      <RelatedToolsWidget 
        category={tool.category}
        currentToolSlug={tool.slug}
        limit={4}
      />
    </Layout>
  );
};

export default Tool;
