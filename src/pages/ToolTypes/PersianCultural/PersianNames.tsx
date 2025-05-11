
import React, { useState, useMemo } from 'react';
import { User, Search, Filter, X } from 'lucide-react';
import { persianNames, PersianName } from '@/data/persian-names';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Gender badges based on gender type
const genderBadges = {
  'male': <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">مذکر</Badge>,
  'female': <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200">مؤنث</Badge>,
  'unisex': <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200">دوجنسیتی</Badge>,
};

// Origin badges based on origin type
const originBadges = {
  'persian': <Badge className="bg-green-100 text-green-800 hover:bg-green-200">فارسی</Badge>,
  'arabic': <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">عربی</Badge>,
  'turkish': <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">ترکی</Badge>,
  'kurdish': <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">کردی</Badge>,
  'mixed': <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">ترکیبی</Badge>,
};

// Popularity indicators
const popularityIndicators = {
  'high': <Badge variant="outline" className="border-green-400 text-green-600">محبوبیت بالا</Badge>,
  'medium': <Badge variant="outline" className="border-yellow-400 text-yellow-600">محبوبیت متوسط</Badge>,
  'low': <Badge variant="outline" className="border-gray-400 text-gray-600">محبوبیت پایین</Badge>,
};

export default function PersianNames() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>(null);
  const [popularity, setPopularity] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<PersianName | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter names based on search query and filters
  const filteredNames = useMemo(() => {
    return persianNames.filter(name => {
      // Apply search filter
      const matchesSearch = searchQuery === '' || 
        name.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply gender filter
      const matchesGender = gender === null || name.gender === gender;
      
      // Apply origin filter
      const matchesOrigin = origin === null || name.origin === origin;
      
      // Apply popularity filter
      const matchesPopularity = popularity === null || name.popularity === popularity;
      
      return matchesSearch && matchesGender && matchesOrigin && matchesPopularity;
    });
  }, [searchQuery, gender, origin, popularity]);

  // Reset all filters
  const resetFilters = () => {
    setGender(null);
    setOrigin(null);
    setPopularity(null);
  };

  // Display name details when clicked
  const handleNameClick = (name: PersianName) => {
    setSelectedName(name);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="shadow-md mb-6">
        <CardHeader className="bg-gradient-to-b from-blue-50 to-white">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            <CardTitle>معانی نام‌های ایرانی</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="جستجوی نام..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-3"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-gray-100" : ""}
            >
              <Filter size={18} />
            </Button>
          </div>

          {showFilters && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">فیلترها</h3>
                <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs">
                  <X size={14} className="mr-1" />
                  پاک کردن
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-600">جنسیت</label>
                  <Select value={gender ?? ""} onValueChange={(value) => setGender(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="همه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">همه</SelectItem>
                      <SelectItem value="male">مذکر</SelectItem>
                      <SelectItem value="female">مؤنث</SelectItem>
                      <SelectItem value="unisex">دوجنسیتی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-gray-600">ریشه</label>
                  <Select value={origin ?? ""} onValueChange={(value) => setOrigin(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="همه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">همه</SelectItem>
                      <SelectItem value="persian">فارسی</SelectItem>
                      <SelectItem value="arabic">عربی</SelectItem>
                      <SelectItem value="turkish">ترکی</SelectItem>
                      <SelectItem value="kurdish">کردی</SelectItem>
                      <SelectItem value="mixed">ترکیبی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-gray-600">محبوبیت</label>
                  <Select value={popularity ?? ""} onValueChange={(value) => setPopularity(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="همه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">همه</SelectItem>
                      <SelectItem value="high">بالا</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="low">پایین</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {filteredNames.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">نامی با این مشخصات یافت نشد.</p>
              <Button variant="link" onClick={resetFilters}>حذف فیلترها</Button>
            </div>
          ) : (
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="list">فهرست نام‌ها</TabsTrigger>
                <TabsTrigger value="details" disabled={!selectedName}>جزئیات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="list" className="mt-0">
                <div className="max-h-[400px] overflow-y-auto border rounded-lg">
                  <div className="grid grid-cols-1 divide-y">
                    {filteredNames.map((name) => (
                      <button
                        key={name.id}
                        className="flex justify-between items-center p-3 hover:bg-gray-50 w-full text-right transition-colors"
                        onClick={() => handleNameClick(name)}
                      >
                        <div>
                          <span className="font-medium text-lg">{name.name}</span>
                          <div className="text-sm text-gray-500 mt-1 line-clamp-1">
                            {name.meaning}
                          </div>
                        </div>
                        <div>
                          {genderBadges[name.gender as keyof typeof genderBadges]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center">
                  نمایش {filteredNames.length} نام از مجموع {persianNames.length} نام
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                {selectedName && (
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold">{selectedName.name}</h2>
                      <div className="flex flex-col gap-2">
                        {genderBadges[selectedName.gender as keyof typeof genderBadges]}
                        {popularityIndicators[selectedName.popularity as keyof typeof popularityIndicators]}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">معنی:</h3>
                        <p className="text-lg">{selectedName.meaning}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">ریشه:</h3>
                        <div>{originBadges[selectedName.origin as keyof typeof originBadges]}</div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => setSelectedName(null)}
                    >
                      بازگشت به فهرست
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
