import React, { useState, useRef, useEffect } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Box, Calculator } from "lucide-react";
import { motion } from 'framer-motion';
import { formatPersianNumber } from '@/utils/persianNumbers';
import { toast } from 'sonner';

type ShapeType = 'cube' | 'cuboid' | 'sphere' | 'cylinder' | 'cone';

const shapeNames: Record<ShapeType, string> = {
  cube: 'مکعب',
  cuboid: 'مکعب مستطیل',
  sphere: 'کره',
  cylinder: 'استوانه',
  cone: 'مخروط'
};

export default function VolumeCalculator() {
  const [shape, setShape] = useState<ShapeType>('cube');
  const [dimensions, setDimensions] = useState<{[key: string]: string}>({});
  const [result, setResult] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (result !== null && canvasRef.current) {
      drawShape();
    }
  }, [result, shape, dimensions]);

  const drawShape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'hsl(var(--primary))';
    ctx.strokeStyle = 'hsl(var(--primary))';
    ctx.lineWidth = 2;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    switch (shape) {
      case 'cube':
        const size = 80;
        ctx.fillRect(centerX - size/2, centerY - size/2, size, size);
        ctx.strokeRect(centerX - size/2 + 15, centerY - size/2 - 15, size, size);
        ctx.beginPath();
        ctx.moveTo(centerX - size/2, centerY - size/2);
        ctx.lineTo(centerX - size/2 + 15, centerY - size/2 - 15);
        ctx.moveTo(centerX + size/2, centerY - size/2);
        ctx.lineTo(centerX + size/2 + 15, centerY - size/2 - 15);
        ctx.moveTo(centerX - size/2, centerY + size/2);
        ctx.lineTo(centerX - size/2 + 15, centerY + size/2 - 15);
        ctx.moveTo(centerX + size/2, centerY + size/2);
        ctx.lineTo(centerX + size/2 + 15, centerY + size/2 - 15);
        ctx.stroke();
        break;

      case 'cuboid':
        ctx.fillRect(centerX - 70, centerY - 40, 140, 80);
        ctx.strokeRect(centerX - 70 + 15, centerY - 40 - 15, 140, 80);
        ctx.beginPath();
        ctx.moveTo(centerX - 70, centerY - 40);
        ctx.lineTo(centerX - 70 + 15, centerY - 40 - 15);
        ctx.moveTo(centerX + 70, centerY - 40);
        ctx.lineTo(centerX + 70 + 15, centerY - 40 - 15);
        ctx.moveTo(centerX - 70, centerY + 40);
        ctx.lineTo(centerX - 70 + 15, centerY + 40 - 15);
        ctx.moveTo(centerX + 70, centerY + 40);
        ctx.lineTo(centerX + 70 + 15, centerY + 40 - 15);
        ctx.stroke();
        break;

      case 'sphere':
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 60, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        break;

      case 'cylinder':
        ctx.fillRect(centerX - 50, centerY - 60, 100, 120);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 60, 50, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 60, 50, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'cone':
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 70);
        ctx.lineTo(centerX - 60, centerY + 60);
        ctx.lineTo(centerX + 60, centerY + 60);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 60, 60, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
  };

  const calculateVolume = () => {
    let volume = 0;
    
    switch (shape) {
      case 'cube':
        const side = parseFloat(dimensions.side || '0');
        if (side > 0) volume = Math.pow(side, 3);
        break;
      case 'cuboid':
        const length = parseFloat(dimensions.length || '0');
        const width = parseFloat(dimensions.width || '0');
        const height = parseFloat(dimensions.height || '0');
        if (length > 0 && width > 0 && height > 0) volume = length * width * height;
        break;
      case 'sphere':
        const radius = parseFloat(dimensions.radius || '0');
        if (radius > 0) volume = (4/3) * Math.PI * Math.pow(radius, 3);
        break;
      case 'cylinder':
        const cylinderRadius = parseFloat(dimensions.radius || '0');
        const cylinderHeight = parseFloat(dimensions.height || '0');
        if (cylinderRadius > 0 && cylinderHeight > 0) volume = Math.PI * Math.pow(cylinderRadius, 2) * cylinderHeight;
        break;
      case 'cone':
        const coneRadius = parseFloat(dimensions.radius || '0');
        const coneHeight = parseFloat(dimensions.height || '0');
        if (coneRadius > 0 && coneHeight > 0) volume = (1/3) * Math.PI * Math.pow(coneRadius, 2) * coneHeight;
        break;
    }

    if (volume > 0) {
      setResult(volume);
      toast.success('حجم محاسبه شد');
    } else {
      setResult(null);
      toast.error('لطفاً مقادیر معتبر وارد کنید');
    }
  };

  const updateDimension = (key: string, value: string) => {
    setDimensions(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setDimensions({});
    setResult(null);
  };

  const renderInputs = () => {
    switch (shape) {
      case 'cube':
        return (
          <div className="space-y-2">
            <Label>ضلع</Label>
            <Input
              type="number"
              value={dimensions.side || ''}
              onChange={(e) => updateDimension('side', e.target.value)}
              placeholder="طول ضلع"
            />
          </div>
        );
      case 'cuboid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>طول</Label>
              <Input
                type="number"
                value={dimensions.length || ''}
                onChange={(e) => updateDimension('length', e.target.value)}
                placeholder="طول"
              />
            </div>
            <div className="space-y-2">
              <Label>عرض</Label>
              <Input
                type="number"
                value={dimensions.width || ''}
                onChange={(e) => updateDimension('width', e.target.value)}
                placeholder="عرض"
              />
            </div>
            <div className="space-y-2">
              <Label>ارتفاع</Label>
              <Input
                type="number"
                value={dimensions.height || ''}
                onChange={(e) => updateDimension('height', e.target.value)}
                placeholder="ارتفاع"
              />
            </div>
          </div>
        );
      case 'sphere':
        return (
          <div className="space-y-2">
            <Label>شعاع</Label>
            <Input
              type="number"
              value={dimensions.radius || ''}
              onChange={(e) => updateDimension('radius', e.target.value)}
              placeholder="شعاع"
            />
          </div>
        );
      case 'cylinder':
      case 'cone':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>شعاع</Label>
              <Input
                type="number"
                value={dimensions.radius || ''}
                onChange={(e) => updateDimension('radius', e.target.value)}
                placeholder="شعاع"
              />
            </div>
            <div className="space-y-2">
              <Label>ارتفاع</Label>
              <Input
                type="number"
                value={dimensions.height || ''}
                onChange={(e) => updateDimension('height', e.target.value)}
                placeholder="ارتفاع"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <CalculatorCard
      title="محاسبه حجم"
      icon={Box}
      onReset={handleReset}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>شکل هندسی</Label>
            <Select value={shape} onValueChange={(v) => {
              setShape(v as ShapeType);
              setDimensions({});
              setResult(null);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(shapeNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderInputs()}
          
          <Button onClick={calculateVolume} className="w-full" size="lg">
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه حجم
          </Button>
        </div>

        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <VisualizationCard title="نمایش شکل">
              <canvas
                ref={canvasRef}
                width={300}
                height={250}
                className="w-full bg-gradient-to-br from-card to-muted/30 rounded-xl"
              />
            </VisualizationCard>

            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 text-center">
              <p className="text-sm text-muted-foreground mb-2">حجم {shapeNames[shape]}</p>
              <p className="text-3xl font-bold text-primary">{result.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">واحد مکعبی</p>
            </div>
          </motion.div>
        )}
      </div>
    </CalculatorCard>
  );
}