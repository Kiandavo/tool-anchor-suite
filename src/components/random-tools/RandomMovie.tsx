
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Film, Star, Clock, Calendar, Users, Copy } from 'lucide-react';
import { getRandomMovie } from '@/data/movies';
import { copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';
import type { Movie } from '@/data/movies';

export function RandomMovie() {
  const [movie, setMovie] = useState<Movie | null>(null);

  const handleGenerateMovie = () => {
    const newMovie = getRandomMovie();
    setMovie(newMovie);
    toast.success("فیلم تصادفی پیشنهاد شد");
  };

  const handleCopyMovie = (text: string) => {
    copyToClipboard(text);
    toast.success("کپی شد");
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    
    const remainingStars = 10 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateMovie} size="lg" className="w-full icon-text">
          <Film size={20} />
          پیشنهاد فیلم تصادفی
        </Button>
        
        {movie && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex-shrink-0">
                <img 
                  src={movie.poster} 
                  alt={`${movie.persianTitle} poster`}
                  className="w-32 h-48 object-cover rounded-lg shadow-md mx-auto md:mx-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <h3 
                    className="text-lg font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleCopyMovie(movie.persianTitle)}
                  >
                    {movie.persianTitle}
                    <Copy className="inline w-4 h-4 ml-2 opacity-60" />
                  </h3>
                  <p 
                    className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleCopyMovie(movie.englishTitle)}
                  >
                    {movie.englishTitle}
                    <Copy className="inline w-3 h-3 ml-1 opacity-60" />
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {movie.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {movie.duration} دقیقه
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(movie.imdbRating)}
                    </div>
                    <span className="font-semibold text-foreground">{movie.imdbRating}/10</span>
                    <span className="text-xs text-muted-foreground">
                      ({movie.imdbReviews.toLocaleString()} نظر)
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>کارگردان:</strong> {movie.director}
                  </p>
                  <p className="text-sm">
                    <strong>ژانر:</strong> {movie.genre.join(', ')}
                  </p>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <p className="text-sm">
                      <strong>بازیگران:</strong> {movie.cast.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-sm leading-relaxed">{movie.plot}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
