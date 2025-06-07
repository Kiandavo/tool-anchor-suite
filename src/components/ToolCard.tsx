
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Image, Wrench, Calendar, Star } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  slug: string;
  category: string;
  icon?: string;
  isNew?: boolean;
}

interface ToolCardProps {
  tool: Tool;
  highlight?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, highlight = false }) => {
  const getIcon = (category: string, iconName?: string) => {
    if (iconName) {
      switch (iconName) {
        case 'calculator':
          return <Calculator className="w-6 h-6" />;
        case 'file-text':
          return <FileText className="w-6 h-6" />;
        case 'image':
          return <Image className="w-6 h-6" />;
        case 'calendar':
          return <Calendar className="w-6 h-6" />;
        case 'star':
          return <Star className="w-6 h-6" />;
        default:
          return <Wrench className="w-6 h-6" />;
      }
    }
    
    switch (category) {
      case 'calculators':
        return <Calculator className="w-6 h-6" />;
      case 'text':
        return <FileText className="w-6 h-6" />;
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'persian-cultural':
        return <Calendar className="w-6 h-6" />;
      case 'readings':
        return <Star className="w-6 h-6" />;
      default:
        return <Wrench className="w-6 h-6" />;
    }
  };

  const cardClass = highlight 
    ? "block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white border-green-200 shadow-sm"
    : "block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white";

  return (
    <Link 
      to={`/tool/${tool.slug}`}
      className={cardClass}
    >
      <div className="flex items-center mb-2">
        {getIcon(tool.category, tool.icon)}
        <h3 className="mr-2 font-medium">{tool.name}</h3>
        {tool.isNew && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium mr-2">جدید</span>
        )}
      </div>
      <p className="text-sm text-gray-600">{tool.description}</p>
    </Link>
  );
};
