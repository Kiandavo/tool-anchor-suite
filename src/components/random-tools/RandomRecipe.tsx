
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Recipe } from 'lucide-react';
import { suggestRandomRecipe, copyToClipboard } from '@/utils/randomUtils';
import { toast } from 'sonner';

export function RandomRecipe() {
  const [recipe, setRecipe] = useState<string>('');

  const handleGenerateRecipe = () => {
    const newRecipe = suggestRandomRecipe();
    setRecipe(newRecipe);
    toast.success("دستور پخت تصادفی پیشنهاد شد");
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <Button onClick={handleGenerateRecipe} className="flex items-center gap-2 w-full">
          <Recipe size={18} />
          پیشنهاد دستور پخت تصادفی
        </Button>
        {recipe && (
          <div 
            className="p-4 bg-muted rounded-lg cursor-pointer text-center"
            onClick={() => copyToClipboard(recipe)}
          >
            {recipe}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
