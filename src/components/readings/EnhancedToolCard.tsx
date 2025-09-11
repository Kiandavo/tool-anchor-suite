import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '@/types/tool-types';
import { DifficultyBadge } from './DifficultyBadge';
import { PopularBadge } from './PopularBadge';
import { Calculator, FileText, Image, Wrench, Calendar, Star, Settings, BookMarked, Code, Key, Dice1, Hash, Activity, Percent, Type, Users, Utensils, Gamepad2, Sparkles, BookOpen, Moon, Hand, Coffee, Binary, Filter, SpellCheck } from 'lucide-react';

interface EnhancedToolCardProps {
  tool: Tool;
  highlight?: boolean;
  showPopularity?: boolean;
}

export const EnhancedToolCard: React.FC<EnhancedToolCardProps> = ({ 
  tool, 
  highlight = false,
  showPopularity = true 
}) => {
  const getIcon = (category: string, iconName?: string) => {
    const iconSize = "w-6 h-6";
    
    if (iconName) {
      switch (iconName) {
        case 'calculator': return <Calculator className={iconSize} />;
        case 'file-text': return <FileText className={iconSize} />;
        case 'image': return <Image className={iconSize} />;
        case 'calendar': return <Calendar className={iconSize} />;
        case 'star': return <Star className={iconSize} />;
        case 'code': return <Code className={iconSize} />;
        case 'key': return <Key className={iconSize} />;
        case 'dice': return <Dice1 className={iconSize} />;
        case 'hash': return <Hash className={iconSize} />;
        case 'activity': return <Activity className={iconSize} />;
        case 'percent': return <Percent className={iconSize} />;
        case 'type': return <Type className={iconSize} />;
        case 'user': return <Users className={iconSize} />;
        case 'book': return <BookOpen className={iconSize} />;
        case 'book-open': return <BookOpen className={iconSize} />;
        case 'utensils': return <Utensils className={iconSize} />;
        case 'gamepad-2': return <Gamepad2 className={iconSize} />;
        case 'sparkles': return <Sparkles className={iconSize} />;
        case 'moon': return <Moon className={iconSize} />;
        case 'hand': return <Hand className={iconSize} />;
        case 'coffee': return <Coffee className={iconSize} />;
        case 'binary': return <Binary className={iconSize} />;
        case 'filter': return <Filter className={iconSize} />;
        case 'spellcheck': return <SpellCheck className={iconSize} />;
        case 'abc': return <Type className={iconSize} />;
        default: return <Wrench className={iconSize} />;
      }
    }
    
    switch (category) {
      case 'calculators': return <Calculator className={iconSize} />;
      case 'text': return <FileText className={iconSize} />;
      case 'image': return <Image className={iconSize} />;
      case 'persian-cultural': return <BookMarked className={iconSize} />;
      case 'readings': return <Star className={iconSize} />;
      case 'seo': return <Code className={iconSize} />;
      case 'random': return <Dice1 className={iconSize} />;
      case 'number': return <Hash className={iconSize} />;
      default: return <Wrench className={iconSize} />;
    }
  };

  // Get usage stats for popularity determination
  const isPopular = false; // Simplified for now
  const isTrending = false; // Simplified for now

  const cardClass = highlight 
    ? "block p-4 border rounded-lg hover:shadow-md transition-all duration-300 bg-white border-green-200 shadow-sm hover-lift"
    : "block p-4 border rounded-lg hover:shadow-md transition-all duration-300 bg-white hover-lift";

  return (
    <Link 
      to={`/tool/${tool.slug}`}
      className={cardClass}
    >
      <div className="icon-text mb-3">
        {getIcon(tool.category, tool.icon)}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium">{tool.name}</h3>
          <div className="flex items-center gap-1 flex-wrap">
            {tool.isNew && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium">جدید</span>
            )}
            {tool.isComingSoon && (
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-lg font-medium">به زودی</span>
            )}
            {tool.isPremium && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-lg font-medium">ویژه</span>
            )}
            {showPopularity && isTrending && <PopularBadge type="trending" />}
            {showPopularity && isPopular && !isTrending && <PopularBadge type="popular" />}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{tool.description}</p>
      
      <div className="flex items-center justify-between">
        {tool.difficulty && tool.estimatedTime && (
          <DifficultyBadge 
            difficulty={tool.difficulty} 
            estimatedTime={tool.estimatedTime}
          />
        )}
        
        {tool.readingCategory && (
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            {getCategoryLabel(tool.readingCategory)}
          </span>
        )}
      </div>
    </Link>
  );
};

const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    poetry: 'شعر و ادب',
    astrology: 'نجوم',
    divination: 'فال‌گیری',
    dreams: 'خواب و رویا',
    traditional: 'سنتی',
    modern: 'مدرن',
    numerology: 'اعداد شناسی',
    cultural: 'فرهنگی'
  };
  return labels[category] || category;
};