import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { ToolPageBlueprint } from '@/components/tool/ToolPageBlueprint';
import { tools, categoryLabels } from '@/data/tools';
import { useRecentTools } from '@/hooks/useRecentTools';
import { ToolSeoHead } from '@/components/seo/ToolSeoHead';
import { toolsSeoData } from '@/data/seo-content';
import { generateHowToSteps } from '@/utils/seoOptimization';
import { toolMetaRegistry } from '@/data/toolMeta';

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

  // Get tool-specific metadata or use defaults
  const toolMeta = toolMetaRegistry[tool.slug];
  const toolSeoData = toolsSeoData[tool.slug];
  const howToSteps = toolSeoData?.howToUse || generateHowToSteps(tool.name, 'tool');
  
  // Job title and use cases
  const jobTitle = toolMeta?.jobTitle || tool.name;
  const useCases = toolMeta?.useCases || tool.description;
  
  // Short, practical FAQ (max 5)
  const defaultFaq = [
    {
      question: `آیا ${tool.name} رایگان است؟`,
      answer: 'بله، این ابزار کاملاً رایگان است و نیازی به ثبت‌نام ندارد.'
    },
    {
      question: 'آیا اطلاعات من ذخیره می‌شود؟',
      answer: 'خیر، تمام پردازش‌ها در مرورگر شما انجام می‌شود و داده‌ای ذخیره نمی‌شود.'
    },
    {
      question: 'آیا روی موبایل کار می‌کند؟',
      answer: 'بله، این ابزار برای تمام دستگاه‌ها (موبایل، تبلت، دسکتاپ) بهینه شده است.'
    }
  ];
  
  const faq = toolMeta?.faq || toolSeoData?.faq?.slice(0, 5) || defaultFaq;

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
