
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { 
  Square, 
  Circle, 
  Triangle, 
  Calculator, 
  Ruler, 
  RotateCcw,
  Shapes,
  PieChart
} from "lucide-react";
import { toast } from 'sonner';

// Enhanced shape definitions with formulas and visual guides
const shapes = [
  { 
    name: 'مربع', 
    type: 'square' as const, 
    icon: Square,
    formula: 'مساحت = ضلع²',
    fields: ['ضلع'],
    calculate: (dimensions: number[]) => dimensions[0] * dimensions[0]
  },
  { 
    name: 'مستطیل', 
    type: 'rectangle' as const, 
    icon: Square,
    formula: 'مساحت = طول × عرض',
    fields: ['طول', 'عرض'],
    calculate: (dimensions: number[]) => dimensions[0] * dimensions[1]
  },
  { 
    name: 'دایره', 
    type: 'circle' as const, 
    icon: Circle,
    formula: 'مساحت = π × شعاع²',
    fields: ['شعاع'],
    calculate: (dimensions: number[]) => Math.PI * dimensions[0] * dimensions[0]
  },
  { 
    name: 'مثلث', 
    type: 'triangle' as const, 
    icon: Triangle,
    formula: 'مساحت = (قاعده × ارتفاع) ÷ ۲',
    fields: ['قاعده', 'ارتفاع'],
    calculate: (dimensions: number[]) => (dimensions[0] * dimensions[1]) / 2
  }
];

interface AreaResult {
  area: number;
  perimeter: number;
  shape: string;
  dimensions: number[];
  unit: string;
}

const AreaCalculator = () => {
  const [selectedShape, setSelectedShape] = useState(shapes[0]);
  const [dimensions, setDimensions] = useState<string[]>(['', '']);
  const [unit, setUnit] = useState<string>('متر');
  const [result, setResult] = useState<AreaResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      console.log('Selected shape:', selectedShape);
      console.log('Dimensions:', dimensions);
      
      const numDimensions = dimensions.map(d => parseFloat(d));
      console.log('Numeric dimensions:', numDimensions);
      
      if (numDimensions.some(d => isNaN(d) || d <= 0)) {
        toast.error("ابعاد نامعتبر", {
          description: "لطفا تمام ابعاد را صحیح وارد کنید",
          position: "top-center",
        });
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const area = selectedShape.calculate(numDimensions);
      console.log('Calculated area:', area);
      let perimeter = 0;

      // Calculate perimeter based on shape
      switch (selectedShape.type) {
        case 'square':
          perimeter = 4 * numDimensions[0];
          console.log('Square perimeter:', perimeter);
          break;
        case 'rectangle':
          perimeter = 2 * (numDimensions[0] + numDimensions[1]);
          break;
        case 'circle':
          perimeter = 2 * Math.PI * numDimensions[0];
          console.log('Circle perimeter (circumference):', perimeter);
          break;
        case 'triangle':
          // Assuming equilateral triangle for perimeter
          perimeter = 3 * numDimensions[0];
          break;
      }

      const result = {
        area,
        perimeter,
        shape: selectedShape.name,
        dimensions: numDimensions,
        unit
      };
      
      console.log('Final result:', result);
      setResult(result);
      
      toast.success("مساحت برآورد شد", {
        description: `مساحت: ${area.toFixed(2)} ${unit} مربع`,
        position: "top-center",
      });
      
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error("خطا در برآورد", {
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [selectedShape, dimensions, unit]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <div className="icon-container">
              <Shapes className="h-6 w-6 text-primary" />
            </div>
            محاسبه‌گر پیشرفته مساحت
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shape Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shapes.map((shape) => {
              const IconComponent = shape.icon;
              return (
                <Button
                  key={shape.type}
                  variant={selectedShape.type === shape.type ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedShape(shape);
                    setDimensions(['', '']);
                    setResult(null);
                  }}
                  className="glass-effect h-20 flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <IconComponent className="h-6 w-6 mb-2" />
                  <span className="text-xs">{shape.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Formula Display */}
          <div className="glass-effect rounded-xl p-4 text-center">
            <h3 className="font-medium mb-2 flex items-center justify-center">
              <Calculator className="ml-2 h-4 w-4 text-primary" />
              فرمول محاسبه {selectedShape.name}
            </h3>
            <p className="text-primary font-mono">{selectedShape.formula}</p>
          </div>

          {/* Dimension Inputs */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedShape.fields.map((field, index) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={`dim-${index}`} className="flex items-center text-sm font-medium">
                    <Ruler className="ml-1 h-3 w-3 text-primary" />
                    {field} ({unit})
                  </Label>
                  <Input
                    id={`dim-${index}`}
                    value={dimensions[index] || ''}
                    onChange={(e) => {
                      const newDimensions = [...dimensions];
                      newDimensions[index] = e.target.value;
                      setDimensions(newDimensions);
                    }}
                    placeholder={`${field} را وارد کنید`}
                    type="text"
                    dir="ltr"
                    className="glass-effect transition-all duration-300 focus:scale-105"
                  />
                </div>
              ))}
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">واحد اندازه‌گیری</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="glass-effect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="متر">متر</SelectItem>
                    <SelectItem value="سانتی‌متر">سانتی‌متر</SelectItem>
                    <SelectItem value="میلی‌متر">میلی‌متر</SelectItem>
                    <SelectItem value="اینچ">اینچ</SelectItem>
                    <SelectItem value="فوت">فوت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                onClick={handleCalculate}
                disabled={isCalculating}
                className="vibrant-button flex items-center justify-center hover:scale-105 transition-transform duration-300"
              >
                <Calculator className={`ml-2 h-5 w-5 ${isCalculating ? 'animate-spin' : ''}`} />
                {isCalculating ? 'در حال محاسبه...' : 'محاسبه مساحت'}
              </Button>
              
              <Button 
                onClick={() => {
                  setDimensions(['', '']);
                  setResult(null);
                  toast.info("فرم پاک شد", { position: "top-center" });
                }}
                variant="outline"
                className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
              >
                <RotateCcw className="ml-2 h-4 w-4" />
                پاک کردن
              </Button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OutcomeInfoCard 
                  outcome={`مساحت ${result.shape}: ${result.area.toFixed(4)} ${result.unit} مربع`}
                />
                <OutcomeInfoCard 
                  outcome={`محیط: ${result.perimeter.toFixed(4)} ${result.unit}`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="neo-glass rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <PieChart className="h-5 w-5 text-primary ml-2" />
                    <h3 className="font-medium">مساحت</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary">{result.area.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground">{result.unit} مربع</p>
                </div>
                
                <div className="neo-glass rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <Ruler className="h-5 w-5 text-blue-600 ml-2" />
                    <h3 className="font-medium">محیط</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{result.perimeter.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground">{result.unit}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AreaCalculator;
