import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  History, 
  Star, 
  Heart, 
  MessageSquare, 
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReadingResult } from '@/types/reading-types';
import { 
  getReadingHistory, 
  updateReadingRating, 
  toggleReadingFavorite,
  addReadingNote 
} from '@/utils/reading-storage';
import { useToast } from '@/hooks/use-toast';

export const ReadingHistory: React.FC = () => {
  const [readings, setReadings] = useState<ReadingResult[]>(() => getReadingHistory());
  const [selectedReading, setSelectedReading] = useState<ReadingResult | null>(null);
  const [filter, setFilter] = useState<'all' | 'favorites' | string>('all');
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { toast } = useToast();

  const getReadingTypeIcon = (type: string) => {
    const icons = {
      coffee: '☕',
      tarot: '🔮',
      horoscope: '⭐',
      palm: '✋',
      numerology: '🔢',
      hafez: '📜',
      rumi: '🕊️'
    };
    return icons[type as keyof typeof icons] || '🎯';
  };

  const getReadingTypeName = (type: string) => {
    const names = {
      coffee: 'فال قهوه',
      tarot: 'فال تاروت', 
      horoscope: 'طالع بینی',
      palm: 'فال دست',
      numerology: 'اعداد شناسی',
      hafez: 'فال حافظ',
      rumi: 'استخاره مولانا'
    };
    return names[type as keyof typeof names] || type;
  };

  const handleRating = (readingId: string, rating: number) => {
    updateReadingRating(readingId, rating);
    setReadings(getReadingHistory());
    toast({
      title: "امتیاز ثبت شد! ⭐",
      description: `امتیاز ${rating} ستاره برای این فال ثبت شد`,
    });
  };

  const handleToggleFavorite = (readingId: string) => {
    toggleReadingFavorite(readingId);
    setReadings(getReadingHistory());
    const reading = readings.find(r => r.id === readingId);
    toast({
      title: reading?.isFavorite ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد! ❤️",
      description: reading?.isFavorite ? "" : "این فال در بخش علاقه‌مندی‌های شما ذخیره شد",
    });
  };

  const handleAddNote = () => {
    if (selectedReading && noteText.trim()) {
      addReadingNote(selectedReading.id, noteText);
      setReadings(getReadingHistory());
      setShowNoteEditor(false);
      setNoteText('');
      toast({
        title: "یادداشت ذخیره شد! 📝",
        description: "یادداشت شما برای این فال ثبت شد",
      });
    }
  };

  const filteredReadings = readings.filter(reading => {
    if (filter === 'all') return true;
    if (filter === 'favorites') return reading.isFavorite;
    return reading.type === filter;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50/90 to-indigo-50/90 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <History className="w-5 h-5" />
            تاریخچه فال‌ها
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="text-xs"
            >
              همه ({readings.length})
            </Button>
            <Button
              variant={filter === 'favorites' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('favorites')}
              className="text-xs"
            >
              <Heart className="w-3 h-3 ml-1" />
              علاقه‌مندی‌ها ({readings.filter(r => r.isFavorite).length})
            </Button>
            {Array.from(new Set(readings.map(r => r.type))).map(type => (
              <Button
                key={type}
                variant={filter === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(type)}
                className="text-xs"
              >
                {getReadingTypeIcon(type)} {getReadingTypeName(type)}
              </Button>
            ))}
          </div>

          {/* Reading List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredReadings.map((reading, index) => (
                <motion.div
                  key={reading.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedReading(reading)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getReadingTypeIcon(reading.type)}</span>
                        <h4 className="font-medium text-purple-800">
                          {getReadingTypeName(reading.type)}
                        </h4>
                        {reading.isFavorite && (
                          <Heart className="w-4 h-4 text-red-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <Calendar className="w-3 h-3 inline ml-1" />
                        {formatDate(reading.timestamp)}
                      </p>
                      {reading.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < reading.rating! 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(reading.id);
                        }}
                      >
                        <Heart className={`w-4 h-4 ${
                          reading.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                        }`} />
                      </Button>
                      {reading.notes && (
                        <MessageSquare className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                  </div>
                 </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredReadings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>هنوز فالی در این بخش ندارید</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reading Detail Modal */}
      {selectedReading && (
        <Card className="bg-white border-purple-300">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-indigo-100">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">{getReadingTypeIcon(selectedReading.type)}</span>
                {getReadingTypeName(selectedReading.type)}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedReading(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <p className="text-sm text-gray-600">
              <Calendar className="w-4 h-4 inline ml-1" />
              {formatDate(selectedReading.timestamp)}
            </p>

            {/* Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">امتیاز دهید:</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleRating(selectedReading.id, i + 1)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        selectedReading.rating && i < selectedReading.rating
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">یادداشت شخصی:</label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowNoteEditor(!showNoteEditor);
                    setNoteText(selectedReading.notes || '');
                  }}
                >
                  <MessageSquare className="w-3 h-3 ml-1" />
                  {selectedReading.notes ? 'ویرایش' : 'افزودن'}
                </Button>
              </div>
              
              {selectedReading.notes && !showNoteEditor && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">{selectedReading.notes}</p>
                </div>
              )}

              {showNoteEditor && (
                <div className="space-y-2">
                  <Textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="یادداشت خود را اینجا بنویسید..."
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddNote}>
                      ذخیره
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowNoteEditor(false)}>
                      لغو
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Result Preview */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h5 className="font-medium mb-2">خلاصه نتیجه:</h5>
              <p className="text-sm text-gray-700 line-clamp-3">
                {JSON.stringify(selectedReading.result).substring(0, 200)}...
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};