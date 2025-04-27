
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Download } from 'lucide-react';

export function SvgToPng() {
  const [svgInput, setSvgInput] = useState<string>('');
  const [svgFile, setSvgFile] = useState<File | null>(null);
  const [scale, setScale] = useState<number>(2); // پیش‌فرض: ۲ برابر
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/svg+xml') {
        setSvgFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setSvgInput(event.target.result as string);
          }
        };
        reader.readAsText(file);
      } else {
        toast.error('لطفاً فقط فایل SVG انتخاب کنید');
      }
    }
  };

  const handlePasteInput = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim().startsWith('<svg') || text.trim().toLowerCase().includes('xmlns="http://www.w3.org/2000/svg"')) {
        setSvgInput(text);
        toast.success('SVG با موفقیت وارد شد');
      } else {
        toast.error('متن وارد شده یک SVG معتبر نیست');
      }
    } catch (err) {
      toast.error('خطا در خواندن از کلیپ‌بورد');
    }
  };

  const handleConvertToPng = () => {
    if (!svgInput) {
      toast.warning('لطفاً ابتدا یک SVG وارد کنید');
      return;
    }

    setIsProcessing(true);

    try {
      // ایجاد یک المان SVG موقت
      const blob = new Blob([svgInput], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          // تنظیم اندازه canvas براساس اندازه SVG و مقیاس
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          // پاک کردن canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // کشیدن تصویر SVG روی canvas با مقیاس
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // تبدیل canvas به DataURL
          const pngUrl = canvas.toDataURL('image/png');
          setPngDataUrl(pngUrl);
          setIsProcessing(false);
          toast.success('تبدیل SVG به PNG با موفقیت انجام شد');
        } catch (error) {
          console.error('Error during conversion:', error);
          toast.error('خطا در تبدیل تصویر');
          setIsProcessing(false);
        }
      };
      
      img.onerror = () => {
        toast.error('SVG وارد شده معتبر نیست');
        URL.revokeObjectURL(url);
        setIsProcessing(false);
      };
      
      img.src = url;
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error('خطا در تبدیل تصویر');
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pngDataUrl) return;
    
    // ایجاد یک لینک برای دانلود
    const link = document.createElement('a');
    link.href = pngDataUrl;
    link.download = `svg-to-png-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('دانلود تصویر PNG آغاز شد');
  };
  
  return (
    <Card className="border rounded-lg">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="flex gap-2"
              variant="outline"
            >
              انتخاب فایل SVG
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              onClick={handlePasteInput}
              variant="outline"
            >
              چسباندن از کلیپ‌بورد
            </Button>
          </div>
        </div>

        {svgInput && (
          <div className="border border-dashed rounded-lg p-4 text-center">
            <div className="overflow-auto max-h-40 bg-muted p-2 rounded mb-2">
              <code className="text-xs whitespace-pre-wrap text-right">{svgInput.length > 300 ? `${svgInput.substring(0, 300)}...` : svgInput}</code>
            </div>
            <div className="text-sm text-gray-500">
              {svgFile?.name && <p className="mt-1">فایل: {svgFile.name}</p>}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="scale">مقیاس PNG (کیفیت خروجی)</Label>
          <div className="flex items-center gap-4">
            <Slider
              id="scale"
              value={[scale]}
              min={1}
              max={10}
              step={0.5}
              onValueChange={(value) => setScale(value[0])}
              className="flex-1"
            />
            <span className="text-sm bg-muted px-2 py-1 rounded w-12 text-center">
              {scale}x
            </span>
          </div>
        </div>

        <Button
          onClick={handleConvertToPng}
          className="w-full"
          disabled={!svgInput || isProcessing}
        >
          {isProcessing ? 'در حال تبدیل...' : 'تبدیل SVG به PNG'}
        </Button>

        {/* Canvas برای تبدیل تصویر (پنهان) */}
        <canvas ref={canvasRef} className="hidden" />

        {pngDataUrl && (
          <div className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">نتیجه تبدیل:</h3>
            <div className="flex justify-center bg-gray-100 rounded-lg p-4">
              <img
                src={pngDataUrl}
                alt="تصویر PNG تبدیل‌شده"
                className="max-w-full object-contain max-h-96"
              />
            </div>
            <Button
              onClick={handleDownload}
              className="flex gap-2 w-full"
              variant="default"
            >
              <Download size={18} />
              دانلود تصویر PNG
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
