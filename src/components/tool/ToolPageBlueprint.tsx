import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { Tool, ToolCategory } from '@/types/tool-types';
import { tools, categoryLabels } from '@/data/tools';
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-foreground transition-colors">خانه</Link>
        <ChevronLeft className="w-4 h-4" />
        <Link to={`/category/${tool.category}`} className="hover:text-foreground transition-colors">
          {categoryLabel}
        </Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-foreground font-medium">{tool.name}</span>
      </nav>

      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">
          {jobTitle}
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          {useCases}
        </p>
      </header>

      {/* Tool Interface Zone */}
      <Card className="mb-10 border-border/50 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          {children}
        </CardContent>
      </Card>

      {/* FAQ Section */}
      {faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            سوالات متداول
          </h2>
          <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {faq.map((item, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-muted/40 border border-border/40"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <h3 className="font-medium text-foreground mb-1.5" itemProp="name">
                  {item.question}
                </h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-sm text-muted-foreground leading-relaxed" itemProp="text">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="mb-8 pt-6 border-t border-border/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            ابزارهای مرتبط در {categoryLabel}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.slug}
                to={`/tool/${relTool.slug}`}
                className="group flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {relTool.name}
                </span>
                <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
