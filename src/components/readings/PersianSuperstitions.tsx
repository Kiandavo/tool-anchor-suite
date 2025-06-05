
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Book } from "lucide-react";
import { superstitionsData, Superstition } from '@/data/persian-superstitions';
import SuperstitionFilters from './superstitions/SuperstitionFilters';
import SuperstitionList from './superstitions/SuperstitionList';
import SuperstitionDetail from './superstitions/SuperstitionDetail';

const PersianSuperstitions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [selectedSuperstition, setSelectedSuperstition] = useState<Superstition | null>(null);

  const filteredSuperstitions = superstitionsData.filter(item => {
    const matchesSearch = item.title.includes(searchTerm) || item.description.includes(searchTerm);
    const matchesCategory = selectedCategory === 'همه' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-300 to-blue-300 text-center py-3">
        <div className="flex items-center justify-center">
          <Book className="text-purple-800 ml-2" size={18} />
          <h2 className="text-lg font-bold text-purple-800">راهنمای خرافات ایرانی</h2>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4">
        <div className="space-y-4">
          <SuperstitionFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {!selectedSuperstition ? (
            <SuperstitionList 
              superstitions={filteredSuperstitions}
              onSelectSuperstition={setSelectedSuperstition}
            />
          ) : (
            <SuperstitionDetail 
              superstition={selectedSuperstition}
              onBack={() => setSelectedSuperstition(null)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersianSuperstitions;
