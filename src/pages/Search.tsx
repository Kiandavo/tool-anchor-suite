
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { searchTools, Tool } from '@/data/tools';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Tool[]>([]);
  
  useEffect(() => {
    if (query) {
      setResults(searchTools(query));
    } else {
      setResults([]);
    }
  }, [query]);
  
  return (
    <Layout backUrl="/" showSearch={true}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">نتایج جستجو</h1>
        <p className="text-gray-600">
          {results.length} ابزار برای "{query}" یافت شد
        </p>
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-600 mb-2">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
          <p className="text-gray-500">لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
        </div>
      )}
    </Layout>
  );
};

export default Search;
