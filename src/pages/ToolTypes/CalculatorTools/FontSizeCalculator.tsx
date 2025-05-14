
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Type } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FontSizeCalculation } from "@/utils/calculator/types";
import { toast } from "@/hooks/use-toast";

type ScalingMethod = 'modular' | 'geometric' | 'custom';

const FontSizeCalculator: React.FC = () => {
  const [baseFontSize, setBaseFontSize] = useState<number>(16);
  const [scalingMethod, setScalingMethod] = useState<ScalingMethod>('modular');
  const [scaleFactor, setScaleFactor] = useState<number>(1.25);
  const [fontSizes, setFontSizes] = useState<FontSizeCalculation>({
    baseFontSize: 16,
    scaleFactor: 1.25,
    levels: {
      'xxxs': 0,
      'xxs': 0,
      'xs': 0,
      'sm': 0,
      'base': 0,
      'lg': 0,
      'xl': 0,
      '2xl': 0,
      '3xl': 0,
      '4xl': 0,
      '5xl': 0,
      '6xl': 0,
      '7xl': 0,
      '8xl': 0,
    }
  });
  const [previewText, setPreviewText] = useState<string>('متن نمونه');
  const [previewSize, setPreviewSize] = useState<string>('base');

  const scales = [
    { name: 'مقیاس کوچک (1.125)', value: 1.125 },
    { name: 'مقیاس متوسط (1.2)', value: 1.2 },
    { name: 'مقیاس ماژولار (1.25)', value: 1.25 },
    { name: 'مقیاس بزرگ (1.333)', value: 1.333 },
    { name: 'مقیاس کلاسیک (1.414)', value: 1.414 },
    { name: 'مقیاس طلایی (1.618)', value: 1.618 },
  ];

  useEffect(() => {
    calculateFontSizes();
  }, [baseFontSize, scalingMethod, scaleFactor]);

  const calculateFontSizes = () => {
    const sizes: Record<string, number> = {};
    const base = baseFontSize;
    const scale = scaleFactor;
    
    // Calculate downsized scales (xxxs to sm)
    sizes['base'] = base;
    sizes['sm'] = +(base / Math.pow(scale, 1)).toFixed(2);
    sizes['xs'] = +(base / Math.pow(scale, 2)).toFixed(2);
    sizes['xxs'] = +(base / Math.pow(scale, 3)).toFixed(2);
    sizes['xxxs'] = +(base / Math.pow(scale, 4)).toFixed(2);
    
    // Calculate upsized scales (lg to 8xl)
    sizes['lg'] = +(base * Math.pow(scale, 1)).toFixed(2);
    sizes['xl'] = +(base * Math.pow(scale, 2)).toFixed(2);
    sizes['2xl'] = +(base * Math.pow(scale, 3)).toFixed(2);
    sizes['3xl'] = +(base * Math.pow(scale, 4)).toFixed(2);
    sizes['4xl'] = +(base * Math.pow(scale, 5)).toFixed(2);
    sizes['5xl'] = +(base * Math.pow(scale, 6)).toFixed(2);
    sizes['6xl'] = +(base * Math.pow(scale, 7)).toFixed(2);
    sizes['7xl'] = +(base * Math.pow(scale, 8)).toFixed(2);
    sizes['8xl'] = +(base * Math.pow(scale, 9)).toFixed(2);
    
    setFontSizes({
      baseFontSize: base,
      scaleFactor: scale,
      levels: sizes
    });
  };

  const copyAsTailwind = () => {
    const sizes = fontSizes.levels;
    const tailwindConfig = 
`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'xxxs': ['${sizes['xxxs']}px', { lineHeight: '1' }],
        'xxs': ['${sizes['xxs']}px', { lineHeight: '1' }],
        'xs': ['${sizes['xs']}px', { lineHeight: '1' }],
        'sm': ['${sizes['sm']}px', { lineHeight: '1.25' }],
        'base': ['${sizes['base']}px', { lineHeight: '1.5' }],
        'lg': ['${sizes['lg']}px', { lineHeight: '1.5' }],
        'xl': ['${sizes['xl']}px', { lineHeight: '1.5' }],
        '2xl': ['${sizes['2xl']}px', { lineHeight: '1.25' }],
        '3xl': ['${sizes['3xl']}px', { lineHeight: '1.25' }],
        '4xl': ['${sizes['4xl']}px', { lineHeight: '1.25' }],
        '5xl': ['${sizes['5xl']}px', { lineHeight: '1.1' }],
        '6xl': ['${sizes['6xl']}px', { lineHeight: '1.1' }],
        '7xl': ['${sizes['7xl']}px', { lineHeight: '1' }],
        '8xl': ['${sizes['8xl']}px', { lineHeight: '1' }],
      }
    }
  }
}`;

    navigator.clipboard.writeText(tailwindConfig);
    toast({
      title: "کپی شد!",
      description: "تنظیمات Tailwind برای اندازه‌های فونت در کلیپ‌بورد کپی شد.",
      duration: 2000,
    });
  };

  const copyAsCSS = () => {
    const sizes = fontSizes.levels;
    const cssVariables = 
`:root {
  --font-size-xxxs: ${sizes['xxxs']}px;
  --font-size-xxs: ${sizes['xxs']}px;
  --font-size-xs: ${sizes['xs']}px;
  --font-size-sm: ${sizes['sm']}px;
  --font-size-base: ${sizes['base']}px;
  --font-size-lg: ${sizes['lg']}px;
  --font-size-xl: ${sizes['xl']}px;
  --font-size-2xl: ${sizes['2xl']}px;
  --font-size-3xl: ${sizes['3xl']}px;
  --font-size-4xl: ${sizes['4xl']}px;
  --font-size-5xl: ${sizes['5xl']}px;
  --font-size-6xl: ${sizes['6xl']}px;
  --font-size-7xl: ${sizes['7xl']}px;
  --font-size-8xl: ${sizes['8xl']}px;
}`;

    navigator.clipboard.writeText(cssVariables);
    toast({
      title: "کپی شد!",
      description: "متغیرهای CSS برای اندازه‌های فونت در کلیپ‌بورد کپی شد.",
      duration: 2000,
    });
  };

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <Type className="h-5 w-5" />
          محاسبه‌گر اندازه فونت
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base-font-size">اندازه فونت پایه (px)</Label>
              <Input 
                id="base-font-size"
                type="number" 
                min="8"
                max="24"
                value={baseFontSize}
                onChange={(e) => setBaseFontSize(parseFloat(e.target.value) || 16)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scaling-method">روش مقیاس‌بندی</Label>
              <RadioGroup 
                value={scalingMethod} 
                onValueChange={(value) => setScalingMethod(value as ScalingMethod)}
                className="flex space-x-4 space-x-reverse"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="modular" id="modular" />
                  <Label htmlFor="modular">ماژولار</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="geometric" id="geometric" />
                  <Label htmlFor="geometric">هندسی</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">سفارشی</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scale-factor">ضریب مقیاس</Label>
              {scalingMethod === 'custom' ? (
                <Input 
                  id="scale-factor"
                  type="number" 
                  min="1.05"
                  max="2"
                  step="0.001"
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(parseFloat(e.target.value) || 1.25)}
                />
              ) : (
                <Select 
                  value={String(scaleFactor)} 
                  onValueChange={(value) => setScaleFactor(parseFloat(value))}
                >
                  <SelectTrigger id="scale-factor">
                    <SelectValue placeholder="انتخاب مقیاس" />
                  </SelectTrigger>
                  <SelectContent>
                    {scales.map((scale) => (
                      <SelectItem key={scale.value} value={String(scale.value)}>
                        {scale.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            
            <div className="flex space-x-2 space-x-reverse pt-4">
              <Button onClick={copyAsTailwind} variant="outline">
                کپی برای Tailwind
              </Button>
              <Button onClick={copyAsCSS} variant="outline">
                کپی برای CSS
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>نتایج مقیاس فونت</Label>
              <div className="border rounded-md p-4 bg-gray-50 h-60 overflow-y-auto">
                {Object.entries(fontSizes.levels).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="flex justify-between items-center py-1 border-b last:border-0"
                  >
                    <span>{key}</span>
                    <span>{value}px</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="preview-text">متن پیش‌نمایش</Label>
                <Select 
                  value={previewSize} 
                  onValueChange={setPreviewSize}
                  className="w-28"
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(fontSizes.levels).map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input 
                id="preview-text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
              />
              <div 
                className="border rounded-md p-4 bg-white min-h-20 flex items-center justify-center"
                style={{ fontSize: `${fontSizes.levels[previewSize]}px` }}
              >
                {previewText || 'متن نمونه'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FontSizeCalculator;
