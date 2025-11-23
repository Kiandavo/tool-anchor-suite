
import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, Image, Wrench, Calendar, Star, Settings, BookMarked, Code, Key, Dice1, Hash, Activity, Percent, Type, Users, Utensils, Gamepad2, Sparkles, BookOpen, Moon, Hand, Coffee, Binary, Filter, SpellCheck } from 'lucide-react';
import { Tool } from '@/types/tool-types';

interface ToolCardProps {
  tool: Tool;
  highlight?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, highlight = false }) => {
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  
  const getIcon = (category: string, iconName?: string) => {
    const iconSize = "w-6 h-6";
    
    if (iconName) {
      switch (iconName) {
        case 'calculator':
          return <Calculator className={iconSize} />;
        case 'file-text':
          return <FileText className={iconSize} />;
        case 'image':
          return <Image className={iconSize} />;
        case 'calendar':
          return <Calendar className={iconSize} />;
        case 'star':
          return <Star className={iconSize} />;
        case 'code':
          return <Code className={iconSize} />;
        case 'key':
          return <Key className={iconSize} />;
        case 'dice':
          return <Dice1 className={iconSize} />;
        case 'hash':
          return <Hash className={iconSize} />;
        case 'activity':
          return <Activity className={iconSize} />;
        case 'percent':
          return <Percent className={iconSize} />;
        case 'type':
          return <Type className={iconSize} />;
        case 'user':
          return <Users className={iconSize} />;
        case 'book':
          return <BookOpen className={iconSize} />;
        case 'book-open':
          return <BookOpen className={iconSize} />;
        case 'utensils':
          return <Utensils className={iconSize} />;
        case 'gamepad-2':
          return <Gamepad2 className={iconSize} />;
        case 'sparkles':
          return <Sparkles className={iconSize} />;
        case 'moon':
          return <Moon className={iconSize} />;
        case 'hand':
          return <Hand className={iconSize} />;
        case 'coffee':
          return <Coffee className={iconSize} />;
        case 'binary':
          return <Binary className={iconSize} />;
        case 'filter':
          return <Filter className={iconSize} />;
        case 'spellcheck':
          return <SpellCheck className={iconSize} />;
        case 'abc':
          return <Type className={iconSize} />;
        default:
          return <Wrench className={iconSize} />;
      }
    }
    
    switch (category) {
      case 'calculators':
        return <Calculator className={iconSize} />;
      case 'text':
        return <FileText className={iconSize} />;
      case 'image':
        return <Image className={iconSize} />;
      case 'persian-cultural':
        return <BookMarked className={iconSize} />;
      case 'readings':
        return <Star className={iconSize} />;
      case 'seo':
        return <Code className={iconSize} />;
      case 'random':
        return <Dice1 className={iconSize} />;
      case 'number':
        return <Hash className={iconSize} />;
      default:
        return <Wrench className={iconSize} />;
    }
  };

  const cardClass = highlight 
    ? "block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white border-green-200 shadow-sm card-hover-glow"
    : "block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white card-hover-glow";

  return (
    <Link 
      to={`/tool/${tool.slug}`}
      className={`${cardClass} transition-all duration-300 hover-scale`}
      onMouseEnter={() => setIsImageLoaded(true)}
    >
      <div className="icon-text mb-3 animate-fade-in">
        {getIcon(tool.category, tool.icon)}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium">{tool.name}</h3>
          {tool.isNew && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium animate-fade-in">جدید</span>
          )}
          {tool.isComingSoon && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-lg font-medium animate-fade-in">به زودی</span>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600">{tool.description}</p>
    </Link>
  );
};
