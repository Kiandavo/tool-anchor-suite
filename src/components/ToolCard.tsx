
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Image, Wrench } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
}

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'calculators':
        return <Calculator className="w-6 h-6" />;
      case 'text':
        return <FileText className="w-6 h-6" />;
      case 'image':
        return <Image className="w-6 h-6" />;
      default:
        return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <Link 
      to={`/tool/${tool.slug}`}
      className="block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white"
    >
      <div className="flex items-center mb-2">
        {getIcon(tool.category)}
        <h3 className="mr-2 font-medium">{tool.name}</h3>
      </div>
      <p className="text-sm text-gray-600">{tool.description}</p>
    </Link>
  );
};
