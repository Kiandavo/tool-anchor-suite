
import React from 'react';
import { Tool } from '@/data/tools';

interface ToolRendererProps {
  tool: Tool;
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ tool }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold mb-4">{tool.name}</h1>
        <p className="text-gray-600 mb-6">{tool.description}</p>
        
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-2">این ابزار در حال توسعه است</h3>
          <p className="text-gray-500">به زودی راه‌اندازی خواهد شد</p>
        </div>
      </div>
    </div>
  );
};
