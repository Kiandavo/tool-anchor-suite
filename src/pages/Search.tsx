
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { searchTools, Tool, categoryLabels, ToolCategory } from '@/data/tools';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Tool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  
  useEffect(() => {
    if (query) {
      const searchResults = searchTools(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);
  
  const filteredResults = selectedCategory === 'all' 
    ? results 
    : results.filter(tool => tool.category === selectedCategory);
  
  const categoryResults = results.reduce((acc, tool) => {
    acc[tool.category] = (acc[tool.category] || 0) + 1;
    return acc;
  }, {} as Record<ToolCategory, number>);
  
  const handleCategorySelect = (category: ToolCategory | 'all') => {
    setSelectedCategory(category);
  };
  
  const clearSearch = () => {
    setSearchParams({});
  };

  const handleSearch = (searchQuery: string) => {
    setSearchParams({ q: searchQuery });
  };

  // Function to get search results for inline display
  const getSearchResults = (searchQuery: string) => {
    return searchTools(searchQuery).slice(0, 5);
  };
  
  return (
    <Layout backUrl="/" showSearch={false}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">نتایج جستجو</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-600">
            {results.length > 0 ? 
              `${results.length} ابزار برای "${query}" یافت شد` : 
              `نتیجه‌ای برای "${query}" یافت نشد`
            }
          </p>
          <div className="max-w-md w-full">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="جستجوی مجدد..." 
              getResults={getSearchResults}
              showInlineResults={true}
            />
          </div>
          {query && (
            <button 
              onClick={clearSearch} 
              className="text-primary flex items-center text-sm"
            >
              <X size={16} className="ml-1" />
              پاک کردن جستجو
            </button>
          )}
        </div>
      </div>
      
      {results.length > 0 && (
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 rtl:space-x-reverse pb-2">
            <button 
              onClick={() => handleCategorySelect('all')}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition-colors`}
            >
              همه ({results.length})
            </button>
            
            {Object.entries(categoryResults).map(([category, count]) => (
              <button 
                key={category}
                onClick={() => handleCategorySelect(category as ToolCategory)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                  selectedCategory === category ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                {categoryLabels[category as ToolCategory]} ({count})
              </button>
            ))}
          </div>
        </div>
      )}
      
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredResults.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm animate-fade-in">
          <SearchIcon size={40} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 mb-2">نتیجه‌ای برای جستجوی شما یافت نشد.</p>
          <p className="text-gray-500">لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
        </div>
      )}
    </Layout>
  );
};

export default Search;
