
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { ToolCard } from '@/components/ToolCard';
import { tools, ToolCategory, categoryLabels, getToolsByCategory, getNewTools, getPopularTools } from '@/data/tools';
import { ChevronLeft, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { finglishToPersian } from '@/utils/toolUtils'; // Use our utility
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  // Finglish to Farsi (Home page instant converter state)
  const [finglishInput, setFinglishInput] = useState('');
  const [copyClicked, setCopyClicked] = useState(false);

  // Get counts for each category
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const categoryCounts = categories.map(category => ({
    category,
    count: getToolsByCategory(category).length
  }));

  // Get new and popular tools
  const newTools = getNewTools();
  const popularTools = getPopularTools();

  // Output instantly using the utility
  const persianOutput = finglishToPersian(finglishInput);

  // Copy handler
  const handleCopyFarsi = () => {
    if (persianOutput) {
      navigator.clipboard.writeText(persianOutput);
      setCopyClicked(true);
      setTimeout(() => setCopyClicked(false), 1200);
    }
  };

  // --- Random Tool Section ---
  const randomTool = tools[Math.floor(Math.random() * tools.length)];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 mb-8 sm:mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900 dark:text-gray-50">لنگر - مجموعه ابزارهای آنلاین</h1>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. 
          از ابزارهای متنی و تصویری گرفته تا محاسبه‌گرها و ابزارهای SEO، همه چیز در یک پلتفرم ساده.
        </p>
      </section>

      {/* Random Tool Showcase Section */}
      <section className="mb-8 flex flex-col items-center max-w-2xl mx-auto w-full animate-fade-in" style={{animationDelay: '0.1s'}}>
        <div className="w-full">
          <div className="flex items-center gap-2 text-primary mb-2 mr-2">
            <span className="font-semibold text-base">ابزار تصادفی امروز</span>
            <span className="text-xs bg-primary/10 text-primary rounded px-2 py-0.5">{randomTool.category && categoryLabels[randomTool.category]}</span>
          </div>
          <ToolCard tool={randomTool} highlight />
        </div>
        <Link
          to={`/tool/${randomTool.slug}`}
          className="mt-3 w-full sm:w-auto"
        >
          <Button className="w-full sm:w-auto text-base">شروع ابزار</Button>
        </Link>
        <Link
          to="/all-tools"
          className="mt-1 text-sm text-primary/80 hover:underline transition underline-offset-2"
        >
          مشاهده همه ابزارها
        </Link>
      </section>

      {/* Finglish to Persian UI improvement */}
      <section className="rounded-xl bg-[#eaf1ff] dark:bg-[#19212c] border mb-10 p-4 sm:p-6 shadow-sm max-w-2xl mx-auto text-center">
        <h2 className="text-lg font-bold text-primary mb-1 sm:mb-2">تبدیل فوری فینگلیش به فارسی ✨</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-start">
          <Textarea
            className="flex-1 min-h-[48px] sm:min-h-[60px] resize-y p-3 border border-primary/30 bg-white"
            value={finglishInput}
            onChange={(e) => setFinglishInput(e.target.value)}
            placeholder="متن فینگلیش..."
          />
          <span className="self-center font-bold text-2xl">→</span>
          <Textarea
            className="flex-1 min-h-[48px] sm:min-h-[60px] resize-y p-3 border border-primary/30 bg-white"
            value={persianOutput}
            readOnly
            placeholder="خروجی فارسی"
          />
        </div>
        <Button
          className="px-4 py-2 mt-4 mx-auto w-full sm:w-auto"
          onClick={handleCopyFarsi}
          disabled={!persianOutput}
        >
          {copyClicked ? "کپی شد!" : "کپی خروجی فارسی"}
        </Button>
      </section>

      {/* Categories */}
      <section className="mb-8 sm:mb-12 animate-slide-up">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">دسته‌بندی‌ها</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {categoryCounts.map(({ category, count }, index) => (
            <div key={category} className="animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <CategoryCard category={category} count={count} />
            </div>
          ))}
        </div>
      </section>

      {/* New Tools */}
      <section className="mb-10 sm:mb-12 animate-slide-up rounded-xl border border-[#8cc55b]/30 bg-[#F2FCE2]" style={{
        animationDelay: '0.2s'
      }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-6 px-4 sm:px-6 pt-6">
          <div className="flex items-center">
            <Sparkles size={20} className="text-[#8cc55b] ml-2" />
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">ابزارهای جدید</h2>
          </div>
          <Link to="/all-tools" className="text-[#8cc55b] flex items-center text-sm font-bold hover:underline mt-2 sm:mt-0">
            مشاهده همه
            <ChevronLeft size={16} className="mr-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 pb-6">
          {newTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{
              animationDelay: `${0.3 + index * 0.1}s`
            }}>
              <ToolCard tool={tool} highlight />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mb-10 sm:mb-12 animate-slide-up" style={{
        animationDelay: '0.4s'
      }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-3 sm:mb-6">
          <div className="flex items-center">
            <TrendingUp size={20} className="text-primary ml-2" />
            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">ابزارهای محبوب</h2>
          </div>
          <Link to="/all-tools" className="text-primary flex items-center text-sm hover:underline mt-2 sm:mt-0">
            مشاهده همه
            <ChevronLeft size={16} className="mr-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{
              animationDelay: `${0.5 + index * 0.1}s`
            }}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;

