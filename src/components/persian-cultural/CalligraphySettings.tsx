
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { HighOpacitySelect } from '@/components/ui/high-opacity-select';
import { SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Settings } from 'lucide-react';

interface CalligraphySettingsProps {
  settings: {
    paperSize: string;
    lineSpacing: number;
    marginSize: number;
    showGuideLines: boolean;
    practiceMode: string;
    fontStyle: string;
  };
  onSettingsChange: (newSettings: any) => void;
}

export function CalligraphySettings({ settings, onSettingsChange }: CalligraphySettingsProps) {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Card className="neo-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings size={20} />
          تنظیمات تمرین خوشنویسی
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>سایز کاغذ</Label>
          <HighOpacitySelect 
            value={settings.paperSize} 
            onValueChange={(value) => updateSetting('paperSize', value)}
          >
            <SelectItem value="a4">A4 (۲۱ × ۲۹.۷ سانتی‌متر)</SelectItem>
            <SelectItem value="a5">A5 (۱۴.۸ × ۲۱ سانتی‌متر)</SelectItem>
            <SelectItem value="letter">Letter (۲۱.۶ × ۲۷.۹ سانتی‌متر)</SelectItem>
            <SelectItem value="custom">سفارشی</SelectItem>
          </HighOpacitySelect>
        </div>

        <div className="space-y-2">
          <Label>نوع تمرین</Label>
          <HighOpacitySelect 
            value={settings.practiceMode} 
            onValueChange={(value) => updateSetting('practiceMode', value)}
          >
            <SelectItem value="letters">حروف الفبا</SelectItem>
            <SelectItem value="words">کلمات متداول</SelectItem>
            <SelectItem value="sentences">جملات</SelectItem>
            <SelectItem value="poetry">اشعار کلاسیک</SelectItem>
            <SelectItem value="calligraphy">خط نستعلیق</SelectItem>
          </HighOpacitySelect>
        </div>

        <div className="space-y-2">
          <Label>سبک خط</Label>
          <HighOpacitySelect 
            value={settings.fontStyle} 
            onValueChange={(value) => updateSetting('fontStyle', value)}
          >
            <SelectItem value="nastaliq">نستعلیق</SelectItem>
            <SelectItem value="naskh">نسخ</SelectItem>
            <SelectItem value="thuluth">ثلث</SelectItem>
            <SelectItem value="diwani">دیوانی</SelectItem>
            <SelectItem value="kufic">کوفی</SelectItem>
          </HighOpacitySelect>
        </div>

        <div className="space-y-3">
          <Label>فاصله خطوط: {settings.lineSpacing}px</Label>
          <Slider
            value={[settings.lineSpacing]}
            onValueChange={(value) => updateSetting('lineSpacing', value[0])}
            min={20}
            max={80}
            step={5}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <Label>اندازه حاشیه: {settings.marginSize}px</Label>
          <Slider
            value={[settings.marginSize]}
            onValueChange={(value) => updateSetting('marginSize', value[0])}
            min={10}
            max={50}
            step={5}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="guide-lines">نمایش خطوط راهنما</Label>
          <Switch
            id="guide-lines"
            checked={settings.showGuideLines}
            onCheckedChange={(checked) => updateSetting('showGuideLines', checked)}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-700 text-sm">
            تنظیمات شما برای جلسه بعدی ذخیره خواهد شد. برای بهترین نتیجه، از قلم یا مداد مناسب استفاده کنید.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
