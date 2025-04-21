
import React from "react";
import { Layout } from "@/components/Layout";
import { ToolCard } from "@/components/ToolCard";
import { tools, ToolCategory, categoryLabels } from "@/data/tools";

// Get all unique categories in the same order as the labels object
const categories: ToolCategory[] = Object.keys(categoryLabels) as ToolCategory[];

const groupedTools: Record<ToolCategory, typeof tools> = categories.reduce((acc, category) => {
  acc[category] = tools.filter((tool) => tool.category === category);
  return acc;
}, {} as Record<ToolCategory, typeof tools>);

const AllTools = () => {
  return (
    <Layout title="همه ابزارها" backUrl="/">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">همه ابزارها بر اساس دسته‌بندی</h1>
      <div className="flex flex-col gap-12">
        {categories.map((category) =>
          groupedTools[category].length > 0 ? (
            <section key={category}>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{categoryLabels[category]}</h2>
                <span className="ml-2 text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{groupedTools[category].length} ابزار</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
