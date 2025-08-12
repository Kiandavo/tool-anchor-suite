import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const PhotoDimensionsFinder: React.FC = () => {
  const [dimensions, setDimensions] = useState<{w:number; h:number} | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setDimensions({ w: img.width, h: img.height });
      if (imgRef.current) imgRef.current.src = url;
    };
    img.src = url;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>یافتن ابعاد عکس</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept="image/*" onChange={onFile} />
        <div className="flex justify-center">
          <img ref={imgRef} alt="preview" className="max-h-64 rounded-lg border" />
        </div>
        {dimensions && (
          <div className="text-center text-sm">
            عرض: <b>{dimensions.w}</b> px — ارتفاع: <b>{dimensions.h}</b> px
          </div>
        )}
      </CardContent>
    </Card>
  );
};
