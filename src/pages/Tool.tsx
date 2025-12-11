import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolRenderer } from '@/components/tool/ToolRenderer';
import { ToolPageLayout } from '@/components/tool/ToolPageLayout';
import { tools, categoryLabels } from '@/data/tools';
import { useRecentTools } from '@/hooks/useRecentTools';
import { ToolSeoHead } from '@/components/seo/ToolSeoHead';
import { toolsSeoData } from '@/data/seo-content';
import { generateDefaultFAQ, generateHowToSteps } from '@/utils/seoOptimization';

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

  // Get SEO data
  const categoryLabel = (categoryLabels as any)[tool.category] || tool.category;
  const toolSeoData = toolsSeoData[tool.slug];
  const howToSteps = toolSeoData?.howToUse || generateHowToSteps(tool.name, 'tool');
  
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
  
  const faq = toolSeoData?.faq?.slice(0, 5) || defaultFaq;

  return (
    <Layout>
      <ToolSeoHead 
        tool={tool}
        howToSteps={howToSteps}
      />
      
      <ToolPageLayout tool={tool} faq={faq}>
        <ToolRenderer tool={tool} slug={slug!} />
      </ToolPageLayout>
    </Layout>
  );
};

export default Tool;
