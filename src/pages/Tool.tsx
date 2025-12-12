import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { ToolPageBlueprint } from '@/components/tool/ToolPageBlueprint';
import { tools } from '@/data/tools';
import { useRecentTools } from '@/hooks/useRecentTools';
import { ToolSeoHead } from '@/components/seo/ToolSeoHead';
import { toolsSeoData } from '@/data/seo-content';
import { generateHowToSteps } from '@/utils/seoOptimization';
import { getToolMeta } from '@/data/toolMeta';

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
          <h1 className="text-2xl font-bold text-foreground mb-4">ابزار پیدا نشد</h1>
          <p className="text-muted-foreground">ابزار مورد نظر شما یافت نشد.</p>
        </div>
      </Layout>
    );
  }

  // Get tool metadata with fallback
  const toolMeta = getToolMeta(tool.slug, tool.name, tool.description);
  const toolSeoData = toolsSeoData[tool.slug];
  const howToSteps = toolSeoData?.howToUse || generateHowToSteps(tool.name, 'tool');
  
  const { jobTitle, useCases, faq } = toolMeta;

  return (
    <Layout>
      <ToolSeoHead 
        tool={tool}
        howToSteps={howToSteps}
      />
      
      <ToolPageBlueprint 
        tool={tool} 
        jobTitle={jobTitle}
        useCases={useCases}
        faq={faq}
      >
        <ToolRenderer tool={tool} slug={slug!} />
      </ToolPageBlueprint>
    </Layout>
  );
};

export default Tool;
