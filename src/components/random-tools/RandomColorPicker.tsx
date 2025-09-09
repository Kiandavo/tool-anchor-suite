import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Palette, Shuffle } from "lucide-react";

interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
}

export const RandomColorPicker: React.FC = () => {
  const [count, setCount] = useState<string>('1');
  const [format, setFormat] = useState<'hex' | 'rgb' | 'hsl'>('hex');
  const [colors, setColors] = useState<ColorData[]>([]);

  const generateRandomColor = (): ColorData => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    
    // Convert RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;
    const sum = max + min;
    
    const l = sum / 2;
    let s, h;
    
    if (diff === 0) {
      s = h = 0;
    } else {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;
      
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / diff + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / diff + 2; break;
        case bNorm: h = (rNorm - gNorm) / diff + 4; break;
        default: h = 0;
      }
      h /= 6;
    }
    
    const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    return { hex, rgb, hsl };
  };

  const generateColors = () => {
    const colorCount = parseInt(count);
    if (isNaN(colorCount) || colorCount <= 0 || colorCount > 100) {
      toast.error('لطفاً تعدادی بین 1 تا 100 وارد کنید');
      return;
    }

    const newColors: ColorData[] = [];
    for (let i = 0; i < colorCount; i++) {
      newColors.push(generateRandomColor());
    }

    setColors(newColors);
    toast.success(`${colorCount} رنگ تصادفی تولید شد`);
  };

  const copyColor = (color: ColorData) => {
    let textToCopy = '';
    switch (format) {
      case 'hex':
        textToCopy = color.hex;
        break;
      case 'rgb':
        textToCopy = color.rgb;
        break;
      case 'hsl':
        textToCopy = color.hsl;
        break;
    }
    navigator.clipboard.writeText(textToCopy);
    toast.success('رنگ کپی شد');
  };

  const copyAllColors = () => {
    const allColors = colors.map(color => {
      switch (format) {
        case 'hex': return color.hex;
        case 'rgb': return color.rgb;
        case 'hsl': return color.hsl;
      }
    }).join('\n');
    
    navigator.clipboard.writeText(allColors);
    toast.success('همه رنگ‌ها کپی شدند');
  };

  const getColorValue = (color: ColorData): string => {
    switch (format) {
      case 'hex': return color.hex;
      case 'rgb': return color.rgb;
      case 'hsl': return color.hsl;
      default: return color.hex;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          انتخابگر رنگ تصادفی
        </CardTitle>
        <CardDescription>
          رنگ‌های تصادفی در فرمت‌های مختلف تولید کنید
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="count">تعداد رنگ‌ها</Label>
            <Input
              id="count"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="تعداد رنگ‌ها"
              min="1"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label>فرمت نمایش</Label>
            <Select value={format} onValueChange={(value: 'hex' | 'rgb' | 'hsl') => setFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hex">HEX (#ffffff)</SelectItem>
                <SelectItem value="rgb">RGB (255, 255, 255)</SelectItem>
                <SelectItem value="hsl">HSL (360, 100%, 100%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={generateColors} className="w-full">
          <Shuffle className="w-4 h-4 mr-2" />
          تولید رنگ‌ها
        </Button>

        {colors.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>رنگ‌های تولید شده</Label>
              <Button variant="outline" size="sm" onClick={copyAllColors}>
                <Copy className="w-4 h-4 mr-2" />
                کپی همه
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-card"
                >
                  <div
                    className="w-12 h-12 rounded-lg border shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm truncate">
                      {getColorValue(color)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format.toUpperCase()} Format
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyColor(color)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};