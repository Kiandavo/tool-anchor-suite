import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool-types';
import { tools, categoryLabels } from '@/data/tools';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolPageBlueprintProps {
  tool: Tool;
  /** Clear job description for H1 - what does this tool do? */
  jobTitle: string;
  /** Use cases subline - who is this for? */
  useCases: string;
  /** The tool interface component */
  children: React.ReactNode;
  /** 3-5 short FAQ items covering accuracy, limits, privacy */
  faq: FAQItem[];
}

// Get related tools from same category (4-6 tools)
const getRelatedTools = (tool: Tool, limit: number = 6) => {
  return tools
    .filter(t => 
      t.category === tool.category && 
      t.slug !== tool.slug && 
      !t.isComingSoon
    )
    .slice(0, limit);
};

export const ToolPageBlueprint: React.FC<ToolPageBlueprintProps> = ({ 
  tool, 
  jobTitle,
  useCases,
  children,
  faq
}) => {
  const relatedTools = getRelatedTools(tool);
  const categoryLabel = categoryLabels[tool.category as ToolCategory] || tool.category;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
        <span>/</span>
        <Link to={`/category/${tool.category}`} className="hover:text-foreground transition-colors">
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-foreground">{tool.name}</span>
      </nav>

      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
          {jobTitle}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          {useCases}
        </p>
      </header>

      {/* Tool Zone */}
      <div className="mb-12">
        {children}
      </div>

      {/* FAQ Section */}
      <section className="mb-10 pt-8 border-t border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          سوالات متداول
        </h2>
        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faq.map((item, index) => (
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

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mb-8 pt-8 border-t border-border">
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
    </div>
  );
};
