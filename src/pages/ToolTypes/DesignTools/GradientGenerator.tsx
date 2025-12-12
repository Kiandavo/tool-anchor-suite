import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Paintbrush, Copy, RotateCw, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface ColorStop {
  color: string;
  position: number;
}

const presets = [
  { name: 'غروب آفتاب', stops: [{ color: '#ff7e5f', position: 0 }, { color: '#feb47b', position: 100 }] },
  { name: 'اقیانوس', stops: [{ color: '#2193b0', position: 0 }, { color: '#6dd5ed', position: 100 }] },
  { name: 'جنگل', stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }] },
  { name: 'بنفش رویایی', stops: [{ color: '#8e2de2', position: 0 }, { color: '#4a00e0', position: 100 }] },
  { name: 'آتش', stops: [{ color: '#f12711', position: 0 }, { color: '#f5af19', position: 100 }] },
  { name: 'شب', stops: [{ color: '#0f0c29', position: 0 }, { color: '#302b63', position: 50 }, { color: '#24243e', position: 100 }] },
];

const GradientGenerator: React.FC = () => {
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 },
  ]);

  const generateCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(s => `${s.color} ${s.position}%`)
      .join(', ');

    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${stops})`;
    }
    return `radial-gradient(circle, ${stops})`;
  };

  const addColorStop = () => {
    if (colorStops.length >= 5) {
      toast({ title: 'حداکثر ۵ رنگ مجاز است', variant: 'destructive' });
      return;
    }
    const newPosition = Math.round((colorStops[colorStops.length - 1].position + colorStops[0].position) / 2);
    setColorStops([...colorStops, { color: '#ffffff', position: newPosition }]);
  };

  const removeColorStop = (index: number) => {
    if (colorStops.length <= 2) {
      toast({ title: 'حداقل ۲ رنگ لازم است', variant: 'destructive' });
      return;
    }
    setColorStops(colorStops.filter((_, i) => i !== index));
  };

  const updateColorStop = (index: number, field: 'color' | 'position', value: string | number) => {
    const newStops = [...colorStops];
    newStops[index] = { ...newStops[index], [field]: value };
    setColorStops(newStops);
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setColorStops(preset.stops);
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${generateCSS()};`);
    toast({ title: 'کد CSS کپی شد!' });
  };

  const reset = () => {
    setGradientType('linear');
    setAngle(90);
    setColorStops([
      { color: '#667eea', position: 0 },
      { color: '#764ba2', position: 100 },
    ]);
  };

  const cssCode = generateCSS();

  return (
    <div className="space-y-6">
      <CalculatorCard title="سازنده گرادیانت" icon={Paintbrush} onReset={reset}>
        {/* Gradient Type & Angle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>نوع گرادیانت</Label>
            <Select value={gradientType} onValueChange={(v) => setGradientType(v as 'linear' | 'radial')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">خطی</SelectItem>
                <SelectItem value="radial">شعاعی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {gradientType === 'linear' && (
            <div className="space-y-2">
              <Label>زاویه: {angle}°</Label>
              <Slider
                value={[angle]}
                onValueChange={([v]) => setAngle(v)}
                min={0}
                max={360}
                step={1}
              />
            </div>
          )}
        </div>

        {/* Color Stops */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>رنگ‌ها</Label>
            <Button variant="outline" size="sm" onClick={addColorStop}>
              <Plus className="h-4 w-4 ml-1" />
              افزودن رنگ
            </Button>
          </div>

          {colorStops.map((stop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <Input
                type="color"
                value={stop.color}
                onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                className="w-14 h-10 p-1 cursor-pointer"
              />
              <Input
                value={stop.color}
                onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                className="flex-1 font-mono text-sm"
                dir="ltr"
              />
              <div className="flex items-center gap-2 min-w-[100px]">
                <Slider
                  value={[stop.position]}
                  onValueChange={([v]) => updateColorStop(index, 'position', v)}
                  min={0}
                  max={100}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">{stop.position}%</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeColorStop(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <Label>پیش‌تنظیم‌ها</Label>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="text-xs"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      </CalculatorCard>

      {/* Preview */}
      <VisualizationCard title="پیش‌نمایش">
        <motion.div
          key={cssCode}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className="h-48 rounded-xl border border-border/50"
          style={{ background: cssCode }}
        />

        <div className="mt-4 space-y-2">
          <Label>کد CSS</Label>
          <div className="relative">
            <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono overflow-x-auto" dir="ltr">
              background: {cssCode};
            </pre>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyCSS}
              className="absolute top-2 left-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </VisualizationCard>
    </div>
  );
};

export default GradientGenerator;
