import React, { useState, useMemo } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shapes, Square, Circle, Triangle, Hexagon, Copy, Check } from "lucide-react";
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { toast } from 'sonner';

type ShapeType = 'square' | 'rectangle' | 'circle' | 'triangle' | 'trapezoid' | 'parallelogram';

interface ShapeConfig {
  name: string;
  formula: string;
  fields: { key: string; label: string }[];
  calculate: (dims: Record<string, number>) => number;
  calculatePerimeter: (dims: Record<string, number>) => number;
  color: string;
}

const shapes: Record<ShapeType, ShapeConfig> = {
  square: {
    name: 'مربع',
    formula: 'S = a²',
    fields: [{ key: 'side', label: 'ضلع' }],
    calculate: (d) => Math.pow(d.side || 0, 2),
    calculatePerimeter: (d) => 4 * (d.side || 0),
    color: 'from-blue-500 to-cyan-500'
  },
  rectangle: {
    name: 'مستطیل',
    formula: 'S = a × b',
    fields: [{ key: 'length', label: 'طول' }, { key: 'width', label: 'عرض' }],
    calculate: (d) => (d.length || 0) * (d.width || 0),
    calculatePerimeter: (d) => 2 * ((d.length || 0) + (d.width || 0)),
    color: 'from-purple-500 to-pink-500'
  },
  circle: {
    name: 'دایره',
    formula: 'S = πr²',
    fields: [{ key: 'radius', label: 'شعاع' }],
    calculate: (d) => Math.PI * Math.pow(d.radius || 0, 2),
    calculatePerimeter: (d) => 2 * Math.PI * (d.radius || 0),
    color: 'from-amber-500 to-orange-500'
  },
  triangle: {
    name: 'مثلث',
    formula: 'S = ½ × b × h',
    fields: [{ key: 'base', label: 'قاعده' }, { key: 'height', label: 'ارتفاع' }],
    calculate: (d) => 0.5 * (d.base || 0) * (d.height || 0),
    calculatePerimeter: (d) => 3 * (d.base || 0), // Approximation for equilateral
    color: 'from-green-500 to-emerald-500'
  },
  trapezoid: {
    name: 'ذوزنقه',
    formula: 'S = ½ × (a + b) × h',
    fields: [{ key: 'base1', label: 'قاعده بزرگ' }, { key: 'base2', label: 'قاعده کوچک' }, { key: 'height', label: 'ارتفاع' }],
    calculate: (d) => 0.5 * ((d.base1 || 0) + (d.base2 || 0)) * (d.height || 0),
    calculatePerimeter: (d) => (d.base1 || 0) + (d.base2 || 0) + 2 * Math.sqrt(Math.pow((d.base1 - d.base2) / 2, 2) + Math.pow(d.height || 0, 2)),
    color: 'from-red-500 to-rose-500'
  },
  parallelogram: {
    name: 'متوازی‌الاضلاع',
    formula: 'S = b × h',
    fields: [{ key: 'base', label: 'قاعده' }, { key: 'height', label: 'ارتفاع' }, { key: 'side', label: 'ضلع مایل' }],
    calculate: (d) => (d.base || 0) * (d.height || 0),
    calculatePerimeter: (d) => 2 * ((d.base || 0) + (d.side || 0)),
    color: 'from-indigo-500 to-violet-500'
  }
};

const units = [
  { value: 'mm', label: 'میلی‌متر', factor: 1 },
  { value: 'cm', label: 'سانتی‌متر', factor: 100 },
  { value: 'm', label: 'متر', factor: 1000000 },
  { value: 'km', label: 'کیلومتر', factor: 1000000000000 },
  { value: 'in', label: 'اینچ', factor: 645.16 },
  { value: 'ft', label: 'فوت', factor: 92903.04 }
];

export default function AreaCalculator() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>('square');
  const [dimensions, setDimensions] = useState<Record<string, string>>({});
  const [unit, setUnit] = useState('cm');
  const [copied, setCopied] = useState(false);

  const shape = shapes[selectedShape];

  const result = useMemo(() => {
    const numDims: Record<string, number> = {};
    let valid = true;

    for (const field of shape.fields) {
      const value = parseFloat(dimensions[field.key] || '');
      if (isNaN(value) || value <= 0) {
        valid = false;
        break;
      }
      numDims[field.key] = value;
    }

    if (!valid) return null;

    const area = shape.calculate(numDims);
    const perimeter = shape.calculatePerimeter(numDims);

    return { area, perimeter, dimensions: numDims };
  }, [dimensions, shape]);

  const handleReset = () => {
    setDimensions({});
    toast.success('فرم پاک شد');
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `مساحت ${shape.name}: ${result.area.toFixed(4)} ${unit}²\nمحیط: ${result.perimeter.toFixed(4)} ${unit}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('کپی شد');
  };

  const getUnitLabel = () => {
    return units.find(u => u.value === unit)?.label || unit;
  };

  // Shape preview SVG
  const renderShapePreview = () => {
    const size = 120;
    const center = size / 2;
    
    switch (selectedShape) {
      case 'square':
        return <rect x={center - 40} y={center - 40} width={80} height={80} className="fill-current" />;
      case 'rectangle':
        return <rect x={center - 50} y={center - 30} width={100} height={60} className="fill-current" />;
      case 'circle':
        return <circle cx={center} cy={center} r={40} className="fill-current" />;
      case 'triangle':
        return <polygon points={`${center},${center - 40} ${center - 45},${center + 35} ${center + 45},${center + 35}`} className="fill-current" />;
      case 'trapezoid':
        return <polygon points={`${center - 30},${center - 30} ${center + 30},${center - 30} ${center + 50},${center + 30} ${center - 50},${center + 30}`} className="fill-current" />;
      case 'parallelogram':
        return <polygon points={`${center - 35},${center - 25} ${center + 50},${center - 25} ${center + 35},${center + 25} ${center - 50},${center + 25}`} className="fill-current" />;
      default:
        return null;
    }
  };

  return (
    <CalculatorCard
      title="محاسبه مساحت"
      icon={Shapes}
      onReset={handleReset}
    >
      <div className="space-y-6">
        {/* Shape Selection */}
        <div className="space-y-3">
          <Label>انتخاب شکل</Label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {(Object.keys(shapes) as ShapeType[]).map((key) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedShape(key);
                  setDimensions({});
                }}
                className={`p-3 rounded-xl border-2 transition-all ${
                  selectedShape === key
                    ? `border-primary bg-gradient-to-br ${shapes[key].color} text-white`
                    : 'border-border hover:border-primary/50 bg-card'
                }`}
              >
                <svg viewBox="0 0 120 120" className="w-8 h-8 mx-auto mb-1 opacity-80">
                  {key === 'square' && <rect x={30} y={30} width={60} height={60} className="fill-current" />}
                  {key === 'rectangle' && <rect x={20} y={35} width={80} height={50} className="fill-current" />}
                  {key === 'circle' && <circle cx={60} cy={60} r={35} className="fill-current" />}
                  {key === 'triangle' && <polygon points="60,25 25,95 95,95" className="fill-current" />}
                  {key === 'trapezoid' && <polygon points="35,35 85,35 100,85 20,85" className="fill-current" />}
                  {key === 'parallelogram' && <polygon points="30,35 100,35 90,85 20,85" className="fill-current" />}
                </svg>
                <span className="text-xs font-medium">{shapes[key].name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Formula Display */}
        <motion.div
          key={selectedShape}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl bg-gradient-to-r ${shape.color} text-white text-center`}
        >
          <p className="text-sm opacity-80 mb-1">فرمول {shape.name}</p>
          <p className="text-2xl font-mono font-bold">{shape.formula}</p>
        </motion.div>

        {/* Dimension Inputs */}
        <div className="space-y-4">
          <div className={`grid gap-4 ${shape.fields.length > 2 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
            {shape.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <Input
                  id={field.key}
                  type="number"
                  value={dimensions[field.key] || ''}
                  onChange={(e) => setDimensions(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={`${field.label} را وارد کنید`}
                  className="text-lg"
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>واحد اندازه‌گیری</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((u) => (
                  <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <VisualizationCard title="نتیجه محاسبه">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Shape Preview */}
                <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${shape.color} p-4 flex items-center justify-center`}>
                  <svg viewBox="0 0 120 120" className="w-full h-full text-white/90">
                    {renderShapePreview()}
                  </svg>
                </div>

                {/* Results Grid */}
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">مساحت</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatPersianNumber(parseFloat(result.area.toFixed(4)))}
                    </p>
                    <p className="text-xs text-muted-foreground">{getUnitLabel()}²</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20">
                    <p className="text-xs text-muted-foreground mb-1">محیط</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPersianNumber(parseFloat(result.perimeter.toFixed(4)))}
                    </p>
                    <p className="text-xs text-muted-foreground">{getUnitLabel()}</p>
                  </div>
                </div>
              </div>
            </VisualizationCard>

            {/* Dimensions Summary */}
            <VisualizationCard title="ابعاد وارد شده">
              <div className="flex flex-wrap gap-3">
                {shape.fields.map((field) => (
                  <div
                    key={field.key}
                    className="px-4 py-2 bg-muted/50 rounded-lg border border-border"
                  >
                    <span className="text-sm text-muted-foreground">{field.label}: </span>
                    <span className="font-bold">
                      {formatPersianNumber(result.dimensions[field.key])} {getUnitLabel()}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="mt-4"
              >
                {copied ? <Check className="h-4 w-4 ml-2" /> : <Copy className="h-4 w-4 ml-2" />}
                {copied ? 'کپی شد' : 'کپی نتیجه'}
              </Button>
            </VisualizationCard>

            {/* Quick Conversions */}
            <VisualizationCard title="تبدیل واحدها">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {units.filter(u => u.value !== unit).slice(0, 6).map((u) => {
                  const currentUnit = units.find(x => x.value === unit);
                  const factor = currentUnit ? u.factor / currentUnit.factor : 1;
                  const convertedArea = result.area * factor;
                  return (
                    <div key={u.value} className="p-3 bg-card rounded-lg border border-border text-center">
                      <p className="text-xs text-muted-foreground mb-1">{u.label}²</p>
                      <p className="text-sm font-bold">
                        {convertedArea < 0.0001 || convertedArea > 999999
                          ? convertedArea.toExponential(2)
                          : formatPersianNumber(parseFloat(convertedArea.toFixed(4)))}
                      </p>
                    </div>
                  );
                })}
              </div>
            </VisualizationCard>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
}
