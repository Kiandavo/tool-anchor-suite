import React, { useState, useEffect } from 'react';
import { Palette, RefreshCw, Copy, Download, Lock, Unlock, Shuffle, Check, PaintBucket, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Color harmony types
type HarmonyType = 'analogous' | 'monochromatic' | 'triadic' | 'complementary' | 'split-complementary' | 'tetradic';

// Types for color
interface Color {
  hex: string;
  locked: boolean;
}

// Helper functions for color manipulations
const hexToHSL = (hex: string): {h: number, s: number, l: number} => {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find min and max RGB values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    // Achromatic (gray)
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    // Calculate hue
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    } else if (max === g) {
      h = ((b - r) / d + 2) * 60;
    } else if (max === b) {
      h = ((r - g) / d + 4) * 60;
    }
  }

  return { h, s, l };
};

const hslToHex = (h: number, s: number, l: number): string => {
  // Make sure h is between 0 and 360
  h = h % 360;
  if (h < 0) h += 360;
  
  // Convert to decimal
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h >= 60 && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h >= 120 && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h >= 180 && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h >= 240 && h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  const toHex = (val: number): string => {
    const hex = Math.round((val + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Generate random color in hex format
const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate harmony colors from a base color
const generateHarmonyColors = (baseColor: string, harmony: HarmonyType, count: number = 5): string[] => {
  const { h, s, l } = hexToHSL(baseColor);
  const colors: string[] = [baseColor];

  switch (harmony) {
    case 'monochromatic':
      // Monochromatic - vary the lightness and saturation
      for (let i = 1; i < count; i++) {
        const newL = Math.min(0.9, Math.max(0.1, l + (i * 0.15) % 0.8 - 0.4));
        const newS = Math.min(1, Math.max(0.2, s + (i * 0.1) % 0.6 - 0.3));
        colors.push(hslToHex(h, newS, newL));
      }
      break;
      
    case 'analogous':
      // Analogous - colors that are next to each other on the color wheel
      const angleStep = 30;
      for (let i = 1; i < count; i++) {
        const newH = (h + (i * angleStep - count * angleStep / 2)) % 360;
        colors.push(hslToHex(newH, s, l));
      }
      break;
      
    case 'complementary':
      // Complementary - colors that are opposite on the color wheel
      colors.push(hslToHex((h + 180) % 360, s, l));
      
      // Add shades of both colors
      for (let i = 2; i < count; i++) {
        if (i % 2 === 0) {
          const newL = Math.min(0.9, Math.max(0.1, l + (i * 0.1) - 0.3));
          colors.push(hslToHex(h, s, newL));
        } else {
          const newL = Math.min(0.9, Math.max(0.1, l + ((i-1) * 0.1) - 0.3));
          colors.push(hslToHex((h + 180) % 360, s, newL));
        }
      }
      break;
      
    case 'triadic':
      // Triadic - three colors equally spaced on the color wheel
      colors.push(hslToHex((h + 120) % 360, s, l));
      colors.push(hslToHex((h + 240) % 360, s, l));
      
      // Add shades of all three colors
      if (count > 3) {
        colors.push(hslToHex(h, s, Math.max(0.1, l - 0.2)));
        colors.push(hslToHex((h + 120) % 360, s, Math.max(0.1, l - 0.2)));
      }
      break;
      
    case 'split-complementary':
      // Split complementary - base color + two colors adjacent to its complement
      colors.push(hslToHex((h + 150) % 360, s, l));
      colors.push(hslToHex((h + 210) % 360, s, l));
      
      // Add variations
      if (count > 3) {
        colors.push(hslToHex(h, s, Math.max(0.1, l - 0.2)));
        colors.push(hslToHex((h + 180) % 360, s, Math.max(0.1, l - 0.2)));
      }
      break;
      
    case 'tetradic':
      // Tetradic - four colors arranged into two complementary pairs
      colors.push(hslToHex((h + 90) % 360, s, l));
      colors.push(hslToHex((h + 180) % 360, s, l));
      colors.push(hslToHex((h + 270) % 360, s, l));
      
      // Add a shade
      if (count > 4) {
        colors.push(hslToHex(h, s, Math.max(0.1, l - 0.2)));
      }
      break;
      
    default:
      // Default to random colors
      for (let i = 1; i < count; i++) {
        colors.push(generateRandomColor());
      }
  }

  return colors;
};

// Determine if text should be light or dark based on background color
const getContrastColor = (hexColor: string): string => {
  // Remove the # if present
  hexColor = hexColor.replace('#', '');

  // Parse the hex values
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors and white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export default function ColorPalette() {
  const { toast } = useToast();
  const [baseColor, setBaseColor] = useState('#6366f1');
  const [harmony, setHarmony] = useState<HarmonyType>('analogous');
  const [colorCount, setColorCount] = useState(5);
  const [colors, setColors] = useState<Color[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Generate new palette when base color or harmony changes
  useEffect(() => {
    generatePalette();
  }, [harmony, colorCount, baseColor]);

  // Reset copy indicator after 2 seconds
  useEffect(() => {
    if (copiedIndex !== null) {
      const timer = setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedIndex]);

  // Generate the color palette
  const generatePalette = () => {
    const harmonyColors = generateHarmonyColors(baseColor, harmony, colorCount);
    
    // Keep locked colors, update unlocked ones
    const newColors = colors.length > 0 
      ? harmonyColors.map((color, index) => {
          // If color exists and is locked, keep it
          if (index < colors.length && colors[index].locked) {
            return colors[index];
          }
          // Otherwise, use new generated color
          return { hex: color, locked: false };
        })
      : harmonyColors.map(color => ({ hex: color, locked: false }));
    
    // Ensure we have exactly the number of colors needed
    while (newColors.length < colorCount) {
      newColors.push({ hex: generateRandomColor(), locked: false });
    }
    
    setColors(newColors.slice(0, colorCount));
  };

  // Generate completely random palette
  const generateRandomPalette = () => {
    const newColors = Array.from({ length: colorCount }, () => ({
      hex: generateRandomColor(),
      locked: false
    }));
    
    // Keep locked colors
    colors.forEach((color, index) => {
      if (color.locked && index < newColors.length) {
        newColors[index] = color;
      }
    });
    
    setColors(newColors);
  };

  // Toggle the lock state of a color
  const toggleLock = (index: number) => {
    const newColors = [...colors];
    newColors[index] = {
      ...newColors[index],
      locked: !newColors[index].locked
    };
    setColors(newColors);
  };

  // Update a specific color directly
  const updateColor = (index: number, hex: string) => {
    const newColors = [...colors];
    newColors[index] = {
      ...newColors[index],
      hex
    };
    setColors(newColors);
  };

  // Copy color to clipboard
  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    toast({
      title: "کپی شد!",
      description: `رنگ ${hex} در کلیپ‌بورد کپی شد.`,
      duration: 2000
    });
  };

  // Export palette
  const exportPalette = () => {
    // Format data
    const colorData = colors.map(color => color.hex).join('\n');
    
    // Create download link
    const element = document.createElement('a');
    const file = new Blob([colorData], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `color-palette-${new Date().toISOString().slice(0,10)}.txt`;
    
    // Simulate click and clean up
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Export palette as PNG
  const exportPalettePNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      toast({
        title: "خطا",
        description: "مرورگر شما از این قابلیت پشتیبانی نمی‌کند.",
        variant: "destructive"
      });
      return;
    }
    
    // Set canvas size
    const width = 800;
    const height = 200;
    canvas.width = width;
    canvas.height = height;
    
    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Draw each color stripe
    const stripeWidth = width / colors.length;
    colors.forEach((color, index) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(index * stripeWidth, 0, stripeWidth, height);
      
      // Add hex code text
      ctx.fillStyle = getContrastColor(color.hex);
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(color.hex.toUpperCase(), (index + 0.5) * stripeWidth, height / 2);
    });
    
    // Convert to PNG and download
    const element = document.createElement('a');
    canvas.toBlob((blob) => {
      if (!blob) return;
      element.href = URL.createObjectURL(blob);
      element.download = `color-palette-${new Date().toISOString().slice(0,10)}.png`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-b from-purple-50 to-white">
          <div className="flex items-center gap-3">
            <PaintBucket className="w-6 h-6 text-purple-600" />
            <CardTitle>تولیدکننده پالت رنگ</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs defaultValue="palette">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="palette">پالت رنگ</TabsTrigger>
              <TabsTrigger value="settings">تنظیمات</TabsTrigger>
              <TabsTrigger value="export">خروجی</TabsTrigger>
            </TabsList>
            
            <TabsContent value="palette" className="space-y-6">
              <div className="flex justify-between gap-2">
                <Button
                  variant="outline"
                  onClick={generatePalette}
                  className="flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  تولید مجدد
                </Button>
                
                <Button
                  variant="outline"
                  onClick={generateRandomPalette}
                  className="flex items-center gap-2"
                >
                  <Shuffle size={16} />
                  تصادفی
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
                  >
                    <div 
                      className="h-32 relative"
                      style={{ backgroundColor: color.hex }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleLock(index)}
                              className="absolute top-2 right-2 h-8 w-8 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                            >
                              {color.locked ? (
                                <Lock size={16} className="text-white" />
                              ) : (
                                <Unlock size={16} className="text-white" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {color.locked ? 'باز کردن قفل' : 'قفل کردن رنگ'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="p-3 flex items-center justify-between">
                      <Input
                        type="text"
                        value={color.hex}
                        onChange={(e) => updateColor(index, e.target.value)}
                        className="h-8 text-sm px-2 font-mono"
                      />
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(color.hex, index)}
                        className="h-8 w-8 ml-1"
                      >
                        {copiedIndex === index ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="base-color">رنگ پایه</Label>
                  <div className="flex gap-2">
                    <Input
                      id="base-color"
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setBaseColor(generateRandomColor())}
                      className="flex items-center gap-2"
                    >
                      <Sparkles size={16} />
                      تصادفی
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="harmony">نوع هماهنگی رنگی</Label>
                  <Select
                    value={harmony}
                    onValueChange={(value) => setHarmony(value as HarmonyType)}
                  >
                    <SelectTrigger id="harmony">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analogous">هماهنگ (Analogous)</SelectItem>
                      <SelectItem value="monochromatic">تک‌رنگی (Monochromatic)</SelectItem>
                      <SelectItem value="triadic">سه‌گانه (Triadic)</SelectItem>
                      <SelectItem value="complementary">مکمل (Complementary)</SelectItem>
                      <SelectItem value="split-complementary">مکمل تقسیم شده (Split Complementary)</SelectItem>
                      <SelectItem value="tetradic">چهارگانه (Tetradic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="color-count">تعداد رنگ: {colorCount}</Label>
                  </div>
                  <Slider
                    id="color-count"
                    min={3}
                    max={10}
                    step={1}
                    value={[colorCount]}
                    onValueChange={(value) => setColorCount(value[0])}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="export" className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">نمایش پالت</h3>
                <div className="h-16 flex rounded-md overflow-hidden">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-full"
                      style={{ backgroundColor: color.hex }}
                    >
                    </div>
                  ))}
                </div>
                
                <h3 className="font-medium mt-4">کدهای رنگ</h3>
                <div className="bg-gray-50 p-4 rounded-md font-mono text-sm">
                  {colors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse mb-2">
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <div>{color.hex}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={exportPalette}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    خروجی TXT
                  </Button>
                  <Button
                    variant="outline"
                    onClick={exportPalettePNG}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    خروجی PNG
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      const cssCode = colors.map((color, i) => `--color-${i+1}: ${color.hex};`).join('\n');
                      navigator.clipboard.writeText(`:root {\n${cssCode}\n}`);
                      toast({
                        title: "کپی شد!",
                        description: "کدهای CSS در کلیپ‌بورد کپی شد.",
                        duration: 2000
                      });
                    }}
                    className="flex items-center gap-2"
                  >
                    <Copy size={16} />
                    کپی CSS Variables
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="bg-gray-50 text-xs text-gray-500 py-3">
          <p>استفاده از این ابزار برای طراحی‌های گرافیکی، وب سایت‌ها، و پروژه‌های هنری مناسب است.</p>
        </CardFooter>
      </Card>
    </div>
  );
}
