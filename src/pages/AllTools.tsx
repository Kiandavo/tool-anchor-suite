
import React from "react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";
import { tools, ToolCategory, categoryLabels } from "@/data/tools";
import { SeoHead } from "@/components/seo/SeoHead";

// Get all unique categories in the same order as the labels object
const categories: ToolCategory[] = Object.keys(categoryLabels) as ToolCategory[];

const groupedTools: Record<ToolCategory, typeof tools> = categories.reduce((acc, category) => {
  acc[category] = tools.filter((tool) => tool.category === category);
  return acc;
}, {} as Record<ToolCategory, typeof tools>);

const AllTools = () => {
  return (
    <Layout>
      <SeoHead 
        title="همه ابزارها - لنگر | فهرست کامل ابزارهای آنلاین"
        description="فهرست کامل ابزارهای آنلاین رایگان لنگر بر اساس دسته‌بندی: محاسبه‌گر، متن، تصویر، سئو، فرهنگ فارسی، طالع‌بینی و بیشتر."
        keywords="همه ابزارها, ابزار آنلاین, لنگر, فهرست ابزار, محاسبه‌گر, ابزار متنی, ابزار تصویری, سئو, طالع‌بینی"
        canonical="https://langar.co/all-tools"
      />
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">همه ابزارها بر اساس دسته‌بندی</h1>
      <p className="text-gray-600 text-sm sm:text-base text-center mb-6">همه ابزارهای رایگان لنگر در یک صفحه؛ به سرعت ابزار مناسب خود را بر اساس دسته‌بندی پیدا کنید.</p>
      <div className="flex flex-col gap-8 sm:gap-12">
        {categories.map((category) =>
          groupedTools[category].length > 0 ? (
            <section key={category}>
              <div className="flex items-center mb-2 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{categoryLabels[category]}</h2>
                <span className="ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{groupedTools[category].length} ابزار</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                {groupedTools[category].map((tool) => (
                  <ToolCard tool={tool} key={tool.id} />
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </Layout>
  );
};

export default AllTools;
