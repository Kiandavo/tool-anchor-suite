
import React from 'react';
import { Link } from 'react-router-dom';
import { ToolCard } from '@/components/ToolCard';
import { tools, getPopularTools, getNewTools } from '@/data/tools';
import { fallbackTools, getPopularFallbackTools, getNewFallbackTools } from '@/data/fallback-tools';

export const ToolsSection = () => {
  console.log('ToolsSection: Component rendering');
  
  // Use actual tools with fallbacks
  const allTools = tools.length > 0 ? tools : fallbackTools;
  const popularTools = allTools.length > 0 ? getPopularTools() : getPopularFallbackTools();
  const newTools = allTools.length > 0 ? getNewTools() : getNewFallbackTools();
  
  console.log('ToolsSection: Popular tools count:', popularTools.length);
  console.log('ToolsSection: New tools count:', newTools.length);
  console.log('ToolsSection: Total tools count:', allTools.length);

  if (allTools.length === 0) {
    console.warn('ToolsSection: No tools available, showing fallback message');
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">ابزارها در حال بارگیری...</h2>
            <p className="text-gray-600">لطفاً چند لحظه صبر کنید</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">ابزارهای کاربردی</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            مجموعه کاملی از ابزارهای آنلاین برای تسهیل کارهای روزانه شما
          </p>
        </div>

        {/* Popular Tools Section */}
        {popularTools.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold text-gray-800">ابزارهای محبوب</h3>
              <Link 
                to="/category/popular" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                مشاهده همه ←
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} highlight />
              ))}
            </div>
          </div>
        )}

        {/* New Tools Section */}
        {newTools.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold text-gray-800">ابزارهای جدید</h3>
              <Link 
                to="/category/new" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                مشاهده همه ←
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {newTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {/* All Tools Preview */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {allTools.length}+ ابزار در دسترس
          </h3>
          <p className="text-gray-600 mb-6">
            کشف کنید، استفاده کنید و کارهایتان را سریع‌تر انجام دهید
          </p>
          <Link 
            to="/tools" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            مشاهده تمام ابزارها
          </Link>
        </div>
      </div>
    </section>
  );
};
