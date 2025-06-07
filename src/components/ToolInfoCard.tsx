
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
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold text-blue-900 mb-2">{name}</h2>
      <p className="text-blue-800 text-sm mb-3">{description}</p>
      {learnMoreUrl && (
        <a 
          href={learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
        >
          اطلاعات بیشتر
          <ExternalLink className="mr-1 w-4 h-4" />
        </a>
      )}
    </div>
  );
};
