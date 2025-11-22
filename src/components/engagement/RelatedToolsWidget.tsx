import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tool } from '@/types/tool-types';
import { getRelatedTools } from '@/utils/toolRecommendations';

interface RelatedToolsWidgetProps {
  currentTool: Tool;
  maxResults?: number;
}

export const RelatedToolsWidget: React.FC<RelatedToolsWidgetProps> = ({
  currentTool,
  maxResults = 4
}) => {
  const relatedTools = getRelatedTools(currentTool, maxResults);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          ابزارهای مرتبط
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedTools.map(tool => (
            <Link key={tool.id} to={`/tool/${tool.slug}`}>
              <Button
                variant="outline"
                className="w-full h-auto py-4 px-4 flex items-center gap-3 hover:border-primary hover:bg-primary/5 justify-start"
              >
                <span className="text-2xl">{tool.icon}</span>
                <div className="text-right flex-1">
                  <div className="font-semibold text-sm">{tool.name}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {tool.description}
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
