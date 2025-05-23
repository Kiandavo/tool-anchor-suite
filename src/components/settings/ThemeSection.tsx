
import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { useDarkMode } from '@/hooks/useDarkMode';

export const ThemeSection = () => {
  const { theme, setTheme } = useDarkMode();
  const { toast } = useToast();

  const handleThemeChange = (value: string) => {
    setTheme(value as 'dark' | 'light' | 'system');
    toast({
      title: "تم تغییر کرد",
      description: value === 'dark' ? 'تم تاریک فعال شد' : value === 'light' ? 'تم روشن فعال شد' : 'تم براساس سیستم تنظیم شد',
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">تنظیمات تم</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">حالت نمایش برنامه را انتخاب کنید</p>
      </div>
      
      <RadioGroup value={theme} onValueChange={handleThemeChange} className="grid grid-cols-3 gap-4">
        <div>
          <RadioGroupItem value="light" id="light" className="sr-only peer" />
          <Label
            htmlFor="light"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Sun className="mb-3 h-6 w-6" />
            <span>روشن</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem value="dark" id="dark" className="sr-only peer" />
          <Label
            htmlFor="dark"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Moon className="mb-3 h-6 w-6" />
            <span>تاریک</span>
          </Label>
        </div>
        
        <div>
          <RadioGroupItem value="system" id="system" className="sr-only peer" />
          <Label
            htmlFor="system"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Monitor className="mb-3 h-6 w-6" />
            <span>سیستم</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ThemeSection;
