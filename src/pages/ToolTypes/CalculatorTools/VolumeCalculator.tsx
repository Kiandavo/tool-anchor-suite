import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Box } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

export default function VolumeCalculator() {
  const [shape, setShape] = useState<string>('cube');
  const [dimensions, setDimensions] = useState<{[key: string]: string}>({});
  const [result, setResult] = useState<string>('');

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
      setResult(`حجم: ${volume.toFixed(2)} واحد مکعبی`);
    } else {
      setResult('لطفاً مقادیر معتبر وارد کنید');
    }
  };

  const updateDimension = (key: string, value: string) => {
    setDimensions(prev => ({ ...prev, [key]: value }));
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
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Box className="h-5 w-5" />
          محاسبه حجم
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>شکل هندسی</Label>
          <Select value={shape} onValueChange={setShape}>
            <SelectTrigger>
              <SelectValue placeholder="شکل را انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cube">مکعب</SelectItem>
              <SelectItem value="cuboid">مکعب مستطیل</SelectItem>
              <SelectItem value="sphere">کره</SelectItem>
              <SelectItem value="cylinder">استوانه</SelectItem>
              <SelectItem value="cone">مخروط</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderInputs()}
        
        <Button onClick={calculateVolume} className="w-full" size="lg">
          محاسبه حجم
        </Button>
        
        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}