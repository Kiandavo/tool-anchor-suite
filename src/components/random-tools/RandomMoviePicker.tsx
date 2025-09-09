import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Film, Star, Calendar, Clock, Shuffle } from 'lucide-react';
import { toast } from 'sonner';

interface Movie {
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: number;
  description: string;
  director: string;
}

const movies: Movie[] = [
  { title: "فرار از زندان شاوشانک", genre: "درام", year: 1994, rating: 9.3, duration: 142, description: "داستان یک بانکدار که به اتهام قتل همسرش محکوم می‌شود.", director: "فرانک دارابونت" },
  { title: "پدرخوانده", genre: "جنایی", year: 1972, rating: 9.2, duration: 175, description: "داستان خانواده‌ای از مافیا در آمریکا", director: "فرانسیس کاپولا" },
  { title: "شوالیه تاریکی", genre: "اکشن", year: 2008, rating: 9.0, duration: 152, description: "بتمن با جوکر روبرو می‌شود", director: "کریستوفر نولان" },
  { title: "فهرست شیندلر", genre: "درام", year: 1993, rating: 8.9, duration: 195, description: "داستان واقعی نجات یهودیان در جنگ جهانی دوم", director: "استیون اسپیلبرگ" },
  { title: "عامه پسند", genre: "جنایی", year: 1994, rating: 8.9, duration: 154, description: "چندین داستان جنایی در هم تنیده", director: "کوئنتین تارانتینو" },
  { title: "درباره اینکه", genre: "درام", year: 1993, rating: 8.8, duration: 118, description: "مردی که در روز گراندهاگ گیر می‌افتد", director: "هارولد رامیس" },
  { title: "بازگشت به آینده", genre: "علمی-تخیلی", year: 1985, rating: 8.5, duration: 116, description: "سفر در زمان با ماشین زمان", director: "رابرت زمکیس" },
  { title: "تایتانیک", genre: "عاشقانه", year: 1997, rating: 7.8, duration: 194, description: "داستان عاشقانه در کشتی تایتانیک", director: "جیمز کامرون" },
  { title: "ماتریکس", genre: "اکشن", year: 1999, rating: 8.7, duration: 136, description: "واقعیت مجازی و دنیای کامپیوتری", director: "خواهران واچوفسکی" },
  { title: "شب یلدا", genre: "درام", year: 2019, rating: 7.5, duration: 105, description: "فیلم ایرانی درباره مجری تلویزیون", director: "مسعود بخشی" },
  { title: "جدایی نادر از سیمین", genre: "درام", year: 2011, rating: 8.3, duration: 123, description: "فیلم ایرانی برنده اسکار", director: "اصغر فرهادی" },
  { title: "آواتار", genre: "اکشن", year: 2009, rating: 7.8, duration: 162, description: "جنگ در سیاره پاندورا", director: "جیمز کامرون" },
  { title: "ماجراجوهای ایندیانا جونز", genre: "ماجراجویی", year: 1981, rating: 8.4, duration: 115, description: "ماجراجویی باستان‌شناس", director: "استیون اسپیلبرگ" },
  { title: "کلاهبرداری کبیر", genre: "کمدی", year: 1973, rating: 8.3, duration: 129, description: "داستان دو کلاهبردار", director: "جورج روی هیل" },
  { title: "خورشید", genre: "درام", year: 2020, rating: 7.2, duration: 99, description: "فیلم ایرانی درباره کودکان کار", director: "مجید مجیدی" },
  { title: "انگل", genre: "تریلر", year: 2019, rating: 8.6, duration: 132, description: "فیلم کره‌ای برنده اسکار", director: "بونگ جون هو" },
];

type GenreFilter = 'همه' | 'درام' | 'اکشن' | 'کمدی' | 'علمی-تخیلی' | 'عاشقانه' | 'جنایی' | 'ماجراجویی' | 'تریلر';
type DecadeFilter = 'همه' | '1970s' | '1980s' | '1990s' | '2000s' | '2010s' | '2020s';

export const RandomMoviePicker = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [genreFilter, setGenreFilter] = useState<GenreFilter>('همه');
  const [decadeFilter, setDecadeFilter] = useState<DecadeFilter>('همه');
  const [minRating, setMinRating] = useState<string>('0');
  const [isAnimating, setIsAnimating] = useState(false);

  const getFilteredMovies = (): Movie[] => {
    return movies.filter(movie => {
      const genreMatch = genreFilter === 'همه' || movie.genre === genreFilter;
      
      let decadeMatch = true;
      if (decadeFilter !== 'همه') {
        const decade = parseInt(decadeFilter.replace('s', ''));
        decadeMatch = movie.year >= decade && movie.year < decade + 10;
      }
      
      const ratingMatch = movie.rating >= parseFloat(minRating);
      
      return genreMatch && decadeMatch && ratingMatch;
    });
  };

  const pickRandomMovie = () => {
    const filteredMovies = getFilteredMovies();
    
    if (filteredMovies.length === 0) {
      toast.error('هیچ فیلمی با این فیلترها پیدا نشد');
      return;
    }

    setIsAnimating(true);
    
    // Animation effect
    let animationCount = 0;
    const animationInterval = setInterval(() => {
      const randomMovie = filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
      setSelectedMovie(randomMovie);
      animationCount++;
      
      if (animationCount >= 10) {
        clearInterval(animationInterval);
        setIsAnimating(false);
        toast.success('فیلم انتخاب شد!');
      }
    }, 100);
  };

  const resetFilters = () => {
    setGenreFilter('همه');
    setDecadeFilter('همه');
    setMinRating('0');
    setSelectedMovie(null);
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  const filteredMovies = getFilteredMovies();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Film className="h-5 w-5" />
            انتخاب فیلم تصادفی
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ژانر</label>
              <Select value={genreFilter} onValueChange={(value: GenreFilter) => setGenreFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="همه">همه ژانرها</SelectItem>
                  <SelectItem value="درام">درام</SelectItem>
                  <SelectItem value="اکشن">اکشن</SelectItem>
                  <SelectItem value="کمدی">کمدی</SelectItem>
                  <SelectItem value="علمی-تخیلی">علمی-تخیلی</SelectItem>
                  <SelectItem value="عاشقانه">عاشقانه</SelectItem>
                  <SelectItem value="جنایی">جنایی</SelectItem>
                  <SelectItem value="ماجراجویی">ماجراجویی</SelectItem>
                  <SelectItem value="تریلر">تریلر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">دهه</label>
              <Select value={decadeFilter} onValueChange={(value: DecadeFilter) => setDecadeFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="همه">همه دهه‌ها</SelectItem>
                  <SelectItem value="2020s">2020-2029</SelectItem>
                  <SelectItem value="2010s">2010-2019</SelectItem>
                  <SelectItem value="2000s">2000-2009</SelectItem>
                  <SelectItem value="1990s">1990-1999</SelectItem>
                  <SelectItem value="1980s">1980-1989</SelectItem>
                  <SelectItem value="1970s">1970-1979</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">حداقل امتیاز</label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">همه امتیازها</SelectItem>
                  <SelectItem value="7">7+ ⭐</SelectItem>
                  <SelectItem value="8">8+ ⭐⭐</SelectItem>
                  <SelectItem value="9">9+ ⭐⭐⭐</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={pickRandomMovie} 
              className="flex-1"
              disabled={isAnimating || filteredMovies.length === 0}
            >
              <Shuffle className="h-4 w-4 mr-2" />
              {isAnimating ? 'در حال انتخاب...' : 'انتخاب فیلم تصادفی'}
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              ریست فیلترها
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredMovies.length} فیلم با فیلترهای انتخابی پیدا شد
          </div>
        </CardContent>
      </Card>

      {selectedMovie && (
        <Card className={`transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Film className="h-5 w-5" />
                فیلم پیشنهادی شما
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-bold">{selectedMovie.rating}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{selectedMovie.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{selectedMovie.genre}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {selectedMovie.year}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(selectedMovie.duration)}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground mb-2">{selectedMovie.description}</p>
              <p className="text-sm">
                <strong>کارگردان:</strong> {selectedMovie.director}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>امتیاز IMDb:</span>
                <span className="font-bold text-lg">{selectedMovie.rating}/10</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">مدت زمان</div>
                <div className="font-semibold">{formatDuration(selectedMovie.duration)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>راهنمای استفاده</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p>• <strong>فیلتر ژانر:</strong> فیلم‌ها را بر اساس ژانر محدود کنید</p>
            <p>• <strong>فیلتر دهه:</strong> فیلم‌ها را بر اساس دهه ساخت انتخاب کنید</p>
            <p>• <strong>حداقل امتیاز:</strong> فقط فیلم‌های با امتیاز بالا را ببینید</p>
            <p>• <strong>انتخاب تصادفی:</strong> یک فیلم تصادفی از لیست فیلتر شده انتخاب می‌کند</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};