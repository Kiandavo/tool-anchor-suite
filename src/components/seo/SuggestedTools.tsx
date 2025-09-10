import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getSuggestedTools } from '@/utils/internal-linking';
import { ToolCategory } from '@/types/tool-types';

interface SuggestedToolsProps {
  category: ToolCategory;
  currentToolSlug: string;
  limit?: number;
}

export const SuggestedTools: React.FC<SuggestedToolsProps> = ({
  category,
  currentToolSlug,
  limit = 4
}) => {
  const suggestedTools = getSuggestedTools(category, currentToolSlug, limit);

  if (suggestedTools.length === 0) {
    return null;
  }

  return (
    <Card className="border-primary/10 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          ابزارهای پیشنهادی
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          ابزارهای مشابه که ممکن است برای شما مفید باشند:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestedTools.map((tool) => (
            <a
              key={tool.url}
              href={tool.url}
              className="group flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
              title={tool.title}
            >
              <div className="flex-1">
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  {tool.text}
                </span>
              </div>
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};