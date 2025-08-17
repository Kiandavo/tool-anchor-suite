
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ToolInfoCardProps {
  name: string;
  description: string;
  learnMoreUrl?: string;
}

export const ToolInfoCard: React.FC<ToolInfoCardProps> = ({ 
  name, 
  description, 
  learnMoreUrl 
}) => {
  return (
    <div className="bg-secondary/30 border border-border rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-2">{name}</h2>
      <p className="text-muted-foreground text-sm mb-3">{description}</p>
      {learnMoreUrl && (
        <a 
          href={learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-text text-primary hover:text-primary/80 text-sm transition-colors"
        >
          اطلاعات بیشتر
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
    </div>
  );
};
