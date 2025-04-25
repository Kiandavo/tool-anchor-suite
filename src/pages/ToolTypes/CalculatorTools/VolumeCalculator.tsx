
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

type Shape = 'cube' | 'sphere' | 'cylinder' | 'cone';

export default function VolumeCalculator() {
  const [shape, setShape] = useState<Shape>('cube');
  const [dimensions, setDimensions] = useState({
    length: '',
    width: '',
    height: '',
    radius: '',
  });
  const [result, setResult] = useState<string | null>(null);

  const calculateVolume = () => {
    let volume = 0;
    const PI = Math.PI;

    switch (shape) {
      case 'cube':
        volume = Math.pow(Number(dimensions.length), 3);
        setResult(`حجم مکعب: ${volume.toLocaleString('fa-IR')} واحد مکعب`);
        break;
      case 'sphere':
        volume = (4/3) * PI * Math.pow(Number(dimensions.radius), 3);
        setResult(`حجم کره: ${volume.toLocaleString('fa-IR')} واحد مکعب`);
        break;
      case 'cylinder':
        volume = PI * Math.pow(Number(dimensions.radius), 2) * Number(dimensions.height);
        setResult(`حجم استوانه: ${volume.toLocaleString('fa-IR')} واحد مکعب`);
        break;
      case 'cone':
        volume = (1/3) * PI * Math.pow(Number(dimensions.radius), 2) * Number(dimensions.height);
        setResult(`حجم مخروط: ${volume.toLocaleString('fa-IR')} واحد مکعب`);
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          محاسبه حجم اشکال هندسی
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>نوع شکل</Label>
            <Select
              value={shape}
              onValueChange={(value) => setShape(value as Shape)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cube">مکعب</SelectItem>
                <SelectItem value="sphere">کره</SelectItem>
                <SelectItem value="cylinder">استوانه</SelectItem>
                <SelectItem value="cone">مخروط</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {shape === 'cube' && (
            <div className="space-y-2">
              <Label>طول ضلع</Label>
              <Input
                type="number"
                value={dimensions.length}
                onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                placeholder="طول ضلع را وارد کنید"
              />
            </div>
          )}

          {(shape === 'sphere') && (
            <div className="space-y-2">
              <Label>شعاع</Label>
              <Input
                type="number"
                value={dimensions.radius}
                onChange={(e) => setDimensions({ ...dimensions, radius: e.target.value })}
                placeholder="شعاع را وارد کنید"
              />
            </div>
          )}

          {(shape === 'cylinder' || shape === 'cone') && (
            <>
              <div className="space-y-2">
                <Label>شعاع</Label>
                <Input
                  type="number"
                  value={dimensions.radius}
                  onChange={(e) => setDimensions({ ...dimensions, radius: e.target.value })}
                  placeholder="شعاع را وارد کنید"
                />
              </div>
              <div className="space-y-2">
                <Label>ارتفاع</Label>
                <Input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                  placeholder="ارتفاع را وارد کنید"
                />
              </div>
            </>
          )}

          <Button 
            onClick={calculateVolume} 
            className="w-full"
          >
            <Calculator className="ml-2 h-5 w-5" />
            محاسبه حجم
          </Button>
        </div>

        {result && <OutcomeInfoCard outcome={result} />}
      </CardContent>
    </Card>
  );
}
