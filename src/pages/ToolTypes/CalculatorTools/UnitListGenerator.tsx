
import React, { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectTrigger, SelectItem, SelectValue } from "@/components/ui/select";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { 
  Ruler, 
  Scale, 
  Thermometer, 
  Clock, 
  Gauge, 
  Calculator,
  ArrowUpDown,
  Copy,
  RotateCcw,
  Zap,
  Globe
} from "lucide-react";
import { toast } from 'sonner';

// Enhanced unit definitions
const UNIT_CATEGORIES = {
  length: {
    name: 'طول',
    icon: Ruler,
    units: {
      meter: { name: 'متر', symbol: 'm', factor: 1 },
      kilometer: { name: 'کیلومتر', symbol: 'km', factor: 1000 },
      centimeter: { name: 'سانتی‌متر', symbol: 'cm', factor: 0.01 },
      millimeter: { name: 'میلی‌متر', symbol: 'mm', factor: 0.001 },
      inch: { name: 'اینچ', symbol: 'in', factor: 0.0254 },
      foot: { name: 'فوت', symbol: 'ft', factor: 0.3048 },
      yard: { name: 'یارد', symbol: 'yd', factor: 0.9144 },
      mile: { name: 'مایل', symbol: 'mi', factor: 1609.344 },
      nauticalMile: { name: 'مایل دریایی', symbol: 'nmi', factor: 1852 }
    }
  },
  weight: {
    name: 'وزن',
    icon: Scale,
    units: {
      kilogram: { name: 'کیلوگرم', symbol: 'kg', factor: 1 },
      gram: { name: 'گرم', symbol: 'g', factor: 0.001 },
      pound: { name: 'پوند', symbol: 'lb', factor: 0.453592 },
      ounce: { name: 'اونس', symbol: 'oz', factor: 0.0283495 },
      ton: { name: 'تن', symbol: 't', factor: 1000 },
      stone: { name: 'استون', symbol: 'st', factor: 6.35029 },
      carat: { name: 'قیراط', symbol: 'ct', factor: 0.0002 }
    }
  },
  temperature: {
    name: 'دما',
    icon: Thermometer,
    units: {
      celsius: { name: 'سانتی‌گراد', symbol: '°C' },
      fahrenheit: { name: 'فارنهایت', symbol: '°F' },
      kelvin: { name: 'کلوین', symbol: 'K' },
      rankine: { name: 'رنکین', symbol: '°R' }
    }
  },
  volume: {
    name: 'حجم',
    icon: Globe,
    units: {
      liter: { name: 'لیتر', symbol: 'L', factor: 1 },
      milliliter: { name: 'میلی‌لیتر', symbol: 'mL', factor: 0.001 },
      gallon: { name: 'گالن', symbol: 'gal', factor: 3.78541 },
      quart: { name: 'کوارت', symbol: 'qt', factor: 0.946353 },
      pint: { name: 'پینت', symbol: 'pt', factor: 0.473176 },
      cup: { name: 'فنجان', symbol: 'cup', factor: 0.236588 },
      fluidOunce: { name: 'اونس مایع', symbol: 'fl oz', factor: 0.0295735 },
      cubicMeter: { name: 'متر مکعب', symbol: 'm³', factor: 1000 }
    }
  },
  speed: {
    name: 'سرعت',
    icon: Gauge,
    units: {
      meterPerSecond: { name: 'متر بر ثانیه', symbol: 'm/s', factor: 1 },
      kilometerPerHour: { name: 'کیلومتر بر ساعت', symbol: 'km/h', factor: 0.277778 },
      milePerHour: { name: 'مایل بر ساعت', symbol: 'mph', factor: 0.44704 },
      knot: { name: 'گره', symbol: 'kn', factor: 0.514444 },
      footPerSecond: { name: 'فوت بر ثانیه', symbol: 'ft/s', factor: 0.3048 }
    }
  },
  time: {
    name: 'زمان',
    icon: Clock,
    units: {
      second: { name: 'ثانیه', symbol: 's', factor: 1 },
      minute: { name: 'دقیقه', symbol: 'min', factor: 60 },
      hour: { name: 'ساعت', symbol: 'h', factor: 3600 },
      day: { name: 'روز', symbol: 'd', factor: 86400 },
      week: { name: 'هفته', symbol: 'wk', factor: 604800 },
      month: { name: 'ماه', symbol: 'mo', factor: 2629746 },
      year: { name: 'سال', symbol: 'yr', factor: 31556952 }
    }
  }
};

type CategoryKey = keyof typeof UNIT_CATEGORIES;

const UnitConverter = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('length');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showAllConversions, setShowAllConversions] = useState(false);

  // Temperature conversion functions
  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        celsius = value;
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      case 'rankine':
        return celsius * 9/5 + 491.67;
      default:
        return celsius;
    }
  };

  // Generic unit conversion
  const convertUnit = (value: number, from: string, to: string, category: CategoryKey): number => {
    if (category === 'temperature') {
      return convertTemperature(value, from, to);
    }
    
    const categoryData = UNIT_CATEGORIES[category];
    const fromFactor = categoryData.units[from]?.factor || 1;
    const toFactor = categoryData.units[to]?.factor || 1;
    
    return (value * fromFactor) / toFactor;
  };

  // Handle calculation
  const handleCalculate = useCallback(async () => {
    setIsCalculating(true);
    
    try {
      const numValue = parseFloat(inputValue);
      
      if (isNaN(numValue)) {
        toast.error("مقدار نامعتبر", {
          description: "لطفا عددی معتبر وارد کنید",
          position: "top-center",
        });
        return;
      }

      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const convertedValue = convertUnit(numValue, fromUnit, toUnit, selectedCategory);
      setResult(convertedValue);
      
      toast.success("تبدیل انجام شد", {
        description: `${numValue} ${UNIT_CATEGORIES[selectedCategory].units[fromUnit]?.name} = ${convertedValue.toFixed(6)} ${UNIT_CATEGORIES[selectedCategory].units[toUnit]?.name}`,
        position: "top-center",
      });
      
    } catch (error) {
      toast.error("خطا در تبدیل", {
        description: "لطفا مقادیر را بررسی کنید",
        position: "top-center",
      });
    } finally {
      setIsCalculating(false);
    }
  }, [inputValue, fromUnit, toUnit, selectedCategory]);

  // Get all conversions for current input
  const allConversions = useMemo(() => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return [];
    
    const numValue = parseFloat(inputValue);
    const categoryData = UNIT_CATEGORIES[selectedCategory];
    
    return Object.entries(categoryData.units).map(([key, unit]) => {
      const converted = convertUnit(numValue, fromUnit, key, selectedCategory);
      return {
        key,
        name: unit.name,
        symbol: unit.symbol,
        value: converted
      };
    }).filter(item => item.key !== fromUnit);
  }, [inputValue, fromUnit, selectedCategory]);

  // Copy result to clipboard
  const copyResult = async () => {
    if (result !== null) {
      const text = `${inputValue} ${UNIT_CATEGORIES[selectedCategory].units[fromUnit]?.name} = ${result} ${UNIT_CATEGORIES[selectedCategory].units[toUnit]?.name}`;
      try {
        await navigator.clipboard.writeText(text);
        toast.success("کپی شد", {
          description: "نتیجه در کلیپ‌بورد کپی شد",
          position: "top-center",
        });
      } catch (error) {
        toast.error("خطا در کپی", {
          position: "top-center",
        });
      }
    }
  };

  // Swap units
  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result !== null) {
      setInputValue(result.toString());
      handleCalculate();
    }
  };

  // Reset form
  const handleReset = () => {
    setInputValue('1');
    setResult(null);
    setShowAllConversions(false);
    toast.info("فرم پاک شد", {
      position: "top-center",
    });
  };

  // Handle category change
  const handleCategoryChange = (category: CategoryKey) => {
    setSelectedCategory(category);
    const units = Object.keys(UNIT_CATEGORIES[category].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <div className="icon-container">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            مبدل پیشرفته واحدها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={(value) => handleCategoryChange(value as CategoryKey)}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 glass-effect mb-6">
              {Object.entries(UNIT_CATEGORIES).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger key={key} value={key} className="flex items-center">
                    <IconComponent className="ml-1 h-3 w-3" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {Object.entries(UNIT_CATEGORIES).map(([categoryKey, category]) => (
              <TabsContent key={categoryKey} value={categoryKey} className="mt-6 space-y-6">
                {/* Quick Conversion */}
                <div className="glass-effect rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <category.icon className="ml-2 h-5 w-5 text-primary" />
                    تبدیل سریع {category.name}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inputValue" className="flex items-center text-sm font-medium">
                        <Zap className="ml-1 h-3 w-3 text-primary" />
                        مقدار
                      </Label>
                      <Input
                        id="inputValue"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="مثال: 100"
                        type="text"
                        dir="ltr"
                        className="glass-effect transition-all duration-300 focus:scale-105"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        واحد مبدأ
                      </Label>
                      <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="glass-effect">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(category.units).map(([key, unit]) => (
                            <SelectItem key={key} value={key}>
                              {unit.name} ({unit.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center text-sm font-medium">
                        واحد مقصد
                      </Label>
                      <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger className="glass-effect">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(category.units).map(([key, unit]) => (
                            <SelectItem key={key} value={key}>
                              {unit.name} ({unit.symbol})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">عملیات</Label>
                      <div className="flex gap-2">
                        <Button 
                          onClick={swapUnits}
                          variant="outline"
                          size="sm"
                          className="glass-effect flex items-center"
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={handleCalculate}
                          disabled={isCalculating}
                          size="sm"
                          className="vibrant-button flex-1"
                        >
                          {isCalculating ? 'محاسبه...' : 'تبدیل'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Result Display */}
                  {result !== null && (
                    <div className="animate-fade-in">
                      <div className="neo-glass rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-lg">نتیجه</h4>
                          <Button
                            onClick={copyResult}
                            variant="ghost"
                            size="sm"
                            className="flex items-center"
                          >
                            <Copy className="ml-2 h-4 w-4" />
                            کپی
                          </Button>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-2">
                            {inputValue} {UNIT_CATEGORIES[selectedCategory].units[fromUnit]?.name} =
                          </p>
                          <p className="text-3xl font-bold text-primary mb-2">
                            {result.toLocaleString('fa-IR', { maximumFractionDigits: 6 })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {UNIT_CATEGORIES[selectedCategory].units[toUnit]?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button 
                      onClick={() => setShowAllConversions(!showAllConversions)}
                      variant="outline"
                      className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
                    >
                      <Calculator className="ml-2 h-4 w-4" />
                      {showAllConversions ? 'مخفی کردن همه تبدیل‌ها' : 'نمایش همه تبدیل‌ها'}
                    </Button>
                    
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="glass-effect flex items-center justify-center hover:-translate-y-1 transition-transform duration-300"
                    >
                      <RotateCcw className="ml-2 h-4 w-4" />
                      پاک کردن
                    </Button>
                  </div>

                  {/* All Conversions */}
                  {showAllConversions && allConversions.length > 0 && (
                    <div className="animate-fade-in">
                      <div className="glass-effect rounded-xl p-6">
                        <h4 className="font-semibold text-lg mb-4">
                          همه تبدیل‌های {inputValue} {UNIT_CATEGORIES[selectedCategory].units[fromUnit]?.name}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {allConversions.map((conversion) => (
                            <div key={conversion.key} className="neo-glass rounded-xl p-4">
                              <div className="text-center">
                                <p className="font-semibold text-primary">
                                  {conversion.value.toLocaleString('fa-IR', { maximumFractionDigits: 6 })}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {conversion.name} ({conversion.symbol})
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Common Conversions */}
                <div className="glass-effect rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4">تبدیل‌های رایج {category.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {categoryKey === 'length' && (
                      <>
                        <div>• ۱ متر = ۱۰۰ سانتی‌متر</div>
                        <div>• ۱ کیلومتر = ۱۰۰۰ متر</div>
                        <div>• ۱ اینچ = ۲.۵۴ سانتی‌متر</div>
                        <div>• ۱ فوت = ۳۰.۴۸ سانتی‌متر</div>
                        <div>• ۱ یارد = ۰.۹۱۴۴ متر</div>
                        <div>• ۱ مایل = ۱.۶۰۹ کیلومتر</div>
                      </>
                    )}
                    {categoryKey === 'weight' && (
                      <>
                        <div>• ۱ کیلوگرم = ۱۰۰۰ گرم</div>
                        <div>• ۱ پوند = ۰.۴۵۴ کیلوگرم</div>
                        <div>• ۱ اونس = ۲۸.۳۵ گرم</div>
                        <div>• ۱ تن = ۱۰۰۰ کیلوگرم</div>
                        <div>• ۱ استون = ۶.۳۵ کیلوگرم</div>
                        <div>• ۱ قیراط = ۰.۲ گرم</div>
                      </>
                    )}
                    {categoryKey === 'temperature' && (
                      <>
                        <div>• آب یخ می‌زند: ۰°C = ۳۲°F</div>
                        <div>• آب می‌جوشد: ۱۰۰°C = ۲۱۲°F</div>
                        <div>• دمای بدن: ۳۷°C = ۹۸.۶°F</div>
                        <div>• صفر مطلق: -۲۷۳.۱۵°C = ۰K</div>
                        <div>• دمای اتاق: ۲۰°C = ۶۸°F</div>
                        <div>• فرمول: °F = °C × ۹/۵ + ۳۲</div>
                      </>
                    )}
                    {categoryKey === 'volume' && (
                      <>
                        <div>• ۱ لیتر = ۱۰۰۰ میلی‌لیتر</div>
                        <div>• ۱ گالن = ۳.۷۹ لیتر</div>
                        <div>• ۱ کوارت = ۰.۹۵ لیتر</div>
                        <div>• ۱ پینت = ۰.۴۷ لیتر</div>
                        <div>• ۱ فنجان = ۲۳۷ میلی‌لیتر</div>
                        <div>• ۱ متر مکعب = ۱۰۰۰ لیتر</div>
                      </>
                    )}
                    {categoryKey === 'speed' && (
                      <>
                        <div>• ۱ km/h = ۰.۲۷۸ m/s</div>
                        <div>• ۱ mph = ۰.۴۴۷ m/s</div>
                        <div>• ۱ گره = ۰.۵۱۴ m/s</div>
                        <div>• سرعت صوت: ۳۴۳ m/s</div>
                        <div>• سرعت نور: ۳×۱۰⁸ m/s</div>
                        <div>• محدودیت شهری: ۵۰ km/h</div>
                      </>
                    )}
                    {categoryKey === 'time' && (
                      <>
                        <div>• ۱ دقیقه = ۶۰ ثانیه</div>
                        <div>• ۱ ساعت = ۳۶۰۰ ثانیه</div>
                        <div>• ۱ روز = ۸۶۴۰۰ ثانیه</div>
                        <div>• ۱ هفته = ۷ روز</div>
                        <div>• ۱ ماه ≈ ۳۰.۴ روز</div>
                        <div>• ۱ سال = ۳۶۵.۲۵ روز</div>
                      </>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitConverter;
