import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Lightbulb, DollarSign, Calculator, RotateCcw, Battery, Gauge, Activity } from "lucide-react";
import { OutcomeInfoCard } from '@/components/OutcomeInfoCard';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const formatNumber = (num: number) => num.toLocaleString('fa-IR', { maximumFractionDigits: 2 });

export default function PowerCalculator() {
  // Ohm's Law
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [ohmResult, setOhmResult] = useState<{ power: number; missing: string; value: number } | null>(null);
  
  // Power & Cost
  const [power, setPower] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [pricePerKwh, setPricePerKwh] = useState<string>('1500');
  const [costResult, setCostResult] = useState<{ energy: number; daily: number; monthly: number; yearly: number } | null>(null);

  const appliances = [
    { name: 'لامپ LED', power: 10, icon: '💡' },
    { name: 'تلویزیون', power: 100, icon: '📺' },
    { name: 'یخچال', power: 150, icon: '🧊' },
    { name: 'کولر گازی', power: 2000, icon: '❄️' },
    { name: 'ماشین لباسشویی', power: 500, icon: '🧺' },
    { name: 'مایکروویو', power: 1000, icon: '🍳' },
    { name: 'کامپیوتر', power: 300, icon: '💻' },
    { name: 'اتو', power: 1200, icon: '👔' },
  ];

  const calculateOhm = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);

    const hasV = !isNaN(v) && v > 0;
    const hasI = !isNaN(i) && i > 0;
    const hasR = !isNaN(r) && r > 0;

    if (hasV && hasI) {
      const calculatedR = v / i;
      const calculatedP = v * i;
      setResistance(calculatedR.toFixed(2));
      setOhmResult({ power: calculatedP, missing: 'resistance', value: calculatedR });
      toast.success('محاسبه انجام شد', { description: `مقاومت: ${formatNumber(calculatedR)} اهم` });
    } else if (hasV && hasR) {
      const calculatedI = v / r;
      const calculatedP = v * calculatedI;
      setCurrent(calculatedI.toFixed(4));
      setOhmResult({ power: calculatedP, missing: 'current', value: calculatedI });
      toast.success('محاسبه انجام شد', { description: `جریان: ${formatNumber(calculatedI)} آمپر` });
    } else if (hasI && hasR) {
      const calculatedV = i * r;
      const calculatedP = calculatedV * i;
      setVoltage(calculatedV.toFixed(2));
      setOhmResult({ power: calculatedP, missing: 'voltage', value: calculatedV });
      toast.success('محاسبه انجام شد', { description: `ولتاژ: ${formatNumber(calculatedV)} ولت` });
    } else {
      toast.error('خطا', { description: 'لطفاً حداقل دو مقدار را وارد کنید' });
    }
  };

  const calculateCost = () => {
    const p = parseFloat(power);
    const h = parseFloat(hours);
    const price = parseFloat(pricePerKwh);

    if (isNaN(p) || isNaN(h) || isNaN(price) || p <= 0 || h <= 0 || price <= 0) {
      toast.error('خطا', { description: 'لطفاً تمام مقادیر را به درستی وارد کنید' });
      return;
    }

    const energyKwh = (p * h) / 1000;
    const daily = energyKwh * price;
    const monthly = daily * 30;
    const yearly = daily * 365;

    setCostResult({ energy: energyKwh, daily, monthly, yearly });
    toast.success('محاسبه انجام شد', { description: `هزینه ماهانه: ${formatNumber(monthly)} تومان` });
  };

  const handleReset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setHours('');
    setOhmResult(null);
    setCostResult(null);
    toast.info('فرم پاک شد');
  };

  // Chart data for cost visualization
  const costChartData = useMemo(() => {
    if (!costResult) return [];
    return [
      { name: 'روزانه', value: costResult.daily, fill: '#22c55e' },
      { name: 'هفتگی', value: costResult.daily * 7, fill: '#3b82f6' },
      { name: 'ماهانه', value: costResult.monthly, fill: '#f97316' },
    ];
  }, [costResult]);

  // Pie chart data for power breakdown
  const powerPieData = useMemo(() => {
    if (!ohmResult) return [];
    const v = parseFloat(voltage) || ohmResult.value;
    const i = parseFloat(current) || ohmResult.value;
    const r = parseFloat(resistance) || ohmResult.value;
    
    return [
      { name: 'ولتاژ', value: v, fill: '#ef4444' },
      { name: 'جریان', value: i * 100, fill: '#3b82f6' },
      { name: 'مقاومت', value: r, fill: '#22c55e' },
    ];
  }, [ohmResult, voltage, current, resistance]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="vibrant-card overflow-hidden">
        <div className="flex flex-col space-y-6 p-6">
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <div className="icon-container">
              <Zap className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-center">محاسبه‌گر توان الکتریکی</h2>
          </div>

          <Tabs defaultValue="ohm" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-effect">
              <TabsTrigger value="ohm" className="flex items-center gap-2">
                <Gauge className="h-4 w-4" />
                قانون اهم
              </TabsTrigger>
              <TabsTrigger value="cost" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                هزینه برق
              </TabsTrigger>
              <TabsTrigger value="appliances" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                دستگاه‌ها
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ohm" className="mt-6 space-y-6">
              {/* Ohm's Law Triangle Visualization */}
              <motion.div 
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="neo-glass rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-4 flex items-center justify-center">
                  <Activity className="ml-2 h-5 w-5 text-primary" />
                  مثلث قانون اهم
                </h3>
                <div className="flex justify-center">
                  <div className="relative w-64 h-56">
                    <svg viewBox="0 0 200 180" className="w-full h-full">
                      {/* Triangle */}
                      <polygon
                        points="100,10 10,170 190,170"
                        fill="hsl(var(--primary)/0.1)"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                      />
                      {/* Horizontal line dividing V from I×R */}
                      <line x1="55" y1="90" x2="145" y2="90" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" />
                      
                      {/* V at top */}
                      <text x="100" y="60" textAnchor="middle" fill="hsl(var(--destructive))" className="font-bold text-2xl">V</text>
                      
                      {/* I at bottom left */}
                      <text x="55" y="140" textAnchor="middle" fill="hsl(var(--primary))" className="font-bold text-2xl">I</text>
                      
                      {/* R at bottom right */}
                      <text x="145" y="140" textAnchor="middle" fill="hsl(var(--chart-2))" className="font-bold text-2xl">R</text>
                      
                      {/* × between I and R */}
                      <text x="100" y="145" textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-xl">×</text>
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
                  <div className="glass-effect rounded-lg p-3">
                    <p className="text-red-500 font-bold">V = I × R</p>
                    <p className="text-xs text-muted-foreground">ولتاژ</p>
                  </div>
                  <div className="glass-effect rounded-lg p-3">
                    <p className="text-primary font-bold">I = V ÷ R</p>
                    <p className="text-xs text-muted-foreground">جریان</p>
                  </div>
                  <div className="glass-effect rounded-lg p-3">
                    <p className="text-green-600 font-bold">R = V ÷ I</p>
                    <p className="text-xs text-muted-foreground">مقاومت</p>
                  </div>
                </div>
              </motion.div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage" className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-red-500" />
                    ولتاژ (V) - ولت
                  </Label>
                  <Input
                    id="voltage"
                    type="number"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    placeholder="220"
                    dir="ltr"
                    className="glass-effect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current" className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    جریان (I) - آمپر
                  </Label>
                  <Input
                    id="current"
                    type="number"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="2"
                    dir="ltr"
                    className="glass-effect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resistance" className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-green-600" />
                    مقاومت (R) - اهم
                  </Label>
                  <Input
                    id="resistance"
                    type="number"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                    placeholder="110"
                    dir="ltr"
                    className="glass-effect"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateOhm} className="flex-1 vibrant-button">
                  <Calculator className="ml-2 h-5 w-5" />
                  محاسبه
                </Button>
                <Button onClick={handleReset} variant="outline" className="glass-effect">
                  <RotateCcw className="ml-2 h-4 w-4" />
                  پاک کردن
                </Button>
              </div>

              {ohmResult && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants}>
                    <OutcomeInfoCard outcome={`توان محاسبه شده: ${formatNumber(ohmResult.power)} وات (W)`} />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="neo-glass rounded-xl p-5 text-center">
                      <Battery className="h-8 w-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">ولتاژ</p>
                      <p className="text-2xl font-bold text-red-500">{formatNumber(parseFloat(voltage) || 0)} V</p>
                    </div>
                    <div className="neo-glass rounded-xl p-5 text-center">
                      <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">جریان</p>
                      <p className="text-2xl font-bold text-primary">{formatNumber(parseFloat(current) || 0)} A</p>
                    </div>
                    <div className="neo-glass rounded-xl p-5 text-center">
                      <Gauge className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">مقاومت</p>
                      <p className="text-2xl font-bold text-green-600">{formatNumber(parseFloat(resistance) || 0)} Ω</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h4 className="font-medium mb-4">فرمول‌های مرتبط با توان</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
                      <div className="glass-effect rounded-lg p-3">
                        <p className="font-mono font-bold">P = V × I</p>
                        <p className="text-xs text-muted-foreground">توان = ولتاژ × جریان</p>
                      </div>
                      <div className="glass-effect rounded-lg p-3">
                        <p className="font-mono font-bold">P = V² ÷ R</p>
                        <p className="text-xs text-muted-foreground">توان = ولتاژ² ÷ مقاومت</p>
                      </div>
                      <div className="glass-effect rounded-lg p-3">
                        <p className="font-mono font-bold">P = I² × R</p>
                        <p className="text-xs text-muted-foreground">توان = جریان² × مقاومت</p>
                      </div>
                      <div className="glass-effect rounded-lg p-3 border-2 border-primary/30">
                        <p className="font-mono font-bold text-primary">{formatNumber(ohmResult.power)} W</p>
                        <p className="text-xs text-muted-foreground">توان محاسبه شده</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="cost" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="power">توان دستگاه (وات)</Label>
                  <Input
                    id="power"
                    type="number"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    placeholder="100"
                    dir="ltr"
                    className="glass-effect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hours">ساعت استفاده روزانه</Label>
                  <Input
                    id="hours"
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="8"
                    dir="ltr"
                    className="glass-effect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">قیمت هر کیلووات‌ساعت (تومان)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={pricePerKwh}
                    onChange={(e) => setPricePerKwh(e.target.value)}
                    placeholder="1500"
                    dir="ltr"
                    className="glass-effect"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={calculateCost} className="flex-1 vibrant-button">
                  <DollarSign className="ml-2 h-5 w-5" />
                  محاسبه هزینه
                </Button>
                <Button onClick={handleReset} variant="outline" className="glass-effect">
                  <RotateCcw className="ml-2 h-4 w-4" />
                  پاک کردن
                </Button>
              </div>

              {costResult && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants}>
                    <OutcomeInfoCard outcome={`انرژی مصرفی روزانه: ${formatNumber(costResult.energy)} کیلووات‌ساعت`} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="neo-glass rounded-xl p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">روزانه</p>
                      <p className="text-xl font-bold text-green-600">{formatNumber(costResult.daily)}</p>
                      <p className="text-xs text-muted-foreground">تومان</p>
                    </div>
                    <div className="neo-glass rounded-xl p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">هفتگی</p>
                      <p className="text-xl font-bold text-blue-600">{formatNumber(costResult.daily * 7)}</p>
                      <p className="text-xs text-muted-foreground">تومان</p>
                    </div>
                    <div className="neo-glass rounded-xl p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">ماهانه</p>
                      <p className="text-xl font-bold text-amber-600">{formatNumber(costResult.monthly)}</p>
                      <p className="text-xs text-muted-foreground">تومان</p>
                    </div>
                    <div className="neo-glass rounded-xl p-5 text-center">
                      <p className="text-sm text-muted-foreground mb-1">سالانه</p>
                      <p className="text-xl font-bold text-red-600">{formatNumber(costResult.yearly)}</p>
                      <p className="text-xs text-muted-foreground">تومان</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="neo-glass rounded-xl p-6">
                    <h4 className="font-medium mb-4 flex items-center">
                      <Activity className="ml-2 h-5 w-5 text-primary" />
                      نمودار هزینه
                    </h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(v) => formatNumber(v)} />
                          <Tooltip formatter={(value: number) => formatNumber(value) + ' تومان'} />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {costChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="appliances" className="mt-6 space-y-6">
              <div className="neo-glass rounded-xl p-6">
                <h4 className="font-medium mb-4 flex items-center">
                  <Lightbulb className="ml-2 h-5 w-5 text-primary" />
                  دستگاه‌های خانگی رایج
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  روی هر دستگاه کلیک کنید تا توان آن به بخش محاسبه هزینه اضافه شود
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {appliances.map((appliance, index) => (
                    <motion.button
                      key={appliance.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setPower(appliance.power.toString());
                        toast.success(`${appliance.name} انتخاب شد`, { description: `توان: ${formatNumber(appliance.power)} وات` });
                      }}
                      className="glass-effect rounded-xl p-4 text-center hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                    >
                      <span className="text-3xl mb-2 block">{appliance.icon}</span>
                      <p className="font-medium text-sm">{appliance.name}</p>
                      <p className="text-xs text-muted-foreground">{formatNumber(appliance.power)} وات</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="neo-glass rounded-xl p-6">
                <h4 className="font-medium mb-4">راهنمای مصرف انرژی</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span>کم‌مصرف</span>
                    <span className="text-green-600 font-medium">زیر ۱۰۰ وات</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span>متوسط</span>
                    <span className="text-amber-600 font-medium">۱۰۰ تا ۵۰۰ وات</span>
                  </div>
                  <div className="flex justify-between items-center p-3 glass-effect rounded-lg">
                    <span>پرمصرف</span>
                    <span className="text-red-600 font-medium">بیش از ۵۰۰ وات</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
