
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { calculateArea } from '@/utils/calculatorUtils';
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';

const shapes = [
  { name: 'مربع', type: 'square' as const },
  { name: 'مستطیل', type: 'rectangle' as const },
  { name: 'دایره', type: 'circle' as const },
  { name: 'مثلث', type: 'triangle' as const },
];

const AreaCalculator = () => {
  const [shape, setShape] = useState(shapes[0]);
  const [dimensions, setDimensions] = useState<number[]>([0, 0]);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    if (dimensions.every(d => !isNaN(d) && d >= 0)) {
      const area = calculateArea(shape.type, dimensions);
      setResult(area);
    }
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          <Select
            value={shape.name}
            onValueChange={(value) => {
              const newShape = shapes.find(s => s.name === value);
              if (newShape) {
                setShape(newShape);
                setDimensions([0, 0]);
                setResult(null);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue>{shape.name}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {shapes.map((s) => (
                <SelectItem key={s.name} value={s.name}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="space-y-2">
            {shape.type === 'circle' ? (
              <Input
                type="number"
                placeholder="شعاع"
                value={dimensions[0] || ''}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setDimensions([value, 0]);
                  if (!isNaN(value)) handleCalculate();
                }}
              />
            ) : shape.type === 'square' ? (
              <Input
                type="number"
                placeholder="طول ضلع"
                value={dimensions[0] || ''}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setDimensions([value, 0]);
                  if (!isNaN(value)) handleCalculate();
                }}
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder={shape.type === 'rectangle' ? 'طول' : 'قاعده'}
                  value={dimensions[0] || ''}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setDimensions([value, dimensions[1]]);
                    if (!isNaN(value) && !isNaN(dimensions[1])) handleCalculate();
                  }}
                />
                <Input
                  type="number"
                  placeholder={shape.type === 'rectangle' ? 'عرض' : 'ارتفاع'}
                  value={dimensions[1] || ''}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    setDimensions([dimensions[0], value]);
                    if (!isNaN(value) && !isNaN(dimensions[0])) handleCalculate();
                  }}
                />
              </div>
            )}
          </div>
        </div>
        {result !== null && (
          <OutcomeInfoCard
            outcome={`مساحت ${shape.name}: ${result} متر مربع`}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AreaCalculator;
