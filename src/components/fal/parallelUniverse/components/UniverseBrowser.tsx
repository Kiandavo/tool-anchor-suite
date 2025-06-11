
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Filter, Heart, History } from "lucide-react";
import { ParallelUniverse, UniverseType } from '../types';
import { parallelUniverses, getUniversesByType, searchUniverses } from '../universeData';
import { getUniverseTypeColor } from '../universeStyleUtils';

interface UniverseBrowserProps {
  onSelectUniverse: (universe: ParallelUniverse) => void;
  favorites: number[];
  onToggleFavorite: (universeId: number) => void;
  history: number[];
}

const UniverseBrowser: React.FC<UniverseBrowserProps> = ({
  onSelectUniverse,
  favorites,
  onToggleFavorite,
  history
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const filteredUniverses = useMemo(() => {
    let universes = parallelUniverses;

    if (showFavorites) {
      universes = universes.filter(u => favorites.includes(u.id));
    } else if (showHistory) {
      universes = universes.filter(u => history.includes(u.id));
    } else if (selectedCategory !== 'all') {
      // Type guard to ensure selectedCategory is a valid UniverseType
      const validTypes: UniverseType[] = ['utopian', 'dystopian', 'bizarre', 'neutral'];
      if (validTypes.includes(selectedCategory as UniverseType)) {
        universes = getUniversesByType(selectedCategory as UniverseType);
      }
    }

    if (searchQuery) {
      universes = searchUniverses(searchQuery).filter(u => 
        showFavorites ? favorites.includes(u.id) :
        showHistory ? history.includes(u.id) :
        selectedCategory === 'all' || u.type === selectedCategory
      );
    }

    return universes;
  }, [selectedCategory, searchQuery, showFavorites, showHistory, favorites, history]);

  const getCategoryName = (type: string) => {
    switch (type) {
      case 'all': return 'همه جهان‌ها';
      case 'utopian': return 'جهان‌های مطلوب';
      case 'dystopian': return 'جهان‌های آخرالزمانی';
      case 'bizarre': return 'جهان‌های عجیب';
      case 'neutral': return 'جهان‌های متعادل';
      default: return 'نامشخص';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'utopian': return '🌟';
      case 'dystopian': return '🌑';
      case 'bizarre': return '🌈';
      case 'neutral': return '⚖️';
      default: return '🌍';
    }
  };

  const getRandomFromCategory = () => {
    const filtered = filteredUniverses;
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      onSelectUniverse(filtered[randomIndex]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه جهان‌ها ({parallelUniverses.length})</SelectItem>
              <SelectItem value="utopian">مطلوب ({getUniversesByType('utopian').length})</SelectItem>
              <SelectItem value="dystopian">آخرالزمانی ({getUniversesByType('dystopian').length})</SelectItem>
              <SelectItem value="bizarre">عجیب ({getUniversesByType('bizarre').length})</SelectItem>
              <SelectItem value="neutral">متعادل ({getUniversesByType('neutral').length})</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showFavorites ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setShowFavorites(!showFavorites);
              setShowHistory(false);
            }}
            className="flex items-center gap-1"
          >
            <Heart size={14} />
            علاقه‌مندی‌ها ({favorites.length})
          </Button>

          <Button
            variant={showHistory ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setShowHistory(!showHistory);
              setShowFavorites(false);
            }}
            className="flex items-center gap-1"
          >
            <History size={14} />
            تاریخچه ({history.length})
          </Button>
        </div>

        <Button
          onClick={getRandomFromCategory}
          size="sm"
          className="flex items-center gap-1"
        >
          <Sparkles size={14} />
          انتخاب تصادفی
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="جستجو در جهان‌ها..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {filteredUniverses.length} جهان پیدا شد
          {showFavorites && " در علاقه‌مندی‌ها"}
          {showHistory && " در تاریخچه"}
        </span>
        {selectedCategory !== 'all' && (
          <span className="flex items-center gap-1">
            <span>{getTypeIcon(selectedCategory)}</span>
            {getCategoryName(selectedCategory)}
          </span>
        )}
      </div>

      {/* Universe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {filteredUniverses.map((universe) => (
          <Card 
            key={universe.id} 
            className={`cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${getUniverseTypeColor(universe.type)} border-2 hover:border-primary/30`}
            onClick={() => onSelectUniverse(universe)}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(universe.type)}</span>
                  <h4 className="font-medium text-sm line-clamp-1">{universe.name}</h4>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(universe.id);
                  }}
                >
                  <Heart 
                    size={12} 
                    className={favorites.includes(universe.id) ? "fill-red-500 text-red-500" : "text-gray-400"} 
                  />
                </Button>
              </div>
              
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {universe.description}
              </p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  احتمال: {(universe.probability * 100).toFixed(3)}%
                </span>
                {history.includes(universe.id) && (
                  <span className="text-blue-600 text-xs">بازدید شده</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUniverses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Filter size={48} className="mx-auto mb-2 opacity-50" />
          <p>هیچ جهانی با این معیارها پیدا نشد</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setShowFavorites(false);
              setShowHistory(false);
            }}
          >
            پاک کردن فیلترها
          </Button>
        </div>
      )}
    </div>
  );
};

export default UniverseBrowser;
