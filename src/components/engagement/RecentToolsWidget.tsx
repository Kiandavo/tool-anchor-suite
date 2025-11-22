import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecentTools } from '@/hooks/useRecentTools';
import { Button } from '@/components/ui/button';

export const RecentToolsWidget: React.FC = () => {
  const { recentTools } = useRecentTools();

  if (recentTools.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5 text-primary" />
          ابزارهای اخیر
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {recentTools.map(tool => (
            <Link key={tool.id} to={`/tool/${tool.slug}`}>
              <Button
                variant="outline"
                className="w-full h-auto py-3 px-2 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5"
              >
                <span className="text-2xl">{tool.icon}</span>
                <span className="text-xs text-center line-clamp-2">{tool.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
