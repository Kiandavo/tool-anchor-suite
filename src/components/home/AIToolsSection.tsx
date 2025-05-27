
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, Brain, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const aiTools = [
  {
    id: 'ai-chat',
    title: 'چت هوشمند فارسی',
    description: 'گفتگو با هوش مصنوعی پیشرفته به زبان فارسی برای پاسخ به سوالات و کمک در کارها',
    icon: MessageSquare,
    color: 'bg-gradient-to-br from-purple-100/80 to-purple-300/80',
    iconColor: 'text-purple-600',
    href: '/tool/ai-chat',
    available: true,
  },
  {
    id: 'text-summarizer',
    title: 'خلاصه‌ساز متن',
    description: 'خلاصه‌سازی هوشمند متون فارسی و انگلیسی با حفظ نکات مهم',
    icon: Brain,
    color: 'bg-gradient-to-br from-blue-100/80 to-blue-300/80',
    iconColor: 'text-blue-600',
    href: '/tool/text-summarizer',
    available: false,
  },
  {
    id: 'content-generator',
    title: 'تولید محتوای خلاقانه',
    description: 'تولید متن، شعر، داستان و محتوای تبلیغاتی به زبان فارسی',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-green-100/80 to-green-300/80',
    iconColor: 'text-green-600',
    href: '/tool/content-generator',
    available: false,
  },
  {
    id: 'persian-ai-assistant',
    title: 'دستیار هوشمند فارسی',
    description: 'دستیار شخصی برای کارهای روزانه، ترجمه و پاسخ به سوالات فرهنگی',
    icon: Bot,
    color: 'bg-gradient-to-br from-orange-100/80 to-orange-300/80',
    iconColor: 'text-orange-600',
    href: '/tool/persian-ai-assistant',
    available: false,
  }
];

export const AIToolsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">ابزارهای هوش مصنوعی</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            مجموعه ابزارهای پیشرفته هوش مصنوعی با قابلیت درک و پردازش زبان فارسی
            برای کمک در کارهای روزانه و خلاقانه شما
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {tool.available ? (
                <Link 
                  to={tool.href} 
                  className="block h-full transition-all duration-300 hover-lift"
                >
                  <div className="h-full flex flex-col rounded-3xl neo-glass overflow-hidden">
                    <div className={`flex items-center justify-center py-6 ${tool.color}`}>
                      <tool.icon className={`w-12 h-12 ${tool.iconColor}`} />
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">{tool.title}</h3>
                      <p className="text-sm text-gray-600 flex-1">{tool.description}</p>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">فعال</span>
                        <span className="text-primary text-sm font-medium group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">استفاده &larr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="block h-full">
                  <div className="h-full flex flex-col rounded-3xl neo-glass overflow-hidden opacity-70">
                    <div className={`flex items-center justify-center py-6 ${tool.color}`}>
                      <tool.icon className={`w-12 h-12 ${tool.iconColor}`} />
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">{tool.title}</h3>
                      <p className="text-sm text-gray-600 flex-1">{tool.description}</p>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">به زودی</span>
                        <span className="text-gray-400 text-sm">در حال توسعه</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/category/ai-tools" className="inline-flex items-center px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-all duration-300 hover:shadow-md">
            مشاهده تمام ابزارهای هوش مصنوعی
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
