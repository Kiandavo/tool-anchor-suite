import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PaintBucket, Download, RotateCcw, Palette, Type, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

type ShapeType = 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'star' | 'none';
type GradientType = 'none' | 'linear' | 'radial';

const SimpleLogoMaker: React.FC = () => {
  const [text, setText] = useState<string>('لوگو');
  const [fontSize, setFontSize] = useState<number>(40);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState<string>('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState<string>('#6366f1');
  const [shapeType, setShapeType] = useState<ShapeType>('circle');
  const [fontFamily, setFontFamily] = useState<string>('Vazirmatn');
  const [textBold, setTextBold] = useState<boolean>(true);
  const [logoSize, setLogoSize] = useState<number>(200);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg'>('png');
  const [gradientType, setGradientType] = useState<GradientType>('none');
  const [hasStroke, setHasStroke] = useState<boolean>(false);
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [rotation, setRotation] = useState<number>(0);
  const [hasShadow, setHasShadow] = useState<boolean>(false);

  const availableFonts = [
    { name: 'وزیرمتن', value: 'Vazirmatn' },
    { name: 'ایران سنس', value: 'IRANSans' },
    { name: 'یکان', value: 'Yekan' },
    { name: 'وزیر', value: 'Vazir' },
    { name: 'سحر', value: 'Sahel' },
    { name: 'پرشین', value: 'IranNastaliq' },
    { name: 'اینتر', value: 'Inter' },
    { name: 'روبوتو', value: 'Roboto' },
  ];

  const presetColors = [
    { name: 'آبی کلاسیک', bg: '#3b82f6', secondary: '#6366f1' },
    { name: 'قرمز مدرن', bg: '#ef4444', secondary: '#f97316' },
    { name: 'سبز طبیعی', bg: '#10b981', secondary: '#059669' },
    { name: 'بنفش شیک', bg: '#8b5cf6', secondary: '#a855f7' },
    { name: 'نارنجی گرم', bg: '#f59e0b', secondary: '#d97706' },
    { name: 'صورتی زیبا', bg: '#ec4899', secondary: '#db2777' },
    { name: 'خاکستری مینیمال', bg: '#6b7280', secondary: '#4b5563' },
    { name: 'فیروزه‌ای', bg: '#06b6d4', secondary: '#0891b2' },
  ];

  const handleDownload = () => {
    const svg = document.getElementById('logo-svg');
    if (!svg) return;

    try {
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
      } else {
        const canvas = document.createElement('canvas');
        canvas.width = logoSize * 2;
        canvas.height = logoSize * 2;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
        title: "دانلود موفق!",
        description: `لوگو با فرمت ${downloadFormat === 'png' ? 'PNG' : 'SVG'} و کیفیت بالا دانلود شد.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "خطا در دانلود",
        description: "مشکلی در دانلود لوگو رخ داد. لطفاً مجدداً تلاش کنید.",
        variant: "destructive",
      });
    }
  };

  const resetToDefaults = () => {
    setText('لوگو');
    setFontSize(40);
    setTextColor('#ffffff');
    setBackgroundColor('#3b82f6');
    setSecondaryColor('#6366f1');
    setShapeType('circle');
    setFontFamily('Vazirmatn');
    setTextBold(true);
    setLogoSize(200);
    setGradientType('none');
    setHasStroke(false);
    setRotation(0);
    setHasShadow(false);
  };

  const applyColorPreset = (preset: typeof presetColors[0]) => {
    setBackgroundColor(preset.bg);
    setSecondaryColor(preset.secondary);
  };

  const getShapePath = () => {
    const center = logoSize / 2;
    const size = logoSize * 0.4;
    
    switch (shapeType) {
      case 'diamond':
        return `M${center},${center - size} L${center + size},${center} L${center},${center + size} L${center - size},${center} Z`;
      case 'hexagon':
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = center + size * Math.cos(angle);
          const y = center + size * Math.sin(angle);
          hexPoints.push(`${x},${y}`);
        }
        return `M${hexPoints.join(' L')} Z`;
      case 'star':
        const starPoints = [];
        for (let i = 0; i < 10; i++) {
          const angle = (Math.PI / 5) * i;
          const radius = i % 2 === 0 ? size : size * 0.5;
          const x = center + radius * Math.cos(angle - Math.PI / 2);
          const y = center + radius * Math.sin(angle - Math.PI / 2);
          starPoints.push(`${x},${y}`);
        }
        return `M${starPoints.join(' L')} Z`;
      default:
        return '';
    }
  };

  const getFillColor = () => {
    if (gradientType === 'linear') {
      return `url(#linearGradient)`;
    } else if (gradientType === 'radial') {
      return `url(#radialGradient)`;
    }
    return backgroundColor;
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <CardTitle className="flex items-center justify-center gap-3 text-xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <PaintBucket className="h-6 w-6 text-primary" />
          </div>
          ساخت لوگو حرفه‌ای
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            پیشرفته
          </Badge>
        </CardTitle>
        <p className="text-center text-muted-foreground text-sm mt-2">
          لوگوی زیبا و حرفه‌ای با ابزارهای پیشرفته طراحی کنید
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  پایه‌ای
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  طراحی
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  پیشرفته
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="logo-text">متن لوگو</Label>
                  <Input 
                    id="logo-text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={20}
                    placeholder="متن لوگو را وارد کنید"
                    className="text-lg font-medium"
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
                          <span style={{ fontFamily: font.value }}>{font.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-size">اندازه فونت: {fontSize}px</Label>
                    <Slider
                      id="font-size"
                      min={10}
                      max={120}
                      step={2}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo-size">اندازه لوگو: {logoSize}px</Label>
                    <Slider
                      id="logo-size"
                      min={100}
                      max={600}
                      step={20}
                      value={[logoSize]}
                      onValueChange={(value) => setLogoSize(value[0])}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label htmlFor="text-bold" className="font-medium">ضخامت متن</Label>
                  <Switch 
                    id="text-bold"
                    checked={textBold}
                    onCheckedChange={setTextBold}
                  />
                </div>
              </TabsContent>

              <TabsContent value="design" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <Label>پیش‌تنظیمات رنگی</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presetColors.map((preset, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => applyColorPreset(preset)}
                        className="h-auto p-2 flex flex-col items-center gap-1"
                      >
                        <div className="flex gap-1">
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: preset.bg }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: preset.secondary }}
                          />
                        </div>
                        <span className="text-xs">{preset.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-color">رنگ متن</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input 
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bg-color">رنگ پس‌زمینه</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input 
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>شکل لوگو</Label>
                  <RadioGroup 
                    value={shapeType} 
                    onValueChange={(value) => setShapeType(value as ShapeType)}
                    className="grid grid-cols-3 gap-4"
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
                      <RadioGroupItem value="diamond" id="diamond" />
                      <Label htmlFor="diamond">الماس</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="star" id="star" />
                      <Label htmlFor="star">ستاره</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">بدون شکل</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>نوع گرادیانت</Label>
                  <RadioGroup 
                    value={gradientType} 
                    onValueChange={(value) => setGradientType(value as GradientType)}
                    className="flex space-x-4 space-x-reverse"
                  >
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="none" id="gradient-none" />
                      <Label htmlFor="gradient-none">بدون گرادیانت</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="linear" id="gradient-linear" />
                      <Label htmlFor="gradient-linear">خطی</Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RadioGroupItem value="radial" id="gradient-radial" />
                      <Label htmlFor="gradient-radial">شعاعی</Label>
                    </div>
                  </RadioGroup>
                </div>

                {gradientType !== 'none' && (
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">رنگ دوم گرادیانت</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input 
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label htmlFor="has-stroke" className="font-medium">حاشیه متن</Label>
                  <Switch 
                    id="has-stroke"
                    checked={hasStroke}
                    onCheckedChange={setHasStroke}
                  />
                </div>

                {hasStroke && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stroke-color">رنگ حاشیه</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="color"
                          value={strokeColor}
                          onChange={(e) => setStrokeColor(e.target.value)}
                          className="w-12 h-10 p-1 border rounded"
                        />
                        <Input 
                          value={strokeColor}
                          onChange={(e) => setStrokeColor(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stroke-width">ضخامت حاشیه: {strokeWidth}px</Label>
                      <Slider
                        id="stroke-width"
                        min={1}
                        max={10}
                        step={1}
                        value={[strokeWidth]}
                        onValueChange={(value) => setStrokeWidth(value[0])}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="rotation">چرخش: {rotation}°</Label>
                  <Slider
                    id="rotation"
                    min={0}
                    max={360}
                    step={5}
                    value={[rotation]}
                    onValueChange={(value) => setRotation(value[0])}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                دانلود {downloadFormat.toUpperCase()}
              </Button>
              <Button variant="outline" onClick={resetToDefaults}>
                <RotateCcw className="h-4 w-4 mr-2" />
                بازنشانی
              </Button>
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
                  <Label htmlFor="png">PNG (کیفیت بالا)</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="svg" id="svg" />
                  <Label htmlFor="svg">SVG (بردار)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center bg-white shadow-inner"
              style={{ width: `${Math.min(logoSize, 300)}px`, height: `${Math.min(logoSize, 300)}px` }}
            >
              <svg 
                id="logo-svg" 
                width={logoSize} 
                height={logoSize} 
                viewBox={`0 0 ${logoSize} ${logoSize}`}
                xmlns="http://www.w3.org/2000/svg"
                style={{ 
                  width: '100%', 
                  height: '100%',
                  transform: `rotate(${rotation}deg)`
                }}
              >
                <defs>
                  <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={backgroundColor} />
                    <stop offset="100%" stopColor={secondaryColor} />
                  </linearGradient>
                  <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={backgroundColor} />
                    <stop offset="100%" stopColor={secondaryColor} />
                  </radialGradient>
                  {hasShadow && (
                    <filter id="shadow">
                      <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                    </filter>
                  )}
                </defs>

                {shapeType === 'circle' && (
                  <circle 
                    cx={logoSize/2} 
                    cy={logoSize/2} 
                    r={logoSize*0.45} 
                    fill={getFillColor()}
                    filter={hasShadow ? "url(#shadow)" : undefined}
                  />
                )}
                
                {shapeType === 'square' && (
                  <rect 
                    x={logoSize*0.1} 
                    y={logoSize*0.1} 
                    width={logoSize*0.8} 
                    height={logoSize*0.8} 
                    fill={getFillColor()}
                    filter={hasShadow ? "url(#shadow)" : undefined}
                  />
                )}
                
                {shapeType === 'triangle' && (
                  <polygon 
                    points={`${logoSize/2},${logoSize*0.1} ${logoSize*0.1},${logoSize*0.9} ${logoSize*0.9},${logoSize*0.9}`} 
                    fill={getFillColor()}
                    filter={hasShadow ? "url(#shadow)" : undefined}
                  />
                )}

                {(shapeType === 'diamond' || shapeType === 'hexagon' || shapeType === 'star') && (
                  <path 
                    d={getShapePath()} 
                    fill={getFillColor()}
                    filter={hasShadow ? "url(#shadow)" : undefined}
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
                  stroke={hasStroke ? strokeColor : "none"}
                  strokeWidth={hasStroke ? strokeWidth : 0}
                  style={{ direction: 'rtl' }}
                  filter={hasShadow ? "url(#shadow)" : undefined}
                >
                  {text || 'لوگو'}
                </text>
              </svg>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">پیش‌نمایش لوگو</p>
              <Badge variant="outline" className="text-xs">
                {logoSize} × {logoSize} پیکسل
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleLogoMaker;