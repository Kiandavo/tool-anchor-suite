
import React, { useState, useMemo } from 'react';
import { Book, Search, RefreshCw, Bookmark, Filter, GlobeIcon } from 'lucide-react';
import { persianProverbs, proverbCategories, PersianProverb, ProverbCategory } from '@/data/persian-proverbs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const categoryColors: Record<ProverbCategory, string> = {
  'life-wisdom': 'bg-blue-100 text-blue-800 border-blue-200',
  'relationships': 'bg-purple-100 text-purple-800 border-purple-200',
  'perseverance': 'bg-green-100 text-green-800 border-green-200',
  'caution': 'bg-amber-100 text-amber-800 border-amber-200',
  'consequences': 'bg-red-100 text-red-800 border-red-200',
  'nature': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'patience': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'knowledge': 'bg-cyan-100 text-cyan-800 border-cyan-200'
};

export default function PersianProverbs() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProverbCategory | 'all'>('all');
  const [selectedProverb, setSelectedProverb] = useState<PersianProverb | null>(null);
  const [showEnglish, setShowEnglish] = useState(false);

  // Filter proverbs based on search query and category
  const filteredProverbs = useMemo(() => {
    return persianProverbs.filter(proverb => {
      const matchesSearch = searchQuery === '' || 
        proverb.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proverb.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (showEnglish && proverb.english.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || proverb.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, showEnglish]);

  // Get a random proverb
  const getRandomProverb = () => {
    const randomIndex = Math.floor(Math.random() * persianProverbs.length);
    setSelectedProverb(persianProverbs[randomIndex]);
    
    // Switch to detail tab
    const detailTab = document.querySelector('[data-value="detail"]') as HTMLButtonElement;
    if (detailTab) detailTab.click();
  };

  // Copy proverb to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "کپی شد",
      description: "ضرب‌المثل در کلیپ‌بورد کپی شد."
    });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="shadow-md mb-6">
        <CardHeader className="bg-gradient-to-b from-amber-50 to-white">
          <div className="flex items-center gap-3">
            <Book className="w-6 h-6 text-amber-600" />
            <CardTitle>ضرب‌المثل‌های فارسی</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="جستجوی ضرب‌المثل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3"
              />
            </div>
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ProverbCategory | 'all')}>
              <SelectTrigger className="w-full sm:w-48">
                <div className="flex items-center">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="همه دسته‌ها" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">همه دسته‌ها</SelectItem>
                {Object.entries(proverbCategories).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={getRandomProverb}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <RefreshCw size={16} />
              ضرب‌المثل تصادفی
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-english"
                checked={showEnglish}
                onCheckedChange={setShowEnglish}
              />
              <label
                htmlFor="show-english"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
              >
                <GlobeIcon size={16} />
                نمایش ترجمه انگلیسی
              </label>
            </div>
          </div>

          <Tabs defaultValue="list">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">فهرست</TabsTrigger>
              <TabsTrigger value="detail" data-value="detail" disabled={!selectedProverb}>
                جزئیات
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              {filteredProverbs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">ضرب‌المثلی با این مشخصات یافت نشد.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                  {filteredProverbs.map((proverb) => (
                    <Card key={proverb.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedProverb(proverb)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-lg mb-2">{proverb.text}</p>
                          <Badge className={`${categoryColors[proverb.category]} ml-2 whitespace-nowrap`}>
                            {proverbCategories[proverb.category]}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{proverb.meaning}</p>
                        {showEnglish && (
                          <p className="text-gray-600 text-sm mt-2 italic line-clamp-2">
                            <span className="font-medium">English: </span>{proverb.english}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="detail">
              {selectedProverb && (
                <div className="border rounded-lg p-6 bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{selectedProverb.text}</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(selectedProverb.text)}
                        className="h-8 w-8"
                      >
                        <Bookmark size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">معنی و مفهوم:</h3>
                      <p className="text-lg">{selectedProverb.meaning}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">ترجمه انگلیسی:</h3>
                      <p className="text-lg italic">{selectedProverb.english}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">دسته‌بندی:</h3>
                      <Badge className={`${categoryColors[selectedProverb.category]}`}>
                        {proverbCategories[selectedProverb.category]}
                      </Badge>
                    </div>
                    
                    {selectedProverb.example && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">مثال کاربرد:</h3>
                        <p className="text-gray-800 bg-amber-50 p-3 rounded-md border border-amber-100">
                          {selectedProverb.example}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedProverb(null)}
                      className="flex-1"
                    >
                      بازگشت به فهرست
                    </Button>
                    <Button
                      variant="outline"
                      onClick={getRandomProverb}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw size={16} />
                      ضرب‌المثل بعدی
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
