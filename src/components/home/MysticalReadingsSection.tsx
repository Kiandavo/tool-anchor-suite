import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getReadingsTools } from '@/data/tools';
import { Star, ChevronLeft, Moon, Sun, Sparkles, Eye, Gem } from 'lucide-react';

const mysticalCategories = [
  {
    icon: Star,
    title: "فال حافظ",
    description: "راهنمایی از غزلیات عاشقانه",
    color: "from-amber-500 to-orange-500",
    glow: "amber"
  },
  {
    icon: Moon,
    title: "طالع‌بینی",
    description: "اسرار آسمان و ستارگان",
    color: "from-purple-500 to-indigo-500",
    glow: "purple"
  },
  {
    icon: Gem,
    title: "تاروت",
    description: "کارت‌های راهنمای زندگی",
    color: "from-blue-500 to-cyan-500",
    glow: "blue"
  },
  {
    icon: Eye,
    title: "استخاره",
    description: "پیام‌های الهامی مولانا",
    color: "from-rose-500 to-pink-500",
    glow: "rose"
  }
];

const dailyMysticalInsight = [
  "ستارگان امشب پیامی از آینده برایت دارند",
  "انرژی کیهان در جهت رشد روحی تو می‌چرخد",
  "امروز روز کشف راز‌های درونی توست",
  "قلبت آماده دریافت پیام‌های عالم غیب است"
];

export const MysticalReadingsSection = () => {
  const readingsTools = getReadingsTools();
  const todayInsight = dailyMysticalInsight[new Date().getDate() % dailyMysticalInsight.length];

  return (
    <section className="mb-20 sm:mb-32 animate-slide-up">
      <div className="relative">
        {/* Mystical Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-indigo-900/5 to-blue-900/10 rounded-3xl"></div>
        <div className="absolute inset-0 opacity-30">
          {/* Floating particles effect */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative bg-gradient-to-br from-slate-900/5 to-purple-900/10 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-xl">
          
          {/* Mystical Header */}
          <div className="relative bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-blue-500/10 p-8 border-b border-border/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Star size={24} className="text-white" />
                  <div className="absolute inset-0 rounded-2xl bg-purple-400/20 animate-pulse-subtle"></div>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">فال و طالع‌بینی</h2>
                  <p className="text-muted-foreground">دنیای اسرارآمیز غیب و آینده</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="text-sm font-medium">روحانی</span>
                </div>
                <Link 
                  to="/category/readings" 
                  className="text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
                >
                  کاوش در عالم غیب
                  <ChevronLeft size={16} />
                </Link>
              </div>
            </div>

            {/* Mystical Categories */}
            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {mysticalCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{
                      background: `linear-gradient(135deg, var(--${category.glow}-500), var(--${category.glow}-600))`
                    }}></div>
                    <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="relative font-semibold text-foreground mb-1">{category.title}</h3>
                    <p className="relative text-sm text-muted-foreground">{category.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Mystical Insight */}
          <div className="p-8 border-b border-border/20">
            <div className="bg-gradient-to-r from-purple-50/80 to-indigo-50/60 rounded-xl p-6 border border-purple-100/50 text-center relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Sun size={16} className="text-amber-400 animate-spin-slow" />
              </div>
              <div className="absolute bottom-2 left-2">
                <Moon size={16} className="text-indigo-400 animate-pulse" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={20} className="text-purple-600 animate-pulse" />
                <h3 className="font-semibold text-purple-800">الهام روز</h3>
                <Sparkles size={20} className="text-purple-600 animate-pulse" />
              </div>
              <p className="text-foreground/90 font-medium text-lg leading-relaxed font-vazirmatn">
                {todayInsight}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-b border-border/20">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-foreground/80 leading-relaxed mb-4">
                دنیای اسرارآمیز فال و طالع‌بینی را با مجموعه کاملی از ابزارهای سنتی و مدرن کشف کنید. 
                از فال حافظ و استخاره با مولانا تا تاروت، طالع‌بینی و تعبیر خواب.
              </p>
              <p className="text-muted-foreground font-medium">
                هر ابزار پیام‌ها و راهنمایی‌های منحصر به فردی برای مسیر زندگی شما دارد
              </p>
            </div>
          </div>
          
          {/* Tools Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {readingsTools.slice(0, 8).map((tool, index) => (
                <div 
                  key={tool.id} 
                  className="animate-fade-in hover-lift relative"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link 
                to="/category/readings"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium py-3 px-8 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">کاوش در تمام اسرار غیب</span>
                <ChevronLeft size={16} className="relative group-hover:translate-x-[-2px] transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};