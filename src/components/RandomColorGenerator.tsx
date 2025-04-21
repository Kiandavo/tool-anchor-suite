
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Swatch } from "lucide-react";
import { toast } from "sonner";
import { generateRandomColor, copyToClipboard, isLightColor, ColorValue, ColorFormat } from '@/utils/colorUtils';

interface ColorCardProps {
  color: string;
  format: string;
  onClick: () => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ color, format, onClick }) => {
  const isTextDark = isLightColor(color.startsWith('#') ? color : '#ffffff');
  
  return (
    <div 
      className="flex items-center justify-between p-4 rounded-md cursor-pointer transition-all hover:shadow-md"
      style={{ 
        backgroundColor: color.startsWith('#') ? color : '#ffffff',
        color: isTextDark ? '#000000' : '#ffffff'
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Swatch size={18} />
        <span className="font-mono">{format}</span>
      </div>
      <span className="font-mono text-sm">{color}</span>
    </div>
  );
};

const RandomColorGenerator: React.FC = () => {
  const [colors, setColors] = useState<ColorValue[]>([]);
  const [activeTab, setActiveTab] = useState<ColorFormat>('hex');
  
  const generateNewColor = () => {
    const newColor = generateRandomColor();
    setColors(prev => [newColor, ...prev].slice(0, 20)); // Keep last 20 colors
  };
  
  const handleCopyColor = (color: string) => {
    copyToClipboard(color).then(success => {
      if (success) {
        toast.success(`کپی شد: ${color}`);
      } else {
        toast.error("کپی ناموفق بود");
      }
    });
  };
  
  // Generate first color on component mount
  useEffect(() => {
    generateNewColor();
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <Button 
          onClick={generateNewColor} 
          size="lg" 
          className="mb-6 animate-pulse"
        >
          تولید رنگ جدید
        </Button>
        
        {colors.length > 0 && (
          <Card className="w-full mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div 
                  className="h-32 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: colors[0].hex }}
                >
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: isLightColor(colors[0].hex) ? '#000' : '#fff' }}
                  >
                    رنگ تصادفی
                  </span>
                </div>
                
                <Tabs defaultValue="hex" value={activeTab} onValueChange={(v) => setActiveTab(v as ColorFormat)}>
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="hex">HEX</TabsTrigger>
                    <TabsTrigger value="rgb">RGB</TabsTrigger>
                    <TabsTrigger value="hsl">HSL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="hex">
                    <ColorCard 
                      color={colors[0].hex} 
                      format="HEX" 
                      onClick={() => handleCopyColor(colors[0].hex)} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="rgb">
                    <ColorCard 
                      color={colors[0].rgb} 
                      format="RGB" 
                      onClick={() => handleCopyColor(colors[0].rgb)} 
                    />
                  </TabsContent>
                  
                  <TabsContent value="hsl">
                    <ColorCard 
                      color={colors[0].hsl} 
                      format="HSL" 
                      onClick={() => handleCopyColor(colors[0].hsl)} 
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {colors.length > 1 && (
        <div>
          <h3 className="text-lg font-medium mb-3">تاریخچه رنگ ها</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {colors.slice(1).map((color, index) => (
              <div 
                key={index}
                className="h-12 rounded-md cursor-pointer flex items-center justify-center transition-all hover:scale-105"
                style={{ 
                  backgroundColor: color.hex,
                  color: isLightColor(color.hex) ? '#000' : '#fff'
                }}
                onClick={() => handleCopyColor(color[activeTab])}
              >
                <span className="font-mono text-sm">{color[activeTab]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomColorGenerator;
