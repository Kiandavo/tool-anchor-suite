import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Type, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const scaleRatios = [
  { name: 'Minor Second', value: 1.067, persian: 'دوم کوچک' },
  { name: 'Major Second', value: 1.125, persian: 'دوم بزرگ' },
  { name: 'Minor Third', value: 1.2, persian: 'سوم کوچک' },
  { name: 'Major Third', value: 1.25, persian: 'سوم بزرگ' },
  { name: 'Perfect Fourth', value: 1.333, persian: 'چهارم کامل' },
  { name: 'Augmented Fourth', value: 1.414, persian: 'چهارم افزوده' },
  { name: 'Perfect Fifth', value: 1.5, persian: 'پنجم کامل' },
  { name: 'Golden Ratio', value: 1.618, persian: 'نسبت طلایی' },
];

const scaleNames = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
const scalePersianNames = ['خیلی کوچک', 'کوچک', 'پایه', 'بزرگ', 'خیلی بزرگ', '۲XL', '۳XL', '۴XL', '۵XL'];

const TypographyScale: React.FC = () => {
  const [baseSize, setBaseSize] = useState(16);
  const [ratio, setRatio] = useState(1.25);
  const [unit, setUnit] = useState<'px' | 'rem'>('px');

  const generateScale = () => {
    const baseIndex = 2; // 'base' is at index 2
    return scaleNames.map((name, index) => {
      const power = index - baseIndex;
      const size = baseSize * Math.pow(ratio, power);
      const displaySize = unit === 'rem' ? size / 16 : size;
      return {
        name,
        persianName: scalePersianNames[index],
        size: Math.round(displaySize * 100) / 100,
        rawSize: size,
      };
    });
  };

  const scale = generateScale();

  const copyCSS = () => {
    const css = scale
      .map(s => `--font-size-${s.name}: ${s.size}${unit};`)
      .join('\n');
    navigator.clipboard.writeText(css);
    toast({ title: 'کد CSS کپی شد!' });
  };

  const copyTailwind = () => {
    const config = scale
      .map(s => `'${s.name}': '${s.size}${unit}'`)
      .join(',\n  ');
    navigator.clipboard.writeText(`fontSize: {\n  ${config}\n}`);
    toast({ title: 'تنظیمات Tailwind کپی شد!' });
  };

  const reset = () => {
    setBaseSize(16);
    setRatio(1.25);
    setUnit('px');
  };

  const currentRatio = scaleRatios.find(r => r.value === ratio);

  return (
    <div className="space-y-6">
      <CalculatorCard title="محاسبه‌گر مقیاس تایپوگرافی" icon={Type} onReset={reset}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>اندازه پایه</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={baseSize}
                onChange={(e) => setBaseSize(Number(e.target.value))}
                min={10}
                max={32}
                className="flex-1"
              />
              <span className="flex items-center text-muted-foreground text-sm">px</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>نسبت مقیاس</Label>
            <Select value={String(ratio)} onValueChange={(v) => setRatio(Number(v))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scaleRatios.map((r) => (
                  <SelectItem key={r.value} value={String(r.value)}>
                    {r.persian} ({r.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>واحد خروجی</Label>
            <Select value={unit} onValueChange={(v) => setUnit(v as 'px' | 'rem')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="px">پیکسل (px)</SelectItem>
                <SelectItem value="rem">رِم (rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {currentRatio && (
          <div className="p-3 bg-primary/5 rounded-lg text-sm">
            <span className="font-medium">{currentRatio.persian}</span>
            <span className="text-muted-foreground mx-2">•</span>
            <span className="text-muted-foreground">{currentRatio.name}</span>
            <span className="text-muted-foreground mx-2">•</span>
            <span>نسبت: {currentRatio.value}</span>
          </div>
        )}
      </CalculatorCard>

      {/* Visual Scale */}
      <VisualizationCard title="پیش‌نمایش مقیاس">
        <div className="space-y-4">
          {scale.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 pb-3 border-b border-border/50 last:border-0"
            >
              <div className="w-16 text-left">
                <span className="text-xs text-muted-foreground font-mono">
                  {item.size}{unit}
                </span>
              </div>
              <div className="w-20 text-right">
                <span className="text-xs font-medium">{item.persianName}</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p
                  style={{ fontSize: `${item.rawSize}px` }}
                  className="truncate leading-tight"
                >
                  نمونه متن فارسی
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </VisualizationCard>

      {/* CSS Output */}
      <VisualizationCard title="کد خروجی">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>CSS Variables</Label>
              <Button variant="ghost" size="sm" onClick={copyCSS}>
                <Copy className="h-4 w-4 ml-1" />
                کپی
              </Button>
            </div>
            <pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-x-auto" dir="ltr">
              {scale.map(s => `--font-size-${s.name}: ${s.size}${unit};`).join('\n')}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Tailwind Config</Label>
              <Button variant="ghost" size="sm" onClick={copyTailwind}>
                <Copy className="h-4 w-4 ml-1" />
                کپی
              </Button>
            </div>
            <pre className="bg-muted/50 rounded-lg p-4 text-xs font-mono overflow-x-auto" dir="ltr">
{`fontSize: {
${scale.map(s => `  '${s.name}': '${s.size}${unit}'`).join(',\n')}
}`}
            </pre>
          </div>
        </div>
      </VisualizationCard>
    </div>
  );
};

export default TypographyScale;
