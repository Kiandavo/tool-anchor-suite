import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { getPersianCulturalTools } from '@/data/tools';
import { BookMarked, ChevronLeft, Heart, Sparkles, Crown, Feather } from 'lucide-react';

const culturalHighlights = [
  {
    icon: Crown,
    title: "میراث کهن",
    description: "تمدن ۲۵۰۰ ساله ایران",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Feather,
    title: "ادبیات غنی",
    description: "از حافظ تا مولانا",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Heart,
    title: "فرهنگ زنده",
    description: "سنت‌های جاودان",
    color: "from-rose-500 to-pink-500"
  }
];

const persianQuotes = [
  "دوش وقت سحر از غصه نجاتم دادند - حافظ",
  "گر چه تا بحر بریزد قطره را قدری نیست - سعدی",
  "عاشقان چون شمع جان افروخته آیند - مولانا"
];

export const PersianCulturalEnhancedSection = () => {
  const persianTools = getPersianCulturalTools();
  const todayQuote = persianQuotes[new Date().getDate() % persianQuotes.length];

  return (
    <section className="mb-20 sm:mb-32 animate-slide-up">
      <div className="relative">
        {/* Persian Pattern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/40 rounded-3xl"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20v40c11.046 0 20-8.954 20-20zm10 0c0 11.046 8.954 20 20 20V10C48.954 10 40 18.954 40 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative bg-card/90 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-xl">
          
          {/* Enhanced Header with Cultural Elements */}
          <div className="relative bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 p-8 border-b border-border/30">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <BookMarked size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">فرهنگ و زبان فارسی</h2>
                  <p className="text-muted-foreground">گنجینه‌ای از میراث فرهنگی ایران</p>
                </div>
              </div>
              
              <Link 
                to="/category/persian-cultural" 
                className="text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium w-fit"
              >
                کاوش در میراث فرهنگی
                <ChevronLeft size={16} />
              </Link>
            </div>

            {/* Cultural Highlights */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {culturalHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/80 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${highlight.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Persian Quote */}
          <div className="p-8 border-b border-border/20">
            <div className="bg-gradient-to-r from-emerald-50/80 to-teal-50/60 rounded-xl p-6 border border-emerald-100/50 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles size={20} className="text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">بیت روز</h3>
                <Sparkles size={20} className="text-emerald-600" />
              </div>
              <p className="text-foreground/90 font-medium text-lg leading-relaxed font-vazirmatn">
                {todayQuote}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="p-8 border-b border-border/20">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-foreground/80 leading-relaxed mb-4">
                میراث غنی فرهنگ ایران را با مجموعه‌ای جامع از ابزارهای فرهنگی کشف کنید. 
                از تقویم شمسی و معانی نام‌های ایرانی تا ادبیات کهن، ضرب‌المثل‌ها، آشپزی سنتی و بازی‌های ایرانی.
              </p>
              <p className="text-muted-foreground font-medium">
                هر ابزار پنجره‌ای به سوی هویت و تمدن کهن ایران است
              </p>
            </div>
          </div>
          
          {/* Tools Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {persianTools.slice(0, 8).map((tool, index) => (
                <div 
                  key={tool.id} 
                  className="animate-fade-in hover-lift"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link 
                to="/category/persian-cultural"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-3 px-8 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                کاوش در تمام ابزارهای فرهنگی
                <ChevronLeft size={16} className="group-hover:translate-x-[-2px] transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};