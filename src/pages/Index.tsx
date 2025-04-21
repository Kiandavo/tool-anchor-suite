
import React from 'react';
import { Layout } from '@/components/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { ToolCard } from '@/components/ToolCard';
import { 
  tools, 
  ToolCategory, 
  categoryLabels, 
  getToolsByCategory,
  getNewTools,
  getPopularTools
} from '@/data/tools';
import { ChevronLeft, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  // Get counts for each category
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const categoryCounts = categories.map(category => ({
    category,
    count: getToolsByCategory(category).length
  }));
  
  // Get new and popular tools
  const newTools = getNewTools();
  const popularTools = getPopularTools();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-12 mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">لنگر - مجموعه ابزار</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          بیش از ۱۲۰ ابزار رایگان تحت وب، بدون نیاز به ثبت‌نام و با حفظ حریم خصوصی شما
        </p>
      </section>
      
      {/* Categories */}
      <section className="mb-12 animate-slide-up">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">دسته‌بندی‌ها</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryCounts.map(({category, count}, index) => (
            <div key={category} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
              <CategoryCard category={category} count={count} />
            </div>
          ))}
        </div>
      </section>
      
      {/* New Tools */}
      <section className="mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Sparkles size={20} className="text-primary ml-2" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">ابزارهای جدید</h2>
          </div>
          <Link to="/search?q=new" className="text-primary flex items-center text-sm hover:underline">
            مشاهده همه
            <ChevronLeft size={16} className="mr-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>
      
      {/* Popular Tools */}
      <section className="mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <TrendingUp size={20} className="text-primary ml-2" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">ابزارهای محبوب</h2>
          </div>
          <Link to="/search?q=popular" className="text-primary flex items-center text-sm hover:underline">
            مشاهده همه
            <ChevronLeft size={16} className="mr-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
