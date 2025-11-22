
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { BreadcrumbNavigation } from '@/components/ui/breadcrumb-navigation';
import { tools, categoryLabels } from '@/data/tools';
import { useRecentTools } from '@/hooks/useRecentTools';
import { EnhancedSeoHead } from '@/components/seo/EnhancedSeoHead';
import { ToolSeoContent } from '@/components/seo/ToolSeoContent';
import { SuggestedTools } from '@/components/seo/SuggestedTools';
import { RelatedToolsWidget } from '@/components/seo/RelatedToolsWidget';
import { toolsSeoData } from '@/data/seo-content';
import { getRelatedTools } from '@/utils/related-tools';

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

  // Enhanced SEO data
  const categoryLabel = (categoryLabels as any)[tool.category] || tool.category;
  const toolSeoData = toolsSeoData[tool.slug];
  const relatedTools = getRelatedTools(tool);

  return (
    <Layout>
      <EnhancedSeoHead 
        toolSlug={tool.slug}
        pageType="tool"
        breadcrumbs={[
          { name: 'لنگر', url: 'https://langar.co/' },
          { name: categoryLabel, url: `https://langar.co/category/${tool.category}` },
          { name: tool.name, url: `https://langar.co/tool/${tool.slug}` }
        ]}
      />
      
      <div className="mb-6">
        <BreadcrumbNavigation items={breadcrumbs} />
      </div>

      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{tool.name}</h1>
        <p className="text-gray-600 text-sm">{tool.description}</p>
      </div>
      
      <ToolRenderer tool={tool} slug={slug!} />
      
      {/* Rich SEO Content */}
      {toolSeoData && (
        <>
          <ToolSeoContent
            toolName={tool.name}
            category={categoryLabel}
            description={toolSeoData.longDescription}
            benefits={toolSeoData.benefits}
            howToUse={toolSeoData.howToUse}
            faq={toolSeoData.faq}
            relatedTools={relatedTools}
          />
          
          {/* Suggested Tools for Internal Linking */}
          <div className="mt-8">
            <SuggestedTools 
              category={tool.category} 
              currentToolSlug={tool.slug} 
            />
          </div>
        </>
      )}
      
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
