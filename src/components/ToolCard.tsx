
import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '@/data/tools';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { slug, name, description, isNew, icon } = tool;
  
  return (
    <Link to={`/tool/${slug}`}>
      <div className="tool-card">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary">
              {/* Icon placeholder */}
              {icon.charAt(0).toUpperCase()}
            </span>
          </div>
          
          {isNew && (
            <span className="badge-new">
              جدید
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
