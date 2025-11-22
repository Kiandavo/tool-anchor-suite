import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getSuggestedTools } from '@/utils/internal-linking';
import { ToolCategory } from '@/types/tool-types';

interface RelatedToolsWidgetProps {
  category: ToolCategory;
  currentToolSlug: string;
  limit?: number;
}

export const RelatedToolsWidget: React.FC<RelatedToolsWidgetProps> = ({
  category,
  currentToolSlug,
  limit = 4
}) => {
  const relatedTools = getSuggestedTools(category, currentToolSlug, limit);

  if (relatedTools.length === 0) return null;

  return (
    <Card className="mt-8 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>ابزارهای مرتبط</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.url}
              to={tool.url}
              className="group flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card hover:bg-accent/50 hover:border-primary/40 transition-all duration-200"
              title={tool.title}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {tool.text}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {tool.title}
                </p>
              </div>
              <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all flex-shrink-0 mr-2" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
