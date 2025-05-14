
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PaintBucket } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

type ShapeType = 'circle' | 'square' | 'triangle' | 'none';

const SimpleLogoMaker: React.FC = () => {
  const [text, setText] = useState<string>('لوگو');
  const [fontSize, setFontSize] = useState<number>(40);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState<string>('#3b82f6');
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  const [fontFamily, setFontFamily] = useState<string>('IRANSans');
  const [textBold, setTextBold] = useState<boolean>(true);
  const [logoSize, setLogoSize] = useState<number>(200);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png');

  const availableFonts = [
    { name: 'ایران سنس', value: 'IRANSans' },
    { name: 'یکان', value: 'Yekan' },
    { name: 'وزیر', value: 'Vazir' },
    { name: 'سحر', value: 'Sahel' },
    { name: 'پرشین', value: 'IranNastaliq' },
  ];

  const handleDownload = () => {
    const svg = document.getElementById('logo-svg');
    if (!svg) return;

    try {
      // For SVG download
      if (downloadFormat === 'svg') {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `${text}-logo.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      } 
      // For PNG download
      else {
        const canvas = document.createElement('canvas');
        canvas.width = logoSize;
        canvas.height = logoSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, logoSize, logoSize);

        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          ctx.drawImage(img, 0, 0, logoSize, logoSize);
          URL.revokeObjectURL(url);
          
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `${text}-logo.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        };

        img.src = url;
      }

      toast({
        title: "دانلود شد!",
        description: `لوگو با فرمت ${downloadFormat === 'png' ? 'PNG' : 'SVG'} دانلود شد.`,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "خطا در دانلود",
        description: "مشکلی در دانلود لوگو رخ داد. لطفاً مجدداً تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <PaintBucket className="h-5 w-5" />
          ساخت لوگو ساده
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo-text">متن لوگو</Label>
              <Input 
                id="logo-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={15}
                placeholder="متن لوگو را وارد کنید"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="text-color">رنگ متن</Label>
                <div className="flex">
                  <Input 
                    id="text-color"
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 p-1 h-10"
                  />
                  <Input 
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 ms-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color">رنگ پس‌زمینه</Label>
                <div className="flex">
                  <Input 
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-10 p-1 h-10"
                  />
                  <Input 
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1 ms-2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">اندازه فونت: {fontSize}px</Label>
              <Slider
                id="font-size"
                min={10}
                max={100}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-size">اندازه لوگو: {logoSize}px</Label>
              <Slider
                id="logo-size"
                min={100}
                max={500}
                step={10}
                value={[logoSize]}
                onValueChange={(value) => setLogoSize(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-family">فونت</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger id="font-family">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>ضخامت متن</Label>
              <RadioGroup 
                value={textBold ? "bold" : "normal"} 
                onValueChange={(value) => setTextBold(value === "bold")}
                className="flex space-x-4 space-x-reverse"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="bold" id="bold" />
                  <Label htmlFor="bold">ضخیم</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">معمولی</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>شکل لوگو</Label>
              <RadioGroup 
                value={shapeType} 
                onValueChange={(value) => setShapeType(value as ShapeType)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="circle" id="circle" />
                  <Label htmlFor="circle">دایره</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="square" id="square" />
                  <Label htmlFor="square">مربع</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="triangle" id="triangle" />
                  <Label htmlFor="triangle">مثلث</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">بدون شکل</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>فرمت دانلود</Label>
              <RadioGroup 
                value={downloadFormat} 
                onValueChange={(value) => setDownloadFormat(value as 'png' | 'svg')}
                className="flex space-x-4 space-x-reverse"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="png" id="png" />
                  <Label htmlFor="png">PNG</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="svg" id="svg" />
                  <Label htmlFor="svg">SVG</Label>
                </div>
              </RadioGroup>
            </div>

            <Button onClick={handleDownload} className="w-full">
              دانلود لوگو
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div 
              className="border rounded-md p-4 flex items-center justify-center bg-white"
              style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
            >
              <svg 
                id="logo-svg" 
                width={logoSize} 
                height={logoSize} 
                viewBox={`0 0 ${logoSize} ${logoSize}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                {shapeType === 'circle' && (
                  <circle 
                    cx={logoSize/2} 
                    cy={logoSize/2} 
                    r={logoSize*0.45} 
                    fill={backgroundColor} 
                  />
                )}
                {shapeType === 'square' && (
                  <rect 
                    x={logoSize*0.1} 
                    y={logoSize*0.1} 
                    width={logoSize*0.8} 
                    height={logoSize*0.8} 
                    fill={backgroundColor} 
                  />
                )}
                {shapeType === 'triangle' && (
                  <polygon 
                    points={`${logoSize/2},${logoSize*0.1} ${logoSize*0.1},${logoSize*0.9} ${logoSize*0.9},${logoSize*0.9}`} 
                    fill={backgroundColor} 
                  />
                )}
                <text 
                  x="50%" 
                  y="50%" 
                  dominantBaseline="middle" 
                  textAnchor="middle"
                  fill={textColor}
                  fontFamily={fontFamily}
                  fontSize={fontSize}
                  fontWeight={textBold ? "bold" : "normal"}
                  style={{ direction: 'rtl' }}
                >
                  {text || 'لوگو'}
                </text>
              </svg>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              پیش‌نمایش لوگو
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleLogoMaker;
