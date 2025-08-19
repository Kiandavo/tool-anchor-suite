import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRecentTools } from '@/hooks/useRecentTools';

export const RecentlyUsed: React.FC = () => {
  const { recentTools } = useRecentTools();

  if (recentTools.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <CardTitle className="icon-text text-lg">
          <Clock size={20} className="text-primary" />
          <span>ابزارهای اخیر</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {recentTools.slice(0, 5).map((tool) => (
            <Button
              key={tool.id}
              variant="outline"
              size="sm"
              asChild
              className="icon-text-sm hover:bg-primary/10 transition-colors"
            >
              <Link to={`/tool/${tool.slug}`}>
                <span>{tool.name}</span>
              </Link>
            </Button>
          ))}
        </div>
        
        {recentTools.length > 5 && (
          <Button variant="ghost" size="sm" className="icon-text-sm text-muted-foreground hover:text-primary">
            <span>مشاهده همه</span>
            <ArrowRight size={14} className="rtl:rotate-180" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};