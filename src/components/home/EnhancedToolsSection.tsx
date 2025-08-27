import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getNewTools, getPopularTools } from '@/data/tools';
import { Sparkles, ChevronLeft, TrendingUp, Zap, Star } from 'lucide-react';

export const EnhancedToolsSection = () => {
  const newTools = getNewTools();
  const popularTools = getPopularTools();

  return (
    <>
      {/* New & Popular Tools Combined Section */}
      <section className="mb-20 sm:mb-32 animate-slide-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* New Tools */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl transform transition-transform group-hover:scale-[1.01] duration-500 ease-out"></div>
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                      <Sparkles size={20} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">ابزارهای جدید</h2>
                      <p className="text-sm text-muted-foreground">آخرین ابزارهای اضافه شده</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary">
                    <Zap size={16} />
                    <span className="text-sm font-medium">{newTools.length} ابزار</span>
                  </div>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="p-6">
                {newTools.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>همه ابزارها به‌روزرسانی شده‌اند!</p>
                    <p className="text-sm mt-2">به زودی ابزارهای جدید اضافه می‌شوند.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {newTools.slice(0, 4).map((tool, index) => (
                      <div 
                        key={tool.id} 
                        className="animate-fade-in hover-lift"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <ToolCard tool={tool} highlight />
                      </div>
                    ))}
                  </div>
                )}
                
                <Link 
                  to="/all-tools?filter=new" 
                  className="mt-4 w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  مشاهده همه ابزارهای جدید
                  <ChevronLeft size={16} className="group-hover:translate-x-[-2px] transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Popular Tools */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/10 rounded-3xl transform transition-transform group-hover:scale-[1.01] duration-500 ease-out"></div>
            <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent p-6 border-b border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">ابزارهای محبوب</h2>
                      <p className="text-sm text-muted-foreground">پرکاربردترین ابزارها</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-amber-600">
                    <Star size={16} className="fill-current" />
                    <span className="text-sm font-medium">{popularTools.length} ابزار</span>
                  </div>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {popularTools.slice(0, 4).map((tool, index) => (
                    <div 
                      key={tool.id} 
                      className="animate-fade-in hover-lift"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ToolCard tool={tool} />
                    </div>
                  ))}
                </div>
                
                <Link 
                  to="/all-tools?filter=popular" 
                  className="mt-4 w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  مشاهده همه ابزارهای محبوب
                  <ChevronLeft size={16} className="group-hover:translate-x-[-2px] transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};