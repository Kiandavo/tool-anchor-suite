import React, { useState } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Square, Copy, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Shadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const defaultShadow: Shadow = {
  x: 0,
  y: 4,
  blur: 15,
  spread: 0,
  color: '#000000',
  opacity: 25,
  inset: false,
};

const presets = [
  { name: 'نرم', shadows: [{ ...defaultShadow, y: 4, blur: 15, opacity: 15 }] },
  { name: 'متوسط', shadows: [{ ...defaultShadow, y: 8, blur: 25, opacity: 20 }] },
  { name: 'عمیق', shadows: [{ ...defaultShadow, y: 20, blur: 40, opacity: 30 }] },
  { name: 'چندلایه', shadows: [
    { ...defaultShadow, y: 2, blur: 4, opacity: 10 },
    { ...defaultShadow, y: 8, blur: 16, opacity: 15 },
    { ...defaultShadow, y: 16, blur: 32, opacity: 20 },
  ]},
  { name: 'درخشان', shadows: [{ ...defaultShadow, blur: 20, spread: 5, color: '#667eea', opacity: 50 }] },
  { name: 'داخلی', shadows: [{ ...defaultShadow, y: 2, blur: 8, opacity: 20, inset: true }] },
];

const BoxShadowGenerator: React.FC = () => {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...defaultShadow }]);
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#f1f5f9');
  const [borderRadius, setBorderRadius] = useState(12);

  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  const generateCSS = () => {
    return shadows
      .map(s => {
        const inset = s.inset ? 'inset ' : '';
        const rgba = hexToRgba(s.color, s.opacity);
        return `${inset}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${rgba}`;
      })
      .join(', ');
  };

  const addShadow = () => {
    if (shadows.length >= 5) {
      toast({ title: 'حداکثر ۵ سایه مجاز است', variant: 'destructive' });
      return;
    }
    setShadows([...shadows, { ...defaultShadow }]);
  };

  const removeShadow = (index: number) => {
    if (shadows.length <= 1) {
      toast({ title: 'حداقل ۱ سایه لازم است', variant: 'destructive' });
      return;
    }
    setShadows(shadows.filter((_, i) => i !== index));
  };

  const updateShadow = (index: number, field: keyof Shadow, value: number | string | boolean) => {
    const newShadows = [...shadows];
    newShadows[index] = { ...newShadows[index], [field]: value };
    setShadows(newShadows);
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setShadows(preset.shadows.map(s => ({ ...s })));
  };

  const copyCSS = () => {
    navigator.clipboard.writeText(`box-shadow: ${generateCSS()};`);
    toast({ title: 'کد CSS کپی شد!' });
  };

  const reset = () => {
    setShadows([{ ...defaultShadow }]);
    setBoxColor('#ffffff');
    setBgColor('#f1f5f9');
    setBorderRadius(12);
  };

  const cssCode = generateCSS();

  return (
    <div className="space-y-6">
      <CalculatorCard title="سازنده سایه" icon={Square} onReset={reset}>
        {/* Shadow Layers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>لایه‌های سایه ({shadows.length})</Label>
            <Button variant="outline" size="sm" onClick={addShadow}>
              <Plus className="h-4 w-4 ml-1" />
              افزودن لایه
            </Button>
          </div>

          {shadows.map((shadow, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-muted/30 rounded-lg space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">لایه {index + 1}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={shadow.inset}
                      onCheckedChange={(v) => updateShadow(index, 'inset', v)}
                    />
                    <Label className="text-xs">داخلی</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeShadow(index)}
                    className="text-destructive hover:text-destructive h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">X: {shadow.x}px</Label>
                  <Slider
                    value={[shadow.x]}
                    onValueChange={([v]) => updateShadow(index, 'x', v)}
                    min={-50}
                    max={50}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Y: {shadow.y}px</Label>
                  <Slider
                    value={[shadow.y]}
                    onValueChange={([v]) => updateShadow(index, 'y', v)}
                    min={-50}
                    max={50}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">محو: {shadow.blur}px</Label>
                  <Slider
                    value={[shadow.blur]}
                    onValueChange={([v]) => updateShadow(index, 'blur', v)}
                    min={0}
                    max={100}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">گسترش: {shadow.spread}px</Label>
                  <Slider
                    value={[shadow.spread]}
                    onValueChange={([v]) => updateShadow(index, 'spread', v)}
                    min={-20}
                    max={50}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="color"
                    value={shadow.color}
                    onChange={(e) => updateShadow(index, 'color', e.target.value)}
                    className="w-10 h-8 p-1 cursor-pointer"
                  />
                  <Label className="text-xs">رنگ</Label>
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">شفافیت: {shadow.opacity}%</Label>
                  <Slider
                    value={[shadow.opacity]}
                    onValueChange={([v]) => updateShadow(index, 'opacity', v)}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
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

        {/* Box Settings */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">رنگ جعبه</Label>
            <Input
              type="color"
              value={boxColor}
              onChange={(e) => setBoxColor(e.target.value)}
              className="w-full h-10 p-1 cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">رنگ پس‌زمینه</Label>
            <Input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 p-1 cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">گوشه: {borderRadius}px</Label>
            <Slider
              value={[borderRadius]}
              onValueChange={([v]) => setBorderRadius(v)}
              min={0}
              max={50}
            />
          </div>
        </div>
      </CalculatorCard>

      {/* Preview */}
      <VisualizationCard title="پیش‌نمایش">
        <div
          className="h-64 rounded-xl flex items-center justify-center transition-colors"
          style={{ backgroundColor: bgColor }}
        >
          <motion.div
            layout
            className="w-32 h-32 transition-all"
            style={{
              backgroundColor: boxColor,
              borderRadius: `${borderRadius}px`,
              boxShadow: cssCode,
            }}
          />
        </div>

        <div className="mt-4 space-y-2">
          <Label>کد CSS</Label>
          <div className="relative">
            <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono overflow-x-auto" dir="ltr">
              box-shadow: {cssCode};
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

export default BoxShadowGenerator;
