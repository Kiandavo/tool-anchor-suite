
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Book, Clock, Globe, FileText, History } from "lucide-react";
import { toast } from "sonner";

// Import word etymology data (assumed to be in the project already)
import { persianWordEtymology } from "@/data/persian-word-etymology";

const WordEtymology = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      toast.warning("لطفاً یک کلمه وارد کنید");
      return;
    }

    setLoading(true);
    setSearchPerformed(true);

    // Simulate API delay (replace with real API call if needed)
    setTimeout(() => {
      const searchTerm = query.trim().toLowerCase();
      const foundWords = persianWordEtymology.filter(word => 
        word.word.toLowerCase().includes(searchTerm) || 
        word.transliteration.toLowerCase().includes(searchTerm)
      );

      setResults(foundWords);
      setLoading(false);

      if (foundWords.length === 0) {
        toast.info("کلمه‌ای با این مشخصات پیدا نشد");
      }
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">ریشه‌شناسی کلمات فارسی</h1>
        <p className="text-gray-600 text-sm">ریشه و تاریخچه کلمات فارسی را کشف کنید</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="کلمه مورد نظر خود را وارد کنید..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow py-6 text-base focus-visible:ring-blue-500"
        />
        <Button 
          onClick={handleSearch} 
          disabled={loading} 
          className="bg-blue-600 hover:bg-blue-700 text-white py-6"
        >
          {loading ? 'در حال جستجو...' : (
            <>
              <Search className="ml-2" size={18} />
              جستجو
            </>
          )}
        </Button>
      </div>

      {searchPerformed && results.length === 0 && !loading && (
        <Card className="p-6 text-center bg-gray-50">
          <div className="flex flex-col items-center">
            <FileText size={48} className="text-gray-400 mb-2" />
            <h3 className="font-medium text-lg">نتیجه‌ای یافت نشد</h3>
            <p className="text-gray-500 text-sm mt-1">
              کلمه دیگری را امتحان کنید یا املای کلمه را بررسی نمایید
            </p>
          </div>
        </Card>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          {results.map((word, index) => (
            <Card key={index} className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">{word.word}</h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {word.transliteration}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Book className="ml-2 text-blue-600 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-sm text-gray-700">معنی</h3>
                      <p className="text-gray-600">{word.meaning}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Globe className="ml-2 text-green-600 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-sm text-gray-700">ریشه زبانی</h3>
                      <p className="text-gray-600">{word.origin}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <History className="ml-2 text-purple-600 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-sm text-gray-700">تاریخچه</h3>
                      <p className="text-gray-600 text-sm">{word.history}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="ml-2 text-orange-600 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-sm text-gray-700">دوره تاریخی</h3>
                      <p className="text-gray-600">{word.era}</p>
                    </div>
                  </div>
                </div>

                {word.relatedWords && word.relatedWords.length > 0 && (
                  <div className="border-t border-gray-200 pt-3">
                    <h3 className="font-medium text-sm text-gray-700 mb-2">کلمات مرتبط</h3>
                    <div className="flex flex-wrap gap-2">
                      {word.relatedWords.map((related: string, i: number) => (
                        <span 
                          key={i} 
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                          onClick={() => setQuery(related)}
                        >
                          {related}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {!searchPerformed && (
        <div className="border rounded-lg p-6 bg-gray-50 border-dashed border-gray-300 text-center">
          <Book className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <h3 className="font-medium text-gray-700 mb-1">جستجوی ریشه کلمات فارسی</h3>
          <p className="text-sm text-gray-500">
            کلمه‌ای را در کادر بالا وارد کنید تا ریشه، تاریخچه و معنای آن را بیابید
          </p>
        </div>
      )}
    </div>
  );
};

export default WordEtymology;
