
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, InfoIcon } from "lucide-react";
import { persianWordEtymology } from '@/data/persian-word-etymology';

interface WordData {
  word: string;
  root: string;
  meaning: string;
  description: string;
  examples: string[];
}

const WordEtymology = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<WordData[]>([]);
  const [selectedWord, setSelectedWord] = useState<WordData | null>(null);
  
  useEffect(() => {
    // Show all words in alphabetical order on initial load
    if (persianWordEtymology.length > 0) {
      const sortedWords = [...persianWordEtymology]
        .sort((a, b) => a.word.localeCompare(b.word, 'fa'));
      setSearchResults(sortedWords);
    }
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If search is empty, show all words in alphabetical order
      const sortedWords = [...persianWordEtymology]
        .sort((a, b) => a.word.localeCompare(b.word, 'fa'));
      setSearchResults(sortedWords);
      setSelectedWord(null);
      return;
    }
    
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const results = persianWordEtymology.filter(item => 
      item.word.toLowerCase().includes(normalizedSearchTerm) ||
      item.examples.some(ex => ex.toLowerCase().includes(normalizedSearchTerm))
    ).sort((a, b) => a.word.localeCompare(b.word, 'fa'));
    
    setSearchResults(results);
    setSelectedWord(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ریشه‌شناسی کلمات فارسی</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            با این ابزار می‌توانید ریشه و تاریخچه کلمات فارسی را جستجو کنید و با معانی و تحولات تاریخی آن‌ها آشنا شوید.
          </p>

          <div className="flex gap-2 mb-8">
            <Input 
              placeholder="کلمه مورد نظر را وارد کنید..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-lg"
            />
            <Button onClick={handleSearch} className="rounded-lg">
              <SearchIcon className="w-4 h-4 ml-1" />
              جستجو
            </Button>
          </div>

          <div className="space-y-4">
            {searchResults.length === 0 && (
              <div className="text-center py-10 bg-muted/30 rounded-lg">
                <p>نتیجه‌ای یافت نشد.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="p-4 border rounded-lg cursor-pointer bg-background hover:bg-muted/30 transition-colors"
                  onClick={() => setSelectedWord(result)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{result.word}</h3>
                      <p className="text-sm text-muted-foreground">{result.meaning}</p>
                    </div>
                    <InfoIcon className="text-muted-foreground" size={18} />
                  </div>
                </div>
              ))}
            </div>

            {selectedWord && (
              <div className="mt-8 p-5 border rounded-lg bg-muted/30 space-y-3">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">{selectedWord.word}</h2>
                  <span className="text-sm text-muted-foreground">{selectedWord.root}</span>
                </div>
                <p className="font-medium">{selectedWord.meaning}</p>
                <p className="text-muted-foreground">{selectedWord.description}</p>
                
                <div className="mt-4">
                  <p className="font-medium mb-2">کلمات هم‌خانواده:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedWord.examples.map((example, idx) => (
                      <span 
                        key={idx} 
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WordEtymology;
