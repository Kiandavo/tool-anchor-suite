import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const ImageCropper: React.FC = () => {
  const [src, setSrc] = useState<string>('');
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 200, h: 200 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) return;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = crop.w;
    canvas.height = crop.h;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, crop.w, crop.h);
  }, [src, crop]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
  };

  const download = () => {
    const url = canvasRef.current?.toDataURL('image/png');
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crop.png';
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>برش‌دهنده تصویر (ساده)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" accept="image/*" onChange={onFile} />
        {src && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <img ref={imgRef} src={src} alt="source" className="max-w-full rounded border" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <Label>X</Label>
                  <Input type="number" value={crop.x} onChange={(e) => setCrop({ ...crop, x: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>Y</Label>
                  <Input type="number" value={crop.y} onChange={(e) => setCrop({ ...crop, y: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>عرض</Label>
                  <Input type="number" value={crop.w} onChange={(e) => setCrop({ ...crop, w: Number(e.target.value) })} />
                </div>
                <div>
                  <Label>ارتفاع</Label>
                  <Input type="number" value={crop.h} onChange={(e) => setCrop({ ...crop, h: Number(e.target.value) })} />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <canvas ref={canvasRef} className="border rounded" />
              <Button onClick={download} className="w-full">دانلود برش</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
