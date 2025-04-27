
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { CategoryCard } from '@/components/CategoryCard';
import { ToolCard } from '@/components/ToolCard';
import { tools, ToolCategory, categoryLabels, getToolsByCategory, getNewTools, getPopularTools, searchTools } from '@/data/tools';
import { ChevronLeft, Sparkles, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { finglishToPersian } from '@/utils/textUtils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SearchBar } from '@/components/SearchBar';
import { HafezFortune } from '@/components/HafezFortune';

const Index = () => {
  const navigate = useNavigate();
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

  // Output instantly using the utility (directly from textUtils for most up-to-date implementation)
  const persianOutput = finglishInput ? finglishToPersian(finglishInput) : '';

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
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Function to get search results for inline display
  const getSearchResults = (query: string) => {
    return searchTools(query).slice(0, 5); // Limit to 5 results for the dropdown
  };
  
  return (
    <Layout>
      {/* Hero Section - Apple.com inspired design */}
      <section className="text-center py-20 sm:py-28 mb-16 relative overflow-hidden animate-fade-in">
        {/* Apple-style layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-apple-blue/5" />
        <div className="absolute inset-0 bg-gradient-to-tr from-apple-blue/5 to-transparent opacity-50" />
        
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-8 text-apple-black leading-tight">
            لنگر - مجموعه ابزارهای آنلاین
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed text-apple-gray font-light px-4 mb-12">
            بیش از ۱۲۰ ابزار رایگان و کاربردی تحت وب، بدون نیاز به ثبت‌نام و با تمرکز کامل بر حریم خصوصی شما. 
            از ابزارهای متنی و تصویری گرفته تا محاسبه‌گرها و ابزارهای SEO، همه چیز در یک پلتفرم ساده.
          </p>
        </div>

        {/* Apple-style subtle divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apple-gray/10 to-transparent" />
      </section>

      {/* Search Section */}
      <section className="max-w-3xl mx-auto mb-12 animate-fade-in" style={{
        animationDelay: '0.05s'
      }}>
        <div className="glass-effect rounded-3xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-apple-dark-gray dark:text-gray-100 mb-6 text-center">جستجوی ابزار</h2>
          <SearchBar onSearch={handleSearch} placeholder="نام ابزار مورد نظر را وارد کنید..." getResults={getSearchResults} showInlineResults={true} />
        </div>
      </section>

      {/* Hafez Fortune and Daily Luck Section */}
      <HafezFortune />

      {/* Random Tool Section */}
      <section className="mb-10 max-w-3xl mx-auto w-full animate-fade-in" style={{
        animationDelay: '0.1s'
      }}>
        <div className="w-full">
          <div className="flex items-center gap-2 text-apple-blue mb-2 mr-2">
            <span className="font-semibold text-sm">ابزار تصادفی امروز</span>
            <span className="text-xs bg-apple-blue/10 text-apple-blue rounded-full px-3 py-1">{randomTool.category && categoryLabels[randomTool.category]}</span>
          </div>
          <ToolCard tool={randomTool} highlight compact />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link to={`/tool/${randomTool.slug}`} className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-sm py-1.5 px-4 rounded-full border-apple-blue/30 text-apple-blue hover:bg-apple-blue hover:text-white">شروع ابزار</Button>
          </Link>
          <Link to="/all-tools" className="text-sm text-apple-blue/80 hover:underline transition underline-offset-2 mr-2">
            مشاهده همه ابزارها
          </Link>
        </div>
      </section>

      {/* Finglish to Persian UI improvement */}
      <section className="rounded-3xl bg-gradient-to-br from-apple-blue/10 to-apple-blue/5 backdrop-blur-sm border border-apple-blue/10 mb-16 p-8 shadow-sm max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-bold text-apple-blue mb-3">تبدیل فوری فینگلیش به فارسی ✨</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-start">
          <Textarea className="flex-1 min-h-[60px] resize-y p-3 rounded-2xl border border-apple-blue/20 bg-white/70 backdrop-blur-sm focus:border-apple-blue focus-visible:ring-apple-blue/30" 
            value={finglishInput} 
            onChange={e => setFinglishInput(e.target.value)} 
            placeholder="متن فینگلیش..." 
          />
          <span className="self-center font-bold text-2xl animate-float text-apple-blue">→</span>
          <Textarea className="flex-1 min-h-[60px] resize-y p-3 rounded-2xl border border-apple-blue/20 bg-white/70 backdrop-blur-sm" 
            value={persianOutput} 
            readOnly 
            placeholder="خروجی فارسی" 
          />
        </div>
        <Button className="px-6 py-2 mt-6 mx-auto w-full sm:w-auto rounded-full bg-apple-blue hover:bg-apple-blue/90" onClick={handleCopyFarsi} disabled={!persianOutput}>
          {copyClicked ? "کپی شد!" : "کپی خروجی فارسی"}
        </Button>
      </section>

      {/* Categories */}
      <section className="mb-16 sm:mb-20 animate-slide-up px-2">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-apple-dark-gray dark:text-gray-100 text-center">دسته‌بندی‌ها</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {categoryCounts.map(({
            category,
            count
          }, index) => <div key={category} className="animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CategoryCard category={category} count={count} />
              </div>)}
        </div>
      </section>

      {/* New Tools */}
      <section className="mb-16 sm:mb-20 animate-slide-up rounded-3xl border border-[#8cc55b]/20 bg-gradient-to-br from-[#F2FCE2] to-[#F7FDF0]" style={{
        animationDelay: '0.2s'
      }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 px-6 sm:px-10 pt-10">
          <div className="flex items-center">
            <Sparkles size={24} className="text-[#8cc55b] ml-3" />
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">ابزارهای جدید</h2>
          </div>
          <Link to="/all-tools" className="text-[#8cc55b] flex items-center text-sm font-bold hover:underline mt-2 sm:mt-0">
            مشاهده همه
            <ChevronLeft size={18} className="mr-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-6 sm:px-10 pb-10">
          {newTools.map((tool, index) => <div key={tool.id} className="animate-fade-in" style={{
            animationDelay: `${0.3 + index * 0.1}s`
          }}>
                <ToolCard tool={tool} highlight />
              </div>)}
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mb-16 sm:mb-20 animate-slide-up px-2" style={{
        animationDelay: '0.4s'
      }}>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
          <div className="flex items-center">
            <TrendingUp size={24} className="text-apple-blue ml-3" />
            <h2 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">ابزارهای محبوب</h2>
          </div>
          <Link to="/all-tools" className="text-apple-blue flex items-center text-sm hover:underline mt-2 sm:mt-0">
            مشاهده همه
            <ChevronLeft size={18} className="mr-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularTools.map((tool, index) => <div key={tool.id} className="animate-fade-in" style={{
            animationDelay: `${0.5 + index * 0.1}s`
          }}>
                <ToolCard tool={tool} />
              </div>)}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
