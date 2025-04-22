
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Film } from 'lucide-react';
import { suggestRandomMovie, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomMovie() {
  const [movie, setMovie] = useState<string>('');

  const handleGenerateMovie = () => {
    const newMovie = suggestRandomMovie();
    setMovie(newMovie);
    toast.success("فیلم تصادفی پیشنهاد شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateMovie} className="flex items-center gap-2 w-full">
          <Film size={18} />
          پیشنهاد فیلم تصادفی
        </Button>
        {movie && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(movie)}
          >
            {movie}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
