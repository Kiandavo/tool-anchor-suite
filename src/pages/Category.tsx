
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { getToolsByCategory, categoryLabels, ToolCategory } from '@/data/tools';
import { Search, ArrowLeft } from 'lucide-react';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Type assertion since we know the param should match our ToolCategory type
  const category = categoryId as ToolCategory;
  const allTools = getToolsByCategory(category);
  const filteredTools = searchQuery
    ? allTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTools;

  const categoryName = categoryLabels[category];

  return (
    <Layout title={categoryName} backUrl="/">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{categoryName}</h1>
          <p className="text-gray-600 text-xs sm:text-sm">{allTools.length} ابزار در این دسته‌بندی</p>
        </div>
        {/* Back button visible on mobile for better UX */}
        <button
          className="flex items-center text-primary hover:text-primary/80 bg-white rounded border px-3 py-1 transition-colors duration-200 shadow-sm mt-2 sm:mt-0 sm:hidden"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} className="ml-2" />
          بازگشت
        </button>
      </div>

      <div className="mb-6 relative max-w-md mx-auto w-full">
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو در این دسته..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pr-10 pl-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
          dir="rtl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 animate-fade-in">
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600 mb-2">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
            <p className="text-gray-500">لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Category;
