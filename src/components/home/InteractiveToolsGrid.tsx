import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory, tools, ToolCategory, categoryLabels } from '@/data/tools';
import { 
  Filter, 
  Grid3X3, 
  TrendingUp, 
  Sparkles, 
  ChevronLeft,
  Eye,
  Clock,
  Star
} from 'lucide-react';

interface InteractiveToolsGridProps {
  className?: string;
}

export const InteractiveToolsGrid: React.FC<InteractiveToolsGridProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'new' | ToolCategory>('popular');
  const [showCount, setShowCount] = useState(8);

  const allTools = tools;
  
  const filteredTools = useMemo(() => {
    let tools = [];
    
    switch (activeFilter) {
      case 'all':
        tools = allTools;
        break;
      case 'popular':
        tools = allTools.slice(0, 16);
        break;
      case 'new':
        tools = allTools.filter(tool => tool.isNew);
        break;
      default:
        tools = getToolsByCategory(activeFilter as ToolCategory);
    }
    
    return tools.slice(0, showCount);
  }, [activeFilter, showCount, allTools]);

  const filters = [
    { key: 'popular' as const, label: 'محبوب', icon: TrendingUp, color: 'text-blue-600' },
    { key: 'new' as const, label: 'جدید', icon: Sparkles, color: 'text-green-600' },
    { key: 'calculators' as const, label: 'محاسبه‌گر', icon: null, color: 'text-purple-600' },
    { key: 'text' as const, label: 'متن', icon: null, color: 'text-orange-600' },
    { key: 'image' as const, label: 'تصویر', icon: null, color: 'text-pink-600' },
    { key: 'persian-cultural' as const, label: 'فرهنگ فارسی', icon: null, color: 'text-amber-600' },
  ];

  const stats = {
    totalViews: 25680,
    weeklyNew: 12,
    avgRating: 4.8
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          <div className="mb-6 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mr-4">
                <Grid3X3 className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                کاوش ابزارها
              </h2>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              ابزارهای پیشرفته و کاربردی را کشف کنید. هر ابزار با دقت طراحی شده تا کارهای روزانه شما را آسان‌تر کند.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 mb-2">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-foreground">{stats.totalViews.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">بازدید</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm font-semibold text-foreground">{stats.weeklyNew}</p>
              <p className="text-xs text-muted-foreground">ابزار جدید</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-100 mb-2">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <p className="text-sm font-semibold text-foreground">{stats.avgRating}</p>
              <p className="text-xs text-muted-foreground">امتیاز</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              const Icon = filter.icon;
              
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`
                    inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                      : 'bg-card text-card-foreground border border-border hover:shadow-md hover:scale-105'
                    }
                  `}
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {filter.label}
                  {filter.key === 'new' && (
                    <span className="mr-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredTools.map((tool, index) => (
            <div 
              key={tool.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ToolCard tool={tool} highlight={tool.isNew} />
            </div>
          ))}
        </div>

        {/* Load More & View All */}
        <div className="text-center space-y-4">
          {filteredTools.length >= showCount && (
            <button
              onClick={() => setShowCount(prev => prev + 8)}
              className="inline-flex items-center px-6 py-3 bg-card text-card-foreground border border-border rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              نمایش بیشتر
              <ChevronLeft className="w-4 h-4 mr-2" />
            </button>
          )}
          
          <div>
            <Link
              to="/all-tools"
              className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              مشاهده همه ابزارها
              <ChevronLeft className="w-4 h-4 mr-2" />
            </Link>
          </div>
        </div>

        {/* Category Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(categoryLabels).slice(0, 4).map(([category, label]) => {
            const tools = getToolsByCategory(category as ToolCategory);
            return (
              <Link
                key={category}
                to={`/category/${category}`}
                className="group"
              >
                <Card className="hover:shadow-lg hover:scale-105 transition-all duration-200 h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{label}</span>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {tools.length}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      {tools.slice(0, 3).map(tool => tool.name).join('، ')}
                      {tools.length > 3 && '...'}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                      مشاهده همه
                      <ChevronLeft className="w-4 h-4 mr-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};