
import React, { useState, useMemo } from 'react';
import { Book, Search, Clock, Globe, Sparkles, Filter } from 'lucide-react';
import { etymologyWords, rootLanguageLabels, periodLabels, EtymologyWord } from '@/data/persian-word-etymology';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function WordEtymology() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [rootLanguageFilter, setRootLanguageFilter] = useState<string>('');
  const [periodFilter, setPeriodFilter] = useState<string>('');
  const [selectedWord, setSelectedWord] = useState<EtymologyWord | null>(null);

  // Filter words based on search query and filters
  const filteredWords = useMemo(() => {
    return etymologyWords.filter(word => {
      const matchesSearch = searchQuery === '' || 
        word.word.includes(searchQuery) ||
        word.etymology.includes(searchQuery);
      
      const matchesRootLanguage = rootLanguageFilter === '' || word.rootLanguage === rootLanguageFilter;
      const matchesPeriod = periodFilter === '' || word.period === periodFilter;
      
      return matchesSearch && matchesRootLanguage && matchesPeriod;
    });
  }, [searchQuery, rootLanguageFilter, periodFilter]);

  // Get a random word
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * etymologyWords.length);
    setSelectedWord(etymologyWords[randomIndex]);
    
    // Switch to detail tab
    const detailTab = document.querySelector('[data-value="detail"]') as HTMLButtonElement;
    if (detailTab) detailTab.click();
  };

  // Copy word to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "کپی شد",
      description: "واژه در کلیپ‌بورد کپی شد."
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="shadow-md mb-6">
        <CardHeader className="bg-gradient-to-b from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <Book className="w-6 h-6 text-blue-600" />
            <CardTitle>ریشه‌شناسی کلمات فارسی</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="جستجوی واژه..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3"
              />
            </div>
            <Button
              variant="outline"
              onClick={getRandomWord}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles size={16} />
              واژه تصادفی
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Select value={rootLanguageFilter} onValueChange={setRootLanguageFilter}>
              <SelectTrigger className="w-36">
                <div className="flex items-center">
                  <Globe size={16} className="mr-2" />
                  <SelectValue placeholder="ریشه زبانی" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">همه زبان‌ها</SelectItem>
                {Object.entries(rootLanguageLabels).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-36">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <SelectValue placeholder="دوره تاریخی" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">همه دوره‌ها</SelectItem>
                {Object.entries(periodLabels).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="list">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">فهرست واژگان</TabsTrigger>
              <TabsTrigger value="detail" data-value="detail" disabled={!selectedWord}>
                جزئیات ریشه‌شناسی
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              {filteredWords.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">واژه‌ای با این مشخصات یافت نشد.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {filteredWords.map((word) => (
                    <Card key={word.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedWord(word)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-lg mb-2">{word.word}</p>
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200 ml-2 whitespace-nowrap">
                            {rootLanguageLabels[word.rootLanguage]}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{word.etymology}</p>
                        {word.period && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {periodLabels[word.period]}
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="detail">
              {selectedWord && (
                <div className="border rounded-lg p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{selectedWord.word}</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(selectedWord.word)}
                        className="h-8 w-8"
                      >
                        <Book size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">ریشه‌شناسی:</h3>
                      <p className="text-lg leading-relaxed">{selectedWord.etymology}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">ریشه زبانی:</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {rootLanguageLabels[selectedWord.rootLanguage]}
                        </Badge>
                      </div>
                      
                      {selectedWord.period && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">دوره تاریخی:</h3>
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            {periodLabels[selectedWord.period]}
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    {selectedWord.examples && selectedWord.examples.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">مثال‌های کاربرد:</h3>
                        <ul className="list-disc list-inside space-y-1 pr-2">
                          {selectedWord.examples.map((example, index) => (
                            <li key={index} className="text-gray-700">{example}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {selectedWord.relatedWords && selectedWord.relatedWords.length > 0 && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">واژگان مرتبط:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedWord.relatedWords.map((word, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-50">
                              {word}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedWord(null)}
                      className="flex-1"
                    >
                      بازگشت به فهرست
                    </Button>
                    <Button
                      variant="outline"
                      onClick={getRandomWord}
                      className="flex items-center gap-2"
                    >
                      <Sparkles size={16} />
                      واژه تصادفی
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
