import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './card';
import { ArrowLeft } from 'lucide-react';

interface RelatedTool {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
  icon?: React.ReactNode;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  currentToolId?: string;
  title?: string;
  className?: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ 
  tools, 
  currentToolId, 
  title = "ابزارهای مرتبط",
  className 
}) => {
  // Filter out current tool and limit to 3-4 tools
  const relatedTools = tools
    .filter(tool => tool.id !== currentToolId)
    .slice(0, 4);

  if (relatedTools.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTools.map((tool) => (
          <Card key={tool.id} className="p-4 hover:shadow-md transition-shadow">
            <Link 
              to={`/tool/${tool.slug}`}
              className="block space-y-2 group"
            >
              {tool.icon && (
                <div className="w-8 h-8 text-primary">
                  {tool.icon}
                </div>
              )}
              
              <div>
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {tool.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {tool.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="bg-muted px-2 py-1 rounded text-xs">
                  {tool.category}
                </span>
                <ArrowLeft className="w-3 h-3 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};