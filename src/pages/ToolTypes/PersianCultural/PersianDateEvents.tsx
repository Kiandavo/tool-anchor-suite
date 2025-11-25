import React, { useState } from 'react';
import { Calendar, Clock, Search, Filter, Star, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { getCurrentDates, persianMonths } from '@/utils/calendar/persianCalendar';
import {
  getEventsForDate,
  getEventsForMonth,
  getEventsByCategory,
  searchEvents,
  type HistoricalEvent
} from '@/data/history/persianHistoricalEvents';
import PersianCarpetPattern from '@/components/calendar/PersianCarpetPattern';

export default function PersianDateEvents() {
  const { persian } = getCurrentDates();
  const [selectedDay, setSelectedDay] = useState(persian.day);
  const [selectedMonth, setSelectedMonth] = useState(persian.month);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const getCategoryColor = (category: HistoricalEvent['category']) => {
    const colors = {
      cultural: 'bg-persian-turquoise text-white',
      political: 'bg-persian-red text-white',
      religious: 'bg-persian-purple text-white',
      scientific: 'bg-persian-blue text-white',
      artistic: 'bg-persian-gold text-white',
      national: 'bg-persian-green text-white'
    };
    return colors[category];
  };

  const getCategoryLabel = (category: HistoricalEvent['category']) => {
    const labels = {
      cultural: 'فرهنگی',
      political: 'سیاسی',
      religious: 'مذهبی',
      scientific: 'علمی',
      artistic: 'هنری',
      national: 'ملی'
    };
    return labels[category];
  };

  const getImportanceIcon = (importance: HistoricalEvent['importance']) => {
    if (importance === 'high') return <Star className="w-4 h-4 fill-persian-gold text-persian-gold" />;
    if (importance === 'medium') return <Star className="w-4 h-4 fill-persian-turquoise text-persian-turquoise" />;
    return <Star className="w-4 h-4 text-muted-foreground" />;
  };

  // Get events based on filters
  let displayedEvents: HistoricalEvent[] = [];
  if (searchQuery) {
    displayedEvents = searchEvents(searchQuery);
  } else {
    displayedEvents = getEventsForDate(selectedDay, selectedMonth);
    if (displayedEvents.length === 0) {
      displayedEvents = getEventsForMonth(selectedMonth);
    }
  }

  if (filterCategory !== 'all') {
    displayedEvents = displayedEvents.filter(e => e.category === filterCategory);
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Persian Carpet Background */}
      <PersianCarpetPattern type="jalali" />

      <div className="relative p-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-persian-turquoise to-transparent" />
            <Sparkles className="w-6 h-6 text-persian-gold animate-pulse-subtle" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-persian-turquoise to-transparent" />
          </div>

          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-persian-turquoise via-persian-gold to-persian-amber blur-2xl opacity-20" />
            <h1 className="relative text-5xl font-bold bg-gradient-to-l from-persian-turquoise via-persian-gold to-persian-amber bg-clip-text text-transparent pb-2">
              رویدادهای تاریخی فارسی
            </h1>
          </div>

          <p className="text-lg text-muted-foreground persian-optimized max-w-2xl mx-auto">
            کاوش در تاریخ غنی ایران - رویدادهای مهم فرهنگی، هنری و ملی
          </p>

          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-persian-turquoise animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-persian-gold animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 rounded-full bg-persian-amber animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-persian-turquoise/20 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm bg-card/95 mb-8">
            <CardHeader className="bg-gradient-to-br from-persian-turquoise/10 via-background to-persian-gold/10 border-b-2 border-persian-turquoise/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-persian-turquoise to-persian-blue flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl">جستجو و فیلتر</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Date Selector */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-persian-turquoise" />
                    ماه
                  </label>
                  <Select value={selectedMonth.toString()} onValueChange={(v) => setSelectedMonth(parseInt(v))}>
                    <SelectTrigger className="h-12 border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {persianMonths.map((month, index) => (
                        <SelectItem key={index + 1} value={(index + 1).toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-persian-turquoise" />
                    روز
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(parseInt(e.target.value) || 1)}
                    className="h-12 text-center text-lg font-semibold border-2"
                  />
                </div>
              </div>

              {/* Search Bar */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Search className="w-4 h-4 text-persian-turquoise" />
                  جستجو در رویدادها
                </label>
                <Input
                  type="text"
                  placeholder="نام رویداد، شخصیت یا توضیحات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-base border-2"
                />
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4 text-persian-turquoise" />
                  دسته‌بندی
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={filterCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterCategory('all')}
                    size="sm"
                  >
                    همه
                  </Button>
                  {['cultural', 'political', 'religious', 'scientific', 'artistic', 'national'].map((cat) => (
                    <Button
                      key={cat}
                      variant={filterCategory === cat ? 'default' : 'outline'}
                      onClick={() => setFilterCategory(cat)}
                      size="sm"
                    >
                      {getCategoryLabel(cat as HistoricalEvent['category'])}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Events Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-persian-gold" />
              <span>
                {searchQuery
                  ? `نتایج جستجو (${displayedEvents.length})`
                  : `${selectedDay} ${persianMonths[selectedMonth - 1]}`}
              </span>
            </h2>
            <Badge variant="outline" className="text-base px-4 py-2">
              {displayedEvents.length} رویداد
            </Badge>
          </div>

          <AnimatePresence mode="popLayout">
            {displayedEvents.length > 0 ? (
              displayedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-2 border-persian-turquoise/20 hover:border-persian-gold/40 transition-all hover:shadow-[0_8px_30px_rgba(240,180,50,0.2)] backdrop-blur-sm bg-card/95">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          {/* Title and Importance */}
                          <div className="flex items-center gap-3">
                            {getImportanceIcon(event.importance)}
                            <h3 className="text-2xl font-bold text-foreground">
                              {event.title}
                            </h3>
                          </div>

                          {/* Description */}
                          <p className="text-base text-muted-foreground leading-relaxed persian-optimized">
                            {event.description}
                          </p>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge className={getCategoryColor(event.category)}>
                              {getCategoryLabel(event.category)}
                            </Badge>
                            
                            {event.period && (
                              <Badge variant="outline" className="text-sm">
                                <Clock className="w-3 h-3 ml-1" />
                                {event.period}
                              </Badge>
                            )}

                            {event.date.year && (
                              <Badge variant="outline" className="text-sm">
                                <Calendar className="w-3 h-3 ml-1" />
                                سال {event.date.year}
                              </Badge>
                            )}

                            {event.modernObservance && (
                              <Badge variant="secondary" className="text-sm">
                                {event.modernObservance}
                              </Badge>
                            )}
                          </div>

                          {/* Related Figures */}
                          {event.relatedFigures && event.relatedFigures.length > 0 && (
                            <div className="pt-2">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-semibold">شخصیت‌های مرتبط: </span>
                                {event.relatedFigures.join('، ')}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Date Display */}
                        <div className="flex flex-col items-center gap-2 bg-gradient-to-br from-persian-turquoise/20 to-persian-gold/20 rounded-2xl p-4 border-2 border-persian-turquoise/30 min-w-[100px]">
                          <div className="text-4xl font-black text-persian-gold">
                            {event.date.day}
                          </div>
                          <div className="text-sm font-semibold text-center">
                            {persianMonths[event.date.month - 1]}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="border-2 border-dashed border-persian-turquoise/30 bg-card/50">
                  <CardContent className="py-16 text-center">
                    <Calendar className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">رویدادی یافت نشد</h3>
                    <p className="text-muted-foreground">
                      برای این تاریخ یا جستجوی شما رویدادی ثبت نشده است.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
