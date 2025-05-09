
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { tools, Tool } from '@/data/tools';
import { Badge } from "@/components/ui/badge";
import { Heart, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const PersonalizationSection = () => {
  // Font size preference (default: 16)
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('fontSize');
    return saved ? parseInt(saved) : 16;
  });
  
  // Favorite tools
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>(() => {
    const saved = localStorage.getItem('favoriteTools');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Show recently used tools
  const [showRecent, setShowRecent] = useState<boolean>(() => {
    const saved = localStorage.getItem('showRecent');
    return saved ? JSON.parse(saved) : true;
  });
  
  const { toast } = useToast();

  // Apply font size when it changes
  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);
  
  // Save favorites when changed
  useEffect(() => {
    localStorage.setItem('favoriteTools', JSON.stringify(favoriteTools));
  }, [favoriteTools]);
  
  // Save recent tools preference
  useEffect(() => {
    localStorage.setItem('showRecent', JSON.stringify(showRecent));
  }, [showRecent]);

  const addFavorite = (tool: Tool) => {
    if (favoriteTools.length >= 5) {
      toast({
        title: "محدودیت ابزارهای مورد علاقه",
        description: "شما حداکثر می‌توانید 5 ابزار به لیست مورد علاقه‌ها اضافه کنید.",
        variant: "destructive"
      });
      return;
    }
    
    if (!favoriteTools.find(t => t.id === tool.id)) {
      setFavoriteTools([...favoriteTools, tool]);
      toast({
        title: "ابزار به علاقه‌مندی‌ها اضافه شد",
        description: `${tool.name} به لیست ابزارهای مورد علاقه شما اضافه شد.`
      });
    }
  };

  const removeFavorite = (toolId: string) => {
    setFavoriteTools(favoriteTools.filter(t => t.id !== toolId));
    toast({
      title: "ابزار از علاقه‌مندی‌ها حذف شد"
    });
  };

  return (
    <div className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">شخصی‌سازی</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">تنظیمات نمایش و علاقه‌مندی‌های خود را مدیریت کنید</p>
      </div>
      
      {/* Font Size Preference */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="font-size">اندازه متن</Label>
          <span className="text-sm text-muted-foreground">{fontSize}px</span>
        </div>
        <Slider 
          id="font-size"
          min={12} 
          max={24} 
          step={1}
          value={[fontSize]} 
          onValueChange={(values) => setFontSize(values[0])} 
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>کوچک</span>
          <span>متوسط</span>
          <span>بزرگ</span>
        </div>
      </div>
      
      {/* Recent Tools Setting */}
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="recent-tools">نمایش ابزارهای اخیر</Label>
          <p className="text-sm text-muted-foreground">آخرین ابزارهای استفاده شده در صفحه اصلی نمایش داده شود</p>
        </div>
        <Switch 
          id="recent-tools" 
          checked={showRecent} 
          onCheckedChange={setShowRecent} 
        />
      </div>
      
      {/* Favorite Tools */}
      <div className="space-y-2">
        <h4 className="font-medium">ابزارهای مورد علاقه</h4>
        
        {favoriteTools.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {favoriteTools.map((tool) => (
              <Badge key={tool.id} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                {tool.name}
                <button 
                  onClick={() => removeFavorite(tool.id)}
                  className="ml-1 rounded-full hover:bg-muted p-0.5"
                  aria-label="حذف از علاقه‌مندی‌ها"
                >
                  <X size={14} />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">هیچ ابزار مورد علاقه‌ای انتخاب نشده است.</p>
        )}
        
        <div className="mt-2">
          <Button variant="outline" className="text-xs">
            <Heart size={14} className="ml-1" />
            مدیریت علاقه‌مندی‌ها
          </Button>
        </div>
      </div>
      
      <Button variant="default" className="w-full">ذخیره تنظیمات</Button>
    </div>
  );
};

export default PersonalizationSection;
