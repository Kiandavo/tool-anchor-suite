
import React, { useState } from 'react';
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
// import { finglishToPersian } from '@/utils/toolUtils'; // Not used anymore
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  // Finglish to Farsi (Home page instant converter state)
  const [finglishInput, setFinglishInput] = useState('');
  const [persianOutput, setPersianOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);
  const [copyClicked, setCopyClicked] = useState(false);

  // Google Translate simple endpoint
  // Note: This is for demonstration only, for production use the official API
  async function finglishToFarsiByGoogle(text: string) {
    if (!text.trim()) {
      setPersianOutput('');
      setTranslateError(null);
      return;
    }
    setLoading(true);
    setTranslateError(null);
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=fa&dt=t&q=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error('Failed to translate');
      const data = await res.json();
      if (Array.isArray(data) && data[0] && Array.isArray(data[0][0])) {
        setPersianOutput(data[0].map((item: any) => item[0]).join(' '));
      } else {
        setPersianOutput('');
        setTranslateError('خطا در دریافت ترجمه');
      }
    } catch (e) {
      setPersianOutput('');
      setTranslateError('خطا در ارتباط با سرویس ترجمه');
    } finally {
      setLoading(false);
    }
  }
  
  // Whenever finglishInput changes, try to convert it (debounced for usability)
  React.useEffect(() => {
    const handler = setTimeout(() => {
      finglishToFarsiByGoogle(finglishInput);
    }, 600);
    return () => clearTimeout(handler);
    // eslint-disable-next-line
  }, [finglishInput]);

  // Get counts for each category
  const categories = Object.keys(categoryLabels) as ToolCategory[];
  const categoryCounts = categories.map(category => ({
    category,
    count: getToolsByCategory(category).length
  }));

  // Get new and popular tools
  const newTools = getNewTools();
  const popularTools = getPopularTools();

  // Copy handler
  const handleCopyFarsi = () => {
    if (persianOutput) {
      navigator.clipboard.writeText(persianOutput);
      setCopyClicked(true);
      setTimeout(() => setCopyClicked(false), 1200);
    }
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-12 mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">لنگر - مجموعه ابزار</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          بیش از ۱۲۰ ابزار رایگان تحت وب، بدون نیاز به ثبت‌نام و با حفظ حریم خصوصی شما
        </p>
      </section>

      {/* Typewriting - Instant Finglish to Farsi (with Google Translate) */}
      <section className="mb-8 mx-auto w-full max-w-2xl bg-[#F2FCE2] border border-[#8cc55b]/20 rounded-xl shadow p-6 flex flex-col gap-4 items-stretch animate-fade-in">
        <h2 className="text-xl font-bold text-[#8cc55b] mb-2 flex items-center gap-2">
          <span className="inline-block">🔤</span> تبدیل سریع فینگلیش به فارسی (Google Translate)
        </h2>
        <Textarea
          placeholder="متن فینگلیش خود را وارد کنید (مانند: salam chetori)"
          dir="ltr"
          value={finglishInput}
          minRows={1}
          onChange={e => setFinglishInput(e.target.value)}
          className="mb-1"
        />
        <div className="flex items-center gap-2 mb-2">
          <Textarea
            readOnly
            value={loading ? "در حال ترجمه..." : (persianOutput || '')}
            placeholder="خروجی فارسی در اینجا نمایش داده می‌شود"
            dir="rtl"
            minRows={1}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleCopyFarsi}
            disabled={!persianOutput || loading}
            className="min-w-[70px]"
          >
            {copyClicked ? "کپی شد!" : "کپی"}
          </Button>
        </div>
        {translateError && (
          <div className="text-sm text-red-500">{translateError}</div>
        )}
        <div className="text-xs text-[#7c9c36] font-medium opacity-90">
          این ابزار از Google Translate برای تبدیل سریع فینگلیش به فارسی استفاده می‌کند.
        </div>
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
      <section
        className="mb-12 animate-slide-up rounded-xl border border-[#8cc55b]/30 bg-[#F2FCE2]"
        style={{animationDelay: '0.2s'}}
      >
        <div className="flex justify-between items-center mb-6 px-6 pt-6">
          <div className="flex items-center">
            <Sparkles size={20} className="text-[#8cc55b] ml-2" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">ابزارهای جدید</h2>
          </div>
          <Link to="/all-tools" className="text-[#7c9c36] flex items-center text-sm font-bold hover:underline">
            مشاهده همه
            <ChevronLeft size={16} className="mr-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-6">
          {newTools.map((tool, index) => (
            <div key={tool.id} className="animate-fade-in" style={{animationDelay: `${0.3 + index * 0.1}s`}}>
              <ToolCard tool={tool} highlight />
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
          <Link to="/all-tools" className="text-primary flex items-center text-sm hover:underline">
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

