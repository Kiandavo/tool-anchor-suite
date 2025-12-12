import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool-types';
import { tools, categoryLabels } from '@/data/tools';
import { cn } from '@/lib/utils';
import { getCategoryUrl } from '@/utils/internal-linking';

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
  faq?: { question: string; answer: string }[];
}

// Get related tools from same category
const getRelatedTools = (tool: Tool, limit: number = 6) => {
  return tools
    .filter(t => 
      t.category === tool.category && 
      t.slug !== tool.slug && 
      !t.isComingSoon
    )
    .slice(0, limit);
};

// Generate short, practical FAQ
const getDefaultFAQ = (toolName: string) => [
  {
    question: `آیا ${toolName} رایگان است؟`,
    answer: 'بله، کاملاً رایگان و بدون نیاز به ثبت‌نام است.'
  },
  {
    question: 'آیا اطلاعات من ذخیره می‌شود؟',
    answer: 'خیر، تمام پردازش‌ها در مرورگر شما انجام می‌شود و هیچ داده‌ای به سرور ارسال نمی‌شود.'
  },
  {
    question: 'آیا روی موبایل کار می‌کند؟',
    answer: 'بله، این ابزار برای تمام دستگاه‌ها بهینه شده است.'
  }
];

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({ 
  tool, 
  children,
  faq: customFaq 
}) => {
  const relatedTools = getRelatedTools(tool);
  const faq = customFaq || getDefaultFAQ(tool.name);
  const categoryLabel = categoryLabels[tool.category as ToolCategory] || tool.category;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb - minimal */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
        <span>/</span>
        <Link to={getCategoryUrl(tool.category)} className="hover:text-foreground transition-colors">
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-foreground">{tool.name}</span>
      </nav>

      {/* H1 - Functional, not poetic */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          {tool.name}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-2xl">
          {tool.description}
        </p>
      </header>

      {/* Tool Interface - Main content */}
      <div className="mb-12">
        {children}
      </div>

      {/* Related Tools - Compact grid */}
      {relatedTools.length > 0 && (
        <section className="mb-10 pt-8 border-t border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            ابزارهای مرتبط
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.slug}
                to={`/tool/${relTool.slug}`}
                className="group flex items-center gap-2 p-3 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {relTool.name}
                </span>
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mr-auto" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ - Short and practical */}
      <section className="mb-8 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          سوالات متداول
        </h2>
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faq.slice(0, 5).map((item, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-muted/30 border border-border/50"
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <h3 className="font-medium text-foreground mb-2" itemProp="name">
                {item.question}
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-sm text-muted-foreground" itemProp="text">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
