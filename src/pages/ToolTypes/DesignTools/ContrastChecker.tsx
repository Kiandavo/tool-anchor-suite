import React, { useState, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Eye, Check, X, ArrowLeftRight, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const presetPairs = [
  { fg: '#000000', bg: '#ffffff', name: 'سیاه روی سفید' },
  { fg: '#ffffff', bg: '#1a1a1a', name: 'سفید روی تیره' },
  { fg: '#1e40af', bg: '#dbeafe', name: 'آبی روی آبی روشن' },
  { fg: '#166534', bg: '#dcfce7', name: 'سبز روی سبز روشن' },
  { fg: '#9333ea', bg: '#faf5ff', name: 'بنفش روی بنفش روشن' },
  { fg: '#ea580c', bg: '#fff7ed', name: 'نارنجی روی نارنجی روشن' },
];

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (fg: string, bg: string) => {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const fgLum = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
};

const ContrastChecker: React.FC = () => {
  const [foreground, setForeground] = useState('#1a1a1a');
  const [background, setBackground] = useState('#ffffff');

  const contrast = useMemo(() => {
    return getContrastRatio(foreground, background);
  }, [foreground, background]);

  const wcagResults = useMemo(() => {
    return {
      aaLarge: contrast >= 3,
      aaSmall: contrast >= 4.5,
      aaaLarge: contrast >= 4.5,
      aaaSmall: contrast >= 7,
    };
  }, [contrast]);

  const swapColors = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  };

  const applyPreset = (preset: typeof presetPairs[0]) => {
    setForeground(preset.fg);
    setBackground(preset.bg);
  };

  const copyColors = () => {
    navigator.clipboard.writeText(`color: ${foreground};\nbackground-color: ${background};`);
    toast({ title: 'رنگ‌ها کپی شدند!' });
  };

  const reset = () => {
    setForeground('#1a1a1a');
    setBackground('#ffffff');
  };

  const getContrastLabel = () => {
    if (contrast >= 7) return { text: 'عالی', color: 'text-green-600' };
    if (contrast >= 4.5) return { text: 'خوب', color: 'text-emerald-600' };
    if (contrast >= 3) return { text: 'قابل قبول', color: 'text-yellow-600' };
    return { text: 'ناکافی', color: 'text-red-600' };
  };

  const contrastLabel = getContrastLabel();

  return (
    <div className="space-y-6">
      <CalculatorCard title="بررسی کنتراست رنگ (WCAG)" icon={Eye} onReset={reset}>
        {/* Color Inputs */}
        <div className="flex items-end gap-4">
          <div className="flex-1 space-y-2">
            <Label>رنگ متن (پیش‌زمینه)</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-14 h-10 p-1 cursor-pointer"
              />
              <Input
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="flex-1 font-mono text-sm"
                dir="ltr"
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={swapColors}
            className="mb-0.5"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <div className="flex-1 space-y-2">
            <Label>رنگ پس‌زمینه</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-14 h-10 p-1 cursor-pointer"
              />
              <Input
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex-1 font-mono text-sm"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <Label>ترکیب‌های پیشنهادی</Label>
          <div className="flex flex-wrap gap-2">
            {presetPairs.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="text-xs gap-2"
              >
                <span
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: preset.fg }}
                />
                <span
                  className="w-3 h-3 rounded-full border"
                  style={{ backgroundColor: preset.bg }}
                />
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      </CalculatorCard>

      {/* Contrast Score */}
      <VisualizationCard title="نتیجه کنتراست">
        <div className="text-center py-6">
          <motion.div
            key={contrast.toFixed(2)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-2"
          >
            <div className="text-6xl font-bold tabular-nums">
              {contrast.toFixed(2)}
            </div>
            <div className={`text-lg font-medium ${contrastLabel.color}`}>
              {contrastLabel.text}
            </div>
          </motion.div>
        </div>

        {/* WCAG Levels */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">سطح AA</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <span className="text-sm">متن بزرگ (≥3:1)</span>
                {wcagResults.aaLarge ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <span className="text-sm">متن معمولی (≥4.5:1)</span>
                {wcagResults.aaSmall ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">سطح AAA</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <span className="text-sm">متن بزرگ (≥4.5:1)</span>
                {wcagResults.aaaLarge ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <span className="text-sm">متن معمولی (≥7:1)</span>
                {wcagResults.aaaSmall ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-red-600" />
                )}
              </div>
            </div>
          </div>
        </div>
      </VisualizationCard>

      {/* Preview */}
      <VisualizationCard title="پیش‌نمایش">
        <div className="space-y-4">
          <motion.div
            layout
            className="p-6 rounded-xl text-center space-y-3"
            style={{ backgroundColor: background, color: foreground }}
          >
            <h3 className="text-2xl font-bold">نمونه عنوان بزرگ</h3>
            <p className="text-base">
              این یک متن نمونه است که برای بررسی خوانایی استفاده می‌شود.
              لطفاً مطمئن شوید که کنتراست کافی بین متن و پس‌زمینه وجود دارد.
            </p>
            <p className="text-sm">متن کوچک‌تر برای بررسی دقیق‌تر</p>
          </motion.div>

          <Button variant="outline" onClick={copyColors} className="w-full gap-2">
            <Copy className="h-4 w-4" />
            کپی کد CSS
          </Button>
        </div>
      </VisualizationCard>
    </div>
  );
};

export default ContrastChecker;
