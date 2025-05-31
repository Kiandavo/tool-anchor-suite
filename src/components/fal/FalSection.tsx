
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Sparkles, BookOpen } from 'lucide-react';

export const FalSection = () => {
  const falTools = [
    {
      id: 'hafez-fortune',
      title: 'فال حافظ',
      description: 'دریافت فال از دیوان حافظ شیرازی با تفسیر کامل',
      icon: BookOpen
    },
    {
      id: 'tarot-reading',
      title: 'فال تاروت',
      description: 'فال تاروت کامل با کارت‌های اصلی و تفسیر دقیق',
      icon: Sparkles
    },
    {
      id: 'horoscope',
      title: 'طالع‌بینی',
      description: 'پیش‌بینی‌های روزانه بر اساس برج تولد شما',
      icon: Star
    }
  ];

  return (
    <section className="mb-12 space-y-6 animate-fade-in rounded-3xl border border-purple-300/30 neo-glass p-8 bg-gradient-to-br from-purple-50/50 to-indigo-50/30" style={{ animationDelay: '0.15s' }}>
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 shadow-sm">
          <Star size={20} className="text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          فال و طالع‌بینی
        </h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {falTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div key={tool.id} className="bg-white/90 hover:bg-white/95 rounded-2xl p-5 border border-white/30 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3 shadow-sm">
                  <IconComponent size={20} className="text-white" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
              <Link 
                to={`/tool/${tool.id}`}
                className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                مشاهده ←
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FalSection;
